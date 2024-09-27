import React from 'react';
import { Search, Bell } from 'lucide-react';
import ProductSearch from './ProductSearch';
import CSVActions from './CSVActions';

const TopBar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <ProductSearch />
        <div className="flex items-center space-x-4">
          <CSVActions />
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
          </button>
          <img
            className="h-8 w-8 rounded-full"
            src="https://via.placeholder.com/32"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;