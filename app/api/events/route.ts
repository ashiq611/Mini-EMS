import { NextResponse } from 'next/server';
import type { EventItem } from '@/lib/types';

const data: EventItem[] = [
  {
    "id": "ev-1001",
    "title": "Next.js Conference 2025",
    "description": "Explore the latest in React and Next.js with hands-on sessions and keynotes.",
    "date": "2025-09-10T05:26:40",
    "location": "Dhaka",
    "category": "Conference",
    "rsvpCount": 12,
    "createdBy": "system"
  },
  {
    "id": "ev-1002",
    "title": "TypeScript Workshop",
    "description": "A practical workshop on mastering TypeScript generics, utility types, and patterns.",
    "date": "2025-09-13T08:26:40",
    "location": "Chattogram",
    "category": "Workshop",
    "rsvpCount": 7,
    "createdBy": "system"
  },
  {
    "id": "ev-1003",
    "title": "React Meetup",
    "description": "Local React devs gather to share tips, tricks, and career growth stories.",
    "date": "2025-09-06T10:26:40",
    "location": "Sylhet",
    "category": "Meetup",
    "rsvpCount": 20,
    "createdBy": "system"
  },
  {
    "id": "ev-1004",
    "title": "DevOps Webinar",
    "description": "CI/CD pipelines, containerization, and cloud-native practices for busy teams.",
    "date": "2025-09-04T07:26:40",
    "location": "Online",
    "category": "Webinar",
    "rsvpCount": 15,
    "createdBy": "system"
  }
];

export async function GET() {
  // Simulate a tiny delay
  await new Promise(r => setTimeout(r, 150));
  return NextResponse.json(data);
}
