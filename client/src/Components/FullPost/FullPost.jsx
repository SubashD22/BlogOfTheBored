import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function FullPost() {
    const [post, setpost] = useState
    const { id } = useParams
    useEffect(() => {
        const fetchpost = async () => {
            const { data } = await axios.get('http://localhost:5000/api/posts')
            if (data) {
                return setpost(data)
            }
        };
        fetchpost()

    }, [])
    return (
        <div>FullPost</div>
    )
}

export default FullPost