# Stepper

Stepper represents progress and navigation across a finite set of workflow steps.

## Dependencies

- Button

## AI Translation Notes

- Generate step triggers as tabs when step panels are rendered, with `aria-selected` and `aria-controls`.
- Mark steps before the active index as completed, the active step as active, and later steps as inactive.
- Skip disabled steps during next and previous navigation.
- For vertical steppers, keep the same semantic model and only change layout orientation.
