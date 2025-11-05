
const foodpartnerModel = require('../models/patner.model')
const foodModel = require('../models/food.model')

async function getFoodPartnerById(req, res) {
    
   const  foodPartnerId =  req.params.id

    const foodPartner = await foodpartnerModel.findById(foodPartnerId);
    const foodItemByPartner = await foodModel.find({foodpartner:foodPartnerId})

    if (!foodPartner) {
        return res.status(404).json({
            message: "Food partner not found"
        });
    }

    res.status(200).json({
        message: "Food partner found successfully",
        foodPartner,
        foodItems:foodItemByPartner
    });
}


module.exports={
    getFoodPartnerById
}