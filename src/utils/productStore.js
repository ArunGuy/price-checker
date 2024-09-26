// ในสถานการณ์จริง คุณจะต้องใช้ API หรือ backend service เพื่อจัดการข้อมูลสินค้า
// ตัวอย่างนี้เป็นเพียงการจำลองการทำงานเท่านั้น

let products = [
  { id: 1, name: 'สินค้า A', price: 100 },
  { id: 2, name: 'สินค้า B', price: 200 },
  { id: 3, name: 'สินค้า C', price: 300 },
];

export const getAllProducts = () => {
  return Promise.resolve(products);
};

export const searchProducts = (searchTerm) => {
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return Promise.resolve(results);
};

export const addProduct = (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product,
  };
  products.push(newProduct);
  return Promise.resolve(newProduct);
};