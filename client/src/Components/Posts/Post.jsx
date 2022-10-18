import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Post.css'

function Post({ data }) {
    const date = new Date(data.createdAt)



    return (
        <div className="container">
            <div className='card-img' >
                <img className='card-img' src={data.image} alt="" />
            </div>


            <h1>{data.title}</h1>
            <p>{date.toDateString()}</p>
            <button>
                <Link to={`/post/${data._id}`}>Read Post</Link>
            </button>


        </div>
    )
}

export default Post