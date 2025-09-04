'use client';
import { useEffect, useMemo, useState } from 'react';
import { useEventStore } from '@/lib/store';
import EventCard from '@/components/EventCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import type { EventItem } from '@/lib/types';
import LoadingEventsRaw from '@/components/LoadingEventsRaw';
import EmptyResults from '@/components/EmptyResults';

export default function HomePage() {
  const { events, loadFromApi, loaded } = useEventStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');

  useEffect(() => { loadFromApi(); }, [loadFromApi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        const input = document.getElementById('q') as HTMLInputElement | null;
        input?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = useMemo(() => {
    const key = q.toLowerCase().trim();
    return (events || [])
      .filter(ev => (cat ? ev.category === cat : true))
      .filter(ev => (key ? ev.title.toLowerCase().includes(key) : true))
      .sort((a: EventItem, b: EventItem) => a.date.localeCompare(b.date));
  }, [events, q, cat]);

  const onClear = () => { setQ(''); setCat('') };

  return (
    <div style={{display:'grid', gap:16}}>
      <h1>Upcoming Events</h1>
      <div className="filters">
        <div className="card card--fill">

        <SearchBar value={q} onChange={setQ} />
        </div>
        <div className="card card--fill">

        <CategoryFilter value={cat} onChange={setCat} />
        </div>
      </div>
      {!loaded ? <LoadingEventsRaw />  :
        filtered.length === 0 ? <EmptyResults
        q={q}
        cat={cat}
        onClear={onClear}
      /> :
        <div className="grid">
          {filtered.map(ev => <EventCard key={ev.id} ev={ev} />)}
        </div>
      }
    </div>
  );
}
