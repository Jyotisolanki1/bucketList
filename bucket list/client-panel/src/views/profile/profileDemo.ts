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
    Checkbox,
    FormControlLabel,
    FormHelperText
} from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileApi, updateProfileApi, BusinessCategory, SalesPersons } from 'store/slices/adminAuth';
import { openSnackbar } from 'store/slices/snackbar';
import Skeleton from '@mui/material/Skeleton';

const Profile = () => {
    const dispatch = useDispatch();
    const imageInputRef = useRef(null);
    const [loadingpage, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = React.useState('');
    const [showSalesPerson, setShowSalesPerson] = useState(false);
    const { adminDetails, profile, loading, services, salesperson } = useSelector((state) => state.admin);
    const PROXY = process.env.REACT_APP_API_URL;

    useEffect(() => {
        dispatch(ProfileApi());
        dispatch(BusinessCategory());
        dispatch(SalesPersons());
    }, [dispatch]);

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
            .matches(/^[A-Za-z\s]+$/, 'City can only contain   letters and spaces')
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
            .test('no-spaces', 'Website URL cannot contain spaces', (value) => value && !/\s/.test(value))
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
        sales_person: yup
            .string()
            .min(2, 'Sales person must be at least 2 characters')
            .max(50, 'Sales person must be at most 50 characters'),
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
        username: adminDetails?.name || '',
        email: adminDetails?.email || '',
        company_name: adminDetails?.company_name || '',
        address: adminDetails?.address || '',
        job_title: adminDetails?.job_title || '',
        city_zip: adminDetails?.city_zip || '',
        phone: adminDetails?.phone || '',
        website: adminDetails?.website || '',
        company_information: adminDetails?.company_information || '',
        category: adminDetails?.category || '',
        sales_person: adminDetails?.sales_person,
        image: null
    };

    const onSubmit = async (values, { resetForm }) => {
        if (imageError.trim() !== '') {
            setImageError('Please select a valid image file (PNG, JPEG)');
        } else {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('name', values.username);
                formData.append('email', values.email);
                formData.append('sales_person', values.sales_person);
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

                const res = await dispatch(updateProfileApi(formData));
                if (res?.success === true) {
                    console.log('res?.data?.name', res?.data?.name);
                    setLoading(false);
                    localStorage.setItem('clientName', `${res?.data?.name}`);
                    localStorage.setItem('clientProfile', res?.data?.profile_pic);
                    localStorage.setItem('isClientLoggedIn', true);
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

    const handleCheckboxChange = (event) => {
        setShowSalesPerson(event.target.checked); // Update state based on checkbox
    };
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
                                        <Avatar alt="Admin Pic" src={selectedImage} sx={{ height: 120, width: 120, borderRadius: '8px' }} />
                                    </Grid>
                                )}

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
                            {adminDetails?.name ? (
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
                                />
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.company_name ? (
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
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.address ? (
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
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.job_title ? (
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
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.city_zip ? (
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
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.phone ? (
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
                                    InputProps={{
                                        readOnly: true,
                                        style: { color: '#6c757d', backgroundColor: '#f8f9fa' } // Adjust color as needed
                                    }}
                                />
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.website ? (
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
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {adminDetails?.company_information ? (
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
                            ) : (
                                <Skeleton />
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="Select-Sales-Person">Select Sales Person</InputLabel>
                                <Select
                                    labelId="Select-Sales-Person"
                                    id="Select-Sales-Person"
                                    name="sales_person"
                                    value={formik.values.sales_person || ''} // Pre-fill the Select component with the category ID from formik
                                    onChange={formik.handleChange} // Update formik value on change
                                    label="Select Sales Person"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 100,
                                                overflow: 'auto'
                                            }
                                        }
                                    }}
                                >
                                    {salesperson &&
                                        salesperson.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item?.firstname}
                                                {item?.lastname}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="personal-consultant">Service Type</InputLabel>
                                <Select
                                    labelId="Select-Sales-Person"
                                    id="Select-Sales-Person"
                                    name="category"
                                    value={formik.values.category || ''}
                                    onChange={formik.handleChange}
                                    label="Select Sales Person"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 100,
                                                overflow: 'auto'
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
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox checked={showSalesPerson} onChange={handleCheckboxChange} name="showSalesPerson" />}
                                label="Do you have referral?"
                            />
                        </Grid>

                        {/* Conditionally render Sales Person field */}
                        {showSalesPerson && (
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
                                        value={formik.values.sales_person || ''}
                                        onChange={formik.handleChange}
                                        label="Select Sales Person"
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 140,
                                                    overflowY: 'auto'
                                                }
                                            }
                                        }}
                                    >
                                        {salesperson &&
                                            salesperson.map((item) => (
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
                        )}
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
