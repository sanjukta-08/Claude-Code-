import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './pages/Layout'
import AppLayout from './pages/AppLayout'
import HomePage from './pages/HomePage'
import EmployerPage from './pages/EmployerPage'
import CandidatePage from './pages/CandidatePage'
import UniversitiesPage from './pages/UniversitiesPage'
import GovernmentsPage from './pages/GovernmentsPage'
import NationalsPage from './pages/NationalsPage'
import SpearPage from './pages/SpearPage'
import ManifestoPage from './pages/ManifestoPage'
import SignInPage from './pages/SignInPage'

import ChallengeBoardPage from './pages/app/ChallengeBoardPage'
import ChallengeDetailPage from './pages/app/ChallengeDetailPage'
import SubmitPage from './pages/app/SubmitPage'
import SubmissionPage from './pages/app/SubmissionPage'
import ProfilePage from './pages/app/ProfilePage'

import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import PostChallengePage from './pages/admin/PostChallengePage'
import AdminChallengesPage from './pages/admin/AdminChallengesPage'
import AdminChallengeDetailPage from './pages/admin/AdminChallengeDetailPage'
import TalentPoolPage from './pages/admin/TalentPoolPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Marketing */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

            {/* PRD audience routes */}
            <Route path="/for-builders"     element={<CandidatePage />} />
            <Route path="/for-corporates"   element={<EmployerPage />} />
            <Route path="/for-universities" element={<UniversitiesPage />} />
            <Route path="/for-governments"  element={<GovernmentsPage />} />
            <Route path="/nationals"        element={<NationalsPage />} />
            <Route path="/spear"            element={<SpearPage />} />
            <Route path="/manifesto"        element={<ManifestoPage />} />

            {/* Legacy aliases (back-compat) */}
            <Route path="/employer"  element={<Navigate to="/for-corporates" replace />} />
            <Route path="/candidate" element={<Navigate to="/for-builders" replace />} />
          </Route>

          {/* Auth */}
          <Route path="/signin" element={<SignInPage />} />

          {/* Candidate app */}
          <Route element={<AppLayout requireRole="candidate" />}>
            <Route path="/app/challenges" element={<ChallengeBoardPage />} />
            <Route path="/app/challenges/:id" element={<ChallengeDetailPage />} />
            <Route path="/app/challenges/:id/submit" element={<SubmitPage />} />
            <Route path="/app/submissions/:id" element={<SubmissionPage />} />
            <Route path="/app/me" element={<ProfilePage />} />
          </Route>

          {/* Admin app */}
          <Route element={<AppLayout requireRole="admin" />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/post" element={<PostChallengePage />} />
            <Route path="/admin/challenges" element={<AdminChallengesPage />} />
            <Route path="/admin/challenges/:id" element={<AdminChallengeDetailPage />} />
            <Route path="/admin/talent-pool" element={<TalentPoolPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
