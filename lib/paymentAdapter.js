/**
 * Payment Adapter for SSLCommerz integration
 * This file uses an adapter pattern to make it easy to switch payment providers
 */

// Mock implementation for development
const mockPaymentProvider = {
  initiatePayment: async (amount, orderId, customerInfo) => {
    console.log(`Initiating mock payment of ${amount} BDT for order ${orderId}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock payment URL
    return {
      success: true,
      paymentUrl: `https://mockpayment.com/pay/${orderId}?amount=${amount}`,
      transactionId: `MOCK-${Date.now()}`
    };
  },
  
  verifyPayment: async (transactionId) => {
    console.log(`Verifying mock payment for transaction ${transactionId}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock verification result
    return {
      success: true,
      verified: true,
      amount: 5000,
      paymentDate: new Date().toISOString()
    };
  }
};

// SSLCommerz implementation (to be implemented when ready)
const sslCommerzProvider = {
  initiatePayment: async (amount, orderId, customerInfo) => {
    // This will be implemented with actual SSLCommerz API
    throw new Error('SSLCommerz integration not implemented yet');
  },
  
  verifyPayment: async (transactionId) => {
    // This will be implemented with actual SSLCommerz API
    throw new Error('SSLCommerz integration not implemented yet');
  }
};

// Export the appropriate provider based on environment
const paymentAdapter = process.env.NODE_ENV === 'production' 
  ? sslCommerzProvider 
  : mockPaymentProvider;

export default paymentAdapter;