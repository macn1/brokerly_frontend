import React, { useState } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const id = useSelector((state) => state.user.id);
  const userName = useSelector((state) => state.user.userName);
  const email = useSelector((state) => state.user.email);
  const role = useSelector((state) => state.user.role);
  const token = useSelector((state) => state.user.token);

  console.log(userName,email,role);
  

  const [notificationCount, setNotificationCount] = useState(3);



  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-100 border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between h-16">
        {/* Left section - Page title */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {location?.state?.pageName || 'Dashboard'}
          </h1>
        </div>

        {/* Right section - Icons and profile */}
        <div className="flex items-center space-x-6">
          {/* Notification bell */}
          <button
            onClick={""}
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none transition-all"
          >
            <div className="relative">
              <FaBell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center space-x-2 focus:outline-none group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 text-zinc-600 border border-blue-100">
          
                  <HiOutlineUserCircle className="h-5 w-5" />
              
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                  {userName || 'User Name'}
                </p>
                <p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors capitalize">
                  {role || 'User Role'}
                </p>
              </div>
              <FaChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{userName || 'User Name'}</p>
                  <p className="text-xs text-gray-500 truncate">{email|| 'user@example.com'}</p>
                </div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <HiOutlineUserCircle className="mr-3 h-4 w-4 text-gray-400" />
                  Your Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiSettings className="mr-3 h-4 w-4 text-gray-400" />
                  Settings
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                >
                  <FiLogOut className="mr-3 h-4 w-4 text-red-400" />
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;