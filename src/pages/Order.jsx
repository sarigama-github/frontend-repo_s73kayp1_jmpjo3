import { useState } from 'react'

const GAMES = ['Genshin Impact','Honkai: Star Rail','Other']
const SERVICES = [
  { key:'exploration', name:'Exploration' },
  { key:'spiral_abyss', name:'Spiral Abyss' },
  { key:'leveling', name:'Leveling' },
  { key:'farming', name:'Farming' },
  { key:'boss_runs', name:'Boss Runs' },
]

export default function Order(){
  const [form,setForm] = useState({ game:GAMES[0], service:SERVICES[0].key, quantity:1, priority:false, streaming:false, region:'', username:'', note:'', contact_email:'', contact_discord:'' })
  const [loading,setLoading] = useState(false)
  const [result,setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onChange = (k,v)=> setForm(prev=>({...prev,[k]:v}))

  const estimate = async()=>{
    const r = await fetch(`${baseUrl}/api/calculate`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ service:form.service, quantity:form.quantity, priority:form.priority, streaming:form.streaming })})
    const d = await r.json();
    return d.total
  }

  const submit = async(e)=>{
    e.preventDefault(); setLoading(true); setResult(null)
    try{
      const price_estimate = await estimate()
      const r = await fetch(`${baseUrl}/api/orders`,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, price_estimate, game: form.game })})
      const d = await r.json();
      setResult({ ok:true, id:d.id, price: price_estimate })
    }catch(err){
      setResult({ ok:false, error: err.message })
    } finally{ setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold">Order Boost</h1>
        <p className="text-zinc-400 mt-2">Submit your request. We will contact you shortly.</p>

        <form onSubmit={submit} className="mt-8 grid gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Game</label>
              <select value={form.game} onChange={e=>onChange('game', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2">
                {GAMES.map(g=> <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Service</label>
              <select value={form.service} onChange={e=>onChange('service', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2">
                {SERVICES.map(s=> <option key={s.key} value={s.key}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Quantity</label>
              <input type="number" min="1" value={form.quantity} onChange={e=>onChange('quantity', parseInt(e.target.value)||1)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" />
            </div>
            <label className="flex items-center gap-2 mt-6"><input type="checkbox" checked={form.priority} onChange={e=>onChange('priority', e.target.checked)} /><span>Priority</span></label>
            <label className="flex items-center gap-2 mt-6"><input type="checkbox" checked={form.streaming} onChange={e=>onChange('streaming', e.target.checked)} /><span>Streaming</span></label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Region</label>
              <input value={form.region} onChange={e=>onChange('region', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" placeholder="e.g., NA / EU / Asia" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Account Username / UID</label>
              <input value={form.username} onChange={e=>onChange('username', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" placeholder="We will never share your info" />
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Notes</label>
            <textarea value={form.note} onChange={e=>onChange('note', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" rows="4" placeholder="Any specifics? Times available, characters to use, etc." />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-zinc-400">Email</label>
              <input type="email" value={form.contact_email} onChange={e=>onChange('contact_email', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" placeholder="name@example.com" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Discord</label>
              <input value={form.contact_discord} onChange={e=>onChange('contact_discord', e.target.value)} className="mt-1 w-full bg-black/40 border border-white/10 rounded px-3 py-2" placeholder="username#0000" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button disabled={loading} className="px-5 py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-cyan-500 font-semibold disabled:opacity-50">{loading ? 'Submitting...' : 'Submit Order'}</button>
            {result && (result.ok ? (
              <p className="text-green-400">Order received! ID: {result.id} • Est. ${result.price.toFixed(2)}</p>
            ) : (
              <p className="text-red-400">Error: {result.error}</p>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
