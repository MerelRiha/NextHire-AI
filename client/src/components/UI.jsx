export function Card({children,className=''})
{return <div className={`glass rounded-2xl p-5 ${className}`}>
    {children}</div>} 
    
export function Button({children,variant='primary',...p})
{return <button {...p} className={`rounded-xl px-4 py-2.5 font-semibold transition ${variant==='primary'?'bg-violet-600 hover:bg-violet-500 text-white':'bg-slate-800 hover:bg-slate-700 text-slate-200'} disabled:opacity-50`}>{children}</button>} 
export function Badge({children})
{return <span className="px-2.5 py-1 rounded-full text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20">{children}</span>}
