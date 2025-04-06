import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update with your backend URL

export const getProducts = () => axios.get(`${API_URL}/find_Product`);
export const createProduct = (productData) => axios.post(`${API_URL}/create_Product`, productData);
export const getProductById = (id) => axios.get(`${API_URL}/get_Product/${id}`);
export const getAllProductNames = () => axios.get(`${API_URL}/get_Product_names`);
export const compareProducts = (id1, id2) => axios.get(`${API_URL}/compare_Products/${id1}/${id2}`);