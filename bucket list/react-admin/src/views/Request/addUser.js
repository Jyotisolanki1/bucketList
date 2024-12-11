/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-unknown-property */
/* eslint-disable lines-around-directive */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    CircularProgress,
    IconButton,
    Typography,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/slices/snackbar';
import { AddUserAPI } from '../../store/slices/user1';
import Avatar from '../../ui-component/extended/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AddUser = ({ open, close }) => {
    const dispatch = useDispatch();
    const Avatar1 = '/assets/images/users/defaultlogo.png';
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInputRef = useRef(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const validationSchema = yup.object({
        profile_pic: yup
            .mixed()
            .required('Profile picture is required')
            .test('fileType', 'Invalid file type. Only images are allowed', (value) => {
                if (!value) return false; // Ensures the field is required
                return value && ['image/jpeg', 'image/png'].includes(value.type);
            })
            .test('fileSize', 'File size is too large. Maximum size is 2048kb', (value) => {
                if (!value) return false; // Ensures the field is required
                return value && value.size <= 2048 * 1024; // 2048kb = 2MB
            }),
        first_name: yup
            .string()
            .required('First name is required')
            .test('no-multi-spaces', 'Use only alphabets with single spaces between words. No spaces at the start or end', (value) => {
                return value && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
            })
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name must be at most 50 characters'),
        last_name: yup
            .string()
            .required('Last name is required')
            .test('no-multi-spaces', 'Use only alphabets with single spaces between words. No spaces at the start or end', (value) => {
                return value && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
            })
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name must be at most 50 characters'),
        email: yup
            .string()
            .required('Entered email is invalid')
            .test('no-multi-spaces', 'Entered email is invalid', (value) => {
                return value && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
            })
            .max(100, 'Email must be at most 100 characters'),
        password: yup
            .string()
            .required('Password is required')
            .test(
                'password-spaces',
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                (value) => {
                    return value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
                }
            )
            .min(8, 'Password must be at least 8 characters')
            .max(25, 'Password must be at most 25 characters'),
        mobile: yup
            .string()
            .required('Mobile number is required')
            .test('not-all-zeros', 'Mobile number cannot consist entirely of zeros', (value) => {
                return !/^[0]*$/.test(value);
            })
            .min(5, 'Mobile number must be a minimum of 5 digits')
            .max(15, 'Mobile number must be a maximum of 15 digits'),
        status: yup.string().required('Status is required'),
        gender: yup.string().required('Gender is required'),
        role: yup.string().required('Role is required')
    });

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        mobile: '',
        status: '',
        gender: '',
        role: '',
        profile_pic: null
    };

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('mobile', values.mobile);
        formData.append('status', values.status);
        formData.append('gender', values.gender);
        formData.append('role', values.role);
        formData.append('profile_pic', values.profile_pic);
        try {
            const res = await dispatch(AddUserAPI(formData));
            if (res?.succeeded === true) {
                setLoading(false);
                resetForm();
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
                close(true);
            } else {
                setLoading(false);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res?.ResponseMessage,
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
        formik.setFieldError('profile_pic', ''); // Clear any existing errors

        if (file) {
            if (!allowedTypes.includes(file.type)) {
                // File type is not allowed
                formik.setFieldError('profile_pic', 'Please select a valid image file (PNG, JPEG, GIF)');
            } else {
                // File type is allowed
                setSelectedImage(URL.createObjectURL(file));
                formik.setFieldValue('profile_pic', file);
            }
        }
    };
    useEffect(() => {
        formik.setFieldValue('imageInputRef', imageInputRef.current);
    }, [imageInputRef]);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Dialog open={open} keepMounted onClose={() => close(false)} fullWidth="true" maxWidth="md" aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit} id="add-user-form">
                <DialogTitle>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={10}>
                            Add User
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            {selectedImage ? (
                                                <Avatar
                                                    alt="Upload Image"
                                                    src={selectedImage}
                                                    sx={{ height: 100, width: 100, borderRadius: '8px' }}
                                                />
                                            ) : (
                                                <Avatar
                                                    alt="Upload Image"
                                                    src={Avatar1}
                                                    sx={{ height: 100, width: 100, borderRadius: '8px' }}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item sm zeroMinWidth>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <label htmlFor="contained-button-file">
                                                            <Button variant="contained" component="span">
                                                                Upload Image
                                                            </Button>
                                                        </label>
                                                        <input
                                                            accept="image/png, image/jpeg"
                                                            onChange={handleImageChange}
                                                            style={{ display: 'none' }}
                                                            id="contained-button-file"
                                                            multiple
                                                            type="file"
                                                            ref={imageInputRef}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="caption">
                                                        <ErrorTwoToneIcon
                                                            sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }}
                                                        />
                                                        Image size Limit should be 2048kb Max
                                                    </Typography>
                                                    <br />
                                                    <Typography variant="caption" style={{ color: 'red' }}>
                                                        {formik.touched.profile_pic &&
                                                            formik.errors.profile_pic &&
                                                            formik.errors.profile_pic}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="first_name"
                                    name="first_name"
                                    label="First Name"
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                    fullWidth
                                    autoComplete="first_name"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                    fullWidth
                                    autoComplete="last_name"
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                    autoComplete="family-name"
                                    inputProps={{ maxLength: 100 }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="mobile"
                                    name="mobile"
                                    label="Mobile number"
                                    value={formik.values.mobile}
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        // Check if the entered value is numeric and has maximum 3 digits
                                        if (/^\d{0,15}$/.test(value)) {
                                            formik.handleChange(event);
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                    helperText={formik.touched.mobile && formik.errors.mobile}
                                    fullWidth
                                    autoComplete="family-name"
                                    inputProps={{
                                        maxLength: 15,
                                        type: 'number',
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                        inputProps: {
                                            style: { appearance: 'textfield', width: '100%' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                                    <InputLabel id="department-label">Gender</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        label="Gender"
                                        name="gender"
                                        value={formik.values.gender || 'select'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: '100%' }}
                                    >
                                        <MenuItem value="select" disabled>
                                            Please Select Gender
                                        </MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <FormHelperText>{formik.errors.gender}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                                    <InputLabel id="department-label">Role</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        label="Role"
                                        name="role"
                                        value={formik.values.role || 'select'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: '100%' }}
                                    >
                                        <MenuItem value="select" disabled>
                                            Please Select Role
                                        </MenuItem>
                                        <MenuItem value="Viewer">Viewer</MenuItem>
                                        <MenuItem value="Editor">Editor</MenuItem>
                                    </Select>
                                    {formik.touched.role && formik.errors.role && <FormHelperText>{formik.errors.role}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                                    <InputLabel id="department-label">Status</InputLabel>
                                    <Select
                                        id="demo-simple-select"
                                        label="Status"
                                        name="status"
                                        value={formik.values.status || 'select'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        sx={{ width: '100%' }}
                                    >
                                        <MenuItem value="select" disabled>
                                            Please Select Status
                                        </MenuItem>
                                        <MenuItem value="1">Active</MenuItem>
                                        <MenuItem value="2">Inactive</MenuItem>
                                    </Select>
                                    {formik.touched.status && formik.errors.status && (
                                        <FormHelperText>{formik.errors.status}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button onClick={() => close(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {loading ? 'Adding...' : 'Add User'}
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddUser;
