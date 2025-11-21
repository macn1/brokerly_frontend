import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setUser } from '../../store/userSlice';
import {
  storeAuthToken,
  storeUserName,
  storeUserType,
  storeUserID,
  storeEmailID
} from '../../storage/storage';

import { useLoginVendorMutation } from '../../store/api/vendor';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loginUser] = useLoginVendorMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await loginUser(formData).unwrap();

      // Store values
      storeAuthToken(response.access);
      storeUserType(response.user.role);
      storeUserID(response.user.id);
      storeUserName(response.user.name);
      storeEmailID(response.user.email);

      dispatch(
        setUser({
          id: response.user.id,
          userName: response.user.name,
          email: response.user.email,
          token: response.access,
          role: response.user.role
        })
      );

      navigate('/admin/dashboard');; // change path if needed
    } catch (err) {
      console.log('Login error:', err);
      setErrorMsg(err?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">

        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LS</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sky-100">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          
          {/* Error Message */}
          {errorMsg && (
            <div className="text-red-600 text-sm mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-sky-600">Forgot password?</a>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 text-white rounded-xl font-medium shadow-sm transition ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-600 to-blue-600 hover:scale-[1.02]'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/vendor-register" className="text-sky-600">
                Register here
              </a>
            </p>
          </div>

        </div>

        <p className="text-center text-sm text-sky-200">
          © 2024 stackerbee All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
