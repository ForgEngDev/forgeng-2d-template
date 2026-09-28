import { binding, controls, defineActionMap } from "forgeng/contracts/actions";

/** Single source of truth for active controls, HUD display, and input wiring. */
export const ACTIVE_CONTROLS = [
  { id: "wasd", label: "Keyboard · WASD", help: "Move the hero" },
  { id: "arrows", label: "Keyboard · Arrow keys", help: "Same movement as WASD" },
  { id: "space", label: "Keyboard · Space", help: "Action + notification" },
  { id: "e", label: "Keyboard · E", help: "Reset the hero position" },
  { id: "q", label: "Keyboard · Q", help: "Pause / resume animation" },
  { id: "lmb", label: "Mouse · Left click", help: "Same action as Space" },
  { id: "rmb", label: "Mouse · Right click", help: "Secondary action" },
  { id: "mmb", label: "Mouse · Middle click", help: "Tertiary action" },
  { id: "touch", label: "Touch · Tap", help: "Same action as Space" },
] as const;

export type ControlId = (typeof ACTIVE_CONTROLS)[number]["id"];

/** Semantic Input Actions map for the ForgeNG 2D workflow. */
export const PlayerControls = defineActionMap({
  id: "template.2d:player-controls",
  actions: {
    move: {
      kind: "vector2",
      bindings: [
        binding.vector2({
          id: "wasd",
          up: controls.key("KeyW"),
          down: controls.key("KeyS"),
          left: controls.key("KeyA"),
          right: controls.key("KeyD"),
        }),
        binding.vector2({
          id: "arrows",
          up: controls.key("ArrowUp"),
          down: controls.key("ArrowDown"),
          left: controls.key("ArrowLeft"),
          right: controls.key("ArrowRight"),
        }),
      ],
    },
  },
});

export interface ControllerHandlers {
  onAction?: (source: "space" | "mouse-left" | "touch") => void;
  onInteract?: () => void;
  onToggleAnimate?: () => void;
  onMouseRight?: () => void;
  onMouseMiddle?: () => void;
  onMove?: (key: string, label: string) => void;
}

/**
 * Additional input (Space / E / Q / mouse) alongside the Input Actions movement vector.
 */
export class Controller {
  private readonly keys = new Set<string>();
  private onKeyDown: ((event: KeyboardEvent) => void) | null = null;
  private onKeyUp: ((event: KeyboardEvent) => void) | null = null;
  private onPointer: ((event: PointerEvent) => void) | null = null;
  private onContextMenu: ((event: Event) => void) | null = null;
  private canvas: HTMLElement | null = null;
  private handlers: ControllerHandlers = {};
  private moveNotified = new Set<string>();

  public setup(handlers: ControllerHandlers = {}, canvasSelector = "#game"): void {
    this.destroy();
    this.handlers = handlers;

    this.onKeyDown = (event: KeyboardEvent) => {
      const code = event.code;

      if (MOVEMENT_LABELS[code]) {
        event.preventDefault();
        const firstPress = !this.keys.has(code) && !event.repeat;
        this.keys.add(code);
        if (firstPress && !this.moveNotified.has(code)) {
          this.moveNotified.add(code);
          const info = MOVEMENT_LABELS[code]!;
          this.handlers.onMove?.(info.key, info.label);
        }
        return;
      }

      if (event.repeat) return;

      if (code === "Space") {
        event.preventDefault();
        this.handlers.onAction?.("space");
        return;
      }

      if (code === "KeyE") {
        event.preventDefault();
        this.handlers.onInteract?.();
        return;
      }

      if (code === "KeyQ") {
        event.preventDefault();
        this.handlers.onToggleAnimate?.();
      }
    };

    this.onKeyUp = (event: KeyboardEvent) => {
      this.keys.delete(event.code);
      this.moveNotified.delete(event.code);
    };

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    this.canvas = document.querySelector(canvasSelector);
    if (this.canvas) {
      this.onContextMenu = (event) => event.preventDefault();
      this.canvas.addEventListener("contextmenu", this.onContextMenu);

      this.onPointer = (event: PointerEvent) => {
        if (event.button === 0) {
          const source = event.pointerType === "touch" ? "touch" : "mouse-left";
          this.handlers.onAction?.(source);
          return;
        }
        if (event.button === 1) {
          event.preventDefault();
          this.handlers.onMouseMiddle?.();
          return;
        }
        if (event.button === 2) {
          event.preventDefault();
          this.handlers.onMouseRight?.();
        }
      };
      this.canvas.addEventListener("pointerdown", this.onPointer);
    }
  }

  public destroy(): void {
    if (this.onKeyDown) window.removeEventListener("keydown", this.onKeyDown);
    if (this.onKeyUp) window.removeEventListener("keyup", this.onKeyUp);
    if (this.canvas && this.onPointer) {
      this.canvas.removeEventListener("pointerdown", this.onPointer);
    }
    if (this.canvas && this.onContextMenu) {
      this.canvas.removeEventListener("contextmenu", this.onContextMenu);
    }
    this.onKeyDown = null;
    this.onKeyUp = null;
    this.onPointer = null;
    this.onContextMenu = null;
    this.canvas = null;
    this.keys.clear();
    this.moveNotified.clear();
    this.handlers = {};
  }
}

const MOVEMENT_LABELS: Record<string, { key: string; label: string }> = {
  KeyW: { key: "W", label: "up" },
  KeyS: { key: "S", label: "down" },
  KeyA: { key: "A", label: "left" },
  KeyD: { key: "D", label: "right" },
  ArrowUp: { key: "↑", label: "up" },
  ArrowDown: { key: "↓", label: "down" },
  ArrowLeft: { key: "←", label: "left" },
  ArrowRight: { key: "→", label: "right" },
};
