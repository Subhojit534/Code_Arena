import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import AdminLogin from './pages/admin-login';
import StudentLoginRegistration from './pages/student-login-registration';
import TestCaseManagement from './pages/test-case-management';
import ProblemManagement from './pages/problem-management';
import CodingInterface from './pages/coding-interface';
import StudentProfile from './pages/student-profile';
import StudentDashboard from './pages/student-dashboard';
import Leaderboard from './pages/leaderboard';
import TestConnection from './pages/TestConnection';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your route here */}
                    <Route path="/" element={<StudentLoginRegistration />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin/leaderboard" element={<Leaderboard />} />
                    <Route path="/student-login-registration" element={<StudentLoginRegistration />} />
                    <Route path="/test-case-management" element={<TestCaseManagement />} />
                    <Route path="/problem-management" element={<ProblemManagement />} />
                    <Route path="/coding-interface" element={<CodingInterface />} />
                    <Route path="/student-profile" element={<StudentProfile />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/test" element={<TestConnection />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
