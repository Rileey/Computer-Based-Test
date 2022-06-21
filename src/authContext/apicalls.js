import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authActions";
// import { logout } from "./authActions";

export const login = async (userDetails, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('login', userDetails)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure(err.response))
    }
};