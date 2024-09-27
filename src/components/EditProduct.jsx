import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProduct } from '../utils/productStore';

const EditProduct = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl || '');
  const queryClient = useQueryClient();

  const editProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      onClose();
      alert('แก้ไขสินค้าเรียบร้อยแล้ว');
    },
    onError: (error) => {
      alert(`เกิดข้อผิดพลาดในการแก้ไขสินค้า: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      editProductMutation.mutate({ id: product.id, name, price: parseFloat(price), imageUrl });
    } else {
      alert('กรุณากรอกชื่อสินค้าและราคา');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">แก้ไขสินค้า</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อสินค้า"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="ราคา"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL รูปภาพ (ไม่บังคับ)"
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
              ยกเลิก
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;