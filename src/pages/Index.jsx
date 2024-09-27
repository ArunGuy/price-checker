import React from 'react';
import ProductSearch from '../components/ProductSearch';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">ระบบเช็คราคาสินค้า</h1>
      <div className="max-w-3xl mx-auto">
        <ProductSearch />
      </div>
    </div>
  );
};

export default Index;