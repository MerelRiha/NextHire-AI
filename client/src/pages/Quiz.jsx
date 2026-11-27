import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Button, Card, Badge } from '../components/UI';

const errorText = (err) => err?.response?.data?.message || (err?.response?.status === 401 ? 'Your session expired. Please log out and log in again.' : 'Could not load quiz data. Make sure the backend is running and you are logged in.');

export default function Quiz() {
  const [role, setRole] = useState('Software Developer');
  const [difficulty, setDifficulty] = useState('Medium');
  const [qs, setQs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true); setError('');
    try {
      const r = await api.get(`/quiz/questions?role=${encodeURIComponent(role)}&difficulty=${difficulty}`);
      setQs(r.data.questions || []); setAnswers({}); setResult(null);
    } catch (err) { setError(errorText(err)); }
    finally { setLoading(false); }
  };

  // Never return the Promise from an effect; React expects only a cleanup function.
  useEffect(() => { void load(); }, []);

  const submit = async () => {
    setSubmitting(true); setError('');
    try {
      const r = await api.post('/quiz/attempts', { role, difficulty, answers: Object.entries(answers).map(([questionId, selected]) => ({ questionId, selected })) });
      setResult(r.data.attempt);
    } catch (err) { setError(errorText(err)); }
    finally { setSubmitting(false); }
  };

  return <div>
    <div className="flex flex-col md:flex-row md:justify-between md:items-end"><div><h1 className="text-3xl font-black">Technical Quiz</h1><p className="text-slate-400 mt-1">Local question bank, personalized by role and difficulty.</p></div><div className="flex flex-wrap gap-2 mt-4 md:mt-0"><select value={role} onChange={e=>setRole(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2"><option>Software Developer</option><option>Frontend Developer</option><option>Backend Developer</option><option>Data Analyst</option></select><select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2"><option>Easy</option><option>Medium</option><option>Hard</option></select><Button onClick={load} variant="secondary" disabled={loading}>{loading ? 'Loading…' : 'New quiz'}</Button></div></div>
    {error && <div role="alert" className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">{error}</div>}
    {loading && !qs.length ? <Card className="mt-6 text-slate-300">Loading quiz questions…</Card> : result ? <Card className="mt-6 text-center"><p className="text-slate-400">Attempt saved</p><div className="text-6xl font-black gradient-text mt-2">{result.total ? Math.round(result.score/result.total*100) : 0}%</div><p className="mt-2">{result.score}/{result.total} correct</p><div className="grid md:grid-cols-2 gap-3 text-left mt-6">{(result.answers || []).map((a,i)=><div className="bg-slate-900 rounded-xl p-4" key={i}><p className="font-medium">{a.selected===a.correct?'✓':'✗'} {a.selected||'Not answered'}</p><p className="text-sm text-slate-400 mt-1">Correct: {a.correct}</p><p className="text-sm text-slate-500 mt-1">{a.explanation}</p></div>)}</div><Button className="mt-6" onClick={load} disabled={loading}>Try again</Button></Card> : <div className="space-y-4 mt-6">{qs.map((q,i)=><Card key={q.id}><div className="flex justify-between"><Badge>{q.topic} • {difficulty}</Badge><span className="text-sm text-slate-500">Q{i+1}/{qs.length}</span></div><h2 className="font-bold text-lg mt-4">{q.q}</h2><div className="grid md:grid-cols-2 gap-2 mt-4">{(q.options || []).map(o=><button key={o} onClick={()=>setAnswers({...answers,[q.id]:o})} className={`text-left p-3 rounded-xl border ${answers[q.id]===o?'border-violet-500 bg-violet-500/10':'border-slate-700 bg-slate-900 hover:border-slate-600'}`}>{o}</button>)}</div></Card>)}{!qs.length && !error && <Card className="text-slate-400">No questions were returned. Try another difficulty.</Card>}<Button onClick={submit} disabled={!qs.length || submitting}>{submitting ? 'Submitting…' : 'Submit quiz'}</Button></div>}
  </div>;
}
