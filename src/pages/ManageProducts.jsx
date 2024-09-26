import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AddProduct from '../components/AddProduct';
import ProductList from '../components/ProductList';
import { getAllProducts, loadProductsFromCSV } from '../utils/productStore';
import { saveCSVToLocal, loadCSVFromLocal } from '../utils/csvUtils';

const ManageProducts = () => {
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const handleSaveToLocal = () => {
    if (products) {
      saveCSVToLocal(products, 'products.csv');
    }
  };

  const handleLoadFromLocal = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const loadedProducts = await loadCSVFromLocal(file);
        await loadProductsFromCSV(file.name, loadedProducts);
        queryClient.invalidateQueries('products');
        alert('ไฟล์ CSV ถูกโหลดเรียบร้อยแล้ว');
      } catch (error) {
        alert(`เกิดข้อผิดพลาดในการโหลดไฟล์: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">จัดการสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddProduct />
          <div className="mt-4">
            <button
              onClick={handleSaveToLocal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mr-2"
            >
              บันทึก CSV ลงเครื่อง
            </button>
            <input
              type="file"
              accept=".csv"
              onChange={handleLoadFromLocal}
              className="hidden"
              id="csvFileInput"
            />
            <label
              htmlFor="csvFileInput"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors cursor-pointer"
            >
              โหลด CSV จากเครื่อง
            </label>
          </div>
        </div>
        <div>
          <ProductList />
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          กลับไปยังหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default ManageProducts;
