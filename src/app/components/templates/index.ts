// Template index file
// This file exports all available resume templates

import DefaultTemplate from './DefaultTemplate';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import { DefaultThumbnail, ModernThumbnail, MinimalThumbnail } from './thumbnails';

// Template registry - add new templates here
export const TEMPLATES = [
  {
    id: 'default',
    name: 'Default Template',
    component: DefaultTemplate,
    thumbnailComponent: DefaultThumbnail,
  },
  {
    id: 'modern',
    name: 'Modern Template',
    component: ModernTemplate,
    thumbnailComponent: ModernThumbnail,
  },
  {
    id: 'minimal',
    name: 'Minimal Template',
    component: MinimalTemplate,
    thumbnailComponent: MinimalThumbnail,
  },
];

export type TemplateId = 'default' | 'modern' | 'minimal';

// Helper function to get template by ID
export function getTemplateById(id: TemplateId) {
  return TEMPLATES.find(template => template.id === id) || TEMPLATES[0];
}

export { DefaultTemplate, ModernTemplate, MinimalTemplate }; 