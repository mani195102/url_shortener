import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const ResetPassword = () => {
    const { id, token } = useParams();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const { password } = values;
        try {
            const response = await axios.post(`https://url-shortener-ub92.onrender.com/api/auth/reset_password/${id}/${token}`, { password });
            setSnackbar({ open: true, message: response.data.msg, severity: 'success' });
            navigate('/');
        } catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.msg || 'Server error', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={12}>
                <Paper elevation={3} style={{ padding: '20px', borderRadius: '0px' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Reset Password
                    </Typography>
                    <Formik
                        initialValues={{ password: '' }}
                        validationSchema={ResetPasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, handleChange, handleBlur }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="password"
                                    type="password"
                                    label="New Password"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.password && touched.password}
                                    helperText={errors.password && touched.password && errors.password}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: '20px', maxWidth: '170px' }}
                                >
                                    Reset Password
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Grid>
    );
};

export default ResetPassword;
