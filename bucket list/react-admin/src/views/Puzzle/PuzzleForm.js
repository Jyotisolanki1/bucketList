import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Grid, Container, IconButton, Typography } from '@mui/material';
import { openSnackbar } from 'store/slices/snackbar';
import { AddPuzzlesAPI, GetPuzzlesAPI } from 'store/slices/puzzle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';

const generateDailyPuzzle = () => {
    const alphabet = {
        A: 9,
        B: 2,
        C: 5,
        D: 4,
        E: 10,
        F: 2,
        G: 2,
        H: 3,
        I: 8,
        J: 1,
        K: 2,
        L: 5,
        M: 3,
        N: 8,
        O: 8,
        P: 3,
        Q: 1,
        R: 8,
        S: 6,
        T: 8,
        U: 5,
        V: 2,
        W: 2,
        X: 1,
        Y: 2,
        Z: 1,
        '*': 1
    };

    const puzzle = Array.from({ length: 7 }, () => Array(4).fill(''));

    for (let i = 0; i < 7; i += 1) {
        for (let j = 0; j < 4; j += 1) {
            const count = Object.values(alphabet).reduce((a, b) => a + b, 0);
            if (count > 0) {
                let random = Math.floor(Math.random() * count);
                let selectedLetter = '';
                Object.entries(alphabet).some(([key, value]) => {
                    random -= value;
                    if (random < 0) {
                        selectedLetter = key;
                        alphabet[key] -= 1;
                        return true;
                    }
                    return false;
                });
                puzzle[i][j] = selectedLetter;
            }
        }
    }
    return puzzle;
};

const PuzzleForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [puzzleError, setPuzzleError] = useState('');
    const [isChipClicked, setIsChipClicked] = useState(false);

    const validationSchema = Yup.object().shape({
        assigning_date: Yup.string().required('Date of Assigning is required'),
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

    const back = async () => {
        navigate('/daily-puzzle');
        await dispatch(GetPuzzlesAPI());
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const formattedDate = new Date(values.assigning_date)
            .toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
            .replace(/\//g, '-');

        const formattedPuzzle = {
            list_of_words: values.list_of_words.map((wordObj) => ({
                [wordObj.word]: wordObj.score
            }))
        };

        const puzzleToSubmit = {
            ...values,
            assigning_date: formattedDate,
            list_of_words: formattedPuzzle.list_of_words,
            dailypuzzle: values.dailypuzzle
        };

        const response = await dispatch(AddPuzzlesAPI(puzzleToSubmit));
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
                        color: 'error'
                    },
                    close: false
                })
            );
        }
        setSubmitting(false);
        back();
    };

    const handleChipClick = () => {
        setPuzzleError('Puzzle cannot be changed');
        setIsChipClicked(true);
    };

    return (
        <Formik
            initialValues={{
                assigning_date: '',
                target_score: '',
                dailypuzzle: generateDailyPuzzle(),
                list_of_words: [{ word: '', score: '' }]
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, handleBlur, isSubmitting, errors, touched }) => (
                <Form>
                    <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'white', mb: 3 }}>
                        <Container sx={{ display: 'flex', justifyContent: 'end', marginBottom: 2 }}>
                            <Button onClick={back} variant="contained">
                                Back
                            </Button>
                        </Container>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Date of Assigning"
                                    name="assigning_date"
                                    type="date"
                                    value={values.assigning_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.assigning_date && Boolean(errors.assigning_date)}
                                    helperText={touched.assigning_date && errors.assigning_date}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    InputProps={{
                                        inputProps: { style: { color: 'black' } }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    label="Target Score"
                                    name="target_score"
                                    type="number"
                                    value={values.target_score}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.target_score && Boolean(errors.target_score)}
                                    helperText={touched.target_score && errors.target_score}
                                />
                            </Grid>

                            <Typography sx={{ marginY: 2, fontWeight: 'bold' }}>Daily Puzzle</Typography>
                            {puzzleError && (
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
                                    <Typography variant="body2" color="error">
                                        {puzzleError}
                                    </Typography>
                                </Grid>
                            )}
                            <Grid container item xs={12} spacing={2} justifyContent="center">
                                {values.dailypuzzle.map((row, rowIndex) => (
                                    <Grid container item xs={12} key={rowIndex} spacing={2} justifyContent="center">
                                        {row.map((word, colIndex) => (
                                            <Grid item key={colIndex}>
                                                <TextField
                                                    sx={{
                                                        width: '60px',
                                                        height: '48px',
                                                        '& .MuiInputBase-root': {
                                                            height: '48px',
                                                            backgroundColor: isChipClicked ? 'red' : 'transparent'
                                                        }
                                                    }}
                                                    label={rowIndex * 4 + colIndex + 1}
                                                    value={word}
                                                    onClick={handleChipClick}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
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
                                                justifyContent="space-between"
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
                                                        onBlur={handleBlur}
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
                                                        onBlur={handleBlur}
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
                                    Add Puzzle
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default PuzzleForm;
