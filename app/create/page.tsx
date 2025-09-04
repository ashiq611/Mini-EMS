'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import type { Category, EventItem } from '@/lib/types';
import { categories } from '@/lib/utils';

const init = {
  title: '', description: '', date: '', location: '', category: 'Conference' as Category
}

export default function CreatePage() {
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState<string | null>(null);
  const addEvent = useEventStore(s=>s.addEvent);
  const router = useRouter();

  function onChange<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function validate() {
    const { title, description, date, location } = form;
    if (!title || !description || !date || !location) return "All fields are required.";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date.";
    return null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setErrors(err); return; }
    const ev: EventItem = {
      id: crypto.randomUUID(),
      ...form,
      rsvpCount: 0,
      createdBy: 'me'
    };
    addEvent(ev);
    router.push('/myevents');
  }

  return (
    <div>
      <h1>Create Event</h1>
      <form className="card" onSubmit={onSubmit} style={{display:'grid', gap:10}}>
        {errors && <div className="badge" style={{background:'#3b1a1a', color:'#ffb4b4'}}>{errors}</div>}
        <div className="row">
          <div>
            <label>Title</label>
            <input value={form.title} onChange={e=>onChange('title', e.target.value)} placeholder="e.g., Next.js Workshop" />
          </div>
          <div>
            <label>Location</label>
            <input value={form.location} onChange={e=>onChange('location', e.target.value)} placeholder="e.g., Dhaka" />
          </div>
        </div>
        <div className="row">
          <div>
            <label>Date & Time</label>
            <input type="datetime-local" value={form.date} onChange={e=>onChange('date', e.target.value)} />
          </div>
          <div>
            <label>Category</label>
            <select value={form.category} onChange={e=>onChange('category', e.target.value as Category)}>
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label>Description</label>
          <textarea rows={6} value={form.description} onChange={e=>onChange('description', e.target.value)} placeholder="What is this event about?" />
        </div>
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Create</button>
          <button type="button" className="ghost" onClick={()=>setForm(init)}>Reset</button>
        </div>
      </form>
    </div>
  );
}
