import { useState, useEffect } from 'react';
import { loginUser, registerUser, resetPassword } from '../lib/auth';
import { validateEmail, checkPasswordStrength, sanitizeInput } from '../lib/security';

type AuthMode = 'login' | 'register' | 'reset';

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; feedback: string; isStrong: boolean }>({ score: 0, feedback: '', isStrong: false });

  // Check password strength when password changes
  useEffect(() => {
    if (mode === 'register' && password) {
      const result = checkPasswordStrength(password);
      setPasswordStrength({
        score: result.score,
        feedback: result.feedback,
        isStrong: result.isStrong !== undefined ? result.isStrong : false
      });
    }
  }, [password, mode]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(sanitizeInput(e.target.value));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(sanitizeInput(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(sanitizeInput(e.target.value));
  };

  const handleNidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNid(e.target.value); // NID will be encrypted, no need to sanitize
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate password strength for registration
    if (mode === 'register' && !passwordStrength.isStrong) {
      setError(`Please use a stronger password. ${passwordStrength.feedback}`);
      setLoading(false);
      return;
    }

    try {
      if (mode === 'login') {
        const result = await loginUser(email, password);
        if (result.success) {
          setSuccess('Login successful! Redirecting...');
          window.location.href = '/dashboard';
        } else {
          setError(result.error);
        }
      } else if (mode === 'register') {
        const result = await registerUser(email, password, { name, phone, nid });
        if (result.success) {
          setSuccess('Registration successful! Please verify your email.');
          setMode('login');
        } else {
          setError(result.error);
        }
      } else if (mode === 'reset') {
        const result = await resetPassword(email);
        if (result.success) {
          setSuccess('Password reset email sent. Check your inbox.');
        } else {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-trust-blue mb-6 text-center">
        {mode === 'login' ? 'Login' : mode === 'register' ? 'Create Account' : 'Reset Password'}
      </h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust-blue"
            required
            disabled={loading}
          />
        </div>

        {mode !== 'reset' && (
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust-blue"
              required
              disabled={loading}
            />
            
            {mode === 'register' && password && (
              <div className="mt-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      passwordStrength.score <= 1 ? 'bg-red-500' : 
                      passwordStrength.score <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
                <p className={`text-sm mt-1 ${
                  passwordStrength.score <= 1 ? 'text-red-500' : 
                  passwordStrength.score <= 3 ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {passwordStrength.feedback}
                </p>
              </div>
            )}
          </div>
        )}

        {mode === 'register' && (
          <>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust-blue"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust-blue"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nid" className="block text-gray-700 mb-2">
                NID Number
              </label>
              <input
                type="text"
                id="nid"
                value={nid}
                onChange={handleNidChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trust-blue"
                required
                disabled={loading}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-trust-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mb-4"
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : mode === 'login'
            ? 'Login'
            : mode === 'register'
            ? 'Create Account'
            : 'Send Reset Link'}
        </button>
      </form>

      <div className="text-center text-sm">
        {mode === 'login' ? (
          <>
            <p className="mb-2">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-trust-blue hover:underline"
                disabled={loading}
              >
                Register
              </button>
            </p>
            <button
              onClick={() => setMode('reset')}
              className="text-trust-blue hover:underline"
              disabled={loading}
            >
              Forgot password?
            </button>
          </>
        ) : (
          <button
            onClick={() => setMode('login')}
            className="text-trust-blue hover:underline"
            disabled={loading}
          >
            Back to login
          </button>
        )}
      </div>
    </div>
  );
}