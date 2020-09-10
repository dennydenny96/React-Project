import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = (payload) => api.get(`/users`,  { params:payload })
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)

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
    // ---------------- Order ----------------
    insertOrder,
    getAllOrders,
    updateOrderById,
    deleteOrderById,
    getOrderById,
}

export default apis