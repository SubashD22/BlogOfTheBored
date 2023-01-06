import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../Pages/Login/Login.module.css'
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

function RegisterForm() {
    const { setUser } = useContext(UserContext)
    const [formData, setformdata] = useState({
        username: '',
        email: '',
        password: '',
        image: ''

    });
    const { username, password, email, image } = formData;
    const navigate = useNavigate();
    const onSuccess = () => {
        const user = localStorage.setItem('user', JSON.stringify(user.data));
        setUser(user)
        navigate('/')
    }
    const { data: user, isError, isLoading, isFetched, refetch } = useQuery('user', () => {
        const Data = new FormData
        Data.append("username", username)
        Data.append("email", email)
        Data.append("password", password)
        Data.append("Dp", image)
        axios.post("http://localhost:5000/api/register", Data)
    }, {
        enabled: false,
        onSuccess: onSuccess
    });
    const onChange = (e, type) => {
        const value = type === 'image' ? e.target.files[0] : e.target.value
        setformdata((prevData) => ({
            ...prevData,
            [e.target.name]: value
        }))
    }
    const submit = async (e) => {
        e.preventDefault();
        refetch()
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