/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import {
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Pagination,
    TableHead,
    TableRow,
    Tooltip,
    Fab,
    Chip,
    Switch
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteOutlineTwoTone from '@mui/icons-material/DeleteOutlineTwoTone';
import { gridSpacing } from 'store/constant';
import AddService from './addService';
import EditUser from './editUser';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { GetServiceApi, statusChangeRequest } from 'store/slices/service';
import { useNavigate } from 'react-router-dom';

// import profile from '../../assets/images/defaultlogo.png';

import Skeleten from 'utils/Skeleton';
// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import moment from 'moment';
import AddIcon from '@mui/icons-material/AddTwoTone';

const PROXY = process.env.REACT_APP_API_URL;

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

const Index = () => {
    const dispatch = useDispatch();

    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [userDetail, setUserDetail] = React.useState({});
    const [status, setStatus] = React.useState(true);
    const [item, setItem] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [search, setSearch] = React.useState('');

    const handleModalOpen = (data) => {
        setUserDetail(data);
        setOpen(true);
    };
    const theme = useTheme();
    const handleModalClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    const handleClientProfile = async (row) => {
        localStorage.setItem('adminViewService', JSON.stringify(row));
        navigate('/view-category');
    };

    const { services, loading, totalPages } = useSelector((state) => state.service);

    React.useEffect(() => {
        dispatch(GetServiceApi(page, limit));
    }, [page, limit, dispatch, status, openAdd, open]);

    const PROXY = process.env.REACT_APP_API_URL;
    const changeAdd = (flag) => {
        setOpenAdd(false);
        if (flag === true) {
            setStatus(!status);
        }
    };
    const handleClickStatus = async (row) => {
        try {
            const data = {
                id: row?._id,
                status: row.status === 'Active' ? 'Inactive' : 'Active'
            };

            const res = await dispatch(statusChangeRequest(data));
            console.log('res', res);
            if (res?.success === true) {
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
                setStatus(!status);
            } else {
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
                setStatus(!status);
            }
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: error.message,
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
            setStatus(!status);
        }
    };
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <MainCard
                title={
                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing} style={{ marginTop: '0%' }}>
                        <Grid item xs={12} sm={5}>
                            <Typography variant="h3">Service List</Typography>
                        </Grid>

                        <Grid item xs={12} sm={5} sx={{ textAlign: 'right' }}>
                            <Tooltip title="Add category">
                                <Fab color="primary" size="small" sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}>
                                    <AddIcon
                                        fontSize="small"
                                        onClick={() => {
                                            setOpenAdd(true);
                                        }}
                                    />
                                </Fab>
                            </Tooltip>
                        </Grid>
                    </Grid>
                }
                content={false}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }}>S.no.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <Skeleten count={5} />}
                            {!loading &&
                                services?.length > 0 &&
                                services.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>
                                        <TableCell>{row?.name}</TableCell>
                                        <TableCell>{row?.color}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={row.status === 'Active'}
                                                onChange={() => handleClickStatus(row)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <br />
                                            {row.status === 'Active' ? (
                                                <Chip
                                                    label="Active"
                                                    size="small"
                                                    sx={{
                                                        background:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark.main
                                                                : theme.palette.success.light + 60,
                                                        color: theme.palette.success.dark
                                                    }}
                                                />
                                            ) : (
                                                <Chip
                                                    label="Inactive"
                                                    size="small"
                                                    sx={{
                                                        background:
                                                            theme.palette.mode === 'dark'
                                                                ? theme.palette.dark.main
                                                                : theme.palette.warning.light + 60,
                                                        color: theme.palette.warning.dark
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="View category details" style={{ cursor: 'pointer' }}>
                                                <VisibilityTwoToneIcon onClick={() => handleClientProfile(row)} />
                                            </Tooltip>
                                            {/* <Tooltip title="Delete category" style={{ cursor: 'pointer' }}>
                                                <DeleteOutlineTwoTone onClick={() => handleDelete(row)} />
                                            </Tooltip> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {!loading && !(services?.length > 0) && (
                                <TableRow>
                                    <TableCell colSpan={4}>Category not fund</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination count={totalPages} page={page} color="primary" onChange={handleChangePage} />
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            {openAdd && <AddService open={openAdd} close={(flag) => changeAdd(flag)} />}
        </>
    );
};

export default Index;
