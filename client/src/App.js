import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import StudyProjects from './pages/StudyProjects';
import Timer from './pages/Timer';
import PublicTasks from './pages/PublicTasks';
import useAuthenticated from './hooks/useAuthenticated';

function App() {
  const isAuthenticated = useAuthenticated();

  return (
    <Router>
      <div className="home-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/public-tasks" element={<PublicTasks />} />
          {isAuthenticated ? (
            <>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/study-projects" element={<StudyProjects />} />
            </>
          ) : (
            <>
              <Route path="/users/login" element={<Login />} />
              <Route path="/users/register" element={<Register />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
