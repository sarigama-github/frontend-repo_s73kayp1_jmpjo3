import { Users, ShieldCheck, Clock, Trophy } from 'lucide-react'

export default function About(){
  const perks = [
    { icon: ShieldCheck, title: 'Account Safety', desc: 'Secure, VPN-matched, and never shared.' },
    { icon: Clock, title: '24/7 Availability', desc: 'Global team ready across time zones.' },
    { icon: Trophy, title: 'Top-tier Pilots', desc: 'Experienced players with proven records.' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold">Meet the Team</h1>
        <p className="text-zinc-400 mt-2 max-w-2xl">We are a collective of veteran gamers delivering premium, safe, and efficient account services. Transparent communication and fair pricing guide everything we do.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {perks.map((p, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <p className="text-xl font-semibold flex items-center gap-2"><p><p className="sr-only">icon</p></p>{p.title}</p>
              <p className="text-zinc-400 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
