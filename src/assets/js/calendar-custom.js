import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";


document.addEventListener("DOMContentLoaded", () => {
  // Get the calendar element
  const calendarEl = document.getElementById("calendar");

  // Create a new calendar instance
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    events: "/data/events.json", // Path to events.json file
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true,
    dateClick: handleDateClick,
  });

  // Event handler for date click
  function handleDateClick(info) {
    const clickedDate = info.dateStr;

    // Prompt the user to enter an event title
    const eventTitle = prompt("Enter event title:");

    // Check if the user entered a title
    if (eventTitle) {
      // Create a new event object
      const newEvent = {
        title: eventTitle,
        start: clickedDate,
        allDay: true, // Adjust this based on your event's time requirements
      };

      // Add the event to the calendar
      calendar.addEvent(newEvent);
    }
  }

  // Render the calendar
  calendar.render();
});
