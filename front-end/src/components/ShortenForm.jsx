import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Snackbar, SnackbarContent } from '@mui/material';
import axios from 'axios';

const ShortenForm = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const handleShorten = async () => {
        try {
            const response = await axios.post('https://url-shortener-ub92.onrender.com/api/url/shorten', { originalUrl });
            setShortenedUrl(response.data.shortUrl);
            setSnackbar({ open: true, message: 'URL shortened successfully!', severity: 'success' });
            setError('');
        } catch (error) {
            setError('Failed to shorten URL');
            setSnackbar({ open: true, message: 'Failed to shorten URL', severity: 'error' });
            console.error('Error shortening URL:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Grid style={{ width:'100%' }} container alignItems="center" justifyContent="center">
            <Paper elevation={3} style={{ padding: '20px', width: '100%', borderStartEndRadius: '0px', borderStartStartRadius: '0px' }}>
                <Grid item xs={12} sm={8} md={12}>
                    <TextField
                        fullWidth
                        label="Enter URL to shorten"
                        variant="outlined"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                    <Button style={{ marginTop: '1em' }} variant="contained" color="primary" onClick={handleShorten}>
                        Shorten
                    </Button>
                </Grid>
                {shortenedUrl && (
                    <Grid style={{ marginTop: '1.5em' }} item xs={12}>
                        <TextField
                            fullWidth
                            label="Shortened URL"
                            variant="outlined"
                            value={shortenedUrl}
                            disabled
                        />
                    </Grid>
                )}
                {error && (
                    <Grid item xs={12}>
                        <p>{error}</p>
                    </Grid>
                )}
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <SnackbarContent
                    message={snackbar.message}
                    style={{ backgroundColor: snackbar.severity === 'success' ? 'green' : 'red' }}
                />
            </Snackbar>
        </Grid>
    );
};

export default ShortenForm;
