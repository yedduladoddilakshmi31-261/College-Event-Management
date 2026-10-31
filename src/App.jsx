
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Events from './pages/Events'
import Registration from './pages/Registration'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
