import React from 'react'
import Post from '../../Components/Posts/Post'
import styles from './Home.module.css'

import { useGetPostsData } from '../../hooks/useGetPost'

function Home() {
    const { isLoading, data, isError, error } = useGetPostsData()

    return (
        <>
            <section className={styles.home}>
                <div className={styles.hometext}>
                    <h1 className={styles.hometitle}>THE BLOG</h1>
                    <span className={styles.homesub}> That shouldn't have took 2 months to build </span>
                </div>
            </section >
            <section className={styles.recentposts}>
                <h2> Recent Posts </h2>
                <section className={styles.posts}>
                    {data?.data.map(p => {
                        return (<><Post data={p} key={p._id} />
                            <Post data={p} key={p._id} />
                            <Post data={p} key={p._id} /></>)
                    })}
                </section>

            </section>
        </>
    )
}

export default Home