import axios from axios;

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout:5000.
});

export default axiosInstance;