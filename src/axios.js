import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const baseURL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        withCredentials: true,
        "X-CSRFToken": cookies.get("csrftoken"),
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

export default axiosInstance;
