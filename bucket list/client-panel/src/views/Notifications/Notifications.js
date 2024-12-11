import React, { useEffect } from 'react';

// assets
import CloseIcon from '@mui/icons-material/Close';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import Skeleton from '@mui/material';
// material-ui
import {
    IconButton,
    Stack,
    CardContent,
    Typography,
    ButtonGroup,
    Button,
    Divider,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Grid,
    Checkbox,
    ButtonBase,
    OutlinedInput,
    InputAdornment,
    Avatar,
    TableHead,
    Toolbar
} from '@mui/material';
import Skeleton from 'utils/Skeleton';
import { IconSearch } from '@tabler/icons';

// assets

import { useDispatch, useSelector } from 'store';
import { GetNotificationsAPI, DeleteNotificationsAPI } from 'store/slices/notifications';
import { GetUsersAlAPI } from 'store/slices/user1';

// pages
import UpdateNotification from './UpdateNotification';
import { openSnackbar } from 'store/slices/snackbar';
// import { useDispatch } from 'react-redux';

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
const EnhancedTableToolbar = ({ numSelected }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 && (
            <Typography color="inherit" variant="h4" component="div">
                {numSelected} Users Selected
            </Typography>
        )}
    </Toolbar>
);

//   EnhancedTableToolbar.propTypes = {
//     numSelected: PropTypes.number.isRequired
//   };

