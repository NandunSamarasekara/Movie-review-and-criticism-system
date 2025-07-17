import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getMovies = async () => {
    const response = await axios.get(`${API_URL}/movies`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
};

export const getMovieById = async (id) => {
    const response = await axios.get(`${API_URL}/movies/${id}`);
    return response.data;
};

export const searchMovies = async (title) => {
    const response = await axios.get(`${API_URL}/movies/search`, { params: { title } });
    return response.data;
};

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            throw new Error(error.response.data); // "Email is already in use"
        }
        throw error;
    }
};

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
};

export const addReview = async (review) => {
    const response = await axios.post(`${API_URL}/reviews`, review);
    return response.data;
};

export const getReviews = async () => {
    const response = await axios.get(`${API_URL}/reviews`);
    return response.data;
};