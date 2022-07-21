import Axios from 'axios';

export const axiosPrivate = Axios.create({
    headers:{'Content-Type': 'application/json'},
    withCredentials: true
})
