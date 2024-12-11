/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Stack, TextField, Typography, Button, CircularProgress } from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileApi, updateProfileApi } from 'store/slices/adminAuth';
import { openSnackbar } from 'store/slices/snackbar';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const imageInputRef = useRef(null);
    const [loadingpage, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = React.useState('');
    const [adminDetails, setAdminDetails] = React.useState({});

    const { profile, loading } = useSelector((state) => state.admin);
    const PROXY = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await dispatch(ProfileApi());
            setAdminDetails(res.data);
        };
        fetchProfile();
    }, []);

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning." />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Username must be at least 2 characters')
            .max(50, 'Username must be at most 50 characters'),
        email: yup.string().email('Invalid email address').required('Email is required').max(254, 'Email must be at most 254 characters')
    });
    // console.log('adminDetails', adminDetails);
    const initialValues = {
        username: adminDetails?.username || '',
        email: adminDetails?.email || '',
        image: null
    };

    const onSubmit = async (values, { resetForm }) => {
        if (imageError.trim() !== '') {
            setImageError('Please select a valid image file (PNG, JPEG)');
        } else {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('username', values.username);
                formData.append('email', values.email);
                if (values.image) {
                    formData.append('image', values.image);
                }
                formData.append('id', adminDetails?._id);
                const res = await dispatch(updateProfileApi(formData));
                if (res?.success === true) {
                    setLoading(false);
                    localStorage.setItem('name', res?.data?.username);
                    localStorage.setItem('profile', res?.data?.profile_pic);
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
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item>
                        <Typography variant="h3">Profile</Typography>
                    </Grid>
                </Grid>
            }
        >
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                {loading ? (
                    <Skeleton count={2} />
                ) : (
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                                {adminDetails?.profile_pic ? (
                                    <Grid item>
                                        <Avatar
                                            alt="Admin Pic"
                                            src={selectedImage || `${PROXY}/${adminDetails?.profile_pic}`}
                                            sx={{ height: 120, width: 120, borderRadius: '8px' }}
                                        />
                                    </Grid>
                                ) : (
                                    <Grid item>
                                        <Skeleton variant="rectangular" width={60} height={60} />
                                    </Grid>
                                )}

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
                            {adminDetails?.username ? (
                                <TextField
                                    id="username"
                                    name="username"
                                    label="User Name"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                    fullWidth
                                    autoComplete="given-name"
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ maxLength: 50 }}
                                />
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            {adminDetails?.email ? (
                                <TextField
                                    id="email"
                                    name="email"
                                    label={<FormattedMessage id="Email" />}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="center">
                                <Button disabled={loadingpage} variant="contained" sx={{ my: 3, ml: 1 }} type="submit" color="secondary">
                                    {loadingpage ? (
                                        <>
                                            <CircularProgress color="success" size={20} sx={{ mr: 1 }} />
                                            loading ...
                                        </>
                                    ) : (
                                        <FormattedMessage id="Update" />
                                    )}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                )}
            </form>
        </MainCard>
    );
};

export default Profile;
