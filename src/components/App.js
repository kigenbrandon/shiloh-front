import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Admin from './admin/Admin';
import StudentDashboard from './students/StudentDashboard';
import { StudentRegistration } from './students/StudentRegistration';
import Enrollment from './enrollment/Enrollment';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import LandingPage from './Landing';
import { ProtectedRoute } from './context/AuthContext';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#424242',
      },
      success: {
        main: '#4caf50',
      },
      info: {
        main: '#03a9f4',
      },
      warning: {
        main: '#ff9800',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/registration"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentRegistration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enrollment"
            element={
              <ProtectedRoute requiredRole="student">
                <Enrollment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
