import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Post from '../../Components/Posts/Post'

function Home() {
    return (
        <>

            <header style={{
                height: '25vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url("https://wallpaperforu.com/wp-content/uploads/2021/11/Wallpaper-Humor-Meme-Alien-Comics-Minimalist67-1536x648.jpg")',
                backgroundPosition: '45%,55%',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f987a2'
            }}>
                <h1>Welcome to Blog of the Bored</h1>
                <p> to fuel your boredom furthermore</p>
            </header>
            <body style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid black',
                height: '60vh',
                backgroundColor: '#e53909'
            }}>
                <h2> Recent Posts </h2>
                <div className="posts"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Post />
                    <Post />
                    <Post />
                </div>

            </body>
        </>
    )
}

export default Home