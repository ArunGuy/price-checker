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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">จัดการสินค้า</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AddProduct />
            <div className="mt-6 flex flex-col space-y-4">
              <button
                onClick={handleSaveToLocal}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                บันทึก CSV ลงเครื่อง
              </button>
              <div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleLoadFromLocal}
                  className="hidden"
                  id="csvFileInput"
                />
                <label
                  htmlFor="csvFileInput"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-pointer inline-flex items-center justify-center w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  โหลด CSV จากเครื่อง
                </label>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ProductList />
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors duration-300 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            กลับไปยังหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
