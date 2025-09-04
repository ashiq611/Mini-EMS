export const categories = ['Conference','Workshop','Meetup','Webinar','Other'] as const;

export function cls(...xs: (string|false|undefined|null)[]) {
  return xs.filter(Boolean).join(" ");
}

export function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch { return iso; }
}
