import { expect, test, describe, mock } from "bun:test";
import { ButtonController } from "./button";

const createMockMouseEvent = () => {
  return {
    preventDefault: mock(() => {}),
    stopPropagation: mock(() => {}),
  } as unknown as MouseEvent;
};

const createMockKeyboardEvent = (key: string) => {
  return {
    key,
    preventDefault: mock(() => {}),
    stopPropagation: mock(() => {}),
  } as unknown as KeyboardEvent;
};

describe("ButtonController", () => {
  test("initial state defaults", () => {
    const controller = new ButtonController();
    expect(controller.isDisabled()).toBe(false);
    expect(controller.isLoading()).toBe(false);
  });

  test("initial state with options", () => {
    const controller = new ButtonController({ disabled: true, loading: true });
    expect(controller.isDisabled()).toBe(true);
    expect(controller.isLoading()).toBe(true);
  });

  test("setDisabled and setLoading", () => {
    const controller = new ButtonController();
    controller.setDisabled(true);
    expect(controller.isDisabled()).toBe(true);
    controller.setLoading(true);
    expect(controller.isLoading()).toBe(true);
  });

  test("trigger invokes onClick when active", () => {
    const onClick = mock(() => {});
    const controller = new ButtonController({ onClick });
    const event = createMockMouseEvent();
    
    controller.trigger(event);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(event);
  });

  test("trigger does not invoke onClick when disabled", () => {
    const onClick = mock(() => {});
    const controller = new ButtonController({ onClick, disabled: true });
    const event = createMockMouseEvent();
    
    controller.trigger(event);
    expect(onClick).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  test("trigger does not invoke onClick when loading", () => {
    const onClick = mock(() => {});
    const controller = new ButtonController({ onClick, loading: true });
    const event = createMockMouseEvent();
    
    controller.trigger(event);
    expect(onClick).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  test("handleKeyDown triggers on Enter/Space", () => {
    const onClick = mock(() => {});
    const controller = new ButtonController({ onClick });
    
    const enterEvent = createMockKeyboardEvent("Enter");
    controller.handleKeyDown(enterEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(enterEvent.preventDefault).toHaveBeenCalledTimes(1);

    const spaceEvent = createMockKeyboardEvent(" ");
    controller.handleKeyDown(spaceEvent);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(spaceEvent.preventDefault).toHaveBeenCalledTimes(1);

    const escapeEvent = createMockKeyboardEvent("Escape");
    controller.handleKeyDown(escapeEvent);
    expect(onClick).toHaveBeenCalledTimes(2); // Should not increment
    expect(escapeEvent.preventDefault).not.toHaveBeenCalled();
  });
});
