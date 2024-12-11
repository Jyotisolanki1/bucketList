/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import {
    Grid,
    Typography,
    OutlinedInput,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Pagination,
    TableHead,
    TableRow,
    Tooltip,
    Fab,
    Switch,
    Chip
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddIcon from '@mui/icons-material/AddTwoTone';
import AddUser from './addUser';
import EditUser from './editUser';
import { useTheme } from '@mui/material/styles';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { GetUsersAPI, statusChange, statusChangeRequest } from 'store/slices/user1';
import profile from '../../assets/images/user.png';

import Skeleten from 'utils/Skeleton';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import moment from 'moment';

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
    const theme = useTheme();
    const handleModalOpen = (data) => {
        setUserDetail(data);
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    const { usersList1, loading, totalPages } = useSelector((state) => state.user1);

    React.useEffect(() => {
        dispatch(GetUsersAPI(search, page, limit));
    }, [search, page, limit, dispatch, status, openAdd, open]);

    const PROXY = process.env.REACT_APP_API_URL;
    const changeAdd = (flag) => {
        setOpenAdd(false);
        if (flag === true) {
            setStatus(!status);
        }
    };
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const handleClickOpenEdit = (row) => {
        setItem(row);
        setOpenEdit(true);
    };
    const changeEdit = (flag) => {
        setOpenEdit(false);
        if (flag === true) {
            setStatus(!status);
        }
    };
    const handleClickStatus = async (row) => {
        try {
            const data = {
                id: row?._id,
                status: row.isStatus === 'active' ? 'inactive' : 'active'
            };

            const res = await dispatch(statusChangeRequest(data));
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
            }
        } catch (error) {
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
    const chageStatus = async (row, type) => {
        let con = false;
        if (type === 3) {
            con = window.confirm('Are you sure, You want to delete?');
        } else if (type === 4) {
            con = window.confirm('Are you sure, You want to restore?');
        } else {
            con = true;
        }
        if (con) {
            const data = {
                id: row._id,
                status: type === 3 ? 3 : row.status === 4 ? 1 : row.status === 1 ? 2 : 1
            };
            try {
                const res = await dispatch(statusChange(data));
                if (res?.succeeded === true) {
                    setStatus(!status);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res?.ResponseMessage,
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
        }
    };
    const searchData = (e) => {
        setSearch(e.target.value);
    };
    return (
        <>
            <MainCard
                title={
                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing} style={{ marginTop: '0%' }}>
                        <Grid item>
                            <Typography variant="h3">Customers List</Typography>
                        </Grid>
                        <Grid item>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search By Name And Email"
                                startAdornment={<InputAdornment position="start" />}
                                size="small"
                                onChange={searchData}
                            />
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
                                <TableCell>Image</TableCell>
                                <TableCell>Fullname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <Skeleten count={6} />}
                            {!loading &&
                                usersList1?.length > 0 &&
                                usersList1.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>
                                        <TableCell>
                                            {console.log(`${PROXY}/${row?.image}`)}
                                            {row?.image ? (
                                                <img src={`${PROXY}/${row?.image}`} alt="User" height={50} width={50} />
                                            ) : (
                                                <img src={profile} height={50} width={50} alt="User" />
                                            )}
                                        </TableCell>
                                        <TableCell>{row?.name}</TableCell>
                                        <TableCell>{row?.email}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={row.isStatus === 'active'}
                                                onChange={() => handleClickStatus(row)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <br />
                                            {row.isStatus === 'active' ? (
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
                                        <TableCell>{moment(row?.createdAt).format('MM-DD-YYYY')}</TableCell>
                                    </TableRow>
                                ))}
                            {!loading && !(usersList1?.length > 0) && (
                                <TableRow>
                                    <TableCell colSpan={5}>Customer Not Found</TableCell>
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
        </>
    );
};

export default Index;
