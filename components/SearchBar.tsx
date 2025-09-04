'use client';

export default function SearchBar({ value, onChange }:{ value:string; onChange:(v:string)=>void }) {
  return (
    <div style={{display:'grid', gap:8}}>
      <label htmlFor="q">Search</label>
      <input id="q" placeholder="Filter by title (e.g., React)" value={value} onChange={e=>onChange(e.target.value)} />
      <div className="small">Tip: use <span className="kbd">/</span> to focus the search.</div>
    </div>
  );
}
