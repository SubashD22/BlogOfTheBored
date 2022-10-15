import axios from 'axios';
import React, { useState } from 'react'

function RegisterForm() {
    const [formData, setformdata] = useState({
        username: '',
        email: '',
        password: ''
    });
    const { username, password, email } = formData;
    const onChange = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
    const login = async (e) => {
        e.preventDefault();
        const loginData = {
            username,
            password
        }
        await axios.post('http://localhost:5000/login/local', loginData).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className='formcontent'>
            <h1 className='formTitle'>REGISTER</h1>
            <form>
                <input type="text" name="username" value={username} onChange={onChange} placeholder='Username' />
                <input type="email" name="email" value={email} onChange={onChange} placeholder='Email' />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default RegisterForm