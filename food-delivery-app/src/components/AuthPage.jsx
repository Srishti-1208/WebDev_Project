// src/components/AuthPage.jsx
import React, { useState } from 'react';
import { BookOpen, Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, X } from 'lucide-react';

// Mock user database - USE THESE CREDENTIALS TO LOGIN
const USERS = [
  { id: 1, email: 'student@eduaid.com', password: 'student123', name: 'Rahul Sharma', role: 'student' },
  { id: 2, email: 'teacher@eduaid.com', password: 'teacher123', name: 'Prof. Priya Kumar', role: 'teacher' },
  { id: 3, email: 'admin@eduaid.com', password: 'admin123', name: 'Admin User', role: 'admin' }
];

export default function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    if (isLogin) {
      // Login logic
      const user = USERS.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLogin(user);
        }, 1500);
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Signup logic
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (USERS.find(u => u.email === formData.email)) {
        setError('Email already registered');
        return;
      }
      
      setSuccess('Account created successfully! Please login.');
      setTimeout(() => {
        setIsLogin(true);
        setFormData({ name: '', email: formData.email, password: '', confirmPassword: '' });
        setSuccess('');
      }, 2000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/85 via-orange-900/80 to-red-900/85 backdrop-blur-sm"></div>
      </div>

      {/* Floating Books Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <BookOpen size={60} className="text-amber-200/30" />
        </div>
        <div className="absolute bottom-32 right-16 animate-float-delayed">
          <BookOpen size={80} className="text-orange-200/30" />
        </div>
        <div className="absolute top-1/2 left-20 animate-float-slow">
          <BookOpen size={50} className="text-yellow-200/30" />
        </div>
        <div className="absolute top-1/4 right-1/4 animate-float">
          <BookOpen size={70} className="text-amber-300/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl mb-4 transform hover:scale-110 transition-transform">
              <BookOpen size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">EduAid</h1>
            <p className="text-amber-100 text-lg">Resource Sharing Platform</p>
          </div>

          {/* Auth Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-amber-200/50">
            {/* Tabs */}
            <div className="flex bg-amber-50 rounded-xl p-1 mb-6">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  isLogin
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <LogIn size={18} className="inline mr-2" />
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setSuccess('');
                }}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  !isLogin
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <UserPlus size={18} className="inline mr-2" />
                Sign Up
              </button>
            </div>

            {/* Demo Credentials */}
            {isLogin && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-amber-900 mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-amber-800">
                  <p><span className="font-medium">Student:</span> student@eduaid.com / student123</p>
                  <p><span className="font-medium">Teacher:</span> teacher@eduaid.com / teacher123</p>
                  <p><span className="font-medium">Admin:</span> admin@eduaid.com / admin123</p>
                </div>
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center">
                <X size={18} className="mr-2" />
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4">
                {success}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="mr-2 rounded text-amber-500" />
                    Remember me
                  </label>
                  <button type="button" className="text-amber-600 hover:text-amber-700 font-medium">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </div>

            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    Sign up now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-amber-100 text-sm mt-6">
            © 2024 EduAid. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}