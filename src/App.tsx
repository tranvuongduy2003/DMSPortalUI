import {
  AUTH_ROUTE,
  BRANCHES_ROUTE,
  CLASSES_ROUTE,
  PERMISSIONS_ROUTE,
  PITCH_GROUPS_ROUTE,
  PITCHES_ROUTE,
  STUDENTS_ROUTE
} from '@/constants/routes'
import { AuthProtectedRoute, HomeLayout } from '@/layouts'
import { ForgotPasswordPage, LoginPage, ResetPasswordPage } from '@/pages/auth'
import { NotFoundPage } from '@/pages/notfound'
import { PermissionsPage } from '@/pages/permissions'
import { PitchGroupsPage } from '@/pages/pitch-groups'
import { BranchesByPitchGroupPage } from '@/pages/pitch-groups/branches'
import { PitchesByBranchPage } from '@/pages/pitch-groups/branches/pitches'
import { ClassesByPitchPage } from '@/pages/pitch-groups/branches/pitches/classes'
import { StudentsByClassPage } from '@/pages/pitch-groups/branches/pitches/classes/students'
import { StudentsPage } from '@/pages/students'
import { CreateStudentPage } from '@/pages/students/create'
import { UpdateStudentPage } from '@/pages/students/update'
import { Route, Routes } from 'react-router-dom'

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
          {/* PitchGroups */}
          <Route path={PITCH_GROUPS_ROUTE} element={<PitchGroupsPage />} />
          <Route
            path={`${PITCH_GROUPS_ROUTE}/:pitchGroupId/${BRANCHES_ROUTE}`}
            element={<BranchesByPitchGroupPage />}
          />
          <Route
            path={`${PITCH_GROUPS_ROUTE}/:pitchGroupId/${BRANCHES_ROUTE}/:branchId/${PITCHES_ROUTE}`}
            element={<PitchesByBranchPage />}
          />
          <Route
            path={`${PITCH_GROUPS_ROUTE}/:pitchGroupId/${BRANCHES_ROUTE}/:branchId/${PITCHES_ROUTE}/:pitchId/${CLASSES_ROUTE}`}
            element={<ClassesByPitchPage />}
          />
          <Route
            path={`${PITCH_GROUPS_ROUTE}/:pitchGroupId/${BRANCHES_ROUTE}/:branchId/${PITCHES_ROUTE}/:pitchId/${CLASSES_ROUTE}/:classId/${STUDENTS_ROUTE}`}
            element={<StudentsByClassPage />}
          />
          {/* Students */}
          <Route path={STUDENTS_ROUTE} element={<StudentsPage />} />
          <Route path={`${STUDENTS_ROUTE}/create`} element={<CreateStudentPage />} />
          <Route path={`${STUDENTS_ROUTE}/:studentId`} element={<UpdateStudentPage />} />
          {/* Permissions */}
          <Route path={PERMISSIONS_ROUTE} element={<PermissionsPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
