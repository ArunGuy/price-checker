import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductSearch from '../components/ProductSearch';
import ProductCard from '../components/ProductCard';
import { searchProducts, getAllProducts } from '../utils/productStore';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allProducts, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
  });

  const { data: searchResults, isLoading: isSearching, refetch } = useQuery({
    queryKey: ['searchProducts', searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: searchTerm.length > 0,
  });

  useEffect(() => {
    if (searchTerm.length > 0) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const displayProducts = searchTerm.length > 0 ? searchResults : allProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">ระบบเช็คราคาสินค้า</h1>
      <div className="max-w-3xl mx-auto mb-8">
        <ProductSearch onSearch={handleSearch} />
      </div>
      {isLoadingAll || isSearching ? (
        <p className="text-center text-gray-600">กำลังโหลดข้อมูล...</p>
      ) : displayProducts && displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">ไม่พบสินค้า</p>
      )}
    </div>
  );
};

export default Index;