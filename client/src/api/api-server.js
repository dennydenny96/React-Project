import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = (payload) => api.get(`/users`,  { params:payload })
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

export const insertCustomer = payload => api.post(`/customer`, payload)
export const getAllCustomers = (payload) => api.get(`/customers`,  { params:payload })
export const getCustomersDistinct = (payload) => api.get(`/customers/distinct`,  { params:payload })
export const getCustomerByName = (payload) => api.get(`/customers/destination`,  { params:payload })
export const updateCustomerById = (id, payload) => api.put(`/customer/${id}`, payload)
export const deleteCustomerById = id => api.delete(`/customer/${id}`)
export const getCustomerById = id => api.get(`/customer/${id}`)

export const insertOrder = payload => api.post(`/order`, payload)
export const getAllOrders = (payload) => api.get(`/orders`,  { params:payload })
export const updateOrderById = (id, payload) => api.put(`/order/${id}`, payload)
export const deleteOrderById = id => api.delete(`/order/${id}`)
export const getOrderById = id => api.get(`/order/${id}`)

const apis = {
    // ---------------- User ----------------
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
    // ---------------- Customer ----------------
    insertCustomer,
    getAllCustomers,
    getCustomersDistinct,
    getCustomerByName,
    updateCustomerById,
    deleteCustomerById,
    getCustomerById,
    // ---------------- Order ----------------
    insertOrder,
    getAllOrders,
    updateOrderById,
    deleteOrderById,
    getOrderById,
}

export default apis