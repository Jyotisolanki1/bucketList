import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Box,
    Typography,
    DialogContent,
    DialogTitle,
    Slide,
    Grid,
    TextField,
    IconButton,
    CircularProgress,
    DialogActions,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { GetService, Addbucket, GetSubCat, updateService, deleteSubCatApi } from 'store/slices/service';
import { openSnackbar } from 'store/slices/snackbar';

const ViewBucket = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [adminDetails, setAdmindetails] = React.useState();
    const PROXY = process.env.REACT_APP_API_URL;
    const { services, subCat } = useSelector((state) => state.service);

    console.log('subcategories', subcategories);
    useEffect(() => {
        const data = localStorage.getItem('clientViewBucket');
        const newParsedData = JSON.parse(data);
        setAdmindetails(newParsedData);
        setSubcategories(newParsedData?.subcategories || []);
        dispatch(GetService());
        dispatch(GetSubCat(newParsedData?.category?._id));
    }, [dispatch]);

    const initialValues = {
        name: adminDetails?.name,
        description: adminDetails?.description,
        price: adminDetails?.price,
        category: adminDetails?.category?._id,
        subcategory: ''
    };

    const handleRemoveSubcategory = async (subcategoryToRemove) => {
        setSubcategories(subcategories.filter((sub) => sub.name !== subcategoryToRemove.name));
        const data = {
            bucketid: adminDetails._id,
            subcatid: subcategoryToRemove._id
        };
        const res = await dispatch(deleteSubCatApi(data));
        if (res?.success === true) {
            setLoading(false);
            localStorage.setItem('adminViewService', JSON.stringify(res.data));
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
    };

    const onSubmit = async (values, { resetForm }) => {
        console.log('values', subcategories);
        try {
            const subcategoryIds = subcategories.map((sub) => sub._id);

            const data = {
                id: adminDetails._id,
                name: values.name,
                description: values.description,
                price: values.price,
                category: values.category,
                subcategory: subcategoryIds
            };

            const res = await dispatch(updateService(data));
            if (res?.success === true) {
                setLoading(false);
                localStorage.setItem('adminViewService', JSON.stringify(res.data));
                dispatch(GetSubCat(adminDetails?.category?._id));
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
                navigate('/bucket');
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
    };
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Service name is required')
            .test(
                'no-multi-spaces',
                'Use only alphabets with single spaces between words. No spaces at the start or end',
                (value) => value && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value)
            )
            .min(2, 'Service name must be at least 2 characters')
            .max(50, 'Service name must be at most 50 characters'),
        description: Yup.string()
            .required('Description is required')
            .test(
                'no-multi-spaces',
                'Use only alphabets with single spaces between words. No spaces at the start or end',
                (value) => value && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value)
            )
            .min(2, 'Description must be at least 2 characters')
            .max(50, 'Description must be at most 50 characters'),
        price: Yup.number()
            .typeError('Price must be a number')
            .required('Price is required')
            .positive('Price must be a positive number')
            .min(0, 'Price must be a positive number')
            .test('is-decimal', 'Price must be a valid decimal number', (value) => value && /^\d+(\.\d+)?$/.test(value.toString())),
        category: Yup.string().required('Category is required')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit
    });

    const handleSubChangeCategory = async (e) => {
        const { value } = e.target;
        console.log('subcategories', subcategories); // Check if the selected subcategory is valid and add it if not already in the list
        if (value && !subcategories.some((sub) => sub._id === value._id)) {
            setSubcategories([...subcategories, { name: value.name, _id: value._id }]);
            formik.setFieldValue('subcategory', ''); // Clear the form's subcategory field
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Sub category already listed.',
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
    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h3">View Bucket</Typography>
                    </Grid>
                </Grid>
            }
        >
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={12} md={12}>
                        <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                                Bucket Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Bucket name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Category"
                                        name="category"
                                        value={adminDetails?.category?.name}
                                        disabled
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>

                                {subCat && subCat.length > 0 ? (
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="sub-category-label">Sub Category</InputLabel>
                                            <Select
                                                id="demo-simple-select"
                                                label="Sub-category"
                                                name="subcategory"
                                                value={formik.values.subcategory || ''}
                                                onChange={handleSubChangeCategory}
                                                sx={{ width: '100%' }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: 100,
                                                            overflow: 'auto'
                                                        }
                                                    }
                                                }}
                                            >
                                                <MenuItem value="" disabled>
                                                    Please select sub category
                                                </MenuItem>
                                                {subCat &&
                                                    subCat.map((option, index) => (
                                                        <MenuItem key={index} value={{ _id: option._id, name: option.name }}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                ) : (
                                    ''
                                )}

                                <Stack direction="row" spacing={1} sx={{ marginTop: '8px', marginLeft: '8px', flexWrap: 'wrap' }}>
                                    {subcategories.map((sub, index) => (
                                        <Grid
                                            item
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                backgroundColor: 'white',
                                                padding: '0.5em',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: 'inline-block',
                                                    marginLeft: '8px'
                                                }}
                                            >
                                                {sub.name} {/* Display subcategory name */}
                                            </Typography>
                                            <IconButton
                                                onClick={() => handleRemoveSubcategory(sub)}
                                                color="error"
                                                aria-label="remove subcategory"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </Grid>
                                    ))}
                                </Stack>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <Button disabled={loading} variant="contained" sx={{ my: 3, ml: 1 }} type="submit">
                            {loading ? (
                                <>
                                    <CircularProgress color="primary" />
                                    &nbsp;Loading ...
                                </>
                            ) : (
                                'Add Bucket'
                            )}
                        </Button>
                    </Stack>
                </Grid>
            </form>
        </MainCard>
    );
};

export default ViewBucket;
