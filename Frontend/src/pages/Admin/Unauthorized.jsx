import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Call logout
        navigate('/login'); // Redirect after logout
    }, []);

    return (
        <div>
            <h1>Unauthorized Access</h1>
            <p>You have been logged out due to unauthorized access.</p>
        </div>
    );
};

export default Unauthorized;
