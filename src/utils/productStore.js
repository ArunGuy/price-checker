import { saveToCSV, loadFromCSV } from './csvUtils';

let products = [];
let currentFileName = 'products.csv';

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
  saveToCSV(products, currentFileName);
  return Promise.resolve(newProduct);
};

export const editProduct = (updatedProduct) => {
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveToCSV(products, currentFileName);
    return Promise.resolve(products[index]);
  }
  return Promise.reject(new Error('Product not found'));
};

export const loadProductsFromCSV = async (fileName, loadedProducts = null) => {
  if (loadedProducts) {
    products = loadedProducts;
  } else {
    products = await loadFromCSV(fileName);
  }
  currentFileName = fileName;
  return products;
};
