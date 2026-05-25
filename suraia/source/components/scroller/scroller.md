# Scroller

Scroller describes a controlled viewport and track with previous and next movement controls.

## Dependencies

- ActionIcon

## AI Translation Notes

- Use buttons for previous and next controls and disable them at boundaries unless looping is enabled.
- Keep the viewport clipped and move the track with transform.
- The controller operates on item indexes, item count, and visible count; generated implementations can map this to pixel or percentage motion.
- Provide an accessible label for the scrolled content group.
