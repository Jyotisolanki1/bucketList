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
    Pagination,
    TableHead,
    TableRow,
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useNavigate } from 'react-router-dom';
import { openSnackbar } from 'store/slices/snackbar';
import { useDispatch, useSelector } from 'store';
import { GetRequest, statusChange, getCompanyName } from 'store/slices/request';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Skeleten from 'utils/Skeleton';

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
    const [searchCategory, setSearchCategory] = React.useState('select');
    const [searchCompany, setSearchCompany] = React.useState('select');
    const [companyName, setCompany] = React.useState();
    const [reqStatus, setReqStatus] = React.useState();

    const router = useNavigate();
    const { requests, loading, totalPages, company } = useSelector((state) => state.request);
    console.log('company', company);
    React.useEffect(() => {
        dispatch(getCompanyName());
        dispatch(GetRequest(page, limit, search, searchCategory, searchCompany));
    }, [search, page, limit, dispatch, status, openAdd, open, searchCategory, searchCompany]);

    const PROXY = process.env.REACT_APP_API_URL;
    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const onCategorySearch = (e) => {
        if (e.target.value.trim().length > 2 || e.target.value.trim().length === 0) {
            if (e.target.value === 'select') {
                setSearchCategory('');
            } else {
                setSearchCategory(e.target.value);
            }
            setReqStatus(e.target.value);
            setPage(1);
            setLimit(10);
        }
    };
    const onCampanySearch = (e) => {
        if (e.target.value.trim().length > 2 || e.target.value.trim().length === 0) {
            if (e.target.value === 'select') {
                setSearchCompany('');
            } else {
                setSearchCompany(e.target.value);
            }
            setCompany(e.target.value);
            setPage(1);
            setLimit(10);
        }
    };
    const onViewClick = (row) => {
        localStorage.setItem('viewRequestData', JSON.stringify(row));
        router('/request-details');
    };
    const chageStatus = async (row) => {
        let con = false;

        con = window.confirm('Are you sure, You want to approve request?');

        if (con) {
            const data = {
                id: row
            };
            try {
                const res = await dispatch(statusChange(data));
                if (res?.success === true) {
                    console.log('Status changed successfully', res);
                    setStatus(!status);
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
                setOpen(!open);
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
                        <Grid item sm={3}>
                            <Typography variant="h3">Requests List</Typography>
                        </Grid>
                        <Grid item sm={3}>
                            {' '}
                            <FormControl fullWidth>
                                <InputLabel id="request-status">Company Name</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    label="Company Name"
                                    onChange={onCampanySearch}
                                    name="Company"
                                    value={companyName || 'select'}
                                    sx={{ width: '100%' }}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                                overflowY: 'auto'
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="select">Please Select Company Name</MenuItem>
                                    {company &&
                                        company.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={3}>
                            {' '}
                            <FormControl fullWidth>
                                <InputLabel id="request-status">Request Status</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    label="Request Status"
                                    onChange={onCategorySearch}
                                    name="request"
                                    value={reqStatus || 'select'}
                                    sx={{ width: '100%' }}
                                >
                                    <MenuItem value="select">Please Select Status</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Process">In Process</MenuItem>
                                    <MenuItem value="Completed">Completed</MenuItem>
                                    <MenuItem value="Approved">Approved</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search By REQ_ID, Email"
                                startAdornment={<InputAdornment position="start" />}
                                size="large"
                                onChange={searchData}
                                style={{ width: '100%' }}
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
                                <TableCell>Request Id</TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <Skeleten count={7} />}
                            {!loading &&
                                requests?.length > 0 &&
                                requests.map((row, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>
                                        <TableCell>{row.request_id || 'N/A'}</TableCell>
                                        <TableCell>{row?.company_name || 'N/A'}</TableCell>
                                        <TableCell>{row?.email || 'N/A'}</TableCell>
                                        <TableCell>${row?.bucketInfo?.price || 'N/A'}</TableCell>
                                        {row?.isStatus === 'Pending' ? (
                                            <TableCell
                                                style={{ color: 'red', cursor: 'pointer', fontWeight: '600' }}
                                                onClick={() => chageStatus(row._id)} // Fixed typo from 'chageStatus' to 'changeStatus'
                                            >
                                                {row?.isStatus}
                                            </TableCell>
                                        ) : row?.isStatus === 'Approved' ? (
                                            <TableCell style={{ color: 'blue', fontWeight: '600' }}>{row?.isStatus}/MSAs</TableCell>
                                        ) : (
                                            <TableCell style={{ color: 'green', fontWeight: '600' }}>{row?.isStatus}</TableCell>
                                        )}
                                        <TableCell>
                                            <VisibilityIcon onClick={() => onViewClick(row)} style={{ cursor: 'pointer' }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {!loading && !(requests?.length > 0) && (
                                <TableRow>
                                    <TableCell colSpan={7}>Request Not Found</TableCell>
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
