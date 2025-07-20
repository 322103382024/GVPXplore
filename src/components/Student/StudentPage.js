import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './StudentPortal.css';
import AttendanceChart from './AttendanceChart';
import logo from './college-logo.png';
import profileImg from './vasp2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// Define subject attendance data
const subjectAttendance = [
  { subject: 'Mathematics', presentclasses: 30, heldclasses: 40 },
  { subject: 'Physics', presentclasses: 28, heldclasses: 46 },
  { subject: 'Chemistry', presentclasses: 18, heldclasses: 52 },
  { subject: 'English', presentclasses: 30, heldclasses: 36 },
  { subject: 'Computer Science', presentclasses: 21, heldclasses: 25 },
  { subject: 'Environmental Science', presentclasses: 39, heldclasses: 55 },
];

// Calculate average attendance
const totalAttendance = subjectAttendance.reduce((acc, subject) => {
  const percentage = (subject.presentclasses / subject.heldclasses) * 100;
  return acc + percentage;
}, 0);
const averageAttendance = totalAttendance / subjectAttendance.length;

const StudentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rollNumber = queryParams.get("rollNumber");

  // State for current semester
  const [semester, setSemester] = useState('6');

  // State for current month/year
  const [currentDate] = useState(new Date());

  // State for calendar tasks
  const [calendarTasks, setCalendarTasks] = useState({});
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // State for to-do list
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [selectedDateKey, setSelectedDateKey] = useState(null);

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem(`studentTasks_${rollNumber}`)) || [];
    storedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    setTasks(storedTasks);

    // Load calendar tasks from localStorage
    const storedCalendarTasks = JSON.parse(localStorage.getItem(`calendarTasks_${rollNumber}`)) || {};
    setCalendarTasks(storedCalendarTasks);
  }, [rollNumber]);

  // Add new task to calendar and sync to to-do list
  const handleAddCalendarTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() && selectedDate) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`;
      const todoDateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      const newCalendarTask = { id: Date.now(), text: newTaskText };
      const newTodoTask = {
        id: Date.now() + 1, // Ensure unique ID
        description: newTaskText,
        deadline: todoDateKey,
        isCompleted: false,
      };

      // Update calendar tasks
      const updatedCalendarTasks = {
        ...calendarTasks,
        [dateKey]: [...(calendarTasks[dateKey] || []), newCalendarTask],
      };
      setCalendarTasks(updatedCalendarTasks);
      localStorage.setItem(`calendarTasks_${rollNumber}`, JSON.stringify(updatedCalendarTasks));

      // Update to-do tasks
      const updatedTasks = [...tasks, newTodoTask].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setTasks(updatedTasks);
      localStorage.setItem(`studentTasks_${rollNumber}`, JSON.stringify(updatedTasks));

      setNewTaskText('');
    }
  };

  // Delete calendar task
  const handleDeleteCalendarTask = (dateKey, taskId) => {
    const updatedTasks = {
      ...calendarTasks,
      [dateKey]: calendarTasks[dateKey].filter((task) => task.id !== taskId),
    };
    if (updatedTasks[dateKey].length === 0) {
      delete updatedTasks[dateKey];
    }
    setCalendarTasks(updatedTasks);
    localStorage.setItem(`calendarTasks_${rollNumber}`, JSON.stringify(updatedTasks));
  };

  // Handle date click
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setNewTaskText('');
    // Set selectedDateKey for to-do list filtering (yyyy-mm-dd format)
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateKey = `${currentDate.getFullYear()}-${monthStr}-${dayStr}`;
    setSelectedDateKey(dateKey);
    // Pre-fill deadline for new tasks if editable
    if (isDateEditable(dateKey)) {
      setNewTaskDeadline(dateKey);
    } else {
      setNewTaskDeadline('');
    }
  };

  // Check if date is editable (today or future)
  const isDateEditable = (dateKey) => {
    if (!dateKey) return true; // Allow editing if no date is selected
    const today = new Date(2025, 4, 14); // May 14, 2025
    today.setHours(0, 0, 0, 0);
    const selected = new Date(dateKey);
    selected.setHours(0, 0, 0, 0);
    return selected >= today;
  };

  // Add new to-do task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskDescription.trim() && newTaskDeadline) {
      const newTask = {
        id: Date.now(),
        description: newTaskDescription,
        deadline: newTaskDeadline,
        isCompleted: false,
      };
      const updatedTasks = [...tasks, newTask].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setTasks(updatedTasks);
      localStorage.setItem(`studentTasks_${rollNumber}`, JSON.stringify(updatedTasks));
      setNewTaskDescription('');
      // Keep deadline pre-filled if still on the same date
      if (selectedDateKey && isDateEditable(selectedDateKey)) {
        setNewTaskDeadline(selectedDateKey);
      } else {
        setNewTaskDeadline('');
      }
    }
  };

  // Toggle task completion
  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem(`studentTasks_${rollNumber}`, JSON.stringify(updatedTasks));
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(`studentTasks_${rollNumber}`, JSON.stringify(updatedTasks));
  };

  // Handle semester change
  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  // Calculate days in current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Format selected date for placeholder in dd-mm-yyyy
  const formatDateForPlaceholder = (day) => {
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yearStr = currentDate.getFullYear();
    return `${dayStr}-${monthStr}-${yearStr}`;
  };

  // Filter tasks for the selected date
  const filteredTasks = selectedDateKey
    ? tasks.filter((task) => task.deadline === selectedDateKey)
    : tasks;

  // Check if a date has to-do tasks
  const hasTodoTasks = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.some((task) => task.deadline === dateKey);
  };

  // Check if a date is today
  const isToday = (day) => {
    const today = new Date(2025, 4, 14); // May 14, 2025
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="portal-container">
      {/* Header Section */}
      <header className="portal-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="College Logo" className="college-logo" />
          </div>
          <div className="title-container">
            <h2 className="portal-title">GAYATRI VIDYA PARISHAD COLLEGE OF ENGINEERING</h2>
            <h5 className="portal-subtitle">STUDENT PORTAL</h5>
          </div>
          <div className="profile-container">
            <img src={profileImg} alt="Profile" className="profile-image" />
          </div>
        </div>
      </header>

      {/* Student Info Bar */}
      <div className="student-info-bar">
        <div className="student-detail">
          <label>Name:</label>
          <span>B.Vasupriya Patnaik</span>
        </div>
        <div className="student-detail">
          <label>ROLL:</label>
          <span>{rollNumber}</span>
        </div>
        <div className="student-detail">
          <label>SECTION:</label>
          <span>CSM</span>
        </div>
        <div className="student-detail">
          <label>BATCH:</label>
          <span>2022-2026</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="portal-content">
        {/* Left Column */}
        <div className="portal-column left-column">
          <div className="card semester-card">
            <div className="semester-header">
              <h6>SELECT SEMESTER</h6>
              <select className="semester-select" value={semester} onChange={handleSemesterChange}>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
          </div>

          <div className="card calendar-card">
            <div className="calendar-header">
              <h6>GOOGLE CALENDAR FOR TASKS</h6>
              <div className="month-year">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div className="event-form">
              {selectedDate && (
                <form onSubmit={handleAddCalendarTask}>
                  <div className="event-input-group">
                    <input
                      type="text"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      placeholder={`Add task for ${formatDateForPlaceholder(selectedDate)}...`}
                      className="event-input"
                      required
                    />
                    <button type="submit" className="add-event-btn">+</button>
                  </div>
                </form>
              )}
            </div>
            <div className="calendar-grid">
              <div className="calendar-days">
                <div className="calendar-week">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </div>
                <div className="calendar-dates">
                  {Array(daysInMonth).fill().map((_, i) => {
                    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i + 1}`;
                    const hasCalendarTasks = calendarTasks[dateKey]?.length > 0;
                    const hasTodo = hasTodoTasks(i + 1);
                    const today = isToday(i + 1);
                    return (
                      <div
                        key={i}
                        className={`date-cell ${hasCalendarTasks ? 'has-event' : ''} ${selectedDate === i + 1 ? 'selected' : ''} ${hasTodo ? 'has-todo' : ''} ${today ? 'today' : ''}`}
                        onClick={() => handleDateClick(i + 1)}
                        title={hasCalendarTasks ? calendarTasks[dateKey].map((t) => t.text).join(', ') : ''}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {selectedDate && (
              <div className="task-list">
                <h6>Tasks for {formatDateForPlaceholder(selectedDate)}</h6>
                {calendarTasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`]?.length > 0 ? (
                  <ul>
                    {calendarTasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`].map((task) => (
                      <li key={task.id} className="calendar-task-item">
                        <span>{task.text}</span>
                        <button
                          className="delete-task-btn"
                          onClick={() => handleDeleteCalendarTask(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDate}`, task.id)}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks for this date.</p>
                )}
              </div>
            )}
          </div>

          <div className="class-timetable">
            <h6>CLASS TIMETABLE</h6>
            <div className="timetable-overlay">
              <button className="zoom-btn">Zoom to Full Screen</button>
            </div>
            <div className="timetable-grid">
              <div className="timetable-row header-row">
                <div className="timetable-cell">Mon</div>
                <div className="timetable-cell">Tue</div>
                <div className="timetable-cell">Wed</div>
                <div className="timetable-cell">Thu</div>
                <div className="timetable-cell">Fri</div>
              </div>
              {Array(5).fill().map((_, i) => (
                <div key={i} className="timetable-row">
                  <div className="timetable-cell">{i === 0 ? 'AI/ML' : i === 2 ? 'Database' : ''}</div>
                  <div className="timetable-cell">{i === 1 ? 'Networks' : i === 3 ? 'Python' : ''}</div>
                  <div className="timetable-cell">{i === 2 ? 'AI/ML' : i === 4 ? 'Database' : ''}</div>
                  <div className="timetable-cell">{i === 0 ? 'Python' : i === 3 ? 'Networks' : ''}</div>
                  <div className="timetable-cell">{i === 1 ? 'AI/ML' : i === 4 ? 'Python' : ''}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card marks-card">
            <h6>INTERNAL MARKS</h6>
            <Link to={`/student-portal/internal-marks?rollNumber=${rollNumber}`}>
              <button className="view-marks-btn">View Details</button>
            </Link>
          </div>
        </div>

        {/* Middle Column */}
        <div className="portal-column middle-column">
          <div className="card todo-card">
            <h6>TO DO LIST {selectedDateKey ? `for ${formatDateForPlaceholder(selectedDate)}` : ''}</h6>
            <div className="todo-form">
              <form onSubmit={handleAddTask}>
                <div className="todo-input-group">
                  <input
                    type="text"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                    required
                    disabled={selectedDateKey && !isDateEditable(selectedDateKey)}
                  />
                  <input
                    type="date"
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                    className="todo-input"
                    required
                    disabled={selectedDateKey && !isDateEditable(selectedDateKey)}
                  />
                  <button
                    type="submit"
                    className="add-todo-btn"
                    disabled={selectedDateKey && !isDateEditable(selectedDateKey)}
                  >
                    +
                  </button>
                </div>
              </form>
            </div>
            {filteredTasks.length === 0 ? (
              <div className="no-todos">
                {selectedDateKey ? 'No tasks for this date.' : 'No tasks yet. Select a date or add one above!'}
              </div>
            ) : (
              <div className="todo-list">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`todo-item ${task.isCompleted ? 'completed' : ''} ${
                      selectedDateKey && !isDateEditable(selectedDateKey) ? 'read-only' : ''
                    }`}
                  >
                    {selectedDateKey && !isDateEditable(selectedDateKey) ? null : (
                      <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleCheckboxChange(task.id)}
                      />
                    )}
                    <div className="todo-content">
                      <div className="todo-text">{task.description}</div>
                      <div className="todo-deadline">Due: {task.deadline}</div>
                    </div>
                    {selectedDateKey && !isDateEditable(selectedDateKey) ? null : (
                      <button
                        className="delete-task-btn"
                        onClick={() => handleDeleteTask(task.id)}
                        title="Delete task"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="portal-column right-column">
          <Link to={`/student-portal/attendance?rollNumber=${rollNumber}`} className="link">
            <div className="card attendance-card">
              <h6>ATTENDANCE RECORD</h6>
              <div className="attendance-chart-container">
                <AttendanceChart present={averageAttendance} absent={100 - averageAttendance} />
              </div>
              <div className="attendance-details">
                <p className="attendance-stat">
                  <strong>Total Attendance: {averageAttendance.toFixed(2)}%</strong>
                </p>
                <p className="attendance-stat">Average Attendance across all subjects</p>
              </div>
            </div>
          </Link>

          <div className="card results-card">
            <h6>RESULTS</h6>
            <div className="cgpa-display">
              <div className="cgpa-circle">9.58</div>
              <div className="cgpa-label">CGPA</div>
            </div>
            <div className="results-details">
              <div className="semester-result">
                <span>Semester 5:</span>
                <span className="semester-grade">9.7</span>
              </div>
              <div className="semester-result">
                <span>Semester 4:</span>
                <span className="semester-grade">9.5</span>
              </div>
            </div>
          </div>

          <div className="card vault-card">
            <h6>PERSONAL VAULT</h6>
            <div className="vault-content">
              <div className="vault-icon">🔐</div>
              <p className="vault-description">Store your important documents securely</p>
              <button className="vault-btn">Access Vault</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;