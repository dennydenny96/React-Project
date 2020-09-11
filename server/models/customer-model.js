const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Customer = new Schema(
    {
        customername: { type: String, required: [true, `Can't be blank`] },
        destination: { type: String, required: [true, `Can't be blank`] },
        price: { type: String, required: [true, `Can't be blank`] },
        reimbursement: { type: String, required: [true, `Can't be blank`] },
    },
    { timestamps: true },
)

module.exports = mongoose.model('customers', Customer)