import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { API_URL } from "../constants/urls";
import { LOGIN_ROUTE } from "../constants/routes";
import axiosInstance from "../utils/axios";
import { REFRESH_TOKEN } from "../constants/constants";
import { cleanStorageAuth, getFetchOptions, updateStorageAuth } from "../utils/api";


export const GlobalContext = createContext(null);


export const GlobalProvider = ({children}) => {
    const TOKEN_REFRESH_PERIOD = 1000 * 60 * 110;

    // Redirect
    const navigate = useNavigate();

    // Display login or signup on the navbar
    const [currentTab, setCurrentTab] = useState('')
    
    // Auth info
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Errors
    const [serverError, setServerError] = useState(false);
    const [wrongCredentials, setWrongCredentials] = useState(false);   
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false); 
    

    const login = credentials => {
        const requestBody = JSON.stringify(credentials);
        const options = getFetchOptions('POST', requestBody);
        
        fetch(`${API_URL}user/log-in/`, options)
            .then(res => {
                if (res.status === 200) {
                    res.json()
                        .then(jsonRes => {
                            updateStorageAuth(jsonRes);
                            setIsAuthenticated(true);

                            // delete later
                            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + jsonRes.access;
                
                            navigate('/');
                            setTimeout(() => refreshToken(), TOKEN_REFRESH_PERIOD);
                        })
                } else if (res.status === 401) {
                    setWrongCredentials(true);
                }
            })
            .catch(err => {
                console.log('Something went wrong');
                console.log(err);
            })
    }

    const logout = redirect => {
        axiosInstance.post('user/logout/blacklist/', {
            "refresh_token": REFRESH_TOKEN,
        });
        
        setIsAuthenticated(false);
        cleanStorageAuth();
        axiosInstance.defaults.headers['Authorization'] = null;
        
        if (redirect) {
            navigate(LOGIN_ROUTE);
        }
    }

    

    const signup = credentials => {
        const requestBody = JSON.stringify(credentials);
        const options = getFetchOptions('POST', requestBody);
        
        fetch(`${API_URL}user/register/`, options)
            .then(res => {
                if (res.status === 201) { // Success
                    login({
                        "username": credentials.username,
                        "password": credentials.password,
                    })
                } else if (res.status === 400) { // Username or email already taken
                    res.json()
                        .then(res => {
                            if (res.message === "username already taken") {
                                setUsernameTaken(true);
                            } else if (res.message === "email already taken") {
                                setEmailTaken(true);
                            }
                        })
                }
            })
            .catch(() => {
                console.log("Some error happened");
                alert("Some error happened");
            })
    }

    const refreshToken = async () => {
        const body = JSON.stringify({ refresh: localStorage.getItem('refresh')})
        const options = getFetchOptions('POST', body)
        
        const res = await fetch(`${API_URL}user/refresh-token/`, options);
        const jsonRes = await res.json();    
        
        if (res.status === 200) {
            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + jsonRes.access;
            updateStorageAuth(jsonRes);
            setIsAuthenticated(true);
            
            setTimeout(() => refreshToken(), TOKEN_REFRESH_PERIOD);
        } else {
            logout(true);
        }
        
    }
    
    const contextData = {
        currentTab, setCurrentTab,
        
        isAuthenticated, setIsAuthenticated,

        usernameTaken, setUsernameTaken,
        emailTaken, setEmailTaken,
        
        serverError, setServerError,
        wrongCredentials, setWrongCredentials,

        login,
        logout,
        signup,
        refreshToken,
    };

    return (
        <GlobalContext.Provider value={contextData} >
            {children}
        </GlobalContext.Provider>
    )
}