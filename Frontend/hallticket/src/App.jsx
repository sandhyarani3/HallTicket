import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Form from './Componenents/Form'
import GenerateHallticket from "./Componenents/GenerateHallticket";
function App() {
 
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/generate-hallticket" element={<GenerateHallticket />} />
    </Routes>
  </Router>
  )
}

export default App
