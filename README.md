# Mini Event Management System (Next.js App Router)

A tiny Event Management System demonstrating:
- Event list with search & category filter
- Event details page with dynamic routing
- Create & manage "My Events" (localStorage persistence)
- Mock API route (`/api/events`) for base data
- Bonus: RSVP counter + inline Edit & Delete on My Events

## Tech
- Next.js 14 (App Router)
- TypeScript
- Zustand for state & persistence (localStorage)

## Quickstart

```bash
# 1) Extract and install
npm install

# 2) Run dev server
npm run dev

# 3) Open
http://localhost:6007
```

## Project Structure

```
app/
  api/events/route.ts   # Mock API returning base events
  events/[id]/page.tsx  # Event details
  create/page.tsx       # Create event form
  myevents/page.tsx     # List + Edit/Delete my events
  page.tsx              # Home: list + search + filter
  layout.tsx            # Header & base layout
  globals.css           # Styling
components/
  Header.tsx
  EventCard.tsx
  SearchBar.tsx
  CategoryFilter.tsx
  LoadingEventsRaw.tsx
  EmptyResults.tsx
lib/
  types.ts
  store.ts              # Zustand store & localStorage sync
  utils.ts
```

## Notes

- **My Events** are stored in `localStorage` under the key `my-events`. Deleting or editing only affects your events.
- The mock API returns `createdBy: "system"` events. Your created events are tagged `createdBy: "me"`.
- The app uses client components for simplicity (form handling, localStorage).

## Bonus Ideas (left simple on purpose)
-**Live Link**: https://mini-ems.vercel.app

## License
MIT
