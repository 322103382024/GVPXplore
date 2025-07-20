import React from 'react';
import './MainContent.css';

function MainContent() {
  const events = [
    'Tech Fest 2025 - June 5',
    'Workshop on AI - July 10',
    'Hackathon 2025 - August 1',
  ];

  return (
    <div className="main-content-container">
      <div className="content-section updates">
        <h2 className="section-title">Latest Updates</h2>
        <p className="section-description">
          Admissions Open 2025 | New Lab Inauguration | NAAC A++
        </p>
        <hr />
      </div>
      <div className="content-section events">
        <h3 className="section-title">Upcoming Events</h3>
        <ul className="events-list">
          {events.map((event, index) => (
            <li
              key={index}
              className="event-item"
              style={{ '--item-index': index }}
            >
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainContent;