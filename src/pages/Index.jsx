import React from 'react';
import { Link } from 'react-router-dom';
import ProductSearch from '../components/ProductSearch';
import CSVLoader from '../components/CSVLoader';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">ระบบเช็คราคาสินค้า</h1>
      <div className="max-w-2xl mx-auto">
        <ProductSearch />
        <CSVLoader />
        <div className="mt-8 text-center">
          <Link to="/manage" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            ไปยังหน้าจัดการสินค้า
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
