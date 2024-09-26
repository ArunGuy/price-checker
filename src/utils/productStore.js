import { saveToCSV, loadFromCSV } from './csvUtils';

let products = [];

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
  saveToCSV(products);
  return Promise.resolve(newProduct);
};

export const editProduct = (updatedProduct) => {
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveToCSV(products);
    return Promise.resolve(products[index]);
  }
  return Promise.reject(new Error('Product not found'));
};

export const loadProductsFromCSV = async (fileName) => {
  products = await loadFromCSV(fileName);
  return products;
};
