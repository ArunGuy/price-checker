import { parse, unparse } from 'papaparse';

export const getAvailableCSVFiles = () => {
  // ในสถานการณ์จริง คุณจะต้องใช้ API หรือ backend service เพื่อจัดการไฟล์ CSV
  // ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น
  return Promise.resolve(['products.csv', 'test_products.csv']);
};

export const loadFromCSV = (fileName) => {
  return new Promise((resolve, reject) => {
    fetch(`/data/${fileName}`)
      .then(response => response.text())
      .then(csvData => {
        parse(csvData, {
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
      })
      .catch(error => reject(error));
  });
};

export const saveToCSV = (products, fileName = 'products.csv') => {
  const csv = unparse(products);
  // ในสถานการณ์จริง คุณจะต้องใช้ API หรือ backend service เพื่อบันทึกไฟล์
  // ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น
  console.log(`บันทึกข้อมูลลงในไฟล์ ${fileName} เรียบร้อยแล้ว`);
  return Promise.resolve();
};

export const loadCSVFile = async (fileName) => {
  console.log(`กำลังโหลดไฟล์ ${fileName}`);
  const products = await loadFromCSV(fileName);
  return products;
};

// ฟังก์ชันใหม่สำหรับการบันทึกไฟล์ CSV ลงเครื่องของผู้ใช้
export const saveCSVToLocal = (products, fileName = 'products.csv') => {
  const csv = unparse(products);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// ฟังก์ชันใหม่สำหรับการโหลดไฟล์ CSV จากเครื่องของผู้ใช้
export const loadCSVFromLocal = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      parse(e.target.result, {
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
    };
    reader.readAsText(file);
  });
};
