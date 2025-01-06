import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, Skeleton } from "@mui/material";
import { Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Star as StarIcon } from "@mui/icons-material";
import { GrAchievement } from "react-icons/gr";
import { FaAward } from "react-icons/fa";

const StudentdashboardOverview = () => {
  const [loading, setLoading] = useState(true);

  // Provided Data
  const data = JSON.parse(localStorage.getItem("userDATA"));
  console.log(data);

  // Simulate a loading state
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate loading delay
  }, []);

  // Render Courses UI
  const renderCourses = () => (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: 1, pb: 2, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Courses</Typography>
          <Button sx={{ color: "primary.main" }}>View All</Button>
        </Box>
        {loading ? (
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
          data.student.enrollments.map((enrollment, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{enrollment.courses}</Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Enrollment Date: {new Date(enrollment.enrollment_date).toLocaleDateString()}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );

  // Render Stats UI
  const stats = [
    { label: "Enrollments", count: data.student.enrollments.length, icon: <DashboardIcon /> },
    { label: "Completed Courses", count: 0, icon: <StarIcon /> },
    { label: "Total Invoices", count: 0, icon: <ExitToAppIcon /> },
  ];

  const renderStats = () => (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      {stats.map((stat, index) => (
        <Box key={index} sx={{ width: "33%", padding: 3 }}>
          <Paper sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 3 }}>
            {stat.icon}
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>{loading ? <Skeleton width={50} /> : stat.count}</Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>{stat.label}</Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      {renderStats()}
      {renderCourses()}
    </>
  );
};

export default StudentdashboardOverview;
