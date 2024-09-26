import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../utils/productStore';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: searchResults, refetch } = useQuery({
    queryKey: ['searchProducts', searchTerm],
    queryFn: () => searchProducts(searchTerm),
    enabled: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">ค้นหาสินค้า</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ชื่อสินค้า"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
          ค้นหา
        </button>
      </form>
      {searchResults && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">ผลการค้นหา</h3>
          {searchResults.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <li key={product.id} className="bg-white p-4 rounded-lg shadow">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
                  )}
                  <span className="font-medium text-gray-800">{product.name}</span>
                  <span className="block text-gray-600">ราคา: {product.price} บาท</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">ไม่พบสินค้า</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
