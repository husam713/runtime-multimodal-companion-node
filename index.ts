import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { parse } from 'url';
import { RawData } from 'ws';
import { authMiddleware, verifyIncomingRequest } from './auth';
import { getChatCompletion } from './services/openai_gpt4';
import { transcribeAudio } from './services/openai_whisper';
import { textToSpeech } from './services/openai_tts';
dotenv.config();

const upload = multer({ dest: 'uploads/' });
const app = express();
const server = createServer(app);
const webSocket = new WebSocketServer({ noServer: true });
const PORT = process.env.PORT || 3000;

// Add CORS headers for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const connections: { [key: string]: { ws?: any } } = {};
// Short-lived WS tokens issued after HTTP auth; validated during WS upgrade
const wsTokens: { [sessionKey: string]: { token: string; expiresAt: number } } = {};
const WS_TOKEN_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Serve test HTML files
function resolveStaticFile(relativePath: string) {
  // 1) Try alongside the compiled file (dist)
  const inSameDir = path.join(__dirname, relativePath);
  if (fs.existsSync(inSameDir)) return inSameDir;
  // 2) Try project root (when running from dist, parent is root)
  const inParent = path.join(__dirname, '..', relativePath);
  if (fs.existsSync(inParent)) return inParent;
  // 3) Fallback to CWD
  const inCwd = path.join(process.cwd(), relativePath);
  return inCwd;
}

app.get('/test-image', (req, res) => {
  res.sendFile(resolveStaticFile('test-image-chat.html'));
});

app.get('/test-audio', (req, res) => {
  res.sendFile(resolveStaticFile('test-audio.html'));
});

// Create WebSocket session endpoint (protected)
app.post('/create-session', authMiddleware, (req, res) => {
  const sessionKey = uuidv4();
  connections[sessionKey] = {};
  const wsToken = uuidv4();
  wsTokens[sessionKey] = { token: wsToken, expiresAt: Date.now() + WS_TOKEN_TTL_MS };
  res.json({ sessionKey, wsToken });
});

// Development helper: issue short-lived access tokens for test pages without exposing auth in browser
// Enable via ALLOW_TEST_CLIENT=true. DO NOT enable in production.
app.get('/get_access_token', (req, res) => {
  if (process.env.ALLOW_TEST_CLIENT !== 'true') {
    return res.status(403).json({ error: 'Disabled. Set ALLOW_TEST_CLIENT=true for local testing.' });
  }
  const sessionKey = uuidv4();
  connections[sessionKey] = {};
  const wsToken = uuidv4();
  wsTokens[sessionKey] = { token: wsToken, expiresAt: Date.now() + WS_TOKEN_TTL_MS };
  res.json({ sessionKey, wsToken });
});

app.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const response = await getChatCompletion(prompt);

    unrealEngineWebSocket.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(response);
      }
    });

    res.json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/transcribe', authMiddleware, upload.single('audio'), async (req, res) => {
  try {
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'Missing audio file' });
    }

    const transcription = await transcribeAudio(audioFile.path);
    fs.unlinkSync(audioFile.path); // clean up
    res.json({ transcription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/text-to-speech', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing text' });
    }

    const speechFile = await textToSpeech(text);
    res.sendFile(speechFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// TODO: Connect to Epic API
async function scheduleAppointment(details: any) {
  console.log('Scheduling appointment with details:', details);
  // Simulate API call
  return Promise.resolve({
    success: true,
    appointment: {
      id: uuidv4(),
      ...details,
      status: 'confirmed',
    },
  });
}

// TODO: Connect to Epic API
async function fetchMedicalRecords(patientId: string) {
  console.log('Fetching medical records for patient:', patientId);
  // Simulate API call
  return Promise.resolve({
    success: true,
    records: [
      {
        id: uuidv4(),
        patientId,
        date: '2023-10-26',
        doctor: 'Dr. Smith',
        notes: 'Patient reported feeling tired.',
      },
    ],
  });
}

app.post('/schedule-appointment', authMiddleware, async (req, res) => {
  try {
    const details = req.body;
    const result = await scheduleAppointment(details);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/fetch-medical-records/:patientId', authMiddleware, async (req, res) => {
  try {
    const { patientId } = req.params;
    const result = await fetchMedicalRecords(patientId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Handle WebSocket upgrade
server.on('upgrade', async (request, socket, head) => {
  const { pathname } = parse(request.url!);

  if (pathname === '/ws') {
    // DEBUG: log every WS upgrade hit to help diagnose connectivity/auth issues
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('WS upgrade hit:', request.url, request.headers?.host);
    } catch {}
    // Prefer short-lived wsToken issued by /create-session; fallback to full Authorization if missing
    let allowed = false;
    let denyReason = '';
    try {
      const { query } = parse(request.url!, true);
      const key = typeof (query as any).key === 'string' ? (query as any).key : undefined;
      const token = typeof (query as any).wsToken === 'string' ? (query as any).wsToken : undefined;
      if (key && token) {
        const record = wsTokens[key];
        if (record && record.token === token && record.expiresAt >= Date.now()) {
          allowed = true;
          // one-time use
          delete wsTokens[key];
          console.log('WS wsToken auth success for:', request.url);
        } else {
          denyReason = 'Invalid or expired wsToken';
        }
      }
    } catch (e) {
      denyReason = 'wsToken parse error';
    }

    if (!allowed) {
      const v = verifyIncomingRequest(request);
      if (!v.ok) {
        try {
          console.warn('WS auth failed:', denyReason || v.error, request.url);
        } catch {}
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
      try { console.log('WS Authorization auth success for:', request.url); } catch {}
    }
    webSocket.handleUpgrade(request, socket, head, (ws) => {
      webSocket.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

const unrealEngineWebSocket = new WebSocketServer({ port: 8081 });

unrealEngineWebSocket.on('connection', ws => {
  console.log('Unreal Engine client connected');
  ws.on('message', message => {
    console.log('received: %s', message);
  });

  ws.send('something');
});

server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

