import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../Context/UserContext';

import styles from './NavBar.module.css'
function NavBar() {
    const { user, logout } = useUserContext();

    const logoutfn = () => {
        logout()
    }
    return (
        <nav>
            <div className={styles.logo}>
                <h1><Link to='/'>B.o.B</Link></h1>
            </div>
            <div className={styles.navmenu}>
                <ul>
                    {user ? <li className={styles.navBtn} onClick={logoutfn} >Logout</li> :
                        <li className={styles.navBtn} ><Link to='/login' >Login</Link></li>}
                    <li className={styles.navBtn} ><Link to='/posts' >All Posts</Link></li>
                    {user ? <li className={styles.navBtn} ><Link to='/write' >Write</Link></li> :
                        <></>}
                    {user ? <li className={styles.navBtn} ><Link to='/user'>{user ? user.username : null}</Link></li> :
                        <></>}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar