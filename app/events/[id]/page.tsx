'use client';
import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import { formatDate } from '@/lib/utils';

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { events, loadFromApi, rsvp } = useEventStore();

  useEffect(()=>{ loadFromApi(); }, [loadFromApi]);

  const ev = useMemo(()=> events.find(e => e.id === params.id), [events, params.id]);

  if (!ev) {
    return (
      <div className="card">
        <p>Event not found.</p>
        <button className="ghost" onClick={()=>router.push('/')}>Back</button>
      </div>
    );
  }

  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>{ev.title}</h1>
        <span className="badge">{ev.category}</span>
      </div>
      <div className="small">{formatDate(ev.date)} · {ev.location}</div>
      <p style={{color:'#cbd5e1', whiteSpace:'pre-wrap'}}>{ev.description}</p>
      <div style={{display:'flex', gap:8}}>
        <button onClick={()=>rsvp(ev.id)}>RSVP · {ev.rsvpCount||0}</button>
        <button className="ghost" onClick={()=>router.back()}>Back</button>
      </div>
    </div>
  );
}
