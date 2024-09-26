import React from 'react';
import { Link } from 'react-router-dom';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';

const ManageProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">จัดการสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddProduct />
        </div>
        <div>
          <ProductList />
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          กลับไปยังหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default ManageProducts;
