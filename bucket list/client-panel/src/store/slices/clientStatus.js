// Import necessary modules
import { openSnackbar } from 'store/slices/snackbar';

// Define the logoutClient function
export const logoutClient = (dispatch, message) => {
    // const res = { message: 'Successfully logged out!' }; // Sample response message (you can modify this)

    // Dispatch the openSnackbar action
    dispatch(
        openSnackbar({
            open: true,
            message,
            variant: 'alert',
            alert: { color: 'error' },
            close: false,
            anchorOrigin: { vertical: 'top', horizontal: 'right' }
        })
    );

    // Clear the local storage and redirect
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientName');
    localStorage.removeItem('isClientLoggedIn');
    localStorage.removeItem('clientProfile');

    // Redirect to the login page
    setTimeout(() => {
        window.location.href = '/client/login';
    }, [1000]);
};
