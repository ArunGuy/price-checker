import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../utils/productStore';
import EditProduct from './EditProduct';

const ProductList = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  if (isLoading) return <div className="text-center py-4">กำลังโหลด...</div>;
  if (error) return <div className="text-center py-4 text-red-500">เกิดข้อผิดพลาด: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">รายการสินค้าทั้งหมด</h2>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white p-4 rounded-lg shadow">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
              )}
              <span className="font-medium text-gray-800">{product.name}</span>
              <span className="block text-gray-600">ราคา: {product.price} บาท</span>
              <button
                onClick={() => setEditingProduct(product)}
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300"
              >
                แก้ไข
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-4 text-gray-600">ไม่มีสินค้าในระบบ</p>
      )}
      {editingProduct && (
        <EditProduct product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;
