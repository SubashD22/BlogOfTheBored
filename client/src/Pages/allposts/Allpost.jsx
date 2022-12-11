import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styles from './Allpost.module.css';
import Post from '../../Components/Posts/Post'

const fetchAll = () => {
    return axios.get('http://localhost:5000/api/allposts')
}
const Allpost = () => {
    const { isLoading, data, isError, error } = useQuery('allPost', fetchAll);
    const [filter, setFilter] = useState('allpost')

    const selectedCategory = (e) => {
        setFilter(e.target.value)
    };
    const filteredPost = data?.data.filter(f => f.categories.includes(filter))
    console.log(filteredPost)
    let postSection = filter === 'allpost' ? (data?.data.map(p => {
        return (<Post data={p} key={p._id} />
        )
    })) : (filteredPost.map(p => {
        return (<Post data={p} key={p._id} />
        )
    }))

    return (
        <div>
            <select name="Category" id="Category" onChange={selectedCategory}>
                <option value="allpost" selected>All Post</option>
                <option value="fashion">fashion</option>
                <option value="food">food</option>
                <option value="games">games</option>
                <option value="hobby">hobby</option>
                <option value="movies">movies</option>
                <option value="music">music</option>
                <option value="sports">sports</option>
                <option value="story">story</option>
                <option value="travel">travel</option>
            </select>
            <section className={styles.posts}>
                {postSection}
            </section>
        </div>
    )
}

export default Allpost