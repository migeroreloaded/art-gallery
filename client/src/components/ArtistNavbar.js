import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { useFormik } from 'formik'; // Import useFormik from Formik
import {
    NavbarContainer,
    NavbarLeft,
    NavbarRight
} from './styles';

const Navbar = () => {
    // Example Formik integration (though Navbar typically doesn't have a form, showing usage)
    const formik = useFormik({
        initialValues: {
            query: ''
        },
        onSubmit: async (values) => {
            try {
                const response = await fetch(`http://example.com/api/search?query=${values.query}`);
                const data = await response.json();
                console.log('Search results:', data);
                // Handle search results
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        },
    });

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
                    {/* Example of using Formik in Navbar for search */}
                    <form onSubmit={formik.handleSubmit} className="form-inline my-2 my-lg-0">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="query"
                            value={formik.values.query}
                            onChange={formik.handleChange}
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </ul>
            </NavbarRight>
        </NavbarContainer>
    );
}

export default Navbar;
