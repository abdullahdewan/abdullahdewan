import type { Component } from 'vue';

export type ProjectCategory = 'Fullstack' | 'Realtime' | 'Tools';
export type ProjectFilterCategory = 'All' | ProjectCategory;
export type ProjectTelemetryType = 'transit' | 'websocket' | 'cli';

export interface Project {
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  badge: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  icon: Component;
  metric: string;
  telemetryType: ProjectTelemetryType;
}
