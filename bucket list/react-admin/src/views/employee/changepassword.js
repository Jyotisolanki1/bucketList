import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    CircularProgress,
    Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { openSnackbar } from 'store/slices/snackbar';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import { ChangeEmployeePasswordApi } from 'store/slices/adminAuth';
import { useDispatch, useSelector } from 'store';
// import { FormattedMessage } from 'react-intl';

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const AuthResetPassword = ({ ...others }) => {
    const theme = useTheme();
    const router = useNavigate();
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [employeeDetails, setEmployeeDetails] = React.useState(null);

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch();
    // const changePassword = (value) => {
    //   const temp = strengthIndicator(value);
    //   setStrength(temp);
    //   setLevel(strengthColor(temp));
    // };

    React.useEffect(() => {
        const data = localStorage.getItem('adminEmployeeProfile');
        setEmployeeDetails(JSON.parse(data));
    }, []);

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Change Password</Typography>
                    </Grid>
                </Grid>
            }
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6} sm={6}>
                    <Formik
                        initialValues={{
                            oldpassword: '',
                            password: '',
                            confirmPassword: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            oldpassword: Yup.string().required('Old Password is required'),
                            password: Yup.string()
                                .required('New Password is required')
                                .test(
                                    'password-spaces',
                                    'New Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                                    (value) => value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value)
                                )
                                .test(
                                    'password-not-same-as-old', // Test for password not being the same as old password
                                    'New Password must not be the same as the old password',
                                    (value, context) => value !== context.parent.oldpassword
                                )
                                .min(8, 'New Password must be at least 8 characters')
                                .max(25, 'New Password must be at most 25 characters'),
                            confirmPassword: Yup.string()
                                .required('Confirm Password is required')
                                .test(
                                    'confirmPassword',
                                    "Password didn't matched",
                                    (confirmPassword, yup) => yup.parent.password === confirmPassword
                                )
                        })}
                        onSubmit={async (values) => {
                            setLoading(true);
                            try {
                                const data = {
                                    old_password: values.oldpassword,
                                    new_password: values.password,
                                    confirm_password: values.confirmPassword,
                                    id: employeeDetails._id
                                };
                                const res = await dispatch(ChangeEmployeePasswordApi(data));
                                if (res?.success === true) {
                                    setLoading(false);
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
                                    setLoading(false);
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
                            } catch (err) {
                                setLoading(false);
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
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.oldpassword && errors.oldpassword)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-reset">Old Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-reset"
                                        type={showOldPassword ? 'text' : 'password'}
                                        value={values.oldpassword}
                                        name="oldpassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowOldPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{ maxLength: 25 }}
                                    />
                                </FormControl>

                                {touched.oldpassword && errors.oldpassword && (
                                    <FormControl fullWidth>
                                        <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                            {' '}
                                            {errors.oldpassword}{' '}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-reset">New Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-reset"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        inputProps={{ maxLength: 25 }}
                                    />
                                </FormControl>
                                {touched.password && errors.password && (
                                    <FormControl fullWidth>
                                        <FormHelperText error id="standard-weight-helper-text-reset">
                                            {errors.password}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-reset">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-reset"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{ maxLength: 25 }}
                                    />
                                </FormControl>

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <FormControl fullWidth>
                                        <FormHelperText error id="standard-weight-helper-text-confirm-password">
                                            {' '}
                                            {errors.confirmPassword}{' '}
                                        </FormHelperText>
                                    </FormControl>
                                )}

                                <Box sx={{ mt: 2, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    {/* <AnimateButton> */}
                                    <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" disabled={loading} color="secondary">
                                        {loading ? (
                                            <>
                                                <CircularProgress color="success" />
                                                &nbsp; Loading ...
                                            </>
                                        ) : (
                                            'Change Password'
                                        )}
                                    </Button>
                                    {/* </AnimateButton> */}
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default AuthResetPassword;
