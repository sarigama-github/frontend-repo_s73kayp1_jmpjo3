import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Star, Zap, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Trusted, fast, and affordable boosting
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-lg text-zinc-300">
              Genshin Impact, Honkai: Star Rail, and more. Top-tier pilots, zero compromise on safety.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="px-5 py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-semibold shadow-[0_0_30px_#22d3ee50]">Explore Services</Link>
              <Link to="/order" className="px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/20">Order Now</Link>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[{icon:Shield, title:'Trusted'}, {icon:Zap, title:'Fast'}, {icon:Star, title:'Affordable'}].map((f,i)=> (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i*0.05 }} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                  <div className="flex items-center gap-3">
                    {f.icon && <f.icon className="text-cyan-400" size={20} />}
                    <p className="font-medium">{f.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">What players say</h2>
          <p className="text-zinc-400 mt-2">Real reviews from happy customers</p>
          <Testimonials />
        </div>
      </section>
    </div>
  )
}

import { useEffect, useState } from 'react'
function Testimonials(){
  const [items,setItems]=useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  useEffect(()=>{(async()=>{
    try{ const r= await fetch(`${baseUrl}/api/testimonials`); const d= await r.json(); setItems(d)}catch(e){ setItems([])}
  })()},[])
  return (
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((t,idx)=> (
        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{t.name}</p>
            <div className="flex gap-1 text-yellow-400">{'★★★★★'.slice(0,t.rating)}</div>
          </div>
          <p className="text-sm text-zinc-400 mt-1">{t.game}</p>
          <p className="mt-3 text-zinc-200">{t.comment}</p>
        </div>
      ))}
      {items.length===0 && (
        <div className="text-zinc-400">No testimonials yet.</div>
      )}
    </div>
  )
}
