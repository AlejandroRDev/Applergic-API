const Allergen = require("./allergens.model");

// Requerimos el controlador de errores y el delete

const { setError } = require("../../utils/error/error");
const { deleteFile } = require("../../middlewares/deleteFile");


// Metodos POST, GETALL, GET , PATCH Y DELETE :

const postNewAllergen = async (req, res, next) => {
  try {
    const newAllergen = new Allergen();
    newAllergen.name = req.body.name;
    if (req.file) {
      newAllergen.image = req.file.path;
  }
    const allergenDb = await newAllergen.save();
    return res.status(201).json(allergenDb);
  } catch (error) {
    return next(setError(500, "Allergen not saved"));
  }
};

const getAllAllergens = async (req, res, next) => {
  try {
    const allergenDb = await Allergen.find();
    res.status(200).json(allergenDb);
  } catch (error) {
    return next(setError(500, "Allergen failed server"));
  }
};
const getAllergen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allergenDb = await Allergen.findById(id);
    if (!allergenDb) {
      return next(setError(404, "Allergen not found"));
    }
    return res.status(200).json(allergenDb);
  } catch (error) {
    return next(setError(500, "Allergen server error"));
  }
};

const patchAllergen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchAllergen = new Allergen(req.body);
    patchAllergen._id = id;
    if (req.file) {
        patchAllergen.image = req.file.path;
    }
    const allergenDb = await Allergen.findByIdAndUpdate(id, patchAllergen);
    if (!allergenDb) {
      return next(setError(404, "Allergen not found"));
    }
    if (allergenDb.image) deleteFile(allergenDb.image);
    return res.status(200).json({ new: patchAllergen, old: allergenDb });
  } catch (error) {
    return next(500, "Allergen patch server error");
  }
};
const deleteAllergen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allergenDb = await Allergen.findByIdAndDelete(id);
    if (!allergenDb) {
      return next(setError(500, "Allergen not found"));
    }
    if (allergenDb.image) deleteFile(allergenDb.image);
    return res.status(200).json(allergenDb);
  } catch (error) {
    return next(setError(500, "Allergen remove server error"));
  }
};


// Exportamos todas las funciones 
module.exports = {
  postNewAllergen,
  getAllergen,
  getAllAllergens,
  patchAllergen,
  deleteAllergen
};
