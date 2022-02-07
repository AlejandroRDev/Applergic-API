
const Product = require("./products.model");

// Requerimos el controlador de errores y el delete

const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");


// Metodos POST, GETALL, GET , PATCH Y DELETE :

const postNewProduct = async (req, res, next) => {
  try {
    const newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.description = req.body.description;
    newProduct.brand = req.body.brand;
    newProduct.allergens = req.body.allergens;
    newProduct.barcode = req.body.barcode;
    if (req.file) {
      newProduct.image = req.file.path;
  }
    const productDb = await newProduct.save();
    return res.status(201).json(productDb);
  } catch (error) {
    return next(setError(500, "Product not saved"));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const productDb = await Product.find();
    res.status(200).json(productDb);
  } catch (error) {
    return next(setError(500, "Product failed server"));
  }
};
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productDb = await Product.findById(id);
    if (!productDb) {
      return next(setError(404, "Product not found"));
    }
    return res.status(200).json(productDb);
  } catch (error) {
    return next(setError(500, "Product server error"));
  }
};

const patchProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchProduct = new Product(req.body);
    patchProduct._id = id;
    if (req.file) {
        patchProduct.image = req.file.path;
    }
    const productDb = await Product.findByIdAndUpdate(id, patchProduct);
    if (!productDb) {
      return next(setError(404, "Product not found"));
    }
    if (productDb.image) deleteFile(productDb.image);
    return res.status(200).json({ new: patchProduct, old: productDb });
  } catch (error) {
    return next(500, "Product patch server error");
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productDb = await Product.findByIdAndDelete(id);
    if (!productDb) {
      return next(setError(500, "Product not found"));
    }
    if (productDb.image) deleteFile(productDb.image);
    return res.status(200).json(productDb);
  } catch (error) {
    return next(setError(500, "Product remove server error"));
  }
};


// Exportamos todas las funciones 
module.exports = {
  postNewProduct,
  getProduct,
  getAllProducts,
  patchProduct,
  deleteProduct
};
