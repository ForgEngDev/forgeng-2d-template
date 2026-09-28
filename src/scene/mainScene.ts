import type {
  Forge2dGame,
  Forge2dSceneDefinition,
  Forge2dSceneFacade,
  Forge2dSpriteAnimationController,
} from "forgeng/presets/2d";
import type { UiShellLike } from "@forgeng/ui-dom";
import { Controller, PlayerControls } from "./controller";
import { createRenderDefinition } from "./render";
import { Hero } from "./hero";
import { Hud } from "./hud";
import {
  CAMERA,
  HERO,
  HERO_ENTITY,
  IDLE,
  SCENE_ID,
  WALK,
  WALL_ENTITY,
} from "./ids";

/**
 * Main 2D scene that combines the hero, colliders, input, and HUD.
 * Forge2d uses a scene definition instead of a Scene class.
 */
export class MainScene {
  private readonly hero = new Hero();
  private readonly controller = new Controller();
  private readonly hud = new Hud();
  private animation: Forge2dSpriteAnimationController | null = null;
  private animating = true;
  private lastFrame = performance.now();
  private raf = 0;
  private game: Forge2dGame | null = null;

  public definition(): Forge2dSceneDefinition {
    return {
      id: SCENE_ID,
      render: createRenderDefinition(this.hero),
      colliders: [
        {
          id: "hero-body",
          entityId: HERO_ENTITY,
          shape: { kind: "aabb", size: [18, 24] },
        },
        {
          id: "wall-body",
          entityId: WALL_ENTITY,
          shape: { kind: "aabb", size: [20, 80] },
        },
      ],
      setup: (scene) => this.setup(scene),
      fixedUpdate: (scene) => this.fixedUpdate(scene),
    };
  }

  public bindGame(game: Forge2dGame): void {
    this.game = game;
    this.animation = game.twoD.spriteAnimation(HERO);
    this.animation.play(IDLE, "restart");

    const ui = game.ui as UiShellLike | null;
    if (ui) {
      this.hud.setup(ui, {
        getCanvasSize: () => ({
          width: game.canvas.width,
          height: game.canvas.height,
        }),
        getSceneId: () => SCENE_ID,
        getHeroPosition: () => this.hero.getPosition(),
        getAnimating: () => this.animating,
      });
    }

    this.controller.setup({
      onAction: (source) => {
        const label =
          source === "space"
            ? "Space — action"
            : source === "touch"
              ? "Touch — action"
              : "Left click — action";
        this.hud.notify(label);
      },
      onInteract: () => {
        const pos = this.hero.resetPosition();
        this.game?.twoD.setTransform(HERO_ENTITY, {
          position: pos,
          rotation: 0,
          scale: [1, 1],
        });
        this.hud.notify("E — hero reset");
      },
      onToggleAnimate: () => {
        this.animating = !this.animating;
        if (!this.animating) {
          this.animation?.play(IDLE, "restart");
        }
        this.hud.notify(
          this.animating ? "Q — animation resumed" : "Q — animation paused",
        );
      },
      onMouseRight: () => this.hud.notify("Right click — secondary action"),
      onMouseMiddle: () => this.hud.notify("Middle click — tertiary action"),
      onMove: (key, label) => this.hud.notify(`${key} — move ${label}`),
    });

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - this.lastFrame) / 1000);
      this.lastFrame = now;
      this.hud.update(dt);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  public destroy(): void {
    cancelAnimationFrame(this.raf);
    this.controller.destroy();
    this.hud.destroy();
    this.animation = null;
    this.game = null;
  }

  private setup(scene: Forge2dSceneFacade): void {
    scene.camera(CAMERA).follow(HERO_ENTITY, {
      bounds: [-140, -70, 280, 140],
    });
    scene.hud.set(
      "hud/status",
      Object.freeze({ moving: false, position: this.hero.getPosition() }),
    );
  }

  private fixedUpdate(scene: Forge2dSceneFacade): void {
    if (!this.game) return;

    const move = this.game.actions.value(PlayerControls.move) as readonly [number, number];
    // Input Actions uses +Y for "up"; invert Y so W moves upward on screen.
    const moveScreen: readonly [number, number] = [move[0], -move[1]];
    const previous = this.hero.getPosition();
    const next = this.hero.move(moveScreen[0], moveScreen[1]);
    scene.setTransform(HERO_ENTITY, {
      position: next,
      rotation: 0,
      scale: [1, 1],
    });

    if ((scene.collider("hero-body")?.overlaps(false).length ?? 0) > 0) {
      this.hero.setPosition(previous);
      scene.setTransform(HERO_ENTITY, {
        position: previous,
        rotation: 0,
        scale: [1, 1],
      });
    }

    if (this.animating && this.animation) {
      const moving = moveScreen[0] !== 0 || moveScreen[1] !== 0;
      const anim = moving ? WALK : IDLE;
      if (this.animation.state().current?.animationId !== anim) {
        this.animation.play(anim, "continue");
      }
    }

    scene.hud.set(
      "hud/status",
      Object.freeze({
        moving: moveScreen[0] !== 0 || moveScreen[1] !== 0,
        position: this.hero.getPosition(),
      }),
    );
  }

}
