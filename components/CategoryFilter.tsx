'use client';
import { categories } from '@/lib/utils';

export default function CategoryFilter({ value, onChange }:{ value:string; onChange:(v:string)=>void }) {
  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <label htmlFor="cat">Category</label>
      <select id="cat" value={value} onChange={e=>onChange(e.target.value)}>
        <option value="">All</option>
        {categories.map(c=> <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
