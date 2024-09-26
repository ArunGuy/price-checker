import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailableCSVFiles, loadCSVFile } from '../utils/csvUtils';
import { loadProductsFromCSV } from '../utils/productStore';

const CSVLoader = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const queryClient = useQueryClient();

  const { data: csvFiles } = useQuery({
    queryKey: ['csvFiles'],
    queryFn: getAvailableCSVFiles,
  });

  const loadCSVMutation = useMutation({
    mutationFn: async (fileName) => {
      const products = await loadCSVFile(fileName);
      await loadProductsFromCSV(fileName);
      return products;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      alert('CSV ไฟล์ถูกโหลดเรียบร้อยแล้ว');
    },
    onError: (error) => {
      alert(`เกิดข้อผิดพลาดในการโหลดไฟล์: ${error.message}`);
    },
  });

  const handleLoadCSV = () => {
    if (selectedFile) {
      loadCSVMutation.mutate(selectedFile);
    } else {
      alert('กรุณาเลือกไฟล์ CSV');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">โหลดข้อมูลจาก CSV</h2>
      <div className="flex gap-2">
        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">เลือกไฟล์ CSV</option>
          {csvFiles?.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
        <button
          onClick={handleLoadCSV}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          โหลด CSV
        </button>
      </div>
    </div>
  );
};

export default CSVLoader;
