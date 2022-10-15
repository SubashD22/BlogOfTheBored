import axios from 'axios';
import React, { useState } from 'react'

function LoginForm() {
    const [formData, setformdata] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData;
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
            <h1 className='formTitle'>LOGIN</h1>
            <form>
                <input type="text" name="username" value={username} onChange={onChange} placeholder='Username' />
                <input type="password" name="password" value={password} onChange={onChange} placeholder='Password' />
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm