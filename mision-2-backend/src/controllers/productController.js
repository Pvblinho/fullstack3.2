import productService from "../services/productService.js";

const getProducts = (req, res) => {
  const filters = {
    category: req.query.category,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
  };

  const result = productService.getProducts(filters);
  res.json({ data: result, total: result.length });
};

const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = productService.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(product);
};

const createProduct = (req, res) => {
  const { name, price, stock, category } = req.body;
  const validationError = productService.validateProductData({ name, price, stock });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const product = productService.createProduct({
    name,
    price,
    stock,
    category,
  });

  res.status(201).json(product);
};

const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const existingProduct = productService.getProductById(id);

  if (!existingProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { name, price, stock, category } = req.body;
  const validationError = productService.validateProductData(
    { name, price, stock },
    { allowPartial: true }
  );

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const updatedProduct = productService.updateProduct(id, {
    name,
    price,
    stock,
    category,
  });

  res.json(updatedProduct);
};

const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const deletedProduct = productService.deleteProduct(id);

  if (!deletedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json({ message: "Producto eliminado", product: deletedProduct });
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
