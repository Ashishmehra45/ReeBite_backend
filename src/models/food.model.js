const mongoose = require('mongoose')

const foodModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Video:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    foodpartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    },
    likecount:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("food",foodModel)