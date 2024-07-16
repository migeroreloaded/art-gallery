import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';

const Dashboard = () => {
    const { isAuthenticated, logout } = useAuth();
    const history = useHistory();
    const [biography, setBiography] = useState('');
    const [nationality, setNationality] = useState('');
    const [image, setImage] = useState('');

    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5555/artists', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    biography,
                    nationality,
                    image
                })
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                const data = await response.json();
                alert(`Failed to update profile: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            {isAuthenticated() ? (
                <div>
                    <h1>Welcome, {userData.artist.name}</h1>
                    <div>
                        <h2>Update Profile</h2>
                        <label>Biography:</label>
                        <textarea value={biography} onChange={(e) => setBiography(e.target.value)} />
                        <label>Nationality:</label>
                        <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} />
                        <label>Image URL:</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                        <button onClick={handleUpdateProfile}>Update Profile</button>
                    </div>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Please log in to view your dashboard.</h1>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
