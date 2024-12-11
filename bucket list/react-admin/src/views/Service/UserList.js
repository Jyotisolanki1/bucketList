import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableHead, TableRow } from '@mui/material';

import { useDispatch, useSelector } from 'store';
import { GetUsersAPI } from 'store/slices/user1';
import profile from '../../assets/images/user.png';
import Skeleten from 'utils/Skeleton';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

// ==============================|| USER LIST 1 ||============================== //

const UserList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { userList1, loading } = useSelector((state) => state.user1);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    React.useEffect(() => {
        dispatch(GetUsersAPI(page, rowsPerPage));
    }, [page]);
    const PROXY = process.env.REACT_APP_API_URL;
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>S.no.</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Fullname</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Register Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <Skeleten count={8} />
                        ) : (
                            userList1 &&
                            userList1.list &&
                            userList1.list.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>
                                        {row.image ? (
                                            <img src={`${PROXY}/${row.image}`} alt="User" height={50} width={50} />
                                        ) : (
                                            <img src={profile} height={50} width={50} alt="User" />
                                        )}
                                    </TableCell>
                                    <TableCell>{row.fullname}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                    <TableCell>{row.email ? row.email : '-'}</TableCell>
                                    <TableCell>{row.status === '1' ? 'Verified' : 'Not Verified'}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>
                                        <VisibilityTwoToneIcon />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[rowsPerPage]}
                component="div"
                count={userList1.record || 0} // Use userList1.length for total count
                rowsPerPage={rowsPerPage}
                page={userList1.page || 0}
                onPageChange={(event, newPage) => setPage(newPage)}
            />
        </>
    );
};

export default UserList;
