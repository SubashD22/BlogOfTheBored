import axios from 'axios';
import React, {useState,useEffect,useContext,createContext}from 'react';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Context = createContext();
export const UserContext = ({children}) =>{
    const navigate = useNavigate();
    let UserData = localStorage.getItem('user');
    
    const [user, setUser]=useState(UserData || null);
    useEffect(()=>{
        if(user){
     localStorage.setItem('user',JSON.stringify(user))}
    },[user])
    const login = async(userdata)=>{
        try {
            const {data} = await axios.post("http://localhost:5000/api/login",userdata);
            if(data){
                setUser(data);
                toast.success('successfully registered');
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const register = async(userdata)=>{
        try {
            const {data} = await axios.post('/api/user/register',userdata);
            if(data){
                setUser(data);
                toast.success('successfully logged in');
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    const logout = ()=>{
        localStorage.removeItem('user');
        setUser(null)
    }
    return(
        <Context.Provider value={{
            user,setUser,login,register,logout
        }}>
            {children}
        </Context.Provider>
    )
}
export const useUserContext = () => useContext(Context)