import type { Component } from 'vue';

export interface ServiceCapability {
  id: string;
  title: string;
  description: string;
  icon: Component;
  tags: string[];
}
