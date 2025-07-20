import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginSystem/LoginPage.css';

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Assuming the roll number input value is captured
    const rollNumberInput = document.querySelector('input[type="number"]').value;
    if (rollNumberInput) {
      // Redirect to StudentPage with rollNumber as query parameter
      navigate(`/student-portal?rollNumber=${rollNumberInput}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Login</h2>
        <input type="number" placeholder="Roll Number" maxLength={12} />
        <input type="password" placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
        <p>
          New student?{" "}
          <span className="link" onClick={() => navigate('/student-register')}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;