function EnhancedTableHead({ selected }) {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="none" colSpan={5}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

//   EnhancedTableHead.propTypes = {
//     selected: PropTypes.array.isRequired
//   };
// ==============================|| NOTIFICATIONS ||============================== //

const Notifications = ({ handleSelectedUsers, closeopen }) => {
    const dispatch = useDispatch();

    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('');
    const [notificationId, setNotificationId] = React.useState(null);
    const [notificationText, setNotificationText] = React.useState('');
    const { usersList, loading } = useSelector((state) => state.user1);

    const [selected, setSelected] = React.useState([]);

    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    useEffect(() => {
        if (closeopen === false) {
            setSelected([]);
        }
    }, [closeopen]);

    const [denseTable, setDenseTable] = React.useState(false);
    const handleModalOpen = () => {
        setOpen(true);
    };
    const PROXY = process.env.REACT_APP_API_URL;
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n._id);
            setSelected(newSelecteds);
            handleSelectedUsers(newSelecteds);
            return false;
        }
        setSelected([]);
        handleSelectedUsers([]);
        return true;
    };
    const handleClick = (event, row) => {
        const selectedIndex = selected.indexOf(row._id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row._id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
        handleSelectedUsers(newSelected);
    };
    const handleModalClose = () => {
        setOpen(false);
    };

    // console.log('selected', selected);
    React.useEffect(() => {
        dispatch(GetUsersAlAPI(search));
    }, [search, dispatch, closeopen]);
    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
        setNotificationId('');
    };

    const Delete = (e) => {
        setNotificationId(e);
        handleOpen2();
    };
    const onSearch = (e) => {
        if (e.target.value.trim().length > 2 || e.target.value.trim().length === 0) {
            setSearch(e.target.value.trim());
        }
    };
    function EnhancedTableHead({ selected }) {
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="none" colSpan={5}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                    </TableCell>
                </TableRow>
            </TableHead>
        );
    }
    const handleDelete = async () => {
        const formData = { notification_id: notificationId };
        console.log(formData);
        const response = await dispatch(DeleteNotificationsAPI(formData));
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
                        color: 'danger'
                    },
                    close: false
                })
            );
        }
        setNotificationId('');
        await dispatch(GetNotificationsAPI());
    };

    const Edit = (e) => {
        setNotificationId(e.id);
        setNotificationText(e.notification);
        handleModalOpen();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        setData(usersList);
    }, [usersList]);

    // React.useEffect(() => {
    //     dispatch(GetNotificationsAPI());
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <>
            <MainCard
                title={
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Checkbox
                                color="primary"
                                indeterminate={selected.length > 0 && selected.length < data.length}
                                checked={data.length > 0 && selected.length === data.length}
                                onChange={handleSelectAllClick}
                                style={{ marginLeft: '-20px' }}
                            />
                            <span>Select All</span>
                        </Grid>
                        <Grid item>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="16px" />
                                    </InputAdornment>
                                }
                                size="small"
                                onChange={onSearch}
                            />
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <Grid container>
                    {!loading ? (
                        <Grid item xs={12}>
                            {data.length ? (
                                <MainCard content={false}>
                                    <TableContainer>
                                        <Table
                                            aria-labelledby="tableTitle"
                                            sx={{ minWidth: 320, '& td': { whiteSpace: 'nowrap', px: 0.75 } }}
                                        >
                                            {selected.length > 0 && <EnhancedTableHead selected={selected} />}
                                            <TableBody>
                                                {data.map((row) => (
                                                    <TableRow
                                                        hover
                                                        sx={{
                                                            bgcolor: '',
                                                            '& td:last-of-type>div': {
                                                                position: 'absolute',
                                                                top: '50%',
                                                                right: 5,
                                                                transform: 'translateY(-50%)',
                                                                display: 'none',
                                                                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
                                                                borderRadius: '12px',
                                                                py: 1,
                                                                px: 1.75,
                                                                '& button + button': {
                                                                    ml: 0.625
                                                                }
                                                            },
                                                            '&:hover': {
                                                                '& td:last-of-type>div': {
                                                                    display: 'block'
                                                                }
                                                            }
                                                        }}
                                                        tabIndex={-1}
                                                        key={row._id}
                                                    >
                                                        <TableCell>
                                                            <Checkbox
                                                                color="primary"
                                                                checked={selected.indexOf(row._id) !== -1}
                                                                onChange={(event) => handleClick(event, row)}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                                                <Grid item>
                                                                    <Avatar
                                                                        sx={{
                                                                            width: denseTable ? 30 : 40,
                                                                            height: denseTable ? 30 : 40
                                                                        }}
                                                                        alt={row.firstname}
                                                                        src={`${PROXY}/${row.image}`}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs zeroMinWidth>
                                                                    <ButtonBase disableRipple>
                                                                        <Typography
                                                                            align="left"
                                                                            variant={row.isRead ? 'body2' : 'subtitle1'}
                                                                            component="div"
                                                                        >
                                                                            {row.fullname}
                                                                        </Typography>
                                                                    </ButtonBase>
                                                                </Grid>
                                                                <Grid item xs zeroMinWidth>
                                                                    <ButtonBase disableRipple>
                                                                        <Typography
                                                                            align="left"
                                                                            variant={row.isRead ? 'body2' : 'subtitle1'}
                                                                            component="div"
                                                                        >
                                                                            {row.email}
                                                                        </Typography>
                                                                    </ButtonBase>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell align="center" />
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </MainCard>
                            ) : (
                                <MainCard>
                                    <Typography variant="h4">User Not Found</Typography>
                                </MainCard>
                            )}
                        </Grid>
                    ) : (
                        <MainCard>
                            <TableBody>
                                <TableCell>
                                    <Skeleton count={1} />
                                </TableCell>
                                <TableCell>
                                    <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                        <Grid item>
                                            <Skeleton count={1} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton count={1} />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Skeleton count={1} />
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableBody>{' '}
                        </MainCard>
                    )}
                </Grid>
            </MainCard>

            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <MainCard>
                <Modal
                    open={open}
                    onClose={handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <MainCard
                        style={modalStyle}
                        sx={{
                            position: 'absolute',
                            width: { xs: 280, lg: 450 },
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        title="Update Notification"
                        content={false}
                        secondary={
                            <IconButton onClick={handleModalClose} size="large">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        <CardContent>
                            <UpdateNotification
                                notificationId={notificationId}
                                notificationText={notificationText}
                                handleModalClose={handleModalClose}
                            />
                        </CardContent>
                        <Divider />
                    </MainCard>
                </Modal>
            </MainCard>

            <Modal open={open2} onClose={handleClose2} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, lg: 450 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Delete Notification"
                    content={false}
                    secondary={
                        <IconButton onClick={handleClose2} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Typography variant="body1" sx={{ fontWeight: '500', marginBottom: 2, textAlign: 'center' }}>
                            Are you sure you want to delete this notification?{' '}
                        </Typography>
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            aria-label="Disabled button group"
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Button
                                onClick={() => {
                                    handleClose2();
                                }}
                                sx={{ margin: 1 }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    handleClose2();
                                    handleDelete();
                                }}
                                sx={{ margin: 1 }}
                                color="error"
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </>
    );
};

export default Notifications;
