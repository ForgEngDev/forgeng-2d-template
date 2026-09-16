import { sprite2d } from "forgeng/2d";
import {
  FALLBACK_TEXTURE,
  MATERIAL,
  PLATFORM,
  PLATFORM_ENTITY,
  WALL,
  WALL_ENTITY,
  WORLD,
} from "./ids";

/** Podloga / arena ispod heroja. */
export function createPlatformSprite() {
  return sprite2d({
    id: PLATFORM,
    entity: PLATFORM_ENTITY,
    layer: WORLD,
    texture: FALLBACK_TEXTURE,
    material: MATERIAL,
    size: [280, 120],
    tint: [0.18, 0.24, 0.35, 1],
    transform: { position: [0, 0], rotation: 0, scale: [1, 1] },
  });
}

/** Plavi zid — collider prepreka (kao u zvaničnom 2D starteru). */
export function createWallSprite() {
  return sprite2d({
    id: WALL,
    entity: WALL_ENTITY,
    layer: WORLD,
    texture: FALLBACK_TEXTURE,
    material: MATERIAL,
    size: [20, 80],
    tint: [0.22, 0.52, 0.82, 1],
    transform: { position: [70, 0], rotation: 0, scale: [1, 1] },
  });
}
