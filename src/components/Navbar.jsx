import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navItem = ({ to, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
      onClick={() => setOpen(false)}
    >
      {label}
    </NavLink>
  )

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-400 grid place-items-center text-white shadow-[0_0_20px_#a21caf80]">
              <Sparkles size={16} />
            </div>
            <span className="text-white font-semibold tracking-wide">Nebula Boost</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItem({ to: '/', label: 'Home' })}
            {navItem({ to: '/services', label: 'Services' })}
            {navItem({ to: '/order', label: 'Order' })}
            {navItem({ to: '/about', label: 'About' })}
          </nav>

          <div className="hidden md:block">
            <Link to="/order" className="px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white text-sm font-semibold shadow-[0_0_20px_#22d3ee40]">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 grid gap-2">
            {navItem({ to: '/', label: 'Home' })}
            {navItem({ to: '/services', label: 'Services' })}
            {navItem({ to: '/order', label: 'Order' })}
            {navItem({ to: '/about', label: 'About' })}
          </div>
        )}
      </div>
    </header>
  )
}
