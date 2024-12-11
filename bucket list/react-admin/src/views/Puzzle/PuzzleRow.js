import React from 'react';
import { Box, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PuzzleRow = ({ values }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                width: '100%'
            }}
        >
            {values.map((value, index) => (
                <Chip
                    key={index}
                    label={value}
                    sx={{
                        borderRadius: '10%',
                        backgroundColor: theme.palette.primary[200],
                        padding: '8px',
                        fontSize: '1rem',
                        fontWeight: 500,
                        margin: '5px',
                        width: '60px',
                        height: '48px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '@media (max-width: 400px)': {
                            width: '30px',
                            height: '32px',
                            fontSize: '0.75rem',
                            padding: '4px',
                            margin: '2px'
                        }
                    }}
                />
            ))}
        </Box>
    );
};

export default PuzzleRow;
