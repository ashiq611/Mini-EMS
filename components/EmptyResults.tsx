'use client';

import Link from "next/link";

type Props = {
  q: string;
  cat: string;
  onClear: () => void;
};

export default function EmptyResults({ q, cat, onClear }: Props) {
  return (
    <div className="card empty">
      <div className="empty-emoji" aria-hidden>🎈🎤🎟️</div>
      <h3 style={{margin: '4px 0'}}>No events found</h3>
      <p className="small" style={{textAlign:'center'}}>
        Didn’t find anything for {q ? <code>{q}</code> : <em>your search</em>}
        {cat ? <> in <code>{cat}</code></> : null}.  
        Try clearing filters or create a new one!
      </p>

      <div className="empty-actions">
        <button onClick={onClear}>Clear filters</button>
        <Link href="/create"><button className="ghost">Create Event</button></Link>
      </div>
    </div>
  );
}
