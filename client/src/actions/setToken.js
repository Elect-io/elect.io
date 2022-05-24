import axios from "axios";

const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common["x-auth-token"] = token;
}


export default setToken;