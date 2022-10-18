import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function FullPost() {
    const [post, setpost] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        const fetchpost = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/post/${id}`)
            if (data) {
                return setpost(data)
            }
        };
        fetchpost()

    }, [])
    return (
        <div>
            <img src={post.image} alt="" style={{
                width: '800px',
                height: '400px',
                objectFit: 'cover',
            }} />
            <h1>{post && post.title}</h1>
        </div>
    )
}

export default FullPost