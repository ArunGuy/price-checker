import React from 'react';
import ProductSearch from '../components/ProductSearch';
import CSVLoader from '../components/CSVLoader';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">ระบบเช็คราคาสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductSearch />
          <CSVLoader />
        </div>
        <div>
          <AddProduct />
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Index;
