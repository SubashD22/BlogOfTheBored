import axios from 'axios';
import React, { useState } from 'react';
import { register, reset } from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import style from '../Pages/Login/Login.module.css'

function RegisterForm() {
    const [formData, setformdata] = useState({
        username: '',
        email: '',
        password: '',
        image: ''

    });
    const { username, password, email, image } = formData;
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
    const onChange = (e, type) => {
        const value = type === 'image' ? e.target.files[0] : e.target.value
        setformdata((prevData) => ({
            ...prevData,
            [e.target.name]: value
        }))
    }
    const submit = async (e) => {
        e.preventDefault();
        const Data = new FormData
        Data.append("username", username)
        Data.append("email", email)
        Data.append("password", password)
        Data.append("Dp", image)
        dispatch(register(Data))
    }
    return (
        <div className='formcontent'>
            <h1 className='formTitle'>REGISTER</h1>
            <form onSubmit={submit}>
                <div className={style.profilePic}>
                    <input type="file" name="image" id="Dp" onChange={(e) => onChange(e, 'image')} required />
                    <div className={style.dpcontainer}>
                        <img src={formData.image ? URL.createObjectURL(formData.image) : null} alt="" className={style.dpImg} />
                    </div>
                    <label className='' htmlFor='Dp'>Upload</label>
                </div>
                <input type="text" name="username" value={username} onChange={(e) => onChange(e, 'text')} placeholder='Username' required />
                <input type="email" name="email" value={email} onChange={(e) => onChange(e, 'text')} placeholder='Email' required />
                <input type="password" name="password" value={password} onChange={(e) => onChange(e, 'text')} placeholder="Password" required />
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default RegisterForm