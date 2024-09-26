import { parse, unparse } from 'papaparse';

export const getAvailableCSVFiles = () => {
  // ในสถานการณ์จริง คุณจะต้องใช้ API หรือ backend service เพื่อจัดการไฟล์ CSV
  // ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น
  return Promise.resolve(['products1.csv', 'products2.csv', 'products3.csv']);
};

export const loadFromCSV = (fileName) => {
  return new Promise((resolve, reject) => {
    // ในสถานการณ์จริง คุณจะต้องโหลดไฟล์จากระบบไฟล์หรือ API
    // ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น
    const mockCSVContent = `id,name,price\n1,สินค้า A,100\n2,สินค้า B,200\n3,สินค้า C,300`;
    
    parse(mockCSVContent, {
      header: true,
      complete: (results) => {
        resolve(results.data.map(item => ({
          ...item,
          id: parseInt(item.id),
          price: parseFloat(item.price)
        })));
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const saveToCSV = (products) => {
  const csv = unparse(products);
  // ในสถานการณ์จริง คุณจะต้องบันทึกไฟล์ลงในระบบไฟล์หรือส่งไปยัง API
  console.log('บันทึก CSV:', csv);
};

export const loadCSVFile = async (fileName) => {
  console.log(`กำลังโหลดไฟล์ ${fileName}`);
  const products = await loadFromCSV(fileName);
  return products;
};
