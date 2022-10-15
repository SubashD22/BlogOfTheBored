import React from 'react'
import './Post.css'

function Post({ data }) {
    return (
        <div className="container">
            <div className="card-img"
                style={{ backgroundImage: `url(${data.image})` }}>

            </div>
            <div className="card-content" style={{ textAlign: 'center' }}>
                <h1>{data.title}</h1>
                <p>{data.createdAt}</p>
            </div>

        </div>
    )
}

export default Post