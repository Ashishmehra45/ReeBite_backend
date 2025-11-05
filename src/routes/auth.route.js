const express = require('express')
const router = express.Router()
const authcontroller = require('../controllers/auth.controller') 

//user auth

router.post('/user/register',authcontroller.registeruser)
router.post('/user/login',authcontroller.login)
router.get('/user/logout',authcontroller.logout)

//user partner auth

router.post('/food-partner/register',authcontroller.registerfoodPartner)
router.post('/food-partner/login',authcontroller.loginfoodpartner)
router.get ('/food-partner/logout',authcontroller.foodpartnerlogout)


module.exports = router