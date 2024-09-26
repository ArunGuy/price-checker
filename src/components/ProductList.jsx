import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../utils/productStore';

const ProductList = () => {
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
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-2">
              {product.name} - ราคา: {product.price} บาท
            </li>
          ))}
        </ul>
      ) : (
        <p>ไม่มีสินค้าในระบบ</p>
      )}
    </div>
  );
};

export default ProductList;