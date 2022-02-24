const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const { postNewUser, loginUser, logoutUser, getUser, getAllUser } = require('./user.controller')
const upload = require('../../middlewares/file')

UserRoutes.get('/allUsers', getAllUser)
UserRoutes.post('/', upload.single('image'), postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id',[isAuth], getUser)

module.exports = UserRoutes