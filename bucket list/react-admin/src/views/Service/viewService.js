import React, { useEffect, useRef, useState } from 'react';
import { Grid, Stack, TextField, Typography, Button, DialogTitle, IconButton, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MainCard from 'ui-component/cards/MainCard';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubCatApi, updateServiceApi } from 'store/slices/service';
import { openSnackbar } from 'store/slices/snackbar';
import { SketchPicker } from 'react-color';

const ViewService = () => {
    const dispatch = useDispatch();
    const imageInputRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [adminDetails, setAdmindetails] = React.useState();
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [color, setColor] = useState('');
    const PROXY = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const data = localStorage.getItem('adminViewService');
        const newParsedData = JSON.parse(data);
        setAdmindetails(newParsedData);
        setSubcategories(newParsedData?.subcategories || []);
        setColor(newParsedData?.color || '');
    }, [dispatch]);

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
    });

    const initialValues = {
        category: adminDetails?.name,
        subcategory: '',
        color: adminDetails?.color
    };

    const handleRemoveSubcategory = async (subcategoryToRemove) => {
        setSubcategories(subcategories.filter((sub) => sub.name !== subcategoryToRemove.name));
        const res = await dispatch(deleteSubCatApi(subcategoryToRemove._id));
        if (res?.success === true) {
            setLoading(false);
            localStorage.setItem('adminViewService', JSON.stringify(res.data));
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.message,
                    variant: 'alert',
                    alert: { color: 'success' },
                    close: false,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                })
            );
        } else {
            setLoading(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.message,
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                })
            );
        }
    };

    const onSubmit = async (values, { resetForm }) => {
        try {
            const data = {
                id: adminDetails._id,
                name: values.category,
                color,
                subcategories
            };
            const res = await dispatch(updateServiceApi(data));
            if (res?.success === true) {
                setLoading(false);
                localStorage.setItem('adminViewService', JSON.stringify(res.data));
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res?.message,
                        variant: 'alert',
                        alert: { color: 'success' },
                        close: false,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
                navigate('/service-management');
            } else {
                setLoading(false);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: res?.message,
                        variant: 'alert',
                        alert: { color: 'error' },
                        close: false,
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
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
                    alert: { color: 'error' },
                    close: false,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
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

    const handleAddSubcategory = () => {
        const subcategory = formik.values.subcategory.trim();

        if (subcategory && !subcategories.some((item) => item.name === subcategory)) {
            setSubcategories([...subcategories, { name: subcategory, _id: 'new' }]);
            formik.setFieldValue('subcategory', '');
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: `${subcategory} sub category already listed.`,
                    variant: 'alert',
                    alert: { color: 'error' },
                    close: false,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' }
                })
            );
        }
    };

    const handleColorChange = (color) => {
        setColor(color.hex);
        formik.setFieldValue('color', color.hex);
        setColorPickerVisible(false);
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h3">View Service</Typography>
                    </Grid>
                </Grid>
            }
        >
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2} direction="column">
                        {/* Category Field */}
                        <Grid item xs={12} sm={6}>
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
                                placeholder="Enter category"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {/* Color Field with Color Picker */}
                        <Grid item xs={12} sm={6} sx={{ marginTop: '5px' }}>
                            <TextField
                                id="color"
                                name="color"
                                label="Color"
                                value={color || formik.values.color}
                                onFocus={() => setColorPickerVisible(true)} // Open the color picker on focus
                                readOnly
                                fullWidth
                                InputLabelProps={{ shrink: true }}
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
                                                display: 'inline-block'
                                            }}
                                        >
                                            {sub.name}
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
                    <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '15px' }}>
                        Save
                    </Button>
                </DialogActions>
            </form>
        </MainCard>
    );
};

export default ViewService;
