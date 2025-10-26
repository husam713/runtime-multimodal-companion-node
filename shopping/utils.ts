import {
  FALLBACK_SHOPPING_SYSTEM_MESSAGE,
  SHOPPING_GRAPH_NAMES,
  SHOPPING_SYSTEM_MESSAGE_ENHANCEMENT,
} from './constants';
import { SHOPPING_TOOLS } from './tools';

/**
 * Enhances the system message with shopping capabilities.
 * @param messages - The original array of messages.
 * @returns A new array of messages with the enhanced system message.
 */
export function enhanceSystemMessageWithShopping(messages: any[]): any[] {
  const systemMessageIndex = messages.findIndex(
    (msg) => msg.role === 'system',
  );

  if (systemMessageIndex !== -1) {
    // Enhance existing system message
    const originalSystemMessage = messages[systemMessageIndex];
    const enhancedContent = `${originalSystemMessage.content}\n\n${SHOPPING_SYSTEM_MESSAGE_ENHANCEMENT}`;

    const newMessages = [...messages];
    newMessages[systemMessageIndex] = {
      ...originalSystemMessage,
      content: {
        ...originalSystemMessage.content,
        template: enhancedContent,
      },
    };
    return newMessages;
  } else {
    // Add fallback system message if none exists
    return [
      {
        role: 'system',
        content: {
          type: 'template',
          template: FALLBACK_SHOPPING_SYSTEM_MESSAGE,
        },
      },
      ...messages,
    ];
  }
}

/**
 * Creates a chat request with shopping tools.
 * @param messages - The array of messages for the chat.
 * @param toolChoice - The tool choice strategy.
 * @returns A chat request object with shopping tools.
 */
export function createShoppingChatRequest(
  messages: any[],
  toolChoice: any,
): any {
  return {
    messages,
    tools: SHOPPING_TOOLS,
    tool_choice: toolChoice,
  };
}

/**
 * Gets the appropriate shopping graph name based on input type.
 * @param isText - Whether the input is text or audio.
 * @returns The corresponding shopping graph name.
 */
export function getShoppingGraphName(isText: boolean): string {
  return isText ? SHOPPING_GRAPH_NAMES.WITH_TEXT : SHOPPING_GRAPH_NAMES.WITH_AUDIO;
}
