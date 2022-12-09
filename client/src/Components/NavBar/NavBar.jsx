import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout, reset } from '../../redux/auth/authSlice'
import styles from './NavBar.module.css'
function NavBar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutfn = () => {
        dispatch(logout());
        dispatch(reset());
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
                    {user ? <li className={styles.navBtn} ><Link to='/write' >Write</Link></li> :
                        <></>}
                    {user ? <li className={styles.navBtn} ><p>{user ? user.username : null}</p></li> :
                        <></>}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar