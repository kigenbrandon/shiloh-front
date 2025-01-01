import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Button, Modal, TextField, IconButton } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import CloseIcon from '@mui/icons-material/Close';

const SchoolCalendar = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null); // For new event or editing an event
  const [className, setClassName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Dummy event data
  const dummyEvents = [
    {
      id: 1,
      class_name: 'Math 101',
      room_number: 'A1',
      start_time: '2024-01-15T08:00:00',
      end_time: '2024-01-15T09:00:00',
    },
    {
      id: 2,
      class_name: 'History 202',
      room_number: 'B2',
      start_time: '2024-12-15T10:00:00',
      end_time: '2024-12-15T12:00:00',
    },
  ];

  // Fetch events or use dummy data
  useEffect(() => {
    // Transform dummy data to FullCalendar event format
    const transformedEvents = dummyEvents.map(event => ({
      id: event.id,
      title: `${event.class_name} (Room: ${event.room_number})`,
      start: event.start_time,
      end: event.end_time,
    }));
    setEvents(transformedEvents);
  }, []);


  return (
    <Container>
      <Box sx={{ paddingTop: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#2E3B55' }} gutterBottom>
          School Calendar
        </Typography>

        {/* Calendar Wrapper with Shadow and Rounded Corners */}
        <Paper sx={{ padding: 3, borderRadius: '8px', boxShadow: 3 }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              start: 'today prev,next', // Navigation buttons on left
              center: 'title', // Calendar title in the center
              end: 'dayGridMonth,timeGridWeek,timeGridDay', // View options on the right
            }}
            eventColor="#2196F3" // Color for event titles
            height="80vh" // Set the height of the calendar
          />
        </Paper>
      </Box>

    </Container>
  );
};

export default SchoolCalendar;
