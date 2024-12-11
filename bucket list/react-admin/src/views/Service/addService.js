import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { AddServiceAPI } from 'store/slices/service';
import { openSnackbar } from 'store/slices/snackbar';
import { SketchPicker } from 'react-color';

const AddCategory = ({ open, close }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [color, setColor] = useState('');

    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        category: Yup.string()
            .required('Category is required')
            .test(
                'no-multi-spaces',
                <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
                (value) => value && /^[^\s]+(\s[^\s]+)*$/.test(value)
            )
            .min(2, 'Category must be at least 2 characters')
            .max(50, 'Category must be at most 50 characters')
            .matches(/^[a-zA-Z\s]*$/, 'Category should only contain letters.'),
        color: Yup.string().required('Color is required'),
        subcategory: Yup.string().max(50, 'Sub category should be less than 50 characters')
        // .test(
        //     'no-multi-spaces',
        //     <FormattedMessage id="Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning" />,
        //     (value) => value && /^[^\s]+(\s[^\s]+)*$/.test(value)
        // )
    });

    const initialValues = {
        category: '',
        subcategory: '',
        color: ''
    };

    const onSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const data = {
            name: values.category,
            color,
            subCategories: subcategories
        };
        try {
            const res = await dispatch(AddServiceAPI(data));
            if (res?.success === true) {
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
        initialValues,
        validationSchema,
        onSubmit
    });

    const handleAddSubcategory = () => {
        const subcategory = formik.values.subcategory.trim();
        if (subcategory && !subcategories.includes(subcategory)) {
            setSubcategories([...subcategories, subcategory]);
            formik.setFieldValue('subcategory', '');
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: `${subcategory} sub category already listed.`,
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

    const handleRemoveSubcategory = (subcategoryToRemove) => {
        setSubcategories(subcategories.filter((sub) => sub !== subcategoryToRemove));
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        formik.setFieldValue('color', color.hex);
        setColorPickerVisible(false);
    };

    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth="md">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={10}>
                            Add Service
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

                <DialogContent>
                    <Grid container spacing={2} direction="column">
                        {/* Category Field */}
                        <Grid item xs={12} sm={6} sx={{ marginTop: '15px' }}>
                            <TextField
                                id="category"
                                name="category"
                                label="Category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                                fullWidth
                            />
                        </Grid>
                        {/* Color Field with Color Picker */}
                        <Grid item xs={12} sm={6} sx={{ marginTop: '5px' }}>
                            <TextField
                                id="color"
                                name="color"
                                label="Color"
                                value={color || formik.values.color}
                                onFocus={() => setColorPickerVisible(true)} // Open color picker when focusing the field
                                readOnly
                                onBlur={formik.handleBlur}
                                error={formik.touched.color && Boolean(formik.errors.color)}
                                helperText={formik.touched.color && formik.errors.color}
                                fullWidth
                            />
                            {colorPickerVisible && (
                                <SketchPicker
                                    color={color || formik.values.color}
                                    onChange={handleColorChange}
                                    style={{ marginTop: '8px' }}
                                />
                            )}
                        </Grid>

                        {/* Subcategory Field */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="subcategory"
                                name="subcategory"
                                label="Add Subcategory"
                                value={formik.values.subcategory}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.subcategory && Boolean(formik.errors.subcategory)}
                                helperText={formik.touched.subcategory && formik.errors.subcategory}
                                fullWidth
                            />
                            <Button variant="outlined" color="secondary" onClick={handleAddSubcategory} sx={{ marginTop: '8px' }}>
                                Add Subcategory
                            </Button>
                            <Stack direction="row" spacing={1} sx={{ marginTop: '8px', flexWrap: 'wrap' }}>
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
                                                display: 'inline-block' // Ensure the width adjusts to content
                                            }}
                                        >
                                            {sub}
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
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => close(false)} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '15px' }}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddCategory;
