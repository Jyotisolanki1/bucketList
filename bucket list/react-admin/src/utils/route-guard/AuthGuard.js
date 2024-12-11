import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { LOGIN_PATH } from 'config';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    console.log('isAuthenticated:-', isAuthenticated, 'loading:-', loading);
    useEffect(() => {
        console.log('iuhiuyu');
        if (isAuthenticated === false && loading === false) {
            console.log('iuhiuyu');
            navigate(LOGIN_PATH, { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
