import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from "./Comments.module.css"


const Comments = ({ comments, refetch }) => {
    const { user } = useSelector((state) => state.auth);
    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState('');

    const deleteComment = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const response = await axios.delete(`http://localhost:5000/api/comments/${id}`, config);
        if (response) {
            return refetch()
        }
    }
    const updateComment = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        }
        const data = {
            text: comment
        }
        const response = await axios.put(`http://localhost:5000/api/comments/${id}`, data, config);
        if (response) {
            setEdit(false)
            return refetch()
        }
    }
    const editComment = (e) => {
        setComment(e.target.value)
    }
    return (
        <div className={style.commentthread}>
            {comments.map(c => {
                const date = new Date(c.createdAt)
                return (
                    <div className={style.comment} key={c._id}>
                        <div className={style.commentheading}>

                            <div className={style.commentinfo}>
                                <p className={style.commentauthor}>{c.author.username}</p>
                                <p className={style.m0}>
                                    {date.toDateString()}
                                </p>
                            </div>
                        </div>

                        <div className={style.commentbody}>
                            {edit ? <input type='text' name='comment' value={comment} onChange={editComment} /> : <p>{c.comment}</p>}

                            {user?.email === c.author.email ? (<>{edit ? <button style={{ display: "inline-block" }}
                                onClick={() => {
                                    setEdit(false)
                                }}>CANCEL</button> :
                                <button style={{ display: "inline-block" }}
                                    onClick={() => {
                                        setEdit(true);
                                        setComment(c.comment)
                                    }}>EDIT</button>}
                                {edit ? <button style={{ display: "inline-block", marginLeft: "0.5rem" }} onClick={() => updateComment(c._id)}>UPDATE</button>
                                    : <button style={{ display: "inline-block", marginLeft: "0.5rem" }} onClick={() => deleteComment(c._id)}>DELETE</button>}
                            </>) : <></>}

                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Comments