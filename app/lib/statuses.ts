export const STATUSES = {
  NEW: { label: "Nou", className: "bg-accent/15 text-accent" },
  CONTACTED: { label: "Contactat", className: "bg-yellow-500/15 text-yellow-600" },
  SCHEDULED: { label: "Programat", className: "bg-primary/15 text-primary" },
  DONE: { label: "Finalizat", className: "bg-green-500/15 text-green-600" },
  CANCELED: { label: "Anulat", className: "bg-zinc-500/15 text-muted" },
} as const;

export type StatusKey = keyof typeof STATUSES;
export const STATUS_KEYS = Object.keys(STATUSES) as StatusKey[];
export const NOTES_MAX = 1000;