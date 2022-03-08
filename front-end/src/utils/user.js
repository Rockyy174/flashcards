import jwt_decode from "jwt-decode";


export const getUserInfo = () => {
    const token = localStorage.getItem('access') || "";
    const info = jwt_decode(token);
    return info;
}