import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
    NavbarContainer,
    NavbarLeft,
    NavbarRight
} from './styles';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const authToken = localStorage.getItem('authToken'); // Retrieve authToken from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')); // Parse userData from localStorage

    let roleLinks = null;

    if (isAuthenticated()) {
        const role = authToken && userData.role; // Retrieve user role from authToken
        if (role === 'artist') {
            roleLinks = (
                <>
                    {/* <li className="nav-item">
                        <Link to="/my-artworks" className="nav-link">My Artworks</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/my-exhibitions" className="nav-link">My Exhibitions</Link>
                    </li> */}
                    {/* Add more artist-specific links */}
                </>
            );
        } else if (role === 'art enthusiast') {
            roleLinks = (
                <>
                    {/* <li className="nav-item">
                        <Link to="/favourite-artworks" className="nav-link">Favourite Artworks</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/favorite-artists" className="nav-link">Favorite Artists</Link>
                    </li> */}
                    {/* Add more art enthusiast-specific links */}
                </>
            );
        }
        // Add more conditions for other roles if needed
    }

    return (
        <NavbarContainer>
            <NavbarLeft>
                <Link to="/" className="navbar-brand">Art Gallery</Link>
            </NavbarLeft>
            <NavbarRight>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/artists" className="nav-link">Artists</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/artworks" className="nav-link">Artworks</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/exhibitions" className="nav-link">Exhibitions</Link>
                    </li>
                    {roleLinks} {/* Render role-specific links */}
                    {isAuthenticated() ? (
                        <>
                            {/* <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">My Account</Link>
                            </li> */}
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    )}
                </ul>
            </NavbarRight>
        </NavbarContainer>
    );
}

export default Navbar;
