const Customer = require('../models/customer-model')
const { response } = require('express');

createCustomer = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a customer',
        })
    }

    const customer = new Customer(body)

    if (!customer) {
        return res.status(400).json({ success: false, error: err })
    }
        
    customer
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: customer._id,
                message: 'Customer created successfully!',
            })
        })
        .catch(error => {
            const errMessages = {}
            Object.keys(error.errors).map((element) => {
                const { message, path } = error.errors[element].properties;
                errMessages[path] = message
            })
            
            return res.status(400).json({
                error,
                errMessages,
                message: 'Customer not created!',
            })
        })
}

updateCustomer = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Customer.findOne({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Customer not found!',
            })
        }

        customer.customername = body.customername
        customer.destination = body.destination
        customer.price = body.price
        customer.reimbursement = body.reimbursement
        
        customer
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: customer._id,
                    message: 'Customer updated!',
                })
            })
            .catch(error => {
                const errMessages = {}
                Object.keys(error.errors).map((element) => {
                    const { message, path } = error.errors[element].properties;
                    errMessages[path] = message
                })
                
                return res.status(400).json({
                    error,
                    errMessages,
                    message: 'Customer not created!',
                })
            })
    })
}

deleteCustomer = async (req, res) => {
    await Customer.findOneAndDelete({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }

        return res.status(200).json({ success: true, data: customer })
    }).catch(err => console.log(err))
}

getCustomerById = async (req, res) => {
    await Customer.findOne({ _id: req.params.id }, (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        return res.status(200).json({ success: true, data: customer })
    }).catch(err => console.log(err))
}

getCustomersDistinct = async (req, res) =>{
    const body = req.query;
    await Customer.distinct(body.filtered, (err, customers) => {
        if(err){
            return res.status(400).json({ success: false, error: err})
        }
        if (!customers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Customers not found` })
        }
        return res.status(200).json({ success: true, data: customers })
    }).catch(err => console.log(err))
}

getCustomerByName = async (req, res) => {
    const body = req.query;
    await Customer.find(JSON.parse(body.filtered), (err, customer) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!customer) {
            return res
                .status(404)
                .json({ success: false, error: `Customer not found` })
        }
        return res.status(200).json({ success: true, data: customer})
    }).catch(err => console.log(err))
}

getCustomers = async (req, res) => {
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
        const foundCustomers = await Customer.find(findLike)
            .sort({
                [sortedId]: sortedBy
            })
            .skip((pages) * resPerPage)
            .limit(resPerPage);
        
        const dataCustomers = foundCustomers.length > 0 ? foundCustomers : [{}];
        const numOfCustomers = await Customer.countDocuments();
        return res.status(200).json({ success: true, data: dataCustomers, pages: Math.ceil(numOfCustomers / resPerPage), recordsTotal: numOfCustomers})
    } catch (err){
        throw new Error(err);
    }
}

module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomers,
    getCustomerById,
    getCustomersDistinct,
    getCustomerByName
}