import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout, reset } from '../../redux/auth/authSlice'
import './NavBar.css'
function NavBar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutfn = () => {
        dispatch(logout());
        dispatch(reset());
    }
    return (
        <nav>
            <div className="logo">
                <h1><Link to='/'>B.o.B</Link></h1>
            </div>
            <div className="navmenu">
                <ul>
                    {user ? <li onClick={logoutfn}>Logout</li> :
                        <li><Link to='/login'>Login</Link></li>}


                    <li><Link to='/write'>Write</Link></li>
                    <li>{user ? user.username : null}</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar