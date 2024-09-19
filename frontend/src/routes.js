import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProjectPage from './pages/ProjectPage';
import ProjectDashboard from './pages/ProjectDashboard';
import FundingPage from './pages/FundingPage';
import ExploreProjects from './pages/ExploreProjects';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/explore" element={<ExploreProjects />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/projects/:id" element={<ProjectPage />} />
    <Route path="/projects/dashboard" element={<ProjectDashboard />} />
    <Route path="/projects/fund/:id" element={<FundingPage />} />
  </Routes>
);

export default RoutesConfig;
