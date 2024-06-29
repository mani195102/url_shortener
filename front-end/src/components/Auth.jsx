import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, Button, Grid, Typography, Link as MuiLink, Snackbar, SnackbarContent } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import backimage from '../assets/subject-access-requests.jpeg';

const defaultTheme = createTheme();

const AuthSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
});

const Auth = ({ type }) => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });

    const handleSubmit = async (values, { resetForm }) => {
        const url = type === 'login' ? 'https://url-shortener-ub92.onrender.com/api/auth/login' : 'https://url-shortener-ub92.onrender.com/api/auth/register';
        try {
            const res = await axios.post(url, values);
            setSnackbar({ open: true, message: type === 'login' ? 'Logged in successfully' : 'Registered successfully', severity: 'success' });
            resetForm();
            if (type === 'login') {
                setTimeout(() => navigate('/shortenForm'), 2000); // Navigate to dashboard after 2 seconds
            }
            else {
                setTimeout(() => navigate('/'), 2000); // Navigate to login after 2 seconds
            }
        } catch (error) {
            setSnackbar({ open: true, message: error.response.data.msg, severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid component={Paper} elevation={3} container sx={{ width: "740px", maxWidth: '100%', borderStartEndRadius: '0px', }} justifyContent="center">
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={5}
                    sx={{
                        backgroundImage: `url(${backimage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        borderEndStartRadius: '5px',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid style={{ padding: '3em 1.2em' }} item xs={12} sm={8} md={7} >
                    <Typography sx={{ marginBottom: 4 }} variant="h4" align="center" gutterBottom>
                        {type === 'login' ? 'Login' : 'Register'}
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: '', firstname: '', lastname: '' }}
                        validationSchema={AuthSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {type === 'register' && (
                                    <>
                                        <Field
                                            as={TextField}
                                            name="firstname"
                                            label="First Name"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                            error={errors.firstname && touched.firstname}
                                            helperText={errors.firstname && touched.firstname && errors.firstname}
                                        />
                                        <Field
                                            as={TextField}
                                            name="lastname"
                                            label="Last Name"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                            error={errors.lastname && touched.lastname}
                                            helperText={errors.lastname && touched.lastname && errors.lastname}
                                        />
                                    </>
                                )}
                                <Field
                                    as={TextField}
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    error={errors.email && touched.email}
                                    helperText={errors.email && touched.email && errors.email}
                                />
                                <Field
                                    as={TextField}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                    error={errors.password && touched.password}
                                    helperText={errors.password && touched.password && errors.password}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    sx={{ marginTop: 2 }}
                                    style={{ maxWidth: '140px' }}
                                >
                                    {type === 'login' ? 'Login' : 'Register'}
                                </Button>
                                <Grid style={{ marginTop: '1.4em' }} container>
                                    {type === 'login' && (
                                        <Grid item xs>
                                            <MuiLink component={Link} to="/forgot-password" variant="body1">
                                                Forgot password?
                                            </MuiLink>
                                        </Grid>
                                    )}
                                    {type === 'login' && (
                                        <Grid item>
                                            <MuiLink component={Link} to="/register" variant="body1">
                                                {"Sign Up"}
                                            </MuiLink>
                                        </Grid>
                                    )}
                                </Grid>
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

export default Auth;