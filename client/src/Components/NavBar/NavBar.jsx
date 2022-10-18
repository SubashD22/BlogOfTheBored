import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar() {
    const { user } = useSelector((state) => state.auth);
    return (
        <nav>
            <div className="logo">
                <h1><Link to='/'>B.o.B</Link></h1>
            </div>
            <div className="navmenu">
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li>Logout</li>
                    <li><Link to='/write'>Write</Link></li>
                    <li>{user ? user.username : 'profile'}</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar