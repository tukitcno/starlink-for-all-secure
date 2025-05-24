import CryptoJS from 'crypto-js';

// Encryption function for sensitive data
export const encryptData = (data) => {
  if (!data) return null;
  
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  if (!key) {
    console.error('Encryption key is not defined');
    return null;
  }
  
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

// Decryption function for sensitive data
export const decryptData = (encryptedData) => {
  if (!encryptedData) return null;
  
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  if (!key) {
    console.error('Encryption key is not defined');
    return null;
  }
  
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};

// Function to sanitize user input
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  // Convert to string if not already
  const str = String(input);
  
  // Basic XSS prevention
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Function to validate email format
export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Function to check password strength
export const checkPasswordStrength = (password) => {
  if (!password) return { score: 0, feedback: 'Password is required' };
  
  let score = 0;
  const feedback = [];
  
  // Length check
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  } else {
    score += 1;
  }
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters');
  
  return {
    score,
    feedback: feedback.join(', ') || 'Password is strong',
    isStrong: score >= 4
  };
};