import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Download, Upload } from 'lucide-react';
import { saveCSVToLocal, loadCSVFromLocal } from '../utils/csvUtils';
import { getAllProducts, loadProductsFromCSV } from '../utils/productStore';

const CSVActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSaveToLocal = async () => {
    const products = await getAllProducts();
    saveCSVToLocal(products, 'products.csv');
    setIsOpen(false);
  };

  const handleLoadFromLocal = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const loadedProducts = await loadCSVFromLocal(file);
        await loadProductsFromCSV(file.name, loadedProducts);
        queryClient.invalidateQueries('products');
        setIsOpen(false);
        alert('ไฟล์ CSV ถูกโหลดเรียบร้อยแล้ว');
      } catch (error) {
        alert(`เกิดข้อผิดพลาดในการโหลดไฟล์: ${error.message}`);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
      >
        <Download className="h-5 w-5" />
        <span>CSV</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <button
            onClick={handleSaveToLocal}
            className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            <Download className="h-5 w-5" />
            <span>บันทึก CSV</span>
          </button>
          <label className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">
            <Upload className="h-5 w-5" />
            <span>โหลด CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleLoadFromLocal}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default CSVActions;