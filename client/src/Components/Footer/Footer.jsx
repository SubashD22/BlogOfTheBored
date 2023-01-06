import React from 'react'
import styles from './Footer.module.css'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>&#169; Blog built on React</p>
            <a href='#'><FaGithub /></a>
        </div>
    )
}

export default Footer