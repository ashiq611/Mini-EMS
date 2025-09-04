export type Category = 'Conference' | 'Workshop' | 'Meetup' | 'Webinar' | 'Other';

export type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO
  location: string;
  category: Category;
  rsvpCount?: number;
  createdBy?: 'system' | 'me';
};
