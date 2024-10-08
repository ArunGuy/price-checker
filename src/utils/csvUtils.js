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

export const saveToCSV = async (products, fileName = 'products.csv') => {
  const csv = unparse(products);
  // ในสถานการณ์จริง คุณจะต้องใช้ API หรือ backend service เพื่อบันทึกไฟล์
  // ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น
  console.log(`บันทึกข้อมูลลงในไฟล์ ${fileName} เรียบร้อยแล้ว`);
  console.log(csv); // แสดงข้อมูล CSV ในคอนโซลเพื่อการตรวจสอบ
  localStorage.setItem('currentFileName', fileName);
  return Promise.resolve();
};

export const loadCSVFile = async (fileName) => {
  console.log(`กำลังโหลดไฟล์ ${fileName}`);
  const products = await loadFromCSV(fileName);
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('currentFileName', fileName);
  return products;
};

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
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('currentFileName', fileName);
};

export const loadCSVFromLocal = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      parse(e.target.result, {
        header: true,
        complete: (results) => {
          const products = results.data.map(item => ({
            ...item,
            id: parseInt(item.id),
            price: parseFloat(item.price)
          }));
          localStorage.setItem('products', JSON.stringify(products));
          localStorage.setItem('currentFileName', file.name);
          resolve(products);
        },
        error: (error) => {
          reject(error);
        }
      });
    };
    reader.readAsText(file);
  });
};