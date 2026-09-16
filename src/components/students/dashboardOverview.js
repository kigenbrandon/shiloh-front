import React, { useEffect, useMemo, useState } from "react";
import { Box, Paper, Typography, Button, Skeleton, Avatar, LinearProgress, Chip, Stack } from "@mui/material";
import { ArrowForward, Assignment, AssignmentTurnedIn, CheckCircle, EmojiEvents, EventAvailable, HealthAndSafety, MenuBook, PlayArrow, Schedule, Quiz, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StudentdashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const data = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("userDATA")) || {};
    } catch (error) {
      return {};
    }
  }, []);
  const student = data.student || {};
  const enrollments = Array.isArray(student.enrollments) ? student.enrollments : [];
  const username = data.username || student.username || "Learner";
  const firstName = username.split(" ")[0];
  const totalProgress = enrollments.length ? Math.round(enrollments.reduce((sum, enrollment) => sum + (enrollment.progress || 0), 0) / enrollments.length) : 0;
  const initial = username.charAt(0).toUpperCase();
  const assignments = Array.isArray(data.assignments) ? data.assignments : [];
  const quizzes = Array.isArray(data.quizzes) ? data.quizzes : [];
  const completedAssignments = assignments.filter((assignment) => assignment.status === "Submitted").length;
  const outstandingAssignments = assignments.filter((assignment) => assignment.status !== "Submitted").length;
  const nextDeadline = assignments.find((assignment) => assignment.status !== "Submitted")?.dueDate;
  const focusMinutes = 32;
  const completedMinutes = 24;
  const activities = [
    { icon: <AssignmentTurnedIn />, title: "Review your submitted coursework", meta: "Assignments · Academic progress", tone: "#4fbf9f" },
    { icon: <Quiz />, title: "Complete your next assessment", meta: "Quizzes · Knowledge check", tone: "#5146e5" },
    { icon: <EventAvailable />, title: "Check your timetable", meta: "Classes · Practicum and study sessions", tone: "#e7a33e" },
  ];

  const handleDashboardAction = (section) => {
    navigate('/student');

    const sectionIdMap = {
      continue: 'continue-learning',
      momentum: 'momentum-panel',
      recommendations: 'recommendations-panel',
      history: 'activity-panel',
      goal: 'goal-panel',
    };

    const targetId = sectionIdMap[section];
    if (!targetId) return;

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Simulate a loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="learning-dashboard">
      <Box className="dashboard-heading">
        <Box>
          <Typography className="eyebrow">SHILOH COLLEGE · STUDENT PORTAL</Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>Good morning, {firstName} <span aria-hidden="true">👋</span></Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>Your courses, assessments, timetable, and student services in one place.</Typography>
        </Box>
        <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48, fontWeight: 800 }}>{initial}</Avatar>
      </Box>

      <Paper className="learning-hero" elevation={0}>
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 470 }}>
          <Chip label="CURRENT PROGRAM" size="small" sx={{ bgcolor: "rgba(255,255,255,.16)", color: "white", fontWeight: 800, letterSpacing: 1 }} />
          <Typography variant="h4" sx={{ color: "white", mt: 2 }}>{enrollments[0]?.courses || "Your next breakthrough is one lesson away."}</Typography>
          <Typography sx={{ color: "rgba(255,255,255,.76)", mt: 1 }}>Continue your academic pathway and build the practical skills to serve and lead.</Typography>
          <Button variant="contained" onClick={() => handleDashboardAction('continue')} endIcon={<ArrowForward />} sx={{ mt: 3, bgcolor: "white", color: "#5146e5", '&:hover': { bgcolor: '#f2f1ff' } }}>Open coursework</Button>
        </Box>
        <Box className="hero-orbit" aria-hidden="true"><MenuBook /></Box>
      </Paper>

      <Box className="metric-grid">
          {[
          { label: "Active programs", value: enrollments.length, icon: <MenuBook />, color: "#5146e5" },
          { label: "Assignments to submit", value: outstandingAssignments, icon: <Assignment />, color: "#f26b5e" },
          { label: "Quizzes available", value: quizzes.length, icon: <Quiz />, color: "#e7a33e" },
          { label: "Academic progress", value: `${totalProgress}%`, icon: <CheckCircle />, color: "#4fbf9f" },
        ].map((metric) => (
          <Paper key={metric.label} className="metric-card" elevation={0}>
            <Avatar sx={{ bgcolor: `${metric.color}18`, color: metric.color }} variant="rounded">{metric.icon}</Avatar>
            <Box sx={{ minWidth: 0 }}><Typography variant="h6">{loading ? <Skeleton width={58} /> : metric.value}</Typography><Typography variant="body2" color="text.secondary">{metric.label}</Typography></Box>
          </Paper>
        ))}
      </Box>

      <Box className="dashboard-columns">
        <Paper className="content-panel" elevation={0}>
          <Box id="continue-learning" className="panel-heading"><Box><Typography variant="h6">Current coursework</Typography><Typography variant="body2" color="text.secondary">Your enrolled academic pathways</Typography></Box><Button size="small" onClick={() => handleDashboardAction('continue')} endIcon={<ArrowForward />}>View courses</Button></Box>
            {loading ? <Skeleton variant="rounded" height={145} /> : enrollments.length ? enrollments.slice(0, 2).map((enrollment, index) => (
            <Box className="course-row" key={`${enrollment.courses}-${index}`}>
              <Avatar variant="rounded" sx={{ bgcolor: index ? "#fff0ed" : "#eeedff", color: index ? "#f26b5e" : "#5146e5" }}><MenuBook /></Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}><Typography fontWeight={800} noWrap>{enrollment.courses || "Untitled program"}</Typography><Typography variant="body2" color="text.secondary">Academic pathway {index + 1} · {enrollment.progress || 0}% complete</Typography><LinearProgress variant="determinate" value={enrollment.progress || 0} sx={{ mt: 1.5 }} /></Box>
              <Button aria-label={`Open ${enrollment.courses || "program"}`} onClick={() => handleDashboardAction('continue')} variant="contained" size="small" startIcon={<PlayArrow />}>Open</Button>
            </Box>
          )) : <Box className="empty-state"><MenuBook /><Typography fontWeight={700}>Your academic pathway starts here</Typography><Typography variant="body2" color="text.secondary">Explore a Shiloh program to begin your studies.</Typography></Box>}
        </Paper>

        <Paper id="momentum-panel" className="content-panel" elevation={0}>
          <Box className="panel-heading"><Box><Typography variant="h6">Academic standing</Typography><Typography variant="body2" color="text.secondary">Your progress across enrolled programs</Typography></Box><EmojiEvents sx={{ color: "#e7a33e" }} /></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, my: 2 }}><Box className="progress-ring"><Typography variant="h5">{totalProgress}%</Typography></Box><Box><Typography fontWeight={800}>Keep your pathway moving</Typography><Typography variant="body2" color="text.secondary">Submit outstanding work and stay current with your timetable.</Typography></Box></Box>
          <Stack direction="row" spacing={1}><Chip icon={<Assignment />} label={`${outstandingAssignments} to submit`} /><Chip icon={<School />} label="In good standing" /></Stack>
        </Paper>
      </Box>

      <Paper id="recommendations-panel" className="content-panel" elevation={0}>
        <Box className="panel-heading"><Box><Typography variant="h6">Student services</Typography><Typography variant="body2" color="text.secondary">Useful support for your academic journey</Typography></Box><Button size="small" onClick={() => handleDashboardAction('recommendations')} endIcon={<ArrowForward />}>Explore</Button></Box>
        <Box className="recommendation-grid">
          {[{ title: "Academic timetable", meta: "Classes, events, and practicum sessions", tone: "#5146e5", icon: <Schedule /> }, { title: "Library resources", meta: "Books and materials for your courses", tone: "#4fbf9f", icon: <MenuBook /> }, { title: "Health care pathway", meta: "Practical preparation for community care", tone: "#f26b5e", icon: <HealthAndSafety /> }].map((item) => <Box className="recommendation" key={item.title}><Box className="recommendation-mark" sx={{ bgcolor: item.tone }}>{item.icon}</Box><Typography fontWeight={800}>{item.title}</Typography><Typography variant="body2" color="text.secondary">{item.meta}</Typography></Box>)}
        </Box>
      </Paper>

      <Box className="dashboard-columns dashboard-lower-grid">
        <Paper id="goal-panel" className="content-panel goal-panel" elevation={0}>
          <Box className="panel-heading"><Box><Typography variant="h6">Academic focus</Typography><Typography variant="body2" color="text.secondary">A simple plan for today</Typography></Box><Schedule sx={{ color: "#f26b5e" }} /></Box>
          <Box className="goal-progress-row"><Box className="goal-ring"><Typography variant="h5">{completedMinutes}<Typography component="span" variant="body2">/{focusMinutes}m</Typography></Typography></Box><Box sx={{ flex: 1 }}><Typography fontWeight={800}>{nextDeadline ? `Next deadline: ${nextDeadline}` : "No upcoming deadline"}</Typography><Typography variant="body2" color="text.secondary">Review coursework, complete an assessment, or prepare for your next class.</Typography><LinearProgress variant="determinate" value={(completedMinutes / focusMinutes) * 100} sx={{ mt: 1.5 }} /></Box></Box>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}><Chip size="small" label={`${completedAssignments} submitted`} /><Chip size="small" label={`${quizzes.length} assessments available`} /></Stack>
        </Paper>
        <Paper className="content-panel achievements-panel" elevation={0}>
          <Box className="panel-heading"><Box><Typography variant="h6">Achievements</Typography><Typography variant="body2" color="text.secondary">You are building momentum</Typography></Box><EmojiEvents sx={{ color: "#e7a33e" }} /></Box>
          <Box className="achievement-row"><Avatar sx={{ bgcolor: "#fff4d8", color: "#e7a33e" }}><AssignmentTurnedIn /></Avatar><Box><Typography fontWeight={800}>Coursework submitted</Typography><Typography variant="body2" color="text.secondary">{completedAssignments} assignments recorded</Typography></Box><CheckCircle color="success" /></Box>
          <Box className="achievement-row"><Avatar sx={{ bgcolor: "#eeedff", color: "#5146e5" }}><School /></Avatar><Box><Typography fontWeight={800}>Program progress</Typography><Typography variant="body2" color="text.secondary">{totalProgress}% across your active pathways</Typography></Box><CheckCircle color="success" /></Box>
        </Paper>
      </Box>

      <Paper id="activity-panel" className="content-panel activity-panel" elevation={0}>
        <Box className="panel-heading"><Box><Typography variant="h6">Recent activity</Typography><Typography variant="body2" color="text.secondary">Your latest learning wins</Typography></Box><Button size="small" onClick={() => handleDashboardAction('history')} endIcon={<ArrowForward />}>View history</Button></Box>
        <Box className="activity-list">{activities.map((activity) => <Box className="activity-item" key={activity.title}><Avatar variant="rounded" sx={{ bgcolor: `${activity.tone}18`, color: activity.tone }}>{activity.icon}</Avatar><Box><Typography fontWeight={800}>{activity.title}</Typography><Typography variant="body2" color="text.secondary">{activity.meta}</Typography></Box></Box>)}</Box>
      </Paper>
    </Box>
  );
};

export default StudentdashboardOverview;
