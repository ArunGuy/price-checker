import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductSearch from '../components/ProductSearch';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../utils/productStore';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: searchResults, refetch } = useQuery({
    queryKey: ['searchProducts', searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: false,
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">ระบบเช็คราคาสินค้า</h1>
      <div className="max-w-3xl mx-auto mb-8">
        <ProductSearch onSearch={handleSearch} />
      </div>
      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : searchTerm && (
        <p className="text-center text-gray-600">ไม่พบสินค้าที่ค้นหา</p>
      )}
    </div>
  );
};

export default Index;