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

export const editProduct = (updatedProduct) => {
  const index = products.findIndex((p) => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return Promise.resolve(products[index]);
  }
  return Promise.reject(new Error('Product not found'));
};
