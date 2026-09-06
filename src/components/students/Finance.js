import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Divider, CircularProgress, Snackbar } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { getDemoUser } from '../../demoData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample financial data for the chart
const financialData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Outstanding Balance',
      data: [200, 150, 180, 120, 100, 60],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
    },
  ],
};

const PaymentSection = ({ balance, onPaymentSuccess, onPaymentError }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6">Pay Your Fees</Typography>
      <Divider sx={{ marginY: 2 }} />
      <PayPalScriptProvider options={{ "client-id": "sb" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: balance.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            actions.order.capture().then((details) => onPaymentSuccess(details, data));
          }}
          onError={onPaymentError}
        />
      </PayPalScriptProvider>
    </Paper>
  );
};

const FinancialDashboard = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Simulate fetching user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const storedData = JSON.parse(localStorage.getItem('userDATA') || 'null');
    
    // Handle case if no user data is in localStorage
    if (!userData) {
      setSnackbarMessage('No user data found.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    // Example of fetching student financial data
    // This can be replaced with an actual API call
    setTimeout(() => {
      const payments = storedData?.demo ? getDemoUser('student').payments : null;
      setStudentInfo({
        name: userData.username || 'Unknown',
        studentId: storedData?.student?.student_id || userData.studentId || '0',
        balance: payments?.balance || 1000,
        totalPaid: payments?.totalPaid || 200,
        totalDue: payments?.totalDue || 800,
        nextDue: payments?.nextDue,
        invoiceNumber: payments?.invoiceNumber,
        history: payments?.history || [],
      });
      setLoading(false);
    }, 1000); // Simulate API call delay
  }, []);

  const handlePaymentSuccess = (details, data) => {
    console.log('Payment Success:', details);
    setSnackbarMessage('Payment Successful!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handlePaymentError = (err) => {
    console.error('Payment Error:', err);
    setSnackbarMessage('Payment failed. Please try again.');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
          <Typography variant="h4" gutterBottom color="secondary">
            Welcome, {studentInfo.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Invoice {studentInfo.invoiceNumber || 'available in your account'} · Next payment due {studentInfo.nextDue || 'soon'}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
            {/* Financial Overview */}
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Student ID</Typography>
                <Typography variant="body1">{studentInfo.studentId}</Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Total Balance</Typography>
                <Typography variant="body1">${studentInfo.balance}</Typography>
              </Paper>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6">Total Paid</Typography>
                <Typography variant="body1">${studentInfo.totalPaid}</Typography>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
            <Box sx={{ flex: { xs: 1, sm: 2 } }}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Financial Overview</Typography>
                <Line data={financialData} options={{ responsive: true }} />
              </Paper>
            </Box>

            <Box sx={{ flex: { xs: 1, sm: 1 } }}>
              <PaymentSection
                balance={studentInfo.balance}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </Box>
          </Box>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Payment history</Typography>
            {studentInfo.history?.length ? studentInfo.history.map((payment) => (
              <Box key={payment.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box><Typography fontWeight={700}>{payment.description}</Typography><Typography variant="body2" color="text.secondary">{new Date(payment.date).toLocaleDateString()}</Typography></Box>
                <Typography fontWeight={800}>${payment.amount} · {payment.status}</Typography>
              </Box>
            )) : <Typography color="text.secondary">No payment history available.</Typography>}
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default FinancialDashboard;
