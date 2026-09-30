// Shape of the tables SortableTable renders (fed by EmDash-sourced data on
// /wisdom and /glossary).
export interface Column {
  key: string;
  label?: string;
}

export interface TableData {
  columns?: Column[];
  rows: Record<string, unknown>[];
  caption?: string;
  /** Bold lead-in before the caption, e.g. "Table of Glossary entries" (colon added). */
  captionTitle?: string;
}
