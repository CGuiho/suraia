/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

import { describe, expect, mock, test } from "bun:test";
import { StepperController, type StepperStep } from "./stepper";

const steps: StepperStep[] = [
  { id: "account", label: "Account" },
  { id: "profile", label: "Profile" },
  { id: "review", label: "Review" },
];

describe("StepperController", () => {
  test("initial state defaults", () => {
    const ctrl = new StepperController({ steps });
    expect(ctrl.getActive()).toBe(0);
    expect(ctrl.getOrientation()).toBe("horizontal");
  });

  test("setActive clamps and calls onChange", () => {
    const onChange = mock((_active: number) => {});
    const ctrl = new StepperController({ steps, onChange });
    ctrl.setActive(2);
    expect(ctrl.getActive()).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  test("next and previous move active step", () => {
    const ctrl = new StepperController({ steps });
    ctrl.next();
    expect(ctrl.getActive()).toBe(1);
    ctrl.previous();
    expect(ctrl.getActive()).toBe(0);
  });

  test("disabled steps are skipped", () => {
    const ctrl = new StepperController({
      steps: [steps[0]!, { ...steps[1]!, disabled: true }, steps[2]!],
    });
    ctrl.next();
    expect(ctrl.getActive()).toBe(2);
  });

  test("getStepStatus marks completed steps", () => {
    const ctrl = new StepperController({ steps, active: 1 });
    expect(ctrl.getStepStatus(0)).toBe("completed");
    expect(ctrl.getStepStatus(1)).toBe("active");
    expect(ctrl.getStepStatus(2)).toBe("inactive");
  });
});
