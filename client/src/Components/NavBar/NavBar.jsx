import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar() {
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
                    <li>Profile</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar