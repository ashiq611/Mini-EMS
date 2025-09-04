'use client';
import { create } from 'zustand';
import type { EventItem } from './types';

type State = {
  events: EventItem[];
  loaded: boolean;
  loadFromApi: () => Promise<void>;
  addEvent: (e: EventItem) => void;
  editEvent: (id: string, patch: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;
  rsvp: (id: string) => void;
};

const LOCAL_KEY = 'my-events';

function getMyEvents(): EventItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]') as EventItem[]; }
  catch { return []; }
}

function setMyEvents(events: EventItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(events));
}

export const useEventStore = create<State>((set, get) => ({
  events: [],
  loaded: false,
  loadFromApi: async () => {
    if (get().loaded) return;
    try {
      const res = await fetch('/api/events', { cache: 'no-store' });
      const base = (await res.json()) as EventItem[];
      const mine = getMyEvents();
      set({ events: [...base, ...mine], loaded: true });
    } catch (e) {
      console.error(e);
      const mine = getMyEvents();
      set({ events: mine, loaded: true });
    }
  },
  addEvent: (e) => {
    const state = get();
    const mine = getMyEvents();
    const updatedMine = [...mine, e];
    setMyEvents(updatedMine);
    set({ events: [...state.events, e] });
  },
  editEvent: (id, patch) => {
    const state = get();
    const updated = state.events.map(ev => ev.id === id ? { ...ev, ...patch } : ev);
    set({ events: updated });
    // persist only if createdBy me
    const mine = getMyEvents().map(ev => ev.id===id ? { ...ev, ...patch } : ev);
    setMyEvents(mine);
  },
  deleteEvent: (id) => {
    const state = get();
    set({ events: state.events.filter(e => e.id !== id) });
    const mine = getMyEvents().filter(e => e.id !== id);
    setMyEvents(mine);
  },
  rsvp: (id) => {
    const state = get();
    const updated = state.events.map(ev => ev.id === id ? { ...ev, rsvpCount: (ev.rsvpCount||0)+1 } : ev);
    set({ events: updated });
    const mine = getMyEvents().map(ev => ev.id===id ? { ...ev, rsvpCount: (ev.rsvpCount||0)+1 } : ev);
    setMyEvents(mine);
  },
}));
