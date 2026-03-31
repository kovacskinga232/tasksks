import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import TaskListPage from './pages/task/TaskListPage';
import TaskDetailPage from './pages/task/TaskDetailPage';
import TaskFormPage from './pages/task/TaskFormPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import { AuthProvider, useAuth } from './store/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { ThemeProvider } from './store/ThemeContext';
import UserDetailPage from './pages/admin/UserDetailPage';
import ProjectListPage from './pages/project/ProjectListPage';
import ProjectFormPage from './pages/project/ProjectFormPage';
import ProjectDetailPage from './pages/project/ProjectDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000 },
  },
});

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            {currentUser?.role === 'ROLE_ADMIN' ? (
              <>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/users/:id" element={<UserDetailPage />} />
                <Route path="/*" element={<Navigate to="/admin" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/tasks" replace />} />
                <Route path="/tasks" element={<TaskListPage />} />
                <Route path="/tasks/:id" element={<TaskDetailPage />} />
                <Route path="/tasks/new" element={<TaskFormPage />} />
                <Route path="/tasks/:id/edit" element={<TaskFormPage />} />

                <Route path="/projects" element={<ProjectListPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/projects/new" element={<ProjectFormPage />} />
                <Route path="/projects/:id/edit" element={<ProjectFormPage />} />
              </>
            )}
          </Route>

          <Route path="/*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
