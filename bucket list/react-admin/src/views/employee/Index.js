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
    Chip,
    Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { gridSpacing } from 'store/constant';
import AddEmployee from './addEmployee';
import EditUser from './editUser';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { GetEmployeeApi, statusChangeRequest } from 'store/slices/employee';
// import { GetClientApi, statusChangeRequest, approveClient } from 'store/slices/client';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/images/user.png';

import Skeleten from 'utils/Skeleton';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import moment from 'moment';
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

    const theme = useTheme();

    const navigate = useNavigate();
    const handleClientProfile = async (row) => {
        localStorage.setItem('adminEmployeeProfile', JSON.stringify(row));
        navigate('/employee-profile');
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
    const { employee, loading, totalPages } = useSelector((state) => state.employee);
    React.useEffect(() => {
        dispatch(GetEmployeeApi(search, page, limit));
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
                // const res = await dispatch(statusChange(data));
                // if (res?.succeeded === true) {
                //     setStatus(!status);
                //     dispatch(
                //         openSnackbar({
                //             open: true,
                //             message: res?.ResponseMessage,
                //             variant: 'alert',
                //             alert: {
                //                 color: 'success'
                //             },
                //             close: false,
                //             anchorOrigin: {
                //                 vertical: 'top',
                //                 horizontal: 'right'
                //             }
                //         })
                //     );
                // } else {
                //     dispatch(
                //         openSnackbar({
                //             open: true,
                //             message: res?.ResponseMessage,
                //             variant: 'alert',
                //             alert: {
                //                 color: 'error'
                //             },
                //             close: false,
                //             anchorOrigin: {
                //                 vertical: 'top',
                //                 horizontal: 'right'
                //             }
                //         })
                //     );
                // }
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
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h3">Employees List</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search By Emp_ID, Fullname And Email."
                                startAdornment={<InputAdornment position="start" />}
                                size="large"
                                onChange={searchData}
                                style={{ width: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                            <Tooltip title="Add Employee">
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
                                <TableCell>Image</TableCell>
                                <TableCell>Employee Id</TableCell>
                                <TableCell>Fullname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <Skeleten count={8} />}
                            {!loading &&
                                employee?.length > 0 &&
                                employee.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>
                                        <TableCell>
                                            {row?.profile_pic ? (
                                                <img src={`${PROXY}/${row?.profile_pic}`} alt="User" height={50} width={50} />
                                            ) : (
                                                <img src={profile} height={50} width={50} alt="User" />
                                            )}
                                        </TableCell>
                                        <TableCell>{row?.employee_id}</TableCell>

                                        <TableCell>
                                            {row?.firstname} {row?.lastname}
                                        </TableCell>
                                        <TableCell>{row?.email}</TableCell>
                                        <TableCell>{row?.phone ? row?.phone : 'N/A'}</TableCell>

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
                                        <TableCell>
                                            <Tooltip title="View employee profile" style={{ cursor: 'pointer' }}>
                                                <VisibilityTwoToneIcon onClick={() => handleClientProfile(row)} />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {!loading && !(employee?.length > 0) && (
                                <TableRow>
                                    <TableCell colSpan={5}>Employee Not Found</TableCell>
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
            {openAdd && <AddEmployee open={openAdd} close={(flag) => changeAdd(flag)} />}
        </>
    );
};

export default Index;
