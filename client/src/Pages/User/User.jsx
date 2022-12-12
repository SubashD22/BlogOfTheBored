import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import style from './User.module.css'

const User = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])
    return (
        <div className={style.userContainer}>
            <div className={style.userCard}>
                <div className={style.profilePic}>
                    <div className={style.dpcontainer}>
                        <img src={user.profilePic} alt="" className={style.dpImg} />
                    </div>
                </div>
            </div>
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
            <button>Change Password</button>
        </div>
    )
}

export default User