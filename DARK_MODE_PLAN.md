# Dark Mode Implementation Plan

## Overview
Implement medical-grade dark mode for Copro Watch following Gemini 3 Pro recommendations with Slate Blue base theme.

## Phase 1: Core Color Palette Update
- Update CSS custom properties with new dark theme colors
- Implement Slate Blue base (#0F172A) as main background
- Replace bright colors with medical-grade subtle alternatives

## Phase 2: Component-Specific Updates
- Sidebar: Dark slate background with purple active states
- Tables: Zebra striping with low opacity
- Status badges: Subtle backgrounds with proper contrast
- Input fields: Darker backgrounds with purple focus states

## Phase 3: Shadow Management
- Remove drop shadows in dark mode
- Use border contrast for structural definition
- Maintain neo-brutalist feel through thick borders

## Phase 4: Testing & Refinement
- Verify accessibility and readability
- Test on different screen types
- Ensure professional medical appearance

## Implementation Details

### Color Palette Changes
```css
/* Current Light Theme → New Dark Theme */
--primary: #6366f1 → #A78BFA (Light Violet)
--bg-app: #f0f9ff → #0F172A (Deep Slate)
--surface: #ffffff → #1E293B (Lighter Slate)
--text-main: #1e293b → #F1F5F9 (Off-White)
--text-muted: #64748b → #94A3B8 (Muted Blue-Grey)
--border-color: #1e293b → #334155 (Mid-Tone Slate)
```

### Status Indicators
- Red alerts: Background #450A0A, Text #FECACA, Border #EF4444
- Green alerts: Subtle background with proper contrast
- Remove solid bright backgrounds

### Interface Updates
- Sidebar: Same as background (#0F172A) or lighter slate (#1E293B)
- Active nav items: 15% opacity purple background
- Table headers: Surface color with bottom border
- Zebra striping: Row 1 transparent, Row 2 #334155 at 20% opacity
- Inputs: Background #020617, focused border #A78BFA

## Files to Modify
1. `/src/index.css` - Main styling with dark mode variables
2. `/src/App.jsx` - May need minor adjustments for dark mode classes
3. Component files - Any inline styles using old color variables
