import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { CognitoUser, CognitoUserPool, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// project imports
import Loader from 'ui-component/Loader';

import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// constant
const initialState = {
    isClientLoggedIn: false,
    isInitialized: false,
    user: null
};

export const userPool = new CognitoUserPool({
    UserPoolId: process.env.REACT_APP_AWS_POOL_ID || '',
    ClientId: process.env.REACT_APP_AWS_APP_CLIENT_ID || ''
});

const setSession = (clientServiceToken) => {
    if (clientServiceToken) {
        localStorage.setItem('clientServiceToken', clientServiceToken);
    } else {
        localStorage.removeItem('clientServiceToken');
    }
};

// ==============================|| AWS Cognito CONTEXT & PROVIDER ||============================== //

const AWSCognitoContext = createContext(null);

export const AWSCognitoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const clientServiceToken = window.localStorage.getItem('clientServiceToken');
                if (clientServiceToken) {
                    setSession(clientServiceToken);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isClientLoggedIn: true,
                            user: {
                                name: 'Betty'
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const usr = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        const authData = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        usr.authenticateUser(authData, {
            onSuccess: (session) => {
                setSession(session.getAccessToken().getJwtToken());

                dispatch({
                    type: LOGIN,
                    payload: {
                        isClientLoggedIn: true,
                        user: {
                            email: authData.getUsername(),
                            name: 'John Doe'
                        }
                    }
                });
            },
            onFailure: () => {},
            newPasswordRequired: () => {
                // // User was signed up by an admin and must provide new
                // // password and required attributes, if any, to complete
                // // authentication.
                // // the api doesn't accept this field back
                // delete userAttributes.email_verified;
                // // unsure about this field, but I don't send this back
                // delete userAttributes.phone_number_verified;
                // // Get these details and call
                // usr.completeNewPasswordChallenge(password, userAttributes, requiredAttributes);
            }
        });
    };

    const register = (email, password, firstName, lastName) =>
        new Promise((success, rej) => {
            userPool.signUp(
                email,
                password,
                [
                    new CognitoUserAttribute({ Name: 'email', Value: email }),
                    new CognitoUserAttribute({ Name: 'name', Value: `${firstName} ${lastName}` })
                ],
                [],
                async (err, result) => {
                    if (err) {
                        rej(err);
                        return;
                    }
                    success(result);
                }
            );
        });

    const resetPassword = (email) => console.log(email);

    const logout = () => {
        const loggedInUser = userPool.getCurrentUser();
        if (loggedInUser) {
            setSession(null);
            loggedInUser.signOut();
            dispatch({ type: LOGOUT });
        }
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return <AWSCognitoContext.Provider value={{ ...state, login, logout, register, resetPassword }}>{children}</AWSCognitoContext.Provider>;
};

AWSCognitoProvider.propTypes = {
    children: PropTypes.node
};

export default AWSCognitoContext;
