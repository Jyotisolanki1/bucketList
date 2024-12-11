import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Chip,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TextField,
    TableCell,
    Grid,
    TableBody,
    TablePagination,
    Typography,
    ButtonGroup,
    Button,
    Stack,
    IconButton,
    Modal,
    CardContent,
    Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MainCard from 'ui-component/cards/MainCard';
import { openSnackbar } from 'store/slices/snackbar';

import { DeletePuzzlesAPI, GetPuzzlesAPI, UpdatePuzzlesAPI } from 'store/slices/puzzle';
import PuzzleRow from './PuzzleRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const DailyPuzzle = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { puzzleData } = useSelector((state) => state.puzzle);
    const [existingPuzzle, setExistingPuzzle] = useState({});
    const [selectedPuzzle, setSelectedPuzzle] = useState({});
    const [id, setId] = useState('');
    const [modalStyle] = useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    useEffect(() => {
        setData(puzzleData);
    }, [puzzleData]);

    useEffect(() => {
        dispatch(GetPuzzlesAPI());
    }, [dispatch]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setId('');
    };

    const handleOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
        setExistingPuzzle({});
    };

    const handleViewOpen = (puzzle) => {
        setSelectedPuzzle(puzzle);
        setViewOpen(true);
    };

    const handleViewClose = () => {
        setViewOpen(false);
        setSelectedPuzzle({});
    };

    const Delete = (e) => {
        setId(e);
        handleOpen();
    };

    const handleDelete = async () => {
        const formData = { puzzle_id: id };
        const response = await dispatch(DeletePuzzlesAPI(formData));
        if (response.succeeded) {
            dispatch(
                openSnackbar({ open: true, message: response.ResponseMessage, variant: 'alert', alert: { color: 'success' }, close: false })
            );
        } else {
            dispatch(
                openSnackbar({ open: true, message: response.ResponseMessage, variant: 'alert', alert: { color: 'danger' }, close: false })
            );
        }
        dispatch(GetPuzzlesAPI());
        setId('');
    };

    const Edit = (puzzle) => {
        handleOpen2();
        const requiredData = data.find((p) => p._id === puzzle._id);
        const formattedWords = requiredData.list_of_words.map((wordObj) => {
            const [word, score] = Object.entries(wordObj)[0];
            return { word, score };
        });
        setExistingPuzzle({
            puzzle_id: requiredData._id,
            list_of_words: formattedWords,
            target_score: requiredData.target_score
        });
    };

    const validationSchema = Yup.object().shape({
        target_score: Yup.number()
            .required('Target Score is required')
            .positive('Target Score must be positive')
            .integer('Target Score must be an integer'),
        list_of_words: Yup.array().of(
            Yup.object().shape({
                word: Yup.string().required('Word is required'),
                score: Yup.number().required('Score is required').positive('Score must be positive')
            })
        )
    });

    const UpdatePuzzle = async (values, { setSubmitting }) => {
        const formattedPuzzle = {
            ...values,
            list_of_words: values.list_of_words.map((wordObj) => ({
                [wordObj.word]: wordObj.score
            }))
        };
        handleClose2();
        const response = await dispatch(UpdatePuzzlesAPI(formattedPuzzle));
        if (response.succeeded) {
            dispatch(
                openSnackbar({ open: true, message: response.ResponseMessage, variant: 'alert', alert: { color: 'success' }, close: false })
            );
        } else {
            dispatch(
                openSnackbar({ open: true, message: response.ResponseMessage, variant: 'alert', alert: { color: 'danger' }, close: false })
            );
        }
        dispatch(GetPuzzlesAPI());
        setSubmitting(false);
        setExistingPuzzle({});
    };

    const indexOfLastRecord = (page + 1) * rowsPerPage;
    const indexOfFirstRecord = page * rowsPerPage;
    const slicedData = data.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
        <>
            {/* <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S.no.</TableCell>
                            <TableCell>Date of Creation</TableCell>
                            <TableCell>Date of Assigning</TableCell>
                            <TableCell>Target Score</TableCell>
                            <TableCell sx={{ paddingX: 3 }}>List of Words</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedData.map((val, index) => (
                            <TableRow hover key={index}>
                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell>{new Date(val.createdAt).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>{new Date(val.date_of_assigning).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell>{val.target_score}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {val.list_of_words.map((word, wordIndex) => {
                                            const [wordText, wordScore] = Object.entries(word)[0];
                                            return (
                                                <Chip
                                                    key={wordIndex}
                                                    sx={{ backgroundColor: theme.palette.primary[800], color: 'white' }}
                                                    label={`${wordText}: ${wordScore}`}
                                                />
                                            );
                                        })}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                        <IconButton onClick={() => handleViewOpen(val)} color="primary" size="large" aria-label="view">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton onClick={() => Edit(val)} color="dark" size="large" aria-label="edit">
                                            <EditOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => Delete(val._id)} color="error" size="large" aria-label="delete">
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
            /> */}

            {/* <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <MainCard
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, lg: 450 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Delete Puzzle"
                    content={false}
                    secondary={
                        <IconButton onClick={handleClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Typography variant="body1" sx={{ fontWeight: '500', marginBottom: 2, textAlign: 'center' }}>
                            Are you sure you want to delete this puzzle?
                        </Typography>
                        <ButtonGroup
                            disableElevation
                            variant="contained"
                            aria-label="Disabled button group"
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Button onClick={handleClose} sx={{ margin: 1 }}>
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    handleClose();
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
                    title="Edit Puzzle"
                    content={false}
                    secondary={
                        <IconButton onClick={handleClose2} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            {' '}
                            <Formik
                                initialValues={existingPuzzle}
                                validationSchema={validationSchema}
                                onSubmit={UpdatePuzzle}
                                enableReinitialize
                            >
                                {({ values, isSubmitting, handleChange, touched, errors }) => (
                                    <Form>
                                        <Grid container spacing={2} justifyContent="center">
                                            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
                                                <Field
                                                    as={TextField}
                                                    fullWidth
                                                    label="Target Score"
                                                    name="target_score"
                                                    type="number"
                                                    value={values.target_score}
                                                    onChange={handleChange}
                                                    helperText={touched.target_score && errors.target_score ? errors.target_score : ''}
                                                    error={Boolean(touched.target_score && errors.target_score)}
                                                />
                                            </Grid>

                                            <FieldArray name="list_of_words">
                                                {({ remove, push }) => (
                                                    <>
                                                        {values.list_of_words.map((word, index) => (
                                                            <Grid
                                                                container
                                                                item
                                                                xs={12}
                                                                key={index}
                                                                spacing={2}
                                                                justifyContent="center"
                                                                alignItems="center"
                                                            >
                                                                <Grid item xs={5}>
                                                                    <Field
                                                                        as={TextField}
                                                                        fullWidth
                                                                        label={`Word ${index + 1}`}
                                                                        name={`list_of_words[${index}].word`}
                                                                        value={word.word}
                                                                        onChange={handleChange}
                                                                        error={
                                                                            touched.list_of_words &&
                                                                            touched.list_of_words[index] &&
                                                                            Boolean(
                                                                                errors.list_of_words &&
                                                                                    errors.list_of_words[index] &&
                                                                                    errors.list_of_words[index].word
                                                                            )
                                                                        }
                                                                        helperText={
                                                                            touched.list_of_words &&
                                                                            touched.list_of_words[index] &&
                                                                            errors.list_of_words &&
                                                                            errors.list_of_words[index] &&
                                                                            errors.list_of_words[index].word
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={5}>
                                                                    <Field
                                                                        as={TextField}
                                                                        fullWidth
                                                                        label="Score"
                                                                        name={`list_of_words[${index}].score`}
                                                                        type="number"
                                                                        value={word.score}
                                                                        onChange={handleChange}
                                                                        error={
                                                                            touched.list_of_words &&
                                                                            touched.list_of_words[index] &&
                                                                            Boolean(
                                                                                errors.list_of_words &&
                                                                                    errors.list_of_words[index] &&
                                                                                    errors.list_of_words[index].score
                                                                            )
                                                                        }
                                                                        helperText={
                                                                            touched.list_of_words &&
                                                                            touched.list_of_words[index] &&
                                                                            errors.list_of_words &&
                                                                            errors.list_of_words[index] &&
                                                                            errors.list_of_words[index].score
                                                                        }
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    {values.list_of_words.length > 1 && (
                                                                        <IconButton onClick={() => remove(index)} aria-label="delete">
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Button
                                                                type="button"
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => push({ word: '', score: '' })}
                                                            >
                                                                Add Word
                                                            </Button>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                                    Update Puzzle
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal>

            <Modal
                open={viewOpen}
                onClose={handleViewClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <MainCard
                    sx={{
                        position: 'absolute',
                        width: { xs: 280, lg: 450 },
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    title="Daily Puzzle"
                    content={false}
                    secondary={
                        <IconButton onClick={handleViewClose} size="large">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        {selectedPuzzle?.dailypuzzle?.map((row, rowIndex) => (
                            <PuzzleRow key={rowIndex} values={row} />
                        ))}
                    </CardContent>
                    <Divider />
                </MainCard>
            </Modal> */}
        </>
    );
};

export default DailyPuzzle;
