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

  if (isLoading) return <div>กำลังโหลด...</div>;
  if (error) return <div>เกิดข้อผิดพลาด: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">รายการสินค้าทั้งหมด</h2>
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
              <span>{product.name} - ราคา: {product.price} บาท</span>
              <button
                onClick={() => setEditingProduct(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
              >
                แก้ไข
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>ไม่มีสินค้าในระบบ</p>
      )}
      {editingProduct && (
        <EditProduct product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;
