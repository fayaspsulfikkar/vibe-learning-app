import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Attendance from './pages/Attendance';
import Quiz from './pages/Quiz';
import Account from './pages/Account';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="course" element={<Course />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
