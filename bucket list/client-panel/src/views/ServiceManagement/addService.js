/* eslint-disable dot-notation */
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
'use client';

import React, { useState, useRef } from 'react';
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
import { useFormik } from 'formik';
import * as yup from 'yup';

import CloseIcon from '@mui/icons-material/Close';
import { GetService, Addbucket, GetSubCat } from 'store/slices/service';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const AddBucket = ({ open, close }) => {
    const [otherCat, setOtherCat] = useState(false);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search] = useState('');
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [category, setCategory] = React.useState('select');
    const { services, subCat } = useSelector((state) => state.service);

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Service name is required')
            .test('no-multi-spaces', 'Use only alphabets with single spaces between words. No spaces at the start or end', (value) => {
                return value && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
            })
            .min(2, 'Service name must be at least 2 characters')
            .max(50, 'Service name must be at most 50 characters'),
        description: yup
            .string()
            .required('Description is required')
            .test('no-multi-spaces', 'Use only alphabets with single spaces between words. No spaces at the start or end', (value) => {
                return value && /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
            })
            .min(2, 'Description must be at least 2 characters')
            .max(50, 'Description must be at most 50 characters'),
        price: yup
            .number()
            .typeError('Price must be a number')
            .required('Price is required')
            .positive('Price must be a positive number')
            .min(0, 'Price must be a positive number')
            .test('is-decimal', 'Price must be a valid decimal number', (value) => {
                return value && /^\d+(\.\d+)?$/.test(value.toString());
            }),
        category: yup.string().required('Category is required'),
        
    });

    const handleKeyBlock = (e) => {
        // Allow only numbers, one decimal point, and backspace
        const isNumber = /[0-9]/.test(e.key);
        const isDecimal = e.key === '.' && !e.target.value.includes('.');
        const isControlKey = e.key === 'Backspace' || e.key === 'Delete';

        if (!isNumber && !isDecimal && !isControlKey) {
            e.preventDefault();
        }
    };

    React.useEffect(() => {
        dispatch(GetService());
    }, [dispatch]);

    const initialValues = {
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: ''
    };

    const handleChangeCategory = async (e) => {
        const { value } = e.target;
        formik.setFieldValue('category', value);
        setSubcategories([]);
        await dispatch(GetSubCat(value));
    };

    const handleRemoveSubcategory = (subcategoryToRemove) => {
        setSubcategories(subcategories.filter((sub) => sub._id !== subcategoryToRemove._id));
    };

    const handleSubChangeCategory = async (e) => {
        const { value } = e.target;
        if (value && !subcategories.some((sub) => sub._id === value.id)) {
            setSubcategories([...subcategories, { name: value.name, _id: value.id }]);
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

    const onSubmit = async (values, { resetForm }) => {
        const subcategoryIds = subcategories.map((sub) => sub._id);
        const data = {
            name: values.name,
            description: values.description,
            price: values.price,
            category: values.category,
            subcategory: subcategoryIds
        };
        setLoading(true);
        try {
            const res = await dispatch(Addbucket(data));
            if (res?.success === true) {
                setLoading(false);
                resetForm();
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res.message,
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
                    message: 'Something went wrong. Please try again letar.',
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
        initialValues,
        validationSchema,
        onSubmit,
        validateOnChange: true,
        validateOnBlur: true
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth="true"
            maxWidth="md"
            aria-describedby="alert-dialog-slide-description"
        >
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <DialogTitle>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            Add Bucket
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton
                                color="inherit"
                                onClick={() => {
                                    close(false);
                                }}
                                aria-label="close"
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={12} md={12}>
                            <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 1, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                                <form onSubmit={formik.handleSubmit}>
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
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel id="category-label">Category</InputLabel>
                                                <Select
                                                    id="demo-simple-select"
                                                    label="Category"
                                                    name="category"
                                                    value={formik.values.category || 'select'} // Ensure "select" is the default
                                                    onChange={handleChangeCategory} // Use the handler to update the state and formik
                                                    sx={{ width: '100%' }}
                                                >
                                                    <MenuItem value="select" disabled>
                                                        Please select category
                                                    </MenuItem>
                                                    {services &&
                                                        services.map((option, index) => (
                                                            <MenuItem key={index} value={option._id}>
                                                                {option.name}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                                {formik.touched.category && formik.errors.category && (
                                                    <FormHelperText error>{formik.errors.category}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        {subCat && subCat.length > 0  ? (
                                            <Grid item xs={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="sub-category-label">Sub Category</InputLabel>
                                                    <Select
                                                        id="demo-simple-select"
                                                        label="Sub-category"
                                                        name="subcategory"
                                                        value={formik.values.subcategory || ''} // Use empty string as the default value
                                                        onChange={handleSubChangeCategory} // Update the handler
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
                                                                <MenuItem key={index} value={{ id: option._id, name: option.name }}>
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
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Price"
                                                    name="price"
                                                    value={formik.values.price}
                                                    onChange={formik.handleChange}
                                                    onKeyDown={handleKeyBlock} // Updated handler
                                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                                    helperText={formik.touched.price && formik.errors.price}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
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
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AddBucket;
