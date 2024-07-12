// art-client/src/components/Dashboard.js
import React from 'react';
import { useAuth } from './AuthContext';

const UserDashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default UserDashboard;
