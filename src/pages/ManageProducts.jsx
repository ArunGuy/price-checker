import React from 'react';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';

const ManageProducts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">จัดการสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <AddProduct />
        </div>
        <div className="md:col-span-2">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;