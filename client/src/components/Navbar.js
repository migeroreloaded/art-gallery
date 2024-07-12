import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import {
    NavbarContainer,
    NavbarLeft,
    NavbarRight
} from './styles';

const Navbar = () => {
    return (
        <NavbarContainer>
            <NavbarLeft>
                <Link to="/" className="navbar-brand">Art Gallery</Link>
            </NavbarLeft>
            <NavbarRight>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/artists" className="nav-link">Artist</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/artworks" className="nav-link">Artwork</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/exhibitions" className="nav-link">Exhibition</Link>
                    </li>
                </ul>
            </NavbarRight>
        </NavbarContainer>
    );
}

export default Navbar;