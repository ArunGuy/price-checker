import { saveToCSV, loadFromCSV } from './csvUtils';

let products = [];
let currentFileName = 'products.csv';

export const getAllProducts = async (page = 0, limit = 12) => {
  if (products.length === 0) {
    try {
      products = await loadFromCSV(currentFileName);
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }
  const start = page * limit;
  const end = start + limit;
  return products.slice(start, end);
};

export const searchProducts = (searchTerm) => {
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return Promise.resolve(results);
};

export const addProduct = async (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product,
  };
  products.push(newProduct);
  await saveToCSV(products, currentFileName);
  return newProduct;
};

export const editProduct = async (updatedProduct) => {
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    await saveToCSV(products, currentFileName);
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
  return products;
};