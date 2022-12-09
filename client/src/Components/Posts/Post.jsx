import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Post.module.css'

function Post({ data }) {
    const date = new Date(data.createdAt)



    return (
        <div className={styles.post}>
            <img className={styles.postimg} src={data.image} alt="" />
            <Link to={`/post/${data._id}`} className={styles.posttitle}>{data.title}</Link>
            <p className={styles.postdate}>{date.toDateString()}</p>
            <div className={styles.profile}>
                <img src={data.author.profilePic} alt="" className={styles.profileimg} />
                <span className={styles.profilename}>{data.author.username}</span>
            </div>
        </div>
    )
}

export default Post