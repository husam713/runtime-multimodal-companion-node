import { GraphTypes } from '@inworld/runtime/common';
import { CustomNode, ProcessContext, ProxyNode } from '@inworld/runtime/graph';

import { ShoppingToolHandler } from './tools';

/**
 * Proxy node that forwards input to both UpdateStateNode and ShoppingStateNode
 */
export class ShoppingProxyNode extends ProxyNode {
  constructor(options: { id: string }) {
    super(options);
  }
}

/**
 * Custom node to handle tool calls and execute shopping functions
 */
export class ShoppingToolHandlerNode extends CustomNode {
  constructor(options: { id: string }) {
    super(options);
  }

  async process(
    _context: ProcessContext,
    input: GraphTypes.Content | GraphTypes.ContentStream,
  ): Promise<GraphTypes.Content> {
    // Handle ContentStream input by aggregating it into Content
    let content: GraphTypes.Content;

    if ('stream' in input || input.constructor.name === 'ContentStream') {
      // Handle ContentStream
      const stream = input as GraphTypes.ContentStream;
      let aggregatedText = '';
      const aggregatedToolCalls: any[] = [];
      const toolCallsMap: { [id: string]: any } = {};



      for await (const chunk of stream) {
        if (chunk.text) {
          // Simply concatenate chunks as-is, then clean up at the end
          aggregatedText += chunk.text;
        }
        if (chunk.toolCalls && chunk.toolCalls.length > 0) {
          for (const toolCall of chunk.toolCalls) {
            if (toolCallsMap[toolCall.id]) {
              toolCallsMap[toolCall.id].args += toolCall.args;
            } else {
              toolCallsMap[toolCall.id] = { ...toolCall };
            }
          }
        }
      }

      // Convert aggregated tool calls to array
      Object.values(toolCallsMap).forEach(toolCall => {
        aggregatedToolCalls.push(toolCall);
      });

      // Clean up text: remove multiple spaces but preserve single spaces
      const cleanedText = aggregatedText.replace(/\s+/g, ' ').trim();

      content = new GraphTypes.Content({
        content: cleanedText,
        toolCalls: aggregatedToolCalls,
      });


    } else {
      // Handle regular Content
      content = input as GraphTypes.Content;
    }



    if (!content.toolCalls || content.toolCalls.length === 0) {
      return content;
    }

    // Process each tool call
    const processedToolCalls = [];
    const productInfo: any = {};

    for (const toolCall of content.toolCalls) {
      let toolResult;
      try {
        const args = JSON.parse(toolCall.args);
        switch (toolCall.name) {
          case 'recommend_products':
            toolResult = await ShoppingToolHandler.recommendProducts(args);
            productInfo.recommendations = toolResult.recommendations;

            break;
          case 'get_product_info':
            toolResult = await ShoppingToolHandler.getProductInfo(args);
            productInfo.product_details = toolResult;

            break;
          case 'add_to_cart':
            toolResult = await ShoppingToolHandler.addToCart(args);
            productInfo.cart_update = toolResult;

            break;
          case 'update_cart':
            toolResult = await ShoppingToolHandler.updateCart(args);
            productInfo.cart_update = toolResult;

            break;
          case 'view_cart':
            toolResult = await ShoppingToolHandler.viewCart(args);
            productInfo.cart_contents = toolResult;

            break;
          case 'checkout_order':
            toolResult = await ShoppingToolHandler.checkoutOrder(args);
            productInfo.order_result = toolResult;

            break;
          default:
            toolResult = { error: `Unknown tool: ${toolCall.name}` };

        }
      } catch (error) {
        toolResult = { error: `Tool execution failed: ${error.message}` };
        console.error(`[ShoppingToolHandler] Tool execution error for ${toolCall.name}:`, {
          error: error.message,
          stack: error.stack,
          args: toolCall.args
        });
      }

      processedToolCalls.push({
        ...toolCall,
        result: toolResult,
      });
    }

    // Create enhanced content with product info
    const enhancedContent = new GraphTypes.Content({
      content: content.content,
      toolCalls: processedToolCalls,
    });

    // Add product info as metadata for client
    (enhancedContent as any).productInfo = productInfo;



    return enhancedContent;
  }
}
