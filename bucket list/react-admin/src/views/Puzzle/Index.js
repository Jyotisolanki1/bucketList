import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';

// project imports
import DailyPuzzle from './DailyPuzzle';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| Puzzle ||============================== //

const Index = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    // return (
    //     <>
    //         <MainCard
    //             title="Daily Puzzles"
    //             secondary={
    //                 <Button variant="contained" onClick={() => navigate('/puzzle/PuzzleForm')}>
    //                     Add Puzzle
    //                 </Button>
    //             }
    //             content={false}
    //         >
    //             <DailyPuzzle />
    //         </MainCard>
    //     </>
    // );
};

export default Index;
