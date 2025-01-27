import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, FormHelperText, Box, Typography } from '@mui/material';
import { useDispatch } from 'store';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react18-input-otp';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import { openSnackbar } from 'store/slices/snackbar';
import { VerifyOtpApi } from '../../../../store/slices/adminAuth';

const AuthCodeVerification = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        if (!localStorage.getItem('forgetOptCheck')) {
            navigate('/forgot-password');
        }
    }, []);
    const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];

    const initialValues = {
        otp: ''
    };

    const validationSchema = Yup.object({
        otp: Yup.string().required('OTP is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            const newData = {
                otp: values.otp
            };
            setLoader(true);
            VerifyOtpApi(newData)
                .then((res) => {
                    if (res?.success === true) {
                        localStorage.removeItem('forgetOptCheck');
                        setLoader(false);
                        localStorage.setItem('adminToken', res.data.accessToken);
                        navigate('/reset-password');
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
        }
    });

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Enter OTP</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <OtpInput
                                value={formik.values.otp}
                                onChange={(otp) => formik.setFieldValue('otp', otp)}
                                numInputs={4}
                                shouldAutoFocus
                                containerStyle={{ justifyContent: 'space-between' }}
                                inputStyle={{
                                    width: '100%',
                                    margin: '8px',
                                    padding: '10px',
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: 4,
                                    ':hover': {
                                        borderColor: theme.palette.primary.main
                                    }
                                }}
                                focusStyle={{
                                    outline: 'none',
                                    border: `2px solid ${theme.palette.primary.main}`
                                }}
                            />
                            {formik.touched.otp && formik.errors.otp && (
                                <FormHelperText error id="otp-helper-text">
                                    {formik.errors.otp}
                                </FormHelperText>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                style={{ backgroundColor: '#3C2F28' }}
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting || loader}
                            >
                                Continue
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Formik>
        </>
    );
};

export default AuthCodeVerification;
