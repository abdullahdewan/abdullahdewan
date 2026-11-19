import type { Component } from 'vue';

export interface ExperienceTimelineItem {
  year: string;
  title: string;
  subtitle: string;
  icon: Component;
  achievements: string[];
}
