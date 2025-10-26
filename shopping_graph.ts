import {
  GraphBuilder,
  GraphExecutor,
  RemoteLLMChatNode,
  LLMChatRequestBuilderNode,
} from '@inworld/runtime/graph';

import { SHOPPING_TOOLS, ShoppingToolHandlerNode } from './shopping';
import { CLI_SHOPPING_SYSTEM_MESSAGE } from './shopping/constants';

export class ShoppingGraph {
  executor: InstanceType<typeof GraphExecutor>;

  private constructor({
    executor,
  }: {
    executor: InstanceType<typeof GraphExecutor>;
  }) {
    this.executor = executor;
  }

  destroy() {
    this.executor.stopExecutor();
    this.executor.cleanupAllExecutions();
    this.executor.destroy();
  }

  static async create() {
    const graph = new GraphBuilder('shopping-graph');

    const llmRequestBuilderNode = new LLMChatRequestBuilderNode({
      id: 'shopping_llm_request_builder_node',
      tools: SHOPPING_TOOLS,
      toolChoice: {
        type: 'string',
        value: 'auto',
      },
      responseFormat: 'json',
      messages: [
        {
          role: 'system' as const,
          content: {
            type: 'template' as const,
            template: CLI_SHOPPING_SYSTEM_MESSAGE,
          },
        },
        {
          role: 'user' as const,
          content: {
            type: 'template' as const,
            template: '{{text}}',
          },
        },
      ],
    });

    const llmChatNode = new RemoteLLMChatNode({
      id: 'shopping_llm_chat_node',
      provider: 'openai',
      modelName: 'gpt-4o',
      stream: false,
      reportToClient: true,
    });

    const shoppingToolHandlerNode = new ShoppingToolHandlerNode({
      id: 'shopping-tool-handler-node',
    });

    graph
      .addNode(llmRequestBuilderNode)
      .addNode(llmChatNode)
      .addNode(shoppingToolHandlerNode)
      .addEdge(llmRequestBuilderNode, llmChatNode)
      .addEdge(llmChatNode, shoppingToolHandlerNode)
      .setStartNode(llmRequestBuilderNode)
      .setEndNode(shoppingToolHandlerNode);

    const executor = graph.build();

    return new ShoppingGraph({
      executor,
    });
  }
}
