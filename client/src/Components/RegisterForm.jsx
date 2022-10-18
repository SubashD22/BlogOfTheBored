import axios from 'axios';
import React, { useState } from 'react';
import { register, reset } from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function RegisterForm() {
    const [formData, setformdata] = useState({
        username: '',
        email: '',
        password: ''
    });
    const { username, password, email } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth);

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/')
        };
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
        const registerData = {
            username,
            email,
            password
        }
        dispatch(register(registerData))
    }
    return (
        <div className='formcontent'>
            <h1 className='formTitle'>REGISTER</h1>
            <form onSubmit={submit}>
                <input type="text" name="username" value={username} onChange={onChange} placeholder='Username' />
                <input type="email" name="email" value={email} onChange={onChange} placeholder='Email' />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default RegisterForm