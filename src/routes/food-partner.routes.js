const express = require('express')
const router = express.Router()
const authmiddleware = require('../middlewares/food-partner.middleware')
const foodPartnercontroller = require('../controllers/foodPartnerControllers')

router.get('/:id',authmiddleware.authuserMiddleare,foodPartnercontroller.getFoodPartnerById)




module.exports=router