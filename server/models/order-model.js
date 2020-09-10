const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        itemname: { type: String, required: true },
        itemsize: { type: Number, required: true },
        itemquantity: { type: Number, required: true },
        itemdestination: { type: String, required: true },
        travellingexpenses: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('orders', Order)