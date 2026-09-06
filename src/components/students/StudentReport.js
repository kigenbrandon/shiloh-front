import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Skeleton, Badge, Avatar, Button, Paper, styled, Chip, LinearProgress, Stack } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip } from 'chart.js';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Download, TrendingUp, Assessment, AutoGraph, AccessTime, CheckCircle, ArrowUpward } from '@mui/icons-material';
import { getDemoUser } from '../../demoData';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip);

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const StudentReport = () => {
  const [student, setStudent] = useState(null);  
  const [courses, setCourses] = useState(null);  
  const [performanceData, setPerformanceData] = useState(null);  
  const [report, setReport] = useState(null);

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userDATA') || 'null');
    const reportData = userData?.demo ? getDemoUser('student') : userData;

    if (reportData && reportData.student) {
      setStudent(reportData.student);
      setCourses(reportData.student.enrollments || []);
      setReport(reportData.report || { attendance: 0, lessonsCompleted: 0, averageGrade: 0, weeklyMinutes: 0 });
      
      
      setPerformanceData({
        labels: reportData.report?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Grades Over Time',
          data: reportData.report?.grades || [75, 80, 85, 90, 95],
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        }],
      });
    }
  }, []);

  const downloadReport = () => {
    window.print();
  };

  const averageProgress = courses?.length ? Math.round(courses.reduce((total, course) => total + (course.progress || 0), 0) / courses.length) : 0;
  const strongestCourse = courses?.length ? [...courses].sort((a, b) => (b.progress || 0) - (a.progress || 0))[0] : null;
  const nextFocus = courses?.length ? [...courses].sort((a, b) => (a.progress || 0) - (b.progress || 0))[0] : null;

  return (
    <Container className="report-page" maxWidth="lg">
      <Box className="report-header">
        {student ? (
          <>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt={student.name} src="/static/images/avatar/1.jpg" />
            </StyledBadge>
            <Box sx={{ flex: 1, ml: 2 }}>
              <Typography className="eyebrow">LEARNER PROGRESS REPORT</Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>{student.name || `${student.first_name || ''} ${student.last_name || ''}`}</Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>{student.student_id} · {student.email || 'Student account'}</Typography>
            </Box>
          </>
        ) : (
          <Skeleton variant="circular" width={100} height={100} />
        )}
        <Button variant="contained" startIcon={<Download />} onClick={downloadReport} className="no-print">Download PDF</Button>
      </Box>

      <Box className="report-metric-grid">
        {[['Overall progress', `${averageProgress}%`, <AutoGraph />], ['Average grade', `${report?.averageGrade || 0}%`, <Assessment />], ['Attendance', `${report?.attendance || 0}%`, <CheckCircle />], ['Study time', `${report?.weeklyMinutes || 0} min`, <AccessTime />]].map(([label, value, icon]) => <Paper className="report-metric-card" elevation={0} key={label}><Avatar variant="rounded">{icon}</Avatar><Box><Typography variant="h5">{value}</Typography><Typography variant="body2" color="text.secondary">{label}</Typography></Box></Paper>)}
      </Box>

      <Box className="report-main-grid">
        <Paper className="report-chart-card" elevation={0}><Box className="report-card-heading"><Box><Typography variant="h6">Performance trend</Typography><Typography variant="body2" color="text.secondary">Your grade movement over time</Typography></Box><Chip icon={<ArrowUpward />} label="Improving" color="success" size="small" /></Box>{performanceData ? <Bar data={performanceData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 100, ticks: { callback: (value) => `${value}%` } } } }} /> : <Skeleton variant="rounded" height={280} />}</Paper>
        <Paper className="report-insight-card" elevation={0}><Typography variant="h6">Your next best move</Typography><Typography color="text.secondary" sx={{ mt: 0.75 }}>A small focus area can unlock your next milestone.</Typography><Box className="report-focus"><TrendingUp /><Box><Typography fontWeight={800}>{nextFocus?.courses || 'Keep exploring your courses'}</Typography><Typography variant="body2" color="text.secondary">{nextFocus ? `${nextFocus.progress || 0}% complete · build your next lesson habit` : 'Start a course to receive personalized guidance.'}</Typography></Box></Box><Divider sx={{ my: 2 }} /><Typography variant="body2" color="text.secondary">Your strongest path</Typography><Typography fontWeight={800} sx={{ mt: 0.5 }}>{strongestCourse?.courses || 'Your learning path is waiting'}</Typography><LinearProgress value={strongestCourse?.progress || 0} variant="determinate" sx={{ mt: 1 }} /></Paper>
      </Box>

      <Box className="report-section-heading"><Box><Typography variant="h5">Course performance</Typography><Typography color="text.secondary">See how each part of your path is moving.</Typography></Box><Chip label={`${courses?.length || 0} active courses`} /></Box>
      <Box className="report-course-list">{courses ? courses.map((course, index) => <Accordion className="report-course" key={course.id || index}><AccordionSummary expandIcon={<ExpandMoreIcon />}><Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}><Avatar variant="rounded" className={`report-course-avatar avatar-${index % 3}`}><Assessment /></Avatar><Box sx={{ flex: 1, minWidth: 0 }}><Typography fontWeight={800} noWrap>{course.courses}</Typography><Typography variant="body2" color="text.secondary">{course.status || 'In progress'} · {course.grade || 'Awaiting grade'}</Typography></Box><Typography fontWeight={800} color="primary.main">{course.progress || 0}%</Typography></Box></AccordionSummary><AccordionDetails><LinearProgress value={course.progress || 0} variant="determinate" sx={{ mb: 1.5 }} /><Stack direction="row" spacing={1}><Chip size="small" label={`${course.progress || 0}% complete`} /><Chip size="small" label={course.grade || 'Not graded'} variant="outlined" /></Stack></AccordionDetails></Accordion>) : <Skeleton variant="rounded" height={90} />}</Box>
    </Container>
  );
};

export default StudentReport;
