// En este apartado vamos a asignar las rutas a los controllers
//requerimos las dependencias
const ProductsRoutes = require ('express').Router()
const {isAuth} = require ('../../middlewares/auth')
const upload = require('../../middlewares/file')
//Definimos las rutas
const { postNewProduct, getAllProducts, getProduct, patchProduct, deleteProduct } = require('./products.controller')
ProductsRoutes.get('/', getAllProducts)
ProductsRoutes.get('/:barcode', getProduct)
ProductsRoutes.post('/', upload.single('image'), postNewProduct)
ProductsRoutes.patch('/:id', upload.single('image'), patchProduct)
ProductsRoutes.delete('/:id', upload.single('image'), deleteProduct)
module.exports = ProductsRoutes