/**
 * @copyright Copyright © 2026 GUIHO Technologies as represented by Cristóvão GUIHO. All Rights Reserved.
 */

export { MarqueeController };
export type { MarqueeControllerOptions, MarqueeDirection };

type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

interface MarqueeControllerOptions {
  direction?: MarqueeDirection;
  speed?: number;
  pauseOnHover?: boolean;
}

class MarqueeController {
  private direction: MarqueeDirection;
  private speed: number;
  private pauseOnHover: boolean;

  constructor(options: MarqueeControllerOptions = {}) {
    this.direction = options.direction ?? 'left';
    this.speed = options.speed ?? 50; // default speed value
    this.pauseOnHover = options.pauseOnHover ?? false;
  }

  public getDirection(): MarqueeDirection {
    return this.direction;
  }

  public setDirection(direction: MarqueeDirection): void {
    this.direction = direction;
  }

  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed = Math.max(1, speed);
  }

  public isPauseOnHover(): boolean {
    return this.pauseOnHover;
  }

  public setPauseOnHover(pause: boolean): void {
    this.pauseOnHover = pause;
  }

  public getStyle(): Record<string, string> {
    const duration = Math.round(1000 / this.speed * 10);
    return {
      '--suraia-marquee-speed': `${duration}s`,
    };
  }

  public getDataAttributes(): Record<string, string | undefined> {
    return {
      'data-suraia-component': 'Marquee',
      'data-suraia-direction': this.direction,
      'data-suraia-pause-on-hover': String(this.pauseOnHover),
    };
  }
}
