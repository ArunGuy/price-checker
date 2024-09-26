// ในสถานการณ์จริง คุณจะต้องใช้ API หรือ backend service เพื่อจัดการไฟล์ CSV
// ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น

export const getAvailableCSVFiles = () => {
  // สมมติว่าเรามีไฟล์ CSV 3 ไฟล์
  return Promise.resolve(['products1.csv', 'products2.csv', 'products3.csv']);
};

export const loadCSVFile = (fileName) => {
  // จำลองการโหลดไฟล์ CSV
  console.log(`กำลังโหลดไฟล์ ${fileName}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};