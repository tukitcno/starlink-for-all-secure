import supabase from './supabase';
import { encryptData, decryptData, validateEmail, sanitizeInput } from './security';

// Register a new user
export const registerUser = async (email, password, userData) => {
  try {
    // Validate email format
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    
    // Validate password strength
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long' };
    }
    
    // Sanitize user inputs
    const sanitizedUserData = {
      name: sanitizeInput(userData.name),
      phone: sanitizeInput(userData.phone),
      nid: userData.nid // Will be encrypted, no need to sanitize
    };
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (authError) throw authError;

    // Encrypt sensitive data
    const encryptedNID = sanitizedUserData.nid ? encryptData(sanitizedUserData.nid) : null;
    
    // Create user profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: email,
          name: sanitizedUserData.name,
          phone: sanitizedUserData.phone,
          encrypted_nid: encryptedNID,
          user_type: userData.userType || 'investor',
          created_at: new Date().toISOString(),
          verification_status: 'pending',
          login_attempts: 0,
          last_login: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    
    return { success: true, user: authData.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Login user with rate limiting and brute force protection
export const loginUser = async (email, password) => {
  try {
    // Validate email format
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    
    // Check if account is locked
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('login_attempts, lockout_until')
      .eq('email', email)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }
    
    // If profile exists and is locked out
    if (profileData && profileData.lockout_until && new Date(profileData.lockout_until) > new Date()) {
      const timeLeft = Math.ceil((new Date(profileData.lockout_until) - new Date()) / 1000 / 60);
      return { 
        success: false, 
        error: `Account temporarily locked. Please try again in ${timeLeft} minutes.` 
      };
    }
    
    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Increment login attempts on failure
      if (profileData) {
        const attempts = (profileData.login_attempts || 0) + 1;
        let lockoutUntil = null;
        
        // Lock account after 5 failed attempts
        if (attempts >= 5) {
          // Lock for 15 minutes
          lockoutUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        }
        
        await supabase
          .from('profiles')
          .update({ 
            login_attempts: attempts,
            lockout_until: lockoutUntil
          })
          .eq('email', email);
          
        if (lockoutUntil) {
          return { 
            success: false, 
            error: 'Too many failed login attempts. Account locked for 15 minutes.' 
          };
        }
      }
      
      throw error;
    }
    
    // Reset login attempts on successful login
    await supabase
      .from('profiles')
      .update({ 
        login_attempts: 0,
        lockout_until: null,
        last_login: new Date().toISOString()
      })
      .eq('id', data.user.id);
    
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Reset password with rate limiting
export const resetPassword = async (email) => {
  try {
    // Validate email format
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }
    
    // Check for rate limiting in local storage
    const lastReset = localStorage.getItem('lastPasswordReset');
    if (lastReset) {
      const timeSinceLastReset = Date.now() - parseInt(lastReset, 10);
      if (timeSinceLastReset < 60000) { // 1 minute cooldown
        return { 
          success: false, 
          error: 'Please wait before requesting another password reset.' 
        };
      }
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) throw error;
    
    // Store timestamp of this reset request
    localStorage.setItem('lastPasswordReset', Date.now().toString());
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user profile with secure data handling
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    // Don't return encrypted data directly
    const { encrypted_nid, login_attempts, lockout_until, ...safeUserData } = data;
    
    return { success: true, profile: safeUserData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update user profile with security measures
export const updateUserProfile = async (userId, userData) => {
  try {
    // Sanitize inputs
    const sanitizedData = {
      name: userData.name ? sanitizeInput(userData.name) : undefined,
      phone: userData.phone ? sanitizeInput(userData.phone) : undefined,
      // Other fields as needed
    };
    
    // Don't allow updating sensitive fields directly
    delete sanitizedData.email;
    delete sanitizedData.encrypted_nid;
    delete sanitizedData.verification_status;
    delete sanitizedData.user_type;
    delete sanitizedData.login_attempts;
    delete sanitizedData.lockout_until;
    
    const { data, error } = await supabase
      .from('profiles')
      .update(sanitizedData)
      .eq('id', userId);
      
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};