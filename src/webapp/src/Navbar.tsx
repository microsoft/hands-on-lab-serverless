import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface NavBarOptions {
    onFileUpload: () => void;
}

export default function NavBar({onFileUpload}: NavBarOptions) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Serverless workshop demo
                    </Typography>
                    <Button color="inherit" onClick={onFileUpload}>Upload</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}