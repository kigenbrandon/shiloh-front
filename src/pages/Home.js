import React from 'react';
import { Box, Button, Typography, Container, Card, CardContent, Chip, Stack } from '@mui/material';
import { ArrowForward, AutoStories, CheckCircle, Groups, PlayArrow, School as SchoolIcon, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <Box className="home-page">
      <Box className="home-hero">
        <Container className="home-hero-inner">
          <Box className="home-hero-copy">
            <Chip label="LEARN WITH PURPOSE" size="small" className="hero-chip" />
            <Typography variant="h1">Make progress you can feel.</Typography>
            <Typography className="home-hero-lede">A thoughtful learning space for building skills, finding your rhythm, and turning curiosity into confidence.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
              <Button component={Link} to="/enrollment" variant="contained" color="secondary" size="large" endIcon={<ArrowForward />}>Start learning</Button>
              <Button component={Link} to="/student/registration" variant="outlined" size="large" startIcon={<PlayArrow />} className="hero-ghost-button">Explore the experience</Button>
            </Stack>
            <Box className="home-trust-row"><CheckCircle /><Typography variant="body2">Progress at your pace</Typography><CheckCircle /><Typography variant="body2">Support when you need it</Typography></Box>
          </Box>
          <Box className="home-hero-art" aria-label="Learning progress overview">
            <Box className="hero-art-window"><Box className="art-window-top"><span /><span /><span /></Box><Typography variant="overline">THIS WEEK</Typography><Typography variant="h4">Your learning rhythm</Typography><Box className="art-bars"><span /><span /><span /><span /><span /><span /><span /></Box><Box className="art-goal"><CheckCircle /><Box><Typography fontWeight={800}>Daily goal complete</Typography><Typography variant="caption">4 days in a row</Typography></Box><Typography fontWeight={800} color="primary.main">+120 XP</Typography></Box></Box>
            <Box className="hero-floating-badge"><Star /><Typography variant="body2" fontWeight={800}>Small wins<br />add up</Typography></Box>
          </Box>
        </Container>
      </Box>

      <Container className="home-section">
        <Box className="section-intro"><Typography className="eyebrow">A BETTER WAY TO LEARN</Typography><Typography variant="h2">Built around your next step.</Typography><Typography color="text.secondary">Everything you need to stay curious, consistent, and clear on where you’re going.</Typography></Box>
        <Box className="benefit-grid">
          {[{ icon: <AutoStories />, title: 'Learn in flow', text: 'Focused lessons and clear paths make it easy to know what to do next.' }, { icon: <SchoolIcon />, title: 'Grow with guidance', text: 'Learn from experienced teachers and get support that moves you forward.' }, { icon: <Groups />, title: 'Find your people', text: 'Stay connected to a welcoming community of learners and mentors.' }].map((benefit) => <Card className="benefit-card" elevation={0} key={benefit.title}><CardContent><Box className="benefit-icon">{benefit.icon}</Box><Typography variant="h6">{benefit.title}</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>{benefit.text}</Typography></CardContent></Card>)}
        </Box>
      </Container>

      <Box className="home-proof-band"><Container className="proof-layout"><Box><Typography className="eyebrow">DESIGNED FOR MOMENTUM</Typography><Typography variant="h2">The best learning habit is the one you can keep.</Typography><Typography color="text.secondary" sx={{ mt: 1.5 }}>Create a steady rhythm with bite-sized goals, visible progress, and a space that makes returning feel natural.</Typography><Button component={Link} to="/student/registration" endIcon={<ArrowForward />} sx={{ mt: 3 }}>Find your starting point</Button></Box><Box className="proof-stats"><Box><Typography variant="h3">24/7</Typography><Typography color="text.secondary">access to your path</Typography></Box><Box><Typography variant="h3">1:1</Typography><Typography color="text.secondary">attention that matters</Typography></Box><Box><Typography variant="h3">∞</Typography><Typography color="text.secondary">room to grow</Typography></Box></Box></Container></Box>

      <Container className="home-section home-testimonials"><Box className="section-intro"><Typography className="eyebrow">FROM THE COMMUNITY</Typography><Typography variant="h2">Learning feels better together.</Typography></Box><Box className="testimonial-grid">{[{ quote: 'I can see exactly what I need to do next, and that makes studying feel much less overwhelming.', name: 'Amara K.', role: 'Student learner' }, { quote: 'The structure gives me room to learn independently while still feeling supported when I need help.', name: 'David M.', role: 'Student learner' }].map((item) => <Card className="testimonial-card" elevation={0} key={item.name}><CardContent><Box className="stars"><Star /><Star /><Star /><Star /><Star /></Box><Typography variant="h6">“{item.quote}”</Typography><Typography fontWeight={800} sx={{ mt: 3 }}>{item.name}</Typography><Typography variant="body2" color="text.secondary">{item.role}</Typography></CardContent></Card>)}</Box></Container>

      <Box className="home-cta"><Container><Typography variant="h2">Your next chapter starts here.</Typography><Typography>Choose one small step today. We’ll help you build from there.</Typography><Button component={Link} to="/student/registration" variant="contained" color="secondary" size="large" endIcon={<ArrowForward />} sx={{ mt: 3 }}>Join Shiloh College</Button></Container></Box>
      <Box className="home-footer"><Typography variant="body2">&copy; {new Date().getFullYear()} Shiloh College. Learning with purpose.</Typography></Box>
    </Box>
  );
};

export default Home;
