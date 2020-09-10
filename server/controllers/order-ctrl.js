const Order = require('../models/order-model')
const { response } = require('express');
var assert = require('assert');

createOrder = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a order',
        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }
        
    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            Object.keys(error.errors).map((element)=>{
                console.log(error.errors[element].properties)
            })
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}

updateOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Order not found!',
            })
        }

        order.itemname = body.itemname
        order.itemsize = body.itemsize
        order.itemquantity = body.itemquantity
        order.itemdestination = body.itemdestination
        order.travellingexpenses = body.travellingexpenses;
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Order not updated!',
                })
            })
    })
}

deleteOrder = async (req, res) => {
    await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

getOrderById = async (req, res) => {
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

getOrders = async (req, res) => {
    try{
        const body = req.query;
        const resPerPage = parseInt(body.pageSize); // results per page
        const pages = parseInt(body.page); // Page 

        // --------------------- Filtered ---------------------
        const filtered = body.filtered !== undefined ? body.filtered : undefined
        let findLike = {}
        if(filtered){
            filtered.map((element, i)=>{
                const parseFiltered = JSON.parse(element);
                findLike[parseFiltered.id] = new RegExp(parseFiltered.value, "i") 
            })
        }
        
        // --------------------- Sorted ---------------------
        const sorted = body.sorted != undefined ? body.sorted : '{}'
        const parseSorted = JSON.parse(sorted)
        const sortedId = parseSorted.id;
        const sortedBy = (parseSorted.desc != undefined) ? parseSorted.desc ? "desc" : "asc" : undefined;
        const foundOrders = await Order.find(findLike)
            .sort({
                [sortedId]: sortedBy
            })
            .skip((pages) * resPerPage)
            .limit(resPerPage);
        
        const dataOrders = foundOrders.length > 0 ? foundOrders : [{}];
        const numOfOrders = await Order.countDocuments();
        return res.status(200).json({ success: true, data: dataOrders, pages: Math.ceil(numOfOrders / resPerPage), recordsTotal: numOfOrders})
    } catch (err){
        throw new Error(err);
    }
}




module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
}