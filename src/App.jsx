import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import EmployerPage from './pages/EmployerPage'
import CandidatePage from './pages/CandidatePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employer" element={<EmployerPage />} />
          <Route path="/candidate" element={<CandidatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
