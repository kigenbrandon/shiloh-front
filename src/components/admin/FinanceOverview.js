import React, { useMemo, useState } from 'react';
import { Container, Box, Paper, Typography, Avatar, Chip, LinearProgress, Stack, Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AccountBalance, ArrowDownward, ArrowUpward, Download, Payments, ShowChart, WarningAmber } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getDemoUser } from '../../demoData';

const data = [
    { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
    { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
    { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
    { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
    { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
];

const FinanceOverview = () => {
    const [period, setPeriod] = useState('This year');
    const transactions = useMemo(() => {
        const storedData = JSON.parse(localStorage.getItem('userDATA') || 'null');
        return storedData?.demo ? getDemoUser('admin').transactions : [];
    }, []);
    const exportTransactions = () => {
        const rows = [['Reference', 'Description', 'Status', 'Amount', 'Date'], ...transactions.map((transaction) => [transaction.id, transaction.description, transaction.status, transaction.amount, transaction.date])];
        const csv = rows.map((row) => row.map((value) => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        link.download = `shiloh-finance-${period.toLowerCase().replaceAll(' ', '-')}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };
    const revenue = data.reduce((sum, month) => sum + month.revenue, 0);
    const expenses = data.reduce((sum, month) => sum + month.expenses, 0);
    const profit = revenue - expenses;
    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            { label: 'Revenue', data: data.map(item => item.revenue), borderColor: '#5146e5', backgroundColor: 'rgba(81,70,229,.12)', fill: true, tension: .4, pointRadius: 3 },
            { label: 'Expenses', data: data.map(item => item.expenses), borderColor: '#f26b5e', backgroundColor: 'rgba(242,107,94,.06)', fill: true, tension: .4, pointRadius: 3 },
        ],
    };
    const chartOptions = { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 18 } } }, scales: { y: { beginAtZero: true, grid: { color: '#edf0f5' }, ticks: { callback: (value) => `$${value / 1000}k` } }, x: { grid: { display: false } } } };
    const metrics = [
        { label: 'Total revenue', value: `$${(revenue / 1000).toFixed(1)}k`, change: '+14.8%', icon: <ArrowUpward />, tone: 'indigo' },
        { label: 'Operating expenses', value: `$${(expenses / 1000).toFixed(1)}k`, change: '+6.2%', icon: <ArrowDownward />, tone: 'coral' },
        { label: 'Net position', value: `$${(profit / 1000).toFixed(1)}k`, change: profit >= 0 ? 'Positive' : 'Review', icon: <AccountBalance />, tone: 'mint' },
        { label: 'Collection rate', value: '86.4%', change: 'On target', icon: <Payments />, tone: 'gold' },
    ];
    return (
        <Container className="finance-page" maxWidth="xl">
            <Box className="finance-heading"><Box><Typography className="eyebrow">FINANCE CONTROL CENTER</Typography><Typography variant="h4" sx={{ mt: .5 }}>Financial overview</Typography><Typography color="text.secondary" sx={{ mt: .75 }}>Make confident decisions with a clear view of the college&apos;s financial health.</Typography></Box><Stack direction="row" spacing={1}><Select size="small" value={period} onChange={(event) => setPeriod(event.target.value)}><MenuItem value="This month">This month</MenuItem><MenuItem value="This quarter">This quarter</MenuItem><MenuItem value="This year">This year</MenuItem></Select><Button variant="contained" startIcon={<Download />} onClick={exportTransactions}>Export</Button></Stack></Box>
            <Box className="finance-metric-grid">{metrics.map((metric) => <Paper className={`finance-metric-card ${metric.tone}`} elevation={0} key={metric.label}><Avatar variant="rounded">{metric.icon}</Avatar><Box><Typography variant="h5">{metric.value}</Typography><Typography variant="body2" color="text.secondary">{metric.label}</Typography><Typography variant="caption" color={metric.tone === 'coral' ? 'warning.main' : 'success.main'}>{metric.change}</Typography></Box></Paper>)}</Box>
            <Box className="finance-main-grid"><Paper className="finance-panel finance-chart-panel" elevation={0}><Box className="finance-panel-heading"><Box><Typography variant="h6">Revenue and expenses</Typography><Typography variant="body2" color="text.secondary">Monthly cash flow performance</Typography></Box><Chip icon={<ShowChart />} label="Live trend" color="primary" size="small" /></Box><Box className="finance-chart"><Line data={chartData} options={chartOptions} /></Box></Paper><Paper className="finance-panel" elevation={0}><Box className="finance-panel-heading"><Box><Typography variant="h6">Budget health</Typography><Typography variant="body2" color="text.secondary">Monthly operating target</Typography></Box><WarningAmber color="warning" /></Box><Box className="budget-amount"><Typography variant="h3">72%</Typography><Typography color="text.secondary">of monthly goal collected</Typography></Box><LinearProgress variant="determinate" value={72} color="secondary" sx={{ height: 10, borderRadius: 8, mt: 2 }} /><Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}><Typography variant="caption">$18,000 collected</Typography><Typography variant="caption">$25,000 target</Typography></Stack><Box className="finance-category-list"><Box><span className="finance-category-dot tuition" /><Typography variant="body2">Tuition <strong>68%</strong></Typography></Box><Box><span className="finance-category-dot services" /><Typography variant="body2">Student services <strong>20%</strong></Typography></Box><Box><span className="finance-category-dot other" /><Typography variant="body2">Other <strong>12%</strong></Typography></Box></Box></Paper></Box>
            <Paper className="finance-panel" elevation={0}><Box className="finance-panel-heading"><Box><Typography variant="h6">Recent transactions</Typography><Typography variant="body2" color="text.secondary">Review the latest payment movement</Typography></Box><Button size="small">View all</Button></Box><TableContainer><Table className="finance-table"><TableHead><TableRow><TableCell>Reference</TableCell><TableCell>Description</TableCell><TableCell>Status</TableCell><TableCell align="right">Amount</TableCell><TableCell>Date</TableCell></TableRow></TableHead><TableBody>{transactions.length ? transactions.map((transaction) => <TableRow key={transaction.id}><TableCell><Typography fontWeight={800}>{transaction.id}</Typography></TableCell><TableCell>{transaction.description}</TableCell><TableCell><Chip size="small" label={transaction.status} color={transaction.status === 'Completed' ? 'success' : 'warning'} /></TableCell><TableCell align="right" sx={{ fontWeight: 800 }}>${Number(transaction.amount).toLocaleString()}</TableCell><TableCell>{transaction.date}</TableCell></TableRow>) : <TableRow><TableCell colSpan={5}>No transaction data available.</TableCell></TableRow>}</TableBody></Table></TableContainer></Paper>
        </Container>
    );
};

export default FinanceOverview;