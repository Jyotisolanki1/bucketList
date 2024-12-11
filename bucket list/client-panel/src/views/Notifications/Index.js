import PropTypes from 'prop-types';
import React, { useState } from 'react';

// assets
import CloseIcon from '@mui/icons-material/Close';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Modal, Typography, Divider, CardContent, IconButton } from '@mui/material';

// project imports
import Notifications from './Notifications';
import MainCard from 'ui-component/cards/MainCard';
import AddNotification from './AddNotification';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch } from 'store';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const Body = React.forwardRef(({ modalStyle, handleClose, selectedUsers }, ref) => (
    <div ref={ref} tabIndex={-1}>
        <MainCard
            style={modalStyle}
            sx={{
                position: 'absolute',
                width: { xs: 280, lg: 450 },
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
            title="Send Notification"
            content={false}
            secondary={
                <IconButton onClick={handleClose} size="large">
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        >
            <CardContent>
                <AddNotification handleClose={handleClose} selectedUsers={selectedUsers} />
            </CardContent>
            <Divider />
        </MainCard>
    </div>
));

Body.propTypes = {
    modalStyle: PropTypes.object,
    handleClose: PropTypes.func
};

// ==============================|| Puzzle ||============================== //

const Index = () => {
    const theme = useTheme();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const dispatch = useDispatch();
    const handleSelectedUsers = (selected) => {
        setSelectedUsers(selected);
    };
    const handleModalOpen = async () => {
        if (selectedUsers.length === 0) {
            console.log('testting');
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Please select at least one user',
                    variant: 'alert',
                    close: false,
                    alert: {
                        color: 'error'
                    },
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            );
            return false;
        }
        setOpen(true);
        return true;
    };

    const handleModalClose = () => {
        setOpen(false);
    };
    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Notifications</Typography>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                justifyContent: 'flex-end',
                                [theme.breakpoints.down('lg')]: {
                                    justifyContent: 'flex-start'
                                }
                            }}
                        >
                            <Grid item>
                                <Button variant="contained" onClick={handleModalOpen}>
                                    Send Notification
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
            content={false}
        >
            <Notifications handleSelectedUsers={handleSelectedUsers} closeopen={open} />

            <Modal open={open} onClose={handleModalClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body modalStyle={modalStyle} handleClose={handleModalClose} selectedUsers={selectedUsers} />
            </Modal>
        </MainCard>
    );
};

export default Index;
