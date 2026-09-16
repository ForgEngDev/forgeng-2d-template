import Forge2d from "forgeng/presets/2d";
import { DOM_UI_SHELL_PROVIDER_DESCRIPTOR } from "@forgeng/ui-dom";
import { PlayerControls } from "./scene/controller";
import { MainScene } from "./scene/mainScene";
import { SCENE_ID } from "./scene/ids";

/**
 * Engine ulaz (kao Phaser Game config) — 2D preset.
 * Ovde podešavaš canvas, veličinu, UI provider i spisak scena.
 * Sadržaj scene živi u src/scene/ — ne ovde.
 */
async function main(): Promise<void> {
  try {
    const scene = new MainScene();

    const game = await Forge2d.create({
      canvas: {
        target: "#game",
        layout: "viewport",
      },

      // Opciono: fiksna rezolucija umesto viewport-a
      // size: { width: 960, height: 540, autoResize: true },

      providers: {
        ui: DOM_UI_SHELL_PROVIDER_DESCRIPTOR,
        assets: "disabled",
        storage: "disabled",
      },

      actions: { maps: [PlayerControls] },
      inspection: { profile: "production-lite" },

      scenes: [scene.definition()],
      boot: { scene: SCENE_ID, autoStart: false },
    });

    const actionScope = game.actions.enableMap(PlayerControls.id);
    scene.bindGame(game);
    game.loop.start();

    window.addEventListener(
      "beforeunload",
      () => {
        scene.destroy();
        actionScope.dispose();
        void game.destroy();
      },
      { once: true },
    );
  } catch (cause) {
    const message = cause instanceof Error ? `${cause.name}: ${cause.message}` : String(cause);
    console.error(message);
    document.body.insertAdjacentHTML(
      "beforeend",
      `<pre style="position:fixed;inset:12px;color:#ffb04a;z-index:99999;white-space:pre-wrap">${message}</pre>`,
    );
  }
}

void main();
