import React from 'react';
import {
    Grid,
    Typography,
    OutlinedInput,
    InputAdornment,
    Table,
    Modal,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableHead,
    TableRow,
    IconButton,
    Divider,
    CardContent,
    Chip,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import CloseIcon from '@mui/icons-material/Close';

// material-ui
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector } from 'store';
import { GetGameHistoryAPI } from 'store/slices/gameHistory';
import Skeleten from 'utils/Skeleton';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

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
    const theme = useTheme();
    const dispatch = useDispatch();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const [gameDetail, setGameDetail] = React.useState({});
    const { list, loading } = useSelector((state) => state.gameHistory);
    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;
    const [search, setSearch] = React.useState('');
    React.useEffect(() => {
        dispatch(GetGameHistoryAPI(page, rowsPerPage, search));
    }, [page, search]);

    const renderSwitch = (status) => {
        switch (status) {
            case '0':
                return <Chip label="Pending" />;
            case '1':
                return <Chip label="Ongoing" color="primary" />;
            case '2':
                return <Chip label="completed" color="success" />;
            case '3':
                return <Chip label="rejected" color="error" />;
            default:
                return <Chip label="pending" />;
        }
    };

    const handleModalOpen = (data) => {
        setGameDetail(data);
        setOpen(true);
    };

    const handleModalClose = () => {
        setOpen(false);
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing} style={{ marginTop: '0%' }}>
                    <Grid item>
                        <Typography variant="h3">Game History</Typography>
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
                            <TableCell>Host Name</TableCell>
                            <TableCell>Host Email</TableCell>
                            {/* <TableCell>Radius</TableCell> */}
                            <TableCell>Date</TableCell>
                            <TableCell>status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <Skeleten count={6} />
                        ) : (
                            list &&
                            list.list &&
                            list.list.map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell sx={{ pl: 3 }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{row?.host_id?.fullname}</TableCell>
                                    <TableCell>{row?.host_id?.email}</TableCell>
                                    {/* <TableCell>{row?.radius}</TableCell> */}
                                    <TableCell>{row.updated_at}</TableCell>
                                    <TableCell>{renderSwitch(row.status)}</TableCell>
                                    <TableCell>
                                        <VisibilityTwoToneIcon onClick={(e) => handleModalOpen(row)} />
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
                count={list.record || 0} // Use userList1.length for total count
                rowsPerPage={rowsPerPage}
                page={list.page || 0}
                onPageChange={(event, newPage) => setPage(newPage)}
            />

            <Modal open={open} onClose={handleModalClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <MainCard
                    style={modalStyle}
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, sm: 500 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Game Details"
                    content={false}
                    secondary={
                        <IconButton onClick={handleModalClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <SubCard
                            title={
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar alt="User 1" src={`http://52.22.241.165:10023/${gameDetail?.host_id?.image}`} />
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography align="left" variant="subtitle1">
                                            {gameDetail?.host_id?.fullname} <Chip size="small" label="Host" color="primary" />
                                        </Typography>
                                        <Typography align="left" variant="subtitle2">
                                            {gameDetail?.host_id?.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item>{renderSwitch(gameDetail.status)}</Grid>
                                </Grid>
                            }
                        >
                            <List component="nav" aria-label="main mailbox folders">
                                <ListItemButton>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" variant="subtitle1">
                                                {gameDetail?.seeker_id?.fullname}
                                            </Typography>
                                            <Typography align="left" variant="subtitle2">
                                                {gameDetail?.seeker_id?.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip size="small" label="Seeker" color="primary" />
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                                <Divider />
                                <ListItemButton>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs zeroMinWidth>
                                            <Typography align="left" variant="subtitle1">
                                                {gameDetail?.hider_id?.fullname}
                                            </Typography>
                                            <Typography align="left" variant="subtitle2">
                                                {gameDetail?.hider_id?.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip size="small" label="Hider" color="error" />
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            </List>

                            <CardContent>
                                <Grid container spacing={0}>
                                    <Grid item xs={4}>
                                        <Typography align="center" variant="h3">
                                            {gameDetail?.radius}
                                        </Typography>
                                        <Typography align="center" variant="subtitle2">
                                            Radius
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="center" variant="h3">
                                            {gameDetail?.duration}
                                        </Typography>
                                        <Typography align="center" variant="subtitle2">
                                            Duration
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="center" variant="h3">
                                            {gameDetail?.interval}
                                        </Typography>
                                        <Typography align="center" variant="subtitle2">
                                            Interval
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            {gameDetail?.winner_id && (
                                <List component="nav" aria-label="main mailbox folders">
                                    <ListItemButton>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Avatar alt="User 1" src={`http://52.22.241.165:10023/${gameDetail?.winner_id?.image}`} />
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography align="left" variant="subtitle1">
                                                    {gameDetail?.winner_id?.fullname}
                                                </Typography>
                                                <Typography align="left" variant="subtitle2">
                                                    {gameDetail?.winner_id?.email}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Chip size="small" label="Winner" color="success" />
                                            </Grid>
                                        </Grid>
                                    </ListItemButton>
                                </List>
                            )}
                        </SubCard>
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>
        </MainCard>
    );
};

export default Index;
