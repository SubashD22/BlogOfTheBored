import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getsinglePost, postreset } from '../../redux/post/postSlice';
import './FullPost.css'

function FullPost() {
    const { singlePost } = useSelector((state) => state.postStore)
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getsinglePost(id))
        return () => {
            dispatch(postreset())
        }
    }, [])
    return (
        <article>
            <img src={singlePost && singlePost.image} alt="" style={{
                width: '800px',
                height: '400px',
                objectFit: 'cover',
            }} />
            <h1>{singlePost && singlePost.title}</h1>
        </article>
    )
}

export default FullPost