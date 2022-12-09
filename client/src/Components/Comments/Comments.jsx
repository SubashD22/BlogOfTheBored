import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux';
import style from "./Comments.module.css"


const Comments = ({ comments, refetch }) => {
    const { user } = useSelector((state) => state.auth);
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
                            <p>
                                {c.comment}
                            </p>
                            {user?.email === c.author.email ? (<><button style={{ display: "inline-block" }}>EDIT</button>
                                <button style={{ display: "inline-block", marginLeft: "0.5rem" }} onClick={() => deleteComment(c._id)}>DELETE</button></>) : <></>}

                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Comments