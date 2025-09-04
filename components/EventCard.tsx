'use client';
import Link from 'next/link';
import type { EventItem } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { useEventStore } from '@/lib/store';

export default function EventCard({ ev }: { ev: EventItem }) {
  const rsvp = useEventStore(s=>s.rsvp);
  return (
    <div className="card" style={{display:'grid', gap:8}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3>{ev.title}</h3>
        <span className="badge">{ev.category}</span>
      </div>
      <div className="small">{formatDate(ev.date)} · {ev.location}</div>
      <p style={{color:'#cbd5e1'}}>{ev.description.slice(0,120)}{ev.description.length>120?'…':''}</p>
      <div style={{display:'flex', gap:8, justifyContent:'flex-start', alignItems:'center'}}>
        <Link href={`/events/${ev.id}`}><button className="ghost">View</button></Link>
        <button onClick={()=>rsvp(ev.id)}>RSVP · {ev.rsvpCount||0}</button>
      </div>
    </div>
  );
}
