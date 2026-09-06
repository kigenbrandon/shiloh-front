const demoCredentials = {
  password: 'DemoPass123!',
};

export const demoUsers = {
  student: {
    demo: true,
    access_token: 'demo-student-token',
    refresh_token: 'demo-student-refresh-token',
    username: 'Brandon Carter',
    email: 'brandon.demo@shiloh.test',
    role: 'student',
    student: {
      id: 101,
      student_id: 'SHL-2026-0101',
      first_name: 'Brandon',
      last_name: 'Carter',
      enrollments: [
        { id: 1, courses: 'Foundations of Computer Science', enrollment_date: '2026-08-12', progress: 68, grade: 'A-', status: 'In progress' },
        { id: 2, courses: 'Creative Problem Solving', enrollment_date: '2026-08-25', progress: 42, grade: 'B+', status: 'In progress' },
        { id: 3, courses: 'Communication for Leaders', enrollment_date: '2026-09-01', progress: 18, grade: 'Not graded', status: 'Just started' },
      ],
    },
    assignments: [
      { id: 1, title: 'Build a study planner', subject: 'Computer Science', dueDate: '2026-09-10', status: 'In progress', points: 20 },
      { id: 2, title: 'Problem-solving reflection', subject: 'Creative Problem Solving', dueDate: '2026-09-13', status: 'Not started', points: 15 },
      { id: 3, title: 'Peer communication notes', subject: 'Communication for Leaders', dueDate: '2026-09-16', status: 'Submitted', points: 25 },
    ],
    quizzes: [
      { id: 1, title: 'Computational thinking check-in', course: 'Foundations of Computer Science', questions: [{ id: 1, text: 'What is an algorithm?', options: ['A repeatable set of steps', 'A device', 'A file type'], correctAnswer: 'A repeatable set of steps' }, { id: 2, text: 'Which is a useful learning habit?', options: ['Skip practice', 'Reflect after feedback', 'Avoid questions'], correctAnswer: 'Reflect after feedback' }] },
      { id: 2, title: 'Communication essentials', course: 'Communication for Leaders', questions: [{ id: 3, text: 'What makes feedback useful?', options: ['It is specific', 'It is vague', 'It is delayed'], correctAnswer: 'It is specific' }] },
    ],
    classmates: [
      { id: 102, username: 'Amina Yusuf', email: 'amina.demo@shiloh.test', course: 'Foundations of Computer Science', progress: 74 },
      { id: 103, username: 'Theo Williams', email: 'theo.demo@shiloh.test', course: 'Foundations of Computer Science', progress: 51 },
      { id: 104, username: 'Lena Okoro', email: 'lena.demo@shiloh.test', course: 'Creative Problem Solving', progress: 63 },
    ],
    report: { attendance: 92, lessonsCompleted: 18, averageGrade: 87, weeklyMinutes: 145, labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'], grades: [76, 81, 79, 86, 87] },
    calendarEvents: [
      { id: 's1', title: 'Computer Science workshop', start: '2026-09-08T09:00:00', end: '2026-09-08T10:30:00', location: 'Innovation Lab' },
      { id: 's2', title: 'Assignment clinic', start: '2026-09-10T14:00:00', end: '2026-09-10T15:00:00', location: 'Online' },
      { id: 's3', title: 'Learning community meetup', start: '2026-09-17T16:00:00', end: '2026-09-17T17:30:00', location: 'Student Hub' },
    ],
    events: [
      { id: 'e1', title: 'New student welcome', date: '2026-09-07', time: '10:00 AM - 12:00 PM', location: 'Main Hall', description: 'Meet your learning community and discover the support available to you.' },
      { id: 'e2', title: 'Career pathways panel', date: '2026-09-19', time: '2:00 PM - 4:00 PM', location: 'Auditorium', description: 'Hear practical stories from alumni building meaningful careers.' },
    ],
    payments: { balance: 800, totalPaid: 1200, totalDue: 2000, nextDue: '2026-09-30', invoiceNumber: 'INV-2026-0101', history: [{ id: 'p1', description: 'Term 1 tuition', amount: 800, date: '2026-08-01', status: 'Paid' }, { id: 'p2', description: 'Library and technology fee', amount: 400, date: '2026-08-15', status: 'Paid' }] },
    notifications: [
      { id: 'n1', type: 'Course update', subject: 'New feedback is ready', message: 'Your study planner assignment has received feedback from Maya.', timestamp: '2026-09-04T09:30:00' },
      { id: 'n2', type: 'Reminder', subject: 'Assignment due soon', message: 'Problem-solving reflection is due in 9 days.', timestamp: '2026-09-03T15:00:00' },
    ],
  },
  teacher: {
    demo: true,
    access_token: 'demo-teacher-token',
    refresh_token: 'demo-teacher-refresh-token',
    username: 'Maya Thompson',
    email: 'maya.demo@shiloh.test',
    role: 'teacher',
    subject: 'Computer Science',
    teacher: {
      id: 201,
      name: 'Maya Thompson',
      subject: 'Computer Science',
      hire_date: '2023-08-14',
      enrollments: [
        { id: 1, student_name: 'Brandon Carter', enrollment_date: '2026-08-12', course: 'Foundations of Computer Science' },
        { id: 2, student_name: 'Amina Yusuf', enrollment_date: '2026-08-19', course: 'Foundations of Computer Science' },
        { id: 3, student_name: 'Theo Williams', enrollment_date: '2026-08-27', course: 'Creative Problem Solving' },
      ],
      students: [
        { id: 101, student_name: 'Brandon Carter', email: 'brandon.demo@shiloh.test', course: 'Foundations of Computer Science', progress: 68, lastActive: 'Today' },
        { id: 102, student_name: 'Amina Yusuf', email: 'amina.demo@shiloh.test', course: 'Foundations of Computer Science', progress: 74, lastActive: 'Yesterday' },
        { id: 103, student_name: 'Theo Williams', email: 'theo.demo@shiloh.test', course: 'Creative Problem Solving', progress: 51, lastActive: '2 days ago' },
      ],
      notifications: [
        { id: 'tn1', type: 'Assignment', subject: 'Submission needs review', message: 'Brandon Carter submitted the study planner assignment.', timestamp: '2026-09-04T08:45:00' },
        { id: 'tn2', type: 'Course', subject: 'New learner joined', message: 'Lena Okoro joined Creative Problem Solving.', timestamp: '2026-09-03T13:20:00' },
      ],
      settings: { emailNotifications: true, weeklyDigest: true, availability: 'Mon - Fri, 9:00 AM - 4:00 PM' },
    },
  },
  admin: {
    demo: true,
    access_token: 'demo-admin-token',
    refresh_token: 'demo-admin-refresh-token',
    username: 'Jordan Ellis',
    email: 'jordan.demo@shiloh.test',
    role: 'admin',
    admin: {
      id: 301,
      name: 'Jordan Ellis',
      department: 'Academic Operations',
    },
    students: [
      { id: 101, username: 'Brandon Carter', email: 'brandon.demo@shiloh.test', role: 'student', status: 'Active' },
      { id: 102, username: 'Amina Yusuf', email: 'amina.demo@shiloh.test', role: 'student', status: 'Active' },
      { id: 103, username: 'Theo Williams', email: 'theo.demo@shiloh.test', role: 'student', status: 'Pending' },
    ],
    teachers: [
      { id: 201, name: 'Maya Thompson', email: 'maya.demo@shiloh.test', subject: 'Computer Science' },
      { id: 202, name: 'Samuel Okafor', email: 'samuel.demo@shiloh.test', subject: 'Mathematics' },
    ],
    attendance: { present: 84, absent: 8, late: 8 },
    transactions: [
      { id: 'TX-1001', description: 'Enrollment payment', amount: 480, status: 'Completed', date: '2026-09-01' },
      { id: 'TX-1002', description: 'Library subscription', amount: 120, status: 'Pending', date: '2026-09-03' },
    ],
  },
};

export const getDemoUser = (role) => ({ ...demoUsers[role] });
export { demoCredentials };
