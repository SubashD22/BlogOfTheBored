import React from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './FullPost.module.css'
import { useSinglePostData } from '../../hooks/useSinglePostData';
import axios from 'axios';
import Comments from '../../Components/Comments/Comments';
import { useQuery } from 'react-query';
import { useState } from 'react';
import e from 'cors';

const fetchComments = (postId) => {
    return axios.get(`http://localhost:5000/api/comments/${postId}`)
}
function FullPost() {
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const { isLoading, isError, error, data } = useSinglePostData(id);
    const postId = data?.data._id;
    const { data: comments, refetch } = useQuery(['comment', postId], () => fetchComments(postId), {
        enabled: !!postId,
    })
    let date;
    if (data) {
        const createdDate = data.data.createdAt
        date = new Date(createdDate)
    } else {
        date = null
    }
    const DeletePost = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const response = await axios.delete(`http://localhost:5000/api/delete/${id}`, config)
        if (response.status === 200) {
            navigate(`/`)
        }
    }
    const submitComment = async (e) => {
        e.preventDefault();
        if (!user) {
            return navigate('/login')
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const data = {
            text: comment
        }
        const response = await axios.post(`http://localhost:5000/api/comments/${postId}`, data, config);
        if (response) {
            setComment('')
            return refetch()
        }
    }

    return (
        <div className={styles.postcontainer}>
            <section className={styles.postheader}>
                <div className={styles.headercontent}>
                    <h1 className={styles.title}>{data?.data.title}</h1>
                    <img className={styles.headerimg} src={data?.data.image} />
                </div>

                <div className={styles.postinfo}>
                    <p>Author: {data?.data.author.username}</p>
                    <div>
                        {user?.email === data?.data.author.email ? (<>
                            <Link to={`/edit/${id}`}>Edit</Link>
                            <button style={{ display: 'inline-block' }} onClick={DeletePost}>Delete</button>
                        </>) : (<></>)}
                    </div>
                    <p>{date?.toDateString()}</p>
                </div>
            </section>
            <section className={`${styles.postcontent}${styles.postcontainer}`}>
                <div className={styles.maintext} dangerouslySetInnerHTML={{ __html: data?.data.text }} />
                <div className={styles.commentcontent}>
                    <h2>Comments</h2>
                    <form onSubmit={submitComment} className={styles.commentform}>
                        <textarea name="comment" rows='1' cols="40" value={comment} required onChange={(e) => {
                            setComment(e.target.value)
                        }}></textarea>
                        <button type='submit'>SUBMIT</button>
                    </form>
                    {comments ? <Comments comments={comments?.data} refetch={refetch} /> : <></>}
                </div>
            </section>
        </div>
    )
}

export default FullPost