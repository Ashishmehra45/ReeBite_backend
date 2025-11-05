const mongoose = require('mongoose');


const saveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        require: true,
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food', 
        require: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('save', saveSchema);