import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { AdminLogin } from './pages/admin/AdminLogin.jsx';
import { AdminLayout } from './pages/admin/AdminLayout.jsx';
import { AdminProjects } from './pages/admin/AdminProjects.jsx';
import { AdminMessages } from './pages/admin/AdminMessages.jsx';
import { PrivateRoute } from './components/admin/PrivateRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <HomePage />
          </>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminProjects />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
}
