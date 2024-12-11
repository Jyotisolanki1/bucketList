/* eslint-disable no-nested-ternary */
import React from 'react';

// Material-UI imports
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Pagination,
    Typography,
    TableCell,
    TableContainer,
    Table,
    IconButton,
    Stack,
    TableBody,
    TableHead,
    TableRow,
    Tooltip,
    Button
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import { GetUserQuery, replyQuery } from 'store/slices/helpCenter';
import { gridSpacing } from 'store/constant';
import Skeleton from 'utils/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import MailView from './MailView';

const HelpIndex = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const [item, setItem] = React.useState(null);
    const [openMail, setOpenMail] = React.useState(false);
    const [rply, setRply] = React.useState(false);
    const theme = useTheme();
    const { getQuery, loading, totalPages } = useSelector((state) => state.helpCenter);
    const dispatch = useDispatch();

    // State to track expanded rows for "View More"
    const [expandedRows, setExpandedRows] = React.useState({});

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    React.useEffect(() => {
        dispatch(GetUserQuery(page, limit));
    }, [dispatch, page, limit, rply]);

    const handleReply = async (row) => {
        try {
            await dispatch(replyQuery({ id: row._id }));
            dispatch(GetUserQuery(page, limit));
            const subject = 'Reply to Help Query';
            const mailtoLink = `mailto:${row.email}?subject=${encodeURIComponent(subject)}`;
            window.open(mailtoLink);
        } catch (error) {
            console.error('Error replying to query:', error);
        }
    };

    const handleClickOpenMail = (row) => {
        setItem(row);
        setOpenMail(true);
    };

    // Toggle expand/collapse for a specific row
    const toggleExpandRow = (index) => {
        setExpandedRows((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleReplySent = (replyStatus) => {
        if (replyStatus) {
            setRply(true);
        }
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Help Center List</Typography>
                    </Grid>
                </Grid>
            }
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>S.No.</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Query</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <Skeleton count={5} />
                        ) : (
                            getQuery &&
                            getQuery.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ pl: 3 }}>{index + 1 + (page * limit - limit)}</TableCell>
                                    <TableCell>
                                        <Typography align="left" variant="subtitle1" component="div">
                                            {row.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <div
                                            style={{
                                                display: 'block',
                                                maxWidth: '300px', // Adjust column width as required
                                                wordWrap: 'break-word'
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                component="div"
                                                sx={{
                                                    whiteSpace: expandedRows[index] ? 'normal' : 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {/* Only add ellipsis if not expanded and message is longer than 100 characters */}
                                                {expandedRows[index]
                                                    ? row?.message
                                                    : row?.message?.length > 100
                                                    ? `${row?.message?.slice(0, 100)}...`
                                                    : row.message}
                                            </Typography>
                                        </div>

                                        {/* Only show "View More" if there's more content to display (message length > 100) */}
                                        {row.message.length > 100 && !expandedRows[index] && (
                                            <Button size="small" onClick={() => toggleExpandRow(index)} color="primary">
                                                View More
                                            </Button>
                                        )}

                                        {/* Show "View Less" button only when expanded */}
                                        {expandedRows[index] && (
                                            <Button size="small" onClick={() => toggleExpandRow(index)} color="primary">
                                                View Less
                                            </Button>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {row.reply === 'true' ? (
                                            <Typography style={{ color: 'green', fontWeight: '600' }}>Replied</Typography>
                                        ) : (
                                            <Stack direction="row" spacing={1}>
                                                <Tooltip title="Reply" key="1">
                                                    <IconButton color="primary" className="custom-icon-button">
                                                        <ReplyTwoToneIcon
                                                            onClick={() => {
                                                                handleClickOpenMail(row); // Pass index to handleReply
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
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
            {openMail && <MailView item={item} open={openMail} close={() => setOpenMail(false)} onReplySent={handleReplySent} />}
        </MainCard>
    );
};

export default HelpIndex;
