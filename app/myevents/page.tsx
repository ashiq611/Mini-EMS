'use client';
import { useEffect, useMemo, useState } from 'react';
import { useEventStore } from '@/lib/store';
import type { EventItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function MyEventsPage() {
  const { events, loadFromApi, deleteEvent, editEvent } = useEventStore();
  const [editing, setEditing] = useState<string|null>(null);
  const [draft, setDraft] = useState<Partial<EventItem>>({});

  useEffect(()=>{ loadFromApi(); }, [loadFromApi]);

  const mine = useMemo(()=> events.filter(e => e.createdBy === 'me'), [events]);

  function onSave(id: string) {
    editEvent(id, draft);
    setEditing(null);
    setDraft({});
  }

  if (mine.length === 0) {
    return <p>You haven't created any events yet.</p>;
  }

  return (
    <div style={{display:'grid', gap:16}}>
      <h1>My Events</h1>
      <div className="grid">
        {mine.map(ev => (
          <div key={ev.id} className="card" style={{display:'grid', gap:8}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h3>{ev.title}</h3>
              <span className="badge">{ev.category}</span>
            </div>
            <div className="small">{formatDate(ev.date)} · {ev.location}</div>
            <p style={{color:'#cbd5e1'}}>{ev.description}</p>
            {editing === ev.id ? (
              <div style={{display:'grid', gap:8}}>
                <input placeholder="Title" defaultValue={ev.title} onChange={e=>setDraft(d=>({...d, title: e.target.value}))} />
                <input placeholder="Location" defaultValue={ev.location} onChange={e=>setDraft(d=>({...d, location: e.target.value}))} />
                <textarea rows={4} placeholder="Description" defaultValue={ev.description} onChange={e=>setDraft(d=>({...d, description: e.target.value}))} />
                <div style={{display:'flex', gap:8}}>
                  <button onClick={()=>onSave(ev.id)}>Save</button>
                  <button className="ghost" onClick={()=>{ setEditing(null); setDraft({}); }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{display:'flex', gap:8}}>
                <button onClick={()=>setEditing(ev.id)}>Edit</button>
                <button className="ghost" onClick={()=>deleteEvent(ev.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
