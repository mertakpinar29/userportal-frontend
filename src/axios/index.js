import axios from 'axios'

const API = axios.create({
    baseURL: 'https://userportalbackend.herokuapp.com'
})

export const login = async (userData) => await API.post('/users/login', userData)

export const register = async (userData) => await API.post('/users', userData)

export const getUsers = async () => await API.get('/users')

export const deleteUser = async (userId) => await API.delete(`/users/${userId}`)

export const updateUser = async (userId, userData) => await API.put(`/users/update/${userId}`, userData)