# ForgEng 2D Template

Starter template for **ForgEng** 2D games (WebGPU, Vite, TypeScript).

Same structure as the 3D template: `main.ts` is engine config; scene content lives under `src/scene/`.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3001/](http://localhost:3001/).

```bash
npm run build
npm run preview
```

## Layout

```text
src/
  main.ts              # Forge2d.create — canvas, providers, scenes
  scene/
    mainScene.ts       # scene wiring (setup, fixedUpdate, HUD)
    render.ts          # layers, camera, sprites, animations
    camera.ts
    ground.ts          # platform + wall sprites
    hero.ts            # player sprite + idle/walk
    controller.ts      # WASD / mouse / touch + Input Actions
    hud.ts             # DomUiShell: Kontrole + Metrike
    ids.ts
  vendor/forgeng/      # vendored ForgEng 2D preset + DomUiShell
css/style.css
index.html
```

## Controls

| Input | Action |
| --- | --- |
| WASD / arrows | Move hero |
| Space / left click / tap | Action toast |
| E | Reset hero position |
| Q | Pause / resume walk-idle animation |
| Right / middle click | Secondary / tertiary toast |

Advanced metrics: toggle in the side panel, or open with `?advanced=1`.

## Notes

- Pixel-art camera: virtual **320×180**, integer-fit, nearest sampling
- Orange hero + blue wall collider (deterministic rollback on overlap)
- Requires a browser with **WebGPU**

## Sibling template

3D starter: [forgeng-3d-template](https://github.com/ForgEngDev/forgeng-3d-template)

## License

See [LICENSE](./LICENSE).

- **Template / game code:** free to use and improve for client-side games.
- **ForgEng engine** (vendored under `src/vendor/forgeng/`): installation on
  other computers as an engine/SDK and commercial use are strictly forbidden.

