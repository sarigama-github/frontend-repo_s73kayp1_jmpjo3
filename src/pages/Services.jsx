import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const SERVICES = [
  { key:'exploration', name:'Exploration', unit:'per 10%', base:5 },
  { key:'spiral_abyss', name:'Spiral Abyss', unit:'per floor', base:12 },
  { key:'leveling', name:'Leveling', unit:'per level', base:3.5 },
  { key:'farming', name:'Farming', unit:'per hour', base:8 },
  { key:'boss_runs', name:'Boss Runs', unit:'per run', base:6 },
]

export default function Services(){
  const [selected,setSelected] = useState(SERVICES[0])
  const [qty,setQty] = useState(1)
  const [priority,setPriority] = useState(false)
  const [streaming,setStreaming] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const estimate = useMemo(()=>({ base_price: selected.base*qty, addons:(streaming?3:0), total: (selected.base*qty*(priority?1.25:1)) + (streaming?3:0) }),[selected,qty,priority,streaming])

  const remoteCalc = async()=>{
    const r = await fetch(`${baseUrl}/api/calculate`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ service:selected.key, quantity:qty, priority, streaming })})
    const d = await r.json();
    alert(`Backend estimate: $${d.total}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold">Services & Pricing</h1>
        <p className="text-zinc-400 mt-2">Choose a boost and get an instant estimate.</p>

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {SERVICES.map(s => (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={s.key} onClick={()=>setSelected(s)} className={`text-left p-5 rounded-xl border ${selected.key===s.key ? 'border-cyan-400 bg-white/10' : 'border-white/10 bg-white/5'} hover:bg-white/10`}>
                <p className="text-xl font-semibold">{s.name}</p>
                <p className="text-zinc-400">{s.unit}</p>
                <p className="mt-2 text-cyan-400 font-bold">${s.base.toFixed(2)}</p>
              </motion.button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold">Pricing Calculator</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-zinc-400">Quantity</label>
                <input type="number" min="1" value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-400">Priority</label>
                <input type="checkbox" checked={priority} onChange={e=>setPriority(e.target.checked)} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-zinc-400">Streaming</label>
                <input type="checkbox" checked={streaming} onChange={e=>setStreaming(e.target.checked)} />
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-zinc-400">Estimate</p>
                <p className="text-3xl font-extrabold">${estimate.total.toFixed(2)}</p>
                <p className="text-xs text-zinc-500">Base ${estimate.base_price.toFixed(2)} + Addons ${estimate.addons.toFixed(2)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={remoteCalc} className="px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-semibold">Confirm via API</button>
                <a href="/order" className="px-4 py-2 rounded-md bg-white/10 border border-white/10 text-center">Order Now</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
