import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import backimage from '../assets/subject-access-requests.jpeg';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { TextField, Button, Grid, Typography, Snackbar, SnackbarContent } from '@mui/material';

const defaultTheme = createTheme();

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});

const ForgotPassword = () => {
    const theme = useTheme(); // Access the theme object
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const res = await axios.post('https://url-shortener-ub92.onrender.com/api/auth/forgot-password', values);
            setSnackbar({ open: true, message: res.data.msg, severity: 'success' });
            resetForm();
        } catch (error) {
            setSnackbar({ open: true, message: error.response.data.msg, severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid
                sx={{
                    backgroundImage: `url(${backimage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    borderStartStartRadius: '5px',
                    borderEndStartRadius: '5px',
                    backgroundPosition: 'center',
                    padding: '6em 0',
                    position: 'relative', // Add position relative to correctly position the overlay
                }}
                component={Paper}
                elevation={3}
                container
                justifyContent="center"
            >
                <CssBaseline />
                {/* Overlay for translucent background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#00000082',
                        zIndex: 0,
                    }}
                />
                <Grid style={{ zIndex: '1' }} item xs={12} sm={8} md={10}>
                    <Typography variant="h5" style={{ color: '#fff' }} align="center" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.common.white,
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: theme.palette.common.white,
                                            },
                                            '& .MuiOutlinedInput-input': {
                                                color: theme.palette.common.white,
                                            },
                                        },
                                    }}
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email ? errors.email : null}
                                />
                                <Button
                                    style={{ maxWidth: '60%', marginTop: '1em' }}
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    size="large"
                                >
                                    Send Reset Link
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
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
        </ThemeProvider>
    );
};

export default ForgotPassword;
