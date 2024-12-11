import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

import { Navigate, useNavigate, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { AdminLoginApi, AdminDetailApi } from '../../../../store/slices/adminAuth';
import { useTheme } from '@mui/material/styles';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { DASHBOARD_PATH } from 'config';

const LoginAuth = ({ AdminLoginApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { isLoggedIn, loading } = useSelector((state) => state.admin);
    const [loader, setLoader] = React.useState(false);
    const [loginLoading, setLoginLoading] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showLoginError, setShowLoginError] = React.useState('');

    const initialValues = {
        email: '',
        password: ''
    };

    const onSubmit = (values, { setSubmitting }) => {
        setLoginLoading(true);
        const newData = {
            email: values.email.toLowerCase(),
            password: values.password
        };
        setLoader(true);
        AdminLoginApi(newData)
            .then((res) => {
                setLoginLoading(false);
                if (res?.success === true) {
                    setLoader(false);
                    setSubmitting(false);
                    console.log(res);
                    localStorage.setItem('adminToken', res?.data?.token?.accessToken);
                    localStorage.setItem('name', `${res?.data?.username}`);
                    localStorage.setItem('profile', `${res?.data?.profile_pic}`);
                    localStorage.setItem('isLoggedIn', true);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res?.message,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false,
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            }
                        })
                    );
                    navigate(DASHBOARD_PATH);
                } else {
                    setLoader(false);
                    setSubmitting(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res?.message,
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: false,
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            }
                        })
                    );
                }
            })
            .catch((err) => {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong. Please try again later.',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false,
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        }
                    })
                );
            });
    };

    const validationSchema = Yup.object({
        email: Yup.string().required('Email field is required'),

        password: Yup.string().required('Password field is required')
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // if (isLoggedIn === true && loading === false) {
    //     return <Navigate replace to={DASHBOARD_PATH} />;
    // }
    return (
        <>
            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-email-login">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            name="email"
                            label="Email email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Grid container alignItems="center" justifyContent="flex-end">
                        <Grid item>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <AnimateButton>
                            <Button
                                // disableElevation
                                // fullWidth
                                disabled={formik.isSubmitting}
                                size="md"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ padding: '5px 50px' }}
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <CircularProgress color="success" size={20} />
                                    </>
                                ) : (
                                    'Log In'
                                )}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default connect(null, {
    AdminLoginApi
})(LoginAuth);
