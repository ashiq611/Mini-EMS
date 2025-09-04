'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEventStore } from '@/lib/store';
import type { Category, EventItem } from '@/lib/types';
import { categories } from '@/lib/utils';

type FormState = {
  title: string;
  description: string;
  location: string;
  category: Category;
  date: string;
  time: string; 
};

const init: FormState = {
  title: '',
  description: '',
  location: '',
  category: 'Conference',
  date: '',
  time: '',
};

function toISOFromLocal(dateStr: string, timeStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0);
  return dt.toISOString();
}

export default function CreatePage() {
  const [form, setForm] = useState<FormState>(init);
  const [errors, setErrors] = useState<string | null>(null);
  const addEvent = useEventStore((s) => s.addEvent);
  const router = useRouter();

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function onChange<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function validate() {
    const { title, description, location, date, time } = form;
    if (!title || !description || !location || !date || !time) {
      return 'All fields are required (including date & time).';
    }
    const iso = toISOFromLocal(date, time);
    const when = new Date(iso);
    if (isNaN(when.getTime())) return 'Invalid date/time.';
    const now = new Date();
    if (when.getTime() < now.getTime()) return 'Event time must be in the future.';
    return null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrors(err);
      return;
    }

    const ev: EventItem = {
      id: crypto.randomUUID(),
      title: form.title,
      description: form.description,
      location: form.location,
      category: form.category,
      date: toISOFromLocal(form.date, form.time),
      rsvpCount: 0,
      createdBy: 'me',
    };

    addEvent(ev);
    router.push('/myevents');
  }

  return (
    <div>
      <h1>Create Event</h1>
      <form className="card" onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        {errors && (
          <div className="badge" style={{ background: '#3b1a1a', color: '#ffb4b4' }}>
            {errors}
          </div>
        )}

        <div className="row">
          <div>
            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="e.g., Next.js Workshop"
            />
          </div>
          <div>
            <label>Location</label>
            <input
              value={form.location}
              onChange={(e) => onChange('location', e.target.value)}
              placeholder="e.g., Dhaka"
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              min={todayStr}
              onChange={(e) => onChange('date', e.target.value)}
            />
          </div>
          <div>
            <label>Time</label>
            <input
              type="time"
              value={form.time}
              step={900}
              onChange={(e) => onChange('time', e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => onChange('category', e.target.value as Category)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label style={{ visibility: 'hidden' }}>spacer</label>
            <div className="small">Stored in your local time as ISO (UTC) under the hood.</div>
          </div> */}
        </div>

        <div>
          <label>Description</label>
          <textarea
            rows={6}
            value={form.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="What is this event about?"
          />
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit">Create</button>
          <button type="button" className="ghost" onClick={() => setForm(init)}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
