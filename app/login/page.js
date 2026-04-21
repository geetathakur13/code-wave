'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (resetMode) {
        await resetPassword(email);
        setResetSent(true);
        setLoading(false);
        return;
      }
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!name.trim()) { setError('Please enter your name'); setLoading(false); return; }
        await signUp(email, password, name.trim());
      }
      router.push('/dashboard');
    } catch (err) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err?.message || 'Something went wrong. Please check your Firebase configuration.');
      }
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError(err?.message || 'Google sign-in failed. Please check your Firebase configuration.');
    }
    setLoading(false);
  };

  if (resetMode) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="StudyHouse" width={56} height={56} className="mx-auto mb-4 rounded-xl" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Reset Password</h1>
            <p className="text-sm text-gray-500 dark:text-slate-400">Enter your email to receive a reset link</p>
          </div>

          {resetSent ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
              <p className="text-green-700 dark:text-green-400 font-medium mb-2">Reset email sent!</p>
              <p className="text-sm text-green-600 dark:text-green-500 mb-4">Check your inbox for the password reset link.</p>
              <button onClick={() => { setResetMode(false); setResetSent(false); }}
                className="text-primary-600 hover:underline text-sm font-medium">Back to Login</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">{error}</div>}
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email address"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => setResetMode(false)} className="w-full text-center text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white">
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="StudyHouse" width={56} height={56} className="mx-auto mb-4 rounded-xl" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {isLogin ? 'Sign in to continue to StudyHouse' : 'Join StudyHouse to track your progress'}
          </p>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors mb-6">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-slate-800" /></div>
          <div className="relative flex justify-center"><span className="px-3 bg-white dark:bg-slate-950 text-xs text-gray-400">or continue with email</span></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">{error}</div>}

          {!isLogin && (
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500" />
            </div>
          )}

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email address"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500" />
          </div>

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" minLength={6}
              className="w-full pl-11 pr-11 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" onClick={() => setResetMode(true)} className="text-xs text-primary-600 hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-primary-600 hover:underline font-medium">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
