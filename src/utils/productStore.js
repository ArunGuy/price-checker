import { saveToCSV, loadFromCSV } from './csvUtils';

let products = [];
let currentFileName = localStorage.getItem('currentFileName') || 'products.csv';

const saveToLocalStorage = () => {
  localStorage.setItem('products', JSON.stringify(products));
  localStorage.setItem('currentFileName', currentFileName);
};

const loadFromLocalStorage = () => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    return true;
  }
  return false;
};

export const getAllProducts = async (page = 0, limit = 12) => {
  if (products.length === 0 && !loadFromLocalStorage()) {
    try {
      products = await loadFromCSV(currentFileName);
      saveToLocalStorage();
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }
  const start = page * limit;
  const end = start + limit;
  return products.slice(start, end);
};

export const searchProducts = async (searchTerm) => {
  if (products.length === 0 && !loadFromLocalStorage()) {
    try {
      products = await loadFromCSV(currentFileName);
      saveToLocalStorage();
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }
  const lowercaseSearchTerm = searchTerm.toLowerCase();
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(lowercaseSearchTerm)
  );
  return results;
};

export const addProduct = async (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product,
  };
  products.push(newProduct);
  await saveToCSV(products, currentFileName);
  saveToLocalStorage();
  return newProduct;
};

export const editProduct = async (updatedProduct) => {
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    await saveToCSV(products, currentFileName);
    saveToLocalStorage();
    return products[index];
  }
  throw new Error('Product not found');
};

export const loadProductsFromCSV = async (fileName, loadedProducts = null) => {
  if (loadedProducts) {
    products = loadedProducts;
  } else {
    products = await loadFromCSV(fileName);
  }
  currentFileName = fileName;
  saveToLocalStorage();
  return products;
};