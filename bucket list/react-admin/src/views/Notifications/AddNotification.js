import React from 'react';
import { useDispatch } from 'store';
import { AddNotificationsAPI, GetNotificationsAPI } from 'store/slices/notifications';
import { SendNotificationAPI } from 'store/slices/user1';
// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// Validation schema
const validationSchema = yup.object({
    notification: yup.string().min(3, 'Notification should be of minimum 3 characters length').required('Notification is required')
});

const AddNotification = ({ handleClose, selectedUsers }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            notification: '',
            userids: selectedUsers
        },
        validationSchema,
        onSubmit: async (values) => {
            const response = await dispatch(SendNotificationAPI(values));
            if (response.succeeded === true) {
                await dispatch(
                    openSnackbar({
                        open: true,
                        message: response.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
            } else {
                await dispatch(
                    openSnackbar({
                        open: true,
                        message: response.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
            handleClose();
            // await dispatch(GetNotificationsAPI());
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="notification"
                        name="notification"
                        label="Notification Title"
                        value={formik.values.notification}
                        onChange={formik.handleChange}
                        error={formik.touched.notification && Boolean(formik.errors.notification)}
                        helperText={formik.touched.notification && formik.errors.notification}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <AnimateButton>
                            <Button variant="contained" color="secondary" type="submit">
                                Add
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddNotification;
