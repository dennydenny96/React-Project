const express = require('express')
const router = express.Router()

// -------------------------- User --------------------------
const UserCtrl = require('../controllers/user-ctrl')
router.post('/user', UserCtrl.createUser)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', UserCtrl.getUsers)

// -------------------------- Customer --------------------------
const CustomerCtrl = require('../controllers/customer-ctrl')
router.post('/customer', CustomerCtrl.createCustomer)
router.put('/customer/:id', CustomerCtrl.updateCustomer)
router.delete('/customer/:id', CustomerCtrl.deleteCustomer)
router.get('/customer/:id', CustomerCtrl.getCustomerById)
router.get('/customers', CustomerCtrl.getCustomers)
router.get('/customers/distinct', CustomerCtrl.getCustomersDistinct)
router.get('/customers/destination', CustomerCtrl.getCustomerByName)


// -------------------------- Order --------------------------
const OrderCtrl = require('../controllers/order-ctrl')
router.post('/order', OrderCtrl.createOrder)
router.put('/order/:id', OrderCtrl.updateOrder)
router.delete('/order/:id', OrderCtrl.deleteOrder)
router.get('/order/:id', OrderCtrl.getOrderById)
router.get('/orders', OrderCtrl.getOrders)

module.exports = router