import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card } from '../components/UI';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
export default function Progress() {
  const [d, setD] = useState(null); const [error, setError] = useState('');
  useEffect(() => { let active = true; const load = async () => { try { const r = await api.get('/dashboard'); if (active) setD(r.data); } catch (e) { if (active) setError(e?.response?.data?.message || (e?.response?.status === 401 ? 'Please log out and log in again; your session may have expired.' : 'Could not load progress. Check that the backend is running and you are logged in.')); } }; void load(); return () => { active = false; }; }, []);
  if (error) return <div><h1 className="text-3xl font-black">Progress</h1><Card className="mt-6 border border-rose-500/30 text-rose-200">{error}<button className="block mt-3 underline" onClick={()=>window.location.reload()}>Retry</button></Card></div>;
  if (!d) return <div className="text-slate-300">Loading progress…</div>;
  const data = Object.entries(d.scores || {}).map(([name,value])=>({name:name[0].toUpperCase()+name.slice(1),value:Number(value)||0}));
  return <div><h1 className="text-3xl font-black">Progress</h1><p className="text-slate-400 mt-1">Your current readiness profile.</p><Card className="mt-6"><div className="h-80">{data.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={data}><XAxis dataKey="name" stroke="#64748b"/><YAxis domain={[0,100]} stroke="#64748b"/><Tooltip contentStyle={{background:'#0f172a',border:'1px solid #334155'}}/><Bar dataKey="value" fill="#8b5cf6" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer> : <div className="h-full grid place-items-center text-slate-500">Complete activities to see your readiness profile.</div>}</div></Card><div className="grid md:grid-cols-4 gap-4 mt-4">{data.map(x=><Card key={x.name}><p className="text-slate-400 text-sm">{x.name}</p><p className="text-3xl font-black mt-2">{x.value}%</p><p className="text-xs text-slate-500 mt-2">{x.value>=75?'Strong':'Keep building'}</p></Card>)}</div></div>;
}
