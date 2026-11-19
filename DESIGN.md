---
name: Abdullah Dewan Portfolio
description: High-performance portfolio for a Full-Stack Engineer and Backend Systems Architect inspired by Reeni-17
colors:
  primary: '#5237f9'
  primary-hover: '#4328e0'
  background: '#13131d'
  section-alt: '#151522'
  card-bg: '#181827'
  text-primary: '#ffffff'
  text-muted: '#9f9f9f'
  accent-cyan: '#00d2ff'
  accent-emerald: '#10b981'
  border-subtle: 'rgba(255, 255, 255, 0.08)'
  border-glow: 'rgba(82, 55, 249, 0.5)'
  scrollbar-thumb: '#22222e'
typography:
  display:
    fontFamily: 'Rajdhani, sans-serif'
    fontSize: '4rem'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '0.01em'
  heading:
    fontFamily: 'Rajdhani, sans-serif'
    fontSize: '2.5rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.01em'
  body:
    fontFamily: 'Rubik, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: 'JetBrains Mono, monospace'
    fontSize: '0.875rem'
    fontWeight: 500
  monogram:
    fontFamily: 'Orbitron, sans-serif'
    fontSize: '1rem'
    fontWeight: 800
    lineHeight: 1
rounded:
  sm: '8px'
  md: '12px'
  lg: '16px'
  xl: '20px'
  full: '9999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  section: '80px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.text-primary}'
    rounded: '{rounded.full}'
    padding: '14px 32px'
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
---

# Design System

## Overview

The visual world of Abdullah Dewan's engineering portfolio combines the sleek layout rhythm, dark aesthetic, and card spotlight polish of Reeni-17 with authentic software engineering depth. Built for tech recruiters and engineering leaders, the design prioritizes structural clarity, fast scanability, sub-20ms edge performance, and verified deliverables over superficial decoration.

## Colors

- **Ground / Base (`#13131d`)**: Deep slate midnight canvas providing high-contrast readability and focus.
- **Section Alternate (`#151522`)**: Subtle contrast layer used to rhythmically alternate major content regions.
- **Card Background (`#181827`)**: Elevated dark gradient surface (`linear-gradient(145deg, #181827 0%, #141421 100%)`).
- **Primary Brand (`#5237f9`)**: High-energy electric violet-blue, driving primary buttons, active tabs, timeline nodes, and focal borders.
- **Telemetry Accents (`#10b981` Emerald, `#00d2ff` Cyan)**: Real-time telemetry signals indicating optimal system status, low latency, and operational health.
- **Text**: Pure white (`#ffffff`) for titles; neutral slate (`#9f9f9f` / `#94a3b8`) for descriptions and body copy (maintaining > 4.5:1 contrast).

## Typography

- **Heading & Body Font**: `Plus Jakarta Sans` — Modern, technical humanist sans-serif with geometric precision. Headings use tight letter spacing (`-0.02em`) with prominent scale steps.
- **Monospace Font**: `JetBrains Mono` — Applied purposefully for code specifications, timestamps, telemetry metrics, and category tags.

## Layout

- **Full-Width Page Structure**: Full viewport width with standard responsive containers (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Vertical Rhythm**: Generous section spacing (`py-20 sm:py-28 lg:py-32`) ensuring clear visual separation between architectural capability pillars, projects, and career milestones.
- **Sticky Header**: Fixed top navigation with transparent blurred backdrop (`backdrop-blur-md`), brand logo, centered navigation, and quick "Let's Talk" contact action.

## Elevation & Depth

- **Soft Ambient Borders**: Translucent `1px solid rgba(255, 255, 255, 0.08)` replacing cartoonish neubrutalist hard lines.
- **Spotlight Hover**: Radial gradient spotlight glow following cursor interaction (`radial-gradient(500px circle at var(--x) var(--y), rgba(82, 55, 249, 0.18), transparent 70%)`).
- **Glow Elevation**: Elevated hover shadow `0 20px 40px -15px rgba(82, 55, 249, 0.25)` and border transition to `rgba(82, 55, 249, 0.5)`.

## Shapes

- **Cards**: `rounded-2xl` (16px–20px) creating soft, refined technical containers.
- **Action Controls & Badges**: Fully rounded pills (`rounded-full`) for buttons, active tabs, and status badges.
- **Icons**: Rounded squares (`rounded-xl` or `rounded-2xl`) with subtle translucent fill.

## Components

- **Hero Banner**: Two-column layout with animated rotating titles, "Find me on" social links, dual action buttons, and an interactive telemetry engine card.
- **Services Cards**: 4-column/2-column grid featuring icon containers, titles, technical descriptions, and tag pills.
- **Filterable Portfolio**: Centered filter pills (`All`, `Fullstack`, `Realtime`, `Tools`) with smooth active indicator and spotlight cards.
- **Timeline**: Clean vertical rail with glowing primary nodes, company/role titles, and bulleted achievements.
- **Contact Card**: Integrated two-column card with direct contact info on the left and an inquiry form with turnstile support on the right.

## Do's and Don'ts

### Do's

- Maintain true full-width layout without artificial inner boxed canvas frames.
- Use the electric blue `#5237f9` as the singular primary brand accent.
- Ensure all body text meets WCAG AA 4.5:1 contrast against dark backgrounds.
- Keep hover interactions responsive with the subtle spotlight effect.

### Don'ts

- Do not introduce cartoonish neubrutalist zero-blur offset shadows or 3D cubes.
- Do not use text gradient clips; emphasis comes from weight, size, or color.
- Do not use one-sided borders down boxes.
- Do not add fluff sections like pricing tables or generic blog placeholders.
