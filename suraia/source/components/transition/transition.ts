/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { TransitionController };
export type { TransitionControllerOptions, TransitionName, TransitionState };

type TransitionName = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
type TransitionState = 'entered' | 'exited';

interface TransitionControllerOptions {
  mounted?: boolean;
  transition?: TransitionName;
  duration?: number;
  timingFunction?: string;
  keepMounted?: boolean;
}

class TransitionController {
  private mounted: boolean;
  private transition: TransitionName;
  private duration: number;
  private timingFunction: string;
  private keepMounted: boolean;
  private state: TransitionState;

  constructor(options: TransitionControllerOptions = {}) {
    this.mounted = options.mounted ?? false;
    this.transition = options.transition ?? 'fade';
    this.duration = options.duration ?? 150;
    this.timingFunction = options.timingFunction ?? 'ease';
    this.keepMounted = options.keepMounted ?? false;
    this.state = this.mounted ? 'entered' : 'exited';
  }

  public isMounted(): boolean {
    return this.mounted || this.keepMounted;
  }

  public getState(): TransitionState {
    return this.state;
  }

  public setMounted(mounted: boolean): void {
    this.mounted = mounted;
    this.state = mounted ? 'entered' : 'exited';
  }

  public getTransition(): TransitionName {
    return this.transition;
  }

  public setTransition(transition: TransitionName): void {
    this.transition = transition;
  }

  public getStyle(): Record<string, string> {
    const entered = this.state === 'entered';
    const transform = this.resolveTransform(entered);

    return {
      '--suraia-transition-duration': `${this.duration}ms`,
      '--suraia-transition-timing-function': this.timingFunction,
      '--suraia-transition-opacity': entered ? '1' : '0',
      '--suraia-transition-transform': transform,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Transition',
      'data-suraia-transition': this.transition,
      'data-suraia-state': this.state,
      'data-suraia-mounted': String(this.isMounted()),
    };
  }

  private resolveTransform(entered: boolean): string {
    if (entered || this.transition === 'fade') {
      return 'none';
    }

    const transforms: Record<Exclude<TransitionName, 'fade'>, string> = {
      scale: 'scale(0.95)',
      'slide-up': 'translateY(0.5rem)',
      'slide-down': 'translateY(-0.5rem)',
      'slide-left': 'translateX(0.5rem)',
      'slide-right': 'translateX(-0.5rem)',
    };

    return transforms[this.transition];
  }
}
