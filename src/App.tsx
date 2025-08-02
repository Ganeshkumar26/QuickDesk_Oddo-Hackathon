import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTicket from './components/Tickets/CreateTicket';
import TicketDetail from './components/Tickets/TicketDetail';
import UserManagement from './components/Admin/UserManagement';
import CategoryManagement from './components/Admin/CategoryManagement';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Navigate to="/dashboard" replace />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/tickets" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/all-tickets" element={
        <ProtectedRoute requiredRoles={['admin', 'agent']}>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/create-ticket" element={
        <ProtectedRoute>
          <Layout>
            <CreateTicket />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/ticket/:id" element={
        <ProtectedRoute>
          <Layout>
            <TicketDetail />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/users" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <Layout>
            <UserManagement />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/categories" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <Layout>
            <CategoryManagement />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/agents" element={
        <ProtectedRoute requiredRoles={['admin']}>
          <Layout>
            <UserManagement />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;