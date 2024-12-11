/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable lines-around-directive */
/* eslint-disable object-shorthand */
/* eslint-disable no-nested-ternary */
'use client';

import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Stack,
    Grid,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Pagination,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    FormControl,
    Tooltip,
    CardContent,
    Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';
import AddService from './addService';
import { useNavigate } from 'react-router-dom';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// assets

import { useDispatch, useSelector } from 'store';
import { GetService, GetBucket } from 'store/slices/service';
import Skeleten from 'utils/Skeleton';
import { IconSearch } from '@tabler/icons';
import { openSnackbar } from 'store/slices/snackbar';

// ==============================|| USER LIST STYLE 1 ||============================== //

const Services = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [status, setStatus] = React.useState(true);
    const [orderBy, setOrderBy] = React.useState('');
    const [order, setOrder] = React.useState('asc');
    const [search, setSearch] = React.useState('');
    const [searchCategory, setSearchCategory] = React.useState('select');
    const [category, setCategory] = React.useState();
    const [openAdd, setOpenAdd] = React.useState(false);

    const { services, buckets, loading, totalPages } = useSelector((state) => state.service);
    // console.log(totalPages);
    const PROXY = `${process.env.REACT_APP_API_URL}`;
    React.useEffect(() => {
        dispatch(GetService());
        dispatch(GetBucket(search, page, limit, searchCategory));
    }, [dispatch, open, search, page, limit, openAdd, searchCategory]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };
    const router = useNavigate();
    const changeAdd = (flag) => {
        setOpenAdd(false);
        if (flag === true) {
            setStatus(!status);
        }
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onCategorySearch = (e) => {
        if (e.target.value.trim().length > 2 || e.target.value.trim().length === 0) {
            if (e.target.value === 'select') {
                setSearchCategory('');
            } else {
                setSearchCategory(e.target.value);
            }
            setCategory(e.target.value);
            setPage(1);
            setLimit(10);
        }
    };

    const onSearch = (e) => {
        if (e.target.value.trim().length > 2 || e.target.value.trim().length === 0) {
            setSearch(e.target.value.trim());
            setPage(1);
            setLimit(10);
        }
    };

    const navigate = useNavigate();
    const handleBucketView = async (row) => {
        localStorage.setItem('clientViewBucket', JSON.stringify(row));
        navigate('/view-bucket');
    };
    return (
        <MainCard title="List of buckets" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Stack direction="row" spacing={2}>
                            <OutlinedInput
                                id="input-search-list-style1"
                                placeholder="Search By Name"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="16px" />
                                    </InputAdornment>
                                }
                                size="large"
                                defaultValue={search}
                                onChange={onSearch}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    label="Category"
                                    onChange={onCategorySearch}
                                    name="category"
                                    value={category || 'select'}
                                    sx={{ width: '100%' }}
                                >
                                    <MenuItem value="select">Please select category</MenuItem>
                                    {services &&
                                        services.map((option, index) => (
                                            <MenuItem key={index} value={option?._id}>
                                                {option?.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                                <Tooltip title="Add Bucket">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                                    >
                                        <AddIcon
                                            fontSize="small"
                                            onClick={() => {
                                                setOpenAdd(true);
                                            }}
                                        />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.no.</TableCell>
                            <TableCell onClick={() => handleRequestSort('firstname')} sx={{ cursor: 'pointer' }}>
                                Name
                            </TableCell>
                            <TableCell onClick={() => handleRequestSort('bussiness_name')} sx={{ cursor: 'pointer' }}>
                                Category
                            </TableCell>
                            <TableCell onClick={() => handleRequestSort('categoryData[0].name')} sx={{ cursor: 'pointer' }}>
                                Price
                            </TableCell>
                            <TableCell onClick={() => handleRequestSort('categoryData[0].name')} sx={{ cursor: 'pointer' }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && <Skeleten count={4} />}
                        {!loading &&
                            buckets?.length > 0 &&
                            buckets.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>
                                    <TableCell>{row?.name}</TableCell>
                                    <TableCell>{row?.category?.name}</TableCell>
                                    <TableCell>$ {row?.price}</TableCell>
                                    <TableCell>
                                        <Tooltip title="View category details" style={{ cursor: 'pointer' }}>
                                            <VisibilityTwoToneIcon onClick={() => handleBucketView(row)} />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {!loading && !(buckets?.length > 0) && (
                            <TableRow>
                                <TableCell colSpan={5}>Bucket Not Found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid item xs={12} sx={{ p: 3 }}>
                <Grid container justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Pagination
                            count={totalPages}
                            page={page}
                            color="primary"
                            onChange={handleChangePage}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {openAdd && <AddService open={openAdd} close={(flag) => changeAdd(flag)} />}
        </MainCard>
    );
};

export default Services;
