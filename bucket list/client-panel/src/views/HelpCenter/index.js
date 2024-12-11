/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Stack, TextField, Typography, Button, CircularProgress, Container, IconButton, Box, InputAdornment } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { openSnackbar } from 'store/slices/snackbar';
import { sendHelpCenterMailRequest } from 'store/slices/helpCenter';
import { ThemeMode } from 'config';

const AboutUs = ({ item, open, close }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loadingpage, setLoading] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required')
            .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters')
            .test('no-multi-spaces', 'No multiple consecutive spaces allowed', (value) => /^[^\s]+(\s[^\s]+)*$/.test(value))
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be at most 50 characters'),
        query: yup
            .string()
            .required('Query is required')
            .test('no-multi-spaces', 'No multiple consecutive spaces allowed', (value) => /^[^\s]+(\s[^\s]+)*$/.test(value))
            .min(2, 'Query must be at least 2 characters')
            .max(250, 'Query must be at most 250 characters'),
        phone: yup
            .string()
            .required('Phone is required')
            .matches(/^(?!0+$)([1-9][0-9]{4,14})$/, 'Phone number must be 5 to 15 digits, cannot start with 0, and cannot be all 0s'),
        email: yup.string().email('Invalid email').required('Email is required').max(254, 'Email must be at most 254 characters')
    });

    const initialValues = {
        name: '',
        email: '',
        query: '',
        phone: ''
    };

    const onSubmit = async (values, { resetForm }) => {
        try {
            const data = {
                name: values.name,
                email: values.email,
                message: values.query,
                mobile: values.phone
            };
            const res = await dispatch(sendHelpCenterMailRequest(data));
            console.log('res', res);
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
            resetForm();
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
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid
                    sx={{
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.dark' : 'background.default',
                        margin: 'auto',
                        width: '100%'
                    }}
                    className="boxShadaw"
                >
                    <Grid alignItems="center" sx={{ marginBottom: '15px' }}>
                        <Grid item xs={12} textAlign="center" className="headingshadow" sx={{ marginBottom: '15px' }}>
                            <Typography variant="h1">Help Center</Typography>
                        </Grid>
                    </Grid>

                    <form onSubmit={formik.handleSubmit}>
                        <Grid
                            container
                            spacing={2}
                            direction="column"
                            sx={{
                                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100',
                                padding: '6%',
                                borderRadius: '2%'
                            }}
                        >
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    fullWidth
                                    autoComplete="given-name"
                                    InputLabelProps={{ shrink: true }}
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="query"
                                    name="query"
                                    label="Query"
                                    value={formik.values.query}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.query && Boolean(formik.errors.query)}
                                    helperText={formik.touched.query && formik.errors.query}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Stack direction="row" spacing={2} justifyContent="center" style={{ marginTop: '23px' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    disabled={loadingpage}
                                    startIcon={loadingpage && <CircularProgress size={20} />}
                                >
                                    {loadingpage ? 'Adding...' : 'Submit'}
                                </Button>
                            </Stack>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUs;
