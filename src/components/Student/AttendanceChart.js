import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceChart = ({ present, absent, redirectPath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ['#4ade80', '#f87171'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 2
      }
    ]
  };

  const handleChartClick = () => {
    // Only navigate if not already on the redirectPath
    if (redirectPath && location.pathname !== redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <div
      onClick={handleChartClick}
      style={{ cursor: redirectPath && location.pathname !== redirectPath ? 'pointer' : 'default' }}
    >
      <Doughnut data={attendanceData} />
    </div>
  );
};

export default AttendanceChart;