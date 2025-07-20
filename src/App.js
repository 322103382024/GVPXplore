import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Navbar from './components/Navbar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import Attendances from './components/Student/Attendances';

import StudentPage from './components/Student/StudentPage';
import StudentTodoPage from './components/LoginSystem/StudentTodoPage';

import Administration from './components/Administration/AdministrationPage'; 
import RegulationAndSyllabiPage from './components/Regulation_and_Syllabi/RegulationAndSyllabiPage';

import DepartmentMain from './components/Department_Details/DepartmentMain';
import ChemicalEngineering from './components/Department_Details/departments/ChemicalEngineering';
import ComputerEngineering from './components/Department_Details/departments/ComputerEngineering';
import CivilEngineering from './components/Department_Details/departments/CivilEngineering';
import ElectronicsCommunication from './components/Department_Details/departments/ElectronicsCommunication';

import ClubMain from './components/Clubs/ClubMain';
import CSClub from './components/Clubs/CSClub';
import IEEEClub from './components/Clubs/IEEEClub';
import DSClub from './components/Clubs/DSClub';
import AIMLClub from './components/Clubs/AIMLClub';
import RotaractClub from './components/Clubs/RotaractClub';
import WeRForHelpClub from './components/Clubs/WeRForHelpClub';
import NSSClub from './components/Clubs/NSSClub';

import LibraryPage from './components/Library/LibraryPage'; 

import LoginPage from './components/LoginSystem/LoginPage';
import FacultyLogin from './components/LoginSystem/FacultyLogin';
import FacultyRegister from './components/LoginSystem/FacultyRegister';
import StudentLogin from './components/LoginSystem/StudentLogin';
import StudentRegister from './components/LoginSystem/StudentRegister';

import FacultyPage from './components/Faculty_Details/FacultyPage';
import DepartmentPage from './components/Faculty_Details/DepartmentPage';
import FacultyPortfolio from './components/Faculty_Details/FacultyPortfolio';
import FacultyPortal from './components/LoginSystem/FacultyPortal';


import SubjectDashboard from './components/LoginSystem/SubjectDashboard';
import AttendancePage from './components/LoginSystem/AttendancePage';
import MarksPage from './components/LoginSystem/MarksPage';
import MaterialPage from './components/LoginSystem/MaterialPage';
import TasksPage from './components/LoginSystem/TasksPage';

import AcademicCalendar from './components/Academic_Calendar/Academic_Calendar';

import Timetable from './components/Timetables/Timetable';

import Payment from './components/Payment/Payment';

import HostelOverview from './components/Hostel/HostelOverview';
import HostelDetailsForm from './components/Hostel/HostelDetailsForm';
import WardenTable from './components/Hostel/WardenTable';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-container">
        <Header />
        <Navbar />
        <div className="main-layout">
          <LeftSidebar />

          <main className="main-content-area">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/student-portal" element={<StudentPage />} />
              {/* <Route path="/student/todo" element={<StudentTodoPage />} /> */}
              <Route path="/administration" element={<Administration />} />
              <Route path="/regulation-syllabi" element={<RegulationAndSyllabiPage />} />

              {/* Departments */}
              <Route path="/departments" element={<DepartmentMain />} />
              <Route path="/departments/chemical" element={<ChemicalEngineering />} />
              <Route path="/departments/computer" element={<ComputerEngineering />} />
              <Route path="/departments/civil" element={<CivilEngineering />} />
              <Route path="/departments/ece" element={<ElectronicsCommunication />} />

              {/* Clubs */}
              <Route path="/clubs" element={<ClubMain />} />
              <Route path="/clubs/cs" element={<CSClub />} />
              <Route path="/clubs/ieee" element={<IEEEClub />} />
              <Route path="/clubs/ds" element={<DSClub />} />
              <Route path="/clubs/aiml" element={<AIMLClub />} />
              <Route path="/clubs/rotaract" element={<RotaractClub />} />
              <Route path="/clubs/werforhelp" element={<WeRForHelpClub />} />
              <Route path="/clubs/nss" element={<NSSClub />} />

              {/* Library */}
              <Route path="/library" element={<LibraryPage />} /> 

              {/* Login System */}
              <Route path="/login-page" element={<LoginPage />} />
              <Route path="/faculty-login" element={<FacultyLogin />} />
              <Route path="/faculty-register" element={<FacultyRegister />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/student-register" element={<StudentRegister />} />

              {/* Faculty Details */}
              <Route path="/faculty" element={<FacultyPage />} />
              <Route path="/department/:dept" element={<DepartmentPage />} />
              <Route path="/portfolio/:id" element={<FacultyPortfolio />} />

              {/* Faculty Portal & Subject Pages */}
              <Route path="/faculty-portal" element={<FacultyPortal />} />
              <Route path="/faculty-portal/:subjectId" element={<SubjectDashboard />} />
              <Route path="/faculty-portal/:subjectId/attendance" element={<AttendancePage />} />
              <Route path="/faculty-portal/:subjectId/marks" element={<MarksPage />} />
              <Route path="/faculty-portal/:subjectId/materials" element={<MaterialPage />} />
              <Route path="/faculty-portal/:subjectId/tasks" element={<TasksPage />} />

              <Route path="/student-portal/attendance" element={<Attendances/>}/>


              {/* Academic Calendar */}
              <Route path="/academic-calendar" element={<AcademicCalendar />} />
              
              {/* Timetable */}
              <Route path="/exams" element={<Timetable />} />
              
              {/* Fee Payment */}
              <Route path="/fees" element={<Payment />} /> 

              {/* Hostel */}
              <Route path="/hostel" element={<HostelOverview />} />
              <Route path="/hostel/:hostelId" element={<HostelDetailsForm />} />
              <Route path="/warden/:hostelId" element={<WardenTable />} />

              {/* 404 */}
              <Route path="*" element={<h2 style={{ padding: '2rem' }}>Page Not Found</h2>} />
            </Routes>
          </main>

          <RightSidebar />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;