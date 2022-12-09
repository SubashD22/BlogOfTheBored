import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../redux/auth/authSlice'

function LoginForm() {
    const [formData, setformdata] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth);
    useEffect(() => {
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isSuccess, dispatch, navigate])
    const onChange = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const submit = async (e) => {
        e.preventDefault();
        const loginData = {
            username,
            password
        }
        dispatch(login(loginData))
    }
    return (
        <div className='formcontent'>
            <h1 className='formTitle'>LOGIN</h1>
            <form onSubmit={submit}>
                <input type="text" name="username" value={username} onChange={onChange} placeholder='Username' required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder='Password' required />
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm