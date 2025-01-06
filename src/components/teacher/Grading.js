import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Typography, Box, Skeleton, IconButton, Modal, Grid } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Paper } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Grading = () => {
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gradeId, setGradeId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://shiloh-server.onrender.com/students');
            setStudents(response.data);
            console.log('Students:', response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await axios.get('https://shiloh-server.onrender.com/grades');
            setGrades(response.data);
        } catch (error) {
            console.error('Error fetching grades:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchGrades();
    }, []);

    const formik = useFormik({
        initialValues: {
            student_id: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            course: '',
            grade: '',
        },
        validationSchema: Yup.object({
            student_id: Yup.string().required('Student ID is required'),
            course: Yup.string().required('Course is required'),
            grade: Yup.number().required('Grade is required').min(0, 'Grade must be at least 0').max(100, 'Grade must be at most 100'),
        }),
        onSubmit: async (values) => {
            try {
                if (gradeId) {
                    const response = await axios.put(`https://shiloh-server.onrender.com/grades/${gradeId}`, values);
                    console.log('Grade updated:', response.data);
                } else {
                    const response = await axios.post('https://shiloh-server.onrender.com/grades', values);
                    console.log('Grade created:', response.data);
                }
                fetchGrades();
                setOpenModal(false);  // Close modal after submission
            } catch (error) {
                console.error('Error submitting grade:', error);
            }
        },
    });

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://shiloh-server.onrender.com/grades/${id}`);
            fetchGrades();
        } catch (error) {
            console.error('Error deleting grade:', error);
        }
    };

    const handleEdit = (grade) => {
        setGradeId(grade.id);
        formik.setValues({
            student_id: grade.student_id,
            course: grade.course,
            grade: grade.grade,
        });
        setOpenModal(true);  // Open modal to edit grade
    };

    const handleOpenModal = (student) => {
        setSelectedStudent(student);
        formik.setFieldValue('student_id', student.student_id);
        formik.setFieldValue('first_name', student.first_name || '');
        formik.setFieldValue('middle_name', student.middle_name || '');
        formik.setFieldValue('last_name', student.last_name || '');
        setOpenModal(true);  // Open modal for grading
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedStudent(null);
        formik.resetForm();  // Reset the form
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Grade Student
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Students List
                    </Typography>
                    {loading ? (
                        <Skeleton variant="rectangular" width="100%" height={118} />
                    ) : (
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>First Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Middle Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Last Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Student ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', color: 'gray' }}>Actions</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafafa' }, '&:hover': { backgroundColor: '#f1f1f1' } }}>
                                    <TableCell>{student.first_name || 'N/A'}</TableCell>
                                    <TableCell>{student.middle_name || 'N/A'}</TableCell>
                                    <TableCell>{student.last_name || 'N/A'}</TableCell>
                                    <TableCell>{student.student_id}</TableCell>
                                    <TableCell>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenModal(student)}
                                        sx={{
                                            borderRadius: 2,
                                            paddingX: 3,
                                            '&:hover': {
                                            backgroundColor: '#3f51b5',
                                            },
                                        }}
                                        >
                                        Grade
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                    )}
                </Box>
            </Box>

            {/* Grading Modal */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ width: 400, margin: 'auto', mt: 10, p: 3, backgroundColor: 'white' }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Grade {selectedStudent ? `${selectedStudent.first_name} ${selectedStudent.middle_name} ${selectedStudent.last_name}` : ''}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="student_id"
                            name="student_id"
                            label="Student ID"
                            value={formik.values.student_id}
                            onChange={formik.handleChange}
                            error={formik.touched.student_id && Boolean(formik.errors.student_id)}
                            helperText={formik.touched.student_id && formik.errors.student_id}
                            margin="normal"
                            disabled
                        />
                        <TextField
                            fullWidth
                            id="first_name"
                            name="first_name"
                            label="First Name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                            margin="normal"
                            disabled
                        />
                        <TextField
                            fullWidth
                            id="middle_name"
                            name="middle_name"
                            label="Middle Name"
                            value={formik.values.middle_name}
                            onChange={formik.handleChange}
                            error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}
                            helperText={formik.touched.middle_name && formik.errors.middle_name}
                            margin="normal"
                            disabled
                        />
                        <TextField
                            fullWidth
                            id="last_name"
                            name="last_name"
                            label="Last Name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
                            margin="normal"
                            disabled
                        />
                        <TextField
                            fullWidth
                            id="course"
                            name="course"
                            label="Course"
                            value={formik.values.course}
                            onChange={formik.handleChange}
                            error={formik.touched.course && Boolean(formik.errors.course)}
                            helperText={formik.touched.course && formik.errors.course}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="grade"
                            name="grade"
                            label="Grade"
                            type="number"
                            value={formik.values.grade}
                            onChange={formik.handleChange}
                            error={formik.touched.grade && Boolean(formik.errors.grade)}
                            helperText={formik.touched.grade && formik.errors.grade}
                            margin="normal"
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Container>
    );
};

export default Grading;
