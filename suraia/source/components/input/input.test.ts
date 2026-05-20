import { expect, test, describe, mock } from "bun:test";
import { InputController } from "./input";

describe("InputController", () => {
  test("initial state defaults", () => {
    const controller = new InputController();
    expect(controller.getValue()).toBe("");
    expect(controller.isDisabled()).toBe(false);
    expect(controller.isRequired()).toBe(false);
    expect(controller.isFocused()).toBe(false);
  });

  test("initial state with options", () => {
    const controller = new InputController({
      value: "hello",
      disabled: true,
      required: true,
    });
    expect(controller.getValue()).toBe("hello");
    expect(controller.isDisabled()).toBe(true);
    expect(controller.isRequired()).toBe(true);
  });

  test("setValue and callbacks when active", () => {
    const onChange = mock(() => {});
    const onFocus = mock(() => {});
    const onBlur = mock(() => {});
    
    const controller = new InputController({ onChange, onFocus, onBlur });
    
    controller.handleFocus();
    expect(controller.isFocused()).toBe(true);
    expect(onFocus).toHaveBeenCalledTimes(1);

    controller.setValue("new val");
    expect(controller.getValue()).toBe("new val");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("new val");

    controller.handleBlur();
    expect(controller.isFocused()).toBe(false);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("setValue and focus/blur ignored when disabled", () => {
    const onChange = mock(() => {});
    const onFocus = mock(() => {});
    
    const controller = new InputController({ disabled: true, onChange, onFocus });
    
    controller.setValue("ignored");
    expect(controller.getValue()).toBe("");
    expect(onChange).not.toHaveBeenCalled();

    controller.handleFocus();
    expect(controller.isFocused()).toBe(false);
    expect(onFocus).not.toHaveBeenCalled();
  });

  test("validate returns false if required and empty/whitespace", () => {
    const controller = new InputController({ required: true });
    expect(controller.validate()).toBe(false);

    controller.setValue("  ");
    expect(controller.validate()).toBe(false);

    controller.setValue("valid text");
    expect(controller.validate()).toBe(true);
  });

  test("validate returns true if not required and empty", () => {
    const controller = new InputController({ required: false });
    expect(controller.validate()).toBe(true);
  });
});
