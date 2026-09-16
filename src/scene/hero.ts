import { sprite2d } from "forgeng/2d";
import { FALLBACK_TEXTURE, HERO, HERO_ENTITY, IDLE, MATERIAL, WALK, WORLD } from "./ids";

/** Narandžasti hero — pomera se WASD-om, idle/walk animacija. */
export class Hero {
  private position: readonly [number, number] = [-80, 0];
  private readonly speed = 2;
  private readonly limitX = 120;
  private readonly limitY = 50;

  public createSprite() {
    return sprite2d({
      id: HERO,
      entity: HERO_ENTITY,
      layer: WORLD,
      texture: FALLBACK_TEXTURE,
      material: MATERIAL,
      size: [18, 24],
      tint: [0.9, 0.45, 0.2, 1],
      transform: { position: this.position, rotation: 0, scale: [1, 1] },
    });
  }

  public createAnimations() {
    return [
      {
        id: IDLE,
        target: HERO,
        duration: 0.8,
        fixedStepHz: 10,
        loop: "repeat",
        tracks: [
          {
            target: HERO,
            property: "scale",
            keyframes: [
              { time: 0, value: [1, 1] },
              { time: 0.4, value: [1, 1.04] },
              { time: 0.8, value: [1, 1] },
            ],
          },
        ],
      },
      {
        id: WALK,
        target: HERO,
        duration: 0.4,
        fixedStepHz: 10,
        loop: "repeat",
        tracks: [
          {
            target: HERO,
            property: "scale",
            keyframes: [
              { time: 0, value: [1, 1] },
              { time: 0.2, value: [1.08, 0.92] },
              { time: 0.4, value: [1, 1] },
            ],
          },
        ],
      },
    ] as const;
  }

  public getPosition(): readonly [number, number] {
    return this.position;
  }

  public setPosition(position: readonly [number, number]): void {
    this.position = position;
  }

  /** Pomeri heroja; vraća novu poziciju (pre collider rollback-a). */
  public move(dx: number, dy: number): readonly [number, number] {
    const x = clamp(this.position[0] + dx * this.speed, -this.limitX, this.limitX);
    const y = clamp(this.position[1] + dy * this.speed, -this.limitY, this.limitY);
    this.position = [x, y];
    return this.position;
  }

  public resetPosition(): readonly [number, number] {
    this.position = [-80, 0];
    return this.position;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
