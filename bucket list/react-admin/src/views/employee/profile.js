/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Stack, TextField, Typography, Button, CircularProgress } from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateEmployeeProfileApi } from 'store/slices/employee';
import { openSnackbar } from 'store/slices/snackbar';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
    const dispatch = useDispatch();
    const imageInputRef = useRef(null);
    const [loadingpage, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState(null);
    const navigate = useNavigate();

    const PROXY = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const data = localStorage.getItem('adminEmployeeProfile');
        setEmployeeDetails(JSON.parse(data));
    }, []);

    const validationSchema = yup.object().shape({
        firstname: yup
            .string()
            .required('First name is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                // eslint-disable-next-line arrow-body-style
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
        email: yup.string().email('Invalid email address').required('Email is required').min(2).max(50),
        phone: yup
            .string()
            .required('Phone is required')
            .matches(/^(?!0+$)([1-9][0-9]{4,14})$/, 'Phone number must be 5 to 15 digits, cannot start with 0, and cannot be all 0s')
    });

    const initialValues = {
        firstname: employeeDetails?.firstname || '',
        lastname: employeeDetails?.lastname || '',
        email: employeeDetails?.email || '',
        phone: employeeDetails?.phone || '',
        image: null
    };

    const onSubmit = async (values) => {
        console.log(values);
        if (imageError.trim() !== '') {
            setImageError('Please select a valid image file (PNG, JPEG)');
        } else {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('id', employeeDetails._id);
                formData.append('firstname', values.firstname);
                formData.append('lastname', values.lastname);
                formData.append('email', values.email);
                formData.append('phone', values.phone);
                if (values.image) formData.append('image', values.image);

                const res = await dispatch(updateEmployeeProfileApi(formData));
                console.log(res?.success);
                if (res?.success === true) {
                    setLoading(false);
                    localStorage.setItem('adminClientProfile', JSON.stringify(res.data));
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
                    navigate('/employee-management');
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
                setLoading(false);
                dispatch(openSnackbar({ message: 'Something went wrong.', variant: 'error' }));
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
        if (file && allowedTypes.includes(file.type)) {
            setImageError('');
            setSelectedImage(URL.createObjectURL(file));
            formik.setFieldValue('image', file);
        } else {
            setImageError('Please select a valid image file (PNG, JPEG)');
        }
    };

    return (
        <MainCard title={<Typography variant="h3">Employee Profile</Typography>}>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                                alt="Employee Pic"
                                src={selectedImage || `${PROXY}/${employeeDetails?.profile_pic}`}
                                sx={{ height: 120, width: 120, borderRadius: '8px' }}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" color="secondary">
                                    Upload Profile
                                </Button>
                            </label>
                            <input
                                accept="image/png, image/jpeg"
                                id="contained-button-file"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                ref={imageInputRef}
                            />
                            {imageError && (
                                <Typography variant="caption" style={{ color: 'red' }}>
                                    {imageError}
                                </Typography>
                            )}
                        </Stack>
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
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 50 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ maxLength: 50 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center">
                            <Button disabled={loadingpage} variant="contained" type="submit" color="secondary">
                                {loadingpage ? <CircularProgress size={20} sx={{ mr: 1 }} /> : 'Update'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default ViewEmployee;
