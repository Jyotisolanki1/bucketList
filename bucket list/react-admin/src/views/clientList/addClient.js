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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    IconButton,
    DialogContentText,
    DialogContent,
    FormHelperText,
    DialogActions,
    InputAdornment
} from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addClientApi, BusinessCategory, SalesPersons } from 'store/slices/client';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { openSnackbar } from 'store/slices/snackbar';
import Skeleton from '@mui/material/Skeleton';

const Profile = ({ item, open, close }) => {
    const dispatch = useDispatch();
    const imageInputRef = useRef(null);
    const [loadingpage, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [imageError, setImageError] = React.useState('');
    const PROXY = process.env.REACT_APP_API_URL;
    const [salesPersonsVal, setSalesPersonsVal] = useState([]);
    const { profile, loading, services, salesperson } = useSelector((state) => state.client);

    useEffect(() => {
        const data = localStorage.getItem('adminClientProfile');
        dispatch(BusinessCategory());
        dispatch(SalesPersons());
    }, [dispatch]);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        if (Array.isArray(salesperson)) {
            setSalesPersonsVal(salesperson);
        } else {
            setSalesPersonsVal([]);
        }
    }, [salesperson]);

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Name is required')
            .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be at most 50 characters'),
        company_name: yup
            .string()
            .required('Company name is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Company name must be at least 2 characters')
            .max(50, 'Company name must be at most 50 characters'),
        address: yup
            .string()
            .required('Address is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Address must be at least 2 characters')
            .max(250, 'Address must be at most 250 characters'),
        password: yup
            .string()
            .required('Password is required')
            .test(
                'password-spaces',
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                (value) => {
                    if (!value) return true;
                    return value && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
                }
            )
            .min(8, 'Password must be at least 8 characters')
            .max(25, 'Password must be at most 25 characters'),

        job_title: yup
            .string()
            .required('Job title is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Job title must be at least 2 characters')
            .max(50, 'Job title must be at most 50 characters'),
        city_zip: yup
            .string()
            .required('City is required')
            .matches(/^[A-Za-z\s]+$/, 'City can only contain  letters and spaces')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => value && /^[^\s]+(\s[^\s]+)*$/.test(value)
            )
            .min(2, 'City must be at least 2 characters')
            .max(50, 'City must be at most 50 characters')
            .trim()
            .notOneOf([''], 'City cannot be a blank string'),

        phone: yup
            .string()
            .required('Phone is required')
            .matches(/^(?!0+$)([1-9][0-9]{4,14})$/, 'Phone number must be 5 to 15 digits, cannot start with 0, and cannot be all 0s'),
        website: yup
            .string()
            .required('Website URL is required')
            .matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please enter a valid website URL')
            .test(
                'no-spaces',
                'Website URL cannot contain spaces',
                (value) => value && !/\s/.test(value) // Disallow any whitespace
            )
            .trim()
            .notOneOf([''], 'Website URL cannot be a blank string'),

        email: yup.string().email('Invalid email address').required('Email is required').max(254, 'Email must be at most 254 characters'),
        company_information: yup
            .string()
            .required('Company information is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Company information must be at least 2 characters')
            .max(250, 'Compnay information must be at most 250 characters'),
        category: yup
            .string()
            .required('Category is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => {
                    return value && /^[^\s]+(\s[^\s]+)*$/.test(value);
                }
            )
            .min(2, 'Category must be at least 2 characters')
            .max(50, 'Category must be at most 50 characters')
    });
    const initialValues = {
        username: '',
        password: '',
        email: '',
        company_name: '',
        address: '',
        job_title: '',
        city_zip: '',
        phone: '',
        website: '',
        company_information: '',
        category: '',
        sales_person: '',
        image: null
    };

    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        if (imageError.trim() !== '') {
            setImageError('Please select a valid image file (PNG, JPEG)');
        } else {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('name', values.username);
                formData.append('password', values.password);
                formData.append('email', values.email);
                if (values.sales_person) {
                    formData.append('sales_person', values.sales_person);
                }
                formData.append('company_name', values.company_name);
                formData.append('category', values.category);
                formData.append('address', values.address);
                formData.append('job_title', values.job_title);
                formData.append('city_zip', values.city_zip);
                formData.append('phone', values.phone);
                formData.append('website', values.website);
                formData.append('company_information', values.company_information);

                if (values.image) {
                    formData.append('image', values.image);
                }

                const res = await dispatch(addClientApi(formData));
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
                    close(false);
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
        <Dialog open={open} keepMounted onClose={() => close(false)} fullWidth="true" maxWidth="md" aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit} id="add-user-form">
                <DialogTitle>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={10}>
                            Add Client
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
                                                            Upload Company Logo
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
                                    id="username"
                                    name="username"
                                    label="Name"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                    fullWidth
                                    autoComplete="given-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="company_name"
                                    name="company_name"
                                    label={<FormattedMessage id="Company Name" />}
                                    value={formik.values.company_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                                    helperText={formik.touched.company_name && formik.errors.company_name}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label={<FormattedMessage id="Address" />}
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="job_title"
                                    name="job_title"
                                    label={<FormattedMessage id="Job Title" />}
                                    value={formik.values.job_title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                                    helperText={formik.touched.job_title && formik.errors.job_title}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="city_zip"
                                    name="city_zip"
                                    label={<FormattedMessage id="City" />}
                                    value={formik.values.city_zip}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.city_zip && Boolean(formik.errors.city_zip)}
                                    helperText={formik.touched.city_zip && formik.errors.city_zip}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
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
                            <Grid item xs={12} sm={6}>
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    label={<FormattedMessage id="Password" />}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="website"
                                    name="website"
                                    label={<FormattedMessage id="Website" />}
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="company_information"
                                    name="company_information"
                                    label={<FormattedMessage id="Company Information" />}
                                    value={formik.values.company_information}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.company_information && Boolean(formik.errors.company_information)}
                                    helperText={formik.touched.company_information && formik.errors.company_information}
                                    fullWidth
                                    autoComplete="family-name"
                                    InputLabelProps={{ shrink: true }}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="Select_Sales_Person">Select Sales Person</InputLabel>
                                    <Select
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.sales_person && Boolean(formik.errors.sales_person)}
                                        helperText={formik.touched.sales_person && formik.errors.sales_person}
                                        labelId="Select_Sales_Person"
                                        id="Select_Sales_Person"
                                        name="sales_person"
                                        value={formik.values.sales_person || ''} // Pre-fill the Select component with the category ID from formik
                                        onChange={formik.handleChange} // Update formik value on change
                                        label="Select Sales Person"
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 140, // Set the maximum height of the dropdown
                                                    overflowY: 'auto' // Enable vertical scrolling
                                                }
                                            }
                                        }}
                                    >
                                        {salesPersonsVal &&
                                            salesPersonsVal?.map((item) => (
                                                <MenuItem key={item?._id} value={item?._id}>
                                                    {item?.firstname} {item?.lastname}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    {formik.touched.sales_person && formik.errors.sales_person && (
                                        <FormHelperText error>{formik.errors.sales_person}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="service_type">Service Type</InputLabel>
                                    <Select
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                        helperText={formik.touched.category && formik.errors.category}
                                        labelId="service_type"
                                        id="service_type"
                                        name="category"
                                        value={formik.values.category || ''} // Pre-fill the Select component with the category ID from formik
                                        onChange={formik.handleChange} // Update formik value on change
                                        label="Service Type"
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 100, // Set the maximum height of the dropdown
                                                    overflowY: 'auto' // Enable vertical scrolling
                                                }
                                            }
                                        }}
                                    >
                                        {services &&
                                            services.map((item) => (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    {formik.touched.category && formik.errors.category && (
                                        <FormHelperText error>{formik.errors.category}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2} justifyContent="flex-end" style={{ marginRight: '28px' }}>
                        <Button onClick={() => close(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            sx={{ margin: '2px' }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loadingpage}
                            startIcon={loadingpage && <CircularProgress size={20} />}
                        >
                            {loadingpage ? 'Adding...' : 'Add Client'}
                        </Button>
                    </Stack>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Profile;
