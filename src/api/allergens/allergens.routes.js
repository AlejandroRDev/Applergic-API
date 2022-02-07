// En este apartado vamos a asignar las rutas a los controllers
//requerimos las dependencias
const AllergensRoutes = require ('express').Router()

const upload = require('../../middlewares/file')
//Definimos las rutas
const { postNewAllergen, getAllAllergens, getAllergen, patchAllergen, deleteAllergen } = require('./allergens.controller')
AllergensRoutes.get('/', getAllAllergens)
AllergensRoutes.get('/:id', getAllergen)
AllergensRoutes.post('/', upload.single('image'), postNewAllergen)
AllergensRoutes.patch('/:id', upload.single('image'), patchAllergen)
AllergensRoutes.delete('/:id', upload.single('image'), deleteAllergen)
module.exports = AllergensRoutes