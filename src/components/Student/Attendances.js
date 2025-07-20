import React from 'react';
import AttendanceChart from './AttendanceChart';
import './Attendances.css';

const Attendances = ({ subjectAttendance }) => {
  // Fallback to default data if subjectAttendance is undefined or not an array
  const data = Array.isArray(subjectAttendance) && subjectAttendance.length > 0
    ? subjectAttendance
    : [
        { subject: 'Mathematics', presentclasses: 30, heldclasses: 40 },
        { subject: 'Physics', presentclasses: 28, heldclasses: 46 },
        { subject: 'Chemistry', presentclasses: 18, heldclasses: 52 },
        { subject: 'English', presentclasses: 30, heldclasses: 36 },
        { subject: 'Computer Science', presentclasses: 21, heldclasses: 25 },
        { subject: 'Environmental Science', presentclasses: 39, heldclasses: 55 },
      ];

  // Log data for debugging
  console.log('subjectAttendance:', subjectAttendance);
  console.log('Used data:', data);

  // Calculate average attendance
  const totalAttendance = data.reduce((acc, subject) => {
    const percentage = (subject.presentclasses / subject.heldclasses) * 100;
    return acc + percentage;
  }, 0);
  const averageAttendance = totalAttendance / data.length;

  return (
    <div className="portal-container">
      <h2 className="attendance-title">Subject-wise Attendance</h2>
      <div className="grid-container">
        {data.map((subject, index) => {
          const percentage = (subject.presentclasses / subject.heldclasses) * 100;

          return (
            <div
              className={`card ${percentage < 75 ? 'low-attendance' : ''}`}
              key={index}
            >
              <h5>{subject.subject}</h5>
              <div className="attendance-chart-container">
                <AttendanceChart present={percentage} absent={100 - percentage} />
              </div>
              <p className="percentage">
                {(Math.round(percentage * 100) / 100).toFixed(2)}% Attendance
              </p>
              <p className="percentage">Total no. of classes: {subject.heldclasses}</p>
              <p className="percentage">Attended classes: {subject.presentclasses}</p>
            </div>
          );
        })}
        <div className="average-attendance">
          <h5>Average Attendance</h5>
          <p>{averageAttendance.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Attendances;