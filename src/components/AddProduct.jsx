import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../utils/productStore';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      setName('');
      setPrice('');
      setImageUrl('');
      alert('เพิ่มสินค้าเรียบร้อยแล้ว');
    },
    onError: (error) => {
      alert(`เกิดข้อผิดพลาดในการเพิ่มสินค้า: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      addProductMutation.mutate({ name, price: parseFloat(price), imageUrl });
    } else {
      alert('กรุณากรอกชื่อสินค้าและราคา');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อสินค้า"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ราคา"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL รูปภาพ (ไม่บังคับ)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-300"
        >
          เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
