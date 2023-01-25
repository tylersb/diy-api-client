import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

export default function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </Router>
  )
}
