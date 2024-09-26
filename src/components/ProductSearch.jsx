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
      <h2 className="text-2xl font-semibold mb-4">ค้นหาสินค้า</h2>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ชื่อสินค้า"
          className="flex-grow px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          ค้นหา
        </button>
      </form>
      {searchResults && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">ผลการค้นหา</h3>
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li key={product.id} className="mb-2">
                  {product.name} - ราคา: {product.price} บาท
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่พบสินค้า</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;