import React from 'react';
import { ArrowForward, AutoStories, CheckCircle, Groups, HealthAndSafety, MenuBook, PlayArrow, School, VolunteerActivism } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css';

const faculties = [
	{ icon: <VolunteerActivism />, title: 'Chaplaincy', text: 'Pastoral care, crisis care, and spiritual support for people and communities.' },
	{ icon: <Groups />, title: 'Christian Counselling', text: 'Practical counselling and helping ministry for compassionate care.' },
	{ icon: <HealthAndSafety />, title: 'Health Care', text: 'Career-focused preparation for home care and healthcare assistance.' },
	{ icon: <School />, title: 'Christian Education', text: 'Teaching, leadership, and ministry education for purposeful service.' },
	{ icon: <AutoStories />, title: 'Theology', text: 'Biblical and theological study for deeper understanding and ministry.' },
	{ icon: <MenuBook />, title: 'Strategic Leadership', text: 'Leadership preparation for organizations, churches, and communities.' },
];

const studyLevels = ['Certificate', 'Diploma', "Bachelor's", "Master's", 'Doctorate'];

const missionSignals = [
	{ value: '01', title: 'Christ-centred', text: 'Biblical values, character, and responsible service.' },
	{ value: '02', title: 'Practical preparation', text: 'Learning connected to ministry, work, and community impact.' },
	{ value: '03', title: 'Global community', text: 'A growing network across North America, Africa, and the Caribbean.' },
];

const LandingPage = () => (
	<Box className="landing-page">
		<section className="landing-hero">
			<Container className="landing-hero-inner">
				<Box className="landing-copy">
					<Chip label="FAITH-CENTRED EDUCATION · PRACTICAL PREPARATION" className="landing-chip" />
					<Typography variant="h1">Prepare for purpose. Lead with excellence.</Typography>
					<Typography className="landing-lede">Shiloh College provides structured occupational, academic, and ministry training for people ready to serve, lead, and grow.</Typography>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
						<Button component="a" href="https://shilohcollege.com/online-application/" target="_blank" rel="noreferrer" variant="contained" color="secondary" size="large" endIcon={<ArrowForward />}>Apply online</Button>
						<Button component={Link} to="/login" variant="outlined" size="large" startIcon={<PlayArrow />} className="landing-outline-button">Student portal</Button>
					</Stack>
					<Box className="landing-proof"><CheckCircle /><Typography variant="body2">Applications accepted year-round</Typography><CheckCircle /><Typography variant="body2">Practical pathways for service and leadership</Typography></Box>
				</Box>
				<Box className="landing-visual" aria-label="Shiloh College academic pathways">
					<Box className="landing-photo" role="img" aria-label="Shiloh College students and community members" />
					<Box className="landing-sun" />
					<Box className="landing-path-card"><Typography variant="overline">YOUR ACADEMIC JOURNEY</Typography><Typography variant="h5">Learn. Grow. Serve.</Typography><Box className="landing-path-line"><span className="landing-node active"><School /></span><span /><span className="landing-node"><AutoStories /></span><span /><span className="landing-node"><Groups /></span></Box><Typography variant="body2" color="text.secondary">Move from focused study to confident, purposeful practice.</Typography></Box>
					<Box className="landing-note"><Typography variant="h6">Built for calling.</Typography><Typography variant="body2">Training that connects knowledge to real responsibility.</Typography></Box>
				</Box>
			</Container>
		</section>

		<section className="landing-mission"><Container><Box className="landing-mission-intro"><Typography className="eyebrow">THE SHILOH DIFFERENCE</Typography><Typography variant="h2">Calling and competence, held together.</Typography><Typography color="text.secondary">Shiloh College helps students discover, develop, and fulfil their calling through structured learning, mentorship, spiritual formation, and practical application.</Typography></Box><Box className="landing-mission-grid">{missionSignals.map((signal) => <Box className="landing-mission-item" key={signal.title}><Typography className="landing-mission-index">{signal.value}</Typography><Box><Typography variant="h6">{signal.title}</Typography><Typography color="text.secondary">{signal.text}</Typography></Box></Box>)}</Box></Container></section>

		<section className="landing-beliefs"><Container><Box className="landing-section-heading"><Typography className="eyebrow">TRAINING WITH PURPOSE</Typography><Typography variant="h2">Build skills that serve people well.</Typography><Typography color="text.secondary">Choose a supportive pathway in counselling, chaplaincy, healthcare, theology, education, or strategic leadership.</Typography></Box><Box className="landing-belief-grid">{faculties.map((faculty) => <Box key={faculty.title}>{faculty.icon}<Typography variant="h6">{faculty.title}</Typography><Typography color="text.secondary">{faculty.text}</Typography></Box>)}</Box></Container></section>

		<section className="landing-programs"><Container><Box className="landing-section-heading"><Typography className="eyebrow">FIND YOUR LEVEL</Typography><Typography variant="h2">A pathway for every stage of growth.</Typography><Typography color="text.secondary">From accessible certificates to advanced doctoral study, progress through a program shaped around your goals.</Typography></Box><Box className="landing-program-grid">{studyLevels.map((level, index) => <Card key={level} className="landing-program-card" elevation={0}><CardContent><Typography className="landing-program-number">0{index + 1}</Typography><MenuBook /><Typography variant="h6">{level} programs</Typography><Typography variant="body2" color="text.secondary">Explore available courses and admission requirements.</Typography></CardContent></Card>)}</Box><Button component="a" href="https://shilohcollege.com/programs/" target="_blank" rel="noreferrer" variant="outlined" endIcon={<ArrowForward />} sx={{ mt: 4 }}>Explore all programs</Button></Container></section>

		<section className="landing-admissions"><Container><Box className="landing-admissions-copy"><Typography className="eyebrow">ADMISSIONS</Typography><Typography variant="h2">Your next step can start today.</Typography><Typography color="text.secondary">Shiloh College accepts applications throughout the year. Prepare your application, submit your documents, and let the admissions team guide your next move.</Typography><Button component="a" href="https://shilohcollege.com/admissions/" target="_blank" rel="noreferrer" variant="contained" color="secondary" endIcon={<ArrowForward />} sx={{ mt: 3 }}>See admission requirements</Button></Box><Box className="landing-step-list">{['Submit application', 'Pay application fee', 'Submit documents', 'Admissions review', 'Receive acceptance'].map((step, index) => <Box className="landing-step" key={step}><Box className="landing-step-index">{index + 1}</Box><Typography fontWeight={800}>{step}</Typography></Box>)}</Box></Container></section>

		<section className="landing-cta"><Container><Typography className="eyebrow">SHILOH COLLEGE</Typography><Typography variant="h2">Transform aspirations into achievements.</Typography><Typography>Questions about programs or your application?</Typography><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={1.5} sx={{ mt: 3 }}><Button component="a" href="mailto:registrar@shilohcollege.com" variant="contained" color="secondary">registrar@shilohcollege.com</Button><Button component="a" href="tel:+164724729134" variant="outlined" className="landing-outline-button">+1 (647) 247-2913 Ext. 4</Button></Stack></Container></section>
	</Box>
);

export default LandingPage;
