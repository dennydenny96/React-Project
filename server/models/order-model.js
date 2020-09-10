const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        itemname: { type: String, required: true },
        itemsize: { type: String, required: true },
        itemquantity: { type: String, required: true },
        itemdestination: { type: String, required: true },
        travellingexpenses: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('orders', Order)