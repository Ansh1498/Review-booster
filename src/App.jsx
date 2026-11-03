import { Routes, Route } from 'react-router-dom'
import FeedbackPage from './pages/FeedbackPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/c/:slug" element={<FeedbackPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}