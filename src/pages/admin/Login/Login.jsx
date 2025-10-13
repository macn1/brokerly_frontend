import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import logo from '../../../../src/assets/logo.png';
import background from '../../../../src/assets/apartments/bg.png';
import { setUser } from '../../../store/userSlice'
import { useDispatch } from 'react-redux';
import {
  storeAuthToken,
  storeUserName,
  storeUserType,
  storeUserID,
  storeEmailID
} from '../../../storage/storage';

import { useLoginUserMutation } from '../../../store/api/accounts';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await loginUser(formData).unwrap();
      storeAuthToken(response.access);
      storeUserType(response.user.role);
      storeUserID(response.user.id);
      storeUserName(response.user.name);
      storeEmailID(response.user.email);
      dispatch(setUser({
        id: response.user.id,
        userName: response.user.name,
        email: response.user.email,
        token: response.access,
        role: response.user.role
      }))

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err?.data?.detail || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="backdrop-blur-sm bg-white/70 border border-gray-200 rounded-xl shadow-xl p-10 w-full max-w-md">
        <div className="flex items-center justify-center mb-8 space-x-3">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Admin Portal
          </h2>
        </div>

        {errorMsg && (
          <div className="text-red-600 text-sm mb-4 text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-zinc-200 focus:outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-zinc-200 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold ${isLoading ? 'bg-zinc-700 cursor-not-allowed' : 'bg-zinc-500'
              }`}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
