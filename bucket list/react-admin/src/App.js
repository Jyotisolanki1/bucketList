/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';

// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Loader from 'ui-component/Loader';
import { openSnackbar } from 'store/slices/snackbar';
import ThemeCustomization from 'themes';
import { dispatch } from 'store';
import { getMenu } from 'store/slices/menu';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { setAuthSession, LOGIN_PATH } from 'config';
import { AdminDetailApi } from 'store/slices/adminAuth';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = ({ AdminDetailApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
            document.body.classList.add('no-interaction'); // Add class when offline
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'No internet connection. Please check your network.',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    }
                })
            );
        };

        const handleOnline = () => {
            setIsOffline(false);
            document.body.classList.remove('no-interaction'); // Remove class when online
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Internet connection restored.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    }
                })
            );
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [dispatch]);
    // const [loading, setLoading] = useState(false);
    // const newRole = localStorage.getItem('adminToken');
    // const { adminToken, adminRole } = useSelector((state) => state.admin);
    // sx={{ '& > *': { borderBottom: 'unset' } }}
    // useEffect(() => {
    //     setAuthSession(newRole);
    //     AdminDetailApi(adminToken).then((res) => {
    //         localStorage.setItem('profile', JSON.stringify(res.ResponseData));
    //         if (res.ResponseCode === 207 && res.succeeded === false) {
    //             navigate(LOGIN_PATH, { replace: true });
    //             localStorage.removeItem('adminToken');
    //             localStorage.removeItem('adminRole');
    //             // dispatch(
    //             //     openSnackbar({
    //             //         open: true,
    //             //         message: res.ResponseMessage,
    //             //         variant: 'alert',
    //             //         alert: {
    //             //             color: 'error'
    //             //         },
    //             //         transition: 'Fade',
    //             //         anchorOrigin: { vertical: 'top', horizontal: 'right' }
    //             //     })
    //             // );
    //         }
    //         if (res.ResponseCode === 403 && res.succeeded === false) {
    //             navigate(LOGIN_PATH, { replace: true });
    //             localStorage.removeItem('adminToken');
    //             localStorage.removeItem('adminRole');
    //             // dispatch(
    //             //     openSnackbar({
    //             //         open: true,
    //             //         message: 'Session Timeout',
    //             //          message: "res.ResponseMessage",
    //             //         variant: 'alert',
    //             //         alert: {
    //             //             color: 'error'
    //             //         },
    //             //         transition: 'Fade',
    //             //         anchorOrigin: { vertical: 'top', horizontal: 'right' }
    //             //     })
    //             // );
    //         }
    //     });
    // }, []);

    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

// export default App;
export default connect(null, { AdminDetailApi })(App);
