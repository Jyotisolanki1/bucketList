import React, { useState, useEffect, Suspense } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Grid,
    Stack,
    CircularProgress,
    IconButton,
    TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UpdateCms } from 'store/slices/cms';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage } from 'react-intl';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
// Dynamically import ReactQuill
const ReactQuill = React.lazy(() => import('react-quill'));

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const Cms = ({ open, close, item }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        type: item?.type,
        content: item?.content
    };

    const validationSchema = yup.object({
        content: yup
            .string()
            .required('Content is required') // Ensures it's not left empty
            .trim('Content cannot be blank') // Trims leading/trailing whitespace
            .test('no-multi-spaces', 'No multiple consecutive spaces allowed', (value) =>
                value ? /^[^\s]+(\s[^\s]+)*$/.test(value) : false
            )
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log('values', values);
            setLoading(true);
            try {
                const data = {
                    content: values.content,
                    type: values.type
                };
                const res = await dispatch(UpdateCms(data));
                if (res.succeeded === true) {
                    setLoading(false);
                    resetForm();
                    await dispatch(
                        openSnackbar({
                            open: true,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            message: res?.ResponseMessage,
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
                            message: res?.ResponseMessage,
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
    });

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth="true"
            maxWidth="md"
            onClose={close}
            aria-describedby="alert-dialog-slide-description"
        >
            <form onSubmit={formik.handleSubmit} id="validation-forms">
                <DialogTitle>
                    <FormattedMessage id={item?.type} />
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="type"
                                    name="type"
                                    label="Name"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    fullWidth
                                    autoComplete="given-name"
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={12}>
                                <Suspense fallback={<CircularProgress />}>
                                    <ReactQuill
                                        theme="snow"
                                        value={formik.values.content}
                                        onChange={(value) => {
                                            // Remove all HTML tags and check for meaningful content
                                            const plainText = value.replace(/<\/?[^>]+(>|$)/g, '').trim();
                                            if (plainText === '') {
                                                formik.setFieldValue('content', ''); // Set empty value if no meaningful content
                                            } else {
                                                formik.setFieldValue('content', value); // Set the actual value if valid
                                            }
                                        }}
                                    />
                                </Suspense>
                                {formik.errors.content && formik.touched.content && (
                                    <div style={{ color: 'red' }}>{formik.errors.content}</div>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="center">
                            <Button disabled={loading} variant="contained" sx={{ my: 3, ml: 1 }} type="submit" color="secondary">
                                {loading ? (
                                    <>
                                        <CircularProgress color="primary" />
                                        &nbsp;
                                        <FormattedMessage id="loading" /> ...
                                    </>
                                ) : (
                                    <FormattedMessage id="Update" />
                                )}
                            </Button>
                        </Stack>
                    </Grid>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Cms;
