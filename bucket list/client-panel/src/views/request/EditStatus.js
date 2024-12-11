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
import { openSnackbar } from 'store/slices/snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { updateRequestStatus } from 'store/slices/request';
import { useDispatch, useSelector } from 'store';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const EditStatus = ({ open, close, data }) => {
    const [otherCat, setOtherCat] = useState(false);
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search] = useState('');
    const [loading, setLoading] = useState(false);

    // React.useEffect(() => {
    //     dispatch(GetService());
    // }, [dispatch]);

    const initialValues = {
        status: data?.requestStatus,
        id: data?.idRequest
    };

    const handleChangeCategory = (e) => {
        const { value } = e.target;
        formik.setFieldValue('status', value);
    };

    const onSubmit = async (values, { resetForm }) => {
        const comfirmStatus = window.confirm('Are you sure, Your want to change status.');
        if (comfirmStatus) {
            setLoading(true);
            try {
                const res = await dispatch(updateRequestStatus(values));
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
        }
    };
    const formik = useFormik({
        initialValues,
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
                            Change Request Status
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
                                            <FormControl fullWidth>
                                                <InputLabel id="category-label">Status</InputLabel>
                                                <Select
                                                    id="demo-simple-select"
                                                    label="Category"
                                                    name="category"
                                                    value={formik.values.status || 'select'} // Ensure "select" is the default
                                                    onChange={handleChangeCategory} // Use the handler to update the state and formik
                                                    sx={{ width: '100%' }}
                                                >
                                                    <MenuItem value="Approved" disabled>
                                                        Approved
                                                    </MenuItem>
                                                    {data?.requestStatus === 'Completed' ? (
                                                        <MenuItem value="In Process" disabled>
                                                            In Process
                                                        </MenuItem>
                                                    ) : (
                                                        <MenuItem value="In Process">In Process</MenuItem>
                                                    )}

                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                </Select>
                                                {formik.touched.category && formik.errors.category && (
                                                    <FormHelperText error>{formik.errors.category}</FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center">
                            {/* <AnimateButton> */}
                            <Button disabled={loading} variant="contained" sx={{ my: 3, ml: 1 }} type="submit">
                                {loading ? (
                                    <>
                                        <CircularProgress color="primary" />
                                        &nbsp;Loading ...
                                    </>
                                ) : (
                                    'Update'
                                )}
                            </Button>
                            {/* </AnimateButton> */}
                        </Stack>
                    </Grid>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default EditStatus;
