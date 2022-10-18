import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar'
import Post from '../../Components/Posts/Post'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPost, postreset } from '../../redux/post/postSlice'

function Home() {
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.postStore)
    useEffect(() => {
        dispatch(getPost());
        return () => dispatch(postreset())

    }, [dispatch])

    return (
        <>
            <header>
                <h1>Welcome to Blog of the Bored</h1>
                <p> to fuel your boredom furthermore</p>
            </header>
            <section>
                <h2> Recent Posts </h2>
                <div className="posts">
                    {posts && posts.slice(0, 3).map(p => {
                        return <Post data={p} key={p._id} />
                    })}
                </div>

            </section>
        </>
    )
}

export default Home