import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAvailableCSVFiles, loadCSVFile } from '../utils/csvUtils';

const CSVLoader = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const queryClient = useQueryClient();

  const { data: csvFiles } = useQuery({
    queryKey: ['csvFiles'],
    queryFn: getAvailableCSVFiles,
  });

  const loadCSVMutation = useMutation({
    mutationFn: loadCSVFile,
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
      <h2 className="text-2xl font-semibold mb-4">โหลดข้อมูลจาก CSV</h2>
      <div className="flex gap-2">
        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
          className="flex-grow px-4 py-2 border rounded"
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
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          โหลด CSV
        </button>
      </div>
    </div>
  );
};

export default CSVLoader;