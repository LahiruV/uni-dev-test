import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { store } from './store/store'
import { AdminLayout } from './layouts/AdminLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { UserLayout } from './layouts/UserLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLogin } from './pages/Admin/AdminLogin'
import { AdminRegister } from './pages/Admin/AdminRegister'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { AuthProvider } from './contexts/AuthContext'
import { Login } from './pages/User/Login'
import { Register } from './pages/User/Register'
import { Home } from './pages/User/Home'
import { Feedback } from './pages/User/Feedback'
import { Inquiry } from './pages/User/Inquiry'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Toaster position="top-right" richColors />
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* User Routes */}
              <Route element={
                <ProtectedRoute>
                  <UserLayout />
                </ProtectedRoute>
              }>
                <Route path="/" element={<Home />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/inquiry" element={<Inquiry />} />
              </Route>
            </Routes>
          </Router>
          <ReactQueryDevtools />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App