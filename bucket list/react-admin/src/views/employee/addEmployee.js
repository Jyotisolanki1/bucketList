/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Stack,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContentText,
    DialogContent,
    FormHelperText,
    DialogActions
} from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MainCard from 'ui-component/cards/MainCard';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployeeApi } from 'store/slices/employee';
import CloseIcon from '@mui/icons-material/Close';

import { openSnackbar } from 'store/slices/snackbar';
import Skeleton from '@mui/material/Skeleton';

const AddEmployee = ({ item, open, close }) => {
    const dispatch = useDispatch();
    const imageInputRef = useRef(null);
    const [loadingpage, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = React.useState('');
    const PROXY = process.env.REACT_APP_API_URL;
    const [salesPersonsVal, setSalesPersonsVal] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { loading } = useSelector((state) => state.employee);

    const validationSchema = yup.object().shape({
        firstname: yup
            .string()
            .required('First name is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'Last name must be at most 50 characters')
            .matches(/^[a-zA-Z\s]*$/, 'First name should only contain letters.'),

        lastname: yup
            .string()
            .required('Last name is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name must be at most 50 characters')
            .matches(/^[a-zA-Z\s]*$/, 'Last name should only contain letters.'),
        password: yup
            .string()
            .required('Password is Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters')
            .max(15, 'Password must be less than 15 characters'),

        email: yup
            .string()
            .email('Invalid email address') // Validates email format
            .required('Email is required') // Email is required
            .min(2, 'Email must be at least 2 characters') // Minimum length
            .max(50, 'Email must be at most 50 characters'), // Maximum length
        phone: yup
            .string()
            .required('Phone is required')
            .matches(/^(?!0+$)([1-9][0-9]{4,14})$/, 'Phone number must be 5 to 15 digits, cannot start with 0, and cannot be all 0s')
    });

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        image: null
    };
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };
    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        if (imageError.trim() !== '') {
            setImageError('Please select a valid image file (PNG, JPEG)');
        } else {
            setLoading(true);
            try {
                console.log(values);
                const formData = new FormData();
                formData.append('firstname', values.firstname);
                formData.append('lastname', values.lastname);
                formData.append('password', values.password);
                formData.append('email', values.email);
                formData.append('phone', values.phone);

                if (values.image) {
                    formData.append('image', values.image);
                }

                const res = await dispatch(addEmployeeApi(formData));
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
            } catch (error) {
                console.log(error);
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
                close(false);
            }
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg'];
        formik.setFieldError('image', '');
        setImageError('');
        if (file) {
            if (!allowedTypes.includes(file.type)) {
                setImageError('Please select a valid image file (PNG, JPEG)');
            } else {
                setImageError('');
                setSelectedImage(URL.createObjectURL(file));
                formik.setFieldValue('image', file);
            }
        }
    };

    useEffect(() => {
        // Assign the ref to formik for handling form interaction
        formik.setFieldValue('imageInputRef', imageInputRef.current);
    }, [imageInputRef]);

    return (
        <Dialog open={open} keepMounted onClose={() => close(false)} fullWidth="true" maxWidth="md" aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit} id="add-user-form">
                <DialogTitle>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={10}>
                            Add Employee
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                color="inherit"
                                onClick={() => close(false)}
                                aria-label="close"
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent mt={2}>
                    <DialogContentText sx={{ pt: 1 }}>
                        <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar alt="Admin Pic" src={selectedImage} sx={{ height: 120, width: 120, borderRadius: '8px' }} />
                                    </Grid>

                                    <Grid item sm zeroMinWidth>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    {/* Label for the file input */}
                                                    <label htmlFor="contained-button-file">
                                                        <Button variant="contained" component="span" color="secondary">
                                                            Upload Profile
                                                        </Button>
                                                    </label>
                                                    {/* Actual file input with style display: 'none' */}
                                                    <input
                                                        accept="image/png, image/jpeg"
                                                        onChange={handleImageChange}
                                                        style={{ display: 'none' }}
                                                        id="contained-button-file"
                                                        type="file"
                                                        ref={imageInputRef}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* <Typography variant="caption">
                                                <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                                <FormattedMessage id="img-size-dis" />
                                            </Typography> */}
                                                <Typography variant="caption" style={{ color: 'red' }}>
                                                    {imageError}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    label="First Name"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                    helperText={formik.touched.firstname && formik.errors.firstname}
                                    fullWidth
                                    autoComplete="given-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    label="Last name"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                    helperText={formik.touched.lastname && formik.errors.lastname}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label={<FormattedMessage id="Email" />}
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type={passwordVisible ? 'text' : 'password'} // Toggle password visibility
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={handleTogglePasswordVisibility} // Toggle visibility on click
                                                edge="end"
                                                aria-label="toggle password visibility"
                                            >
                                                {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label={<FormattedMessage id="Phone" />}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" style={{ marginRight: '20px' }}>
                        <Button onClick={() => close(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            sx={{ margin: '2px' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {console.log('loadingpage', loading)}
                            {loading ? 'Adding...' : 'Add Employee'}
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddEmployee;
