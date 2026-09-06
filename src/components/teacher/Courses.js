import React, { useMemo, useState } from 'react';
import { Container, Box, Card, CardContent, Typography, Avatar, Chip, LinearProgress, Button, Stack } from '@mui/material';
import { ArrowForward, AutoStories, Group, MoreHoriz, PlayArrow, TrendingUp } from '@mui/icons-material';
import { getDemoUser } from '../../demoData';

const Courses = () => {
    const [filter, setFilter] = useState('All courses');
    const teacherData = useMemo(() => getDemoUser('teacher'), []);
    const courses = [
        { id: 1, name: 'Foundations of Computer Science', level: 'Intermediate', students: 24, progress: 68, next: 'Algorithms and flow' },
        { id: 2, name: 'Creative Problem Solving', level: 'Beginner', students: 18, progress: 51, next: 'Framing better questions' },
        { id: 3, name: 'Communication for Leaders', level: 'Advanced', students: 16, progress: 84, next: 'Final presentations' },
    ];
    const visibleCourses = filter === 'All courses' ? courses : courses.filter((course) => course.level === filter);
    return (
        <Container className="teacher-courses-page" maxWidth="lg">
            <Box className="teacher-page-heading"><Box><Typography className="eyebrow">TEACHING SPACE</Typography><Typography variant="h4" sx={{ mt: .5 }}>Your courses</Typography><Typography color="text.secondary" sx={{ mt: .75 }}>See where your learners are thriving and what needs your attention next.</Typography></Box><Button variant="contained" endIcon={<ArrowForward />}>Create course</Button></Box>
            <Stack direction="row" spacing={1} sx={{ my: 3 }}><Chip label="All courses" color={filter === 'All courses' ? 'primary' : 'default'} onClick={() => setFilter('All courses')} /><Chip label="Beginner" color={filter === 'Beginner' ? 'primary' : 'default'} onClick={() => setFilter('Beginner')} /><Chip label="Intermediate" color={filter === 'Intermediate' ? 'primary' : 'default'} onClick={() => setFilter('Intermediate')} /><Chip label="Advanced" color={filter === 'Advanced' ? 'primary' : 'default'} onClick={() => setFilter('Advanced')} /></Stack>
            <Box className="teacher-course-grid">
                {visibleCourses.map((course) => <Card className="teacher-course-card" elevation={0} key={course.id}><Box className="teacher-course-cover"><AutoStories /><IconButtonPlaceholder /></Box><CardContent><Box className="teacher-course-title"><Box><Typography variant="h6">{course.name}</Typography><Typography variant="body2" color="text.secondary">{course.level} · Next: {course.next}</Typography></Box><MoreHoriz color="action" /></Box><Box className="teacher-course-stats"><Box><Group /><Typography variant="body2">{course.students} learners</Typography></Box><Box><TrendingUp /><Typography variant="body2">{course.progress}% avg. progress</Typography></Box></Box><LinearProgress value={course.progress} variant="determinate" sx={{ mt: 2 }} /><Button fullWidth variant="outlined" endIcon={<PlayArrow />} sx={{ mt: 2 }}>Open course</Button></CardContent></Card>)}
            </Box>
            <PaperCourseInsight teacherData={teacherData} />
        </Container>
    );
};

const IconButtonPlaceholder = () => <Box className="teacher-course-index">↗</Box>;
const PaperCourseInsight = ({ teacherData }) => <Box className="teacher-course-insight"><Avatar><TrendingUp /></Avatar><Box><Typography fontWeight={800}>Your learners are gaining momentum</Typography><Typography variant="body2" color="text.secondary">{teacherData.teacher.students.length} learners are active across your current courses. Review submissions to keep the progress curve moving.</Typography></Box><Button size="small" endIcon={<ArrowForward />}>Review work</Button></Box>;

export default Courses;
