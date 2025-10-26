import { SAMPLE_PRODUCTS, Product } from './products';

// In-memory storage for shopping carts (replace with a database in production)
const SHOPPING_CARTS: { [conversationId: string]: any } = {};
const current_conversation = 'user123'; // Example conversation ID

// Helper to find a product by ID or name
const findProduct = (productIdOrName: string): Product | undefined => {
  const normalizedInput = productIdOrName.toLowerCase();
  return SAMPLE_PRODUCTS.find(p =>
    p.id.toLowerCase() === normalizedInput ||
    p.name.toLowerCase().includes(normalizedInput)
  );
};

// Main handler for all shopping-related tools
export const ShoppingToolHandler = {
  // Recommend products based on a query
  async recommendProducts(args: {
    query: string,
    category?: 'Electronics' | 'Sports',
    price_range?: [number, number],
    limit?: number
  }) {
    const { query, category, price_range, limit = 5 } = args;
    const lowerCaseQuery = query.toLowerCase();

    let filteredProducts = SAMPLE_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(lowerCaseQuery) ||
      p.description.toLowerCase().includes(lowerCaseQuery) ||
      p.brand.toLowerCase().includes(lowerCaseQuery)
    );

    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (price_range) {
      filteredProducts = filteredProducts.filter(p => p.price >= price_range[0] && p.price <= price_range[1]);
    }

    // Sort by rating descending
    filteredProducts.sort((a, b) => b.rating - a.rating);

    return {
      recommendations: filteredProducts.slice(0, limit),
      total_found: filteredProducts.length,
      search_query: query
    };
  },

  // Get detailed information about a specific product
  async getProductInfo(args: {
    product_id: string,
    include_reviews?: boolean,
    include_availability?: boolean
  }) {
    const { product_id, include_reviews = false, include_availability = true } = args;
    const product = findProduct(product_id);
    if (!product) {
      return { error: 'Product not found' };
    }

    const { reviews, stock, ...productDetails } = product;

    let availability = {};
    if (include_availability) {
      availability = {
        availability: product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'
      };
    }

    let reviewDetails = {};
    if (include_reviews) {
      reviewDetails = { reviews: product.reviews };
    }

    return { ...productDetails, ...availability, ...reviewDetails };
  },

  // Add a product to the shopping cart
  async addToCart(args: { product_id: string, quantity?: number, user_name?: string }) {
    const { product_id, quantity = 1 } = args;
    const product = findProduct(product_id);

    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    if (product.stock < quantity) {
      return { success: false, message: `Insufficient stock for ${product.name}. Only ${product.stock} available.` };
    }

    if (!SHOPPING_CARTS[current_conversation]) {
      SHOPPING_CARTS[current_conversation] = { items: [], total: 0 };
    }
    const cart = SHOPPING_CARTS[current_conversation];
    const existingItem = cart.items.find((item: any) => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity: quantity
      });
    }

    // Update cart total
    cart.total = cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    return {
      success: true,
      message: `Added ${quantity} x ${product.name} to your cart`,
      product_added: { product_name: product.name, quantity },
      cart_summary: {
        total_items: cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        total_amount: cart.total
      },
      cart: cart.items
    };
  },

  // Update cart contents (quantity or remove)
  async updateCart(args: { product_id: string, action: 'set_quantity' | 'remove', quantity?: number, user_name?: string }) {
    const { product_id, action, quantity } = args;
    const product = findProduct(product_id);

    if (!product) {
      return { success: false, message: 'Product not found in catalog' };
    }

    const cart = SHOPPING_CARTS[current_conversation];
    if (!cart) {
      return { success: false, message: 'Your cart is empty' };
    }

    const itemIndex = cart.items.findIndex((item: any) => item.product_id === product.id);
    if (itemIndex === -1) {
      return { success: false, message: `${product.name} is not in your cart` };
    }

    if (action === 'remove') {
      const removedItem = cart.items.splice(itemIndex, 1)[0];

      return {
        success: true,
        message: `Removed ${removedItem.product_name} from your cart`,
        updated_item: { product_name: removedItem.product_name, new_quantity: 0 },
        cart_summary: {
          total_items: cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
          total_amount: cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
        }
      };
    }

    if (action === 'set_quantity') {
      if (quantity === undefined || quantity < 0) {
        return { success: false, message: 'Please provide a valid quantity' };
      }
      if (quantity > product.stock) {
        return { success: false, message: `Insufficient stock. Only ${product.stock} available.` };
      }

      const oldQuantity = cart.items[itemIndex].quantity;
      cart.items[itemIndex].quantity = quantity;

      // If quantity is 0, remove the item
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
      }

      return {
        success: true,
        message: `Updated ${product.name} quantity from ${oldQuantity} to ${quantity}`,
        updated_item: { product_name: product.name, new_quantity: quantity },
        cart_summary: {
          total_items: cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
          total_amount: cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
        }
      };
    }

    return { success: false, message: `Invalid action: ${action}` };
  },

  // View the current shopping cart
  async viewCart(args: { user_name?: string }) {
    const cart = SHOPPING_CARTS[current_conversation];
    if (!cart || cart.items.length === 0) {
      return { message: 'Your cart is empty' };
    }

    const taxRate = 0.08; // 8% tax
    const totalAmount = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const estimatedTax = totalAmount * taxRate;
    const estimatedTotal = totalAmount + estimatedTax;

    return {
      items: cart.items.map((item: any) => ({
        product_name: item.product_name,
        quantity: item.quantity,
        price_per_item: item.price,
        total_price: item.price * item.quantity
      })),
      total_amount: parseFloat(totalAmount.toFixed(2)),
      total_items: cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      estimated_tax: parseFloat(estimatedTax.toFixed(2)),
      estimated_total: parseFloat(estimatedTotal.toFixed(2))
    };
  },

  // Process the checkout
  async checkoutOrder(args: { shipping_address: string, payment_method: string, user_name?: string }) {
    const { shipping_address, payment_method } = args;
    const cart = SHOPPING_CARTS[current_conversation];

    if (!cart || cart.items.length === 0) {
      return { success: false, error: 'Your cart is empty. Please add items before checking out.' };
    }

    // Validate stock one last time
    for (const item of cart.items) {
      const product = findProduct(item.product_id);
      if (!product || product.stock < item.quantity) {
        return { success: false, error: `Insufficient stock for ${item.product_name}` };
      }
    }

    // Process order (update stock, etc.)
    for (const item of cart.items) {
      const product = findProduct(item.product_id);
      if (product) {
        product.stock -= item.quantity;
      }
    }

    const totalAmount = cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now()}`;

    // Clear the cart
    delete SHOPPING_CARTS[current_conversation];

    return {
      success: true,
      order_id: orderId,
      total_amount: totalAmount,
      tracking_number: `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString() // 5 days
    };
  },
};

