import { AuthProtectedRoute, HomeLayout } from '@/layouts'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from '@/pages/auth'
import { NotFoundPage } from '@/pages/notfound'
import { PermissionsPage } from '@/pages/permissions'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route element={<AuthProtectedRoute />}>
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/reset-password' element={<ResetPasswordPage />} />
          <Route path='/auth/forgot-password' element={<ForgotPasswordPage />} />
        </Route>

        <Route path='' element={<HomeLayout />}>
          {/* Permissions */}
          <Route path='permissions' element={<PermissionsPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
