import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, text: 'หน้าหลัก', path: '/' },
    { icon: Package, text: 'จัดการสินค้า', path: '/manage' },
  ];

  return (
    <div className="bg-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === item.path
                ? 'bg-purple-500 text-white'
                : 'text-gray-700 hover:bg-purple-100'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.text}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-2">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-500 w-full py-2.5 px-4">
          <HelpCircle className="h-5 w-5" />
          <span>ช่วยเหลือ</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;