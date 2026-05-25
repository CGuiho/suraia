# Collapse

Animate expansion and collapse of detail panels.

## Dependencies
None — Tier 2 Composite.

## AI Translation Notes
- Default state is collapsed with `height: 0` and `overflow: hidden`.
- CSS custom properties (`--suraia-collapse-duration`, `--suraia-collapse-timing`) are used to dynamically configure the transition speed and curves.
- Height transitions to/from auto are handled by measuring `scrollHeight` and applying it as inline styles during transitions, reverting to `auto` upon `transitionend` events.
