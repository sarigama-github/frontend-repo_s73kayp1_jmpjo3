import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Order from './pages/Order'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-zinc-400 text-sm">
          © {new Date().getFullYear()} Nebula Boost — All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
