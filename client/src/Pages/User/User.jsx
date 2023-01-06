import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import style from './User.module.css'
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const User = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])
    const [username, setUsername] = useState({
        username: '',
        edit: false
    });
    const [email, setEmail] = useState({
        email: '',
        edit: false
    })
    const [Password, setPassword] = useState({
        password: '',
        newPassword: '',
        changePassword: false
    })
    const updateUser = () => {

    }
    return (
        <div className={style.userContainer}>
            <div className={style.userCard}>
                <div className={style.profilePic}>
                    <div className={style.dpcontainer}>
                        <img src={user.profilePic} alt="" className={style.dpImg} />
                    </div>
                </div>
            </div>
            <div>
                {username.edit ? <input type='text' name='username' value={username.username} onChange={(e) => {
                    setUsername({
                        ...username,
                        [e.target.name]: e.target.value
                    })
                }} />
                    : <h1>{user?.username}</h1>}
                {username.edit ? <> <button onClick={() => {
                    setUsername({
                        username: '',
                        edit: false
                    })
                }}>Cancel</button>
                    <button>Submit</button>
                </> :
                    <button onClick={() => {
                        setUsername({
                            username: user.username,
                            edit: true
                        })
                    }}>Edit</button>}
            </div>
            <div>
                {email.edit ? <input type='email' name='email' value={email.email} onChange={(e) => {
                    setEmail({
                        ...email,
                        [e.target.name]: e.target.value
                    })
                }} />
                    : <p>{user?.email}</p>}
                {email.edit ? <> <button onClick={() => {
                    setEmail({
                        email: '',
                        edit: false
                    })
                }}>Cancel</button>
                    <button>Submit</button>
                </> :
                    <button onClick={() => {
                        setEmail({
                            email: user.email,
                            edit: true
                        })
                    }}>Edit</button>}
            </div>
            <button onClick={() => {
                setPassword({
                    password: '',
                    newPassword: '',
                    changePassword: !Password.changePassword
                })
            }}>{Password.changePassword ? "Cancel" : "Change Password"}</button>
            {Password.changePassword ? <form>
                <input type="password" name="oldPassword" />
                <input type="password" name="newPassword" />
                <button type='submit'>Submit</button>
            </form> : <></>}

        </div>
    )
}

export default User