import { Home, Code2, User, Mail } from 'lucide-react'

// Single source of truth for the 404 page: label, real route, icon and
// theme color all live together so the map, terminal and quick-nav
// buttons can never drift out of sync with each other.
//
// Colors reuse the existing --chart-1..4 tokens already defined in
// src/index.css (currently unused) instead of introducing new ones —
// they're already theme-aware across light/dark mode.
export const NOT_FOUND_ROUTES = {
  home: {
    label: 'Home',
    path: '/',
    icon: Home,
    colorClass: 'text-chart-1',
    badgeClass: 'bg-chart-1/15 border-chart-1/30',
    lineColor: 'var(--chart-1)',
  },
  projects: {
    label: 'Projects',
    path: '/#projects',
    icon: Code2,
    colorClass: 'text-chart-2',
    badgeClass: 'bg-chart-2/15 border-chart-2/30',
    lineColor: 'var(--chart-2)',
  },
  about: {
    label: 'About',
    path: '/#about',
    icon: User,
    colorClass: 'text-chart-3',
    badgeClass: 'bg-chart-3/15 border-chart-3/30',
    lineColor: 'var(--chart-3)',
  },
  contact: {
    label: 'Contact',
    path: '/#contact',
    icon: Mail,
    colorClass: 'text-chart-4',
    badgeClass: 'bg-chart-4/15 border-chart-4/30',
    lineColor: 'var(--chart-4)',
  },
}