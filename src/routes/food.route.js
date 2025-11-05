const express = require('express')
const router = express.Router()
const authmiddleware = require('../middlewares/food-partner.middleware')
const foodcontroller = require('../controllers/food.controller')
const multer = require('multer')

const upload = multer({
    storage:multer.memoryStorage()
})


router.post('/', authmiddleware.foodpartneMiddleware,upload.single("video"),foodcontroller.createFood)

router.get('/',authmiddleware.authuserMiddleare,foodcontroller.getFoodItem)
router.post('/like',authmiddleware.authuserMiddleare,foodcontroller.likefood)
router.post('/save',authmiddleware.authuserMiddleare,foodcontroller.savefood)
router.get('/save',authmiddleware.authuserMiddleare,foodcontroller.savefoodvideo)
// router.post('/comment/add',authmiddleware.authuserMiddleare, foodcontroller.addComment)
// router.get('/comment/:foodId',foodcontroller.getComments)
// router.delete('/delete-comment/:id',authmiddleware.authuserMiddleare,foodcontroller.deleteComment)


module.exports=router