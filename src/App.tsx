import {
  ADMINISTRATION_ROUTE,
  AUTH_ROUTE,
  BRANCHES_ROUTE,
  CLASSES_ROUTE,
  PERMISSIONS_ROUTE,
  PITCH_GROUPS_ROUTE,
  PITCHES_ROUTE,
  STUDENTS_ROUTE,
  USERS_ROUTE
} from '@/constants/routes'
import { AuthProtectedRoute, HomeLayout } from '@/layouts'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from '@/pages/auth'
import { NotFoundPage } from '@/pages/notfound'
import { PermissionsPage } from '@/pages/permissions'
import { PitchGroupsPage } from '@/pages/pitch-groups'
import { BranchesByPitchGroupPage } from '@/pages/branches'
import { PitchesByBranchPage } from '@/pages/pitches'
import { ClassesByPitchPage } from '@/pages/classes'
import { StudentsByClassPage } from '@/pages/classes/students'
import { StudentsPage } from '@/pages/students'
import { CreateStudentPage } from '@/pages/students/create'
import { UpdateStudentPage } from '@/pages/students/update'
import { Navigate, Route, Routes } from 'react-router-dom'
import UsersPage from './pages/users'

function App() {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route element={<AuthProtectedRoute />}>
          <Route path={`/${AUTH_ROUTE}/login`} element={<LoginPage />} />
          <Route path={`/${AUTH_ROUTE}/reset-password`} element={<ResetPasswordPage />} />
          <Route path={`/${AUTH_ROUTE}/forgot-password`} element={<ForgotPasswordPage />} />
        </Route>

        <Route path='' element={<HomeLayout />}>
          {/* Adnministration */}
          <Route path={ADMINISTRATION_ROUTE} element={<Navigate to={PITCH_GROUPS_ROUTE} />} />
          <Route path={`${ADMINISTRATION_ROUTE}/${PITCH_GROUPS_ROUTE}`} element={<PitchGroupsPage />} />
          <Route
            path={`${ADMINISTRATION_ROUTE}/${PITCH_GROUPS_ROUTE}/:pitchGroupId/${BRANCHES_ROUTE}`}
            element={<BranchesByPitchGroupPage />}
          />
          <Route
            path={`${ADMINISTRATION_ROUTE}/${BRANCHES_ROUTE}/:branchId/${PITCHES_ROUTE}`}
            element={<PitchesByBranchPage />}
          />
          <Route
            path={`${ADMINISTRATION_ROUTE}/${PITCHES_ROUTE}/:pitchId/${CLASSES_ROUTE}`}
            element={<ClassesByPitchPage />}
          />
          <Route
            path={`${ADMINISTRATION_ROUTE}/${CLASSES_ROUTE}/:classId/${STUDENTS_ROUTE}`}
            element={<StudentsByClassPage />}
          />

          {/* Students */}
          <Route path={STUDENTS_ROUTE} element={<StudentsPage />} />
          <Route path={`${STUDENTS_ROUTE}/create`} element={<CreateStudentPage />} />
          <Route path={`${STUDENTS_ROUTE}/:studentId`} element={<UpdateStudentPage />} />

          {/* Users */}
          <Route path={USERS_ROUTE} element={<UsersPage />} />

          {/* Permissions */}
          <Route path={PERMISSIONS_ROUTE} element={<PermissionsPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
