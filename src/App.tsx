import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import MushroomWebsite from './MushroomWebsite'
import FarmMd2Financials from './farm-md2-financials'

function Md2Page() {
  const navigate = useNavigate()
  return (
    <>
      <button
        onClick={() => navigate('/')}
        style={{ position: 'fixed', top: 12, left: 12, zIndex: 1000, background: '#166534', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}
      >
        ← Back
      </button>
      <FarmMd2Financials />
    </>
  )
}

function HomeWrapper() {
  return <MushroomWebsite />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/md2" element={<Md2Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
