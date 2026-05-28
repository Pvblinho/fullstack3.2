import productRepository from "../repositories/productRepository.js";

const getProducts = (filters) => productRepository.getProductsByFilter(filters);

const getProductById = (id) => productRepository.getProductById(id);

const createProduct = ({ name, price, stock = 0, category = "general" }) => {
  return productRepository.addProduct({
    name: name.trim(),
    price,
    stock,
    category: category.trim() || "general",
  });
};

const updateProduct = (id, updates) => {
  const sanitizedUpdates = Object.fromEntries(
    Object.entries(updates).filter(([, value]) => value !== undefined)
  );

  if (sanitizedUpdates.name !== undefined) {
    sanitizedUpdates.name = sanitizedUpdates.name.trim();
  }

  return productRepository.updateProduct(id, sanitizedUpdates);
};

const deleteProduct = (id) => productRepository.deleteProduct(id);

const validateProductData = (data, options = {}) => {
  const { allowPartial = false } = options;

  if (!allowPartial || data.name !== undefined) {
    if (!data.name || data.name.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres";
    }
  }

  if (!allowPartial || data.price !== undefined) {
    if (data.price === undefined || data.price <= 0) {
      return "El precio debe ser mayor a 0";
    }
  }

  if (!allowPartial || data.stock !== undefined) {
    if (data.stock === undefined || data.stock < 0) {
      return "El stock no puede ser negativo";
    }
  }

  return null;
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  validateProductData,
};
