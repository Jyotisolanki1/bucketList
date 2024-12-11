import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Checkbox,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

import { Navigate, useNavigate, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { ForgetPasswordApi } from '../../../../store/slices/adminAuth';
import { useTheme } from '@mui/material/styles';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const AuthForgotPassword = ({ ForgetPasswordApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const { isAuthenticated, loading } = useSelector((state) => state.admin);
    const [loader, setLoader] = React.useState(false);

    const initialValues = {
        email: ''
    };

    const onSubmit = (values, { setSubmitting }) => {
        console.log('values', values);
        const newData = {
            email: values.email
        };
        setLoader(true);
        ForgetPasswordApi(newData)
            .then((res) => {
                console.log(res);
                if (res?.success === true) {
                    localStorage.setItem('clientForgetOptCheck', true);
                    setLoader(false);
                    // localStorage.setItem('clientToken', res?.ResponseData?.token);
                    navigate('/code-verification');
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
                setLoader(false);
                setSubmitting(false);
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
        email: Yup.string().required('Email field is required')
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <>
            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-email-login">Enter Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="email"
                            name="email"
                            label="Enter your email"
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
                                Submit
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default connect(null, {
    ForgetPasswordApi
})(AuthForgotPassword);
