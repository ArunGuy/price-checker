import React from 'react';
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
    </div>
  );
};

export default ManageProducts;