// Input validation utility functions

/**
 * Validates an investment amount
 * @param {number} amount - The investment amount to validate
 * @param {number} minAmount - Minimum allowed amount
 * @param {number} maxAmount - Maximum allowed amount
 * @returns {Object} Validation result with isValid and message
 */
export const validateInvestmentAmount = (amount, minAmount = 1000, maxAmount = 1000000) => {
  // Check if amount is a number
  if (typeof amount !== 'number' || isNaN(amount)) {
    return { isValid: false, message: 'Investment amount must be a number' };
  }
  
  // Check if amount is within allowed range
  if (amount < minAmount) {
    return { isValid: false, message: `Minimum investment amount is ${minAmount}` };
  }
  
  if (amount > maxAmount) {
    return { isValid: false, message: `Maximum investment amount is ${maxAmount}` };
  }
  
  return { isValid: true, message: 'Valid investment amount' };
};

/**
 * Validates a phone number format (Bangladesh)
 * @param {string} phone - The phone number to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePhoneNumber = (phone) => {
  // Basic Bangladesh phone number validation
  // Allows formats like: 01712345678, +8801712345678
  const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
  
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Please enter a valid Bangladesh phone number' };
  }
  
  return { isValid: true, message: 'Valid phone number' };
};

/**
 * Validates a Bangladesh National ID (NID) number
 * @param {string} nid - The NID to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateNID = (nid) => {
  // Remove any spaces or dashes
  const cleanNID = nid.replace(/[\s-]/g, '');
  
  // Check if it's a valid Bangladesh NID (10, 13 or 17 digits)
  if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(cleanNID)) {
    return { isValid: false, message: 'Please enter a valid NID number (10, 13, or 17 digits)' };
  }
  
  return { isValid: true, message: 'Valid NID number' };
};

/**
 * Validates a name
 * @param {string} name - The name to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }
  
  // Check for potentially dangerous characters
  if (/[<>{}[\]\\\/]/.test(name)) {
    return { isValid: false, message: 'Name contains invalid characters' };
  }
  
  return { isValid: true, message: 'Valid name' };
};

/**
 * Validates form data object with multiple fields
 * @param {Object} formData - Object containing form fields
 * @param {Object} validationRules - Object defining validation rules for each field
 * @returns {Object} Validation results with isValid and errors
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  // Process each field according to its validation rules
  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];
    
    // Required field check
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${rules.label || field} is required`;
      isValid = false;
      return;
    }
    
    // Skip further validation if field is empty and not required
    if (!value && !rules.required) {
      return;
    }
    
    // Type validation
    if (rules.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field] = `Please enter a valid email address`;
      isValid = false;
    } else if (rules.type === 'phone' && !validatePhoneNumber(value).isValid) {
      errors[field] = validatePhoneNumber(value).message;
      isValid = false;
    } else if (rules.type === 'nid' && !validateNID(value).isValid) {
      errors[field] = validateNID(value).message;
      isValid = false;
    } else if (rules.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[field] = `${rules.label || field} must be a number`;
        isValid = false;
      } else if (rules.min !== undefined && numValue < rules.min) {
        errors[field] = `${rules.label || field} must be at least ${rules.min}`;
        isValid = false;
      } else if (rules.max !== undefined && numValue > rules.max) {
        errors[field] = `${rules.label || field} must be at most ${rules.max}`;
        isValid = false;
      }
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${rules.label || field} must be at least ${rules.minLength} characters`;
      isValid = false;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${rules.label || field} must be at most ${rules.maxLength} characters`;
      isValid = false;
    }
    
    // Custom validation function
    if (rules.validate && typeof rules.validate === 'function') {
      const customValidation = rules.validate(value, formData);
      if (customValidation !== true) {
        errors[field] = customValidation || `Invalid ${rules.label || field}`;
        isValid = false;
      }
    }
  });
  
  return { isValid, errors };
};