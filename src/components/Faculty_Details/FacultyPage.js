/*import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './FacultyPage.css';

const departments = [
  { name: 'CSE', image: 'https://www.chitkara.edu.in/blogs/wp-content/uploads/2024/08/Computer-Science-Engineering-with-Artificial-Intelligence.jpg' },
  { name: 'ECE', image: 'https://webdocs.pages.dev/assets/img/ece/ece.jpg' },
  { name: 'IT', image: 'data:image/jpeg;base64,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' },
  { name: 'EEE', image: 'data:image/jpeg;base64,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' },
  { name: 'MECHANICAL', image: 'https://www.chitkara.edu.in/blogs/wp-content/uploads/2023/06/The-Future-of-Mechanical-En.jpg' },
  { name: 'CIVIL', image: 'data:image/jpeg;base64,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' },
  { name: 'CHEMICAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1INk2-VBPsVO9OQhuyOvcz9Akvvr3YsCzLg&s' },
];

const FacultyPage = () => {
    const navigate = useNavigate();
    return (
      <div className="faculty-page-bg">
        <div className="banner-container">
          <img
            src="https://gvpce.ac.in/images/banner.jpg"
            alt="GVP College Banner"
            className="banner-image"
          />
        </div>
        <Container className="text-center text-white">
          <h1 className="college-title mb-2">Gayatri Vidya Parishad College of Engineering</h1>
          <h2 className="faculty-heading mb-4">Faculty</h2>
          <Row className="justify-content-center">
            {departments.map((dept, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                <div
                  className="department-card"
                  style={{ backgroundImage: `url(${dept.image})` }}
                  onClick={() => navigate(`/department/${dept.name.toLowerCase()}`)}
                >
                  <div className="card-overlay">{dept.name}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  };
  export default FacultyPage;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './FacultyPage.css';

// Department data with improved images
const departments = [
  {
    name: "CSE",
    fullName: "Computer Science Engineering",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "💻"
  },
  {
    name: "ECE",
    fullName: "Electronics & Communication Engineering",
    image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "📡"
  },
  {
    name: "IT",
    fullName: "Information Technology",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "🖥️"
  },
  {
    name: "EEE",
    fullName: "Electrical & Electronics Engineering",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "⚡"
  },
  {
    name: "MECHANICAL",
    fullName: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "⚙️"
  },
  {
    name: "CIVIL",
    fullName: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "🏗️"
  },
  {
    name: "CHEMICAL",
    fullName: "Chemical Engineering",
    image: "https://images.unsplash.com/photo-1616458964690-917898af8477?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: "🧪"
  },

];

const FacultyPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add animation class after component mounts
    setIsLoaded(true);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="faculty-page-bg">
      {/* Header Section with Parallax Effect */}
      <div className="header-section">
        <div className="banner-container">
          <img
            src="https://gvpce.ac.in/images/banner.jpg"
            alt="GVP College Banner"
            className="banner-image"
          />
        </div>
        <div className="college-info-container">
          <h1 className="college-title">Gayatri Vidya Parishad College of Engineering</h1>
          <div className="divider">
            <span></span>
            <span className="diamond"></span>
            <span></span>
          </div>
          <p className="college-tagline">Excellence in Education Since 1996</p>
        </div>
      </div>

      {/* Faculty Section */}
      <Container className="text-center faculty-container">
        <div className={`section-header ${isLoaded ? 'fade-in' : ''}`}>
          <h2 className="faculty-heading">Our Faculty Departments</h2>
          <p className="section-description">
            Explore our academic departments led by experienced faculty members dedicated to excellence in teaching and research.
          </p>
        </div>
        
        <Row className="justify-content-center department-row">
          {departments.map((dept, index) => (
            <Col 
              key={index} 
              xs={12} sm={6} md={4} lg={3} 
              className={`mb-4 d-flex justify-content-center department-col ${isLoaded ? 'slide-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="department-card"
                style={{ backgroundImage: `url(${dept.image})` }}
                onClick={() => navigate(`/department/${dept.name.toLowerCase()}`)}
              >
                <div className="card-overlay">
                  <div className="department-icon">{dept.icon}</div>
                  <h3 className="department-name">{dept.name}</h3>
                  <p className="department-fullname">{dept.fullName}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer Section */}
      <footer className="faculty-footer">
        <Container>
          <Row>
            <Col md={6} className="footer-info">
              <h4>Contact Us</h4>
              <p>Gayatri Vidya Parishad College of Engineering</p>
              <p>Madhurawada, Visakhapatnam</p>
              <p>Andhra Pradesh, India</p>
            </Col>
            <Col md={6} className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/academics">Academics</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </Col>
          </Row>
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Gayatri Vidya Parishad College of Engineering. All Rights Reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default FacultyPage;