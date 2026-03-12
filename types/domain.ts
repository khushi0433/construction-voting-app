export type UserRole = "admin" | "partner";
export type ProjectStatus = "draft" | "open" | "closed" | "archived";

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: ProjectStatus;
}

export interface SegmentOption {
  id: string;
  label: string;
  sortOrder: number;
}

export interface ProjectSegment {
  id: string;
  title: string;
  sortOrder: number;
  options: SegmentOption[];
}
