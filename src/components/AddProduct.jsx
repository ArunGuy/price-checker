import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../utils/productStore';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      setName('');
      setPrice('');
      alert('เพิ่มสินค้าเรียบร้อยแล้ว');
    },
    onError: (error) => {
      alert(`เกิดข้อผิดพลาดในการเพิ่มสินค้า: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      addProductMutation.mutate({ name, price: parseFloat(price) });
    } else {
      alert('กรุณากรอกชื่อสินค้าและราคา');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อสินค้า"
          className="px-4 py-2 border rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ราคา"
          className="px-4 py-2 border rounded"
        />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
          เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
};

export default AddProduct;