// Tool definitions for the LLM
export const SHOPPING_TOOLS = [
  {
    name: 'recommend_products',
    description: 'Recommends products based on user queries, categories, and price ranges. Use for browsing or finding items.',
    handler: ShoppingToolHandler.recommendProducts,
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'User\'s search query (e.g., "wireless headphones", "running shoes")' },
        category: { type: 'string', enum: ['Electronics', 'Sports'], description: 'Optional product category' },
        price_range: { type: 'array', items: { type: 'number' }, description: 'Optional price range [min, max]' },
        limit: { type: 'number', description: 'Number of recommendations to return (default 5)' }
      },
      required: ['query'],
    },
  },
  {
    name: 'get_product_info',
    description: 'Provides detailed information about a specific product, including reviews and availability.',
    handler: ShoppingToolHandler.getProductInfo,
    parameters: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'The ID or name of the product' },
        include_reviews: { type: 'boolean', description: 'Whether to include customer reviews (default false)' },
        include_availability: { type: 'boolean', description: 'Whether to include stock availability (default true)' }
      },
      required: ['product_id'],
    },
  },
  {
    name: 'add_to_cart',
    description: 'Adds a specified quantity of a product to the user\'s shopping cart. Always add to cart before checkout.',
    handler: ShoppingToolHandler.addToCart,
    parameters: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'The ID or name of the product to add' },
        quantity: { type: 'number', description: 'Number of items to add (default 1)' },
      },
      required: ['product_id'],
    },
  },
  {
    name: 'update_cart',
    description: 'Updates the quantity of an item in the cart or removes it completely.',
    handler: ShoppingToolHandler.updateCart,
    parameters: {
      type: 'object',
      properties: {
        product_id: { type: 'string', description: 'The ID or name of the product to update' },
        action: { type: 'string', enum: ['set_quantity', 'remove'], description: 'Action to perform' },
        quantity: { type: 'number', description: 'New quantity (for "set_quantity" action)' }
      },
      required: ['product_id', 'action'],
    },
  },
  {
    name: 'view_cart',
    description: 'Displays the current contents of the user\'s shopping cart with totals and tax calculations.',
    handler: ShoppingToolHandler.viewCart,
    parameters: {
      type: 'object',
      properties: {},
      required: [] as const,
    },
  },
  {
    name: 'checkout_order',
    description: 'Processes the checkout for items in the cart, requiring shipping and payment details.',
    handler: ShoppingToolHandler.checkoutOrder,
    parameters: {
      type: 'object',
      properties: {
        shipping_address: { type: 'string', description: 'User\'s full shipping address' },
        payment_method: { type: 'string', description: 'User\'s payment method (e.g., "credit card", "PayPal")' },
      },
      required: ['shipping_address', 'payment_method'],
    },
  },
];
