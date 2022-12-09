import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])
    const Verify = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const message = await axios.get('http://localhost:5000/api/verify', config);
        if (message) {
            alert(message.data.message)
        }
    }
    return (
        <div>
            <h1>{user?.username}</h1>
            <p>{user?.email}</p>
            {user.verified ? (<p>Verified</p>) : (<div>
                <p>Not verified</p>
                <button onClick={Verify}>Verify</button>
            </div>)}
        </div>
    )
}

export default User