import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from './context/AuthContext.js';
import { login as userLogin } from '../api.js';
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const baseUrl = process.env.REACT_APP_BASE_URL;  // Correct access to environment variable
  const theme = useTheme(); // Access the current theme
  
  console.log('Base URL:', baseUrl);  // Log to ensure it is loaded

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`https://shiloh-server.onrender.com/users/login`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const { access_token, username, email, role, refresh_token } = response.data;
          localStorage.setItem('userDATA',JSON.stringify(response.data))

          if (access_token && username && email && role && refresh_token) {
            login(access_token, refresh_token, { username, role, email });
            if (role === 'student') navigate('/enrollment');
            if (role === 'admin') navigate('/admin');
          } else {
            setErrorMessage('Invalid login data received.');
          }
        }
      } catch (error) {
        const errorMsg = error.response
          ? error.response.data.error || 'Error during login. Please try again.'
          : 'Network error. Please try again later.';

        setErrorMessage(errorMsg);
        console.error('Login failed:', errorMsg);
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        width="100%"
        maxWidth="400px"
        p={4}
        borderRadius={2}
        boxShadow={3}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          color="primary" // Use the primary color from the theme
        >
          Login
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <TextField
          fullWidth
          label="email"
          name="email"
          variant="outlined"
          margin="normal"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.email)}
          helperText={formik.touched.username && formik.errors.email}
          color="secondary"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          color="secondary"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
