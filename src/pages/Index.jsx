import React from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from '../components/ProductSearch';
import CSVLoader from '../components/CSVLoader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">ระบบเช็คราคาสินค้า</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <ProductSearch />
          <CSVLoader />
          <div className="mt-8 text-center">
            <Link 
              to="/manage" 
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300 inline-flex items-center"
            >
              <span className="mr-2">ไปยังหน้าจัดการสินค้า</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
