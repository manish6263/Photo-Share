import axios from 'axios';

// User registration...........
export const Signup = async (email, username, password) => {

    return await axios.post('/users/register', {
        email,
        username, password
    });
};

// User login.......
export const Login = async (email, password) => {

    return await axios.post('/users/login', {
        email,
        password,
    });
};