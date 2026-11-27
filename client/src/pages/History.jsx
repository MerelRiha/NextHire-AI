import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, Badge } from '../components/UI';
export default function History() {
  const [d, setD] = useState(null); const [error, setError] = useState('');
  useEffect(() => { let active = true; const load = async () => { try { const r = await api.get('/history'); if (active) setD(r.data); } catch (e) { if (active) setError(e?.response?.data?.message || (e?.response?.status === 401 ? 'Please log out and log in again; your session may have expired.' : 'Could not load history. Check that the backend is running and you are logged in.')); } }; void load(); return () => { active = false; }; }, []);
  if (error) return <div><h1 className="text-3xl font-black">History</h1><Card className="mt-6 border border-rose-500/30 text-rose-200">{error}<button className="block mt-3 underline" onClick={()=>window.location.reload()}>Retry</button></Card></div>;
  if (!d) return <div className="text-slate-300">Loading history…</div>;
  const sections = [['Resume analyses',d.resume||[],x=>`${x.targetRole} • ${x.score}%`],['Quiz attempts',d.quiz||[],x=>`${x.role} • ${x.total ? Math.round(x.score/x.total*100) : 0}%`],['Coding submissions',d.coding||[],x=>`${x.problemTitle} • ${x.status} • ${x.score}%`],['Interview reports',d.interview||[],x=>`${x.role} • ${x.type} • ${x.overallScore||0}%`]];
  return <div><h1 className="text-3xl font-black">History</h1><p className="text-slate-400 mt-1">Everything you've completed in one place.</p><div className="grid lg:grid-cols-2 gap-4 mt-6">{sections.map(([title,items,label])=><Card key={title}><h2 className="font-bold mb-4">{title}</h2>{items.length?<div className="space-y-3">{items.map((x,i)=><div key={x._id||i} className="flex justify-between gap-3 border-b border-slate-800 pb-3"><div><p>{label(x)}</p><p className="text-xs text-slate-500 mt-1">{x.createdAt ? new Date(x.createdAt).toLocaleString() : ''}</p></div><Badge>Saved</Badge></div>)}</div>:<p className="text-slate-500 text-sm">No records yet.</p>}</Card>)}</div></div>;
}
