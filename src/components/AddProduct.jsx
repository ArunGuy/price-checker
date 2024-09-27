import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package, DollarSign, Image } from 'lucide-react';
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Package className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อสินค้า เช่น สมาร์ทโฟน รุ่น X"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <DollarSign className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="ราคา เช่น 15000"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <Image className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL รูปภาพ (ไม่บังคับ)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition duration-300"
        >
          เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
};

export default AddProduct;