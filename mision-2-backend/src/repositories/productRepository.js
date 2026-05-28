import { products } from "../models/products.js";

let nextId = 4;

const getProductsByFilter = ({ category, minPrice, maxPrice } = {}) => {
  return products.filter((product) => {
    if (category && product.category !== category) {
      return false;
    }
    if (minPrice !== undefined && product.price < minPrice) {
      return false;
    }
    if (maxPrice !== undefined && product.price > maxPrice) {
      return false;
    }
    return true;
  });
};

const getProductById = (id) => products.find((product) => product.id === id);

const addProduct = ({ name, price, stock, category }) => {
  const product = {
    id: nextId++,
    name,
    price,
    stock,
    category,
  };

  products.push(product);
  return product;
};

const updateProduct = (id, updates) => {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...updates,
  };

  return products[index];
};

const deleteProduct = (id) => {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return null;
  }

  return products.splice(index, 1)[0];
};

export default {
  getProductsByFilter,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
