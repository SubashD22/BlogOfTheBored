import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../Pages/Login/Login.module.css'
import { useUserContext } from '../Context/UserContext';

function LoginForm() {
    const { login } = useUserContext()
    const [formData, setformdata] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData;
    function onChange(e) {
        setformdata((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }
    const submit = async (e) => {
        e.preventDefault();
        login(formData);
    }
    return (
        <div className='formcontent'>
            <h1 className='formTitle'>LOGIN</h1>
            <form onSubmit={submit}>
                <input type="text" name="username" value={username} onChange={onChange} placeholder='Username' required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder='Password' required />
                <button type='submit' className={style.button}>Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm