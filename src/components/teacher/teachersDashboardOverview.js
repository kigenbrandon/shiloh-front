import {
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, Skeleton, Divider,Avatar,Grid,Card,List,ListItem,ListItemText, Container } from "@mui/material";
import { Dashboard as DashboardIcon, Assignment as AssignmentIcon, School as SchoolIcon, Star as StarIcon, Group as GroupIcon, TrendingUp as TrendingUpIcon, Notifications as NotificationsIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { GrAchievement } from "react-icons/gr";
import { FaAward } from "react-icons/fa";
import axios from "axios";
import { getDemoUser } from "../../demoData";
import {Chip} from "@mui/material";
import { LinearProgress } from "@mui/material";

let renderStats = null;
let renderCourses = null;

// Sample stats for the teacher dashboard
const stats = [
  { label: "Courses Taught", count: 12, icon: <SchoolIcon /> },
  { label: "Assignments Graded", count: 50, icon: <AssignmentIcon /> },
  { label: "Awards Received", count: 3, icon: <StarIcon /> },
];

const TeacherDashboardOverview = () => {
  const [courses, setCourses] = useState([]);  // State to hold the fetched courses
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const baseUrl = process.env.BASE_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("userDATA") || "null");
        if (storedUser?.demo) {
          setCourses([
            "Foundations of Computer Science",
            "Creative Problem Solving",
            "Communication for Leaders",
          ]);
          setLoading(false);
          return;
        }
        setLoading(true);  // Set loading to true when fetching starts
        const response = await axios.get("https://shiloh-server-2t51.onrender.com/enrollments/courses"); // Replace with your actual API endpoint
        // Ensure courses is always an array
        const coursesData = Array.isArray(response.data.courses) ? response.data.courses : [];
        setCourses(coursesData);  // Update the state with the fetched courses
        setLoading(false);  // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);  // Set empty array in case of error
        setLoading(false);  // Set loading to false after error
      }
    };

    fetchCourses();  // Call fetchCourses when the component mounts
  }, []); 

  // Render Courses UI for Teachers
  renderCourses = () => (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: 1, pb: 2, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Courses Taught</Typography>
          <Button sx={{ color: "primary.main" }}>View All</Button>
        </Box>
        {loading ? (
          // Show skeleton loaders if data is loading
          [...Array(3)].map((_, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Box>
                <Skeleton width="200px" height={30} />
                <Skeleton width="150px" height={20} />
                <Skeleton width="100%" height={6} sx={{ mt: 1 }} />
              </Box>
              <Button sx={{ color: "primary.main" }}>Continue</Button>
            </Box>
          ))
        ) : (
          // Render actual courses after loading
          courses.length > 0 ? (
            courses.map((course, index) => (
              <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexDirection: "column" }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }} color="secondary">{course}</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>Progress: {Math.floor(Math.random() * 100)}%</Typography>
                  <Box sx={{ width: "100%", height: 6, backgroundColor: "#e0e0e0", mt: 1 }}>
                    <Box sx={{ width: `${Math.random() * 100}}%`, height: "100%", backgroundColor: "#388e3c" }} />
                  </Box>
                </Box>
                <Button sx={{ color: "primary.main" }}>Continue</Button>
              </Box>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "gray" }}>No courses available</Typography>
          )
        )}
      </Paper>
    </Box>
  );

  // Render stats UI for Teachers
  renderStats = () => (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", md: "row" } }}>
      {stats.map((stat, index) => (
        <Box key={index} sx={{ width: { xs: "100%", sm: "33%" }, padding: 3 }}>
          <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 3 }}>
            {stat.icon}
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>{loading ? <Skeleton width={50} /> : stat.count}</Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>{stat.label}</Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
  
  // Render rewards and certificates UI for Teachers
  const renderRewardAndCertificates = () => (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      {["Reward", "Certificates"].map((item, index) => (
        <Box key={index} sx={{ width: { xs: "100%", sm: "50%" }, padding: 3 }}>
          <Paper sx={{ padding: 3, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              {item === "Reward" ? <GrAchievement sx={{ marginRight: 1 }} /> : <FaAward sx={{ marginRight: 1 }} />}
              {item}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: loading ? "#e0e0e0" : "#388e3c",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StarIcon />
                </Box>
              ))}
            </Box>
            <Button sx={{ mt: 2 }} color="primary">View All</Button>
          </Paper>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      {renderStats()}
      {renderRewardAndCertificates()}
      {renderCourses()}
    </>
  );
};


const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch teacher data
    axios
    .get("/api/teacher-dashboard")
    .then((response) => {
      setTeacher(response.data.teacher);
      setLoading(false);
    })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
        setLoading(false);
      });
    }, []);
    
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (!teacher) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Failed to load teacher data.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80 }}>
              <SchoolIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4" fontWeight="bold">
              {teacher.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Subject: {teacher.subject}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hired on: {new Date(teacher.hire_date).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Enrollments
        </Typography>
        {teacher.enrollments.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No enrollments found.
          </Typography>
        ) : (
          <Card sx={{ p: 2, boxShadow: 2 }}>
            <List>
              {teacher.enrollments.map((enrollment, index) => (
                <React.Fragment key={enrollment.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Student: ${enrollment.student_name}`}
                      secondary={`Enrolled on: ${new Date(enrollment.enrollment_date).toLocaleDateString()}`}
                    />
                  </ListItem>
                  {index < teacher.enrollments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        )}
      </Box>
    </Container>
  );
};


const TeacherDash = () => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    // Fetch teacher data from localStorage
    const teacherData = localStorage.getItem("userDATA");

    if (teacherData) {
      try {
        const parsedData = JSON.parse(teacherData);
        setTeacher({
          ...(parsedData.teacher || {}),
          enrollments: parsedData.teacher?.enrollments || [],
          students: parsedData.teacher?.students || [],
        });
      } catch (error) {
        console.error("Error parsing teacher data:", error);
      }
    }
  }, []);

  const dashboardTeacher = teacher || getDemoUser("teacher").teacher;
  const students = dashboardTeacher.students || [];
  const averageProgress = students.length ? Math.round(students.reduce((total, student) => total + (student.progress || 0), 0) / students.length) : 0;
  const courses = [...new Set(students.map((student) => student.course).filter(Boolean))];
  const reviewCount = dashboardTeacher.notifications?.length || 2;

  return (
    <Container className="teacher-dashboard-page" maxWidth="lg">
      <Box className="teacher-dashboard-hero"><Box><Typography className="eyebrow">TEACHER COMMAND CENTER</Typography><Typography variant="h4" sx={{ mt: .5 }}>Good morning, {dashboardTeacher.name || "Teacher"}</Typography><Typography sx={{ color: "rgba(255,255,255,.72)", mt: .75 }}>Your learners are moving forward. Here&apos;s where to focus today.</Typography></Box><Avatar className="teacher-hero-avatar"><SchoolIcon /></Avatar></Box>
      <Box className="teacher-dashboard-metrics"><Paper elevation={0}><Avatar><GroupIcon /></Avatar><Box><Typography variant="h5">{students.length}</Typography><Typography variant="body2" color="text.secondary">Learners supported</Typography></Box></Paper><Paper elevation={0}><Avatar><SchoolIcon /></Avatar><Box><Typography variant="h5">{courses.length}</Typography><Typography variant="body2" color="text.secondary">Active courses</Typography></Box></Paper><Paper elevation={0}><Avatar><TrendingUpIcon /></Avatar><Box><Typography variant="h5">{averageProgress}%</Typography><Typography variant="body2" color="text.secondary">Average progress</Typography></Box></Paper><Paper elevation={0}><Avatar><AssignmentIcon /></Avatar><Box><Typography variant="h5">{reviewCount}</Typography><Typography variant="body2" color="text.secondary">Items to review</Typography></Box></Paper></Box>
      <Box className="teacher-dashboard-grid"><Paper className="teacher-dashboard-panel" elevation={0}><Box className="teacher-panel-heading"><Box><Typography variant="h6">Learner momentum</Typography><Typography variant="body2" color="text.secondary">Progress across your active learners</Typography></Box><Chip label="This week" size="small" color="primary" /></Box>{students.map((student) => <Box className="teacher-learner-row" key={student.id}><Avatar>{student.student_name?.[0] || "L"}</Avatar><Box sx={{ flex: 1, minWidth: 0 }}><Box className="teacher-learner-meta"><Typography fontWeight={800} noWrap>{student.student_name}</Typography><Typography variant="caption" color="text.secondary">{student.lastActive}</Typography></Box><Typography variant="body2" color="text.secondary">{student.course}</Typography><LinearProgress value={student.progress || 0} variant="determinate" /></Box><Typography fontWeight={800} color="primary.main">{student.progress}%</Typography></Box>)}</Paper><Paper className="teacher-dashboard-panel teacher-review-panel" elevation={0}><Box className="teacher-panel-heading"><Box><Typography variant="h6">Your focus today</Typography><Typography variant="body2" color="text.secondary">Keep the feedback loop moving</Typography></Box><FaAward color="#e7a33e" /></Box><Box className="teacher-focus-item"><Avatar><AssignmentIcon /></Avatar><Box><Typography fontWeight={800}>Review submissions</Typography><Typography variant="body2" color="text.secondary">2 assignments are waiting for feedback.</Typography></Box></Box><Box className="teacher-focus-item"><Avatar><NotificationsIcon /></Avatar><Box><Typography fontWeight={800}>Check notifications</Typography><Typography variant="body2" color="text.secondary">A learner has asked for course guidance.</Typography></Box></Box><Box className="teacher-focus-item"><Avatar><StarIcon /></Avatar><Box><Typography fontWeight={800}>Celebrate a win</Typography><Typography variant="body2" color="text.secondary">Amina is leading the current progress curve.</Typography></Box></Box></Paper></Box>
      <Paper className="teacher-dashboard-panel" elevation={0}><Box className="teacher-panel-heading"><Box><Typography variant="h6">Course pulse</Typography><Typography variant="body2" color="text.secondary">A quick view of your teaching portfolio</Typography></Box><Button size="small" endIcon={<ArrowForwardIcon />}>View courses</Button></Box><Box className="teacher-course-pulse">{courses.map((course, index) => <Box key={course}><Box className="teacher-course-pulse-heading"><Typography fontWeight={800}>{course}</Typography><Typography variant="body2" color="text.secondary">{[68, 51, 84][index % 3]}%</Typography></Box><LinearProgress variant="determinate" value={[68, 51, 84][index % 3]} /></Box>)}</Box></Paper>
    </Container>
  );
};

export {renderCourses,renderStats,TeacherDash};

export default TeacherDashboard;