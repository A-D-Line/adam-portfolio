# Design Specification: Professional Light Mode (Alternating)

## Visual Vibe
- **Dynamic Light Mode**: Sections must alternate background colors to create visual hierarchy.
- **Tone**: Formal, neutral, and minimalist.

## Exact Color Palette
- **Background A**: `#FFFFFF` (Pure White)
- **Background B**: `#FFBBBB` (Soft Pink/Red)
- **Primary Text**: `#000000` (Black)
- **Secondary Text**: `#333333` (Dark Grey)
- **Dividers**: Transparent (use background color shifts to define sections).

## Section Logic
- **Hero/About**: `#FFFFFF`
- **What I Do**: `#FFBBBB`
- **Previous Work**: `#FFFFFF`
- **Adam Line Creative Ltd**: `#FFBBBB`
- **Contact**: `#FFFFFF`

## Technical Constraints
- Ensure the transition between `#FFFFFF` and `#FFBBBB` is immediate (no gradients) to maintain the clean, "blocked" aesthetic of the original site.
- Typography must maintain high contrast against both background colors.
