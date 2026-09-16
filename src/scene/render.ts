import {
  builtinSpriteMaterial2d,
  defineLayer2d,
  defineRender2d,
} from "forgeng/2d";
import { createCamera } from "./camera";
import { createPlatformSprite, createWallSprite } from "./ground";
import { Hero } from "./hero";
import { MATERIAL, WORLD } from "./ids";

/** Sastavlja render definiciju scene (sloj, kamera, sprite-ovi, animacije). */
export function createRenderDefinition(hero: Hero) {
  const world = defineLayer2d({ id: WORLD });
  const material = builtinSpriteMaterial2d({ id: MATERIAL });

  return defineRender2d({
    contractVersion: 1,
    id: "template.2d:render",
    layers: [world],
    cameras: [createCamera()],
    materials: [material],
    sprites: [createPlatformSprite(), hero.createSprite(), createWallSprite()],
    animations: [...hero.createAnimations()],
  });
}
