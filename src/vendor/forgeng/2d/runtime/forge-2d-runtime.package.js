var rd = Object.defineProperty;
var od = (i, e, t) => e in i ? rd(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var c = (i, e, t) => od(i, typeof e != "symbol" ? e + "" : e, t);
class _ extends Error {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "Engine2dError";
  }
}
function ad(i) {
  const e = i ?? 0;
  if (!Number.isSafeInteger(e) || e < 0) throw new _("E2D_FRAME_INVALID", "$.initialSimulationTick", "initial simulation tick must be a non-negative safe integer.");
  return e;
}
const Ds = 1, fn = 1, Cs = 1;
class cd extends TypeError {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "Render2dContractError";
  }
}
const $ = Object.freeze({
  idLength: 160,
  extensionCount: 32,
  extensionJsonDepth: 64,
  extensionJsonNodes: 65536,
  extensionJsonKeyLength: 256,
  extensionJsonStringLength: 1048576,
  layers: 256,
  cameras: 64,
  samplers: 256,
  materials: 1024,
  sprites: 1e5,
  tilemaps: 512,
  tilemapDependencies: 512,
  tilemapPatches: 65536,
  tilemapChunkDimension: 1024,
  tilemapRetainedChunks: 4096,
  texts: 1e4,
  animations: 1e4,
  particles: 1024,
  lights: 4096,
  masks: 4096,
  renderTargets: 128,
  features: 128,
  animationTracks: 256,
  animationKeyframes: 16384,
  animationEvents: 4096,
  animationEventQueue: 16384,
  animationAdvanceTicks: 1e4,
  textLength: 65536,
  textGlyphs: 65536,
  textFallbackFonts: 16,
  textCacheRuns: 2048,
  particleCapacity: 1e6,
  particleSceneCapacity: 1e6,
  particleBurst: 65536,
  particleCurveKeys: 64,
  particleAdvanceWork: 1e7,
  visibleLightsPerCamera: 64,
  shadowCasters: 4096,
  shadowSegmentsPerCamera: 8192,
  pathMaskPoints: 256,
  effects: 32,
  effectPasses: 64,
  textureDimension2d: 16384,
  textureArrayLayers: 2048,
  metricsCounters: 64,
  inspectionItems: 2048
}), hn = (i) => Object.freeze([i[0], i[1], i[2], i[3]]), Te = (i) => Object.freeze([i[0], i[1]]);
function ha(i = {}) {
  const e = i.logicalSize ?? [1, 1], t = i.pixelRatio ?? 1, s = i.maximumPixelRatio ?? 4, n = i.physicalSize ?? [
    e[0] * t,
    e[1] * t
  ], r = i.safeArea ?? [0, 0, 0, 0], o = i.revision ?? 0, a = [...e, ...n, t, s, ...r];
  if (!Number.isSafeInteger(o) || o < 0 || a.some((u) => !Number.isFinite(u)) || e.some((u) => u <= 0) || n.some((u) => u <= 0) || t <= 0 || s <= 0 || r.some((u) => u < 0))
    throw new TypeError("Render2D surface values must be finite, positive, and have a non-negative safe revision.");
  if (Math.abs(n[0] - e[0] * t) > 1 || Math.abs(n[1] - e[1] * t) > 1)
    throw new TypeError("Render2D CSS/logical/physical canvas sizes disagree with pixelRatio.");
  if (r[0] + r[2] >= e[0] || r[1] + r[3] >= e[1])
    throw new TypeError("Render2D safe-area insets must leave a positive logical surface.");
  const d = Math.min(t, s);
  return Object.freeze({
    revision: o,
    logicalSize: Te(e),
    physicalSize: Te([
      Math.max(1, Math.round(e[0] * d)),
      Math.max(1, Math.round(e[1] * d))
    ]),
    pixelRatio: d,
    maximumPixelRatio: s,
    safeArea: Object.freeze([r[0], r[1], r[2], r[3]]),
    visible: i.visible ?? !0
  });
}
function pa(i) {
  const [e, t, s, n, r, o] = i, a = e * n - t * s;
  if (!Number.isFinite(a) || Math.abs(a) <= Number.EPSILON)
    throw new TypeError("Render2D camera matrix is singular.");
  const d = 1 / a, u = n * d, l = -t * d, f = -s * d, h = e * d;
  return Object.freeze([u, l, f, h, -(u * r + f * o), -(l * r + h * o)]);
}
function Ce(i, e) {
  return Te([
    i[0] * e[0] + i[2] * e[1] + i[4],
    i[1] * e[0] + i[3] * e[1] + i[5]
  ]);
}
function ma(i, e, t, s) {
  const n = i.rotation ?? 0, r = Math.cos(-n), o = Math.sin(-n), a = r * t[0], d = o * t[1], u = -o * t[0], l = r * t[1], f = (i.space ?? "world") === "screen" ? e[0] : e[0] + e[2] * 0.5, h = (i.space ?? "world") === "screen" ? e[1] : e[1] + e[3] * 0.5;
  return Object.freeze([
    a,
    d,
    u,
    l,
    f - a * s[0] - u * s[1],
    h - d * s[0] - l * s[1]
  ]);
}
function dd(i, e, t, s, n) {
  if ((i.pixelSnap ?? "off") === "off")
    return Te(n);
  const r = ma(i, e, t, n), o = Ce(r, [0, 0]), a = Te([
    Math.round(o[0] * s[0]) / s[0],
    Math.round(o[1] * s[1]) / s[1]
  ]), d = pa(Object.freeze([r[0], r[1], r[2], r[3], 0, 0])), u = [a[0] - o[0], a[1] - o[1]], l = Ce(d, u);
  return Te([n[0] - l[0], n[1] - l[1]]);
}
function Ar(i, e) {
  const t = Math.round(i[0] * e[0]), s = Math.round(i[1] * e[1]), n = Math.round((i[0] + i[2]) * e[0]), r = Math.round((i[1] + i[3]) * e[1]);
  return hn([t, s, Math.max(1, n - t), Math.max(1, r - s)]);
}
function ga(i, e) {
  const t = i.safeArea === !1 ? [0, 0, 0, 0] : e.safeArea, s = Math.max(Number.EPSILON, e.logicalSize[0] - t[0] - t[2]), n = Math.max(Number.EPSILON, e.logicalSize[1] - t[1] - t[3]), r = i.viewport ?? [0, 0, 1, 1], o = hn([
    t[0] + r[0] * s,
    t[1] + r[1] * n,
    Math.max(Number.EPSILON, r[2] * s),
    Math.max(Number.EPSILON, r[3] * n)
  ]), a = o[2] / i.virtualSize[0], d = o[3] / i.virtualSize[1], u = i.scaleMode ?? "fit";
  let l = a, f = d;
  if (u !== "stretch") {
    let R = u === "fill" ? Math.max(a, d) : u === "none" ? 1 : Math.min(a, d);
    u === "integer-fit" && R >= 1 && (R = Math.max(1, Math.floor(R))), l = R, f = R;
  }
  const h = i.zoom ?? 1;
  l *= h, f *= h;
  const p = Te([l, f]), m = i.virtualSize[0] * l, y = i.virtualSize[1] * f, b = hn([
    o[0] + (o[2] - m) * 0.5,
    o[1] + (o[3] - y) * 0.5,
    m,
    y
  ]), g = Te([
    e.physicalSize[0] / e.logicalSize[0],
    e.physicalSize[1] / e.logicalSize[1]
  ]), w = Ar(o, g), z = Ar(b, g), O = Te([i.position?.[0] ?? 0, i.position?.[1] ?? 0]), S = dd(i, b, p, g, O), v = ma(i, b, p, S), I = Object.freeze([
    Math.max(0, b[0] - o[0]),
    Math.max(0, b[1] - o[1]),
    Math.max(0, o[0] + o[2] - b[0] - b[2]),
    Math.max(0, o[1] + o[3] - b[1] - b[3])
  ]), x = Object.freeze([
    Math.max(0, o[0] - b[0]),
    Math.max(0, o[1] - b[1]),
    Math.max(0, b[0] + b[2] - o[0] - o[2]),
    Math.max(0, b[1] + b[3] - o[1] - o[3])
  ]);
  return Object.freeze({
    id: i.id,
    order: i.order ?? 0,
    space: i.space ?? "world",
    scaleMode: u,
    pixelSnap: i.pixelSnap ?? "off",
    sampling: i.sampling ?? "asset",
    logicalViewport: o,
    physicalViewport: w,
    logicalContentRect: b,
    physicalContentRect: z,
    letterbox: I,
    crop: x,
    virtualSize: Te(i.virtualSize),
    scale: p,
    position: O,
    effectivePosition: S,
    rotation: i.rotation ?? 0,
    zoom: h,
    layers: Object.freeze([...i.layers ?? []]),
    targetId: i.target ?? "surface",
    clearColor: i.clearColor ?? null,
    physicalRatio: g,
    worldToLogical: v,
    logicalToWorld: pa(v)
  });
}
function ya(i, e) {
  return Ce(i.worldToLogical, e);
}
function ba(i, e) {
  return Ce(i.logicalToWorld, e);
}
const ld = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/, is = /^[A-Za-z_][A-Za-z0-9_]*$/, ud = ["rgba8unorm", "rgba8unorm-srgb", "bgra8unorm", "bgra8unorm-srgb", "rgba16float"], wa = [1, 2, 4, 8], ys = ["id", "entity", "layer", "transform", "parent", "order", "visible", "opacity", "tint", "mask", "target", "extensions"];
function A(i, e, t) {
  throw new cd(i, e, t);
}
function j(i, e, t) {
  (typeof i != "object" || i === null || Array.isArray(i)) && A("R2D_VALUE_INVALID", e, "expected an object.");
  const s = i;
  if (t)
    for (const n of Object.keys(s))
      t.includes(n) || A("R2D_UNKNOWN_KEY", `${e}.${n}`, `unknown key "${n}".`);
  return s;
}
function Qe(i, e, t = $.idLength) {
  return (typeof i != "string" || i.length === 0 || i.length > t) && A("R2D_VALUE_INVALID", e, `expected a non-empty string of at most ${t} characters.`), i;
}
function N(i, e) {
  const t = Qe(i, e);
  return ld.test(t) || A("R2D_ID_INVALID", e, "expected a normalized namespaced ID."), t;
}
function W(i, e, t, s) {
  return (typeof i != "number" || !Number.isFinite(i)) && A("R2D_VALUE_INVALID", e, "expected a finite number."), t !== void 0 && i < t && A("R2D_VALUE_INVALID", e, `expected a value >= ${t}.`), s !== void 0 && i > s && A("R2D_VALUE_INVALID", e, `expected a value <= ${s}.`), i;
}
function M(i, e, t = 0, s = Number.MAX_SAFE_INTEGER) {
  const n = W(i, e, t, s);
  return Number.isSafeInteger(n) || A("R2D_VALUE_INVALID", e, "expected a safe integer."), n;
}
function re(i, e) {
  return typeof i != "boolean" && A("R2D_VALUE_INVALID", e, "expected a boolean."), i;
}
function T(i, e, t) {
  return (typeof i != "string" || !t.includes(i)) && A("R2D_VALUE_INVALID", e, `expected one of ${t.join(", ")}.`), i;
}
function it(i, e, t, s, n) {
  return (!Array.isArray(i) || i.length !== t) && A("R2D_VALUE_INVALID", e, `expected a ${t}-number tuple.`), Object.freeze(i.map((r, o) => W(r, `${e}[${o}]`, s, n)));
}
function ht(i, e) {
  return it(i, e, 2);
}
function bs(i, e) {
  return it(i, e, 2, Number.EPSILON);
}
function Ut(i, e) {
  const t = it(i, e, 4);
  return (t[2] < 0 || t[3] < 0) && A("R2D_VALUE_INVALID", e, "rectangle width and height must be non-negative."), t;
}
function st(i, e) {
  return it(i, e, 4, 0, 1);
}
function Rt(i, e, t) {
  const s = it(i, e, 2, t);
  return s[0] > s[1] && A("R2D_VALUE_INVALID", e, "range minimum must not exceed maximum."), s;
}
function pn(i, e, t, s) {
  if (t.nodes += 1, t.nodes > $.extensionJsonNodes && A("R2D_LIMIT_EXCEEDED", e, `extension JSON exceeds ${$.extensionJsonNodes} values.`), s > $.extensionJsonDepth && A("R2D_LIMIT_EXCEEDED", e, `extension JSON exceeds depth ${$.extensionJsonDepth}.`), i === null || typeof i == "boolean")
    return i;
  if (typeof i == "string")
    return i.length > $.extensionJsonStringLength && A("R2D_LIMIT_EXCEEDED", e, `extension string exceeds ${$.extensionJsonStringLength} characters.`), i;
  if (typeof i == "number")
    return W(i, e);
  (typeof i != "object" || i === null) && A("R2D_VALUE_INVALID", e, "expected a JSON value.");
  const n = i;
  t.active.has(n) && A("R2D_GRAPH_CYCLE", e, "extension JSON contains a reference cycle."), t.active.add(n);
  try {
    if (Array.isArray(i))
      return i.length > $.extensionJsonNodes && A("R2D_LIMIT_EXCEEDED", e, `extension array exceeds ${$.extensionJsonNodes} values.`), Object.freeze(i.map((d, u) => pn(d, `${e}[${u}]`, t, s + 1)));
    const r = j(i, e), o = Object.keys(r).sort();
    o.length > $.extensionJsonNodes && A("R2D_LIMIT_EXCEEDED", e, `extension object exceeds ${$.extensionJsonNodes} keys.`);
    const a = {};
    for (const d of o)
      d.length > $.extensionJsonKeyLength && A("R2D_LIMIT_EXCEEDED", e, `extension key exceeds ${$.extensionJsonKeyLength} characters.`), a[d] = pn(r[d], `${e}.${d}`, t, s + 1);
    return Object.freeze(a);
  } finally {
    t.active.delete(n);
  }
}
function $t(i, e) {
  return pn(i, e, { active: /* @__PURE__ */ new WeakSet(), nodes: 0 }, 0);
}
function fd(i, e) {
  const t = j(i, e), s = Object.keys(t).sort();
  s.length > $.extensionCount && A("R2D_LIMIT_EXCEEDED", e, `maximum is ${$.extensionCount}.`);
  const n = {};
  for (const r of s) {
    N(r, `${e}.${r}`);
    const o = j(t[r], `${e}.${r}`, ["version", "value"]);
    n[r] = Object.freeze({ version: M(o.version, `${e}.${r}.version`, 1), value: $t(o.value, `${e}.${r}.value`) });
  }
  return Object.freeze(n);
}
function xe(i, e) {
  return i.extensions === void 0 ? {} : { extensions: fd(i.extensions, `${e}.extensions`) };
}
function ws(i, e) {
  const t = j(i, e, ["position", "rotation", "scale"]);
  return Object.freeze({ position: ht(t.position, `${e}.position`), rotation: W(t.rotation, `${e}.rotation`), scale: ht(t.scale, `${e}.scale`) });
}
function vs(i, e, t) {
  const s = j(i, e, ["kind", "id"]);
  return Object.freeze({ kind: T(s.kind, `${e}.kind`, t), id: N(s.id, `${e}.id`) });
}
function Kn(i, e) {
  const t = j(i, e, ["before", "after", "zIndex"]), s = (n, r) => (Array.isArray(n) || A("R2D_VALUE_INVALID", r, "expected an array."), Object.freeze(n.map((o, a) => vs(o, `${r}[${a}]`, ["item", "layer"]))));
  return Object.freeze({ ...t.before === void 0 ? {} : { before: s(t.before, `${e}.before`) }, ...t.after === void 0 ? {} : { after: s(t.after, `${e}.after`) }, ...t.zIndex === void 0 ? {} : { zIndex: M(t.zIndex, `${e}.zIndex`, -2147483648, 2147483647) } });
}
function pe(i, e, t, s) {
  return Array.isArray(i) || A("R2D_VALUE_INVALID", e, "expected an array."), i.length > t && A("R2D_LIMIT_EXCEEDED", e, `maximum is ${t}.`), Object.freeze(i.map((n, r) => s(n, `${e}[${r}]`)));
}
function nt(i, e) {
  return pe(i, e, $.inspectionItems, (t, s) => N(t, s));
}
function Is(i, e) {
  return {
    id: N(i.id, `${e}.id`),
    entity: N(i.entity, `${e}.entity`),
    layer: N(i.layer, `${e}.layer`),
    ...i.transform === void 0 ? {} : { transform: ws(i.transform, `${e}.transform`) },
    ...i.parent === void 0 ? {} : { parent: vs(i.parent, `${e}.parent`, ["entity"]) },
    ...i.order === void 0 ? {} : { order: Kn(i.order, `${e}.order`) },
    visible: i.visible === void 0 ? !0 : re(i.visible, `${e}.visible`),
    opacity: i.opacity === void 0 ? 1 : W(i.opacity, `${e}.opacity`, 0, 1),
    tint: i.tint === void 0 ? Object.freeze([1, 1, 1, 1]) : st(i.tint, `${e}.tint`),
    ...i.mask === void 0 ? {} : { mask: N(i.mask, `${e}.mask`) },
    ...i.target === void 0 ? {} : { target: N(i.target, `${e}.target`) },
    ...xe(i, e)
  };
}
function hd(i, e) {
  const t = j(i, e, [...ys, "texture", "sourceTarget", "normalTexture", "material", "region", "size", "anchor", "flipX", "flipY", "nineSlice"]);
  return t.texture === void 0 == (t.sourceTarget === void 0) && A("R2D_VALUE_INVALID", e, "sprite requires exactly one of texture or sourceTarget."), Object.freeze({ ...Is(t, e), ...t.texture === void 0 ? {} : { texture: N(t.texture, `${e}.texture`) }, ...t.sourceTarget === void 0 ? {} : { sourceTarget: N(t.sourceTarget, `${e}.sourceTarget`) }, ...t.normalTexture === void 0 ? {} : { normalTexture: N(t.normalTexture, `${e}.normalTexture`) }, material: N(t.material, `${e}.material`), ...t.region === void 0 ? {} : { region: Ut(t.region, `${e}.region`) }, ...t.size === void 0 ? {} : { size: bs(t.size, `${e}.size`) }, anchor: t.anchor === void 0 ? Object.freeze([0.5, 0.5]) : it(t.anchor, `${e}.anchor`, 2, 0, 1), flipX: t.flipX === void 0 ? !1 : re(t.flipX, `${e}.flipX`), flipY: t.flipY === void 0 ? !1 : re(t.flipY, `${e}.flipY`), ...t.nineSlice === void 0 ? {} : { nineSlice: it(t.nineSlice, `${e}.nineSlice`, 4, 0) } });
}
function pd(i, e) {
  const t = j(i, e, [...ys, "tilemap", "material", "tileSize", "chunkSize", "layerIndices", "tilesetTextures", "imageLayerTextures", "streaming"]), s = t.streaming === void 0 ? void 0 : j(t.streaming, `${e}.streaming`, ["preloadMarginChunks", "lowWaterChunks", "highWaterChunks", "chunksPerSlice"]), n = s?.lowWaterChunks === void 0 ? 128 : M(s.lowWaterChunks, `${e}.streaming.lowWaterChunks`, 1, $.tilemapRetainedChunks), r = s?.highWaterChunks === void 0 ? 192 : M(s.highWaterChunks, `${e}.streaming.highWaterChunks`, 1, $.tilemapRetainedChunks);
  return r < n && A("R2D_VALUE_INVALID", `${e}.streaming.highWaterChunks`, "highWaterChunks must be greater than or equal to lowWaterChunks."), Object.freeze({
    ...Is(t, e),
    tilemap: N(t.tilemap, `${e}.tilemap`),
    material: N(t.material, `${e}.material`),
    tileSize: bs(t.tileSize, `${e}.tileSize`),
    chunkSize: t.chunkSize === void 0 ? Object.freeze([32, 32]) : it(t.chunkSize, `${e}.chunkSize`, 2, 1, $.tilemapChunkDimension),
    layerIndices: t.layerIndices === void 0 ? Object.freeze([]) : pe(t.layerIndices, `${e}.layerIndices`, 256, (o, a) => M(o, a)),
    tilesetTextures: t.tilesetTextures === void 0 ? Object.freeze([]) : nt(t.tilesetTextures, `${e}.tilesetTextures`),
    imageLayerTextures: t.imageLayerTextures === void 0 ? Object.freeze([]) : nt(t.imageLayerTextures, `${e}.imageLayerTextures`),
    streaming: Object.freeze({
      preloadMarginChunks: s?.preloadMarginChunks === void 0 ? 1 : M(s.preloadMarginChunks, `${e}.streaming.preloadMarginChunks`, 0, 16),
      lowWaterChunks: n,
      highWaterChunks: r,
      chunksPerSlice: s?.chunksPerSlice === void 0 ? 32 : M(s.chunksPerSlice, `${e}.streaming.chunksPerSlice`, 1, 1024)
    })
  });
}
function md(i, e) {
  const t = j(i, e, [...ys, "text", "font", "fallbackFonts", "material", "fontSize", "lineHeight", "maxWidth", "maxHeight", "wrap", "align", "verticalAlign", "direction", "shaping", "letterSpacing", "wordSpacing", "tabSize", "missingGlyph", "replacementCodePoint"]);
  (typeof t.text != "string" || t.text.length > $.textLength) && A("R2D_VALUE_INVALID", `${e}.text`, `expected a string of at most ${$.textLength} characters.`);
  const s = t.text;
  s.length > 0 && [...s].length > $.textGlyphs && A("R2D_LIMIT_EXCEEDED", `${e}.text`, `text exceeds ${$.textGlyphs} Unicode scalars.`);
  const n = t.fallbackFonts === void 0 ? Object.freeze([]) : nt(t.fallbackFonts, `${e}.fallbackFonts`);
  n.length > $.textFallbackFonts && A("R2D_LIMIT_EXCEEDED", `${e}.fallbackFonts`, `fallback chain exceeds ${$.textFallbackFonts} fonts.`);
  const r = N(t.font, `${e}.font`);
  return (n.includes(r) || new Set(n).size !== n.length) && A("R2D_VALUE_INVALID", `${e}.fallbackFonts`, "fallback font IDs must be unique and must not repeat the primary font."), Object.freeze({
    ...Is(t, e),
    text: s,
    font: r,
    fallbackFonts: n,
    material: N(t.material, `${e}.material`),
    fontSize: W(t.fontSize, `${e}.fontSize`, Number.EPSILON),
    lineHeight: t.lineHeight === void 0 ? 1.2 : W(t.lineHeight, `${e}.lineHeight`, Number.EPSILON),
    ...t.maxWidth === void 0 ? {} : { maxWidth: W(t.maxWidth, `${e}.maxWidth`, Number.EPSILON) },
    ...t.maxHeight === void 0 ? {} : { maxHeight: W(t.maxHeight, `${e}.maxHeight`, Number.EPSILON) },
    wrap: t.wrap === void 0 ? t.maxWidth === void 0 ? "none" : "word" : T(t.wrap, `${e}.wrap`, ["none", "word", "character"]),
    align: t.align === void 0 ? "start" : T(t.align, `${e}.align`, ["start", "center", "end", "justify"]),
    verticalAlign: t.verticalAlign === void 0 ? "top" : T(t.verticalAlign, `${e}.verticalAlign`, ["top", "middle", "bottom"]),
    direction: t.direction === void 0 ? "auto" : T(t.direction, `${e}.direction`, ["ltr", "rtl", "auto"]),
    shaping: t.shaping === void 0 ? "basic" : T(t.shaping, `${e}.shaping`, ["none", "basic", "advanced-provider"]),
    letterSpacing: t.letterSpacing === void 0 ? 0 : W(t.letterSpacing, `${e}.letterSpacing`),
    wordSpacing: t.wordSpacing === void 0 ? 0 : W(t.wordSpacing, `${e}.wordSpacing`),
    tabSize: t.tabSize === void 0 ? 4 : M(t.tabSize, `${e}.tabSize`, 1, 32),
    missingGlyph: t.missingGlyph === void 0 ? "replace" : T(t.missingGlyph, `${e}.missingGlyph`, ["replace", "skip", "error"]),
    replacementCodePoint: t.replacementCodePoint === void 0 ? 65533 : M(t.replacementCodePoint, `${e}.replacementCodePoint`, 0, 1114111)
  });
}
function gd(i, e) {
  const t = j(i, e, ["id", "entity", "kind", "transform", "parent", "color", "intensity", "enabled", "radius", "direction", "layers", "shadow", "extensions"]), s = T(t.kind, `${e}.kind`, ["ambient", "directional", "point"]);
  s === "point" && t.radius === void 0 && A("R2D_VALUE_INVALID", `${e}.radius`, "point lights require radius.");
  const n = t.shadow === void 0 ? void 0 : j(t.shadow, `${e}.shadow`, ["enabled", "mode", "maxCasters"]);
  return n && s !== "point" && A("R2D_VALUE_INVALID", `${e}.shadow`, "hard shadows are supported only for point lights."), Object.freeze({ id: N(t.id, `${e}.id`), entity: N(t.entity, `${e}.entity`), kind: s, ...t.transform === void 0 ? {} : { transform: ws(t.transform, `${e}.transform`) }, ...t.parent === void 0 ? {} : { parent: vs(t.parent, `${e}.parent`, ["entity"]) }, color: st(t.color, `${e}.color`), intensity: W(t.intensity, `${e}.intensity`, 0), enabled: t.enabled === void 0 ? !0 : re(t.enabled, `${e}.enabled`), ...t.radius === void 0 ? {} : { radius: W(t.radius, `${e}.radius`, Number.EPSILON) }, ...t.direction === void 0 ? {} : { direction: W(t.direction, `${e}.direction`) }, layers: t.layers === void 0 ? Object.freeze([]) : nt(t.layers, `${e}.layers`), ...n === void 0 ? {} : { shadow: Object.freeze({ enabled: n.enabled === void 0 ? !0 : re(n.enabled, `${e}.shadow.enabled`), mode: n.mode === void 0 ? "hard" : T(n.mode, `${e}.shadow.mode`, ["hard"]), maxCasters: n.maxCasters === void 0 ? 128 : M(n.maxCasters, `${e}.shadow.maxCasters`, 0, $.shadowCasters) }) }, ...xe(t, e) });
}
function yd(i, e) {
  const t = j(i, e, ["id", "entity", "kind", "transform", "parent", "rect", "texture", "region", "points", "inverted", "extensions"]), s = T(t.kind, `${e}.kind`, ["scissor", "sprite", "path"]);
  s === "scissor" && t.rect === void 0 && A("R2D_VALUE_INVALID", `${e}.rect`, "scissor masks require a rectangle."), s === "sprite" && t.texture === void 0 && A("R2D_VALUE_INVALID", `${e}.texture`, "sprite masks require a texture.");
  const n = t.points === void 0 ? void 0 : pe(t.points, `${e}.points`, $.pathMaskPoints, (r, o) => ht(r, o));
  return s === "path" && (!n || n.length < 3) && A("R2D_VALUE_INVALID", `${e}.points`, "path masks require at least three points."), Object.freeze({ id: N(t.id, `${e}.id`), entity: N(t.entity, `${e}.entity`), kind: s, ...t.transform === void 0 ? {} : { transform: ws(t.transform, `${e}.transform`) }, ...t.parent === void 0 ? {} : { parent: vs(t.parent, `${e}.parent`, ["entity"]) }, ...t.rect === void 0 ? {} : { rect: Ut(t.rect, `${e}.rect`) }, ...t.texture === void 0 ? {} : { texture: N(t.texture, `${e}.texture`) }, ...t.region === void 0 ? {} : { region: Ut(t.region, `${e}.region`) }, ...n === void 0 ? {} : { points: n }, inverted: t.inverted === void 0 ? !1 : re(t.inverted, `${e}.inverted`), ...xe(t, e) });
}
function bd(i, e) {
  const t = j(i, e, ["time", "value", "easing"]), s = t.value, n = typeof s == "number" ? W(s, `${e}.value`) : Array.isArray(s) && s.length === 2 ? ht(s, `${e}.value`) : st(s, `${e}.value`);
  return Object.freeze({ time: W(t.time, `${e}.time`, 0), value: n, easing: t.easing === void 0 ? "linear" : T(t.easing, `${e}.easing`, ["linear", "step", "ease-in", "ease-out", "ease-in-out"]) });
}
function wd(i, e) {
  const t = j(i, e, ["id", "asset", "clip", "target", "duration", "fixedStepHz", "loop", "playbackRate", "autoplay", "tracks", "events", "extensions"]), s = W(t.duration, `${e}.duration`, Number.EPSILON), n = pe(t.tracks, `${e}.tracks`, $.animationTracks, (d, u) => {
    const l = j(d, u, ["target", "property", "keyframes"]), f = T(l.property, `${u}.property`, ["position", "rotation", "scale", "opacity", "tint", "frame"]), h = pe(l.keyframes, `${u}.keyframes`, $.animationKeyframes, bd);
    let p = -1;
    return h.length === 0 && A("R2D_VALUE_INVALID", `${u}.keyframes`, "animation track requires at least one keyframe."), h.forEach((m, y) => {
      (m.time < p || m.time > s) && A("R2D_VALUE_INVALID", `${u}.keyframes[${y}].time`, "keyframes must be ordered within duration."), p = m.time;
    }), h.forEach((m, y) => {
      const b = typeof m.value == "number", g = Array.isArray(m.value) ? m.value.length : 0;
      (f === "position" || f === "scale" ? g !== 2 : f === "tint" ? g !== 4 : !b) && A("R2D_VALUE_INVALID", `${u}.keyframes[${y}].value`, `value does not match ${f} track.`);
    }), Object.freeze({ target: N(l.target, `${u}.target`), property: f, keyframes: h });
  }), r = t.events === void 0 ? Object.freeze([]) : pe(t.events, `${e}.events`, $.animationEvents, (d, u) => {
    const l = j(d, u, ["time", "name"]);
    return Object.freeze({ time: W(l.time, `${u}.time`, 0, s), name: Qe(l.name, `${u}.name`) });
  });
  for (let d = 1; d < r.length; d++)
    r[d].time < r[d - 1].time && A("R2D_VALUE_INVALID", `${e}.events[${d}].time`, "events must be ordered by time.");
  const o = t.asset === void 0 ? void 0 : N(t.asset, `${e}.asset`), a = t.clip === void 0 ? void 0 : Qe(t.clip, `${e}.clip`);
  return (o === void 0 != (a === void 0) || o !== void 0 && t.target === void 0) && A("R2D_VALUE_INVALID", e, "asset, clip, and target must be supplied together for Animation2dProduct presentation."), Object.freeze({
    id: N(t.id, `${e}.id`),
    ...o === void 0 ? {} : { asset: o, clip: a, target: N(t.target, `${e}.target`) },
    duration: s,
    fixedStepHz: t.fixedStepHz === void 0 ? 60 : M(t.fixedStepHz, `${e}.fixedStepHz`, 1, 1e3),
    loop: t.loop === void 0 ? "none" : T(t.loop, `${e}.loop`, ["none", "repeat", "ping-pong"]),
    playbackRate: t.playbackRate === void 0 ? 1 : W(t.playbackRate, `${e}.playbackRate`, Number.EPSILON, 64),
    autoplay: t.autoplay === void 0 ? !1 : re(t.autoplay, `${e}.autoplay`),
    tracks: n,
    events: r,
    ...xe(t, e)
  });
}
function xr(i, e) {
  const t = j(i, e, ["keys"]), s = pe(t.keys, `${e}.keys`, $.particleCurveKeys, (n, r) => {
    const o = j(n, r, ["t", "value"]);
    return Object.freeze({ t: W(o.t, `${r}.t`, 0, 1), value: W(o.value, `${r}.value`, 0) });
  });
  s.length === 0 && A("R2D_VALUE_INVALID", `${e}.keys`, "particle curve requires at least one key.");
  for (let n = 1; n < s.length; n++)
    s[n].t <= s[n - 1].t && A("R2D_VALUE_INVALID", `${e}.keys[${n}].t`, "particle curve keys must be strictly ordered.");
  return Object.freeze({ keys: s });
}
function vd(i, e) {
  const t = j(i, e, [...ys, "texture", "material", "capacity", "emissionRate", "lifetime", "speed", "angle", "gravity", "size", "fixedStepHz", "seed", "autoplay", "duration", "loop", "offscreen", "maxBurst", "rotation", "angularVelocity", "sizeCurve", "opacityCurve", "colorStart", "colorEnd"]);
  return Object.freeze({
    ...Is(t, e),
    ...t.texture === void 0 ? {} : { texture: N(t.texture, `${e}.texture`) },
    material: N(t.material, `${e}.material`),
    capacity: M(t.capacity, `${e}.capacity`, 1, $.particleCapacity),
    emissionRate: W(t.emissionRate, `${e}.emissionRate`, 0),
    lifetime: Rt(t.lifetime, `${e}.lifetime`, Number.EPSILON),
    speed: t.speed === void 0 ? Object.freeze([0, 0]) : Rt(t.speed, `${e}.speed`, 0),
    angle: t.angle === void 0 ? Object.freeze([0, 0]) : Rt(t.angle, `${e}.angle`),
    gravity: t.gravity === void 0 ? Object.freeze([0, 0]) : ht(t.gravity, `${e}.gravity`),
    size: t.size === void 0 ? Object.freeze([1, 1]) : Rt(t.size, `${e}.size`, 0),
    fixedStepHz: t.fixedStepHz === void 0 ? 60 : M(t.fixedStepHz, `${e}.fixedStepHz`, 1, 1e3),
    seed: t.seed === void 0 ? 1 : M(t.seed, `${e}.seed`, 1, 4294967295),
    autoplay: t.autoplay === void 0 ? !0 : re(t.autoplay, `${e}.autoplay`),
    ...t.duration === void 0 ? {} : { duration: W(t.duration, `${e}.duration`, Number.EPSILON) },
    loop: t.loop === void 0 ? !0 : re(t.loop, `${e}.loop`),
    offscreen: t.offscreen === void 0 ? "continue" : T(t.offscreen, `${e}.offscreen`, ["continue", "pause-when-hidden"]),
    maxBurst: t.maxBurst === void 0 ? Math.min(1024, M(t.capacity, `${e}.capacity`, 1, $.particleCapacity)) : M(t.maxBurst, `${e}.maxBurst`, 0, $.particleBurst),
    rotation: t.rotation === void 0 ? Object.freeze([0, 0]) : Rt(t.rotation, `${e}.rotation`),
    angularVelocity: t.angularVelocity === void 0 ? Object.freeze([0, 0]) : Rt(t.angularVelocity, `${e}.angularVelocity`),
    ...t.sizeCurve === void 0 ? {} : { sizeCurve: xr(t.sizeCurve, `${e}.sizeCurve`) },
    ...t.opacityCurve === void 0 ? {} : { opacityCurve: xr(t.opacityCurve, `${e}.opacityCurve`) },
    colorStart: t.colorStart === void 0 ? Object.freeze([1, 1, 1, 1]) : st(t.colorStart, `${e}.colorStart`),
    colorEnd: t.colorEnd === void 0 ? Object.freeze([1, 1, 1, 0]) : st(t.colorEnd, `${e}.colorEnd`)
  });
}
const He = "forgeng.render2d:lighting-v1", ss = "forgeng.render2d:effects-v1", ns = "forgeng.render2d:path-masks-v1";
function Id(i, e) {
  const t = j(i, e, ["id", "entity", "kind", "transform", "rect", "points", "layers", "enabled", "extensions"]), s = T(t.kind, `${e}.kind`, ["rect", "polygon"]), n = t.points === void 0 ? void 0 : pe(t.points, `${e}.points`, $.pathMaskPoints, (r, o) => ht(r, o));
  return s === "rect" && t.rect === void 0 && A("R2D_VALUE_INVALID", `${e}.rect`, "rect shadow casters require a rectangle."), s === "polygon" && (!n || n.length < 3) && A("R2D_VALUE_INVALID", `${e}.points`, "polygon shadow casters require at least three points."), Object.freeze({
    id: N(t.id, `${e}.id`),
    entity: N(t.entity, `${e}.entity`),
    kind: s,
    ...t.transform === void 0 ? {} : { transform: ws(t.transform, `${e}.transform`) },
    ...t.rect === void 0 ? {} : { rect: Ut(t.rect, `${e}.rect`) },
    ...n === void 0 ? {} : { points: n },
    layers: t.layers === void 0 ? Object.freeze([]) : nt(t.layers, `${e}.layers`),
    enabled: t.enabled === void 0 ? !0 : re(t.enabled, `${e}.enabled`),
    ...xe(t, e)
  });
}
function Sd(i, e) {
  const t = j(i, e, ["id", "kind", "input", "output", "enabled", "required", "order", "options", "extensions"]), s = t.options === void 0 ? {} : j(t.options, `${e}.options`, ["brightness", "contrast", "saturation"]);
  return Object.freeze({
    id: N(t.id, `${e}.id`),
    kind: T(t.kind, `${e}.kind`, ["color-adjust"]),
    input: N(t.input, `${e}.input`),
    output: t.output === "surface" ? "surface" : N(t.output, `${e}.output`),
    enabled: t.enabled === void 0 ? !0 : re(t.enabled, `${e}.enabled`),
    required: t.required === void 0 ? !1 : re(t.required, `${e}.required`),
    order: t.order === void 0 ? 0 : M(t.order, `${e}.order`, -2147483648, 2147483647),
    options: Object.freeze({ brightness: s.brightness === void 0 ? 0 : W(s.brightness, `${e}.options.brightness`, -1, 1), contrast: s.contrast === void 0 ? 1 : W(s.contrast, `${e}.options.contrast`, 0, 4), saturation: s.saturation === void 0 ? 1 : W(s.saturation, `${e}.options.saturation`, 0, 4) }),
    ...xe(t, e)
  });
}
function Ed(i, e) {
  if (i.capability !== He)
    return i;
  const t = j(i.options ?? {}, `${e}.options`, ["maxLightsPerCamera", "shadows", "maxShadowSegmentsPerCamera"]);
  return Object.freeze({ ...i, options: Object.freeze({
    maxLightsPerCamera: t.maxLightsPerCamera === void 0 ? 32 : M(t.maxLightsPerCamera, `${e}.options.maxLightsPerCamera`, 1, $.visibleLightsPerCamera),
    shadows: t.shadows === void 0 ? "off" : T(t.shadows, `${e}.options.shadows`, ["off", "hard"]),
    maxShadowSegmentsPerCamera: t.maxShadowSegmentsPerCamera === void 0 ? 2048 : M(t.maxShadowSegmentsPerCamera, `${e}.options.maxShadowSegmentsPerCamera`, 0, $.shadowSegmentsPerCamera)
  }) });
}
function Ad(i) {
  const e = new Map(i.renderTargets.map((l) => [l.id, l])), t = new Set(i.features.map((l) => l.capability)), s = new Map(i.materials.map((l) => [l.id, l])), n = new Map(i.renderTargets.map((l) => [l.id, /* @__PURE__ */ new Set()])), r = /* @__PURE__ */ new Set(), o = (l, f, h) => {
    e.has(l) || A("R2D_REFERENCE_MISSING", h, `missing input target "${l}".`), f !== "surface" && !e.has(f) && A("R2D_REFERENCE_MISSING", h, `missing output target "${f}".`), l === f && A("R2D_GRAPH_CYCLE", h, "render-target feedback requires an explicit ping-pong pair."), r.add(l), f !== "surface" && n.get(l).add(f);
  };
  i.sprites.forEach((l, f) => {
    const h = s.get(l.material);
    if (h?.builtin === "sprite-lit" && !l.normalTexture && A("R2D_VALUE_INVALID", `$.sprites[${f}].normalTexture`, "sprite-lit materials require a normal texture."), l.normalTexture && h?.builtin !== "sprite-lit" && A("R2D_VALUE_INVALID", `$.sprites[${f}].normalTexture`, "normal textures require the sprite-lit material."), h?.builtin === "sprite-lit" && !t.has(He) && A("R2D_CAPABILITY_UNSUPPORTED", `$.sprites[${f}].material`, `sprite-lit requires ${He}.`), !l.sourceTarget)
      return;
    const p = l.target ? [l.target] : i.cameras.filter((m) => (m.layers ?? []).length === 0 || (m.layers ?? []).includes(l.layer)).map((m) => m.target ?? "surface");
    for (const m of p)
      o(l.sourceTarget, m, `$.sprites[${f}].sourceTarget`);
  }), i.effects.forEach((l, f) => o(l.input, l.output, `$.effects[${f}]`)), i.effects.length > 0 && !t.has(ss) && A("R2D_CAPABILITY_UNSUPPORTED", "$.effects", `effects require ${ss}.`), i.masks.some((l) => l.kind === "path") && !t.has(ns) && A("R2D_CAPABILITY_UNSUPPORTED", "$.masks", `path masks require ${ns}.`), i.lights.some((l) => l.shadow?.enabled) && !t.has(He) && A("R2D_CAPABILITY_UNSUPPORTED", "$.lights", `hard shadows require ${He}.`);
  for (const l of r)
    (e.get(l)?.sampleCount ?? 1) !== 1 && A("R2D_VALUE_INVALID", "$.renderTargets", `sampled target "${l}" must use sampleCount 1.`);
  const a = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), u = (l) => {
    a.has(l) && A("R2D_GRAPH_CYCLE", "$.renderTargets", `render-target cycle includes "${l}"; use createRender2dPingPongPair for temporal feedback.`), !d.has(l) && (a.add(l), n.get(l).forEach(u), a.delete(l), d.add(l));
  };
  for (const l of n.keys())
    u(l);
}
function va(i, e) {
  if (i === "f32")
    return typeof e == "number" && Number.isFinite(e);
  if (!Array.isArray(e))
    return !1;
  const t = i === "vec2f" ? 2 : 4;
  return e.length === t && e.every((s) => typeof s == "number" && Number.isFinite(s));
}
function Ia(i, e = "$") {
  const t = j(i, e, ["apiVersion", "uniforms", "textures"]);
  t.apiVersion !== 1 && A("R2D_VERSION_UNSUPPORTED", `${e}.apiVersion`, "expected 1.");
  const s = /* @__PURE__ */ new Set();
  let n = 0;
  const r = pe(t.uniforms ?? [], `${e}.uniforms`, 12, (d, u) => {
    const l = j(d, u, ["name", "type", "required", "default"]), f = Qe(l.name, `${u}.name`, 64);
    is.test(f) || A("R2D_VALUE_INVALID", `${u}.name`, "expected an identifier."), s.has(f) && A("R2D_ID_DUPLICATE", `${u}.name`, `duplicate field "${f}".`), s.add(f);
    const h = T(l.type, `${u}.type`, ["f32", "vec2f", "vec4f"]);
    return n += h === "f32" ? 1 : h === "vec2f" ? 2 : 4, n > 12 && A("R2D_LIMIT_EXCEEDED", `${e}.uniforms`, "custom uniforms exceed the 48-byte material region."), l.default !== void 0 && !va(h, l.default) && A("R2D_VALUE_INVALID", `${u}.default`, `default does not match ${h}.`), Object.freeze({ name: f, type: h, required: l.required === void 0 ? !1 : re(l.required, `${u}.required`), ...l.default === void 0 ? {} : { default: Object.freeze(Array.isArray(l.default) ? [...l.default] : l.default) } });
  }), o = /* @__PURE__ */ new Set(), a = pe(t.textures ?? [], `${e}.textures`, 2, (d, u) => {
    const l = j(d, u, ["name", "source", "sampleType", "required"]), f = Qe(l.name, `${u}.name`, 64);
    is.test(f) || A("R2D_VALUE_INVALID", `${u}.name`, "expected an identifier."), s.has(f) && A("R2D_ID_DUPLICATE", `${u}.name`, `duplicate field "${f}".`), s.add(f);
    const h = T(l.source, `${u}.source`, ["sprite", "normal"]);
    return o.has(h) && A("R2D_ID_DUPLICATE", `${u}.source`, `duplicate texture source "${h}".`), o.add(h), Object.freeze({ name: f, source: h, sampleType: T(l.sampleType, `${u}.sampleType`, ["float"]), required: l.required === void 0 ? h === "sprite" : re(l.required, `${u}.required`) });
  });
  return a.some((d) => d.source === "sprite" && d.required) || A("R2D_VALUE_INVALID", `${e}.textures`, "a required sprite texture binding is mandatory."), Object.freeze({ apiVersion: 1, uniforms: r, textures: a });
}
function xd(i, e, t = "$.parameters") {
  const s = new Map(i.uniforms.map((r) => [r.name, r]));
  for (const r of Object.keys(e)) {
    const o = s.get(r);
    o || A("R2D_UNKNOWN_KEY", `${t}.${r}`, "parameter is not declared by the material schema."), va(o.type, e[r]) || A("R2D_VALUE_INVALID", `${t}.${r}`, `value does not match ${o.type}.`);
  }
  const n = { ...e };
  for (const r of i.uniforms)
    n[r.name] === void 0 && r.default !== void 0 && (n[r.name] = r.default), n[r.name] === void 0 && r.required && A("R2D_VALUE_INVALID", `${t}.${r.name}`, "required parameter is missing.");
  return Object.freeze(n);
}
function _d(i, e) {
  const t = j(i, e, ["id", "order", "visible", "opacity", "extensions"]);
  return Object.freeze({ id: N(t.id, `${e}.id`), ...t.order === void 0 ? {} : { order: Kn(t.order, `${e}.order`) }, visible: t.visible === void 0 ? !0 : re(t.visible, `${e}.visible`), opacity: t.opacity === void 0 ? 1 : W(t.opacity, `${e}.opacity`, 0, 1), ...xe(t, e) });
}
function $d(i, e) {
  const t = j(i, e, ["id", "order", "viewport", "virtualSize", "scaleMode", "pixelSnap", "space", "safeArea", "sampling", "position", "rotation", "zoom", "clearColor", "layers", "target", "extensions"]), s = t.viewport === void 0 ? Object.freeze([0, 0, 1, 1]) : Ut(t.viewport, `${e}.viewport`);
  return (s[0] < 0 || s[1] < 0 || s[2] <= 0 || s[3] <= 0 || s[0] + s[2] > 1 || s[1] + s[3] > 1) && A("R2D_VALUE_INVALID", `${e}.viewport`, "camera viewport must be a positive normalized rectangle inside 0..1."), Object.freeze({
    id: N(t.id, `${e}.id`),
    order: t.order === void 0 ? 0 : M(t.order, `${e}.order`, -2147483648, 2147483647),
    viewport: s,
    virtualSize: bs(t.virtualSize, `${e}.virtualSize`),
    scaleMode: t.scaleMode === void 0 ? "fit" : T(t.scaleMode, `${e}.scaleMode`, ["stretch", "fit", "fill", "integer-fit", "none"]),
    pixelSnap: t.pixelSnap === void 0 ? "off" : T(t.pixelSnap, `${e}.pixelSnap`, ["off", "camera", "camera-and-items"]),
    space: t.space === void 0 ? "world" : T(t.space, `${e}.space`, ["world", "screen"]),
    safeArea: t.safeArea === void 0 ? !0 : re(t.safeArea, `${e}.safeArea`),
    sampling: t.sampling === void 0 ? "asset" : T(t.sampling, `${e}.sampling`, ["asset", "nearest", "linear"]),
    position: t.position === void 0 ? Object.freeze([0, 0]) : ht(t.position, `${e}.position`),
    rotation: t.rotation === void 0 ? 0 : W(t.rotation, `${e}.rotation`),
    zoom: t.zoom === void 0 ? 1 : W(t.zoom, `${e}.zoom`, Number.EPSILON),
    clearColor: t.clearColor === void 0 || t.clearColor === null ? null : st(t.clearColor, `${e}.clearColor`),
    layers: t.layers === void 0 ? Object.freeze([]) : nt(t.layers, `${e}.layers`),
    ...t.target === void 0 ? {} : { target: N(t.target, `${e}.target`) },
    ...xe(t, e)
  });
}
function zd(i, e) {
  const t = j(i, e, ["id", "minFilter", "magFilter", "mipmapFilter", "addressU", "addressV", "maxAnisotropy", "extensions"]);
  return Object.freeze({ id: N(t.id, `${e}.id`), minFilter: t.minFilter === void 0 ? "linear" : T(t.minFilter, `${e}.minFilter`, ["nearest", "linear"]), magFilter: t.magFilter === void 0 ? "linear" : T(t.magFilter, `${e}.magFilter`, ["nearest", "linear"]), mipmapFilter: t.mipmapFilter === void 0 ? "linear" : T(t.mipmapFilter, `${e}.mipmapFilter`, ["nearest", "linear"]), addressU: t.addressU === void 0 ? "clamp-to-edge" : T(t.addressU, `${e}.addressU`, ["clamp-to-edge", "repeat", "mirror-repeat"]), addressV: t.addressV === void 0 ? "clamp-to-edge" : T(t.addressV, `${e}.addressV`, ["clamp-to-edge", "repeat", "mirror-repeat"]), maxAnisotropy: t.maxAnisotropy === void 0 ? 1 : M(t.maxAnisotropy, `${e}.maxAnisotropy`, 1, 16), ...xe(t, e) });
}
function Od(i, e) {
  const t = j(i, e, ["id", "kind", "builtin", "shaderAsset", "shaderAbi", "schema", "sampler", "blendMode", "depthMode", "reorderSafe", "parameters", "extensions"]), s = T(t.kind, `${e}.kind`, ["builtin", "custom"]);
  s === "builtin" && t.shaderAsset !== void 0 && A("R2D_VALUE_INVALID", `${e}.shaderAsset`, "builtin materials cannot define a shader asset."), s === "custom" && t.shaderAsset === void 0 && A("R2D_VALUE_INVALID", `${e}.shaderAsset`, "custom materials require a shader asset.");
  const n = t.shaderAbi === void 0 ? void 0 : (() => {
    const l = j(t.shaderAbi, `${e}.shaderAbi`, ["version", "vertexEntry", "fragmentEntry", "bindings", "attributes"]);
    l.version !== fn && A("R2D_VERSION_UNSUPPORTED", `${e}.shaderAbi.version`, `expected ${fn}.`);
    const f = l.bindings === void 0 ? [] : pe(l.bindings, `${e}.shaderAbi.bindings`, 32, (h, p) => {
      const m = j(h, p, ["name", "kind", "valueType", "group", "binding", "visibility"]), y = Qe(m.name, `${p}.name`, 64);
      return is.test(y) || A("R2D_VALUE_INVALID", `${p}.name`, "expected an identifier."), Object.freeze({ name: y, kind: T(m.kind, `${p}.kind`, ["uniform", "texture", "sampler", "storage-read"]), ...m.valueType === void 0 ? {} : { valueType: T(m.valueType, `${p}.valueType`, ["f32", "vec2f", "vec3f", "vec4f", "mat3x2f", "mat4x4f"]) }, ...m.group === void 0 ? {} : { group: M(m.group, `${p}.group`, 0, 0) }, ...m.binding === void 0 ? {} : { binding: M(m.binding, `${p}.binding`, 0, 4) }, ...m.visibility === void 0 ? {} : { visibility: T(m.visibility, `${p}.visibility`, ["vertex", "fragment", "vertex-fragment"]) } });
    });
    return Object.freeze({ version: 1, vertexEntry: Qe(l.vertexEntry, `${e}.shaderAbi.vertexEntry`, 64), fragmentEntry: Qe(l.fragmentEntry, `${e}.shaderAbi.fragmentEntry`, 64), bindings: f, attributes: l.attributes === void 0 ? Object.freeze([]) : pe(l.attributes, `${e}.shaderAbi.attributes`, 8, (h, p) => T(h, p, ["position", "uv", "color", "instance-transform"])) });
  })(), r = {};
  if (t.parameters !== void 0)
    for (const [l, f] of Object.entries(j(t.parameters, `${e}.parameters`)).sort(([h], [p]) => h.localeCompare(p)))
      is.test(l) || A("R2D_VALUE_INVALID", `${e}.parameters.${l}`, "expected an identifier key."), r[l] = typeof f == "number" ? W(f, `${e}.parameters.${l}`) : Array.isArray(f) && f.length === 2 ? ht(f, `${e}.parameters.${l}`) : st(f, `${e}.parameters.${l}`);
  const o = t.schema === void 0 ? void 0 : Ia(t.schema, `${e}.schema`), a = o === void 0 ? Object.freeze(r) : xd(o, r, `${e}.parameters`), d = t.blendMode === void 0 ? "alpha" : T(t.blendMode, `${e}.blendMode`, ["opaque", "alpha", "premultiplied-alpha", "add", "multiply", "screen"]), u = t.reorderSafe === void 0 ? !1 : re(t.reorderSafe, `${e}.reorderSafe`);
  return u && d !== "opaque" && A("R2D_VALUE_INVALID", `${e}.reorderSafe`, "only opaque materials may opt into reorder-safe grouping."), Object.freeze({ id: N(t.id, `${e}.id`), kind: s, ...t.builtin === void 0 ? {} : { builtin: T(t.builtin, `${e}.builtin`, ["sprite", "sprite-lit", "bitmap-text", "msdf-text", "particle"]) }, ...t.shaderAsset === void 0 ? {} : { shaderAsset: N(t.shaderAsset, `${e}.shaderAsset`) }, ...n === void 0 ? {} : { shaderAbi: n }, ...o === void 0 ? {} : { schema: o }, ...t.sampler === void 0 ? {} : { sampler: N(t.sampler, `${e}.sampler`) }, blendMode: d, depthMode: t.depthMode === void 0 ? "disabled" : T(t.depthMode, `${e}.depthMode`, ["disabled", "read", "read-write"]), reorderSafe: u, parameters: a, ...xe(t, e) });
}
function Dd(i, e) {
  const t = j(i, e, ["id", "size", "scale", "format", "sampleCount", "clearColor", "persistent", "extensions"]);
  t.size === void 0 && t.scale === void 0 && A("R2D_VALUE_INVALID", e, "render target requires size or scale."), t.size !== void 0 && t.scale !== void 0 && A("R2D_VALUE_INVALID", e, "render target size and scale are mutually exclusive.");
  const s = t.sampleCount === void 0 ? 1 : M(t.sampleCount, `${e}.sampleCount`, 1, 8);
  return wa.includes(s) || A("R2D_VALUE_INVALID", `${e}.sampleCount`, "expected 1, 2, 4, or 8."), Object.freeze({ id: N(t.id, `${e}.id`), ...t.size === void 0 ? {} : { size: bs(t.size, `${e}.size`) }, ...t.scale === void 0 ? {} : { scale: W(t.scale, `${e}.scale`, Number.EPSILON, 4) }, format: t.format === void 0 ? "rgba8unorm-srgb" : T(t.format, `${e}.format`, ud), sampleCount: s, clearColor: t.clearColor === void 0 ? Object.freeze([0, 0, 0, 0]) : st(t.clearColor, `${e}.clearColor`), persistent: t.persistent === void 0 ? !1 : re(t.persistent, `${e}.persistent`), ...xe(t, e) });
}
function Cd(i, e) {
  const t = j(i, e, ["id", "capability", "required", "order", "options", "extensions"]), s = {};
  if (t.options !== void 0)
    for (const [n, r] of Object.entries(j(t.options, `${e}.options`)).sort(([o], [a]) => o.localeCompare(a)))
      s[n] = $t(r, `${e}.options.${n}`);
  return Ed(Object.freeze({ id: N(t.id, `${e}.id`), capability: N(t.capability, `${e}.capability`), required: t.required === void 0 ? !1 : re(t.required, `${e}.required`), ...t.order === void 0 ? {} : { order: Kn(t.order, `${e}.order`) }, options: Object.freeze(s), ...xe(t, e) }), e);
}
function Nd(i) {
  const e = [i.layers, i.cameras, i.samplers, i.materials, i.sprites, i.tilemaps, i.texts, i.animations, i.particles, i.lights, i.masks, i.shadowCasters, i.renderTargets, i.effects, i.features], t = ["layers", "cameras", "samplers", "materials", "sprites", "tilemaps", "texts", "animations", "particles", "lights", "masks", "shadowCasters", "renderTargets", "effects", "features"], s = /* @__PURE__ */ new Map();
  e.forEach((v, I) => v.forEach((x, R) => {
    const P = s.get(x.id);
    P && A("R2D_ID_DUPLICATE", `$.${t[I]}[${R}].id`, `duplicate "${x.id}" first declared at ${P}.`), s.set(x.id, `$.${t[I]}[${R}].id`);
  }));
  const n = new Set(i.layers.map((v) => v.id)), r = new Set(i.materials.map((v) => v.id)), o = new Set(i.samplers.map((v) => v.id)), a = new Set(i.masks.map((v) => v.id)), d = new Set(i.renderTargets.map((v) => v.id)), u = [...i.sprites, ...i.tilemaps, ...i.texts, ...i.particles], l = new Set([...u, ...i.features].map((v) => v.id)), f = /* @__PURE__ */ new Map(), h = (v, I, x) => {
    I !== void 0 && !v.has(I) && A("R2D_REFERENCE_MISSING", x, `missing reference "${I}".`);
  };
  i.materials.forEach((v, I) => h(o, v.sampler, `$.materials[${I}].sampler`)), i.cameras.forEach((v, I) => {
    v.layers?.forEach((x, R) => h(n, x, `$.cameras[${I}].layers[${R}]`)), h(d, v.target, `$.cameras[${I}].target`);
  }), u.forEach((v, I) => {
    const x = I < i.sprites.length ? "sprites" : I < i.sprites.length + i.tilemaps.length ? "tilemaps" : I < i.sprites.length + i.tilemaps.length + i.texts.length ? "texts" : "particles", R = x === "sprites" ? 0 : x === "tilemaps" ? i.sprites.length : x === "texts" ? i.sprites.length + i.tilemaps.length : i.sprites.length + i.tilemaps.length + i.texts.length, P = `$.${x}[${I - R}]`;
    h(n, v.layer, `${P}.layer`), h(r, v.material, `${P}.material`), h(a, v.mask, `${P}.mask`), h(d, v.target, `${P}.target`);
    const L = v.parent?.id, H = f.get(v.entity);
    f.has(v.entity) && H !== L && A("R2D_VALUE_INVALID", `${P}.parent`, `entity "${v.entity}" has conflicting parents.`), f.set(v.entity, L);
  }), [...i.lights, ...i.masks].forEach((v) => {
    f.has(v.entity) || f.set(v.entity, v.parent?.id);
  });
  for (const [v, I] of f)
    I !== void 0 && !f.has(I) && A("R2D_REFERENCE_MISSING", "$.parent", `entity "${v}" references missing parent "${I}".`);
  const p = (v, I, x) => {
    if (I.has(v) && A("R2D_GRAPH_CYCLE", "$.parent", `parent cycle includes "${v}".`), x.has(v))
      return;
    I.add(v);
    const R = f.get(v);
    R !== void 0 && p(R, I, x), I.delete(v), x.add(v);
  }, m = /* @__PURE__ */ new Set();
  for (const v of f.keys())
    p(v, /* @__PURE__ */ new Set(), m);
  const y = /* @__PURE__ */ new Set([...n, ...l]), b = new Map([...y].map((v) => [v, /* @__PURE__ */ new Set()])), g = (v, I) => {
    for (const x of ["before", "after"])
      v.order?.[x]?.forEach((R, P) => {
        h(R.kind === "layer" ? n : l, R.id, `${I}.order.${x}[${P}].id`);
        const L = x === "before" ? v.id : R.id, H = x === "before" ? R.id : v.id;
        b.get(L).add(H);
      });
  };
  i.layers.forEach((v, I) => g(v, `$.layers[${I}]`)), u.forEach((v, I) => g(v, `$.items[${I}]`)), i.features.forEach((v, I) => g(v, `$.features[${I}]`));
  const w = /* @__PURE__ */ new Set(), z = /* @__PURE__ */ new Set(), O = (v) => {
    w.has(v) && A("R2D_GRAPH_CYCLE", "$.order", `ordering cycle includes "${v}".`), !z.has(v) && (w.add(v), b.get(v).forEach(O), w.delete(v), z.add(v));
  };
  y.forEach(O), i.animations.forEach((v, I) => v.tracks.forEach((x, R) => h(l, x.target, `$.animations[${I}].tracks[${R}].target`))), i.animations.forEach((v, I) => h(l, v.target, `$.animations[${I}].target`)), i.lights.forEach((v, I) => v.layers?.forEach((x, R) => h(n, x, `$.lights[${I}].layers[${R}]`))), i.shadowCasters.forEach((v, I) => v.layers?.forEach((x, R) => h(n, x, `$.shadowCasters[${I}].layers[${R}]`))), i.particles.reduce((v, I) => v + I.capacity, 0) > $.particleSceneCapacity && A("R2D_LIMIT_EXCEEDED", "$.particles", `total particle capacity exceeds ${$.particleSceneCapacity}.`), Ad(i);
}
function kd(i) {
  const e = j(i, "$", ["contractVersion", "id", "version", "coordinateSystem", "colorSpace", "layers", "cameras", "samplers", "materials", "sprites", "tilemaps", "texts", "animations", "particles", "lights", "masks", "shadowCasters", "renderTargets", "effects", "features", "extensions"]);
  e.contractVersion !== Ds && A("R2D_VERSION_UNSUPPORTED", "$.contractVersion", `expected ${Ds}.`);
  const t = (n, r, o) => pe(e[n] ?? [], `$.${n}`, r, o), s = Object.freeze({
    contractVersion: Ds,
    id: N(e.id, "$.id"),
    version: e.version === void 0 ? 1 : M(e.version, "$.version", 1),
    coordinateSystem: e.coordinateSystem === void 0 ? "x-right-y-down-clockwise-radians" : T(e.coordinateSystem, "$.coordinateSystem", ["x-right-y-down-clockwise-radians"]),
    colorSpace: e.colorSpace === void 0 ? "srgb-straight-alpha" : T(e.colorSpace, "$.colorSpace", ["srgb-straight-alpha"]),
    layers: t("layers", $.layers, _d),
    cameras: t("cameras", $.cameras, $d),
    samplers: t("samplers", $.samplers, zd),
    materials: t("materials", $.materials, Od),
    sprites: t("sprites", $.sprites, hd),
    tilemaps: t("tilemaps", $.tilemaps, pd),
    texts: t("texts", $.texts, md),
    animations: t("animations", $.animations, wd),
    particles: t("particles", $.particles, vd),
    lights: t("lights", $.lights, gd),
    masks: t("masks", $.masks, yd),
    shadowCasters: t("shadowCasters", $.shadowCasters, Id),
    renderTargets: t("renderTargets", $.renderTargets, Dd),
    effects: t("effects", $.effects, Sd),
    features: t("features", $.features, Cd),
    ...xe(e, "$")
  });
  return Nd(s), s;
}
function Hn(i) {
  return kd(i);
}
function Qi(i, e = "$") {
  const t = j(i, e, ["snapshotVersion", "resolutionScale", "sampleCount", "textureFilter", "lighting", "masks", "effects"]);
  t.snapshotVersion !== void 0 && t.snapshotVersion !== Cs && A("R2D_VERSION_UNSUPPORTED", `${e}.snapshotVersion`, `expected ${Cs}.`);
  const s = t.sampleCount === void 0 ? 1 : M(t.sampleCount, `${e}.sampleCount`, 1, 8);
  return wa.includes(s) || A("R2D_VALUE_INVALID", `${e}.sampleCount`, "expected 1, 2, 4, or 8."), Object.freeze({ snapshotVersion: Cs, resolutionScale: t.resolutionScale === void 0 ? 1 : W(t.resolutionScale, `${e}.resolutionScale`, 0.25, 2), sampleCount: s, textureFilter: t.textureFilter === void 0 ? "linear" : T(t.textureFilter, `${e}.textureFilter`, ["nearest", "linear"]), lighting: t.lighting === void 0 ? !1 : re(t.lighting, `${e}.lighting`), masks: t.masks === void 0 ? !0 : re(t.masks, `${e}.masks`), effects: t.effects === void 0 ? Object.freeze([]) : nt(t.effects, `${e}.effects`) });
}
function Rd(i) {
  const e = j(i, "$", ["snapshotVersion", "revision", "definitionId", "generation", "phase", "requested", "effective", "committed", "rejections"]);
  e.snapshotVersion !== 1 && A("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1.");
  const t = pe(e.rejections, "$.rejections", $.features, (s, n) => {
    const r = j(s, n, ["code", "path", "requested", "available"]);
    return Object.freeze({ code: T(r.code, `${n}.code`, ["R2D_CAPABILITY_MISSING", "R2D_LIMIT_EXCEEDED", "R2D_FORMAT_UNSUPPORTED", "R2D_SAMPLE_COUNT_UNSUPPORTED"]), path: Qe(r.path, `${n}.path`, 512), requested: $t(r.requested, `${n}.requested`), available: $t(r.available, `${n}.available`) });
  });
  return Object.freeze({ snapshotVersion: 1, revision: M(e.revision, "$.revision"), definitionId: N(e.definitionId, "$.definitionId"), generation: M(e.generation, "$.generation", 1), phase: T(e.phase, "$.phase", ["created", "probing", "initializing", "ready", "attaching", "attached", "extracting", "contributing", "lost", "recovering", "failed", "detaching", "destroying", "destroyed"]), requested: Qi(e.requested, "$.requested"), effective: Qi(e.effective, "$.effective"), committed: e.committed === null ? null : Qi(e.committed, "$.committed"), rejections: t });
}
function Pd(i, e) {
  const t = j(i, e, ["id", "kind", "entity", "layer", "order", "bounds", "opacity", "tint", "assetIds", "transform", "materialId", "targetId", "maskId"]), s = t.transform === void 0 ? void 0 : it(t.transform, `${e}.transform`, 6);
  return Object.freeze({ id: N(t.id, `${e}.id`), kind: T(t.kind, `${e}.kind`, ["sprite", "tilemap", "text", "particle", "light", "mask"]), entity: N(t.entity, `${e}.entity`), layer: N(t.layer, `${e}.layer`), order: M(t.order, `${e}.order`, -2147483648, 2147483647), bounds: Ut(t.bounds, `${e}.bounds`), opacity: W(t.opacity, `${e}.opacity`, 0, 1), tint: st(t.tint, `${e}.tint`), assetIds: nt(t.assetIds, `${e}.assetIds`), ...s === void 0 ? {} : { transform: s }, ...t.materialId === void 0 ? {} : { materialId: N(t.materialId, `${e}.materialId`) }, ...t.targetId === void 0 ? {} : { targetId: N(t.targetId, `${e}.targetId`) }, ...t.maskId === void 0 ? {} : { maskId: t.maskId === null ? null : N(t.maskId, `${e}.maskId`) } });
}
function jd(i) {
  const e = j(i, "$", ["snapshotVersion", "sceneId", "sceneGeneration", "frame", "simulationTick", "alpha", "cameraIds", "items"]);
  return e.snapshotVersion !== 1 && A("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 1."), Object.freeze({ snapshotVersion: 1, sceneId: N(e.sceneId, "$.sceneId"), sceneGeneration: M(e.sceneGeneration, "$.sceneGeneration", 1), frame: M(e.frame, "$.frame"), simulationTick: M(e.simulationTick, "$.simulationTick"), alpha: W(e.alpha, "$.alpha", 0, 1), cameraIds: nt(e.cameraIds, "$.cameraIds"), items: pe(e.items, "$.items", $.inspectionItems, Pd) });
}
function Sa(i, e) {
  const t = j(i, e, ["layerId", "x", "y", "gid"]);
  return Object.freeze({
    layerId: M(t.layerId, `${e}.layerId`, 1, 2147483647),
    x: M(t.x, `${e}.x`, -2147483647, 2147483647),
    y: M(t.y, `${e}.y`, -2147483647, 2147483647),
    gid: M(t.gid, `${e}.gid`, 0, 4294967295)
  });
}
function Ea(i, e) {
  const t = /* @__PURE__ */ new Map();
  for (let s = 0; s < i.length; s += 1) {
    const n = i[s], r = `${n.layerId}:${n.x}:${n.y}`;
    if (t.has(r))
      throw new TypeError(`R2D_VALUE_INVALID at ${e}[${s}]: duplicate tile coordinate ${r}.`);
    t.set(r, n);
  }
  return Object.freeze([...t.values()].sort((s, n) => s.layerId - n.layerId || s.y - n.y || s.x - n.x));
}
function Td(i) {
  const e = j(i, "$", ["patchVersion", "tilemapId", "expectedRevision", "patches"]);
  if (e.patchVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.patchVersion: expected 1.");
  const t = pe(e.patches, "$.patches", $.tilemapPatches, Sa);
  return Object.freeze({
    patchVersion: 1,
    tilemapId: N(e.tilemapId, "$.tilemapId"),
    expectedRevision: M(e.expectedRevision, "$.expectedRevision", 0),
    patches: Ea(t, "$.patches")
  });
}
function _r(i) {
  const e = j(i, "$", ["snapshotVersion", "tilemapId", "revision", "patches"]);
  if (e.snapshotVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.snapshotVersion: expected 1.");
  const t = pe(e.patches, "$.patches", $.tilemapPatches, Sa);
  return Object.freeze({
    snapshotVersion: 1,
    tilemapId: N(e.tilemapId, "$.tilemapId"),
    revision: M(e.revision, "$.revision", 0),
    patches: Ea(t, "$.patches")
  });
}
function Aa(i, e) {
  (typeof i != "string" || i.length > $.textLength) && A("R2D_VALUE_INVALID", e, `expected a string of at most ${$.textLength} characters.`);
  const t = i;
  return [...t].length > $.textGlyphs && A("R2D_LIMIT_EXCEEDED", e, "too many Unicode scalars."), t;
}
function Ld(i) {
  const e = j(i, "$", ["updateVersion", "textId", "expectedRevision", "text"]);
  if (e.updateVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.updateVersion: expected 1.");
  return Object.freeze({
    updateVersion: 1,
    textId: N(e.textId, "$.textId"),
    expectedRevision: M(e.expectedRevision, "$.expectedRevision", 0),
    text: Aa(e.text, "$.text")
  });
}
function $r(i) {
  const e = j(i, "$", ["snapshotVersion", "textId", "revision", "text"]);
  if (e.snapshotVersion !== 1)
    throw new TypeError("R2D_VERSION_UNSUPPORTED at $.snapshotVersion: expected 1.");
  return Object.freeze({
    snapshotVersion: 1,
    textId: N(e.textId, "$.textId"),
    revision: M(e.revision, "$.revision", 0),
    text: Aa(e.text, "$.text")
  });
}
function Md(i) {
  const e = j(i, "$", ["commandVersion", "animationId", "expectedRevision", "command", "time", "speed", "direction", "toAnimationId", "transitionTicks"]);
  e.commandVersion !== 1 && A("R2D_VERSION_UNSUPPORTED", "$.commandVersion", "expected 1.");
  const t = T(e.command, "$.command", ["play", "pause", "stop", "seek", "set-speed", "set-direction", "transition"]);
  t === "seek" && e.time === void 0 && A("R2D_VALUE_INVALID", "$.time", "seek requires time."), t === "set-speed" && e.speed === void 0 && A("R2D_VALUE_INVALID", "$.speed", "set-speed requires speed."), t === "set-direction" && e.direction === void 0 && A("R2D_VALUE_INVALID", "$.direction", "set-direction requires direction."), t === "transition" && (e.toAnimationId === void 0 || e.transitionTicks === void 0) && A("R2D_VALUE_INVALID", "$.transition", "transition requires toAnimationId and transitionTicks.");
  const s = e.direction === void 0 ? void 0 : M(e.direction, "$.direction", -1, 1);
  return s !== void 0 && s !== -1 && s !== 1 && A("R2D_VALUE_INVALID", "$.direction", "direction must be -1 or 1."), Object.freeze({
    commandVersion: 1,
    animationId: N(e.animationId, "$.animationId"),
    expectedRevision: M(e.expectedRevision, "$.expectedRevision"),
    command: t,
    ...e.time === void 0 ? {} : { time: W(e.time, "$.time", 0) },
    ...e.speed === void 0 ? {} : { speed: W(e.speed, "$.speed", Number.EPSILON, 64) },
    ...s === void 0 ? {} : { direction: s },
    ...e.toAnimationId === void 0 ? {} : { toAnimationId: N(e.toAnimationId, "$.toAnimationId") },
    ...e.transitionTicks === void 0 ? {} : { transitionTicks: M(e.transitionTicks, "$.transitionTicks", 0, $.animationAdvanceTicks) }
  });
}
function Vd(i) {
  const e = j(i, "$", ["commandVersion", "emitterId", "expectedRevision", "command", "count", "timeScale"]);
  e.commandVersion !== 1 && A("R2D_VERSION_UNSUPPORTED", "$.commandVersion", "expected 1.");
  const t = T(e.command, "$.command", ["play", "pause", "stop", "burst", "set-time-scale"]);
  return t === "burst" && e.count === void 0 && A("R2D_VALUE_INVALID", "$.count", "burst requires count."), t === "set-time-scale" && e.timeScale === void 0 && A("R2D_VALUE_INVALID", "$.timeScale", "set-time-scale requires timeScale."), Object.freeze({
    commandVersion: 1,
    emitterId: N(e.emitterId, "$.emitterId"),
    expectedRevision: M(e.expectedRevision, "$.expectedRevision"),
    command: t,
    ...e.count === void 0 ? {} : { count: M(e.count, "$.count", 0, $.particleBurst) },
    ...e.timeScale === void 0 ? {} : { timeScale: W(e.timeScale, "$.timeScale", 0, 16) }
  });
}
const Gd = 1, Fd = 1, zr = "1.0.0", xa = Object.freeze({
  off: Object.freeze({ history: 0, cameras: 0, layers: 0, targets: 0, features: 0, assets: 0, failures: 0, selections: 0, overheadBudgetMicros: 0 }),
  "production-lite": Object.freeze({ history: 1, cameras: 8, layers: 32, targets: 8, features: 16, assets: 32, failures: 8, selections: 0, overheadBudgetMicros: 250 }),
  diagnostic: Object.freeze({ history: 16, cameras: 32, layers: 128, targets: 32, features: 64, assets: 256, failures: 32, selections: 128, overheadBudgetMicros: 1e3 }),
  lab: Object.freeze({ history: 64, cameras: 64, layers: 256, targets: 128, features: 128, assets: 1024, failures: 64, selections: 512, overheadBudgetMicros: 4e3 })
});
function _a(i = {}) {
  const e = j(i, "$", ["profile", "maximumHistory", "maximumSelections"]), t = e.profile === void 0 ? "production-lite" : T(e.profile, "$.profile", ["off", "production-lite", "diagnostic", "lab"]), s = xa[t], n = e.maximumHistory === void 0 ? s.history : M(e.maximumHistory, "$.maximumHistory", 0, s.history), r = e.maximumSelections === void 0 ? s.selections : M(e.maximumSelections, "$.maximumSelections", 0, Math.min(s.selections, $.inspectionItems));
  return Object.freeze({ profile: t, limits: Object.freeze({ ...s, history: n, selections: r }) });
}
function $a(i) {
  const e = j(i, "$", ["snapshotVersion", "apiVersion", "schemaVersion", "profile", "composition", "engine", "scene", "domain", "resourceOwners", "selection", "overhead", "destroyed"]);
  e.snapshotVersion !== 2 && A("R2D_VERSION_UNSUPPORTED", "$.snapshotVersion", "expected 2."), e.apiVersion !== 1 && A("R2D_VERSION_UNSUPPORTED", "$.apiVersion", "expected 1."), e.schemaVersion !== "1.0.0" && A("R2D_VERSION_UNSUPPORTED", "$.schemaVersion", "expected 1.0.0.");
  const t = T(e.profile, "$.profile", ["off", "production-lite", "diagnostic", "lab"]), s = $t(e, "$"), n = xa[t];
  return ((s.domain?.cameras.length ?? 0) > n.cameras || (s.domain?.layers.length ?? 0) > n.layers || (s.domain?.targets.length ?? 0) > n.targets || (s.domain?.features.length ?? 0) > n.features || (s.domain?.assets.length ?? 0) > n.assets || (s.domain?.failures.length ?? 0) > n.failures) && A("R2D_LIMIT_EXCEEDED", "$.domain", `snapshot exceeds the ${t} inspection profile.`), s;
}
function Bd(i) {
  const e = j(i, "$", ["exportVersion", "schemaVersion", "minimumReaderVersion", "migrations", "definition", "inspection"]);
  return (e.exportVersion !== 1 || e.minimumReaderVersion !== 1 || e.schemaVersion !== "1.0.0") && A("R2D_VERSION_UNSUPPORTED", "$", "expected editor export 1 / schema 1.0.0."), $t(e.definition, "$.definition"), $a(e.inspection), $t(e, "$");
}
class Si extends Error {
  constructor(t, s, n = null, r = null, o) {
    super(s);
    c(this, "code");
    c(this, "path");
    c(this, "id");
    c(this, "name", "InputActionsError");
    c(this, "cause");
    this.code = t, this.path = n, this.id = r, this.cause = o?.cause;
  }
}
function q(i, e, t, s) {
  throw new Si(i, s ?? `Input Actions ${i} at "${e}".`, e, t ?? null);
}
function Ze(i, e) {
  (typeof i != "object" || i === null || Array.isArray(i)) && q("ACTIONS_INVALID_DEFINITION", e);
}
function ge(i, e, t) {
  const s = Object.keys(i).find((n) => !e.includes(n));
  s && q("ACTIONS_INVALID_DEFINITION", `${t}.${s}`, void 0, `${t} does not allow "${s}".`);
}
function We(i, e) {
  return (typeof i != "number" || !Number.isFinite(i)) && q("ACTIONS_INVALID_DEFINITION", e), i;
}
function oi(i, e) {
  const t = We(i, e);
  return t <= 0 && q("ACTIONS_INVALID_DEFINITION", e), t;
}
function Vt(i, e) {
  const t = We(i, e);
  return (t < 0 || t > 1) && q("ACTIONS_INVALID_DEFINITION", e), t;
}
function za(i, e) {
  switch (Ze(i, e), i.kind) {
    case "dead-zone": {
      ge(i, ["kind", "minimum", "maximum"], e);
      const t = Vt(i.minimum, `${e}.minimum`), s = Vt(i.maximum, `${e}.maximum`);
      return t >= s && q("ACTIONS_INVALID_DEFINITION", e), Object.freeze({ kind: "dead-zone", minimum: t, maximum: s });
    }
    case "scale": {
      ge(i, ["kind", "factor"], e);
      const t = Array.isArray(i.factor) ? Object.freeze([We(i.factor[0], `${e}.factor[0]`), We(i.factor[1], `${e}.factor[1]`)]) : We(i.factor, `${e}.factor`);
      return Object.freeze({ kind: "scale", factor: t });
    }
    case "invert":
      return ge(i, ["kind", "x", "y"], e), (typeof i.x != "boolean" || typeof i.y != "boolean") && q("ACTIONS_INVALID_DEFINITION", e), Object.freeze({ kind: "invert", x: i.x, y: i.y });
    case "clamp": {
      ge(i, ["kind", "minimum", "maximum"], e);
      const t = We(i.minimum, `${e}.minimum`), s = We(i.maximum, `${e}.maximum`);
      return t > s && q("ACTIONS_INVALID_DEFINITION", e), Object.freeze({ kind: "clamp", minimum: t, maximum: s });
    }
    case "normalize":
      return ge(i, ["kind"], e), Object.freeze({ kind: "normalize" });
    case "sensitivity":
      return ge(i, ["kind", "factor"], e), Object.freeze({ kind: "sensitivity", factor: oi(i.factor, `${e}.factor`) });
    default:
      return q("ACTIONS_INVALID_DEFINITION", `${e}.kind`);
  }
}
function Oa(i, e) {
  switch (Ze(i, e), i.kind) {
    case "press":
      return ge(i, ["kind", "behavior", "threshold"], e), ["press-only", "release-only", "press-and-release"].includes(i.behavior) || q("ACTIONS_INVALID_DEFINITION", `${e}.behavior`), Object.freeze({ kind: "press", behavior: i.behavior, threshold: Vt(i.threshold, `${e}.threshold`) });
    case "hold":
      return ge(i, ["kind", "durationMs", "threshold"], e), Object.freeze({ kind: "hold", durationMs: oi(i.durationMs, `${e}.durationMs`), threshold: Vt(i.threshold, `${e}.threshold`) });
    case "tap":
      return ge(i, ["kind", "maximumDurationMs", "threshold"], e), Object.freeze({ kind: "tap", maximumDurationMs: oi(i.maximumDurationMs, `${e}.maximumDurationMs`), threshold: Vt(i.threshold, `${e}.threshold`) });
    case "multi-tap":
      return ge(i, ["kind", "tapCount", "maximumTapDurationMs", "maximumDelayMs", "threshold"], e), (!Number.isSafeInteger(i.tapCount) || i.tapCount < 2 || i.tapCount > 8) && q("ACTIONS_INVALID_DEFINITION", `${e}.tapCount`), Object.freeze({
        kind: "multi-tap",
        tapCount: i.tapCount,
        maximumTapDurationMs: oi(i.maximumTapDurationMs, `${e}.maximumTapDurationMs`),
        maximumDelayMs: oi(i.maximumDelayMs, `${e}.maximumDelayMs`),
        threshold: Vt(i.threshold, `${e}.threshold`)
      });
    default:
      return q("ACTIONS_INVALID_DEFINITION", `${e}.kind`);
  }
}
const Ud = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*:[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, Wd = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, Yd = /^<(Keyboard|Pointer|Wheel|Gamepad|Touch|Virtual)>\/[A-Za-z0-9._/-]+$/;
function Da(i, e) {
  (typeof i != "string" || i.length > 160 || !Ud.test(i)) && q("ACTIONS_INVALID_ID", e, typeof i == "string" ? i : void 0);
}
function Xn(i, e) {
  (typeof i != "string" || i.length > 128 || !Wd.test(i)) && q("ACTIONS_INVALID_ID", e, typeof i == "string" ? i : void 0);
}
function ut(i, e = "control") {
  (typeof i != "string" || i.length > 192 || !Yd.test(i)) && q("ACTIONS_INVALID_CONTROL_PATH", e, typeof i == "string" ? i : void 0);
}
function yi(i, e, t = 0) {
  if (t > 16 && q("ACTIONS_INVALID_DEFINITION", e), i === null || typeof i == "string" || typeof i == "boolean")
    return i;
  if (typeof i == "number")
    return We(i, e);
  if (Array.isArray(i))
    return Object.freeze(i.map((r, o) => yi(r, `${e}[${o}]`, t + 1)));
  Ze(i, e);
  const s = {}, n = Object.keys(i).sort();
  n.length > 128 && q("ACTIONS_INVALID_DEFINITION", e);
  for (const r of n)
    s[r] = yi(i[r], `${e}.${r}`, t + 1);
  return Object.freeze(s);
}
function Ca(i, e) {
  (!Array.isArray(i) || i.length > 32) && q("ACTIONS_INVALID_DEFINITION", e);
  const t = i.map((s, n) => (Xn(s, `${e}[${n}]`), s));
  return new Set(t).size !== t.length && q("ACTIONS_DUPLICATE_ID", e), Object.freeze(t);
}
function Jn(i, e = "binding") {
  Ze(i, e);
  const t = ["id", "kind", "groups", "processors", "interactions"];
  Xn(i.id, `${e}.id`);
  const s = Ca(i.groups, `${e}.groups`);
  (!Array.isArray(i.processors) || !Array.isArray(i.interactions)) && q("ACTIONS_INVALID_DEFINITION", e);
  const n = Object.freeze(i.processors.map((o, a) => za(o, `${e}.processors[${a}]`))), r = Object.freeze(i.interactions.map((o, a) => Oa(o, `${e}.interactions[${a}]`)));
  return i.kind === "control" ? (ge(i, [...t, "control"], e), ut(i.control, `${e}.control`), Object.freeze({ id: i.id, kind: "control", control: i.control, groups: s, processors: n, interactions: r })) : i.kind === "axis-composite" ? (ge(i, [...t, "negative", "positive"], e), ut(i.negative, `${e}.negative`), ut(i.positive, `${e}.positive`), Object.freeze({ id: i.id, kind: "axis-composite", negative: i.negative, positive: i.positive, groups: s, processors: n, interactions: r })) : i.kind === "vector2-composite" ? (ge(i, [...t, "up", "down", "left", "right", "normalize"], e), ut(i.up, `${e}.up`), ut(i.down, `${e}.down`), ut(i.left, `${e}.left`), ut(i.right, `${e}.right`), typeof i.normalize != "boolean" && q("ACTIONS_INVALID_DEFINITION", `${e}.normalize`), Object.freeze({
    id: i.id,
    kind: "vector2-composite",
    up: i.up,
    down: i.down,
    left: i.left,
    right: i.right,
    normalize: i.normalize,
    groups: s,
    processors: n,
    interactions: r
  })) : q("ACTIONS_INVALID_DEFINITION", `${e}.kind`);
}
function qd(i, e) {
  return e === "button" ? typeof i == "boolean" : e === "axis" ? typeof i == "number" && Number.isFinite(i) : Array.isArray(i) && i.length === 2 && i.every((t) => typeof t == "number" && Number.isFinite(t));
}
function Kd(i, e = "map") {
  Ze(i, e), ge(i, ["kind", "id", "actions", "enabledByDefault", "priority", "consume", "metadata", ...Object.keys(i.actions ?? {})], e), i.kind !== "action-map" && q("ACTIONS_INVALID_DEFINITION", `${e}.kind`), Da(i.id, `${e}.id`), Ze(i.actions, `${e}.actions`), (typeof i.enabledByDefault != "boolean" || typeof i.consume != "boolean") && q("ACTIONS_INVALID_DEFINITION", e);
  const t = We(i.priority, `${e}.priority`), s = {};
  for (const r of Object.keys(i.actions).sort()) {
    Xn(r, `${e}.actions.${r}`);
    const o = i.actions[r];
    Ze(o, `${e}.actions.${r}`), (o.kind !== "action" || o.id !== `${i.id}.${r}` || o.mapId !== i.id || o.name !== r || !["button", "axis", "vector2"].includes(o.valueKind) || !qd(o.default, o.valueKind)) && q("ACTIONS_INVALID_DEFINITION", `${e}.actions.${r}`);
    const a = Object.freeze(o.bindings.map((f, h) => Jn(f, `${e}.actions.${r}.bindings[${h}]`)));
    new Set(a.map((f) => f.id)).size !== a.length && q("ACTIONS_DUPLICATE_ID", `${e}.actions.${r}.bindings`, o.id);
    const d = Object.freeze(o.processors.map((f, h) => za(f, `${e}.actions.${r}.processors[${h}]`))), u = Object.freeze(o.interactions.map((f, h) => Oa(f, `${e}.actions.${r}.interactions[${h}]`))), l = Array.isArray(o.default) ? Object.freeze([...o.default]) : o.default;
    s[r] = Object.freeze({
      kind: "action",
      id: o.id,
      mapId: i.id,
      name: r,
      valueKind: o.valueKind,
      default: l,
      bindings: a,
      processors: d,
      interactions: u,
      ...o.metadata === void 0 ? {} : { metadata: yi(o.metadata, `${e}.actions.${r}.metadata`) }
    });
  }
  const n = Object.freeze(s);
  return Object.freeze({
    kind: "action-map",
    id: i.id,
    actions: n,
    enabledByDefault: i.enabledByDefault,
    priority: t,
    consume: i.consume,
    ...i.metadata === void 0 ? {} : { metadata: yi(i.metadata, `${e}.metadata`) },
    ...n
  });
}
function Hd(i, e = "scheme") {
  Ze(i, e), ge(i, ["id", "groups", "requiredDevices", "optionalDevices", "metadata"], e), Da(i.id, `${e}.id`);
  const t = (s, n) => ((!Array.isArray(s) || s.length > 16 || s.some((r) => typeof r != "string" || !/^<(Keyboard|Pointer|Wheel|Gamepad|Touch|Virtual)>$/.test(r))) && q("ACTIONS_INVALID_DEFINITION", n), Object.freeze([...new Set(s)]));
  return Object.freeze({
    id: i.id,
    groups: Ca(i.groups, `${e}.groups`),
    requiredDevices: t(i.requiredDevices, `${e}.requiredDevices`),
    optionalDevices: t(i.optionalDevices, `${e}.optionalDevices`),
    ...i.metadata === void 0 ? {} : { metadata: yi(i.metadata, `${e}.metadata`) }
  });
}
function Xd(i) {
  Ze(i, "actions"), ge(i, ["maps", "schemes", "defaultScheme", "autoSwitchScheme"], "actions"), i.maps !== void 0 && !Array.isArray(i.maps) && q("ACTIONS_INVALID_DEFINITION", "actions.maps"), i.schemes !== void 0 && !Array.isArray(i.schemes) && q("ACTIONS_INVALID_DEFINITION", "actions.schemes");
  const e = Object.freeze((i.maps ?? []).map((n, r) => Kd(n, `actions.maps[${r}]`))), t = Object.freeze((i.schemes ?? []).map((n, r) => Hd(n, `actions.schemes[${r}]`)));
  new Set(e.map((n) => n.id)).size !== e.length && q("ACTIONS_DUPLICATE_ID", "actions.maps"), new Set(t.map((n) => n.id)).size !== t.length && q("ACTIONS_DUPLICATE_ID", "actions.schemes");
  const s = i.defaultScheme;
  return s !== void 0 && typeof s != "string" && q("ACTIONS_INVALID_DEFINITION", "actions.defaultScheme"), s !== void 0 && !t.some((n) => n.id === s) && q("ACTIONS_INVALID_DEFINITION", "actions.defaultScheme", s), i.autoSwitchScheme !== void 0 && typeof i.autoSwitchScheme != "boolean" && q("ACTIONS_INVALID_DEFINITION", "actions.autoSwitchScheme"), Object.freeze({ maps: e, schemes: t, ...s === void 0 ? {} : { defaultScheme: s }, autoSwitchScheme: i.autoSwitchScheme ?? !0 });
}
const Or = 1;
class D extends Error {
  constructor(t) {
    super(t.message);
    c(this, "code");
    c(this, "operation");
    c(this, "path");
    c(this, "id");
    c(this, "lifecyclePhase");
    c(this, "cause");
    this.name = "GameplayError", this.code = t.code, this.operation = t.operation, this.path = t.path ?? null, this.id = t.id ?? null, this.lifecyclePhase = t.lifecyclePhase ?? null, this.cause = t.cause;
  }
}
const Na = Object.freeze({
  maxDefinitions: 4096,
  maxScenes: 256,
  maxPrefabs: 1024,
  maxComponents: 1024,
  maxSystems: 1024,
  maxEvents: 512,
  maxCommands: 512,
  maxActionMaps: 128,
  maxPrefabDepth: 32,
  maxComponentsPerEntity: 128,
  maxEntities: 1e5,
  maxSystemDependencyDepth: 128,
  maxEventQueue: 4096,
  maxCommandQueue: 4096,
  maxTimers: 4096,
  maxSnapshotBytes: 16 * 1024 * 1024,
  maxSnapshotHistory: 128,
  maxReplayCommands: 16384
}), Jd = /^[a-z0-9]+(?:[.-][a-z0-9]+)+:[a-z0-9]+(?:[._/-][a-z0-9]+)*$/;
function ye(i, e, t, s, n, r) {
  throw new D({ code: i, operation: e, path: t, message: s, id: n, cause: r });
}
function ka(i) {
  if (typeof i != "object" || i === null || Array.isArray(i))
    return !1;
  const e = Object.getPrototypeOf(i);
  return e === Object.prototype || e === null;
}
function Dr(i, e) {
  ka(i) || ye("GAMEPLAY_INVALID_DEFINITION", "validate", e, `${e} must be a plain object.`);
}
function Qd(i, e, t) {
  for (const s of Object.keys(i))
    e.includes(s) || ye("GAMEPLAY_UNKNOWN_FIELD", "validate", `${t}.${s}`, `${t}.${s} is not supported.`);
}
function Zd(i, e) {
  (typeof i != "string" || i.length > 160 || !Jd.test(i)) && ye("GAMEPLAY_INVALID_ID", "validate", e, `${e} must be a normalized namespaced gameplay id.`);
}
function el(i, e) {
  const t = i ?? 1;
  return (!Number.isSafeInteger(t) || t <= 0) && ye("GAMEPLAY_INVALID_VERSION", "validate", e, `${e} must be a positive safe integer.`), t;
}
function mn(i, e, t = /* @__PURE__ */ new WeakSet()) {
  if (i === null || typeof i == "string" || typeof i == "boolean")
    return i;
  if (typeof i == "number")
    return Number.isFinite(i) || ye("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains a non-finite number.`), i;
  typeof i != "object" && ye("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} must contain JSON values only.`), t.has(i) && ye("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains a reference cycle.`), t.add(i);
  let s;
  if (Array.isArray(i))
    s = Object.freeze(i.map((n, r) => mn(n, `${e}[${r}]`, t)));
  else {
    ka(i) || ye("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} must contain plain JSON objects.`);
    const n = {};
    for (const r of Object.keys(i).sort())
      r || ye("GAMEPLAY_INVALID_JSON", "normalize", e, `${e} contains an empty key.`), n[r] = mn(i[r], `${e}.${r}`, t);
    s = Object.freeze(n);
  }
  return t.delete(i), s;
}
function tl(i, e, t) {
  const s = mn(i, e);
  return t && !t(s) && ye("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", e, `${e} does not satisfy its definition validator.`), s;
}
function il(i, e, t) {
  e.kind === "number" ? (typeof i != "number" || !Number.isFinite(i) || e.integer && !Number.isInteger(i) || e.minimum !== void 0 && i < e.minimum || e.maximum !== void 0 && i > e.maximum) && ye("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} violates the number component schema.`) : e.kind === "boolean" ? typeof i != "boolean" && ye("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} must be boolean.`) : e.kind === "string" ? (typeof i != "string" || e.minimumLength !== void 0 && i.length < e.minimumLength || e.maximumLength !== void 0 && i.length > e.maximumLength || e.pattern !== void 0 && !new RegExp(e.pattern).test(i)) && ye("GAMEPLAY_INVALID_COMPONENT_VALUE", "component", t, `${t} violates the string component schema.`) : (!Number.isSafeInteger(e.schemaVersion) || e.schemaVersion <= 0) && ye("GAMEPLAY_INVALID_VERSION", "component", `${t}.schemaVersion`, "JSON component schemaVersion must be positive.");
}
const sl = ["id", "version", "schema", "default", "serializable", "validate", "initialize", "serialize", "deserialize", "migrations"];
function ki(i) {
  Dr(i, "component"), Qd(i, sl, "component"), Zd(i.id, "component.id");
  const e = el(i.version, "component.version");
  Dr(i.schema, "component.schema"), ["number", "boolean", "string", "json"].includes(i.schema.kind) || ye("GAMEPLAY_INVALID_DEFINITION", "component", "component.schema.kind", "Unsupported component schema kind.", i.id);
  const t = Object.freeze({ ...i.schema }), s = (a, d = `component(${i.id})`) => {
    const u = tl(a, d, i.validate);
    return il(u, t, d), u;
  }, n = s(i.default, "component.default"), r = Object.freeze({ ...i.migrations ?? {} });
  for (const a of Object.keys(r)) {
    const d = Number(a);
    (!Number.isSafeInteger(d) || d <= 0 || d >= e || typeof r[d] != "function") && ye("GAMEPLAY_INVALID_VERSION", "component", `component.migrations.${a}`, "Component migrations must map an earlier positive version to a function.", i.id);
  }
  const o = ((a = n) => Object.freeze({
    kind: "component-initializer",
    component: o,
    value: s(a)
  }));
  return Object.defineProperties(o, {
    kind: { value: "component", enumerable: !0 },
    id: { value: i.id, enumerable: !0 },
    version: { value: e, enumerable: !0 },
    schema: { value: t, enumerable: !0 },
    default: { value: n, enumerable: !0 },
    serializable: { value: i.serializable !== !1, enumerable: !0 },
    validateValue: { value: s },
    initialize: { value: i.initialize },
    serialize: { value: i.serialize },
    deserialize: { value: i.deserialize },
    migrations: { value: r, enumerable: !0 },
    reference: { value: Object.freeze({ kind: "component", id: i.id }), enumerable: !0 }
  }), Object.freeze(o);
}
const Ra = Object.freeze({
  number(i) {
    const { minimum: e, maximum: t, integer: s, ...n } = i;
    return ki({ ...n, schema: { kind: "number", minimum: e, maximum: t, integer: s } });
  },
  boolean(i) {
    return ki({ ...i, schema: { kind: "boolean" } });
  },
  string(i) {
    const { minimumLength: e, maximumLength: t, pattern: s, ...n } = i;
    return ki({ ...n, schema: { kind: "string", minimumLength: e, maximumLength: t, pattern: s } });
  },
  json(i) {
    const { schemaVersion: e, ...t } = i;
    return ki({ ...t, schema: { kind: "json", schemaVersion: e ?? 1 } });
  }
});
function hi(i, e) {
  return Array.isArray(i) && i.length === e && i.every((t) => typeof t == "number" && Number.isFinite(t));
}
Ra.json({
  id: "forgeng.spatial:transform-2d",
  version: 1,
  default: { position: [0, 0], rotation: 0, scale: [1, 1] },
  validate: (i) => typeof i == "object" && i !== null && hi(i.position, 2) && typeof i.rotation == "number" && Number.isFinite(i.rotation) && hi(i.scale, 2)
});
Ra.json({
  id: "forgeng.spatial:transform-3d",
  version: 1,
  default: { position: [0, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
  validate: (i) => typeof i == "object" && i !== null && hi(i.position, 3) && hi(i.rotation, 4) && hi(i.scale, 3)
});
class nl {
  constructor() {
    c(this, "definitions", /* @__PURE__ */ new Map());
    c(this, "destroyed", !1);
  }
  register(e) {
    this.assertAlive();
    const t = Hn(e);
    if (this.definitions.has(t.id))
      throw new _("E2D_DEFINITION_DUPLICATE", "$.id", `definition "${t.id}" is already registered.`);
    return this.definitions.set(t.id, t), t;
  }
  get(e) {
    this.assertAlive();
    const t = this.definitions.get(e);
    if (!t) throw new _("E2D_DEFINITION_MISSING", "$.definitionId", `unknown definition "${e}".`);
    return t;
  }
  has(e) {
    return !this.destroyed && this.definitions.has(e);
  }
  ids() {
    return Object.freeze([...this.definitions.keys()].sort());
  }
  get size() {
    return this.definitions.size;
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.definitions.clear());
  }
  assertAlive() {
    if (this.destroyed) throw new _("E2D_DESTROYED", "$", "definition catalog was destroyed.");
  }
}
const Ns = 1, rl = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/, ol = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/;
class Ee extends TypeError {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "NeutralSceneContractError";
  }
}
function gn(i, e) {
  if (typeof i != "object" || i === null || Array.isArray(i))
    throw new Ee("SCENE_VALUE_INVALID", e, "expected an object.");
  return i;
}
function yn(i, e = "$.id") {
  if (typeof i != "string" || !rl.test(i))
    throw new Ee("SCENE_ID_INVALID", e, 'expected a normalized namespaced ID such as "example.game:main".');
}
function al(i, e) {
  if (typeof i != "string" || !ol.test(i))
    throw new Ee("SCENE_CAPABILITY_INVALID", e, "expected a namespaced capability ID.");
}
function cl(i, e) {
  const t = gn(i, e);
  if (al(t.capability, `${e}.capability`), t.optional !== void 0 && typeof t.optional != "boolean")
    throw new Ee("SCENE_VALUE_INVALID", `${e}.optional`, "expected a boolean.");
  return Object.freeze({ capability: t.capability, ...t.optional === void 0 ? {} : { optional: t.optional } });
}
function dl(i, e = "$") {
  const t = gn(i, e);
  if (t.apiVersion !== Ns)
    throw new Ee("SCENE_VERSION_UNSUPPORTED", `${e}.apiVersion`, `expected ${Ns}.`);
  if (yn(t.id, `${e}.id`), typeof t.create != "function")
    throw new Ee("SCENE_FACTORY_INVALID", `${e}.create`, "expected a function.");
  const s = t.requirements === void 0 ? [] : t.requirements;
  if (!Array.isArray(s))
    throw new Ee("SCENE_VALUE_INVALID", `${e}.requirements`, "expected an array.");
  const n = s.map((o, a) => cl(o, `${e}.requirements[${a}]`)), r = /* @__PURE__ */ new Set();
  for (let o = 0; o < n.length; o += 1) {
    const a = n[o].capability;
    if (r.has(a))
      throw new Ee("SCENE_REQUIREMENT_DUPLICATE", `${e}.requirements[${o}].capability`, `duplicate "${a}".`);
    r.add(a);
  }
  return Object.freeze({
    apiVersion: Ns,
    id: t.id,
    requirements: Object.freeze(n),
    ...t.extensions === void 0 ? {} : { extensions: Object.freeze({ ...gn(t.extensions, `${e}.extensions`) }) },
    create: t.create
  });
}
const ll = Object.freeze({
  position: Object.freeze([0, 0]),
  rotation: 0,
  scale: Object.freeze([1, 1])
}), Cr = Object.freeze([1, 0, 0, 1, 0, 0]);
function ks(i) {
  return Object.freeze({
    position: Object.freeze([i.position[0], i.position[1]]),
    rotation: i.rotation,
    scale: Object.freeze([i.scale[0], i.scale[1]])
  });
}
function Rs(i) {
  const e = Math.cos(i.rotation), t = Math.sin(i.rotation);
  return [
    e * i.scale[0],
    t * i.scale[0],
    -t * i.scale[1],
    e * i.scale[1],
    i.position[0],
    i.position[1]
  ];
}
function Nr(i, e) {
  return [
    i[0] * e[0] + i[2] * e[1],
    i[1] * e[0] + i[3] * e[1],
    i[0] * e[2] + i[2] * e[3],
    i[1] * e[2] + i[3] * e[3],
    i[0] * e[4] + i[2] * e[5] + i[4],
    i[1] * e[4] + i[3] * e[5] + i[5]
  ];
}
function ul(i, e, t) {
  const s = Math.max(0, Math.min(1, t));
  return [
    i[0] + (e[0] - i[0]) * s,
    i[1] + (e[1] - i[1]) * s,
    i[2] + (e[2] - i[2]) * s,
    i[3] + (e[3] - i[3]) * s,
    i[4] + (e[4] - i[4]) * s,
    i[5] + (e[5] - i[5]) * s
  ];
}
function Xe(i, e) {
  return [
    i[0] * e[0] + i[2] * e[1] + i[4],
    i[1] * e[0] + i[3] * e[1] + i[5]
  ];
}
function Pa(i, e) {
  const t = e[0], s = e[1], n = t + e[2], r = s + e[3], o = [
    Xe(i, [t, s]),
    Xe(i, [n, s]),
    Xe(i, [n, r]),
    Xe(i, [t, r])
  ], a = o.map((f) => f[0]), d = o.map((f) => f[1]), u = Math.min(...a), l = Math.min(...d);
  return [u, l, Math.max(...a) - u, Math.max(...d) - l];
}
function kr(i = {}) {
  try {
    return ha(i);
  } catch {
    throw new _("E2D_VALUE_INVALID", "$.surface", "surface values must be finite and positive.");
  }
}
function Ps(i, e) {
  return ga(i, e);
}
function fl(i, e) {
  return ya(i, e);
}
function hl(i, e) {
  return ba(i, e);
}
function ja(i) {
  const e = i.logicalToWorld, t = i.logicalViewport, s = [
    Xe(e, [t[0], t[1]]),
    Xe(e, [t[0] + t[2], t[1]]),
    Xe(e, [t[0] + t[2], t[1] + t[3]]),
    Xe(e, [t[0], t[1] + t[3]])
  ], n = s.map((d) => d[0]), r = s.map((d) => d[1]), o = Math.min(...n), a = Math.min(...r);
  return [o, a, Math.max(...n) - o, Math.max(...r) - a];
}
function Ta(i, e) {
  return i[0] <= e[0] + e[2] && i[0] + i[2] >= e[0] && i[1] <= e[1] + e[3] && i[1] + i[3] >= e[1];
}
function pl(i, e) {
  return e[0] >= i[0] && e[0] <= i[0] + i[2] && e[1] >= i[1] && e[1] <= i[1] + i[3];
}
class ml {
  constructor(e, t, s, n, r, o, a) {
    c(this, "transforms");
    c(this, "visibility");
    c(this, "cameras");
    c(this, "buffers");
    c(this, "metrics");
    c(this, "layers");
    c(this, "renderables");
    this.transforms = s, this.visibility = n, this.cameras = r, this.buffers = o, this.metrics = a, this.layers = new Map(e.layers.map((d) => [d.id, d])), this.renderables = t;
  }
  setRenderables(e) {
    this.renderables = e;
  }
  extract(e) {
    const { lease: t, writable: s } = this.buffers.acquire(e, this.renderables.length), r = this.cameras.ordered().map((a) => [a, ja(a)]);
    let o = 0;
    for (const a of this.renderables) {
      const d = this.visibility.getInherited(a.descriptor.entity), u = this.layers.get(a.layer);
      if (!d.visible || d.opacity <= 0 || u?.visible === !1 || (u?.opacity ?? 1) <= 0) continue;
      const l = this.transforms.get(a.descriptor.entity), f = ul(l.worldPrevious, l.worldCurrent, e.alpha), h = Pa(f, a.localBounds);
      if (!(a.kind === "tilemap" || r.length === 0 || r.some(([y, b]) => (y.layers.length === 0 || y.layers.includes(a.layer)) && Ta(h, b)))) continue;
      s.ids[o] = a.descriptor.id, s.entityIds[o] = a.descriptor.entity, s.kinds[o] = a.kind, s.layerIds[o] = a.layer, s.assetIds[o] = a.assetIds;
      const m = "mask" in a.descriptor ? a.descriptor.mask : void 0;
      s.maskIds[o] = m ?? d.clip, s.orders[o] = a.order, s.opacities[o] = d.opacity * (u?.opacity ?? 1);
      for (let y = 0; y < 4; y++) s.tints[o * 4 + y] = d.tint[y];
      for (let y = 0; y < 6; y++) s.matrices[o * 6 + y] = f[y];
      for (let y = 0; y < 4; y++) s.bounds[o * 4 + y] = h[y];
      o += 1;
    }
    return s.count = o, this.metrics.recordExtraction(this.renderables.length, o), t;
  }
}
const gl = Object.freeze({ sceneId: "", sceneGeneration: 0, domainGeneration: 0, surfaceRevision: 0, frame: 0, simulationTick: 0, alpha: 0, cameraIds: Object.freeze([]) });
function yl(i) {
  const e = {
    leased: !1,
    capacity: i,
    count: 0,
    metadata: gl,
    ids: new Array(i),
    entityIds: new Array(i),
    kinds: new Array(i),
    layerIds: new Array(i),
    assetIds: new Array(i),
    maskIds: new Array(i),
    matrices: new Float64Array(i * 6),
    bounds: new Float64Array(i * 4),
    opacities: new Float32Array(i),
    tints: new Float32Array(i * 4),
    orders: new Int32Array(i)
  };
  return e.snapshot = Object.freeze({
    snapshotVersion: 1,
    get sceneId() {
      return e.metadata.sceneId;
    },
    get sceneGeneration() {
      return e.metadata.sceneGeneration;
    },
    get domainGeneration() {
      return e.metadata.domainGeneration;
    },
    get surfaceRevision() {
      return e.metadata.surfaceRevision;
    },
    get frame() {
      return e.metadata.frame;
    },
    get simulationTick() {
      return e.metadata.simulationTick;
    },
    get alpha() {
      return e.metadata.alpha;
    },
    get cameraIds() {
      return e.metadata.cameraIds;
    },
    get count() {
      return e.count;
    },
    get ids() {
      return e.ids;
    },
    get entityIds() {
      return e.entityIds;
    },
    get kinds() {
      return e.kinds;
    },
    get layerIds() {
      return e.layerIds;
    },
    get assetIds() {
      return e.assetIds;
    },
    get maskIds() {
      return e.maskIds;
    },
    get matrices() {
      return e.matrices;
    },
    get bounds() {
      return e.bounds;
    },
    get opacities() {
      return e.opacities;
    },
    get tints() {
      return e.tints;
    },
    get orders() {
      return e.orders;
    }
  }), e;
}
class bl {
  constructor(e, t) {
    c(this, "slots");
    c(this, "growths", 0);
    c(this, "destroyed", !1);
    const s = Math.max(1, t);
    this.slots = Array.from({ length: e }, () => yl(s));
  }
  acquire(e, t) {
    if (this.destroyed) throw new _("E2D_DESTROYED", "$.buffers", "frame buffer pool was destroyed.");
    const s = this.slots.find((o) => !o.leased);
    if (!s) throw new _("E2D_BUFFER_EXHAUSTED", "$.buffers", "all extraction buffers are currently leased.");
    this.ensureCapacity(s, t), s.leased = !0, s.count = 0, s.metadata = e;
    let n = !1;
    return { lease: Object.freeze({
      snapshot: s.snapshot,
      get released() {
        return n;
      },
      release: () => {
        n || (n = !0, s.leased = !1);
      }
    }), writable: s };
  }
  inspect() {
    return Object.freeze({ retained: this.slots.length, leased: this.slots.filter((e) => e.leased).length, capacity: this.slots.reduce((e, t) => e + t.capacity, 0), growths: this.growths, snapshots: this.slots.length });
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const e of this.slots)
        e.leased = !1, e.count = 0, e.ids.length = 0, e.entityIds.length = 0, e.kinds.length = 0, e.layerIds.length = 0, e.assetIds.length = 0, e.maskIds.length = 0, e.matrices = new Float64Array(0), e.bounds = new Float64Array(0), e.opacities = new Float32Array(0), e.tints = new Float32Array(0), e.orders = new Int32Array(0), e.capacity = 0;
    }
  }
  ensureCapacity(e, t) {
    if (t <= e.capacity) return;
    let s = e.capacity;
    for (; s < t; ) s *= 2;
    e.ids.length = s, e.entityIds.length = s, e.kinds.length = s, e.layerIds.length = s, e.assetIds.length = s, e.maskIds.length = s, e.matrices = new Float64Array(s * 6), e.bounds = new Float64Array(s * 4), e.opacities = new Float32Array(s), e.tints = new Float32Array(s * 4), e.orders = new Int32Array(s), e.capacity = s, this.growths += 1;
  }
}
function wl(i, e, t, s, n) {
  const r = s.get(e), o = s.logicalToWorld(e, t);
  for (let a = i.count - 1; a >= 0; a--) {
    if (r.layers.length > 0 && !r.layers.includes(i.layerIds[a])) continue;
    const d = a * 4;
    if (pl([i.bounds[d], i.bounds[d + 1], i.bounds[d + 2], i.bounds[d + 3]], o))
      return n(i.entityIds[a]);
  }
  return null;
}
class vl {
  constructor() {
    c(this, "hierarchyPasses", 0);
    c(this, "dirtyNodes", 0);
    c(this, "testedItems", 0);
    c(this, "visibleItems", 0);
    c(this, "culledItems", 0);
    c(this, "extractionPasses", 0);
    c(this, "picks", 0);
    c(this, "collisionQueries", 0);
  }
  recordHierarchy(e) {
    this.hierarchyPasses += 1, this.dirtyNodes += e;
  }
  recordExtraction(e, t) {
    this.extractionPasses += 1, this.testedItems += e, this.visibleItems += t, this.culledItems += e - t;
  }
}
function Il(i) {
  const e = i.size?.[0] ?? i.region?.[2] ?? 1, t = i.size?.[1] ?? i.region?.[3] ?? 1, s = i.anchor ?? [0.5, 0.5];
  return [-s[0] * e, -s[1] * t, e, t];
}
function Sl(i) {
  const e = i.chunkSize ?? [32, 32];
  return [0, 0, i.tileSize[0] * e[0], i.tileSize[1] * e[1]];
}
function El(i) {
  const e = i.text.split(`
`), t = Math.max(0, ...e.map((r) => r.length)), s = Math.min(i.maxWidth ?? Number.POSITIVE_INFINITY, t * i.fontSize * 0.6 + Math.max(0, t - 1) * (i.letterSpacing ?? 0)), n = Math.min(i.maxHeight ?? Number.POSITIVE_INFINITY, e.length * i.fontSize * (i.lineHeight ?? 1.2));
  return [0, 0, Math.max(0, s), Math.max(0, n)];
}
function Al(i) {
  const e = Math.max(Math.abs(i.speed?.[0] ?? 0), Math.abs(i.speed?.[1] ?? 0)) * i.lifetime[1] + Math.max(Math.abs(i.size?.[0] ?? 1), Math.abs(i.size?.[1] ?? 1));
  return [-e, -e, e * 2, e * 2];
}
function xl(i, e) {
  if (e === "sprite") return Il(i);
  if (e === "tilemap") return Sl(i);
  if (e === "text") return El(i);
  if (e === "particle") return Al(i);
  if (e === "light") {
    const s = i.radius ?? 0;
    return [-s, -s, s * 2, s * 2];
  }
  const t = i;
  return t.rect ?? t.region ?? [0, 0, 1, 1];
}
function _l(i, e) {
  if (e === "sprite") {
    const t = i;
    return Object.freeze([t.texture, t.normalTexture].filter((s) => s !== void 0));
  }
  if (e === "tilemap") return Object.freeze([i.tilemap]);
  if (e === "text") {
    const t = i;
    return Object.freeze([t.font, ...t.fallbackFonts ?? []]);
  }
  return Object.freeze(e === "particle" ? i.texture ? [i.texture] : [] : e === "mask" ? i.texture ? [i.texture] : [] : []);
}
function $l(i, e) {
  const t = [
    ["sprite", i.sprites],
    ["tilemap", i.tilemaps],
    ["text", i.texts],
    ["particle", i.particles],
    ["light", i.lights],
    ["mask", i.masks]
  ], s = [];
  let n = 0;
  for (const [r, o] of t) for (const a of o)
    s.push(La(i, a, r, n++, e));
  return Object.freeze(s);
}
function La(i, e, t, s, n) {
  const r = n?.({ definition: i, itemId: e.id, kind: t }), o = "layer" in e ? e.layer : i.layers[0]?.id ?? "", a = "order" in e && e.order ? e.order.zIndex ?? 0 : 0;
  return Object.freeze({ descriptor: e, kind: t, localBounds: Object.freeze(r ?? xl(e, t)), assetIds: _l(e, t), layer: o, order: a, stableIndex: s });
}
class zl {
  constructor(e, t = {}) {
    c(this, "descriptors", /* @__PURE__ */ new Map());
    c(this, "snapshots", /* @__PURE__ */ new Map());
    c(this, "follows", /* @__PURE__ */ new Map());
    c(this, "surface");
    this.surface = kr(t);
    for (const s of e) this.descriptors.set(s.id, s);
    this.rebuild();
  }
  resize(e) {
    this.surface = kr(e), this.rebuild();
  }
  getSurface() {
    return this.surface;
  }
  get(e) {
    const t = this.snapshots.get(e);
    if (!t) throw new _("E2D_CAMERA_MISSING", "$.cameraId", `unknown camera "${e}".`);
    return t;
  }
  ordered() {
    return Object.freeze([...this.snapshots.values()].sort((e, t) => e.order - t.order || e.id.localeCompare(t.id)));
  }
  state(e) {
    const t = this.follows.get(e);
    return Object.freeze({ snapshotVersion: 1, camera: this.get(e), following: t ? Object.freeze({ ...t }) : null });
  }
  setPosition(e, t) {
    return this.get(e), this.assertPoint(t, "$.camera.position"), this.follows.delete(e), this.replace(e, { position: Object.freeze([...t]) }), this.state(e);
  }
  setPixelSnap(e, t) {
    if (!["off", "camera", "camera-and-items"].includes(t)) throw new _("E2D_VALUE_INVALID", "$.camera.pixelSnap", "expected off, camera, or camera-and-items.");
    return this.replace(e, { pixelSnap: t }), this.state(e);
  }
  follow(e, t, s = {}) {
    this.get(e);
    const n = s.offset ?? [0, 0];
    this.assertPoint(n, "$.camera.follow.offset");
    const r = s.bounds ?? null;
    if (r && (r.length !== 4 || r.some((o) => !Number.isFinite(o)) || r[2] <= 0 || r[3] <= 0)) throw new _("E2D_VALUE_INVALID", "$.camera.follow.bounds", "expected a finite positive world rectangle.");
    return this.follows.set(e, { entity: t, offset: Object.freeze([...n]), bounds: r ? Object.freeze([...r]) : null }), this.state(e);
  }
  unfollow(e) {
    return this.get(e), this.follows.delete(e), this.state(e);
  }
  updateFollows(e, t, s) {
    let n = !1;
    for (const [r, o] of this.follows) {
      const a = o.entity.sceneGeneration === e && o.entity.domainGeneration === t ? s(o.entity.entityId, o.entity.entityGeneration) : null;
      if (!a) {
        this.follows.delete(r), n = !0;
        continue;
      }
      const d = this.clamp(r, [a[0] + o.offset[0], a[1] + o.offset[1]], o.bounds), l = this.descriptors.get(r).position ?? [0, 0];
      l[0] === d[0] && l[1] === d[1] || (this.replace(r, { position: d }), n = !0);
    }
    return n;
  }
  worldToLogical(e, t) {
    return fl(this.get(e), t);
  }
  logicalToWorld(e, t) {
    return hl(this.get(e), t);
  }
  clear() {
    this.descriptors.clear(), this.snapshots.clear(), this.follows.clear();
  }
  rebuild() {
    this.snapshots.clear();
    for (const e of this.descriptors.values()) this.snapshots.set(e.id, Ps(e, this.surface));
  }
  replace(e, t) {
    const s = this.descriptors.get(e);
    if (!s) throw new _("E2D_CAMERA_MISSING", "$.cameraId", `unknown camera "${e}".`);
    const n = Object.freeze({ ...s, ...t }), r = Ps(n, this.surface);
    this.descriptors.set(e, n), this.snapshots.set(e, r);
  }
  clamp(e, t, s) {
    if (!s) return Object.freeze([...t]);
    const n = this.descriptors.get(e), r = ja(Ps(Object.freeze({ ...n, position: t }), this.surface)), o = s[0] + s[2] * 0.5, a = s[1] + s[3] * 0.5;
    let d = t[0], u = t[1];
    return r[2] >= s[2] ? d += o - (r[0] + r[2] * 0.5) : r[0] < s[0] ? d += s[0] - r[0] : r[0] + r[2] > s[0] + s[2] && (d -= r[0] + r[2] - s[0] - s[2]), r[3] >= s[3] ? u += a - (r[1] + r[3] * 0.5) : r[1] < s[1] ? u += s[1] - r[1] : r[1] + r[3] > s[1] + s[3] && (u -= r[1] + r[3] - s[1] - s[3]), Object.freeze([d, u]);
  }
  assertPoint(e, t) {
    if (!e || e.length !== 2 || e.some((s) => !Number.isFinite(s))) throw new _("E2D_VALUE_INVALID", t, "expected two finite values.");
  }
}
class Ol {
  constructor(e) {
    c(this, "transforms");
    c(this, "nodes", /* @__PURE__ */ new Map());
    c(this, "ordered", Object.freeze([]));
    c(this, "orderDirty", !0);
    this.transforms = e;
  }
  add(e, t) {
    this.nodes.has(e) || (this.nodes.set(e, { id: e, parentId: null, children: /* @__PURE__ */ new Set(), dirty: !0 }), t !== null && this.reparent(e, t), this.orderDirty = !0);
  }
  parentOf(e) {
    return this.nodes.get(e)?.parentId ?? null;
  }
  has(e) {
    return this.nodes.has(e);
  }
  reparent(e, t) {
    const s = this.require(e);
    if (t !== null) {
      this.require(t);
      let n = t;
      for (; n !== null; ) {
        if (n === e) throw new _("E2D_GRAPH_CYCLE", "$.parent", `reparenting "${e}" below "${t}" creates a cycle.`);
        n = this.nodes.get(n)?.parentId ?? null;
      }
    }
    s.parentId !== t && (s.parentId !== null && this.nodes.get(s.parentId)?.children.delete(e), s.parentId = t, t !== null && this.nodes.get(t).children.add(e), this.markSubtreeDirty(e), this.orderDirty = !0);
  }
  markSubtreeDirty(e) {
    let t = 0;
    const s = [e];
    for (; s.length > 0; ) {
      const n = this.nodes.get(s.pop());
      if (!n) continue;
      n.dirty = !0;
      const r = this.transforms.get(n.id);
      r && (r.dirty = !0), t += 1;
      for (const o of n.children) s.push(o);
    }
    return t;
  }
  remove(e) {
    const t = this.nodes.get(e);
    if (!t) return !1;
    t.parentId !== null && this.nodes.get(t.parentId)?.children.delete(e);
    for (const s of [...t.children]) this.reparent(s, null);
    return this.nodes.delete(e), this.orderDirty = !0, !0;
  }
  synchronize() {
    let e = 0;
    for (const t of this.topologicalOrder()) {
      const s = this.nodes.get(t), n = this.transforms.get(t), r = s.parentId === null ? void 0 : this.transforms.get(s.parentId);
      (s.dirty || n.dirty || r?.dirty) && (this.transforms.resolveWorld(t, r?.worldPrevious ?? null, r?.worldCurrent ?? null), s.dirty = !1, e += 1);
    }
    return e;
  }
  topologicalOrder() {
    if (!this.orderDirty) return this.ordered;
    const e = [], t = [...this.nodes.values()].filter((s) => s.parentId === null).map((s) => s.id).sort().reverse();
    for (; t.length > 0; ) {
      const s = t.pop();
      e.push(s);
      const n = [...this.nodes.get(s).children].sort().reverse();
      t.push(...n);
    }
    if (e.length !== this.nodes.size) throw new _("E2D_GRAPH_CYCLE", "$.parent", "hierarchy contains a cycle.");
    return this.ordered = Object.freeze(e), this.orderDirty = !1, this.ordered;
  }
  clear() {
    this.nodes.clear(), this.ordered = Object.freeze([]), this.orderDirty = !0;
  }
  require(e) {
    const t = this.nodes.get(e);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.entity", `unknown entity "${e}".`);
    return t;
  }
}
class Dl {
  constructor() {
    c(this, "records", /* @__PURE__ */ new Map());
    c(this, "nextGenerations", /* @__PURE__ */ new Map());
  }
  add(e, t = ll) {
    if (this.records.has(e)) throw new _("E2D_VALUE_INVALID", "$.entityId", `entity "${e}" already exists.`);
    const s = ks(t), n = Rs(s), r = { id: e, generation: this.nextGenerations.get(e) ?? 1, previous: s, current: s, worldPrevious: n, worldCurrent: n, dirty: !0 };
    return this.records.set(e, r), r;
  }
  get(e) {
    return this.records.get(e);
  }
  worldPosition(e, t) {
    const s = this.records.get(e);
    return !s || s.generation !== t ? null : Object.freeze([s.worldCurrent[4], s.worldCurrent[5]]);
  }
  values() {
    return this.records.values();
  }
  get size() {
    return this.records.size;
  }
  beginStep() {
    for (const e of this.records.values())
      e.previous = e.current, e.worldPrevious = e.worldCurrent;
  }
  set(e, t) {
    const s = this.records.get(e);
    s && (s.current = ks(t), s.dirty = !0);
  }
  restore(e, t) {
    const s = this.records.get(e);
    if (!s) return;
    const n = ks(t);
    s.previous = n, s.current = n, s.dirty = !0;
  }
  remove(e) {
    const t = this.records.get(e);
    return t ? (this.records.delete(e), this.nextGenerations.set(e, t.generation + 1), !0) : !1;
  }
  resolveWorld(e, t, s) {
    const n = this.records.get(e);
    if (!n) return;
    const r = Rs(n.previous), o = Rs(n.current);
    n.worldPrevious = Nr(t ?? Cr, r), n.worldCurrent = Nr(s ?? Cr, o), n.dirty = !1;
  }
  clear() {
    this.records.clear(), this.nextGenerations.clear();
  }
}
class Cl {
  constructor() {
    c(this, "local", /* @__PURE__ */ new Map());
    c(this, "inherited", /* @__PURE__ */ new Map());
  }
  add(e, t = {}) {
    this.local.set(e, this.normalize(t, void 0));
  }
  set(e, t) {
    const s = this.local.get(e);
    if (!s) throw new _("E2D_ENTITY_MISSING", "$.entity", `unknown entity "${e}".`);
    this.local.set(e, this.normalize(t, s));
  }
  getLocal(e) {
    return this.snapshot(this.local.get(e));
  }
  getInherited(e) {
    return this.snapshot(this.inherited.get(e) ?? this.local.get(e));
  }
  remove(e) {
    return this.inherited.delete(e), this.local.delete(e);
  }
  synchronize(e) {
    this.inherited.clear();
    for (const t of e.topologicalOrder()) {
      const s = this.local.get(t), n = e.parentOf(t), r = n === null ? void 0 : this.inherited.get(n);
      this.inherited.set(t, {
        visible: s.visible && (r?.visible ?? !0),
        opacity: s.opacity * (r?.opacity ?? 1),
        tint: Object.freeze([
          s.tint[0] * (r?.tint[0] ?? 1),
          s.tint[1] * (r?.tint[1] ?? 1),
          s.tint[2] * (r?.tint[2] ?? 1),
          s.tint[3] * (r?.tint[3] ?? 1)
        ]),
        clip: s.clip ?? r?.clip ?? null
      });
    }
  }
  clear() {
    this.local.clear(), this.inherited.clear();
  }
  normalize(e, t) {
    const s = e.opacity ?? t?.opacity ?? 1;
    if (!Number.isFinite(s) || s < 0 || s > 1)
      throw new _("E2D_VALUE_INVALID", "$.presentation.opacity", "expected a finite value in [0, 1].");
    const n = e.tint ?? t?.tint ?? [1, 1, 1, 1];
    if (n.some((r) => !Number.isFinite(r) || r < 0 || r > 1))
      throw new _("E2D_VALUE_INVALID", "$.presentation.tint", "expected four finite values in [0, 1].");
    return { visible: e.visible ?? t?.visible ?? !0, opacity: s, tint: Object.freeze([...n]), clip: e.clip === void 0 ? t?.clip ?? null : e.clip };
  }
  snapshot(e) {
    const t = e ?? { visible: !0, opacity: 1, tint: [1, 1, 1, 1], clip: null };
    return Object.freeze({ visible: t.visible, opacity: t.opacity, tint: t.tint, clip: t.clip });
  }
}
function Ma(i, e, t) {
  const s = new Set(i), n = new Map(i.map((u) => [u, 0])), r = new Map(i.map((u) => [u, /* @__PURE__ */ new Set()]));
  for (const [u, l] of e) u !== l && s.has(u) && s.has(l) && !r.get(u).has(l) && (r.get(u).add(l), n.set(l, n.get(l) + 1));
  const o = (u, l) => (t.get(u) ?? 0) - (t.get(l) ?? 0) || u.localeCompare(l), a = i.filter((u) => n.get(u) === 0).sort(o), d = [];
  for (; a.length > 0; ) {
    const u = a.shift();
    d.push(u);
    for (const l of [...r.get(u)].sort(o))
      n.set(l, n.get(l) - 1), n.get(l) === 0 && (a.push(l), a.sort(o));
  }
  return Object.freeze(d.length === i.length ? d : [...i].sort(o));
}
function Nl(i) {
  const e = i.layers.map((r) => r.id), t = new Set(e), s = [];
  for (const r of i.layers) {
    for (const o of r.order?.after ?? []) o.kind === "layer" && t.has(o.id) && s.push([o.id, r.id]);
    for (const o of r.order?.before ?? []) o.kind === "layer" && t.has(o.id) && s.push([r.id, o.id]);
  }
  const n = new Map(e.map((r, o) => [r, o]));
  return new Map(Ma(e, s, n).map((r, o) => [r, o]));
}
function Rr(i) {
  return "order" in i.descriptor ? i.descriptor.order : void 0;
}
function Va(i, e) {
  const t = Nl(i), s = [...e].sort((l, f) => (t.get(l.layer) ?? 0) - (t.get(f.layer) ?? 0) || l.order - f.order || l.stableIndex - f.stableIndex || l.descriptor.id.localeCompare(f.descriptor.id)), n = /* @__PURE__ */ new Map();
  for (const l of s) {
    const f = n.get(l.layer) ?? [];
    f.push(l.descriptor.id), n.set(l.layer, f);
  }
  const r = (l) => l.kind === "item" ? [l.id] : n.get(l.id) ?? [], o = [];
  for (const l of s) {
    for (const f of Rr(l)?.after ?? []) for (const h of r(f)) o.push([h, l.descriptor.id]);
    for (const f of Rr(l)?.before ?? []) for (const h of r(f)) o.push([l.descriptor.id, h]);
  }
  for (const l of i.layers) {
    const f = n.get(l.id) ?? [];
    for (const h of l.order?.after ?? []) if (h.kind === "item") for (const p of f) o.push([h.id, p]);
    for (const h of l.order?.before ?? []) if (h.kind === "item") for (const p of f) o.push([p, h.id]);
  }
  const a = s.map((l) => l.descriptor.id), d = new Map(a.map((l, f) => [l, f])), u = new Map(Ma(a, o, d).map((l, f) => [l, f]));
  return Object.freeze([...s].sort((l, f) => u.get(l.descriptor.id) - u.get(f.descriptor.id)));
}
function kl(i, e) {
  return i === "step" ? 0 : i === "ease-in" ? e * e : i === "ease-out" ? 1 - (1 - e) * (1 - e) : i === "ease-in-out" ? e < 0.5 ? 2 * e * e : 1 - (-2 * e + 2) ** 2 / 2 : e;
}
function Ga(i, e) {
  const t = i.keyframes;
  if (t.length === 0) return;
  if (e <= t[0].time) return t[0].value;
  if (e >= t[t.length - 1].time) return t[t.length - 1].value;
  let s = 1;
  for (; s < t.length && t[s].time < e; ) s += 1;
  const n = t[s - 1], r = t[s], o = kl(r.easing ?? n.easing ?? "linear", (e - n.time) / Math.max(Number.EPSILON, r.time - n.time));
  if (typeof n.value == "number" && typeof r.value == "number") return n.value + (r.value - n.value) * o;
  if (Array.isArray(n.value) && Array.isArray(r.value) && n.value.length === r.value.length) {
    const a = r.value;
    return Object.freeze(n.value.map((d, u) => d + (a[u] - d) * o));
  }
  return n.value;
}
function Rl(i, e, t) {
  if (!Number.isSafeInteger(e) || e < 0 || e > $.animationAdvanceTicks) throw new _("E2D_FRAME_INVALID", "$.simulationTick", `animation advance must be within 0..${$.animationAdvanceTicks} ticks.`);
  for (const s of i) if (s.status === "playing") {
    const n = s.speed / (s.descriptor.fixedStepHz ?? 60);
    if (Math.ceil(n / s.descriptor.duration) + 1 > $.animationAdvanceTicks) throw new _("E2D_FRAME_INVALID", "$.animation", "animation crosses too many clip boundaries in one fixed tick.");
    const o = Math.ceil(n * e / s.descriptor.duration) + 1;
    if (t + o * (s.descriptor.events?.length ?? 0) > $.animationEventQueue) throw new _("E2D_FRAME_INVALID", "$.animationEvents", "animation advance could exceed the bounded event queue.");
  }
}
function Pl(i, e, t) {
  const s = i.descriptor.duration;
  let n = i.speed / (i.descriptor.fixedStepHz ?? 60), r = i.time, o = !1;
  if (i.descriptor.loop === "none") {
    const a = Math.max(0, Math.min(s, r + n * i.direction));
    t(i, r, a, e, i.direction, !1), i.time = a, (a === 0 || a === s) && (i.status = "stopped");
    return;
  }
  for (; n > Number.EPSILON; ) {
    const a = i.direction === 1 ? s : 0, d = Math.abs(a - r);
    if (d > n + Number.EPSILON) {
      const u = r + n * i.direction;
      t(i, r, u, e, i.direction, o), r = u, n = 0;
      break;
    }
    d > Number.EPSILON && t(i, r, a, e, i.direction, o), n = Math.max(0, n - d), i.iteration += 1, i.descriptor.loop === "repeat" ? (r = i.direction === 1 ? 0 : s, o = !0) : (r = a, i.direction = i.direction === 1 ? -1 : 1, o = !1);
  }
  i.time = r;
}
function jl(i, e) {
  if (!(!i.active || i.suppressedBy))
    for (const t of i.descriptor.tracks) {
      const s = Ga(t, i.time);
      if (s === void 0) continue;
      if (t.property === "frame") {
        typeof s == "number" && (i.frame = Math.max(0, Math.floor(s)));
        continue;
      }
      if (t.property === "opacity" || t.property === "tint") {
        if (!e.getPresentation(t.target)) continue;
        t.property === "opacity" && typeof s == "number" ? e.setPresentation(t.target, { opacity: Math.max(0, Math.min(1, s)) }) : t.property === "tint" && Array.isArray(s) && s.length === 4 && e.setPresentation(t.target, { tint: s });
        continue;
      }
      const n = e.getTransform(t.target);
      n && (t.property === "position" && Array.isArray(s) && s.length === 2 ? e.setTransform(t.target, { ...n, position: s }) : t.property === "scale" && Array.isArray(s) && s.length === 2 ? e.setTransform(t.target, { ...n, scale: s }) : t.property === "rotation" && typeof s == "number" && e.setTransform(t.target, { ...n, rotation: s }));
    }
}
function Tl(i, e) {
  if (i.size + e.length > $.animations) throw new _("E2D_VALUE_INVALID", "$.animations", `animation count exceeds ${$.animations}.`);
  for (const t of e) if (i.has(t.id)) throw new _("E2D_VALUE_INVALID", "$.animationId", `animation "${t.id}" already exists.`);
  for (const t of [...e].sort((s, n) => s.id.localeCompare(n.id))) i.set(t.id, {
    descriptor: t,
    revision: 0,
    status: t.autoplay ? "playing" : "stopped",
    active: t.autoplay ?? !1,
    time: 0,
    speed: t.playbackRate ?? 1,
    direction: 1,
    iteration: 0,
    frame: null,
    transition: null,
    suppressedBy: null
  });
}
function Ll(i, e, t, s) {
  const n = new Set(t);
  for (const o of i.values()) o.transition && (n.has(o.descriptor.id) || n.has(o.transition.toAnimationId)) && s(o);
  for (const o of n) i.delete(o);
  for (const o of i.values()) o.suppressedBy && n.has(o.suppressedBy) && (o.suppressedBy = null);
  const r = e.filter((o) => !n.has(o.animationId));
  e.splice(0, e.length, ...r);
}
class Ml {
  constructor(e, t) {
    c(this, "bindings");
    c(this, "states", /* @__PURE__ */ new Map());
    c(this, "events", []);
    c(this, "nextEventSequence", 1);
    this.bindings = t, this.add(e);
  }
  add(e) {
    Tl(this.states, e), this.apply();
  }
  remove(e) {
    Ll(this.states, this.events, e, (t) => this.cancelTransition(t)), this.apply();
  }
  command(e, t) {
    const s = Md(e), n = this.require(s.animationId);
    if (n.revision !== s.expectedRevision) throw new _("E2D_FRAME_INVALID", "$.expectedRevision", `expected animation revision ${n.revision}.`);
    if (s.command === "play")
      n.status = "playing", n.active = !0;
    else if (s.command === "pause") n.status = "paused";
    else if (s.command === "stop")
      this.cancelTransition(n), n.status = "stopped", n.active = !1, n.time = n.direction === 1 ? 0 : n.descriptor.duration, n.iteration = 0;
    else if (s.command === "seek") {
      if (s.time > n.descriptor.duration) throw new _("E2D_VALUE_INVALID", "$.time", `seek exceeds duration ${n.descriptor.duration}.`);
      n.time = s.time, n.active = !0;
    } else s.command === "set-speed" ? n.speed = s.speed : s.command === "set-direction" ? n.direction = s.direction : this.transition(n, s.toAnimationId, s.transitionTicks, t);
    return n.revision += 1, this.apply(), this.snapshot(n, t);
  }
  assertAdvance(e) {
    Rl(this.states.values(), e, this.events.length);
  }
  advance(e, t) {
    this.assertAdvance(t);
    for (let s = t - 1; s >= 0; s -= 1) {
      const n = e - s;
      for (const r of this.states.values()) r.status === "playing" && Pl(r, n, (o, a, d, u, l, f) => this.emit(o, a, d, u, l, f));
      this.finishTransitions(n);
    }
    this.apply();
  }
  get(e, t) {
    return this.snapshot(this.require(e), t);
  }
  getFrame(e) {
    let t = null;
    for (const s of this.states.values()) if (s.active && !s.suppressedBy) {
      for (const n of s.descriptor.tracks) if (n.target === e && n.property === "frame") {
        const r = Ga(n, s.time);
        typeof r == "number" && (t = Math.max(0, Math.floor(r)));
      }
    }
    return t;
  }
  snapshots(e) {
    return Object.freeze([...this.states.values()].map((t) => this.snapshot(t, e)));
  }
  drainEvents() {
    const e = Object.freeze([...this.events]);
    return this.events.length = 0, e;
  }
  checkpoint(e) {
    return Object.freeze({ states: this.snapshots(e), events: Object.freeze([...this.events]), nextEventSequence: this.nextEventSequence });
  }
  inspect() {
    return Object.freeze({ states: this.states.size, playing: [...this.states.values()].filter((e) => e.status === "playing").length, queuedEvents: this.events.length });
  }
  restore(e) {
    const t = [...this.states.keys()].sort(), s = e.states.map((n) => n.animationId).sort();
    if (e.states.length !== this.states.size || t.some((n, r) => n !== s[r])) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.animations", "animation catalog differs.");
    for (const n of e.states) {
      const r = this.require(n.animationId);
      if (n.snapshotVersion !== 1 || !Number.isSafeInteger(n.revision) || n.revision < 0 || !Number.isFinite(n.time) || n.time < 0 || n.time > r.descriptor.duration || !Number.isFinite(n.speed) || n.speed <= 0 || n.speed > 64 || n.direction !== 1 && n.direction !== -1 || !Number.isSafeInteger(n.iteration) || n.iteration < 0) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.animations", "animation state is invalid.");
      r.revision = n.revision, r.status = n.status, r.active = n.active, r.time = n.time, r.speed = n.speed, r.direction = n.direction, r.iteration = n.iteration, r.frame = n.frame, r.transition = n.transition ? { toAnimationId: n.transition.toAnimationId, startedTick: n.transition.startedTick, durationTicks: n.transition.durationTicks } : null, r.suppressedBy = null;
    }
    for (const n of this.states.values()) n.transition && (this.require(n.transition.toAnimationId).suppressedBy = n.descriptor.id);
    if (!Number.isSafeInteger(e.nextEventSequence) || e.nextEventSequence < 1 || e.events.length > $.animationEventQueue || e.events.some((n) => n.snapshotVersion !== 1 || !Number.isSafeInteger(n.sequence) || n.sequence < 1 || !Number.isSafeInteger(n.tick) || n.tick < 0 || !this.states.has(n.animationId))) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.animationEvents", "animation event queue is invalid.");
    this.events.splice(0, this.events.length, ...e.events), this.nextEventSequence = e.nextEventSequence, this.apply();
  }
  destroy() {
    this.states.clear(), this.events.length = 0;
  }
  transition(e, t, s, n) {
    if (e.descriptor.id === t) throw new _("E2D_VALUE_INVALID", "$.toAnimationId", "animation cannot transition to itself.");
    this.cancelTransition(e);
    const r = this.require(t);
    e.active = !0, e.status = "playing", r.active = !0, r.status = "playing", r.time = r.direction === 1 ? 0 : r.descriptor.duration, r.iteration = 0, r.suppressedBy = e.descriptor.id, e.transition = { toAnimationId: t, startedTick: n, durationTicks: s }, s === 0 && this.finishTransitions(n);
  }
  cancelTransition(e) {
    if (!e.transition) return;
    const t = this.require(e.transition.toAnimationId);
    t.suppressedBy === e.descriptor.id && (t.suppressedBy = null), e.transition = null;
  }
  finishTransitions(e) {
    for (const t of this.states.values()) {
      const s = t.transition;
      if (!s || e - s.startedTick < s.durationTicks) continue;
      const n = this.require(s.toAnimationId);
      n.suppressedBy = null, t.transition = null, t.status = "stopped", t.active = !1;
    }
  }
  emit(e, t, s, n, r, o) {
    const a = r === 1 ? e.descriptor.events ?? [] : [...e.descriptor.events ?? []].reverse();
    for (const d of a)
      if (r === 1 ? (o ? d.time >= t : d.time > t) && d.time <= s : (o ? d.time <= t : d.time < t) && d.time >= s) {
        if (this.events.length >= $.animationEventQueue) throw new _("E2D_FRAME_INVALID", "$.animationEvents", "animation event queue capacity exceeded.");
        this.events.push(Object.freeze({ snapshotVersion: 1, sequence: this.nextEventSequence++, tick: n, animationId: e.descriptor.id, name: d.name, time: d.time, direction: r }));
      }
  }
  apply() {
    for (const e of this.states.values()) jl(e, this.bindings);
  }
  snapshot(e, t) {
    const s = e.transition;
    return Object.freeze({
      snapshotVersion: 1,
      animationId: e.descriptor.id,
      revision: e.revision,
      status: e.status,
      active: e.active,
      time: e.time,
      speed: e.speed,
      direction: e.direction,
      iteration: e.iteration,
      frame: e.frame,
      transition: s ? Object.freeze({ ...s, progress: s.durationTicks === 0 ? 1 : Math.max(0, Math.min(1, (t - s.startedTick) / s.durationTicks)) }) : null
    });
  }
  require(e) {
    const t = this.states.get(e);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.animationId", `unknown animation "${e}".`);
    return t;
  }
}
function Qn(i, e, t) {
  const s = i?.keys;
  if (!s || s.length === 0) return t;
  if (e <= s[0].t) return s[0].value;
  if (e >= s[s.length - 1].t) return s[s.length - 1].value;
  let n = 1;
  for (; n < s.length && s[n].t < e; ) n += 1;
  const r = s[n - 1], o = s[n], a = (e - r.t) / Math.max(Number.EPSILON, o.t - r.t);
  return r.value + (o.value - r.value) * a;
}
function Fa(i, e) {
  const t = i.colorStart ?? [1, 1, 1, 1], s = i.colorEnd ?? [1, 1, 1, 0], n = Qn(i.opacityCurve, e, 1);
  return Object.freeze([
    t[0] + (s[0] - t[0]) * e,
    t[1] + (s[1] - t[1]) * e,
    t[2] + (s[2] - t[2]) * e,
    Math.max(0, Math.min(1, (t[3] + (s[3] - t[3]) * e) * n))
  ]);
}
function Vl(i) {
  let e = i.randomState || 1;
  return e ^= e << 13, e ^= e >>> 17, e ^= e << 5, i.randomState = e >>> 0, i.randomState / 4294967296;
}
function Pt(i, e) {
  return e[0] + (e[1] - e[0]) * Vl(i);
}
function Gl(i, e, t, s) {
  t[i] = null, e.slots.delete(i), s.push(i);
}
function Fl(i, e) {
  if (!Number.isSafeInteger(e) || e < 0 || e > $.animationAdvanceTicks) throw new _("E2D_FRAME_INVALID", "$.simulationTick", `particle advance must be within 0..${$.animationAdvanceTicks} ticks.`);
  let t = 0;
  for (const s of i) {
    const n = s.status === "playing" ? Math.min(s.descriptor.capacity - s.slots.size, Math.ceil(s.descriptor.emissionRate * s.timeScale * e / (s.descriptor.fixedStepHz ?? 60))) : 0;
    t += (s.slots.size + n) * e;
  }
  if (t > $.particleAdvanceWork) throw new _("E2D_FRAME_INVALID", "$.simulationTick", `particle advance work exceeds ${$.particleAdvanceWork}.`);
}
function Ba(i, e, t, s) {
  const n = Math.min(e, i.descriptor.capacity - i.slots.size, s.length);
  for (let r = 0; r < n; r += 1) {
    const o = s.pop(), a = Pt(i, i.descriptor.speed ?? [0, 0]), d = Pt(i, i.descriptor.angle ?? [0, 0]), u = Pt(i, i.descriptor.lifetime), l = Pt(i, i.descriptor.size ?? [1, 1]), f = Pt(i, i.descriptor.rotation ?? [0, 0]), h = Pt(i, i.descriptor.angularVelocity ?? [0, 0]), p = {
      id: o,
      emitterId: i.descriptor.id,
      previousX: 0,
      previousY: 0,
      x: 0,
      y: 0,
      velocityX: Math.cos(d) * a,
      velocityY: Math.sin(d) * a,
      age: 0,
      lifetime: u,
      baseSize: l,
      size: l * Qn(i.descriptor.sizeCurve, 0, 1),
      rotation: f,
      angularVelocity: h,
      color: Fa(i.descriptor, 0)
    };
    t[o] = p, i.slots.add(o);
  }
}
function Bl(i, e, t, s) {
  if (i.status === "paused" || i.timeScale === 0 || i.descriptor.offscreen === "pause-when-hidden" && !s(i.descriptor.entity)) return;
  const n = i.timeScale / (i.descriptor.fixedStepHz ?? 60);
  for (const a of [...i.slots].sort((d, u) => d - u)) {
    const d = e[a];
    if (d.previousX = d.x, d.previousY = d.y, d.age += n, d.age >= d.lifetime) {
      Gl(a, i, e, t);
      continue;
    }
    d.velocityX += (i.descriptor.gravity?.[0] ?? 0) * n, d.velocityY += (i.descriptor.gravity?.[1] ?? 0) * n, d.x += d.velocityX * n, d.y += d.velocityY * n, d.rotation += d.angularVelocity * n;
    const u = d.age / d.lifetime;
    d.size = d.baseSize * Qn(i.descriptor.sizeCurve, u, 1), d.color = Fa(i.descriptor, u);
  }
  if (i.status !== "playing") return;
  i.elapsedTicks += 1;
  const r = i.descriptor.duration === void 0 ? null : Math.max(1, Math.round(i.descriptor.duration * (i.descriptor.fixedStepHz ?? 60)));
  if (r !== null && i.elapsedTicks >= r && (i.descriptor.loop === !1 ? i.status = "stopped" : i.elapsedTicks %= r), i.status !== "playing") return;
  i.emissionAccumulator += i.descriptor.emissionRate * n;
  const o = Math.floor(i.emissionAccumulator);
  o > 0 && (i.emissionAccumulator -= o, Ba(i, o, e, t));
}
class Ul {
  constructor(e, t) {
    c(this, "isVisible");
    c(this, "emitters", /* @__PURE__ */ new Map());
    c(this, "slots");
    c(this, "freeSlots");
    c(this, "simulationTick", 0);
    this.isVisible = t;
    const s = e.reduce((n, r) => n + r.capacity, 0);
    if (s > $.particleSceneCapacity) throw new _("E2D_VALUE_INVALID", "$.particles", "particle scene capacity exceeded.");
    this.slots = new Array(s).fill(null), this.freeSlots = Array.from({ length: s }, (n, r) => s - r - 1);
    for (const n of [...e].sort((r, o) => r.id.localeCompare(o.id))) this.emitters.set(n.id, {
      descriptor: n,
      slots: /* @__PURE__ */ new Set(),
      revision: 0,
      status: n.autoplay === !1 ? "stopped" : "playing",
      timeScale: 1,
      elapsedTicks: 0,
      emissionAccumulator: 0,
      randomState: (n.seed ?? 1) >>> 0
    });
  }
  command(e) {
    const t = Vd(e), s = this.require(t.emitterId);
    if (s.revision !== t.expectedRevision) throw new _("E2D_FRAME_INVALID", "$.expectedRevision", `expected particle revision ${s.revision}.`);
    if (t.command === "play") s.status = "playing";
    else if (t.command === "pause") s.status = "paused";
    else if (t.command === "stop")
      s.status = "stopped", s.elapsedTicks = 0, s.emissionAccumulator = 0, this.clearEmitter(s);
    else if (t.command === "set-time-scale") s.timeScale = t.timeScale;
    else {
      const n = t.count;
      if (n > (s.descriptor.maxBurst ?? 1024)) throw new _("E2D_VALUE_INVALID", "$.count", `burst exceeds emitter maxBurst ${s.descriptor.maxBurst ?? 1024}.`);
      Ba(s, n, this.slots, this.freeSlots);
    }
    return s.revision += 1, this.emitterSnapshot(s);
  }
  assertAdvance(e) {
    Fl(this.emitters.values(), e);
  }
  advance(e, t) {
    this.assertAdvance(t);
    for (let s = t - 1; s >= 0; s -= 1) {
      this.simulationTick = e - s;
      for (const n of this.emitters.values()) Bl(n, this.slots, this.freeSlots, this.isVisible);
    }
    this.simulationTick = e;
  }
  snapshot() {
    const e = [];
    for (let t = 0; t < this.slots.length; t += 1) {
      const s = this.slots[t];
      s && e.push(this.particleSnapshot(s));
    }
    return Object.freeze({
      snapshotVersion: 1,
      simulationTick: this.simulationTick,
      emitters: Object.freeze([...this.emitters.values()].map((t) => this.emitterSnapshot(t))),
      particles: Object.freeze(e)
    });
  }
  checkpoint() {
    return Object.freeze({ snapshot: this.snapshot() });
  }
  restore(e) {
    const t = e.snapshot, s = [...this.emitters.keys()].sort(), n = t.emitters.map((r) => r.emitterId).sort();
    if (t.snapshotVersion !== 1 || !Number.isSafeInteger(t.simulationTick) || t.simulationTick < 0 || t.emitters.length !== this.emitters.size || s.some((r, o) => r !== n[o])) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.particles.emitters", "particle emitter catalog differs.");
    for (const r of this.emitters.values()) r.slots.clear();
    this.slots.fill(null), this.freeSlots.length = 0;
    for (const r of t.emitters) {
      const o = this.require(r.emitterId);
      if (r.snapshotVersion !== 1 || !Number.isSafeInteger(r.revision) || r.revision < 0 || !Number.isFinite(r.timeScale) || r.timeScale < 0 || r.timeScale > 16 || !Number.isSafeInteger(r.elapsedTicks) || r.elapsedTicks < 0 || !Number.isFinite(r.emissionAccumulator) || r.emissionAccumulator < 0 || !Number.isSafeInteger(r.randomState) || r.randomState < 0 || r.randomState > 4294967295 || !Number.isSafeInteger(r.activeParticles) || r.activeParticles < 0 || r.activeParticles > o.descriptor.capacity) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.particles.emitters", "particle emitter state is invalid.");
      o.revision = r.revision, o.status = r.status, o.timeScale = r.timeScale, o.elapsedTicks = r.elapsedTicks, o.emissionAccumulator = r.emissionAccumulator, o.randomState = r.randomState;
    }
    for (const r of t.particles) {
      if (!Number.isSafeInteger(r.id) || r.id < 0 || r.id >= this.slots.length || this.slots[r.id]) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.particles", "particle slot catalog is invalid.");
      const o = this.require(r.emitterId);
      if ([...r.previousPosition, ...r.position, ...r.velocity, r.age, r.lifetime, r.baseSize, r.size, r.rotation, r.angularVelocity, ...r.color].some((d) => !Number.isFinite(d)) || r.age < 0 || r.lifetime <= 0 || r.age >= r.lifetime || r.baseSize < 0 || r.size < 0 || r.color.some((d) => d < 0 || d > 1)) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.particles", "particle state is invalid.");
      const a = { id: r.id, emitterId: r.emitterId, previousX: r.previousPosition[0], previousY: r.previousPosition[1], x: r.position[0], y: r.position[1], velocityX: r.velocity[0], velocityY: r.velocity[1], age: r.age, lifetime: r.lifetime, baseSize: r.baseSize, size: r.size, rotation: r.rotation, angularVelocity: r.angularVelocity, color: r.color };
      this.slots[a.id] = a, o.slots.add(a.id);
    }
    for (let r = this.slots.length - 1; r >= 0; r -= 1) this.slots[r] || this.freeSlots.push(r);
    for (const r of t.emitters) if (this.require(r.emitterId).slots.size !== r.activeParticles) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.particles.emitters", "particle active count differs from retained slots.");
    this.simulationTick = t.simulationTick;
  }
  inspect() {
    return Object.freeze({ capacity: this.slots.length, active: this.slots.length - this.freeSlots.length, pooled: this.freeSlots.length, emitters: this.emitters.size });
  }
  destroy() {
    this.emitters.clear(), this.slots.fill(null), this.freeSlots.length = 0;
  }
  release(e, t) {
    this.slots[e] = null, t.slots.delete(e), this.freeSlots.push(e);
  }
  clearEmitter(e) {
    for (const t of [...e.slots]) this.release(t, e);
  }
  require(e) {
    const t = this.emitters.get(e);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.emitterId", `unknown particle emitter "${e}".`);
    return t;
  }
  emitterSnapshot(e) {
    return Object.freeze({ snapshotVersion: 1, emitterId: e.descriptor.id, revision: e.revision, status: e.status, timeScale: e.timeScale, elapsedTicks: e.elapsedTicks, emissionAccumulator: e.emissionAccumulator, randomState: e.randomState, activeParticles: e.slots.size });
  }
  particleSnapshot(e) {
    return Object.freeze({ id: e.id, emitterId: e.emitterId, previousPosition: Object.freeze([e.previousX, e.previousY]), position: Object.freeze([e.x, e.y]), velocity: Object.freeze([e.velocityX, e.velocityY]), age: e.age, lifetime: e.lifetime, size: e.size, baseSize: e.baseSize, rotation: e.rotation, angularVelocity: e.angularVelocity, color: e.color });
  }
}
function Pr(i) {
  return i.kind === "tilemap-patch" ? i.request.tilemapId : i.kind === "text-update" ? i.request.textId : i.kind === "animation" ? i.request.animationId : i.kind === "particle" ? i.request.emitterId : i.handle.entityId;
}
function Wl(i) {
  return [...i].sort((e, t) => e.tick - t.tick || e.kind.localeCompare(t.kind) || Pr(e).localeCompare(Pr(t)));
}
const Yl = Object.freeze([1, 1, 1, 1]);
class ql {
  constructor(e) {
    c(this, "options");
    c(this, "descriptors");
    c(this, "itemEntities");
    c(this, "records", /* @__PURE__ */ new Map());
    c(this, "nextGenerations", /* @__PURE__ */ new Map());
    c(this, "animationIdentities", /* @__PURE__ */ new Map());
    c(this, "renderables");
    c(this, "nextStableIndex");
    c(this, "nextAnimationBank", 1);
    c(this, "dynamicAnimationCount", 0);
    this.options = e, this.descriptors = new Map(e.definition.sprites.map((t) => [t.id, t])), this.itemEntities = new Map(e.renderables.map((t) => [t.descriptor.id, t.descriptor.entity])), this.renderables = e.renderables, this.nextStableIndex = e.renderables.length;
  }
  spawn(e) {
    if (this.options.assertAlive(), !e || typeof e != "object") throw new _("E2D_VALUE_INVALID", "$.sprite", "spawn request is required.");
    if (this.itemEntities.has(e.spriteId)) throw new _("E2D_VALUE_INVALID", "$.spriteId", `render item "${e.spriteId}" already exists.`);
    const t = this.options.definition.sprites.find((w) => w.id === e.templateId);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.templateId", `unknown static sprite template "${e.templateId}".`);
    if (this.descriptors.size >= $.sprites) throw new _("E2D_VALUE_INVALID", "$.sprites", `sprite count exceeds ${$.sprites}.`);
    const s = e.entityId ?? e.spriteId;
    if (this.options.transforms.get(s)) throw new _("E2D_VALUE_INVALID", "$.entityId", `entity "${s}" already exists.`);
    e.parent && this.options.validateParent(e.parent);
    const { mask: n, parent: r, ...o } = t, a = e.presentation?.clip === void 0 ? n : e.presentation.clip, d = {
      ...o,
      id: e.spriteId,
      entity: s,
      transform: e.transform ?? t.transform,
      visible: e.presentation?.visible ?? t.visible,
      opacity: e.presentation?.opacity ?? t.opacity,
      tint: e.presentation?.tint ?? t.tint,
      ...e.parent ? { parent: { kind: "entity", id: e.parent.entityId } } : {},
      ...a == null ? {} : { mask: a }
    }, u = Hn({ ...this.options.definition, sprites: [...this.options.definition.sprites, d] }), l = u.sprites[u.sprites.length - 1];
    let f = this.nextAnimationBank, h = this.cloneAnimations(t, l, f);
    const p = new Set(this.options.definition.animations.map((w) => w.id));
    for (; h.descriptors.some((w) => p.has(w.id) || this.animationIdentities.has(w.id)); )
      f += 1, h = this.cloneAnimations(t, l, f);
    if (this.options.definition.animations.length + this.dynamicAnimationCount + h.descriptors.length > $.animations)
      throw new _("E2D_VALUE_INVALID", "$.animations", `animation count exceeds ${$.animations}.`);
    const m = La(this.options.definition, l, "sprite", this.nextStableIndex, this.options.boundsProvider), y = Va(this.options.definition, [...this.renderables, m]), b = this.options.transforms.add(s, l.transform);
    this.options.visibility.add(s, { visible: l.visible, opacity: l.opacity, tint: l.tint ?? Yl, clip: l.mask ?? null }), this.options.hierarchy.add(s, e.parent?.entityId ?? null);
    const g = Object.freeze({
      spriteId: l.id,
      spriteGeneration: this.nextGenerations.get(l.id) ?? 1,
      entity: Object.freeze({ entityId: s, entityGeneration: b.generation, sceneGeneration: this.options.sceneGeneration, domainGeneration: this.options.domainGeneration }),
      sceneGeneration: this.options.sceneGeneration,
      domainGeneration: this.options.domainGeneration
    });
    this.descriptors.set(l.id, l), this.itemEntities.set(l.id, s), this.records.set(l.id, { handle: g, templateId: t.id, descriptor: l, animationBindings: h.bindings });
    for (const w of h.bindings) this.animationIdentities.set(w.animationId, Object.freeze({ ...w, spriteId: l.id }));
    return this.renderables = y, this.nextStableIndex += 1, this.nextAnimationBank = f + 1, this.dynamicAnimationCount += h.descriptors.length, this.options.registerAnimations(h.descriptors), this.options.onRenderablesChanged(y), g;
  }
  get(e) {
    this.options.assertAlive();
    const t = this.records.get(e);
    if (!t) return null;
    const s = this.options.transforms.get(t.handle.entity.entityId);
    return Object.freeze({
      snapshotVersion: 1,
      handle: t.handle,
      templateId: t.templateId,
      descriptor: t.descriptor,
      animationBindings: t.animationBindings,
      transform: s.current,
      presentation: this.options.visibility.getLocal(t.handle.entity.entityId)
    });
  }
  destroy(e) {
    if (this.options.assertAlive(), e.sceneGeneration !== this.options.sceneGeneration) throw new _("E2D_STALE_SCENE", "$.handle.sceneGeneration", "sprite belongs to a stale scene generation.");
    if (e.domainGeneration !== this.options.domainGeneration) throw new _("E2D_STALE_DOMAIN", "$.handle.domainGeneration", "sprite belongs to a stale domain generation.");
    const t = this.records.get(e.spriteId);
    if (!t || t.handle.spriteGeneration !== e.spriteGeneration || t.handle.entity.entityGeneration !== e.entity.entityGeneration)
      throw new _("E2D_STALE_ENTITY", "$.handle.spriteGeneration", "sprite handle is stale or already destroyed.");
    this.options.unregisterAnimations(t.animationBindings.map((s) => s.animationId)), this.dynamicAnimationCount -= t.animationBindings.length;
    for (const s of t.animationBindings) this.animationIdentities.delete(s.animationId);
    this.records.delete(e.spriteId), this.descriptors.delete(e.spriteId), this.itemEntities.delete(e.spriteId), this.nextGenerations.set(e.spriteId, e.spriteGeneration + 1), this.renderables = Object.freeze(this.renderables.filter((s) => s.descriptor.id !== e.spriteId)), this.options.hierarchy.remove(e.entity.entityId), this.options.visibility.remove(e.entity.entityId), this.options.transforms.remove(e.entity.entityId), this.options.onRenderablesChanged(this.renderables);
  }
  descriptor(e) {
    return this.options.assertAlive(), this.descriptors.get(e);
  }
  animationBindings(e) {
    this.options.assertAlive();
    const t = this.records.get(e);
    if (t) return t.animationBindings;
    const s = this.options.definition.sprites.find((n) => n.id === e);
    return s ? Object.freeze(this.options.definition.animations.filter((n) => n.target === s.id || n.target === s.entity || n.tracks.some((r) => r.target === s.id || r.target === s.entity)).map((n) => Object.freeze({ animationId: n.id, sourceAnimationId: n.id }))) : null;
  }
  animationIdentity(e) {
    return this.options.assertAlive(), this.animationIdentities.get(e);
  }
  resolveTargetEntity(e) {
    return this.itemEntities.get(e) ?? e;
  }
  clear() {
    this.records.clear(), this.nextGenerations.clear(), this.animationIdentities.clear(), this.descriptors.clear(), this.itemEntities.clear(), this.renderables = Object.freeze([]), this.dynamicAnimationCount = 0;
  }
  cloneAnimations(e, t, s) {
    const n = /* @__PURE__ */ new Set([e.id, e.entity]), r = this.options.definition.animations.filter((a) => !a.asset && (a.target === void 0 || n.has(a.target)) && a.tracks.length > 0 && a.tracks.every((d) => n.has(d.target))), o = r.map((a, d) => Object.freeze({
      ...a,
      id: `forgeng.runtime2d:a-${s}-${d}`,
      ...a.target === void 0 ? {} : { target: a.target === e.id ? t.id : t.entity },
      tracks: Object.freeze(a.tracks.map((u) => Object.freeze({
        ...u,
        target: u.target === e.id ? t.id : t.entity
      })))
    }));
    return Object.freeze({
      descriptors: Object.freeze(o),
      bindings: Object.freeze(o.map((a, d) => Object.freeze({
        animationId: a.id,
        sourceAnimationId: r[d].id
      })))
    });
  }
}
const Kl = Object.freeze({ group: 1, mask: 4294967295 }), jr = 1e5;
function bn(i, e, t) {
  const s = i ?? t;
  if (s.length !== 2 || !s.every(Number.isFinite)) throw new _("E2D_VALUE_INVALID", e, "expected two finite numbers.");
  return Object.freeze([s[0], s[1]]);
}
function Tr(i, e) {
  if (!i || typeof i != "object") throw new _("E2D_VALUE_INVALID", e, "collision shape is required.");
  const t = bn(i.offset, `${e}.offset`, [0, 0]);
  if (i.kind === "aabb") {
    const s = bn(i.size, `${e}.size`, [0, 0]);
    if (s[0] <= 0 || s[1] <= 0) throw new _("E2D_VALUE_INVALID", `${e}.size`, "AABB size must be positive.");
    return Object.freeze({ kind: "aabb", size: s, offset: t });
  }
  if (i.kind === "circle") {
    if (!Number.isFinite(i.radius) || i.radius <= 0) throw new _("E2D_VALUE_INVALID", `${e}.radius`, "circle radius must be positive.");
    return Object.freeze({ kind: "circle", radius: i.radius, offset: t });
  }
  throw new _("E2D_VALUE_INVALID", `${e}.kind`, 'expected "aabb" or "circle".');
}
function Lr(i, e, t) {
  const s = i ?? e;
  if (!Number.isSafeInteger(s) || s < 0 || s > 4294967295) throw new _("E2D_VALUE_INVALID", t, "expected a uint32 value.");
  return s >>> 0;
}
function Mr(i, e = Kl) {
  return Object.freeze({ group: Lr(i?.group, e.group, "$.filter.group"), mask: Lr(i?.mask, e.mask, "$.filter.mask") });
}
function Vr(i, e) {
  const t = i.offset ?? [0, 0];
  if (i.kind === "aabb")
    return { kind: "aabb", bounds: Pa(e, [t[0] - i.size[0] * 0.5, t[1] - i.size[1] * 0.5, i.size[0], i.size[1]]) };
  const s = Xe(e, t), n = Math.hypot(e[0], e[1]), r = Math.hypot(e[2], e[3]), o = i.radius * Math.max(n, r);
  return { kind: "circle", center: s, radius: o, bounds: [s[0] - o, s[1] - o, o * 2, o * 2] };
}
function Hl(i, e) {
  if (!Ta(i.bounds, e.bounds)) return !1;
  if (i.kind === "aabb" && e.kind === "aabb") return !0;
  if (i.kind === "circle" && e.kind === "circle") {
    const d = i.center[0] - e.center[0], u = i.center[1] - e.center[1], l = i.radius + e.radius;
    return d * d + u * u <= l * l;
  }
  const t = i.kind === "circle" ? i : e, s = i.kind === "aabb" ? i : e, n = Math.max(s.bounds[0], Math.min(t.center[0], s.bounds[0] + s.bounds[2])), r = Math.max(s.bounds[1], Math.min(t.center[1], s.bounds[1] + s.bounds[3])), o = t.center[0] - n, a = t.center[1] - r;
  return o * o + a * a <= t.radius * t.radius;
}
function Xl(i, e) {
  return (i.group & e.mask) !== 0 && (e.group & i.mask) !== 0;
}
class Jl {
  constructor(e) {
    c(this, "options");
    c(this, "records", /* @__PURE__ */ new Map());
    c(this, "nextGenerations", /* @__PURE__ */ new Map());
    c(this, "nextOrder", 0);
    this.options = e;
    for (const t of e.definitions ?? []) this.create(t);
  }
  create(e) {
    if (!e || typeof e != "object") throw new _("E2D_VALUE_INVALID", "$.collider", "collider definition is required.");
    if (typeof e.id != "string" || e.id.length === 0) throw new _("E2D_VALUE_INVALID", "$.collider.id", "collider id is required.");
    if (this.records.has(e.id)) throw new _("E2D_VALUE_INVALID", "$.collider.id", `collider "${e.id}" already exists.`);
    if (this.records.size >= jr) throw new _("E2D_VALUE_INVALID", "$.colliders", `collider count exceeds ${jr}.`);
    const t = this.options.entityHandle(e.entityId);
    this.options.validateEntity(t);
    const s = Object.freeze({
      colliderId: e.id,
      colliderGeneration: this.nextGenerations.get(e.id) ?? 1,
      entity: t,
      sceneGeneration: this.options.sceneGeneration,
      domainGeneration: this.options.domainGeneration
    });
    return this.records.set(e.id, {
      handle: s,
      shape: Tr(e.shape, "$.collider.shape"),
      sensor: e.sensor ?? !1,
      filter: Mr(e.filter),
      order: this.nextOrder++
    }), s;
  }
  get(e) {
    const t = this.records.get(e);
    return t ? this.snapshot(t) : null;
  }
  destroy(e) {
    const t = this.assertHandle(e);
    this.records.delete(e.colliderId), this.nextGenerations.set(e.colliderId, t.handle.colliderGeneration + 1);
  }
  removeEntity(e) {
    for (const t of [...this.records.values()]) t.handle.entity.entityId === e.entityId && t.handle.entity.entityGeneration === e.entityGeneration && (this.records.delete(t.handle.colliderId), this.nextGenerations.set(t.handle.colliderId, t.handle.colliderGeneration + 1));
  }
  query(e) {
    const t = Tr(e.shape, "$.query.shape"), s = bn(e.position, "$.query.position", [0, 0]), n = Vr(t, [1, 0, 0, 1, s[0], s[1]]), r = Mr(e.filter, { group: 4294967295, mask: 4294967295 });
    return this.matches(n, r, e.includeSensors ?? !0);
  }
  overlap(e, t = !0) {
    const s = this.assertHandle(e), n = this.resolve(s);
    return Object.freeze(this.matches(n, s.filter, t).filter((r) => r.handle.colliderId !== e.colliderId));
  }
  get size() {
    return this.records.size;
  }
  snapshots() {
    return Object.freeze([...this.records.values()].sort((e, t) => e.order - t.order).map((e) => this.snapshot(e)));
  }
  clear() {
    this.records.clear(), this.nextGenerations.clear();
  }
  matches(e, t, s) {
    const n = [];
    for (const r of [...this.records.values()].sort((o, a) => o.order - a.order)) {
      if (!s && r.sensor || !Xl(t, r.filter)) continue;
      const o = this.resolve(r);
      Hl(e, o) && n.push(this.snapshot(r, o));
    }
    return Object.freeze(n);
  }
  resolve(e) {
    const t = this.options.worldMatrix(e.handle.entity);
    if (!t) throw new _("E2D_STALE_ENTITY", "$.collider.entity", `collider "${e.handle.colliderId}" references a stale entity.`);
    return Vr(e.shape, t);
  }
  snapshot(e, t = this.resolve(e)) {
    return Object.freeze({
      snapshotVersion: 1,
      handle: e.handle,
      shape: e.shape,
      sensor: e.sensor,
      filter: e.filter,
      bounds: Object.freeze([...t.bounds])
    });
  }
  assertHandle(e) {
    if (e.sceneGeneration !== this.options.sceneGeneration) throw new _("E2D_STALE_SCENE", "$.collider.sceneGeneration", "collider belongs to a stale scene generation.");
    if (e.domainGeneration !== this.options.domainGeneration) throw new _("E2D_STALE_DOMAIN", "$.collider.domainGeneration", "collider belongs to a stale domain generation.");
    const t = this.records.get(e.colliderId);
    if (!t || t.handle.colliderGeneration !== e.colliderGeneration) throw new _("E2D_STALE_ENTITY", "$.collider.colliderGeneration", "collider handle is stale or destroyed.");
    return this.options.validateEntity(t.handle.entity), t;
  }
}
const Ql = Object.freeze([1, 1, 1, 1]);
class Zl {
  constructor(e, t, s = {}, n) {
    c(this, "domainGeneration");
    c(this, "onDestroy");
    c(this, "sceneId");
    c(this, "sceneGeneration");
    c(this, "definition");
    c(this, "transforms", new Dl());
    c(this, "hierarchy", new Ol(this.transforms));
    c(this, "visibility", new Cl());
    c(this, "cameras");
    c(this, "buffers");
    c(this, "counters", new vl());
    c(this, "extractor");
    c(this, "spawnedSpriteOwner");
    c(this, "animations");
    c(this, "particles");
    c(this, "collisions");
    c(this, "tilemapPatches", /* @__PURE__ */ new Map());
    c(this, "textContents", /* @__PURE__ */ new Map());
    c(this, "phase", "attached");
    c(this, "revision", 1);
    c(this, "simulationTick", 0);
    c(this, "lastFrame", 0);
    c(this, "destroyed", !1);
    c(this, "quality");
    c(this, "spawnSprite", (e) => this.spawnedSpriteOwner.spawn(e));
    c(this, "getSpawnedSprite", (e) => this.spawnedSpriteOwner.get(e));
    c(this, "destroySprite", (e) => {
      this.spawnedSpriteOwner.destroy(e), this.collisions.removeEntity(e.entity);
    });
    c(this, "getSpriteDescriptor", (e) => this.spawnedSpriteOwner.descriptor(e));
    c(this, "getSpriteAnimationBindings", (e) => this.spawnedSpriteOwner.animationBindings(e));
    c(this, "getAnimationIdentity", (e) => this.spawnedSpriteOwner.animationIdentity(e));
    c(this, "getCameraState", (e) => (this.assertAlive(), this.synchronize(), this.updateCameras(), this.cameras.state(e)));
    c(this, "setCameraPosition", (e, t) => {
      this.assertAlive();
      const s = this.cameras.setPosition(e, t);
      return this.revision += 1, s;
    });
    c(this, "setCameraPixelSnap", (e, t) => {
      this.assertAlive();
      const s = this.cameras.setPixelSnap(e, t);
      return this.revision += 1, s;
    });
    c(this, "followCamera", (e, t, s) => (this.assertHandle(t), this.cameras.follow(e, t, s), this.revision += 1, this.synchronize(), this.updateCameras(), this.cameras.state(e)));
    c(this, "unfollowCamera", (e) => {
      this.assertAlive();
      const t = this.cameras.unfollow(e);
      return this.revision += 1, t;
    });
    c(this, "getCameraSnapshot", (e) => (this.assertAlive(), this.cameras.get(e)));
    c(this, "createCollider", (e) => (this.assertAlive(), this.synchronize(), this.collisions.create(e)));
    c(this, "getCollider", (e) => (this.assertAlive(), this.synchronize(), this.collisions.get(e)));
    c(this, "destroyCollider", (e) => {
      this.assertAlive(), this.collisions.destroy(e);
    });
    c(this, "queryColliders", (e) => (this.assertAlive(), this.synchronize(), this.counters.collisionQueries += 1, this.collisions.query(e)));
    c(this, "overlapCollider", (e, t = !0) => (this.assertAlive(), this.synchronize(), this.counters.collisionQueries += 1, this.collisions.overlap(e, t)));
    c(this, "inspectDevtools", () => (this.assertAlive(), Object.freeze({
      snapshotVersion: 1,
      sceneId: this.sceneId,
      sceneGeneration: this.sceneGeneration,
      domainGeneration: this.domainGeneration,
      animations: this.animations.snapshots(this.simulationTick),
      colliders: this.collisions.snapshots()
    })));
    this.domainGeneration = t, this.onDestroy = n, this.sceneId = e.sceneId, this.sceneGeneration = e.sceneGeneration, this.definition = e.definition, this.simulationTick = ad(s.initialSimulationTick);
    for (const o of this.definition.tilemaps) this.tilemapPatches.set(o.id, { revision: 0, patches: /* @__PURE__ */ new Map() });
    for (const o of this.definition.texts) this.textContents.set(o.id, { revision: 0, text: o.text });
    this.quality = Qi(e.quality ?? {}), this.cameras = new zl(this.definition.cameras, s.surface);
    const r = Va(this.definition, $l(this.definition, s.boundsProvider));
    this.createEntities(r.map((o) => o.descriptor)), this.collisions = new Jl({
      sceneGeneration: this.sceneGeneration,
      domainGeneration: this.domainGeneration,
      entityHandle: (o) => this.getEntityHandle(o),
      validateEntity: (o) => this.assertHandle(o),
      worldMatrix: (o) => {
        const a = this.transforms.get(o.entityId);
        return a?.generation === o.entityGeneration ? a.worldCurrent : null;
      },
      definitions: s.colliders
    }), this.spawnedSpriteOwner = new ql({
      definition: this.definition,
      sceneGeneration: this.sceneGeneration,
      domainGeneration: this.domainGeneration,
      transforms: this.transforms,
      hierarchy: this.hierarchy,
      visibility: this.visibility,
      renderables: r,
      ...s.boundsProvider ? { boundsProvider: s.boundsProvider } : {},
      assertAlive: () => this.assertAlive(),
      validateParent: (o) => this.assertHandle(o),
      registerAnimations: (o) => this.animations.add(o),
      unregisterAnimations: (o) => this.animations.remove(o),
      onRenderablesChanged: (o) => {
        this.extractor.setRenderables(o), this.revision += 1, this.synchronize();
      }
    }), this.animations = new Ml(this.definition.animations, {
      getTransform: (o) => this.transforms.get(this.spawnedSpriteOwner.resolveTargetEntity(o))?.current,
      setTransform: (o, a) => {
        const d = this.spawnedSpriteOwner.resolveTargetEntity(o);
        this.transforms.set(d, a), this.hierarchy.markSubtreeDirty(d);
      },
      getPresentation: (o) => {
        const a = this.spawnedSpriteOwner.resolveTargetEntity(o);
        return this.transforms.get(a) ? this.visibility.getLocal(a) : void 0;
      },
      setPresentation: (o, a) => {
        const d = this.spawnedSpriteOwner.resolveTargetEntity(o);
        this.transforms.get(d) && this.visibility.set(d, a);
      }
    }), this.particles = new Ul(this.definition.particles, (o) => this.visibility.getLocal(o).visible), this.buffers = new bl(s.extractionBufferCount ?? 3, Math.max(1, r.length)), this.extractor = new ml(this.definition, r, this.transforms, this.visibility, this.cameras, this.buffers, this.counters), this.synchronize();
  }
  beginSimulationStep(e) {
    if (this.assertAlive(), !Number.isSafeInteger(e) || e <= this.simulationTick) throw new _("E2D_FRAME_INVALID", "$.simulationTick", "tick must increase monotonically.");
    const t = e - this.simulationTick;
    if (t > $.animationAdvanceTicks) throw new _("E2D_FRAME_INVALID", "$.simulationTick", `fixed-step delta exceeds ${$.animationAdvanceTicks}.`);
    this.animations.assertAdvance(t), this.particles.assertAdvance(t), this.transforms.beginStep(), this.animations.advance(e, t), this.particles.advance(e, t), this.simulationTick = e, this.synchronize(), this.updateCameras();
  }
  getEntityHandle(e) {
    this.assertAlive();
    const t = this.transforms.get(e);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.entityId", `unknown entity "${e}".`);
    return Object.freeze({ entityId: e, entityGeneration: t.generation, sceneGeneration: this.sceneGeneration, domainGeneration: this.domainGeneration });
  }
  setTransform(e, t) {
    this.assertHandle(e), this.assertTransform(t), this.transforms.set(e.entityId, t), this.hierarchy.markSubtreeDirty(e.entityId);
  }
  reparent(e, t) {
    this.assertHandle(e), t && this.assertHandle(t), this.hierarchy.reparent(e.entityId, t?.entityId ?? null);
  }
  setPresentation(e, t) {
    this.assertHandle(e), this.visibility.set(e.entityId, t);
  }
  applyTilemapPatches(e) {
    this.assertAlive();
    const t = Td(e), s = this.tilemapPatches.get(t.tilemapId);
    if (!s) throw new _("E2D_ENTITY_MISSING", "$.tilemapId", `unknown tilemap "${t.tilemapId}".`);
    if (t.expectedRevision !== s.revision)
      throw new _("E2D_FRAME_INVALID", "$.expectedRevision", `expected tilemap revision ${s.revision}.`);
    const n = new Map(s.patches);
    for (const r of t.patches) n.set(`${r.layerId}:${r.x}:${r.y}`, r);
    return s.patches = n, s.revision += 1, this.revision += 1, this.getTilemapPatches(t.tilemapId);
  }
  getTilemapPatches(e) {
    this.assertAlive();
    const t = this.tilemapPatches.get(e);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.tilemapId", `unknown tilemap "${e}".`);
    return _r({
      snapshotVersion: 1,
      tilemapId: e,
      revision: t.revision,
      patches: [...t.patches.values()]
    });
  }
  updateText(e) {
    this.assertAlive();
    const t = Ld(e), s = this.textContents.get(t.textId);
    if (!s) throw new _("E2D_ENTITY_MISSING", "$.textId", `unknown text component "${t.textId}".`);
    if (t.expectedRevision !== s.revision) throw new _("E2D_FRAME_INVALID", "$.expectedRevision", `expected text revision ${s.revision}.`);
    return s.text = t.text, s.revision += 1, this.revision += 1, this.getTextContent(t.textId);
  }
  getTextContent(e) {
    this.assertAlive();
    const t = this.textContents.get(e);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.textId", `unknown text component "${e}".`);
    return $r({ snapshotVersion: 1, textId: e, revision: t.revision, text: t.text });
  }
  commandAnimation(e) {
    this.assertAlive();
    const t = this.animations.command(e, this.simulationTick);
    return this.revision += 1, this.synchronize(), t;
  }
  getAnimationState(e) {
    return this.assertAlive(), this.animations.get(e, this.simulationTick);
  }
  drainAnimationEvents() {
    return this.assertAlive(), this.animations.drainEvents();
  }
  getAnimatedFrame(e) {
    return this.assertAlive(), this.animations.getFrame(e);
  }
  commandParticleEmitter(e) {
    this.assertAlive();
    const t = this.particles.command(e);
    return this.revision += 1, t;
  }
  getParticleSimulation() {
    return this.assertAlive(), this.particles.snapshot();
  }
  resize(e) {
    this.assertAlive(), this.cameras.resize(e), this.updateCameras(), this.revision += 1;
  }
  extractFrame(e, t, s) {
    if (this.assertAlive(), !Number.isSafeInteger(e) || e < this.lastFrame || !Number.isSafeInteger(t) || t < 0 || !Number.isFinite(s) || s < 0 || s > 1)
      throw new _("E2D_FRAME_INVALID", "$.frame", "frame/tick must be monotonic integers and alpha must be in [0, 1].");
    if (t !== this.simulationTick) throw new _("E2D_FRAME_INVALID", "$.simulationTick", `expected current tick ${this.simulationTick}.`);
    this.lastFrame = e, this.phase = "extracting", this.synchronize(), this.updateCameras();
    try {
      return this.extractor.extract(Object.freeze({
        sceneId: this.sceneId,
        sceneGeneration: this.sceneGeneration,
        domainGeneration: this.domainGeneration,
        surfaceRevision: this.cameras.getSurface().revision,
        frame: e,
        simulationTick: t,
        alpha: s,
        cameraIds: Object.freeze(this.cameras.ordered().map((n) => n.id))
      }));
    } finally {
      this.phase = "attached";
    }
  }
  extract(e, t, s) {
    const n = this.extractFrame(e, t, s), r = n.snapshot;
    try {
      const o = [];
      for (let a = 0; a < r.count; a++) {
        const d = this.spawnedSpriteOwner.descriptor(r.ids[a]);
        o.push({
          id: r.ids[a],
          entity: r.entityIds[a],
          kind: r.kinds[a],
          layer: r.layerIds[a],
          order: r.orders[a],
          bounds: [r.bounds[a * 4], r.bounds[a * 4 + 1], r.bounds[a * 4 + 2], r.bounds[a * 4 + 3]],
          opacity: r.opacities[a],
          tint: [r.tints[a * 4], r.tints[a * 4 + 1], r.tints[a * 4 + 2], r.tints[a * 4 + 3]],
          assetIds: r.assetIds[a],
          transform: [r.matrices[a * 6], r.matrices[a * 6 + 1], r.matrices[a * 6 + 2], r.matrices[a * 6 + 3], r.matrices[a * 6 + 4], r.matrices[a * 6 + 5]],
          ...d ? { materialId: d.material, ...d.target ? { targetId: d.target } : {}, maskId: r.maskIds[a] } : {}
        });
      }
      return jd({ snapshotVersion: 1, sceneId: this.sceneId, sceneGeneration: this.sceneGeneration, frame: e, simulationTick: t, alpha: s, cameraIds: r.cameraIds, items: o });
    } finally {
      n.release();
    }
  }
  pick(e, t) {
    this.assertAlive(), this.counters.picks += 1;
    const s = this.extractFrame(this.lastFrame, this.simulationTick, 1);
    try {
      return wl(s.snapshot, e, t, this.cameras, (n) => this.getEntityHandle(n));
    } finally {
      s.release();
    }
  }
  checkpoint() {
    this.assertAlive();
    const e = this.animations.checkpoint(this.simulationTick), t = this.particles.checkpoint();
    return Object.freeze({
      snapshotVersion: 1,
      sceneId: this.sceneId,
      sceneGeneration: this.sceneGeneration,
      domainGeneration: this.domainGeneration,
      simulationTick: this.simulationTick,
      entities: Object.freeze([...this.transforms.values()].sort((s, n) => s.id.localeCompare(n.id)).map((s) => Object.freeze({
        id: s.id,
        generation: s.generation,
        parentId: this.hierarchy.parentOf(s.id),
        transform: s.current,
        presentation: this.visibility.getLocal(s.id)
      }))),
      tilemaps: Object.freeze([...this.tilemapPatches.keys()].sort().map((s) => this.getTilemapPatches(s))),
      texts: Object.freeze([...this.textContents.keys()].sort().map((s) => this.getTextContent(s))),
      animations: e.states,
      animationEvents: e.events,
      nextAnimationEventSequence: e.nextEventSequence,
      particleSimulation: t.snapshot
    });
  }
  restore(e) {
    if (this.assertAlive(), e.snapshotVersion !== 1 || e.sceneId !== this.sceneId || e.sceneGeneration !== this.sceneGeneration || e.domainGeneration !== this.domainGeneration)
      throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint", "checkpoint does not belong to this attachment generation.");
    const t = [...this.transforms.values()].map((d) => d.id).sort(), s = e.entities.map((d) => d.id).sort();
    if (t.length !== s.length || t.some((d, u) => d !== s[u])) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.entities", "entity catalog differs.");
    for (const d of e.entities) {
      const u = this.getEntityHandle(d.id);
      this.transforms.restore(d.id, d.transform), this.hierarchy.markSubtreeDirty(d.id), this.setPresentation(u, d.presentation);
    }
    for (const d of e.entities) this.reparent(this.getEntityHandle(d.id), d.parentId === null ? null : this.getEntityHandle(d.parentId));
    const n = [...this.tilemapPatches.keys()].sort(), r = e.tilemaps.map((d) => d.tilemapId).sort();
    if (n.length !== r.length || n.some((d, u) => d !== r[u]))
      throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.tilemaps", "tilemap catalog differs.");
    for (const d of e.tilemaps) {
      const u = _r(d), l = this.tilemapPatches.get(u.tilemapId);
      l.revision = u.revision, l.patches = new Map(u.patches.map((f) => [`${f.layerId}:${f.x}:${f.y}`, f]));
    }
    const o = [...this.textContents.keys()].sort(), a = e.texts.map((d) => d.textId).sort();
    if (o.length !== a.length || o.some((d, u) => d !== a[u])) throw new _("E2D_CHECKPOINT_INVALID", "$.checkpoint.texts", "text catalog differs.");
    for (const d of e.texts) {
      const u = $r(d), l = this.textContents.get(u.textId);
      l.revision = u.revision, l.text = u.text;
    }
    this.animations.restore({ states: e.animations, events: e.animationEvents, nextEventSequence: e.nextAnimationEventSequence }), this.particles.restore({ snapshot: e.particleSimulation }), this.simulationTick = e.simulationTick, this.synchronize();
  }
  replay(e) {
    this.assertAlive();
    const t = this.simulationTick;
    let s = t;
    for (const n of Wl(e)) {
      if (!Number.isSafeInteger(n.tick) || n.tick < s || n.tick === t) throw new _("E2D_FRAME_INVALID", "$.replay.tick", "replay ticks must follow the current tick.");
      n.tick > s && (this.beginSimulationStep(n.tick), s = n.tick), n.kind === "tilemap-patch" ? this.applyTilemapPatches(n.request) : n.kind === "text-update" ? this.updateText(n.request) : n.kind === "animation" ? this.commandAnimation(n.request) : n.kind === "particle" ? this.commandParticleEmitter(n.request) : n.kind === "transform" ? this.setTransform(n.handle, n.value) : n.kind === "parent" ? this.reparent(n.handle, n.parent) : this.setPresentation(n.handle, n.value);
    }
    this.synchronize();
  }
  snapshot() {
    return Rd({
      snapshotVersion: 1,
      revision: this.revision,
      definitionId: this.definition.id,
      generation: this.domainGeneration,
      phase: this.destroyed ? "destroyed" : this.phase,
      requested: this.quality,
      effective: this.quality,
      committed: this.destroyed ? null : this.quality,
      rejections: []
    });
  }
  inspectRuntime() {
    const e = this.buffers.inspect(), t = this.animations.inspect(), s = this.particles.inspect();
    return Object.freeze({
      snapshotVersion: 1,
      sceneId: this.sceneId,
      sceneGeneration: this.sceneGeneration,
      domainGeneration: this.domainGeneration,
      entities: this.transforms.size,
      retainedBuffers: e.retained,
      leasedBuffers: e.leased,
      bufferCapacity: e.capacity,
      bufferGrowths: e.growths,
      snapshotObjects: e.snapshots,
      hierarchyPasses: this.counters.hierarchyPasses,
      dirtyNodes: this.counters.dirtyNodes,
      testedItems: this.counters.testedItems,
      visibleItems: this.counters.visibleItems,
      culledItems: this.counters.culledItems,
      extractionPasses: this.counters.extractionPasses,
      picks: this.counters.picks,
      colliders: this.collisions.size,
      collisionQueries: this.counters.collisionQueries,
      tilemapPatchRevisions: [...this.tilemapPatches.values()].reduce((n, r) => n + r.revision, 0),
      tilemapPatchTiles: [...this.tilemapPatches.values()].reduce((n, r) => n + r.patches.size, 0),
      textRevisions: [...this.textContents.values()].reduce((n, r) => n + r.revision, 0),
      animationStates: t.states,
      playingAnimations: t.playing,
      queuedAnimationEvents: t.queuedEvents,
      particleEmitters: s.emitters,
      particleCapacity: s.capacity,
      activeParticles: s.active,
      pooledParticles: s.pooled,
      destroyed: this.destroyed
    });
  }
  destroy() {
    this.destroyed || (this.phase = "destroying", this.destroyed = !0, this.buffers.destroy(), this.animations.destroy(), this.particles.destroy(), this.cameras.clear(), this.collisions.clear(), this.spawnedSpriteOwner.clear(), this.visibility.clear(), this.hierarchy.clear(), this.transforms.clear(), this.tilemapPatches.clear(), this.textContents.clear(), this.phase = "destroyed", this.onDestroy?.());
  }
  createEntities(e) {
    for (const t of e) this.transforms.get(t.entity) || (this.transforms.add(t.entity, t.transform), this.visibility.add(t.entity, { visible: t.visible, opacity: t.opacity, tint: t.tint ?? Ql, clip: t.mask ?? null }));
    for (const t of this.transforms.values()) this.hierarchy.add(t.id, null);
    for (const t of e) t.parent && this.hierarchy.reparent(t.entity, t.parent.id);
  }
  synchronize() {
    const e = this.hierarchy.synchronize();
    this.visibility.synchronize(this.hierarchy), this.counters.recordHierarchy(e);
  }
  updateCameras() {
    this.cameras.updateFollows(
      this.sceneGeneration,
      this.domainGeneration,
      (t, s) => this.transforms.worldPosition(t, s)
    ) && (this.revision += 1);
  }
  assertHandle(e) {
    if (this.assertAlive(), e.sceneGeneration !== this.sceneGeneration) throw new _("E2D_STALE_SCENE", "$.handle.sceneGeneration", "handle belongs to a stale scene generation.");
    if (e.domainGeneration !== this.domainGeneration) throw new _("E2D_STALE_DOMAIN", "$.handle.domainGeneration", "handle belongs to a stale domain generation.");
    const t = this.transforms.get(e.entityId);
    if (!t) throw new _("E2D_ENTITY_MISSING", "$.handle.entityId", `unknown entity "${e.entityId}".`);
    if (t.generation !== e.entityGeneration) throw new _("E2D_STALE_ENTITY", "$.handle.entityGeneration", "handle belongs to a stale entity generation.");
  }
  assertTransform(e) {
    if (!e || e.position.length !== 2 || e.scale.length !== 2 || [...e.position, e.rotation, ...e.scale].some((t) => !Number.isFinite(t)))
      throw new _("E2D_VALUE_INVALID", "$.transform", "expected a finite canonical Transform2d value.");
  }
  assertAlive() {
    if (this.destroyed) throw new _("E2D_DESTROYED", "$", "scene attachment was destroyed.");
  }
}
class eu {
  constructor(e, t) {
    c(this, "catalog");
    c(this, "hooks");
    c(this, "attachments", /* @__PURE__ */ new Set());
    c(this, "candidates", /* @__PURE__ */ new Set());
    c(this, "previous", /* @__PURE__ */ new Map());
    c(this, "active", null);
    c(this, "destroyed", !1);
    this.catalog = e, this.hooks = t;
  }
  prepare(e, t = {}) {
    this.assertAlive();
    const s = Hn(e.definition);
    if (this.catalog.has(s.id) && this.catalog.get(s.id) !== e.definition && this.catalog.get(s.id) !== s)
      throw new _("E2D_DEFINITION_DUPLICATE", "$.definition", `catalog definition "${s.id}" has a different snapshot.`);
    let n;
    return n = new Zl({ ...e, definition: s }, this.hooks.nextDomainGeneration(), t, () => {
      if (this.attachments.delete(n), this.candidates.delete(n), this.active === n) {
        const r = this.previous.get(n) ?? null;
        this.active = r && this.attachments.has(r) ? r : null;
      }
      this.previous.delete(n), this.hooks.attachmentDestroyed(n);
    }), this.attachments.add(n), this.candidates.add(n), this.hooks.attachmentCreated(n), n;
  }
  commit(e) {
    if (this.assertAlive(), !this.candidates.delete(e) || !this.attachments.has(e)) throw new _("E2D_STALE_DOMAIN", "$.candidate", "candidate does not belong to this factory or is already committed.");
    this.previous.set(e, this.active), this.active = e;
  }
  rollback(e) {
    !this.attachments.has(e) || !this.candidates.has(e) || e.destroy();
  }
  getActive() {
    return this.active;
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const e of [...this.attachments]) e.destroy();
      this.attachments.clear(), this.candidates.clear(), this.previous.clear(), this.active = null;
    }
  }
  assertAlive() {
    if (this.destroyed) throw new _("E2D_DESTROYED", "$.factory", "attachment factory was destroyed.");
  }
}
class tu {
  constructor() {
    c(this, "definitions", new nl());
    c(this, "scenes");
    c(this, "attachments", /* @__PURE__ */ new Set());
    c(this, "nextGeneration", 1);
    c(this, "destroyed", !1);
    this.scenes = new eu(this.definitions, {
      nextDomainGeneration: () => this.nextGeneration++,
      attachmentCreated: (e) => this.attachments.add(e),
      attachmentDestroyed: (e) => this.attachments.delete(e)
    });
  }
  register(e) {
    this.assertAlive(), this.definitions.register(e);
  }
  createAttachment(e, t, s) {
    this.assertAlive();
    const n = this.scenes.prepare({ ...t, attachmentVersion: 1, definition: this.definitions.get(e) }, s);
    return this.scenes.commit(n), n;
  }
  inspect() {
    let e = 0, t = 0;
    for (const s of this.attachments) {
      const n = s.inspectRuntime();
      e += n.entities, t += n.retainedBuffers;
    }
    return Object.freeze({
      snapshotVersion: 1,
      definitionCount: this.definitions.size,
      activeAttachments: this.attachments.size,
      retainedEntities: e,
      retainedBuffers: t,
      nextDomainGeneration: this.nextGeneration,
      destroyed: this.destroyed
    });
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.scenes.destroy(), this.definitions.destroy(), this.attachments.clear());
  }
  assertAlive() {
    if (this.destroyed) throw new _("E2D_DESTROYED", "$", "engine runtime was destroyed.");
  }
}
function iu() {
  return new tu();
}
class E extends Error {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "WebGpuRender2dError";
  }
}
const zt = 1, js = 1, Ss = "forgeng.render:webgpu-frame", Ua = "forgeng.render:webgpu-frame-v1";
class su extends TypeError {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "RenderDomainProviderContractError";
  }
}
const nu = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/, ru = Object.freeze({
  instanceOwnership: "fresh-per-composition",
  generationOwnership: "compositor",
  cleanup: "reverse-aggregate",
  nativeAccess: "backend-extension-only"
});
function ce(i, e, t) {
  throw new su(i, e, t);
}
function ou(i, e) {
  return (typeof i != "object" || i === null || Array.isArray(i)) && ce("RDP_VALUE_INVALID", e, "expected an object."), i;
}
function Gt(i, e) {
  const t = ou(i, e), s = Object.getPrototypeOf(t);
  return s !== Object.prototype && s !== null && ce("RDP_NATIVE_VALUE_FORBIDDEN", e, "neutral descriptors accept only plain data objects."), t;
}
function Wa(i, e) {
  return (typeof i != "string" || i.length > 160 || !nu.test(i)) && ce("RDP_ID_INVALID", e, "expected a normalized namespaced ID."), i;
}
function ai(i, e, t) {
  return (!Number.isSafeInteger(i) || i < 1 || i > t) && ce("RDP_VALUE_INVALID", e, `expected an integer from 1 through ${t}.`), i;
}
function wn(i, e = "$", t = /* @__PURE__ */ new Set(), s = 0) {
  if (s > 32 && ce("RDP_LIMIT_EXCEEDED", e, "neutral value nesting exceeds 32 levels."), i === null || typeof i == "string" || typeof i == "boolean" || typeof i == "number" && Number.isFinite(i))
    return i;
  typeof i != "object" && ce("RDP_NATIVE_VALUE_FORBIDDEN", e, "expected neutral JSON data."), t.has(i) && ce("RDP_VALUE_INVALID", e, "cyclic neutral values are forbidden.");
  const n = new Set(t);
  if (n.add(i), Array.isArray(i))
    return i.length > 4096 && ce("RDP_LIMIT_EXCEEDED", e, "array exceeds 4096 items."), Object.freeze(i.map((d, u) => wn(d, `${e}[${u}]`, n, s + 1)));
  const r = Gt(i, e), o = Object.keys(r).sort();
  o.length > 256 && ce("RDP_LIMIT_EXCEEDED", e, "object exceeds 256 properties.");
  const a = {};
  for (const d of o)
    a[d] = wn(r[d], `${e}.${d}`, n, s + 1);
  return Object.freeze(a);
}
function au(i, e) {
  const t = Gt(i, e), s = t.extensions === void 0 ? void 0 : wn(t.extensions, `${e}.extensions`);
  return s !== void 0 && (typeof s != "object" || s === null || Array.isArray(s)) && ce("RDP_VALUE_INVALID", `${e}.extensions`, "expected an object."), Object.freeze({
    id: Wa(t.id, `${e}.id`),
    version: ai(t.version, `${e}.version`, 2147483647),
    ...s === void 0 ? {} : { extensions: s }
  });
}
function cu(i, e = "$.provider") {
  const t = Gt(i, e);
  t.apiVersion !== js && ce("RDP_VERSION_UNSUPPORTED", `${e}.apiVersion`, `expected ${js}.`), ["2d", "3d", "custom"].includes(String(t.kind)) || ce("RDP_VALUE_INVALID", `${e}.kind`, "expected 2d, 3d, or custom."), Array.isArray(t.capabilities) || ce("RDP_VALUE_INVALID", `${e}.capabilities`, "expected an array.");
  const s = t.capabilities.map((u, l) => au(u, `${e}.capabilities[${l}]`)), n = /* @__PURE__ */ new Set();
  s.forEach((u, l) => {
    n.has(u.id) && ce("RDP_VALUE_INVALID", `${e}.capabilities[${l}].id`, "duplicate capability."), n.add(u.id);
  });
  const r = Gt(t.limits, `${e}.limits`), o = Gt(t.targets, `${e}.targets`), a = Gt(t.lifecycle, `${e}.lifecycle`);
  (typeof o.surface != "boolean" || typeof o.offscreen != "boolean" || !Array.isArray(o.formats)) && ce("RDP_VALUE_INVALID", `${e}.targets`, "surface, offscreen and formats are required.");
  const d = Object.freeze(o.formats.map((u, l) => ((typeof u != "string" || u.length === 0 || u.length > 64) && ce("RDP_VALUE_INVALID", `${e}.targets.formats[${l}]`, "expected a format string."), u)));
  return new Set(d).size !== d.length && ce("RDP_VALUE_INVALID", `${e}.targets.formats`, "duplicate format."), (a.instanceOwnership !== "fresh-per-composition" || a.generationOwnership !== "compositor" || a.cleanup !== "reverse-aggregate" || a.nativeAccess !== "backend-extension-only") && ce("RDP_VALUE_INVALID", `${e}.lifecycle`, "lifecycle ownership rules are fixed by provider API v1."), Object.freeze({
    apiVersion: js,
    id: Wa(t.id, `${e}.id`),
    kind: t.kind,
    capabilities: Object.freeze(s),
    limits: Object.freeze({
      maxCommandsPerFrame: ai(r.maxCommandsPerFrame, `${e}.limits.maxCommandsPerFrame`, 1e6),
      maxOwnedResources: ai(r.maxOwnedResources, `${e}.limits.maxOwnedResources`, 1e6),
      maxTrackedBytes: ai(r.maxTrackedBytes, `${e}.limits.maxTrackedBytes`, Number.MAX_SAFE_INTEGER),
      maxTargets: ai(r.maxTargets, `${e}.limits.maxTargets`, 4096)
    }),
    targets: Object.freeze({ surface: o.surface, offscreen: o.offscreen, formats: d }),
    lifecycle: ru
  });
}
const du = /^[a-z][a-z0-9.-]*:[a-z0-9][a-z0-9._/-]*$/;
class Q extends TypeError {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "RenderCompositionContractError";
  }
}
function rt(i, e) {
  if (typeof i != "object" || i === null || Array.isArray(i))
    throw new Q("RC_VALUE_INVALID", e, "expected an object.");
  return i;
}
function qt(i, e) {
  if (typeof i != "string" || !du.test(i))
    throw new Q("RC_ID_INVALID", e, "expected a normalized namespaced ID.");
  return i;
}
function Ya(i, e) {
  if (!Number.isSafeInteger(i) || i < 1)
    throw new Q("RC_VALUE_INVALID", e, "expected a positive safe integer.");
  return i;
}
function Zn(i, e) {
  if (i !== zt)
    throw new Q("RC_VERSION_UNSUPPORTED", e, `expected ${zt}.`);
}
function vn(i, e) {
  if (i === null || typeof i == "string" || typeof i == "boolean" || typeof i == "number" && Number.isFinite(i))
    return i;
  if (Array.isArray(i))
    return Object.freeze(i.map((n, r) => vn(n, `${e}[${r}]`)));
  const t = rt(i, e), s = {};
  for (const n of Object.keys(t).sort())
    s[n] = vn(t[n], `${e}.${n}`);
  return Object.freeze(s);
}
function lu(i, e) {
  const t = rt(i, e), s = qt(t.id, `${e}.id`), n = Ya(t.version, `${e}.version`), r = t.extensions === void 0 ? void 0 : vn(t.extensions, `${e}.extensions`);
  if (r !== void 0 && (typeof r != "object" || r === null || Array.isArray(r)))
    throw new Q("RC_VALUE_INVALID", `${e}.extensions`, "expected an object.");
  return Object.freeze({
    id: s,
    version: n,
    ...r === void 0 ? {} : { extensions: r }
  });
}
function uu(i, e) {
  if (!Array.isArray(i))
    throw new Q("RC_VALUE_INVALID", e, "expected an array.");
  const t = i.map((n, r) => lu(n, `${e}[${r}]`)), s = /* @__PURE__ */ new Set();
  return t.forEach((n, r) => {
    if (s.has(n.id))
      throw new Q("RC_CAPABILITY_DUPLICATE", `${e}[${r}].id`, `duplicate "${n.id}".`);
    s.add(n.id);
  }), Object.freeze(t);
}
function fu(i, e) {
  const t = rt(i, e), s = qt(t.capability, `${e}.capability`);
  if (t.optional !== void 0 && typeof t.optional != "boolean")
    throw new Q("RC_VALUE_INVALID", `${e}.optional`, "expected a boolean.");
  return Object.freeze({
    capability: s,
    ...t.minimumVersion === void 0 ? {} : { minimumVersion: Ya(t.minimumVersion, `${e}.minimumVersion`) },
    ...t.optional === void 0 ? {} : { optional: t.optional }
  });
}
function In(i, e) {
  if (!Array.isArray(i))
    throw new Q("RC_VALUE_INVALID", e, "expected an array.");
  return Object.freeze(i.map((t, s) => qt(t, `${e}[${s}]`)));
}
function hu(i, e) {
  const t = rt(i, e);
  if (t.enabledByDefault !== void 0 && typeof t.enabledByDefault != "boolean")
    throw new Q("RC_VALUE_INVALID", `${e}.enabledByDefault`, "expected a boolean.");
  const s = t.sceneIds === void 0 ? [] : In(t.sceneIds, `${e}.sceneIds`), n = /* @__PURE__ */ new Set();
  return s.forEach((r, o) => {
    if (n.has(r))
      throw new Q("RC_ID_DUPLICATE", `${e}.sceneIds[${o}]`, `duplicate "${r}".`);
    n.add(r);
  }), Object.freeze({ enabledByDefault: t.enabledByDefault ?? !0, sceneIds: s });
}
function pu(i, e) {
  const t = rt(i, e), s = (n, r) => {
    const o = t[n];
    if (typeof o != "string" || !r.includes(o))
      throw new Q("RC_VALUE_INVALID", `${e}.${n}`, `expected ${r.join(" or ")}.`);
    return o;
  };
  return Object.freeze({
    target: s("target", ["surface"]),
    phase: s("phase", ["background", "world", "overlay"]),
    alpha: s("alpha", ["opaque", "premultiplied"]),
    colorSpace: s("colorSpace", ["srgb"]),
    colorLoad: s("colorLoad", ["clear", "load"]),
    colorStore: s("colorStore", ["store"]),
    depth: s("depth", ["none", "domain-private"])
  });
}
function mu(i, e) {
  const t = rt(i, e);
  Zn(t.apiVersion, `${e}.apiVersion`);
  const s = qt(t.id, `${e}.id`);
  if (typeof t.create != "function")
    throw new Q("RC_VALUE_INVALID", `${e}.create`, "expected a function.");
  return Object.freeze({
    apiVersion: zt,
    id: s,
    capabilities: uu(t.capabilities, `${e}.capabilities`),
    create: t.create
  });
}
function gu(i, e) {
  const t = rt(i, e);
  Zn(t.apiVersion, `${e}.apiVersion`);
  const s = qt(t.id, `${e}.id`);
  if (typeof t.create != "function")
    throw new Q("RC_VALUE_INVALID", `${e}.create`, "expected a function.");
  if (t.required !== void 0 && typeof t.required != "boolean")
    throw new Q("RC_VALUE_INVALID", `${e}.required`, "expected a boolean.");
  const n = t.requirements === void 0 ? [] : t.requirements;
  if (!Array.isArray(n))
    throw new Q("RC_VALUE_INVALID", `${e}.requirements`, "expected an array.");
  const r = t.order === void 0 ? {} : rt(t.order, `${e}.order`), o = r.before === void 0 ? [] : In(r.before, `${e}.order.before`), a = r.after === void 0 ? [] : In(r.after, `${e}.order.after`), d = t.provider === void 0 ? void 0 : cu(t.provider, `${e}.provider`);
  if (d !== void 0 && typeof t.getProviderSnapshot != "function")
    throw new Q("RC_VALUE_INVALID", `${e}.getProviderSnapshot`, "versioned providers require an immutable snapshot function.");
  return Object.freeze({
    apiVersion: zt,
    id: s,
    required: t.required ?? !0,
    requirements: Object.freeze(n.map((u, l) => fu(u, `${e}.requirements[${l}]`))),
    order: Object.freeze({ before: o, after: a }),
    ...t.surface === void 0 ? {} : { surface: pu(t.surface, `${e}.surface`) },
    ...t.attachment === void 0 ? {} : { attachment: hu(t.attachment, `${e}.attachment`) },
    ...d === void 0 ? {} : {
      provider: d,
      getProviderSnapshot: t.getProviderSnapshot
    },
    create: t.create
  });
}
function yu(i, e) {
  const t = i.flatMap((n, r) => n.surface ? [{ item: n, index: r, surface: n.surface }] : []);
  if (t.length === 0)
    return;
  const s = /* @__PURE__ */ new Map([["background", 0], ["world", 1], ["overlay", 2]]);
  t.forEach((n, r) => {
    const o = r === 0 ? "clear" : "load";
    if (n.surface.colorLoad !== o)
      throw new Q("RC_VALUE_INVALID", `${e}[${n.index}].surface.colorLoad`, `${r === 0 ? "first" : "subsequent"} surface contribution must ${o}.`);
    if (r === 0 && n.item.required === !1)
      throw new Q("RC_VALUE_INVALID", `${e}[${n.index}].required`, "the clearing surface contribution must be required.");
    const a = t[r - 1];
    if (a && s.get(n.surface.phase) < s.get(a.surface.phase))
      throw new Q("RC_VALUE_INVALID", `${e}[${n.index}].surface.phase`, "surface phases must be ordered background, world, overlay.");
  });
}
function bu(i, e = "$.domains") {
  const t = /* @__PURE__ */ new Map();
  i.forEach((d, u) => {
    if (t.has(d.id))
      throw new Q("RC_ID_DUPLICATE", `${e}[${u}].id`, `duplicate "${d.id}".`);
    t.set(d.id, { domain: d, index: u });
  });
  const s = new Map(i.map((d) => [d.id, /* @__PURE__ */ new Set()])), n = new Map(i.map((d) => [d.id, 0])), r = (d, u, l) => {
    if (!t.has(d))
      throw new Q("RC_ORDER_ANCHOR_MISSING", l, `missing domain "${d}".`);
    if (!t.has(u))
      throw new Q("RC_ORDER_ANCHOR_MISSING", l, `missing domain "${u}".`);
    const f = s.get(d);
    f.has(u) || (f.add(u), n.set(u, n.get(u) + 1));
  };
  i.forEach((d, u) => {
    d.order?.before?.forEach((l, f) => r(d.id, l, `${e}[${u}].order.before[${f}]`)), d.order?.after?.forEach((l, f) => r(l, d.id, `${e}[${u}].order.after[${f}]`));
  });
  const o = i.filter((d) => n.get(d.id) === 0), a = [];
  for (; o.length > 0; ) {
    o.sort((u, l) => t.get(u.id).index - t.get(l.id).index || u.id.localeCompare(l.id));
    const d = o.shift();
    a.push(d);
    for (const u of s.get(d.id)) {
      const l = n.get(u) - 1;
      n.set(u, l), l === 0 && o.push(t.get(u).domain);
    }
  }
  if (a.length !== i.length) {
    const d = i.find((u) => n.get(u.id) > 0).id;
    throw new Q("RC_ORDER_CYCLE", e, `ordering cycle includes "${d}".`);
  }
  return Object.freeze(a);
}
function wu(i, e) {
  const t = new Map(i.map((n) => [n.id, n.version])), s = [];
  return e.forEach((n, r) => (n.requirements ?? []).forEach((o, a) => {
    if (o.optional)
      return;
    const d = t.get(o.capability) ?? null, u = o.minimumVersion ?? 1;
    d === null ? s.push(Object.freeze({
      code: "RC_CAPABILITY_MISSING",
      path: `$.domains[${r}].requirements[${a}]`,
      domainId: n.id,
      capability: o.capability,
      requestedVersion: u,
      availableVersion: d
    })) : d < u && s.push(Object.freeze({
      code: "RC_CAPABILITY_VERSION_UNSUPPORTED",
      path: `$.domains[${r}].requirements[${a}].minimumVersion`,
      domainId: n.id,
      capability: o.capability,
      requestedVersion: u,
      availableVersion: d
    }));
  })), Object.freeze({ compatible: s.length === 0, rejections: Object.freeze(s) });
}
function vu(i, e = "$") {
  const t = rt(i, e);
  Zn(t.apiVersion, `${e}.apiVersion`);
  const s = qt(t.id, `${e}.id`);
  if (!Array.isArray(t.domains) || t.domains.length === 0)
    throw new Q("RC_VALUE_INVALID", `${e}.domains`, "expected a non-empty array.");
  if (t.optionalDomainFailurePolicy !== void 0 && t.optionalDomainFailurePolicy !== "disable-domain" && t.optionalDomainFailurePolicy !== "fail-composition")
    throw new Q("RC_VALUE_INVALID", `${e}.optionalDomainFailurePolicy`, "unsupported policy.");
  const n = t.domains.map((u, l) => gu(u, `${e}.domains[${l}]`)), r = bu(n, `${e}.domains`);
  yu(r, `${e}.domains`);
  const o = mu(t.backend, `${e}.backend`), d = wu(o.capabilities, r).rejections[0];
  if (d)
    throw new Q(d.code, d.path, `backend cannot satisfy "${d.capability}".`);
  return Object.freeze({
    apiVersion: zt,
    id: s,
    backend: o,
    domains: r,
    optionalDomainFailurePolicy: t.optionalDomainFailurePolicy ?? "disable-domain"
  });
}
const Iu = "forgeng.render:webgpu-2d", bi = "forgeng.render:2d", qa = "forgeng.render:webgpu-composition", Su = "forgeng.backend:webgpu-composition";
function Sn(i, e = 4, t) {
  if (e <= 0 || !Number.isFinite(e))
    throw new E("R2D_WEBGPU_VALIDATION", "$.maxPixelRatio", "expected a positive finite maximum DPR.");
  if (t && "clientWidth" in t) {
    const s = t;
    if (s.clientWidth > 0 && Math.abs(s.clientWidth - i.logicalWidth) > 1)
      throw new E("R2D_WEBGPU_VALIDATION", "$.surface.logicalWidth", "canvas CSS width and logicalWidth disagree.");
    if (s.clientHeight > 0 && Math.abs(s.clientHeight - i.logicalHeight) > 1)
      throw new E("R2D_WEBGPU_VALIDATION", "$.surface.logicalHeight", "canvas CSS height and logicalHeight disagree.");
  }
  try {
    return ha({
      revision: i.revision,
      logicalSize: [i.logicalWidth, i.logicalHeight],
      physicalSize: [i.physicalWidth, i.physicalHeight],
      pixelRatio: i.pixelRatio,
      maximumPixelRatio: e,
      safeArea: i.safeArea,
      visible: i.visible
    });
  } catch (s) {
    throw new E(
      "R2D_WEBGPU_VALIDATION",
      "$.surface",
      s instanceof Error ? s.message : String(s)
    );
  }
}
class Eu {
  constructor(e, t = 4, s) {
    c(this, "maximumPixelRatio");
    c(this, "canvas");
    c(this, "pending", null);
    c(this, "current");
    c(this, "resizeEvents", 0);
    c(this, "resizeApplications", 0);
    c(this, "coalescedResizes", 0);
    this.maximumPixelRatio = t, this.canvas = s, this.current = Sn(e, t, s);
  }
  queue(e) {
    this.resizeEvents += 1, this.pending && (this.coalescedResizes += 1), this.pending = e;
  }
  consume() {
    if (!this.pending) return this.current;
    const e = Sn(this.pending, this.maximumPixelRatio, this.canvas);
    return this.pending = null, (e.revision !== this.current.revision || e.visible !== this.current.visible || e.logicalSize[0] !== this.current.logicalSize[0] || e.logicalSize[1] !== this.current.logicalSize[1] || e.physicalSize[0] !== this.current.physicalSize[0] || e.physicalSize[1] !== this.current.physicalSize[1]) && (this.current = e, this.resizeApplications += 1), this.current;
  }
  get() {
    return this.current;
  }
  inspect() {
    return Object.freeze({
      snapshotVersion: 1,
      revision: this.current.revision,
      resizeEvents: this.resizeEvents,
      resizeApplications: this.resizeApplications,
      coalescedResizes: this.coalescedResizes,
      visible: this.current.visible,
      logicalSize: this.current.logicalSize,
      physicalSize: this.current.physicalSize,
      pixelRatio: this.current.pixelRatio,
      maximumPixelRatio: this.current.maximumPixelRatio
    });
  }
}
class Au {
  constructor(e) {
    c(this, "metadata");
    c(this, "commands", []);
    c(this, "aborted", !1);
    this.metadata = e;
  }
  add(e) {
    if (this.aborted) throw new E("R2D_WEBGPU_STATE", "$.frame", "cannot add to an aborted frame.");
    this.commands.push(Object.freeze({ ...e }));
  }
  abort() {
    this.aborted = !0;
  }
}
function xu(i) {
  const e = i;
  return e.error?.message ?? e.message ?? "uncaptured WebGPU error";
}
class _u {
  constructor(e, t, s) {
    c(this, "generation");
    c(this, "options");
    c(this, "state", "created");
    c(this, "device", null);
    c(this, "context", null);
    c(this, "format");
    c(this, "surface");
    c(this, "active", null);
    c(this, "submittedFrames", 0);
    c(this, "presentedFrames", 0);
    c(this, "uncapturedErrors", 0);
    c(this, "commands", 0);
    c(this, "lastSubmittedFrame", 0);
    c(this, "lastPresentedFrame", 0);
    c(this, "interop", null);
    c(this, "onUncapturedError", (e) => {
      this.uncapturedErrors += 1, e.preventDefault?.(), xu(e);
    });
    this.generation = e, this.options = t, this.surface = this.resolveSurface(s), this.format = t.format ?? "bgra8unorm";
  }
  async initialize() {
    if (this.state === "ready") return;
    const e = this.options.gpu ?? (typeof navigator > "u" ? void 0 : navigator.gpu);
    if (!e) throw new E("R2D_WEBGPU_CAPABILITY_MISSING", "$.navigator.gpu", "WebGPU is unavailable.");
    const t = this.options.canvas.getContext("webgpu");
    if (!t) throw new E("R2D_WEBGPU_CAPABILITY_MISSING", "$.canvas", "WebGPU canvas context is unavailable.");
    const s = await e.requestAdapter({ powerPreference: this.options.powerPreference });
    if (!s) throw new E("R2D_WEBGPU_CAPABILITY_MISSING", "$.adapter", "WebGPU adapter request returned null.");
    const n = await s.requestDevice();
    this.device = n, this.context = t, this.format = this.options.format ?? e.getPreferredCanvasFormat(), n.addEventListener?.("uncapturederror", this.onUncapturedError), n.lost.then((o) => {
      this.state !== "destroyed" && this.options.onDeviceLost?.(`${o.reason}:${o.message}`);
    }), this.configure(), this.options.onDeviceReady?.(this.generation, n, this.format);
    const r = Object.freeze({
      apiVersion: 1,
      generation: this.generation,
      device: n,
      format: this.format,
      getFrame: (o) => {
        if (!this.active || this.active.access.frame !== o)
          throw new E("R2D_WEBGPU_STALE_FRAME", "$.interop.frame", `frame ${o} is not active.`);
        return this.active.access;
      }
    });
    this.interop = Object.freeze({
      apiVersion: 1,
      generation: this.generation,
      capabilities: Object.freeze([
        Object.freeze({ id: bi, version: 1 }),
        Object.freeze({ id: qa, version: 1 }),
        Object.freeze({ id: Ss, version: 1 })
      ]),
      requestExtension: (o, a) => o === Ua && a === 1 ? r : void 0
    }), this.state = "ready";
  }
  resize(e) {
    this.assertReady("resize"), this.surface = this.resolveSurface(e), this.configure();
  }
  beginFrame(e) {
    if (this.assertReady("begin frame"), e.backendGeneration !== this.generation)
      throw new E("R2D_WEBGPU_STALE_GENERATION", "$.frame.backendGeneration", "frame belongs to another backend generation.");
    if (this.active) throw new E("R2D_WEBGPU_STATE", "$.frame", "a compositor frame is already active.");
    const t = new Au(e), s = this.device.createCommandEncoder({ label: `ForgeNG composition frame ${e.frame}` }), n = this.context.getCurrentTexture().createView({ label: `ForgeNG surface frame ${e.frame}` }), r = Object.freeze({
      apiVersion: 1,
      frame: e.frame,
      generation: this.generation,
      device: this.device,
      encoder: s,
      colorView: n,
      format: this.format,
      physicalWidth: this.surface.physicalWidth,
      physicalHeight: this.surface.physicalHeight
    });
    return this.active = { transaction: t, access: r }, t;
  }
  submit(e) {
    if (this.assertReady("submit"), !this.active || e !== this.active.transaction || this.active.transaction.aborted)
      throw new E("R2D_WEBGPU_STALE_FRAME", "$.submit", "transaction is not the active compositor frame.");
    const t = this.active;
    this.active = null, this.device.queue.submit([t.access.encoder.finish()]), this.submittedFrames += 1, this.lastSubmittedFrame = e.metadata.frame, this.commands += t.transaction.commands.length;
  }
  present() {
    if (this.assertReady("present"), this.lastSubmittedFrame <= this.lastPresentedFrame)
      throw new E("R2D_WEBGPU_STATE", "$.present", "no newly submitted frame is available for presentation.");
    this.presentedFrames += 1, this.lastPresentedFrame = this.lastSubmittedFrame;
  }
  getInterop() {
    return this.interop ?? void 0;
  }
  destroy() {
    this.state !== "destroyed" && (this.active?.transaction.abort(), this.active = null, this.device?.removeEventListener?.("uncapturederror", this.onUncapturedError), this.context?.unconfigure(), this.device?.destroy(), this.device = null, this.context = null, this.interop = null, this.state = "destroyed");
  }
  inspect() {
    return Object.freeze({
      snapshotVersion: 1,
      generation: this.generation,
      state: this.state,
      submittedFrames: this.submittedFrames,
      presentedFrames: this.presentedFrames,
      uncapturedErrors: this.uncapturedErrors,
      commands: this.commands
    });
  }
  configure() {
    !this.device || !this.context || (this.options.canvas.width = Math.max(1, this.surface.physicalWidth), this.options.canvas.height = Math.max(1, this.surface.physicalHeight), this.context.configure({
      device: this.device,
      format: this.format,
      alphaMode: this.options.alphaMode ?? "premultiplied"
    }));
  }
  resolveSurface(e) {
    const t = Sn(
      e,
      this.options.maximumPixelRatio ?? 4,
      this.options.canvas
    );
    return Object.freeze({
      ...e,
      physicalWidth: t.physicalSize[0],
      physicalHeight: t.physicalSize[1],
      pixelRatio: t.pixelRatio,
      ...e.safeArea === void 0 ? {} : { safeArea: e.safeArea }
    });
  }
  assertReady(e) {
    if (this.state !== "ready") throw new E("R2D_WEBGPU_STATE", "$.backend", `cannot ${e} while backend is ${this.state}.`);
  }
}
function $u(i, e) {
  const t = [];
  return Object.freeze({
    apiVersion: zt,
    id: e,
    capabilities: Object.freeze([
      Object.freeze({ id: bi, version: 1 }),
      Object.freeze({ id: qa, version: 1 }),
      Object.freeze({ id: Ss, version: 1 })
    ]),
    create: (s) => {
      const n = new _u(s.generation, i, s.surface);
      return t.push(n), n;
    },
    getInstances: () => Object.freeze([...t])
  });
}
function zu(i) {
  return $u(i, Su);
}
const Ou = `struct Camera2d {
    clip_x: vec4f,
    clip_y: vec4f,
}

struct Sprite2dInstance {
    basis: vec4f,
    translation_size: vec4f,
    uv_rect: vec4f,
    tint: vec4f,
    trim: vec4f,
    pivot_flip: vec4f,
    nine_slice: vec4f,
    source_flags: vec4f,
}

struct Material2d {
    tint_multiplier: vec4f,
    custom_0: vec4f,
    custom_1: vec4f,
    custom_2: vec4f,
}

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) tint: vec4f,
}

@group(0) @binding(0) var<uniform> camera: Camera2d;
@group(0) @binding(1) var<storage, read> instances: array<Sprite2dInstance>;
@group(0) @binding(2) var sprite_texture: texture_2d<f32>;
@group(0) @binding(3) var sprite_sampler: sampler;
@group(0) @binding(4) var<uniform> material: Material2d;

const QUAD: array<vec2f, 6> = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
);

fn nine_position(instance: Sprite2dInstance, vertex_index: u32) -> vec2f {
    let cell = vertex_index / 6u;
    let column = cell % 3u;
    let row = cell / 3u;
    let corner = QUAD[vertex_index % 6u];
    let xs = array<f32, 4>(0.0, instance.nine_slice.x,
        max(instance.nine_slice.x, instance.translation_size.z - instance.nine_slice.z), instance.translation_size.z);
    let ys = array<f32, 4>(0.0, instance.nine_slice.y,
        max(instance.nine_slice.y, instance.translation_size.w - instance.nine_slice.w), instance.translation_size.w);
    return vec2f(mix(xs[column], xs[column + 1u], corner.x), mix(ys[row], ys[row + 1u], corner.y));
}

fn nine_uv(instance: Sprite2dInstance, vertex_index: u32) -> vec2f {
    let cell = vertex_index / 6u;
    let column = cell % 3u;
    let row = cell / 3u;
    let corner = QUAD[vertex_index % 6u];
    let xs = array<f32, 4>(0.0, instance.nine_slice.x / instance.source_flags.x,
        1.0 - instance.nine_slice.z / instance.source_flags.x, 1.0);
    let ys = array<f32, 4>(0.0, instance.nine_slice.y / instance.source_flags.y,
        1.0 - instance.nine_slice.w / instance.source_flags.y, 1.0);
    return vec2f(mix(xs[column], xs[column + 1u], corner.x), mix(ys[row], ys[row + 1u], corner.y));
}

@vertex
fn vs_sprite(@builtin(vertex_index) vertex_index: u32, @builtin(instance_index) instance_index: u32) -> VertexOutput {
    let instance = instances[instance_index];
    var source_local = QUAD[vertex_index];
    var local_pixels = (instance.trim.xy + source_local * instance.trim.zw) * instance.translation_size.zw;
    if (instance.source_flags.w > 0.5) {
        local_pixels = nine_position(instance, vertex_index);
        source_local = nine_uv(instance, vertex_index);
    }
    let pivoted = local_pixels - instance.pivot_flip.xy * instance.translation_size.zw;
    let world = instance.translation_size.xy + vec2f(
        instance.basis.x * pivoted.x + instance.basis.z * pivoted.y,
        instance.basis.y * pivoted.x + instance.basis.w * pivoted.y,
    );
    var uv_local = source_local;
    let uv_flags = u32(instance.source_flags.z + 0.5);
    let hex_steps = uv_flags / 4u;
    if (hex_steps > 0u) {
        let angle = f32(hex_steps) * 1.0471975512;
        let centered = uv_local - vec2f(0.5);
        uv_local = vec2f(cos(angle) * centered.x - sin(angle) * centered.y,
            sin(angle) * centered.x + cos(angle) * centered.y) + vec2f(0.5);
    } else if ((uv_flags & 2u) != 0u) {
        uv_local = uv_local.yx;
    }
    if (instance.pivot_flip.z < 0.0) { uv_local.x = 1.0 - uv_local.x; }
    if (instance.pivot_flip.w < 0.0) { uv_local.y = 1.0 - uv_local.y; }
    var uv = instance.uv_rect.xy + uv_local * instance.uv_rect.zw;
    if ((uv_flags & 1u) != 0u) {
        uv = instance.uv_rect.xy + vec2f((1.0 - uv_local.y) * instance.uv_rect.z, uv_local.x * instance.uv_rect.w);
    }
    let world3 = vec3f(world, 1.0);
    var output: VertexOutput;
    output.position = vec4f(dot(camera.clip_x.xyz, world3), dot(camera.clip_y.xyz, world3), 0.0, 1.0);
    output.uv = uv;
    output.tint = instance.tint * material.tint_multiplier;
    return output;
}

@fragment
fn fs_sprite(input: VertexOutput) -> @location(0) vec4f {
    return textureSample(sprite_texture, sprite_sampler, input.uv) * input.tint;
}

@fragment
fn fs_mask(input: VertexOutput) -> @location(0) vec4f {
    let sampled = textureSample(sprite_texture, sprite_sampler, input.uv);
    if (sampled.a <= 0.001) { discard; }
    return vec4f(0.0);
}
`, Du = `// Tile chunks deliberately share the public 128-byte Sprite2D instance ABI.
// A separate module keeps tile-specific GID transforms independently testable.
struct Camera2d {
    clip_x: vec4f,
    clip_y: vec4f,
}

struct Sprite2dInstance {
    basis: vec4f,
    translation_size: vec4f,
    uv_rect: vec4f,
    tint: vec4f,
    trim: vec4f,
    pivot_flip: vec4f,
    nine_slice: vec4f,
    source_flags: vec4f,
}

struct Material2d {
    tint_multiplier: vec4f,
    custom_0: vec4f,
    custom_1: vec4f,
    custom_2: vec4f,
}

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) tint: vec4f,
}

@group(0) @binding(0) var<uniform> camera: Camera2d;
@group(0) @binding(1) var<storage, read> instances: array<Sprite2dInstance>;
@group(0) @binding(2) var sprite_texture: texture_2d<f32>;
@group(0) @binding(3) var sprite_sampler: sampler;
@group(0) @binding(4) var<uniform> material: Material2d;

const QUAD: array<vec2f, 6> = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
);

@vertex
fn vs_sprite(@builtin(vertex_index) vertex_index: u32, @builtin(instance_index) instance_index: u32) -> VertexOutput {
    let instance = instances[instance_index];
    let source_local = QUAD[vertex_index];
    let local_pixels = (instance.trim.xy + source_local * instance.trim.zw) * instance.translation_size.zw;
    let pivoted = local_pixels - instance.pivot_flip.xy * instance.translation_size.zw;
    let world = instance.translation_size.xy + vec2f(
        instance.basis.x * pivoted.x + instance.basis.z * pivoted.y,
        instance.basis.y * pivoted.x + instance.basis.w * pivoted.y,
    );
    var uv_local = source_local;
    let uv_flags = u32(instance.source_flags.z + 0.5);
    let hex_steps = uv_flags / 4u;
    if (hex_steps > 0u) {
        let angle = f32(hex_steps) * 1.0471975512;
        let centered = uv_local - vec2f(0.5);
        uv_local = vec2f(cos(angle) * centered.x - sin(angle) * centered.y,
            sin(angle) * centered.x + cos(angle) * centered.y) + vec2f(0.5);
    } else if ((uv_flags & 2u) != 0u) {
        uv_local = uv_local.yx;
    }
    if (instance.pivot_flip.z < 0.0) { uv_local.x = 1.0 - uv_local.x; }
    if (instance.pivot_flip.w < 0.0) { uv_local.y = 1.0 - uv_local.y; }
    var uv = instance.uv_rect.xy + uv_local * instance.uv_rect.zw;
    if ((uv_flags & 1u) != 0u) {
        uv = instance.uv_rect.xy + vec2f((1.0 - uv_local.y) * instance.uv_rect.z, uv_local.x * instance.uv_rect.w);
    }
    let world3 = vec3f(world, 1.0);
    var output: VertexOutput;
    output.position = vec4f(dot(camera.clip_x.xyz, world3), dot(camera.clip_y.xyz, world3), 0.0, 1.0);
    output.uv = uv;
    output.tint = instance.tint * material.tint_multiplier;
    return output;
}

@fragment
fn fs_sprite(input: VertexOutput) -> @location(0) vec4f {
    return textureSample(sprite_texture, sprite_sampler, input.uv) * input.tint;
}

@fragment
fn fs_mask(input: VertexOutput) -> @location(0) vec4f {
    let sampled = textureSample(sprite_texture, sprite_sampler, input.uv);
    if (sampled.a <= 0.001) { discard; }
    return vec4f(0.0);
}
`, Cu = `struct Camera2d { clip_x: vec4f, clip_y: vec4f }
struct Sprite2dInstance {
    basis: vec4f, translation_size: vec4f, uv_rect: vec4f, tint: vec4f,
    trim: vec4f, pivot_flip: vec4f, text_data: vec4f, source_flags: vec4f,
}
struct Material2d { tint_multiplier: vec4f, custom_0: vec4f, custom_1: vec4f, custom_2: vec4f }
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) tint: vec4f,
    @location(2) text_data: vec4f,
}
@group(0) @binding(0) var<uniform> camera: Camera2d;
@group(0) @binding(1) var<storage, read> instances: array<Sprite2dInstance>;
@group(0) @binding(2) var glyph_texture: texture_2d<f32>;
@group(0) @binding(3) var glyph_sampler: sampler;
@group(0) @binding(4) var<uniform> material: Material2d;
const QUAD: array<vec2f, 6> = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
);
@vertex
fn vs_sprite(@builtin(vertex_index) vertex_index: u32, @builtin(instance_index) instance_index: u32) -> VertexOutput {
    let instance = instances[instance_index]; var local = QUAD[vertex_index];
    if (instance.pivot_flip.z < 0.0) { local.x = 1.0 - local.x; }
    if (instance.pivot_flip.w < 0.0) { local.y = 1.0 - local.y; }
    let pixels = instance.trim.xy + QUAD[vertex_index] * instance.translation_size.zw;
    let world = instance.translation_size.xy + vec2f(instance.basis.x * pixels.x + instance.basis.z * pixels.y,
        instance.basis.y * pixels.x + instance.basis.w * pixels.y);
    let world3 = vec3f(world, 1.0); var output: VertexOutput;
    output.position = vec4f(dot(camera.clip_x.xyz, world3), dot(camera.clip_y.xyz, world3), 0.0, 1.0);
    output.uv = instance.uv_rect.xy + local * instance.uv_rect.zw;
    output.tint = instance.tint * material.tint_multiplier; output.text_data = instance.text_data; return output;
}
@fragment
fn fs_sprite(input: VertexOutput) -> @location(0) vec4f {
    let sampled = textureSample(glyph_texture, glyph_sampler, input.uv); let channel = u32(input.text_data.z + 0.5); var coverage = sampled.a;
    if (channel == 1u) { coverage = sampled.b; } else if (channel == 2u) { coverage = sampled.g; }
    else if (channel == 4u) { coverage = sampled.r; } else if (channel == 8u) { coverage = sampled.a; }
    return vec4f(input.tint.rgb * coverage, input.tint.a * coverage);
}
`, Nu = `struct Camera2d { clip_x: vec4f, clip_y: vec4f }
struct Sprite2dInstance {
    basis: vec4f, translation_size: vec4f, uv_rect: vec4f, tint: vec4f,
    trim: vec4f, pivot_flip: vec4f, text_data: vec4f, source_flags: vec4f,
}
struct Material2d { tint_multiplier: vec4f, custom_0: vec4f, custom_1: vec4f, custom_2: vec4f }
struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
    @location(1) tint: vec4f,
    @location(2) text_data: vec4f,
}
@group(0) @binding(0) var<uniform> camera: Camera2d;
@group(0) @binding(1) var<storage, read> instances: array<Sprite2dInstance>;
@group(0) @binding(2) var glyph_texture: texture_2d<f32>;
@group(0) @binding(3) var glyph_sampler: sampler;
@group(0) @binding(4) var<uniform> material: Material2d;
const QUAD: array<vec2f, 6> = array<vec2f, 6>(
    vec2f(0.0, 0.0), vec2f(1.0, 0.0), vec2f(0.0, 1.0),
    vec2f(0.0, 1.0), vec2f(1.0, 0.0), vec2f(1.0, 1.0),
);
@vertex
fn vs_sprite(@builtin(vertex_index) vertex_index: u32, @builtin(instance_index) instance_index: u32) -> VertexOutput {
    let instance = instances[instance_index]; let local = QUAD[vertex_index];
    let pixels = instance.trim.xy + local * instance.translation_size.zw;
    let world = instance.translation_size.xy + vec2f(instance.basis.x * pixels.x + instance.basis.z * pixels.y,
        instance.basis.y * pixels.x + instance.basis.w * pixels.y);
    let world3 = vec3f(world, 1.0); var output: VertexOutput;
    output.position = vec4f(dot(camera.clip_x.xyz, world3), dot(camera.clip_y.xyz, world3), 0.0, 1.0);
    output.uv = instance.uv_rect.xy + local * instance.uv_rect.zw;
    output.tint = instance.tint * material.tint_multiplier; output.text_data = instance.text_data; return output;
}
fn median3(value: vec3f) -> f32 { return max(min(value.r, value.g), min(max(value.r, value.g), value.b)); }
@fragment
fn fs_sprite(input: VertexOutput) -> @location(0) vec4f {
    let sampled = textureSample(glyph_texture, glyph_sampler, input.uv); let signed_distance = median3(sampled.rgb) - 0.5;
    let dimensions = vec2f(textureDimensions(glyph_texture)); let unit_range = vec2f(input.text_data.x) / dimensions;
    let screen_texel = vec2f(1.0) / max(fwidth(input.uv), vec2f(0.000001));
    let screen_range = max(0.5 * dot(unit_range, screen_texel), 1.0);
    let coverage = clamp(screen_range * signed_distance + 0.5, 0.0, 1.0);
    return vec4f(input.tint.rgb * coverage, input.tint.a * coverage);
}
`, Gr = 4;
function ku(i) {
  const e = i.transform ?? { position: [0, 0], rotation: 0, scale: [1, 1] }, t = Math.cos(e.rotation), s = Math.sin(e.rotation);
  return Object.freeze([
    t * e.scale[0],
    s * e.scale[0],
    -s * e.scale[1],
    t * e.scale[1],
    e.position[0],
    e.position[1]
  ]);
}
function Ru(i, e) {
  const t = (d, u) => [
    i[0] * d + i[2] * u + i[4],
    i[1] * d + i[3] * u + i[5]
  ], s = [
    t(e[0], e[1]),
    t(e[0] + e[2], e[1]),
    t(e[0] + e[2], e[1] + e[3]),
    t(e[0], e[1] + e[3])
  ], n = s.map((d) => d[0]), r = s.map((d) => d[1]), o = Math.min(...n), a = Math.min(...r);
  return Object.freeze([o, a, Math.max(...n) - o, Math.max(...r) - a]);
}
function Pu(i, e) {
  if (!i) return e;
  const t = Math.max(i[0], e[0]), s = Math.max(i[1], e[1]), n = Math.min(i[0] + i[2], e[0] + e[2]), r = Math.min(i[1] + i[3], e[1] + e[3]);
  return Object.freeze([t, s, Math.max(0, n - t), Math.max(0, r - s)]);
}
function Es(i, e, t) {
  if (!i) return Object.freeze({ scissor: null, stencilMasks: Object.freeze([]) });
  const s = new Map(e.masks.map((f) => [f.id, f])), n = new Map(e.masks.map((f) => [f.entity, f])), r = new Map(t.items.filter((f) => f.kind === "mask").map((f) => [f.id, f])), o = [], a = /* @__PURE__ */ new Set();
  let d = s.get(i);
  for (; d; ) {
    if (a.has(d.id)) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.masks", "mask nesting contains a cycle.");
    a.add(d.id), o.unshift(d), d = d.parent ? n.get(d.parent.id) : void 0;
  }
  if (o.length === 0) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.mask", `mask ${i} is unavailable.`);
  let u = null;
  const l = [];
  for (const f of o) {
    if (f.inverted) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.masks.${f.id}.inverted`, "inverted masks are outside the bounded Phase 8 stencil policy.");
    const h = r.get(f.id), p = h?.transform ?? ku(f);
    if (f.kind === "scissor") {
      if (!(Math.abs(p[1]) <= 1e-7 && Math.abs(p[2]) <= 1e-7 || Math.abs(p[0]) <= 1e-7 && Math.abs(p[3]) <= 1e-7)) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.masks.${f.id}.transform.rotation`, "scissor masks must remain axis-aligned after hierarchy transforms.");
      u = Pu(u, Ru(p, f.rect));
      continue;
    }
    if (l.length >= Gr)
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.masks", `sprite-mask depth exceeds ${Gr}.`);
    const m = f.region ?? null;
    if (f.kind === "path") {
      const g = Object.freeze(f.points.map((w) => Object.freeze([
        p[0] * w[0] + p[2] * w[1] + p[4],
        p[1] * w[0] + p[3] * w[1] + p[5]
      ])));
      l.push(Object.freeze({ id: f.id, kind: "path", transform: p, size: Object.freeze([1, 1]), region: null, points: g }));
      continue;
    }
    const y = m?.[2] ?? h?.bounds[2] ?? 1, b = m?.[3] ?? h?.bounds[3] ?? 1;
    l.push(Object.freeze({
      id: f.id,
      kind: "sprite",
      assetId: f.texture,
      transform: p,
      size: Object.freeze([y, b]),
      region: m
    }));
  }
  return Object.freeze({ scissor: u, stencilMasks: Object.freeze(l) });
}
const ju = 2147483648;
function Fr(i) {
  return (i + ju >>> 0).toString(16).padStart(8, "0");
}
function Wt(i, e, t) {
  if (!Number.isInteger(i) || !Number.isInteger(e) || i < -2147483648 || i > 2147483647 || e < -2147483648 || e > 2147483647 || !Number.isSafeInteger(t) || t < 0 || t > 4294967295)
    throw new RangeError("Render2D packed sort-key components are outside their integer ranges.");
  return `${Fr(i)}${Fr(e)}${t.toString(16).padStart(8, "0")}`;
}
function Tu(i, e) {
  return i.assetIds[0] ?? (e?.sourceTarget ? `forgeng.render2d:target/${e.sourceTarget}` : void 0);
}
function Lu(i) {
  return Object.freeze({ ...i?.normalTexture ? { normalAssetId: i.normalTexture } : {}, ...i?.sourceTarget ? { sourceTargetId: i.sourceTarget } : {} });
}
function Mu(i) {
  return `${i.normalAssetId ?? ""}\0${i.sourceTargetId ?? ""}`;
}
function Vu(i, e) {
  return i.assetId === e.assetId && i.normalAssetId === e.normalAssetId;
}
function Gu(i, e) {
  const t = new Map((i?.sprites ?? []).map((s) => [s.id, s]));
  return e?.forEach((s, n) => t.set(n, s)), t;
}
const Fu = Object.freeze({
  id: "forgeng.render2d:default-sprite",
  kind: "builtin",
  builtin: "sprite",
  blendMode: "premultiplied-alpha",
  depthMode: "disabled",
  reorderSafe: !1,
  parameters: Object.freeze({})
});
function En(i) {
  return i ? i.map((e) => e.toFixed(6)).join(",") : "-";
}
function Bu(i) {
  return `${i.kind}:${i.shaderAsset ?? i.builtin ?? "sprite"}:${i.blendMode ?? "alpha"}`;
}
function Ts(i) {
  return [
    i.pipelineId,
    i.assetId,
    i.samplerId,
    i.materialId,
    i.targetId,
    En(i.scissor),
    i.stencilMasks.map((e) => e.id).join("/"),
    i.geometry,
    i.tileChunkKey ?? "",
    i.textRunKey ?? "",
    i.textKind ?? "",
    i.particleRunKey ?? "",
    Mu(i)
  ].join("\0");
}
function Uu(i, e) {
  return i ? i.pipelineId !== e.pipelineId ? "pipeline" : Vu(i, e) ? i.samplerId !== e.samplerId ? "sampler" : i.materialId !== e.materialId ? "material" : i.targetId !== e.targetId ? "target" : En(i.scissor) !== En(e.scissor) ? "scissor" : i.stencilMasks.map((t) => t.id).join("/") !== e.stencilMasks.map((t) => t.id).join("/") ? "mask" : i.geometry !== e.geometry ? "geometry" : (i.tileChunkKey ?? "") !== (e.tileChunkKey ?? "") ? "chunk" : (i.textRunKey ?? "") !== (e.textRunKey ?? "") ? "text-run" : (i.particleRunKey ?? "") !== (e.particleRunKey ?? "") ? "particle-run" : "initial" : "texture" : "initial";
}
function Wu(i) {
  return i.transform ?? Object.freeze([1, 0, 0, 1, i.bounds[0], i.bounds[1]]);
}
function Br(i, e) {
  if (!i) return Fu;
  const t = e.get(i);
  if (!t) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.materialId", `material ${i} is unavailable.`);
  return t;
}
function Yu(i, e, t = {}) {
  const s = Gu(e, t.spriteDescriptors), n = new Map((e?.materials ?? []).map((l) => [l.id, l])), r = new Map((e?.layers ?? []).map((l, f) => [l.id, l.order?.zIndex ?? f])), o = [];
  i.items.forEach((l, f) => {
    if (l.kind !== "sprite") return;
    const h = s.get(l.id), p = Tu(l, h);
    if (!p) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.items.${l.id}.assetIds`, "sprite requires a public texture asset reference.");
    const m = Br(l.materialId ?? h?.material, n), y = r.get(l.layer) ?? 0, b = e ? Es(l.maskId ?? h?.mask, e, i) : Object.freeze({ scissor: null, stencilMasks: Object.freeze([]) }), g = h?.size ?? (h?.region ? [h.region[2], h.region[3]] : [l.bounds[2], l.bounds[3]]), w = l.transform ? h?.anchor ?? [0.5, 0.5] : [0, 0], z = t.cameraSampling && t.cameraSampling !== "asset" ? t.cameraSampling : m.sampler ?? "asset", O = t.animatedFrames?.get(l.id), S = Object.freeze({
      id: l.id,
      layer: l.layer,
      order: l.order,
      layerOrder: y,
      stableIndex: f,
      sourceItemIndex: f,
      sourceSubIndex: 0,
      packedSortKey: Wt(y, l.order, f),
      assetId: p,
      materialId: m.id,
      pipelineId: Bu(m),
      blendMode: m.blendMode ?? "alpha",
      samplerId: z,
      targetId: l.targetId ?? h?.target ?? t.cameraTargetId ?? "surface",
      geometry: h?.nineSlice ? "nine-slice" : "quad",
      transform: Wu(l),
      size: Object.freeze([g[0], g[1]]),
      anchor: Object.freeze([w[0], w[1]]),
      region: h?.region ?? null,
      flipX: h?.flipX ?? !1,
      flipY: h?.flipY ?? !1,
      nineSlice: h?.nineSlice ?? null,
      scissor: b.scissor,
      stencilMasks: b.stencilMasks,
      bounds: Object.freeze([l.bounds[0], l.bounds[1], l.bounds[2], l.bounds[3]]),
      tint: Object.freeze([l.tint[0], l.tint[1], l.tint[2], l.tint[3]]),
      opacity: l.opacity,
      ...Lu(h),
      ...typeof O == "string" ? { frameName: O } : typeof O == "number" ? { frameIndex: O } : {}
    });
    o.push({ sprite: S, material: m });
  });
  for (const l of t.additionalSprites ?? []) o.push({ sprite: l, material: Br(l.materialId, n) });
  if (o.sort((l, f) => l.sprite.layerOrder - f.sprite.layerOrder || l.sprite.order - f.sprite.order || (l.sprite.sourceItemIndex ?? l.sprite.stableIndex) - (f.sprite.sourceItemIndex ?? f.sprite.stableIndex) || (l.sprite.sourceSubIndex ?? 0) - (f.sprite.sourceSubIndex ?? 0) || l.sprite.id.localeCompare(f.sprite.id)), t.reorderSafeOpaqueGroups !== !1) {
    let l = 0;
    for (; l < o.length; ) {
      let f = l + 1;
      for (; f < o.length && o[f].sprite.layerOrder === o[l].sprite.layerOrder && o[f].sprite.order === o[l].sprite.order; ) f += 1;
      const h = o.slice(l, f);
      h.length > 1 && h.every((p) => p.material.reorderSafe === !0 && p.sprite.blendMode === "opaque") && (h.sort((p, m) => Ts(p.sprite).localeCompare(Ts(m.sprite)) || p.sprite.stableIndex - m.sprite.stableIndex), o.splice(l, h.length, ...h)), l = f;
    }
  }
  const a = o.map((l, f) => Object.freeze({
    ...l.sprite,
    stableIndex: f,
    packedSortKey: Wt(l.sprite.layerOrder, l.sprite.order, f)
  })), d = [];
  for (const l of a) {
    const f = d[d.length - 1], h = f?.sprites[f.sprites.length - 1], p = Uu(h, l);
    (!f || p !== "initial") && d.push({ sprite: l, reason: p, sprites: [] }), d[d.length - 1].sprites.push(l);
  }
  const u = Object.freeze(d.map((l) => Object.freeze({
    key: Ts(l.sprite),
    assetId: l.sprite.assetId,
    materialId: l.sprite.materialId,
    pipelineId: l.sprite.pipelineId,
    blendMode: l.sprite.blendMode,
    samplerId: l.sprite.samplerId,
    targetId: l.sprite.targetId,
    geometry: l.sprite.geometry,
    scissor: l.sprite.scissor,
    stencilMasks: l.sprite.stencilMasks,
    splitReason: l.reason,
    sprites: Object.freeze(l.sprites)
  })));
  return Object.freeze({ extraction: i, sprites: Object.freeze(a), batches: u });
}
function qu(i, e) {
  const t = i.logicalViewport, s = e.logicalViewport;
  return t[0] < s[0] + s[2] && t[0] + t[2] > s[0] && t[1] < s[1] + s[3] && t[1] + t[3] > s[1];
}
function Ku(i, e, t, s, n = "clear", r) {
  const o = new Set(e.cameraIds), a = /* @__PURE__ */ new Set(["surface", ...i.renderTargets.map((h) => h.id)]), d = new Map(i.renderTargets.map((h) => [h.id, h.clearColor])), u = i.cameras.filter((h) => o.size === 0 || o.has(h.id)).map((h) => r?.get(h.id) ?? ga(h, t)).sort((h, p) => h.order - p.order || h.id.localeCompare(p.id));
  if (u.length === 0)
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.definition.cameras", "frame has no active public camera.");
  const l = /* @__PURE__ */ new Set(), f = [];
  for (const h of u) {
    if (!a.has(h.targetId))
      throw new E("R2D_WEBGPU_SCENE_INVALID", `$.cameras.${h.id}.target`, `missing target ${h.targetId}.`);
    const p = !l.has(h.targetId);
    if (!p && h.clearColor !== null)
      throw new E(
        "R2D_WEBGPU_SCENE_INVALID",
        `$.cameras.${h.id}.clearColor`,
        "only the first ordered camera for a target may clear it."
      );
    for (const b of f)
      if (b.targetId === h.targetId && qu(b.camera, h) && b.clearColor !== null && h.clearColor !== null)
        throw new E(
          "R2D_WEBGPU_SCENE_INVALID",
          `$.cameras.${h.id}.viewport`,
          "overlapping camera viewports cannot both clear the same target."
        );
    const m = e.items.filter((b) => h.layers.length === 0 || h.layers.includes(b.layer)), y = p && h.targetId === "surface" ? n : p ? "clear" : "load";
    f.push(Object.freeze({
      camera: h,
      targetId: h.targetId,
      load: y,
      clearColor: y === "clear" ? h.clearColor ?? (h.targetId === "surface" ? s : d.get(h.targetId) ?? null) : null,
      itemIds: Object.freeze(m.map((b) => b.id))
    })), l.add(h.targetId);
  }
  return Object.freeze(f);
}
function Hu(i, e) {
  const t = new Set(e);
  return Object.freeze({ ...i, items: Object.freeze(i.items.filter((s) => t.has(s.id))) });
}
function Xu(i, e, t, s, n, r, o, a = null, d = null, u = null, l = null, f = null, h = "clear", p) {
  const m = p?.() ?? 0, y = t.attachment.extract(i.frame, i.simulationTick, i.alpha), b = p?.() ?? m;
  let g = 0, w = 0;
  if (y.sceneId !== t.sceneId || y.sceneGeneration !== t.sceneGeneration)
    throw new E("R2D_WEBGPU_STALE_GENERATION", "$.extraction.sceneGeneration", "extraction belongs to a stale scene generation.");
  if (y.frame !== i.frame || y.simulationTick !== i.simulationTick || y.alpha !== i.alpha)
    throw new E("R2D_WEBGPU_STALE_FRAME", "$.extraction.frame", "extraction metadata does not match the composition frame.");
  s.syncTargets(t.definition, e);
  const z = new Map(t.definition.cameras.flatMap((k) => {
    const ne = t.attachment.getCameraSnapshot?.(k.id);
    return ne ? [[k.id, ne]] : [];
  })), O = Ku(t.definition, y, n, r, h, z);
  a?.beginFrame(i.frame);
  const S = [], v = [], I = [];
  let x = 0, R = 0, P = 0, L = 0, H = 0, Ie = 0;
  const Z = /* @__PURE__ */ new Set(), G = new Map(t.definition.tilemaps.map((k) => [
    k.id,
    t.attachment.getTilemapPatches?.(k.id) ?? Object.freeze({ snapshotVersion: 1, tilemapId: k.id, revision: 0, patches: Object.freeze([]) })
  ])), ee = new Map(t.definition.texts.map((k) => [
    k.id,
    t.attachment.getTextContent?.(k.id) ?? Object.freeze({ snapshotVersion: 1, textId: k.id, revision: 0, text: k.text })
  ])), me = new Map(t.definition.animations.flatMap((k) => {
    const ne = t.attachment.getAnimationState?.(k.id);
    return ne ? [[k.id, ne]] : [];
  })), J = /* @__PURE__ */ new Map(), X = new Map(t.definition.sprites.map((k) => [k.id, k]));
  for (const k of y.items) if (k.kind === "sprite" && !X.has(k.id)) {
    const ne = t.attachment.getSpriteDescriptor?.(k.id);
    ne && X.set(k.id, ne);
  }
  for (const k of X.values()) {
    const ne = t.attachment.getAnimatedFrame?.(k.id);
    ne != null && J.set(k.id, ne);
  }
  for (const [k, ne] of u?.frames(me) ?? []) J.set(k, ne);
  const pt = t.attachment.getParticleSimulation?.() ?? Object.freeze({ snapshotVersion: 1, simulationTick: i.simulationTick, emitters: Object.freeze([]), particles: Object.freeze([]) });
  let Xt = [...me.values()].filter((k) => k.active).length, at = 0, _e = 0;
  const Ne = /* @__PURE__ */ new Set();
  for (let k = 0; k < O.length; k++) {
    const ne = p?.() ?? 0, ie = O[k], Ci = f?.prepareCamera(k, ie.camera, y) ?? Object.freeze({ visibleLights: 0, shadowSegments: 0 }), Ni = Hu(y, ie.itemIds), Jt = a?.plan(ie.camera, Ni, o, G) ?? null, Qt = d?.plan(Ni, o, ee, { targetId: ie.targetId, sampling: ie.camera.sampling }) ?? null, Nt = l?.plan(Ni, pt, ie.targetId) ?? null, kt = Yu(Ni, t.definition, {
      cameraTargetId: ie.targetId,
      cameraSampling: ie.camera.sampling,
      additionalSprites: Object.freeze([...Jt?.sprites ?? [], ...Qt?.sprites ?? [], ...Nt?.sprites ?? []]),
      animatedFrames: J,
      spriteDescriptors: X
    }), sd = p?.() ?? ne;
    p && (g += (sd - ne) * 1e3);
    const Sr = p?.() ?? 0, Er = s.encodeCamera(
      e,
      k,
      ie.camera,
      kt.sprites,
      kt.batches,
      ie.load,
      ie.clearColor,
      o,
      f
    ), nd = p?.() ?? Sr;
    p && (w += (nd - Sr) * 1e3), x += Er, R += Jt?.sprites.filter((gt) => gt.tileChunkKey).length ?? 0, P += Qt?.textCount ?? 0, L += Qt?.glyphCount ?? 0, at += Nt?.particleCount ?? 0, _e += Nt?.emitterCount ?? 0, H += Ci.visibleLights, Ie += Ci.shadowSegments;
    for (const gt of Nt?.activeRunKeys ?? []) Ne.add(gt);
    for (const gt of Jt?.visibleChunkKeys ?? []) Z.add(gt);
    S.push(...kt.sprites), v.push(...kt.batches), I.push(Object.freeze({
      id: ie.camera.id,
      order: ie.camera.order,
      space: ie.camera.space,
      scaleMode: ie.camera.scaleMode,
      pixelSnap: ie.camera.pixelSnap,
      sampling: ie.camera.sampling,
      target: ie.targetId,
      load: ie.load,
      logicalViewport: ie.camera.logicalViewport,
      physicalViewport: ie.camera.physicalViewport,
      logicalContentRect: ie.camera.logicalContentRect,
      scale: ie.camera.scale,
      spriteCount: kt.sprites.length,
      batchCount: kt.batches.length,
      drawCount: Er,
      tileCount: Jt?.sprites.filter((gt) => gt.tileChunkKey).length ?? 0,
      visibleTileChunks: Jt?.visibleChunkKeys.length ?? 0,
      textCount: Qt?.textCount ?? 0,
      glyphCount: Qt?.glyphCount ?? 0,
      particleCount: Nt?.particleCount ?? 0,
      particleEmitters: Nt?.emitterCount ?? 0,
      visibleLights: Ci.visibleLights,
      shadowSegments: Ci.shadowSegments
    }));
  }
  const Se = p?.() ?? 0, mt = s.encodeAdvancedEffects(e, f);
  x += mt;
  const Ge = p?.() ?? Se;
  p && (w += (Ge - Se) * 1e3);
  const Os = new Set(a?.retainedChunkKeys() ?? []);
  s.syncTileChunkBuffers(Os);
  const Oi = new Set(d?.retainedRunKeys() ?? []);
  s.syncTextRunBuffers(Oi), s.syncParticleRunBuffers(Ne);
  const Di = Object.freeze({
    extraction: y,
    sprites: Object.freeze(S),
    batches: Object.freeze(v)
  }), F = Object.freeze([...new Set(S.map((k) => k.assetId))]);
  return Object.freeze({
    planned: Di,
    draws: x,
    timings: Object.freeze({
      extractionMicros: p ? (b - m) * 1e3 : null,
      planningMicros: p ? g : null,
      encodingMicros: p ? w : null
    }),
    snapshot: Object.freeze({
      snapshotVersion: 1,
      frame: i.frame,
      backendGeneration: i.backendGeneration,
      sceneId: t.sceneId,
      sceneGeneration: t.sceneGeneration,
      visible: !0,
      cameraCount: I.length,
      cameras: Object.freeze(I),
      spriteCount: S.length,
      batchCount: v.length,
      drawCount: x,
      target: I[0]?.target ?? "surface",
      load: I[0]?.load ?? "clear",
      store: "store",
      assetIds: F,
      tileCount: R,
      visibleTileChunks: Z.size,
      retainedTileChunks: Os.size,
      textCount: P,
      glyphCount: L,
      retainedTextRuns: Oi.size,
      animationCount: Xt,
      particleCount: at,
      particleEmitters: _e,
      retainedParticleRuns: Ne.size,
      visibleLights: H,
      shadowSegments: Ie,
      effectPasses: mt,
      advancedFallbacks: f?.inspect().fallbacks ?? Object.freeze([])
    })
  });
}
function Ju(i, e) {
  return Object.freeze({
    snapshotVersion: 1,
    frame: i.frame,
    backendGeneration: i.backendGeneration,
    sceneId: e.sceneId,
    sceneGeneration: e.sceneGeneration,
    visible: !1,
    cameraCount: 0,
    cameras: Object.freeze([]),
    spriteCount: 0,
    batchCount: 0,
    drawCount: 0,
    target: "surface",
    load: "load",
    store: "store",
    assetIds: Object.freeze([]),
    tileCount: 0,
    visibleTileChunks: 0,
    retainedTileChunks: 0,
    textCount: 0,
    glyphCount: 0,
    retainedTextRuns: 0,
    animationCount: 0,
    particleCount: 0,
    particleEmitters: 0,
    retainedParticleRuns: 0,
    visibleLights: 0,
    shadowSegments: 0,
    effectPasses: 0,
    advancedFallbacks: Object.freeze([])
  });
}
function Qu(i, e, t, s) {
  const n = i !== "off", r = n ? s.instanceUploads + s.tileChunkUploads + s.textRunUploads + s.particleRunUploads : 0, o = n ? s.instanceReuses + s.tileChunkReuses + s.textRunReuses + s.particleRunReuses : 0, a = n ? s.instanceDirtyBytes + s.tileChunkDirtyBytes + s.textRunDirtyBytes + s.particleRunDirtyBytes : 0;
  return Object.freeze({
    items: Object.freeze({ visible: n ? e : 0, culled: 0, submitted: n ? e : 0 }),
    uploads: Object.freeze({ operations: r, reuses: o, dirtyBytes: a }),
    caches: Object.freeze({
      textLayoutBuilds: n ? s.textLayoutBuilds : 0,
      textLayoutHits: n ? s.textLayoutCacheHits : 0,
      textLayoutEvictions: n ? s.textLayoutEvictions : 0
    }),
    pools: Object.freeze({
      instanceCapacity: n ? s.instanceBufferCapacity : 0,
      instanceGrowths: n ? s.instanceBufferGrowths : 0,
      instanceWraps: n ? s.instanceBufferWraps : 0,
      tileChunkBuffers: n ? s.tileChunkBuffers : 0,
      glyphRunBuffers: n ? s.textRunBuffers : 0,
      particleRunBuffers: n ? s.particleRunBuffers : 0
    }),
    content: Object.freeze({
      tiles: n ? t?.tileCount ?? 0 : 0,
      visibleTileChunks: n ? t?.visibleTileChunks ?? 0 : 0,
      retainedTileChunks: n ? t?.retainedTileChunks ?? 0 : 0,
      texts: n ? t?.textCount ?? 0 : 0,
      glyphs: n ? t?.glyphCount ?? 0 : 0,
      retainedGlyphRuns: n ? t?.retainedTextRuns ?? 0 : 0,
      particles: n ? t?.particleCount ?? 0 : 0,
      particleEmitters: n ? t?.particleEmitters ?? 0 : 0,
      retainedParticleRuns: n ? t?.retainedParticleRuns ?? 0 : 0,
      visibleLights: n ? t?.visibleLights ?? 0 : 0,
      shadowSegments: n ? t?.shadowSegments ?? 0 : 0,
      effectPasses: n ? t?.effectPasses ?? 0 : 0
    })
  });
}
const Zu = Object.freeze([
  "initial",
  "pipeline",
  "texture",
  "sampler",
  "material",
  "target",
  "scissor",
  "mask",
  "geometry",
  "chunk",
  "text-run",
  "particle-run"
]);
function Ri() {
  return Object.fromEntries(Zu.map((i) => [i, 0]));
}
class ef {
  constructor(e = {}) {
    c(this, "inspection");
    c(this, "frame", 0);
    c(this, "visible", 0);
    c(this, "batches", 0);
    c(this, "draws", 0);
    c(this, "pipelineChanges", 0);
    c(this, "splitReasons", Ri());
    c(this, "layers", Object.freeze([]));
    c(this, "timings", Object.freeze({ extractionMicros: null, planningMicros: null, encodingMicros: null, contributionMicros: null }));
    c(this, "failures", /* @__PURE__ */ new Map());
    c(this, "failureOverflow", 0);
    this.inspection = _a(e);
  }
  record(e, t, s, n) {
    this.frame = e, this.visible = t.sprites.length, this.batches = t.batches.length, this.draws = s, Object.assign(this.splitReasons, Ri());
    for (const a of t.batches) this.splitReasons[a.splitReason] += 1;
    this.pipelineChanges = t.batches.reduce((a, d, u) => a + (u === 0 || t.batches[u - 1].pipelineId !== d.pipelineId ? 1 : 0), 0);
    const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (const a of t.sprites) r.set(a.layer, (r.get(a.layer) ?? 0) + 1);
    for (const a of t.batches) {
      const d = a.sprites[0]?.layer;
      d && o.set(d, (o.get(d) ?? 0) + 1);
    }
    this.layers = Object.freeze([.../* @__PURE__ */ new Set([...r.keys(), ...o.keys()])].sort().map((a, d) => Object.freeze({ id: a, order: d, visibleItems: r.get(a) ?? 0, batches: o.get(a) ?? 0 }))), this.timings = n ?? Object.freeze({ extractionMicros: null, planningMicros: null, encodingMicros: null, contributionMicros: null });
  }
  recordFailure(e, t) {
    const s = `${e}\0${t}`, n = this.failures.get(s);
    n ? (n.count += 1, n.lastFrame = this.frame) : this.failures.size < 64 ? this.failures.set(s, { code: e, path: t, count: 1, lastFrame: this.frame }) : this.failureOverflow += 1;
  }
  destroy() {
    this.frame = 0, this.visible = 0, this.batches = 0, this.draws = 0, this.pipelineChanges = 0, Object.assign(this.splitReasons, Ri()), this.layers = Object.freeze([]), this.failures.clear(), this.failureOverflow = 0, this.timings = Object.freeze({ extractionMicros: null, planningMicros: null, encodingMicros: null, contributionMicros: null });
  }
  snapshot() {
    return Object.freeze({
      snapshotVersion: 1,
      frame: this.frame,
      visibleItems: this.visible,
      culledItems: 0,
      drawItems: this.visible,
      logicalBatches: this.batches,
      textureBindings: this.batches === 0 ? 0 : 1,
      triangles: this.visible * 2,
      extractionMicros: this.timings.extractionMicros,
      contributionMicros: this.timings.contributionMicros,
      counters: Object.freeze({ draws: this.draws, pipelineChanges: this.pipelineChanges, bindGroupChanges: this.batches })
    });
  }
  inspect(e) {
    const { profile: t, limits: s } = this.inspection, n = [], r = (S, v, I, x = v.length) => {
      const R = Math.min(v.length, I);
      return x > R && n.push(Object.freeze({ section: S, total: x, retained: R, dropped: x - R, overflowed: !0 })), Object.freeze(v.slice(0, I));
    }, o = t === "diagnostic" || t === "lab", a = e.frame, d = r("cameras", (a?.cameras ?? []).map((S) => Object.freeze({
      id: S.id,
      order: S.order,
      space: S.space,
      targetId: S.target,
      logicalViewport: S.logicalViewport,
      physicalViewport: S.physicalViewport,
      pixelSnap: S.pixelSnap,
      visibleItems: S.spriteCount,
      batches: S.batchCount,
      draws: S.drawCount
    })), s.cameras), u = new Map(e.definition?.layers.map((S, v) => [S.id, S.order?.zIndex ?? v]) ?? []), l = r("layers", this.layers.map((S) => Object.freeze({ ...S, order: u.get(S.id) ?? S.order })), s.layers), f = r("targets", e.resources.renderTargets.map((S) => Object.freeze({
      id: S.id,
      width: S.width,
      height: S.height,
      format: String(S.format),
      sampleCount: S.sampleCount,
      trackedBytes: S.width * S.height * S.sampleCount * (S.format === "rgba16float" ? 8 : 4)
    })), s.targets), h = e.definition?.features.map((S) => S.id) ?? [], p = [
      e.resources.advancedFeatures > 0 ? "forgeng.render2d:advanced" : null,
      e.resources.visibleLights > 0 ? "forgeng.render2d:lighting" : null,
      e.resources.pathMaskBuffers > 0 ? "forgeng.render2d:path-masks" : null,
      e.resources.effectPasses > 0 ? "forgeng.render2d:effects" : null
    ].filter((S) => S !== null), m = r("features", [.../* @__PURE__ */ new Set([...h, ...p])].sort().map((S) => Object.freeze({
      id: S,
      enabled: !0,
      status: e.resources.advancedFallbacks > 0 ? "fallback" : "active",
      resources: S.endsWith(":lighting") ? e.resources.lightingBuffers + e.resources.lightingPipelines : S.endsWith(":path-masks") ? e.resources.pathMaskBuffers : S.endsWith(":effects") ? e.resources.effectPasses : e.resources.advancedFeatures
    })), s.features), y = r("assets", (a?.assetIds ?? []).map((S) => Object.freeze({ id: S, state: "retained" })), s.assets), b = r("failures", [...this.failures.values()].sort((S, v) => S.code.localeCompare(v.code) || S.path.localeCompare(v.path)).map((S) => Object.freeze({ ...S })), s.failures, this.failures.size + this.failureOverflow), g = t === "off" ? { observedFrames: 0, retainedFrames: 0, droppedFrames: 0 } : e.history;
    g.droppedFrames > 0 && n.push(Object.freeze({
      section: "history",
      total: g.observedFrames,
      retained: g.retainedFrames,
      dropped: g.droppedFrames,
      overflowed: !0
    }));
    const w = Ri();
    t !== "off" && Object.assign(w, this.splitReasons);
    const z = t === "off" ? 0 : e.resources.trackedBufferBytes, O = t === "off" ? 0 : e.resources.trackedTextureBytes;
    return Object.freeze({
      snapshotVersion: 1,
      profile: t,
      domainId: e.domainId,
      phase: e.phase,
      backendGeneration: e.backendGeneration,
      sceneId: e.sceneId,
      sceneGeneration: e.sceneGeneration,
      frame: a?.frame ?? this.frame,
      capabilities: Object.freeze(t === "off" ? [] : [...e.capabilities].sort()),
      cameras: d,
      layers: l,
      targets: f,
      features: t === "off" ? Object.freeze([]) : m,
      sampling: Object.freeze({ mode: t === "off" ? "disabled" : "every-frame", ...g }),
      batches: Object.freeze({
        logicalBatches: t === "off" ? 0 : this.batches,
        drawCalls: t === "off" ? 0 : this.draws,
        pipelineChanges: t === "off" ? 0 : this.pipelineChanges,
        bindGroupChanges: t === "off" ? 0 : this.batches,
        splitReasons: Object.freeze(w)
      }),
      assets: y,
      workload: Qu(t, this.visible, a, e.resources),
      resources: Object.freeze({
        owner: "render-domain",
        sceneId: e.sceneId,
        domainId: e.domainId,
        cpuBytes: 0,
        gpuBufferBytes: z,
        gpuTextureBytes: O,
        trackedBytes: z + O,
        buffers: t === "off" ? 0 : e.resources.buffers,
        textures: t === "off" ? 0 : e.resources.textures,
        pipelines: t === "off" ? 0 : e.resources.pipelines,
        leases: t === "off" ? 0 : e.resources.leases,
        handles: t === "off" ? 0 : e.resources.handles,
        pendingRetirements: t === "off" ? 0 : e.resources.pendingRetirements
      }),
      timings: Object.freeze({
        extractionMicros: o ? this.timings.extractionMicros : null,
        planningMicros: o ? this.timings.planningMicros : null,
        encodingMicros: o ? this.timings.encodingMicros : null,
        contributionMicros: o ? this.timings.contributionMicros : null,
        gpuMicros: null,
        gpuTiming: "unsupported"
      }),
      failures: b,
      truncation: Object.freeze(n),
      destroyed: e.resources.destroyed
    });
  }
}
const Ur = 65536, Wr = Object.freeze([
  Object.freeze({ group: 0, binding: 0, role: "camera-uniform" }),
  Object.freeze({ group: 0, binding: 1, role: "instance-storage-read" }),
  Object.freeze({ group: 0, binding: 2, role: "sprite-texture" }),
  Object.freeze({ group: 0, binding: 3, role: "sprite-sampler" }),
  Object.freeze({ group: 0, binding: 4, role: "material-uniform" })
]);
function Zt(i, e) {
  throw new E("R2D_WEBGPU_SCENE_INVALID", i, e);
}
function tf(i, e) {
  return new RegExp(`@group\\s*\\(\\s*0\\s*\\)\\s*@binding\\s*\\(\\s*${e}\\s*\\)|@binding\\s*\\(\\s*${e}\\s*\\)\\s*@group\\s*\\(\\s*0\\s*\\)`).test(i);
}
function sf(i, e) {
  const t = `$.materials.${i.id}`;
  (i.kind !== "custom" || !i.shaderAbi || !i.schema) && Zt(t, "expected a schema-backed custom material."), Ia(i.schema, `${t}.schema`), (typeof e != "string" || e.length === 0 || e.length > Ur || e.includes("\0")) && Zt(`${t}.shaderSource`, `WGSL source must contain 1 through ${Ur} characters.`), (/enable\s+(?:chromium_experimental|f16)\b/i.test(e) || /var\s*<\s*storage\s*,\s*read_write\s*>/i.test(e) || /texture_storage_/i.test(e) || /@group\s*\(\s*[1-9][0-9]*\s*\)/.test(e) || /@binding\s*\(\s*(?:[5-9]|[1-9][0-9]+)\s*\)/.test(e)) && Zt(`${t}.shaderSource`, "WGSL requests bindings, writable storage, or experimental features outside the sprite ABI.");
  for (const r of Wr)
    tf(e, r.binding) || Zt(`${t}.shaderSource`, `missing reserved group(0) binding(${r.binding}).`);
  const s = i.shaderAbi.vertexEntry, n = i.shaderAbi.fragmentEntry;
  return (!new RegExp(`@vertex[\\s\\S]{0,256}\\bfn\\s+${s}\\b`).test(e) || !new RegExp(`@fragment[\\s\\S]{0,256}\\bfn\\s+${n}\\b`).test(e)) && Zt(`${t}.shaderSource`, "declared vertex/fragment entry points are missing or use the wrong stage."), Object.freeze({
    snapshotVersion: 1,
    materialId: i.id,
    sourceBytes: e.length,
    vertexEntry: s,
    fragmentEntry: n,
    bindings: Wr
  });
}
const ci = Object.freeze({
  version: 1,
  bytes: 64,
  alignment: 16,
  bindingAlignment: 256,
  scalarCapacity: 16,
  tintMultiplierOffset: 0,
  customParameterOffset: 16
});
function nf(i) {
  return typeof i == "number" ? [i] : i;
}
function rf(i) {
  const e = new Float32Array(ci.scalarCapacity);
  e.set([1, 1, 1, 1]);
  const t = i.parameters ?? {}, s = i.schema ? i.schema.uniforms.flatMap((r) => t[r.name] === void 0 ? [] : [[r.name, t[r.name]]]) : Object.entries(t).sort(([r], [o]) => r.localeCompare(o));
  let n = 4;
  for (const [r, o] of s) {
    const a = nf(o);
    if ((r === "color" || r === "tint" || r === "tintMultiplier") && a.length === 4) {
      e.set(a, 0);
      continue;
    }
    if (n + a.length > e.length)
      throw new E("R2D_WEBGPU_SCENE_INVALID", `$.materials.${i.id}.parameters`, "material parameters exceed the 64-byte ABI.");
    e.set(a, n), n += a.length;
  }
  return e;
}
function of(i, e, t, s) {
  if (i.kind === "builtin") return Object.freeze({
    source: e,
    vertexEntry: "vs_sprite",
    fragmentEntry: "fs_sprite",
    fallback: !1
  });
  const n = i.shaderAsset ? t[i.shaderAsset] : void 0, r = i.shaderAbi;
  let o = !1;
  if (n !== void 0 && r !== void 0)
    if (i.schema)
      try {
        sf(i, n), o = !0;
      } catch {
        o = !1;
      }
    else
      o = n.includes(`fn ${r.vertexEntry}`) && n.includes(`fn ${r.fragmentEntry}`) && !/@group\s*\(\s*[1-9][0-9]*\s*\)/.test(n);
  if (o) return Object.freeze({ source: n, vertexEntry: r.vertexEntry, fragmentEntry: r.fragmentEntry, fallback: !1 });
  if (s === "builtin-sprite") return Object.freeze({
    source: e,
    vertexEntry: "vs_sprite",
    fragmentEntry: "fs_sprite",
    fallback: !0
  });
  throw new E(
    "R2D_WEBGPU_SCENE_INVALID",
    `$.materials.${i.id}`,
    "custom material source/entry points violate the Render2D shader ABI and fallback is disabled."
  );
}
const Ls = 1, Ms = 2, af = 15;
function Ka(i) {
  switch (i) {
    case "opaque":
      return;
    case "alpha":
      return {
        color: { srcFactor: "src-alpha", dstFactor: "one-minus-src-alpha", operation: "add" },
        alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" }
      };
    case "add":
      return {
        color: { srcFactor: "one", dstFactor: "one", operation: "add" },
        alpha: { srcFactor: "one", dstFactor: "one", operation: "add" }
      };
    case "multiply":
      return {
        color: { srcFactor: "dst", dstFactor: "one-minus-src-alpha", operation: "add" },
        alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" }
      };
    case "screen":
      return {
        color: { srcFactor: "one", dstFactor: "one-minus-src", operation: "add" },
        alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" }
      };
    default:
      return {
        color: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" },
        alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha", operation: "add" }
      };
  }
}
function cf(i, e, t, s, n) {
  s("shader-module");
  const r = i.createShaderModule({ label: "ForgeNG Sprite2D material pipeline", code: t });
  s("bind-group-layout");
  const o = i.createBindGroupLayout({
    label: "ForgeNG Sprite2D bind group layout",
    entries: [
      { binding: 0, visibility: Ls, buffer: { type: "uniform", minBindingSize: 32 } },
      { binding: 1, visibility: Ls, buffer: { type: "read-only-storage", minBindingSize: 128 } },
      { binding: 2, visibility: Ms, texture: { sampleType: "float", viewDimension: "2d" } },
      { binding: 3, visibility: Ms, sampler: { type: "filtering" } },
      { binding: 4, visibility: Ls | Ms, buffer: { type: "uniform", minBindingSize: 64 } }
    ]
  });
  s("pipeline-layout");
  const a = i.createPipelineLayout({ label: "ForgeNG Sprite2D pipeline layout", bindGroupLayouts: [o] }), d = n.stencilMode ?? "none", u = d === "push" || d === "pop", l = {
    compare: d === "ignore" ? "always" : "equal",
    passOp: d === "push" ? "increment-clamp" : d === "pop" ? "decrement-clamp" : "keep"
  };
  s("pipeline");
  const f = i.createRenderPipeline({
    label: `ForgeNG Sprite2D ${n.blendMode}/${d} pipeline`,
    layout: a,
    vertex: { module: r, entryPoint: n.vertexEntry ?? "vs_sprite" },
    fragment: {
      module: r,
      entryPoint: n.fragmentEntry ?? (u ? "fs_mask" : "fs_sprite"),
      targets: [{
        format: e,
        blend: u ? void 0 : Ka(n.blendMode),
        writeMask: u ? 0 : af
      }]
    },
    primitive: { topology: "triangle-list", frontFace: "ccw", cullMode: "none" },
    ...d === "none" ? {} : {
      depthStencil: {
        format: "depth24plus-stencil8",
        depthWriteEnabled: !1,
        depthCompare: "always",
        stencilFront: l,
        stencilBack: l,
        stencilReadMask: 255,
        stencilWriteMask: u ? 255 : 0
      }
    },
    multisample: { count: n.sampleCount ?? 1 }
  });
  return Object.freeze({ shader: r, bindGroupLayout: o, pipelineLayout: a, pipeline: f });
}
const df = Object.freeze({
  version: fn,
  stride: 128,
  alignment: 16,
  fields: Object.freeze({
    basis: Object.freeze({ offset: 0, size: 16 }),
    translationSize: Object.freeze({ offset: 16, size: 16 }),
    uvRect: Object.freeze({ offset: 32, size: 16 }),
    tint: Object.freeze({ offset: 48, size: 16 }),
    trim: Object.freeze({ offset: 64, size: 16 }),
    pivotFlip: Object.freeze({ offset: 80, size: 16 }),
    nineSlice: Object.freeze({ offset: 96, size: 16 }),
    sourceFlags: Object.freeze({ offset: 112, size: 16 })
  })
}), lf = 32, ke = df.stride / Float32Array.BYTES_PER_ELEMENT;
function uf(i, e) {
  if (i.region && e)
    return Object.freeze({
      uv: [
        i.region[0] / e.width,
        i.region[1] / e.height,
        i.region[2] / e.width,
        i.region[3] / e.height
      ],
      sourceWidth: i.region[2],
      sourceHeight: i.region[3],
      spriteSourceX: 0,
      spriteSourceY: 0,
      width: i.region[2],
      height: i.region[3],
      rotated: !1
    });
  const t = e?.kind === "sprite/atlas-webgpu" ? i.frameName === void 0 ? e.frames[i.frameIndex ?? 0] : e.frames.find((s) => s.name === i.frameName) : void 0;
  return t || Object.freeze({
    uv: [0, 0, 1, 1],
    sourceWidth: e?.width ?? i.size[0],
    sourceHeight: e?.height ?? i.size[1],
    spriteSourceX: 0,
    spriteSourceY: 0,
    width: e?.width ?? i.size[0],
    height: e?.height ?? i.size[1],
    rotated: !1
  });
}
function ff(i) {
  return i === "premultiplied-alpha" || i === "add" || i === "screen";
}
class pi {
  constructor() {
    c(this, "storage", new Float32Array(ke));
  }
  pack(e, t) {
    const s = Math.max(ke, e.length * ke);
    this.storage.length < s && (this.storage = new Float32Array(Yr(s)));
    for (let n = 0; n < e.length; n++)
      this.packSprite(this.storage, n * ke, e[n], t.get(e[n].assetId));
    return this.storage.subarray(0, e.length * ke);
  }
  packMask(e, t) {
    const s = Object.freeze({
      id: e.id,
      layer: "",
      order: 0,
      layerOrder: 0,
      stableIndex: 0,
      packedSortKey: "",
      assetId: e.assetId,
      materialId: "",
      pipelineId: "",
      blendMode: "premultiplied-alpha",
      samplerId: "nearest",
      targetId: "surface",
      geometry: "quad",
      transform: e.transform,
      size: e.size,
      anchor: [0, 0],
      region: e.region,
      flipX: !1,
      flipY: !1,
      nineSlice: null,
      scissor: null,
      stencilMasks: [],
      bounds: [0, 0, e.size[0], e.size[1]],
      tint: [1, 1, 1, 1],
      opacity: 1
    });
    return this.packSprite(this.storage, 0, s, t), this.storage.subarray(0, ke);
  }
  packMasks(e, t) {
    const s = Math.max(ke, e.length * ke);
    this.storage.length < s && (this.storage = new Float32Array(Yr(s)));
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = Object.freeze({
        id: r.id,
        layer: "",
        order: 0,
        layerOrder: 0,
        stableIndex: n,
        packedSortKey: "",
        assetId: r.assetId,
        materialId: "",
        pipelineId: "",
        blendMode: "premultiplied-alpha",
        samplerId: "nearest",
        targetId: "surface",
        geometry: "quad",
        transform: r.transform,
        size: r.size,
        anchor: [0, 0],
        region: r.region,
        flipX: !1,
        flipY: !1,
        nineSlice: null,
        scissor: null,
        stencilMasks: [],
        bounds: [0, 0, r.size[0], r.size[1]],
        tint: [1, 1, 1, 1],
        opacity: 1
      });
      this.packSprite(this.storage, n * ke, o, t.get(r.assetId));
    }
    return this.storage.subarray(0, e.length * ke);
  }
  getCapacityFloats() {
    return this.storage.length;
  }
  packSprite(e, t, s, n) {
    const r = uf(s, n), o = Math.max(1, r.sourceWidth), a = Math.max(1, r.sourceHeight), d = s.tint[3] * s.opacity, u = ff(s.blendMode) ? d : 1;
    e.set([s.transform[0], s.transform[1], s.transform[2], s.transform[3]], t), e.set([s.transform[4], s.transform[5], s.size[0], s.size[1]], t + 4), e.set(r.uv, t + 8), e.set([s.tint[0] * u, s.tint[1] * u, s.tint[2] * u, d], t + 12), e.set([
      r.spriteSourceX / o,
      r.spriteSourceY / a,
      r.width / o,
      r.height / a
    ], t + 16), e.set([s.anchor[0], s.anchor[1], s.flipX ? -1 : 1, s.flipY ? -1 : 1], t + 20), e.set(s.textKind ? [s.textDistanceRange ?? 0, 0, s.textChannel ?? 0, 0] : s.nineSlice ?? [0, 0, 0, 0], t + 24);
    const l = (r.rotated ? 1 : 0) + (s.diagonalFlip ? 2 : 0) + (s.hexRotation ?? 0) / 60 * 4;
    e.set([o, a, l, s.geometry === "nine-slice" ? 1 : 0], t + 28);
  }
}
function Yr(i) {
  let e = 1;
  for (; e < i; ) e *= 2;
  return e;
}
const hf = 8, pf = 128;
function Vs(i) {
  let e = 1;
  for (; e < i; ) e *= 2;
  return e;
}
class er {
  constructor(e, t, s) {
    c(this, "device");
    c(this, "hooks");
    c(this, "buffer");
    c(this, "capacity");
    c(this, "retired", []);
    c(this, "destroyed", !1);
    c(this, "retained", null);
    c(this, "cursor", 0);
    c(this, "growths", 0);
    c(this, "wraps", 0);
    c(this, "uploads", 0);
    c(this, "reusedWrites", 0);
    c(this, "dirtyBytes", 0);
    this.device = e, this.hooks = s, this.capacity = Vs(Math.max(64, t)), this.buffer = this.create(this.capacity);
  }
  write(e) {
    return this.writeRetained(e).buffer;
  }
  writeRetained(e) {
    this.assertAlive();
    const t = Math.max(64, e.byteLength);
    t > this.capacity && this.grow(t);
    let s = 0, n = e.length;
    if (this.retained && this.retained.length === e.length) {
      for (; s < e.length && this.retained[s] === e[s]; ) s += 1;
      if (s === e.length)
        return this.reusedWrites += 1, { buffer: this.buffer, uploadedBytes: 0 };
      for (; n > s && this.retained[n - 1] === e[n - 1]; ) n -= 1;
    }
    const r = e.subarray(s, n);
    return r.byteLength > 0 && (this.device.queue.writeBuffer(this.buffer, s * Float32Array.BYTES_PER_ELEMENT, r), this.uploads += 1, this.dirtyBytes += r.byteLength), (!this.retained || this.retained.length !== e.length) && (this.retained = new Float32Array(e.length)), this.retained.set(e), { buffer: this.buffer, uploadedBytes: r.byteLength };
  }
  beginStreamingFrame() {
    this.assertAlive(), this.cursor > 0 && (this.wraps += 1), this.cursor = 0;
  }
  writeStreaming(e, t = 256) {
    this.assertAlive();
    const s = Math.ceil(this.cursor / t) * t, n = s + Math.max(64, e.byteLength);
    return n > this.capacity && this.grow(n), e.byteLength > 0 && (this.device.queue.writeBuffer(this.buffer, s, e), this.uploads += 1, this.dirtyBytes += e.byteLength), this.cursor = n, { buffer: this.buffer, offset: s };
  }
  current() {
    return this.assertAlive(), this.buffer;
  }
  getCapacity() {
    return this.capacity;
  }
  getPendingRetirements() {
    return this.retired.length;
  }
  inspect() {
    return Object.freeze({
      capacity: this.capacity,
      growths: this.growths,
      wraps: this.wraps,
      uploads: this.uploads,
      reusedWrites: this.reusedWrites,
      dirtyBytes: this.dirtyBytes
    });
  }
  retireSubmitted() {
    if (this.retired.length === 0 || this.destroyed) return;
    const e = this.retired;
    this.retired = [], this.hooks.retirementChanged(0), this.device.queue.onSubmittedWorkDone().then(() => {
      for (const t of e)
        t.destroy(), this.hooks.released();
    });
  }
  destroyNow() {
    if (!this.destroyed) {
      this.destroyed = !0, this.buffer.destroy(), this.hooks.released();
      for (const e of this.retired)
        e.destroy(), this.hooks.released();
      this.retired = [], this.hooks.retirementChanged(0);
    }
  }
  grow(e) {
    const t = this.create(Vs(e));
    this.retired.push(this.buffer), this.hooks.retirementChanged(this.retired.length), this.buffer = t, this.capacity = Vs(e), this.retained = null, this.cursor = 0, this.growths += 1;
  }
  create(e) {
    const t = this.device.createBuffer({
      label: `ForgeNG Sprite2D instances ${e}B`,
      size: e,
      usage: pf | hf
    });
    return this.hooks.acquired(), t;
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Render2dBufferArena is destroyed.");
  }
}
const mf = 2, gf = 4;
class yf {
  constructor(e, t) {
    c(this, "nearestSampler");
    c(this, "linearSampler");
    c(this, "fallbackTexture");
    c(this, "fallbackView");
    c(this, "destroyed", !1);
    c(this, "release");
    this.nearestSampler = e.createSampler({
      label: "ForgeNG Sprite2D nearest clamp sampler",
      minFilter: "nearest",
      magFilter: "nearest",
      mipmapFilter: "nearest",
      addressModeU: "clamp-to-edge",
      addressModeV: "clamp-to-edge"
    }), this.linearSampler = e.createSampler({
      label: "ForgeNG Sprite2D linear clamp sampler",
      minFilter: "linear",
      magFilter: "linear",
      mipmapFilter: "linear",
      addressModeU: "clamp-to-edge",
      addressModeV: "clamp-to-edge"
    }), this.fallbackTexture = e.createTexture({
      label: "ForgeNG Sprite2D phase-5 white atlas",
      size: { width: 1, height: 1, depthOrArrayLayers: 1 },
      format: "rgba8unorm",
      usage: gf | mf
    }), t.textureAcquired(), this.fallbackView = this.fallbackTexture.createView({ label: "ForgeNG Sprite2D phase-5 atlas view" }), e.queue.writeTexture(
      { texture: this.fallbackTexture },
      new Uint8Array([255, 255, 255, 255]),
      {},
      { width: 1, height: 1, depthOrArrayLayers: 1 }
    ), this.release = () => t.textureReleased();
  }
  samplerFor(e, t) {
    return e === "asset" && t ? t : e === "linear" ? this.linearSampler : this.nearestSampler;
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.fallbackTexture.destroy(), this.release());
  }
}
const bf = 8, wf = 64;
class vf {
  constructor(e, t, s) {
    c(this, "device");
    c(this, "acquired");
    c(this, "released");
    c(this, "buffer");
    c(this, "capacity");
    c(this, "slots", /* @__PURE__ */ new Map());
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "retired", []);
    c(this, "destroyed", !1);
    this.device = e, this.acquired = t, this.released = s, this.capacity = ci.bindingAlignment, this.buffer = this.create(this.capacity);
  }
  sync(e) {
    this.assertAlive();
    const t = [If(), ...e], s = t.length * ci.bindingAlignment;
    s > this.capacity && this.grow(s);
    const n = /* @__PURE__ */ new Set();
    for (let r = 0; r < t.length; r++) {
      const o = t[r], a = rf(o), d = r * ci.bindingAlignment;
      n.add(o.id), this.slots.set(o.id, d);
      const u = this.values.get(o.id);
      (!u || !Sf(u, a)) && this.device.queue.writeBuffer(this.buffer, d, a), this.values.set(o.id, a);
    }
    for (const r of [...this.slots.keys()]) n.has(r) || (this.slots.delete(r), this.values.delete(r));
  }
  access(e) {
    this.assertAlive();
    const t = this.slots.get(e) ?? this.slots.get("forgeng.render2d:default-sprite");
    if (t === void 0) throw new Error("Render2D material uniforms have not been synchronized.");
    return Object.freeze({ buffer: this.buffer, offset: t, size: ci.bytes });
  }
  submitted() {
    const e = this.retired;
    this.retired = [], !(e.length === 0 || this.destroyed) && this.device.queue.onSubmittedWorkDone().then(() => {
      for (const t of e)
        t.destroy(), this.released();
    });
  }
  pendingRetirements() {
    return this.retired.length;
  }
  capacityBytes() {
    return this.destroyed ? 0 : this.capacity;
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0, this.buffer.destroy(), this.released();
      for (const e of this.retired)
        e.destroy(), this.released();
      this.retired = [], this.slots.clear(), this.values.clear();
    }
  }
  grow(e) {
    this.retired.push(this.buffer), this.capacity = Ef(e), this.buffer = this.create(this.capacity), this.values.clear();
  }
  create(e) {
    const t = this.device.createBuffer({ label: `ForgeNG Render2D material uniforms ${e}B`, size: e, usage: wf | bf });
    return this.acquired(), t;
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Render2dMaterialUniformOwner is destroyed.");
  }
}
function If() {
  return { id: "forgeng.render2d:default-sprite", kind: "builtin", builtin: "sprite", parameters: {} };
}
function Sf(i, e) {
  return i.length === e.length && i.every((t, s) => t === e[s]);
}
function Ef(i) {
  let e = 1;
  for (; e < i; ) e *= 2;
  return e;
}
const Af = 16;
class xf {
  constructor(e, t, s) {
    c(this, "device");
    c(this, "acquired");
    c(this, "released");
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "destroyed", !1);
    this.device = e, this.acquired = t, this.released = s;
  }
  access(e) {
    if (this.destroyed) throw new Error("Render2dStencilOwner is destroyed.");
    const t = `${e.width}x${e.height}:samples-${e.sampleCount}`, s = this.values.get(e.id);
    if (s?.key === t) return s.view;
    s && this.release(e.id, s);
    const n = this.device.createTexture({
      label: `ForgeNG Render2D stencil ${e.id}`,
      size: { width: e.width, height: e.height, depthOrArrayLayers: 1 },
      format: "depth24plus-stencil8",
      sampleCount: e.sampleCount,
      usage: Af
    });
    this.acquired();
    const r = Object.freeze({ key: t, texture: n, view: n.createView({ label: `ForgeNG Render2D stencil view ${e.id}` }) });
    return this.values.set(e.id, r), r.view;
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const [e, t] of [...this.values]) this.release(e, t);
    }
  }
  release(e, t) {
    this.values.get(e) === t && (this.values.delete(e), t.texture.destroy(), this.released());
  }
}
const _f = 4, $f = 16;
function zf(i, e, t) {
  return i.size ? [Math.max(1, Math.round(i.size[0])), Math.max(1, Math.round(i.size[1]))] : [Math.max(1, Math.round(e * i.scale)), Math.max(1, Math.round(t * i.scale))];
}
class Of {
  constructor(e, t) {
    c(this, "device");
    c(this, "hooks");
    c(this, "targets", /* @__PURE__ */ new Map());
    c(this, "destroyed", !1);
    this.device = e, this.hooks = t;
  }
  sync(e, t, s) {
    if (this.destroyed) throw new Error("Render2dTargetOwner is destroyed.");
    let n = !1;
    const r = new Set(e.map((o) => o.id));
    for (const [o, a] of this.targets)
      r.has(o) || (this.release(o, a), n = !0);
    for (const o of e) {
      const [a, d] = zf(o, t, s), u = o.format, l = o.sampleCount ?? 1, f = `${a}x${d}:${u}:${l}`, h = this.targets.get(o.id);
      if (h?.key === f) continue;
      h && this.release(o.id, h), n = !0;
      const p = this.device.createTexture({
        label: `ForgeNG Render2D target ${o.id}`,
        size: { width: a, height: d, depthOrArrayLayers: 1 },
        format: u,
        sampleCount: l,
        usage: $f | _f
      });
      this.hooks.acquired(), this.targets.set(o.id, Object.freeze({
        id: o.id,
        key: f,
        texture: p,
        view: p.createView({ label: `ForgeNG Render2D target view ${o.id}` }),
        format: u,
        sampleCount: l,
        width: a,
        height: d
      }));
    }
    return n;
  }
  syncAndInvalidateBindings(e, t, s, n) {
    this.sync(e, t, s) && n();
  }
  access(e, t) {
    if (e === "surface") return Object.freeze({
      id: e,
      view: t.colorView,
      format: t.format,
      sampleCount: 1,
      width: t.physicalWidth,
      height: t.physicalHeight
    });
    const s = this.targets.get(e);
    if (!s) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.camera.target", `render target ${e} is unavailable.`);
    return s;
  }
  count() {
    return this.targets.size;
  }
  sampleView(e, t, s) {
    const n = "forgeng.render2d:target/";
    if (!e.startsWith(n)) return s;
    if (!t) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.sourceTarget", "render-target sampling requires frame access.");
    return this.access(e.slice(n.length), t).view;
  }
  inspect() {
    const e = [...this.targets.values()].sort((t, s) => t.id.localeCompare(s.id)).map((t) => Object.freeze({ id: t.id, width: t.width, height: t.height, format: t.format, sampleCount: t.sampleCount }));
    return Object.freeze({ generationTargets: e.length, pixels: e.reduce((t, s) => t + s.width * s.height * s.sampleCount, 0), targets: Object.freeze(e) });
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const [e, t] of [...this.targets]) this.release(e, t);
    }
  }
  release(e, t) {
    this.targets.get(e) === t && (this.targets.delete(e), t.texture.destroy(), this.hooks.released());
  }
}
const Df = Object.freeze({ buffers: 0, capacityBytes: 0, uploads: 0, reuses: 0, dirtyBytes: 0, pendingRetirements: 0 });
function Pi(i) {
  return i ? i.inspect() : Df;
}
function Cf(i) {
  return i.filter((e) => !e.tileChunkKey && !e.textRunKey && !e.particleRunKey);
}
function Nf(i, e, t, s, n, r) {
  return e ? s : i === "bitmap" ? n : i === "msdf" ? r : t;
}
function kf(i, e) {
  return i ? "tilemap" : e ? `${e}-text` : "sprite";
}
function Rf(i, e, t, s, n) {
  const r = i.sprites[0], o = r.tileChunkKey ? e.get(r.tileChunkKey) : void 0;
  if (o) return { buffer: o.buffer, indexes: o.indexes, bindingKey: `tile:${o.bufferKey}:${i.key}` };
  const a = r.textRunKey ? t.get(r.textRunKey) : void 0;
  if (a) return { buffer: a.buffer, indexes: a.indexes, bindingKey: `text:${a.bufferKey}:${i.key}` };
  const d = r.particleRunKey ? s.get(r.particleRunKey) : void 0;
  return d ? { buffer: d.buffer, indexes: d.indexes, bindingKey: `particle:${d.bufferKey}:${i.key}` } : n;
}
function Pf() {
  return { id: "forgeng.render2d:default-sprite", kind: "builtin", builtin: "sprite", blendMode: "premultiplied-alpha", parameters: {} };
}
function qr() {
  return {
    key: "default",
    assetId: "",
    materialId: "forgeng.render2d:default-sprite",
    pipelineId: "builtin:sprite:premultiplied-alpha",
    blendMode: "premultiplied-alpha",
    samplerId: "nearest",
    targetId: "surface",
    geometry: "quad",
    scissor: null,
    stencilMasks: [],
    splitReason: "initial",
    sprites: []
  };
}
function jf(i) {
  const e = /* @__PURE__ */ new Map();
  for (const t of i) for (const s of t.stencilMasks) e.set(s.id, s);
  return [...e.values()];
}
function Tf(i) {
  return i.some((e) => e.stencilMasks.length > 0);
}
function Lf(i, e) {
  let t = 0;
  for (; t < i.length && t < e.length && i[t].id === e[t].id; ) t += 1;
  return t;
}
function Mf(i) {
  const e = [];
  let t = 0;
  for (const s of i) {
    if (s.sprites.length === 0) continue;
    let n = e[e.length - 1];
    (!n || n.targetId !== s.targetId) && (n = { targetId: s.targetId, batches: [], firstInstances: [] }, e.push(n)), n.batches.push(s), n.firstInstances.push(t), t += s.sprites.length;
  }
  return e;
}
class Vf {
  constructor(e, t) {
    c(this, "device");
    c(this, "hooks");
    c(this, "arenas", /* @__PURE__ */ new Map());
    c(this, "packers", /* @__PURE__ */ new Map());
    this.device = e, this.hooks = t;
  }
  write(e, t, s, n) {
    const r = `${e}\0${t}`;
    let o = this.arenas.get(r), a = this.packers.get(r);
    return o || (o = new er(this.device, 128, this.hooks), this.arenas.set(r, o)), a || (a = new pi(), this.packers.set(r, a)), Object.freeze({
      buffer: o.writeRetained(a.pack(s, n)).buffer,
      indexes: new Map(s.map((d, u) => [d, u])),
      bufferKey: r
    });
  }
  writeRuns(e, t, s, n) {
    const r = /* @__PURE__ */ new Map();
    for (const o of [...new Set(t.flatMap((a) => a.textRunKey ? [a.textRunKey] : []))]) {
      const a = this.write(e, o, t.filter((d) => d.textRunKey === o), s);
      r.set(o, a), n(a.bufferKey, a.buffer);
    }
    return r;
  }
  sync(e, t) {
    for (const [s, n] of [...this.arenas]) {
      const r = s.indexOf("\0"), o = r < 0 ? s : s.slice(r + 1);
      e.has(o) || (n.destroyNow(), this.arenas.delete(s), this.packers.delete(s), t(s));
    }
  }
  submitted() {
    for (const e of this.arenas.values()) e.retireSubmitted();
  }
  destroy() {
    for (const e of this.arenas.values()) e.destroyNow();
    this.arenas.clear(), this.packers.clear();
  }
  inspect() {
    const e = [...this.arenas.values()].map((t) => t.inspect());
    return Object.freeze({
      buffers: e.length,
      capacityBytes: e.reduce((t, s) => t + s.capacity, 0),
      uploads: e.reduce((t, s) => t + s.uploads, 0),
      reuses: e.reduce((t, s) => t + s.reusedWrites, 0),
      dirtyBytes: e.reduce((t, s) => t + s.dirtyBytes, 0),
      pendingRetirements: [...this.arenas.values()].reduce((t, s) => t + s.getPendingRetirements(), 0)
    });
  }
}
class Gf {
  constructor(e, t) {
    c(this, "device");
    c(this, "hooks");
    c(this, "arenas", /* @__PURE__ */ new Map());
    c(this, "packers", /* @__PURE__ */ new Map());
    this.device = e, this.hooks = t;
  }
  writeRuns(e, t, s, n) {
    const r = /* @__PURE__ */ new Map();
    for (const o of [...new Set(t.flatMap((a) => a.particleRunKey ? [a.particleRunKey] : []))]) {
      const a = t.filter((p) => p.particleRunKey === o), d = `${e}\0${o}`;
      let u = this.arenas.get(d), l = this.packers.get(d);
      u || (u = new er(this.device, 128, this.hooks), this.arenas.set(d, u)), l || (l = new pi(), this.packers.set(d, l));
      const f = u.writeRetained(l.pack(a, s)).buffer, h = Object.freeze({ buffer: f, indexes: new Map(a.map((p, m) => [p, m])), bufferKey: d });
      r.set(o, h), n(d, f);
    }
    return r;
  }
  sync(e, t) {
    for (const [s, n] of [...this.arenas]) {
      const r = s.indexOf("\0"), o = r < 0 ? s : s.slice(r + 1);
      e.has(o) || (n.destroyNow(), this.arenas.delete(s), this.packers.delete(s), t(s));
    }
  }
  submitted() {
    for (const e of this.arenas.values()) e.retireSubmitted();
  }
  destroy() {
    for (const e of this.arenas.values()) e.destroyNow();
    this.arenas.clear(), this.packers.clear();
  }
  inspect() {
    const e = [...this.arenas.values()].map((t) => t.inspect());
    return Object.freeze({ buffers: e.length, capacityBytes: e.reduce((t, s) => t + s.capacity, 0), uploads: e.reduce((t, s) => t + s.uploads, 0), reuses: e.reduce((t, s) => t + s.reusedWrites, 0), dirtyBytes: e.reduce((t, s) => t + s.dirtyBytes, 0), pendingRetirements: [...this.arenas.values()].reduce((t, s) => t + s.getPendingRetirements(), 0) });
  }
}
function Ff(i, e) {
  return e?.pathMasksEnabled() === !1 ? i.map((t) => Object.freeze({ ...t, stencilMasks: Object.freeze(t.stencilMasks.filter((s) => s.kind !== "path")) })) : i;
}
function Bf(i, e, t, s, n, r) {
  return i.builtin === "sprite-lit" ? e?.litPipeline(t, s, n, r) ?? null : null;
}
function Uf(i, e, t) {
  return t && i ? i.litEntries(e, t) : Object.freeze([]);
}
function Wf(i, e, t, s, n, r, o, a, d) {
  return o.kind === "path" ? i?.encodePathMask(e, t, s, n, r, o, a, d) ?? 0 : null;
}
function Yf(i, e, t) {
  return t?.encodeEffects(i, e) ?? 0;
}
function qf(i, e) {
  return i + (e?.capacityBytes() ?? 0);
}
function Kf(i, e, t, s, n) {
  return i + e.reduce((r, o) => r + o.capacity, 0) + t.reduce((r, o) => r + o.capacity, 0) + s + n;
}
function Hf(i, e) {
  return i.reduce((t, s) => t + s.width * s.height * s.sampleCount * (s.format === "rgba16float" ? 8 : 4), 0) + (e ? 4 : 0);
}
const Xf = 8, Jf = 64, Gs = 256, ji = 256;
class tr {
  constructor(e, t, s, n, r, o, a, d, u, l) {
    c(this, "generation");
    c(this, "device");
    c(this, "format");
    c(this, "shaderSource");
    c(this, "fail");
    c(this, "customShaderSources");
    c(this, "customMaterialFallback");
    c(this, "tilemapShaderSource");
    c(this, "bitmapTextShaderSource");
    c(this, "msdfTextShaderSource");
    c(this, "pipelinesByKey", /* @__PURE__ */ new Map());
    c(this, "pipelineIds", /* @__PURE__ */ new Map());
    c(this, "samplers", /* @__PURE__ */ new Map());
    c(this, "bindGroups", /* @__PURE__ */ new Map());
    c(this, "boundInstanceBuffers", /* @__PURE__ */ new Map());
    c(this, "instanceArenas", []);
    c(this, "maskArenas", []);
    c(this, "instancePackers", []);
    c(this, "maskPackers", []);
    c(this, "tileChunkArenas", /* @__PURE__ */ new Map());
    c(this, "tileChunkPackers", /* @__PURE__ */ new Map());
    c(this, "textRuns", null);
    c(this, "particleRuns", null);
    c(this, "materialsById", /* @__PURE__ */ new Map());
    c(this, "defaults", null);
    c(this, "cameraBuffer", null);
    c(this, "targets", null);
    c(this, "stencil", null);
    c(this, "materialUniforms", null);
    c(this, "syncedDefinition", null);
    c(this, "gpuResources", 0);
    c(this, "buffers", 0);
    c(this, "textures", 0);
    c(this, "targetTextures", 0);
    c(this, "pipelines", 0);
    c(this, "pendingRetirements", 0);
    c(this, "destroyed", !1);
    this.generation = e, this.device = t, this.format = s, this.shaderSource = n, this.fail = r, this.customShaderSources = o, this.customMaterialFallback = a, this.tilemapShaderSource = d, this.bitmapTextShaderSource = u, this.msdfTextShaderSource = l;
  }
  static create(e, t, s, n, r, o = {}) {
    const a = new tr(
      e,
      t,
      s,
      n,
      r,
      o.customShaderSources ?? {},
      o.customMaterialFallback ?? "reject",
      o.tilemapShaderSource ?? n,
      o.bitmapTextShaderSource ?? n,
      o.msdfTextShaderSource ?? n
    );
    try {
      return a.pipelineFor(s, 1, qr(), "none"), r("sampler"), r("fallback-texture"), a.defaults = new yf(t, {
        textureAcquired: () => {
          a.textures += 1, a.gpuResources += 2;
        },
        textureReleased: () => {
          a.textures -= 1, a.gpuResources -= 2;
        }
      }), r("camera-buffer"), a.cameraBuffer = t.createBuffer({ label: "ForgeNG Sprite2D camera uniforms", size: Gs * ji, usage: Jf | Xf }), a.buffers += 1, a.gpuResources += 1, r("instance-buffer"), a.instanceArenas.push(a.createArena()), a.textRuns = new Vf(t, {
        acquired: () => {
          a.buffers += 1, a.gpuResources += 1;
        },
        released: () => {
          a.buffers -= 1, a.gpuResources -= 1;
        },
        retirementChanged: () => a.updateRetirements()
      }), a.materialUniforms = new vf(
        t,
        () => {
          a.buffers += 1, a.gpuResources += 1;
        },
        () => {
          a.buffers -= 1, a.gpuResources -= 1;
        }
      ), a.targets = new Of(t, {
        acquired: () => {
          a.targetTextures += 1, a.textures += 1, a.gpuResources += 2;
        },
        released: () => {
          a.targetTextures -= 1, a.textures -= 1, a.gpuResources -= 2;
        }
      }), a.particleRuns = new Gf(t, {
        acquired: () => {
          a.buffers += 1, a.gpuResources += 1;
        },
        released: () => {
          a.buffers -= 1, a.gpuResources -= 1;
        },
        retirementChanged: () => a.updateRetirements()
      }), a.stencil = new xf(
        t,
        () => {
          a.textures += 1, a.gpuResources += 2;
        },
        () => {
          a.textures -= 1, a.gpuResources -= 2;
        }
      ), a;
    } catch (d) {
      throw a.destroyNow(), d;
    }
  }
  syncTargets(e, t) {
    if (this.assertAlive(t), this.targets.syncAndInvalidateBindings(e.renderTargets, t.physicalWidth, t.physicalHeight, () => this.bindGroups.clear()), this.syncedDefinition !== e) {
      this.syncedDefinition = e, this.materialsById.clear(), this.samplers.clear(), this.bindGroups.clear();
      for (const s of e.materials) this.materialsById.set(s.id, s);
      this.materialUniforms.sync(e.materials);
    }
  }
  encodeCamera(e, t, s, n, r, o, a, d, u = null) {
    if (this.assertAlive(e), t < 0 || t >= ji) throw new RangeError(`Render2D supports at most ${ji} cameras in one frame.`);
    const l = t * Gs;
    this.device.queue.writeBuffer(this.cameraBuffer, l, this.cameraUniform(s));
    const f = Cf(n), h = this.instancePacker(t).pack(f, d), p = this.instanceArena(t).writeRetained(h).buffer;
    this.rememberBuffer(`sprite:${t}`, p);
    const m = new Map(f.map((P, L) => [P, L])), y = /* @__PURE__ */ new Map();
    for (const P of [...new Set(n.flatMap((L) => L.tileChunkKey ? [L.tileChunkKey] : []))]) {
      const L = n.filter((G) => G.tileChunkKey === P), H = `${s.id}\0${P}`, Z = this.tileChunkArena(H).writeRetained(this.tileChunkPacker(H).pack(L, d)).buffer;
      this.rememberBuffer(`tile:${H}`, Z), y.set(P, { buffer: Z, indexes: new Map(L.map((G, ee) => [G, ee])), bufferKey: H });
    }
    const b = this.textRuns.writeRuns(s.id, n, d, (P, L) => this.rememberBuffer(`text:${P}`, L)), g = this.particleRuns.writeRuns(s.id, n, d, (P, L) => this.rememberBuffer(`particle:${P}`, L)), w = Ff(r, u), z = jf(w), O = z.filter((P) => P.kind === "sprite"), S = new Map(O.map((P, L) => [P.id, L]));
    let v = null;
    O.length > 0 && (v = this.maskArena(t).writeRetained(this.maskPacker(t).packMasks(O, d)).buffer, this.rememberBuffer(`mask:${t}`, v)), u?.preparePathMasks(t, z);
    const I = Mf(w);
    if (I.length === 0)
      return this.encodeEmptyPass(e, s, o, a), 0;
    let x = 0;
    const R = /* @__PURE__ */ new Set();
    for (const P of I) {
      const L = this.targets.access(P.targetId, e), H = this.targetViewport(s, L, e), Ie = Tf(P.batches), Z = !R.has(P.targetId);
      R.add(P.targetId);
      const G = e.encoder.beginRenderPass({
        label: `ForgeNG Sprite2D camera ${s.id} -> ${P.targetId}`,
        colorAttachments: [{
          view: L.view,
          loadOp: Z ? P.targetId === s.targetId ? o : "clear" : "load",
          storeOp: "store",
          clearValue: this.clearValue(P.targetId, a)
        }],
        ...Ie ? { depthStencilAttachment: {
          view: this.stencil.access(L),
          depthLoadOp: "clear",
          depthClearValue: 1,
          depthStoreOp: "discard",
          stencilLoadOp: "clear",
          stencilClearValue: 0,
          stencilStoreOp: "discard"
        } } : {}
      });
      G.setViewport(...H, 0, 1);
      let ee = [];
      for (let me = 0; me < P.batches.length; me++) {
        const J = P.batches[me], X = this.scissorRect(s, L, e, J.scissor, H);
        G.setScissorRect(...X);
        const pt = Lf(ee, J.stencilMasks);
        for (let Se = ee.length - 1; Se >= pt; Se--)
          x += this.encodeMask(G, L, t, l, ee[Se], S, v, d, "pop", Se + 1, u);
        for (let Se = pt; Se < J.stencilMasks.length; Se++)
          x += this.encodeMask(G, L, t, l, J.stencilMasks[Se], S, v, d, "push", Se, u);
        ee = J.stencilMasks, ee.length > 0 && G.setStencilReference(ee.length);
        const Xt = ee.length > 0 ? "test" : Ie ? "ignore" : "none", at = this.pipelineFor(L.format, L.sampleCount, J, Xt, u);
        G.setPipeline(at.pipeline);
        const _e = Rf(
          J,
          y,
          b,
          g,
          { buffer: p, indexes: m, bindingKey: `sprite:${t}:${J.key}` }
        ), Ne = _e.indexes.get(J.sprites[0]) ?? 0;
        G.setBindGroup(0, this.bindGroup(
          at,
          _e.bindingKey,
          l,
          _e.buffer,
          this.textureView(J.assetId, d, e),
          this.samplerFor(J.samplerId, s, d.get(J.assetId)),
          J.materialId,
          u,
          t,
          J.sprites[0]?.normalAssetId ? this.textureView(J.sprites[0].normalAssetId, d, e) : null
        )), G.draw(J.geometry === "nine-slice" ? 54 : 6, J.sprites.length, 0, Ne), x += 1;
      }
      for (let me = ee.length - 1; me >= 0; me--)
        x += this.encodeMask(G, L, t, l, ee[me], S, v, d, "pop", me + 1, u);
      G.end();
    }
    return x;
  }
  encodeMask(e, t, s, n, r, o, a, d, u, l, f) {
    const h = Wf(f, e, t, s, this.cameraBuffer, n, r, u, l);
    if (h !== null) return h;
    e.setStencilReference(l);
    const p = this.pipelineFor(t.format, t.sampleCount, qr(), u);
    return e.setPipeline(p.pipeline), e.setBindGroup(0, this.bindGroup(
      p,
      `mask:${s}:${r.id}:${u}`,
      n,
      a,
      this.textureView(r.assetId, d, null),
      this.defaults.nearestSampler,
      "forgeng.render2d:default-sprite",
      null,
      s,
      null
    )), e.draw(6, 1, 0, o.get(r.id) ?? 0), 1;
  }
  bindGroup(e, t, s, n, r, o, a, d, u, l) {
    const f = `${this.pipelineIds.get(e) ?? "pipeline"}:${s}:${t}`;
    let h = this.bindGroups.get(f);
    if (h) return h;
    const p = this.materialUniforms.access(a);
    return h = this.device.createBindGroup({ label: `ForgeNG Sprite2D bind group ${t}`, layout: e.bindGroupLayout, entries: [
      { binding: 0, resource: { buffer: this.cameraBuffer, offset: s, size: lf } },
      { binding: 1, resource: { buffer: n } },
      { binding: 2, resource: r },
      { binding: 3, resource: o },
      { binding: 4, resource: p },
      ...Uf(d, u, l)
    ] }), this.bindGroups.set(f, h), h;
  }
  pipelineFor(e, t, s, n, r = null) {
    const o = this.materialsById.get(s.materialId) ?? Pf(), a = Bf(o, r, e, t, s, n);
    if (a) return a;
    const d = s.sprites.some((y) => y.tileChunkKey !== void 0), u = s.sprites[0]?.textKind, l = Nf(u, d, this.shaderSource, this.tilemapShaderSource, this.bitmapTextShaderSource, this.msdfTextShaderSource), f = n === "push" || n === "pop" ? { source: this.shaderSource, vertexEntry: "vs_sprite", fragmentEntry: "fs_mask", fallback: !1 } : of(o, l, this.customShaderSources, this.customMaterialFallback), h = `${e}:${t}:${s.pipelineId}:${kf(d, u)}:${n}:${f.vertexEntry}:${f.fragmentEntry}:${f.fallback}`, p = this.pipelinesByKey.get(h);
    if (p) return p;
    const m = cf(this.device, e, f.source, this.fail, {
      blendMode: s.blendMode,
      sampleCount: t,
      vertexEntry: f.vertexEntry,
      fragmentEntry: f.fragmentEntry,
      stencilMode: n
    });
    return this.pipelinesByKey.set(h, m), this.pipelineIds.set(m, h), this.pipelines += 1, this.gpuResources += 4, m;
  }
  samplerFor(e, t, s) {
    const n = s?.kind === "sprite/atlas-webgpu" ? s.texture : s;
    if (e === "asset" || e === "nearest" || e === "linear") return this.defaults.samplerFor(e === "asset" ? t.sampling : e, n?.sampler);
    const r = this.samplers.get(e);
    if (r) return r;
    const o = this.syncedDefinition?.samplers.find((d) => d.id === e);
    if (!o) return this.defaults.samplerFor(t.sampling, n?.sampler);
    const a = this.device.createSampler({
      label: `ForgeNG Render2D sampler ${e}`,
      minFilter: o.minFilter,
      magFilter: o.magFilter,
      mipmapFilter: o.mipmapFilter,
      addressModeU: o.addressU,
      addressModeV: o.addressV,
      maxAnisotropy: o.maxAnisotropy
    });
    return this.samplers.set(e, a), a;
  }
  texture(e, t) {
    const s = t.get(e);
    return s?.kind === "sprite/atlas-webgpu" ? s.texture : s ?? null;
  }
  textureView(e, t, s) {
    return this.targets.sampleView(e, s, this.texture(e, t)?.view ?? this.defaults.fallbackView);
  }
  encodeAdvancedEffects(e, t) {
    return this.assertAlive(e), Yf(e, this.targets, t);
  }
  clearValue(e, t) {
    const s = this.syncedDefinition?.renderTargets.find((r) => r.id === e)?.clearColor, n = e === "surface" ? t : s ?? t;
    return { r: n?.[0] ?? 0, g: n?.[1] ?? 0, b: n?.[2] ?? 0, a: n?.[3] ?? 0 };
  }
  encodeEmptyPass(e, t, s, n) {
    const r = this.targets.access(t.targetId, e), o = this.targetViewport(t, r, e), a = e.encoder.beginRenderPass({ label: `ForgeNG Sprite2D empty camera ${t.id}`, colorAttachments: [{
      view: r.view,
      loadOp: s,
      storeOp: "store",
      clearValue: { r: n?.[0] ?? 0, g: n?.[1] ?? 0, b: n?.[2] ?? 0, a: n?.[3] ?? 0 }
    }] });
    a.setViewport(...o, 0, 1), a.setScissorRect(...o), a.end();
  }
  cameraUniform(e) {
    const t = e.worldToLogical, s = e.logicalViewport;
    return new Float32Array([
      2 * t[0] / s[2],
      2 * t[2] / s[2],
      2 * (t[4] - s[0]) / s[2] - 1,
      0,
      -2 * t[1] / s[3],
      -2 * t[3] / s[3],
      1 - 2 * (t[5] - s[1]) / s[3],
      0
    ]);
  }
  targetViewport(e, t, s) {
    const n = e.physicalViewport, r = t.width / s.physicalWidth, o = t.height / s.physicalHeight, a = Math.max(0, Math.min(t.width - 1, Math.floor(n[0] * r))), d = Math.max(0, Math.min(t.height - 1, Math.floor(n[1] * o))), u = Math.max(a + 1, Math.min(t.width, Math.ceil((n[0] + n[2]) * r))), l = Math.max(d + 1, Math.min(t.height, Math.ceil((n[1] + n[3]) * o)));
    return [a, d, u - a, l - d];
  }
  scissorRect(e, t, s, n, r) {
    if (!n) return r;
    const o = e.worldToLogical, a = [
      [n[0], n[1]],
      [n[0] + n[2], n[1]],
      [n[0], n[1] + n[3]],
      [n[0] + n[2], n[1] + n[3]]
    ].map(([b, g]) => [o[0] * b + o[2] * g + o[4], o[1] * b + o[3] * g + o[5]]), d = a.map((b) => b[0]), u = a.map((b) => b[1]), l = e.physicalViewport[2] / e.logicalViewport[2] * t.width / s.physicalWidth, f = e.physicalViewport[3] / e.logicalViewport[3] * t.height / s.physicalHeight, h = Math.max(r[0], Math.floor(r[0] + (Math.min(...d) - e.logicalViewport[0]) * l)), p = Math.max(r[1], Math.floor(r[1] + (Math.min(...u) - e.logicalViewport[1]) * f)), m = Math.min(r[0] + r[2], Math.ceil(r[0] + (Math.max(...d) - e.logicalViewport[0]) * l)), y = Math.min(r[1] + r[3], Math.ceil(r[1] + (Math.max(...u) - e.logicalViewport[1]) * f));
    return [h, p, Math.max(0, m - h), Math.max(0, y - p)];
  }
  instanceArena(e) {
    for (; this.instanceArenas.length <= e; ) this.instanceArenas.push(this.createArena());
    return this.instanceArenas[e];
  }
  maskArena(e) {
    for (; this.maskArenas.length <= e; ) this.maskArenas.push(this.createArena());
    return this.maskArenas[e];
  }
  instancePacker(e) {
    for (; this.instancePackers.length <= e; ) this.instancePackers.push(new pi());
    return this.instancePackers[e];
  }
  maskPacker(e) {
    for (; this.maskPackers.length <= e; ) this.maskPackers.push(new pi());
    return this.maskPackers[e];
  }
  tileChunkArena(e) {
    let t = this.tileChunkArenas.get(e);
    return t || (t = this.createArena(), this.tileChunkArenas.set(e, t)), t;
  }
  tileChunkPacker(e) {
    let t = this.tileChunkPackers.get(e);
    return t || (t = new pi(), this.tileChunkPackers.set(e, t)), t;
  }
  syncTileChunkBuffers(e) {
    for (const [t, s] of [...this.tileChunkArenas]) {
      const n = t.indexOf("\0"), r = n < 0 ? t : t.slice(n + 1);
      e.has(r) || (s.destroyNow(), this.tileChunkArenas.delete(t), this.tileChunkPackers.delete(t), this.boundInstanceBuffers.delete(`tile:${t}`), this.bindGroups.clear());
    }
  }
  syncTextRunBuffers(e) {
    this.textRuns.sync(e, (t) => {
      this.boundInstanceBuffers.delete(`text:${t}`), this.bindGroups.clear();
    });
  }
  syncParticleRunBuffers(e) {
    this.particleRuns.sync(e, (t) => {
      this.boundInstanceBuffers.delete(`particle:${t}`), this.bindGroups.clear();
    });
  }
  createArena() {
    return new er(this.device, 128, {
      acquired: () => {
        this.buffers += 1, this.gpuResources += 1;
      },
      released: () => {
        this.buffers -= 1, this.gpuResources -= 1;
      },
      retirementChanged: () => this.updateRetirements()
    });
  }
  rememberBuffer(e, t) {
    this.boundInstanceBuffers.get(e) !== t && (this.bindGroups.clear(), this.boundInstanceBuffers.set(e, t));
  }
  updateRetirements() {
    this.pendingRetirements = [...this.instanceArenas, ...this.maskArenas, ...this.tileChunkArenas.values()].reduce((e, t) => e + t.getPendingRetirements(), 0) + Pi(this.textRuns).pendingRetirements + Pi(this.particleRuns).pendingRetirements + (this.materialUniforms?.pendingRetirements() ?? 0);
  }
  submitted() {
    for (const e of [...this.instanceArenas, ...this.maskArenas, ...this.tileChunkArenas.values()]) e.retireSubmitted();
    this.textRuns?.submitted(), this.particleRuns?.submitted(), this.materialUniforms?.submitted(), this.updateRetirements();
  }
  async destroyQueueSafe() {
    this.destroyed || (await this.device.queue.onSubmittedWorkDone(), this.destroyNow());
  }
  destroyNow() {
    if (!this.destroyed) {
      this.destroyed = !0, this.bindGroups.clear(), this.boundInstanceBuffers.clear(), this.samplers.clear(), this.stencil?.destroy(), this.stencil = null, this.targets?.destroy(), this.targets = null, this.materialUniforms?.destroy(), this.materialUniforms = null;
      for (const e of [...this.instanceArenas, ...this.maskArenas, ...this.tileChunkArenas.values()]) e.destroyNow();
      this.instanceArenas.length = 0, this.maskArenas.length = 0, this.tileChunkArenas.clear(), this.tileChunkPackers.clear(), this.textRuns?.destroy(), this.textRuns = null, this.particleRuns?.destroy(), this.particleRuns = null, this.cameraBuffer && (this.cameraBuffer.destroy(), this.cameraBuffer = null, this.buffers -= 1, this.gpuResources -= 1), this.defaults?.destroy(), this.defaults = null, this.gpuResources -= this.pipelinesByKey.size * 4, this.pipelinesByKey.clear(), this.pipelineIds.clear(), this.pipelines = 0, this.pendingRetirements = 0;
    }
  }
  inspect() {
    const e = [...this.instanceArenas, ...this.maskArenas].map((o) => o.inspect()), t = [...this.tileChunkArenas.values()].map((o) => o.inspect()), s = Pi(this.textRuns), n = Pi(this.particleRuns), r = this.targets?.inspect() ?? { pixels: 0, targets: Object.freeze([]) };
    return Object.freeze({
      gpuResources: this.gpuResources,
      buffers: this.buffers,
      textures: this.textures,
      targetTextures: this.targetTextures,
      targetPixels: r.pixels,
      renderTargets: r.targets,
      pipelines: this.pipelines,
      pendingRetirements: this.pendingRetirements,
      trackedBufferBytes: Kf(
        qf(Gs * ji, this.materialUniforms),
        e,
        t,
        s.capacityBytes,
        n.capacityBytes
      ),
      trackedTextureBytes: Hf(r.targets, this.defaults !== null),
      instanceBufferCapacity: e.reduce((o, a) => o + a.capacity, 0),
      instanceBufferGrowths: e.reduce((o, a) => o + a.growths, 0),
      instanceBufferWraps: e.reduce((o, a) => o + a.wraps, 0),
      instanceUploads: e.reduce((o, a) => o + a.uploads, 0),
      instanceReuses: e.reduce((o, a) => o + a.reusedWrites, 0),
      instanceDirtyBytes: e.reduce((o, a) => o + a.dirtyBytes, 0),
      tileChunkBuffers: this.tileChunkArenas.size,
      tileChunkUploads: t.reduce((o, a) => o + a.uploads, 0),
      tileChunkReuses: t.reduce((o, a) => o + a.reusedWrites, 0),
      tileChunkDirtyBytes: t.reduce((o, a) => o + a.dirtyBytes, 0),
      textRunBuffers: s.buffers,
      textRunUploads: s.uploads,
      textRunReuses: s.reuses,
      textRunDirtyBytes: s.dirtyBytes,
      particleRunBuffers: n.buffers,
      particleRunUploads: n.uploads,
      particleRunReuses: n.reuses,
      particleRunDirtyBytes: n.dirtyBytes
    });
  }
  assertAlive(e) {
    if (this.destroyed) throw new Error("Render2dResourceScope is destroyed.");
    if (e.generation !== this.generation || e.device !== this.device || e.format !== this.format) throw new Error("Render2dResourceScope received stale WebGPU frame access.");
  }
}
function Kr(i, e) {
  const t = Math.abs(i % 2) === 1;
  return e === "odd" ? t : !t;
}
function di(i, e, t) {
  const s = i.tileWidth, n = i.tileHeight;
  if (i.orientation === "orthogonal") return Object.freeze([e * s, t * n]);
  if (i.orientation === "isometric") {
    const d = i.infinite ? 0 : i.height * s * 0.5;
    return Object.freeze([(e - t) * s * 0.5 + d, (e + t) * n * 0.5]);
  }
  const r = i.staggerAxis ?? "y", o = i.staggerIndex ?? "odd", a = i.orientation === "hexagonal" ? i.hexSideLength ?? 0 : 0;
  return Object.freeze(r === "y" ? [
    e * s + (Kr(t, o) ? s * 0.5 : 0),
    t * (n + a) * 0.5
  ] : [
    e * (s + a) * 0.5,
    t * n + (Kr(e, o) ? n * 0.5 : 0)
  ]);
}
function Qf(i, e, t) {
  const s = i.tileWidth, n = i.tileHeight;
  if (i.orientation === "orthogonal") return Object.freeze([e / s, t / n]);
  if (i.orientation === "isometric") {
    const a = i.infinite ? 0 : i.height * s * 0.5, d = e - a;
    return Object.freeze([t / n + d / s, t / n - d / s]);
  }
  const r = i.staggerAxis ?? "y", o = i.orientation === "hexagonal" ? i.hexSideLength ?? 0 : 0;
  return Object.freeze(r === "y" ? [e / s, t / ((n + o) * 0.5)] : [e / ((s + o) * 0.5), t / n]);
}
const Zf = 2147483648, eh = 1073741824, th = 536870912, ih = 268435456, Ha = 268435455, ct = (i, e) => Math.floor(i / e), Hr = (i) => Object.freeze({
  preloadMarginChunks: i.streaming?.preloadMarginChunks ?? 1,
  lowWaterChunks: i.streaming?.lowWaterChunks ?? 128,
  highWaterChunks: i.streaming?.highWaterChunks ?? 192,
  chunksPerSlice: i.streaming?.chunksPerSlice ?? 32
}), sh = (i, e) => i[0] < e[0] + e[2] && i[0] + i[2] > e[0] && i[1] < e[1] + e[3] && i[1] + i[3] > e[1];
function nh(i, e, t, s) {
  const n = [
    di(i, e.x, e.y),
    di(i, e.x + e.width, e.y),
    di(i, e.x, e.y + e.height),
    di(i, e.x + e.width, e.y + e.height)
  ], r = n.map((u) => u[0] + t), o = n.map((u) => u[1] + s), a = Math.min(...r), d = Math.min(...o);
  return Object.freeze([a, d, Math.max(...r) - a + i.tileWidth, Math.max(...o) - d + i.tileHeight]);
}
function rh(i) {
  const e = i.startsWith("right") ? 1 : -1, t = i.endsWith("down") ? 1 : -1;
  return (s, n) => (s.y - n.y) * t || (s.x - n.x) * e;
}
class oh {
  constructor() {
    c(this, "cache", /* @__PURE__ */ new Map());
    c(this, "catalogs", /* @__PURE__ */ new Map());
    c(this, "patchOverlays", /* @__PURE__ */ new Map());
    c(this, "patchRevisions", /* @__PURE__ */ new Map());
    c(this, "frameVisibleKeys", /* @__PURE__ */ new Set());
    c(this, "frame", -1);
    c(this, "created", 0);
    c(this, "reused", 0);
    c(this, "evicted", 0);
    c(this, "dirty", 0);
    c(this, "sourceVisited", 0);
  }
  index(e, t) {
    if (t.chunks.length === 0) return;
    const s = t.chunks[0].width, n = t.chunks[0].height;
    this.catalogs.set(`${e}:${t.id}`, new Map(t.chunks.map((r) => [
      `${ct(r.x, s)}:${ct(r.y, n)}`,
      r
    ])));
  }
  beginFrame(e) {
    if (!Number.isSafeInteger(e) || e < this.frame) throw new E("R2D_WEBGPU_STALE_FRAME", "$.tilemapFeature.frame", "tilemap frame must increase monotonically.");
    e !== this.frame && (this.frame = e, this.frameVisibleKeys.clear());
  }
  syncPatches(e) {
    for (const [t, s] of e) {
      const n = this.patchRevisions.get(t) ?? 0;
      if (s.revision === n) continue;
      if (s.revision < n) throw new E("R2D_WEBGPU_STALE_FRAME", `$.tilemaps.${t}.patchRevision`, "tilemap patch revision moved backwards.");
      const r = this.patchOverlays.get(t) ?? /* @__PURE__ */ new Map(), o = new Map(s.patches.map((d) => [`${d.layerId}:${d.x}:${d.y}`, d.gid])), a = /* @__PURE__ */ new Set();
      for (const [d, u] of r) o.get(d) !== u && a.add(d);
      for (const [d, u] of o) r.get(d) !== u && a.add(d);
      this.patchOverlays.set(t, o), this.patchRevisions.set(t, s.revision);
      for (const [d, u] of [...this.cache]) u.tilemapId === t && this.chunkChanged(u, a) && (this.cache.delete(d), this.dirty += 1);
    }
  }
  select(e, t, s, n, r, o) {
    this.frame < 0 && this.beginFrame(0);
    const a = this.candidates(e, t, s, n, r, o), d = Hr(e), u = [], l = [];
    for (const y of a) {
      const b = `${e.id}:${s.id}:${y.x}:${y.y}:${y.width}:${y.height}`;
      (sh(nh(t, y, r, o), n) ? u : l).push({ source: y, key: b });
    }
    if (u.length > d.highWaterChunks) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.tilemaps.${e.id}.streaming.highWaterChunks`, `visible chunk count ${u.length} exceeds the bounded policy.`);
    const f = [...u, ...l.slice(0, Math.max(0, Math.min(d.chunksPerSlice, d.highWaterChunks - u.length)))], h = new Set(u.map((y) => y.key)), p = [];
    for (const y of f) {
      const b = this.materialize(e, s, y.source, y.key);
      b.lastUsed = this.frame, h.has(y.key) && (this.frameVisibleKeys.add(y.key), p.push(...b.tiles.map((g) => Object.freeze({ ...g, chunkKey: y.key }))));
    }
    const m = rh(t.renderOrder);
    return p.sort((y, b) => m(y, b)), this.evictDescriptor(e, d), Object.freeze({ tiles: Object.freeze(p), visibleChunkKeys: Object.freeze([...h].sort()), tilesVisited: p.length });
  }
  retainedKeys() {
    return Object.freeze([...this.cache.keys()].sort());
  }
  inspect() {
    return Object.freeze({
      retainedChunks: this.cache.size,
      createdChunks: this.created,
      reusedChunks: this.reused,
      evictedChunks: this.evicted,
      dirtyChunks: this.dirty,
      sourceTilesVisited: this.sourceVisited,
      patchRevision: [...this.patchRevisions.values()].reduce((e, t) => e + t, 0)
    });
  }
  destroy() {
    this.cache.clear(), this.catalogs.clear(), this.patchOverlays.clear(), this.patchRevisions.clear(), this.frameVisibleKeys.clear();
  }
  candidates(e, t, s, n, r, o) {
    const a = [
      [n[0] - r, n[1] - o],
      [n[0] + n[2] - r, n[1] - o],
      [n[0] - r, n[1] + n[3] - o],
      [n[0] + n[2] - r, n[1] + n[3] - o]
    ].map((f) => Qf(t, f[0], f[1])), d = Hr(e).preloadMarginChunks, u = a.map((f) => f[0]), l = a.map((f) => f[1]);
    return s.chunks.length > 0 ? this.infiniteCandidates(e.id, s, u, l, d) : this.finiteCandidates(e, s, u, l, d);
  }
  infiniteCandidates(e, t, s, n, r) {
    const o = t.chunks[0].width, a = t.chunks[0].height, d = this.catalogs.get(`${e}:${t.id}`), u = ct(Math.floor(Math.min(...s)), o) - r, l = ct(Math.ceil(Math.max(...s)), o) + r, f = ct(Math.floor(Math.min(...n)), a) - r, h = ct(Math.ceil(Math.max(...n)), a) + r, p = [];
    for (let m = f; m <= h; m++) for (let y = u; y <= l; y++) {
      const b = d.get(`${y}:${m}`);
      b && p.push(b);
    }
    return p;
  }
  finiteCandidates(e, t, s, n, r) {
    const o = e.chunkSize?.[0] ?? 32, a = e.chunkSize?.[1] ?? 32, d = Math.max(t.x, Math.floor(Math.min(...s)) - o * r), u = Math.min(t.x + t.width - 1, Math.ceil(Math.max(...s)) + o * r), l = Math.max(t.y, Math.floor(Math.min(...n)) - a * r), f = Math.min(t.y + t.height - 1, Math.ceil(Math.max(...n)) + a * r);
    if (u < d || f < l) return Object.freeze([]);
    const h = [];
    for (let p = ct(l - t.y, a) * a + t.y; p <= f; p += a) for (let m = ct(d - t.x, o) * o + t.x; m <= u; m += o)
      h.push(Object.freeze({ x: m, y: p, width: Math.min(o, t.x + t.width - m), height: Math.min(a, t.y + t.height - p), gids: Object.freeze([]) }));
    return h;
  }
  materialize(e, t, s, n) {
    const r = this.cache.get(n);
    if (r)
      return this.reused += 1, r;
    const o = this.patchOverlays.get(e.id), a = [];
    for (let u = 0; u < s.height; u++) for (let l = 0; l < s.width; l++) {
      const f = s.x + l, h = s.y + u, p = t.chunks.length > 0 ? u * s.width + l : (h - t.y) * t.width + (f - t.x), m = t.chunks.length > 0 ? s.gids[p] ?? 0 : t.gids[p] ?? 0, y = o?.get(`${t.id}:${f}:${h}`) ?? m;
      this.sourceVisited += 1, (y & Ha) !== 0 && a.push(Object.freeze({ x: f, y: h, rawGid: y }));
    }
    const d = {
      key: n,
      tilemapId: e.id,
      layerId: t.id,
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
      tiles: Object.freeze(a),
      lastUsed: this.frame
    };
    return this.cache.set(n, d), this.created += 1, d;
  }
  evictDescriptor(e, t) {
    const s = [...this.cache.values()].filter((o) => o.key.startsWith(`${e.id}:`));
    if (s.length <= t.highWaterChunks) return;
    const n = s.filter((o) => !this.frameVisibleKeys.has(o.key)).sort((o, a) => o.lastUsed - a.lastUsed || o.key.localeCompare(a.key));
    let r = s.length;
    for (const o of n) {
      if (r <= t.lowWaterChunks) break;
      this.cache.delete(o.key), this.evicted += 1, r -= 1;
    }
  }
  chunkChanged(e, t) {
    for (const s of t) {
      const [n, r, o] = s.split(":").map(Number);
      if (n === e.layerId && r >= e.x && r < e.x + e.width && o >= e.y && o < e.y + e.height) return !0;
    }
    return !1;
  }
}
function ah(i, e) {
  const t = i >>> 0, s = (t & Ha) >>> 0;
  if (s === 0) return null;
  let n = -1;
  for (let l = e.tilesets.length - 1; l >= 0; l -= 1) if (s >= e.tilesets[l].firstGid) {
    n = l;
    break;
  }
  if (n < 0) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.tilemap.gid", `GID ${s} does not resolve to a tileset.`);
  const r = e.tilesets[n], o = s - r.firstGid;
  if (o < 0 || o >= r.tileCount || r.columns <= 0)
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.tilemap.gid", `GID ${s} is outside tileset ${r.name}.`);
  const a = (t & th) !== 0, d = (t & ih) !== 0, u = e.orientation === "hexagonal" ? (a ? 60 : 0) + (d ? 120 : 0) : 0;
  return Object.freeze({
    raw: t,
    gid: s,
    tilesetIndex: n,
    localId: o,
    flipX: (t & Zf) !== 0,
    flipY: (t & eh) !== 0,
    diagonalFlip: e.orientation !== "hexagonal" && a,
    hexRotation: u,
    region: Object.freeze([
      r.margin + o % r.columns * (r.tileWidth + r.spacing),
      r.margin + Math.floor(o / r.columns) * (r.tileHeight + r.spacing),
      r.tileWidth,
      r.tileHeight
    ])
  });
}
function ch(i) {
  if (!i || typeof i != "object") return !1;
  const e = i;
  return e.kind === "tilemap/tiled-json" && e.normalizationVersion === 1 && Array.isArray(e.layers) && Array.isArray(e.tilesets) && Number.isInteger(e.tileWidth) && Number.isInteger(e.tileHeight) && e.tileWidth > 0 && e.tileHeight > 0;
}
function Xa(i, e, t) {
  const s = (n, r = 0) => Number.isSafeInteger(n) && n >= r;
  if (t > 32) return "layer nesting exceeds 32";
  for (const n of i) {
    if (!s(n.id, 1) || e.has(n.id)) return `layer id ${n.id} is invalid or duplicated`;
    if (e.add(n.id), !Number.isFinite(n.opacity) || n.opacity < 0 || n.opacity > 1 || ![n.offsetX, n.offsetY, n.parallaxX, n.parallaxY].every(Number.isFinite)) return `layer ${n.id} presentation is invalid`;
    if (n.type === "group") {
      const d = Xa(n.layers, e, t + 1);
      if (d) return d;
      continue;
    }
    if (n.type === "objectgroup") {
      if (!Array.isArray(n.objects)) return `object layer ${n.id} is invalid`;
      continue;
    }
    if (n.type === "imagelayer") continue;
    if (n.type !== "tilelayer" || !s(n.width) || !s(n.height) || !Number.isSafeInteger(n.x) || !Number.isSafeInteger(n.y) || !Array.isArray(n.gids) || !Array.isArray(n.chunks)) return `tile layer ${n.id} metadata is invalid`;
    if (n.chunks.length === 0 && n.gids.length !== n.width * n.height) return `tile layer ${n.id} data length is invalid`;
    const r = /* @__PURE__ */ new Set();
    let o = 0, a = 0;
    for (const d of n.chunks) {
      if (!Number.isSafeInteger(d.x) || !Number.isSafeInteger(d.y) || !s(d.width, 1) || !s(d.height, 1) || !Array.isArray(d.gids) || d.gids.length !== d.width * d.height) return `tile layer ${n.id} chunk metadata is invalid`;
      if (o !== 0 && (d.width !== o || d.height !== a)) return `tile layer ${n.id} mixes chunk dimensions`;
      o = d.width, a = d.height;
      const u = `${d.x}:${d.y}`;
      if (r.has(u)) return `tile layer ${n.id} duplicates chunk ${u}`;
      r.add(u);
    }
  }
  return null;
}
function dh(i) {
  const e = (s, n = 0) => Number.isSafeInteger(s) && s >= n;
  if (!["orthogonal", "isometric", "staggered", "hexagonal"].includes(i.orientation)) return "orientation is unsupported";
  if (!["right-down", "right-up", "left-down", "left-up"].includes(i.renderOrder)) return "renderOrder is unsupported";
  if (!e(i.width) || !e(i.height)) return "map dimensions are invalid";
  if (!i.infinite && (i.width === 0 || i.height === 0)) return "finite maps require positive dimensions";
  if (!Array.isArray(i.dependencies)) return "dependency catalog is invalid";
  let t = 0;
  for (const s of i.tilesets) {
    if (!e(s.firstGid, 1) || s.firstGid <= t || !e(s.tileWidth, 1) || !e(s.tileHeight, 1) || !e(s.tileCount, 1) || !e(s.columns, 1) || !e(s.spacing) || !e(s.margin)) return `tileset ${s.name} metadata is invalid`;
    t = s.firstGid;
  }
  return Xa(i.layers, /* @__PURE__ */ new Set(), 1);
}
function lh(i, e, t) {
  if (!ch(i)) throw new E("R2D_WEBGPU_SCENE_INVALID", e, `asset ${t} is not a normalized Tiled product.`);
  const s = dh(i);
  if (s) throw new E("R2D_WEBGPU_SCENE_INVALID", e, s);
  return i;
}
const Xr = Object.freeze([1, 0, 0, 1, 0, 0]);
function uh(i) {
  const e = i[0] * i[3] - i[1] * i[2];
  if (!Number.isFinite(e) || Math.abs(e) <= Number.EPSILON)
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.tilemap.transform", "tilemap transform is singular.");
  const t = 1 / e, s = i[3] * t, n = -i[1] * t, r = -i[2] * t, o = i[0] * t;
  return Object.freeze([s, n, r, o, -(s * i[4] + r * i[5]), -(n * i[4] + o * i[5])]);
}
function fh(i, e) {
  const t = [
    Ce(i.logicalToWorld, [i.logicalViewport[0], i.logicalViewport[1]]),
    Ce(i.logicalToWorld, [i.logicalViewport[0] + i.logicalViewport[2], i.logicalViewport[1]]),
    Ce(i.logicalToWorld, [i.logicalViewport[0], i.logicalViewport[1] + i.logicalViewport[3]]),
    Ce(i.logicalToWorld, [i.logicalViewport[0] + i.logicalViewport[2], i.logicalViewport[1] + i.logicalViewport[3]])
  ], s = uh(e), n = t.map((a) => Ce(s, a)), r = n.map((a) => a[0]), o = n.map((a) => a[1]);
  return Object.freeze([Math.min(...r), Math.min(...o), Math.max(...r) - Math.min(...r), Math.max(...o) - Math.min(...o)]);
}
function hh(i) {
  const e = [];
  let t = 0, s = 0, n = 0;
  const r = (o, a) => {
    for (const d of o) {
      const u = {
        order: t++,
        visible: a.visible && d.visible,
        opacity: a.opacity * d.opacity,
        offsetX: a.offsetX + d.offsetX,
        offsetY: a.offsetY + d.offsetY,
        parallaxX: a.parallaxX * d.parallaxX,
        parallaxY: a.parallaxY * d.parallaxY
      };
      d.type === "group" ? r(d.layers, u) : d.type === "tilelayer" ? e.push({ ...u, kind: "tile", ordinal: s++, layer: d }) : d.type === "imagelayer" ? e.push({ ...u, kind: "image", ordinal: n++, layer: d }) : e.push({ ...u, kind: "object", layer: d });
    }
  };
  return r(i, { visible: !0, opacity: 1, offsetX: 0, offsetY: 0, parallaxX: 1, parallaxY: 1 }), Object.freeze(e);
}
function Jr(i, e, t) {
  return Object.freeze([
    i[0],
    i[1],
    i[2],
    i[3],
    i[0] * e + i[2] * t + i[4],
    i[1] * e + i[3] * t + i[5]
  ]);
}
function Qr(i, e, t) {
  const n = [[0, 0], [e, 0], [0, t], [e, t]].map((a) => Ce(i, a)), r = n.map((a) => a[0]), o = n.map((a) => a[1]);
  return Object.freeze([Math.min(...r), Math.min(...o), Math.max(...r) - Math.min(...r), Math.max(...o) - Math.min(...o)]);
}
function Zr(i) {
  return `${i.kind}:${i.shaderAsset ?? i.builtin ?? "sprite"}:${i.blendMode ?? "alpha"}`;
}
class ph {
  constructor(e, t) {
    c(this, "definition");
    c(this, "products");
    c(this, "flat", /* @__PURE__ */ new Map());
    c(this, "chunks", new oh());
    c(this, "lastCameraRects", /* @__PURE__ */ new Map());
    c(this, "cancelledStreams", 0);
    c(this, "emittedTiles", 0);
    c(this, "visibleChunks", 0);
    c(this, "destroyed", !1);
    this.definition = e;
    const s = /* @__PURE__ */ new Map();
    for (const n of e.tilemaps) {
      const r = lh(t.get(n.tilemap), `$.tilemaps.${n.id}.tilemap`, n.tilemap);
      if ((r.orientation === "staggered" || r.orientation === "hexagonal") && (r.staggerAxis !== "x" && r.staggerAxis !== "y" || r.staggerIndex !== "odd" && r.staggerIndex !== "even"))
        throw new E("R2D_WEBGPU_SCENE_INVALID", `$.tilemaps.${n.id}.tilemap`, "staggered/hexagonal map is missing exact axis/index metadata.");
      if (n.tileSize[0] !== r.tileWidth || n.tileSize[1] !== r.tileHeight)
        throw new E("R2D_WEBGPU_SCENE_INVALID", `$.tilemaps.${n.id}.tileSize`, "tileSize must match the decoded Tiled map grid.");
      const o = hh(r.layers);
      s.set(n.tilemap, r), this.flat.set(n.id, o);
      for (const a of o) a.kind === "tile" && this.chunks.index(n.id, a.layer);
    }
    this.products = s;
  }
  /** Starts one renderer frame so multi-camera retention is evaluated as a union. */
  beginFrame(e) {
    this.assertAlive(), this.chunks.beginFrame(e);
  }
  retainedChunkKeys() {
    return this.assertAlive(), this.chunks.retainedKeys();
  }
  plan(e, t, s, n = /* @__PURE__ */ new Map()) {
    this.assertAlive(), this.chunks.syncPatches(n);
    const r = new Map(this.definition.tilemaps.map((p) => [p.id, p])), o = new Map(this.definition.materials.map((p) => [p.id, p])), a = new Map(this.definition.layers.map((p, m) => [p.id, p.order?.zIndex ?? m])), d = [], u = /* @__PURE__ */ new Set(), l = [];
    let f = 0, h = 0;
    return t.items.forEach((p, m) => {
      if (p.kind !== "tilemap") return;
      const y = r.get(p.id);
      if (!y) return;
      const b = this.products.get(y.tilemap), g = this.flat.get(y.id), w = p.transform ?? Xr, z = fh(e, w);
      this.detectTeleport(`${e.id}:${y.id}`, z);
      const O = o.get(p.materialId ?? y.material);
      if (!O) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.tilemaps.${y.id}.material`, "tilemap material is unavailable.");
      const S = new Set(y.layerIndices ?? []), v = S.size > 0;
      for (const I of g) {
        if (I.kind === "object") {
          l.push(Object.freeze({
            tilemapId: y.id,
            layerId: I.layer.id,
            path: I.layer.path,
            visible: I.visible,
            opacity: I.opacity,
            order: I.order,
            offsetX: I.offsetX,
            offsetY: I.offsetY,
            parallaxX: I.parallaxX,
            parallaxY: I.parallaxY,
            objects: I.layer.objects
          }));
          continue;
        }
        if (!I.visible || I.opacity <= 0) continue;
        if (I.kind === "image") {
          const Z = this.imageSprites(y, I, p, m, f, e, z, s, O, a.get(p.layer) ?? 0);
          d.push(...Z), f += Z.length;
          continue;
        }
        if (v && !S.has(I.ordinal)) continue;
        const x = e.effectivePosition[0] * (1 - I.parallaxX), R = e.effectivePosition[1] * (1 - I.parallaxY), P = I.offsetX + x, L = I.offsetY + R, H = this.chunks.select(y, b, I.layer, z, P, L);
        for (const Z of H.visibleChunkKeys) u.add(Z);
        h += H.tilesVisited;
        const Ie = Es(p.maskId ?? y.mask, this.definition, t);
        for (const Z of H.tiles) {
          const G = ah(Z.rawGid, b);
          if (!G) continue;
          const ee = y.tilesetTextures?.[G.tilesetIndex] ?? b.tilesets[G.tilesetIndex]?.image?.assetId;
          if (!ee || !s.has(ee)) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.tilemaps.${y.id}.tilesetTextures[${G.tilesetIndex}]`, `missing realized texture for tileset ${G.tilesetIndex}.`);
          const me = di(b, Z.x, Z.y), J = Jr(w, me[0] + P, me[1] + L), X = Math.min(4294967295, f++);
          d.push(Object.freeze({
            id: `${y.id}/${I.layer.id}/${Z.x},${Z.y}`,
            layer: p.layer,
            order: p.order + I.order,
            layerOrder: a.get(p.layer) ?? 0,
            stableIndex: X,
            sourceItemIndex: m,
            sourceSubIndex: X,
            packedSortKey: Wt(a.get(p.layer) ?? 0, p.order + I.order, X),
            assetId: ee,
            materialId: O.id,
            pipelineId: Zr(O),
            blendMode: O.blendMode ?? "alpha",
            samplerId: e.sampling === "asset" ? O.sampler ?? "asset" : e.sampling,
            targetId: p.targetId ?? y.target ?? e.targetId,
            geometry: "quad",
            transform: J,
            size: Object.freeze([G.region[2], G.region[3]]),
            anchor: Object.freeze([0, 0]),
            region: G.region,
            flipX: G.flipX,
            flipY: G.flipY,
            diagonalFlip: G.diagonalFlip,
            hexRotation: G.hexRotation,
            nineSlice: null,
            scissor: Ie.scissor,
            stencilMasks: Ie.stencilMasks,
            bounds: Qr(J, G.region[2], G.region[3]),
            tint: p.tint,
            opacity: p.opacity * I.opacity,
            tileChunkKey: Z.chunkKey
          }));
        }
      }
    }), this.visibleChunks = u.size, this.emittedTiles += d.length, Object.freeze({
      sprites: Object.freeze(d),
      visibleChunkKeys: Object.freeze([...u].sort()),
      retainedChunkKeys: this.chunks.retainedKeys(),
      objectLayers: Object.freeze(l),
      tilesVisited: h
    });
  }
  inspect() {
    return Object.freeze({
      snapshotVersion: 1,
      ...this.chunks.inspect(),
      visibleChunks: this.visibleChunks,
      cancelledStreams: this.cancelledStreams,
      emittedTiles: this.emittedTiles,
      destroyed: this.destroyed
    });
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.chunks.destroy(), this.lastCameraRects.clear(), this.visibleChunks = 0);
  }
  imageSprites(e, t, s, n, r, o, a, d, u, l) {
    const f = e.imageLayerTextures?.[t.ordinal] ?? t.layer.image?.assetId;
    if (!f) return Object.freeze([]);
    const h = d.get(f);
    if (!h) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.tilemaps.${e.id}.imageLayerTextures[${t.ordinal}]`, "image-layer texture is unavailable.");
    const p = h.width, m = h.height, y = s.transform ?? Xr, b = o.effectivePosition[0] * (1 - t.parallaxX), g = o.effectivePosition[1] * (1 - t.parallaxY), w = t.layer.repeatX ? Math.floor((a[0] - t.offsetX - b) / p) * p : 0, z = t.layer.repeatY ? Math.floor((a[1] - t.offsetY - g) / m) * m : 0, O = t.layer.repeatX ? a[0] + a[2] + p : 1, S = t.layer.repeatY ? a[1] + a[3] + m : 1, v = [];
    let I = 0;
    for (let x = z; x < S; x += t.layer.repeatY ? m : Number.POSITIVE_INFINITY) {
      for (let R = w; R < O; R += t.layer.repeatX ? p : Number.POSITIVE_INFINITY) {
        const P = Jr(y, R + t.offsetX + b, x + t.offsetY + g), L = r + I++;
        if (v.push(Object.freeze({
          id: `${e.id}/image/${t.layer.id}/${R},${x}`,
          layer: s.layer,
          order: s.order + t.order,
          layerOrder: l,
          stableIndex: L,
          sourceItemIndex: n,
          sourceSubIndex: L,
          packedSortKey: Wt(l, s.order + t.order, L),
          assetId: f,
          materialId: u.id,
          pipelineId: Zr(u),
          blendMode: u.blendMode ?? "alpha",
          samplerId: o.sampling === "asset" ? u.sampler ?? "asset" : o.sampling,
          targetId: s.targetId ?? e.target ?? o.targetId,
          geometry: "quad",
          transform: P,
          size: Object.freeze([p, m]),
          anchor: Object.freeze([0, 0]),
          region: null,
          flipX: !1,
          flipY: !1,
          nineSlice: null,
          scissor: null,
          stencilMasks: Object.freeze([]),
          bounds: Qr(P, p, m),
          tint: s.tint,
          opacity: s.opacity * t.opacity
        })), !t.layer.repeatX) break;
      }
      if (!t.layer.repeatY) break;
    }
    return Object.freeze(v);
  }
  detectTeleport(e, t) {
    const s = this.lastCameraRects.get(e);
    if (this.lastCameraRects.set(e, t), !s) return;
    const n = Math.abs(s[0] + s[2] * 0.5 - t[0] - t[2] * 0.5), r = Math.abs(s[1] + s[3] * 0.5 - t[1] - t[3] * 0.5);
    (n > Math.max(s[2], t[2]) * 2 || r > Math.max(s[3], t[3]) * 2) && (this.cancelledStreams += 1);
  }
  assertAlive() {
    if (this.destroyed) throw new E("R2D_WEBGPU_STATE", "$.tilemapFeature", "tilemap feature is destroyed.");
  }
}
function Ja(i) {
  const e = [];
  for (let t = 0; t < i.length; ) {
    const s = i.charCodeAt(t), n = i.codePointAt(t);
    if (s >= 55296 && s <= 56319 && n === s || s >= 56320 && s <= 57343)
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text", "text contains an unpaired UTF-16 surrogate.");
    e.push({ codePoint: n, cluster: t }), t += n > 65535 ? 2 : 1;
  }
  return e;
}
function mh(i) {
  return i === 9 || i === 32 || i >= 33 && i <= 126 || i >= 160 && i <= 591;
}
function Ft(i, e) {
  for (const t of i) {
    const s = t.glyphs.find((n) => n.codePoint === e);
    if (s) return { font: t, glyph: s };
  }
}
class gh {
  constructor() {
    c(this, "apiVersion", 1);
    c(this, "id", "forgeng.render2d:basic-latin-shaper");
    c(this, "capabilities", Object.freeze({ scripts: Object.freeze(["Latin", "Latin-1 Supplement"]), bidirectional: !1, ligatures: !1, combiningMarks: !1 }));
  }
  shape(e) {
    if (e.shapingVersion !== 1 || e.direction !== "ltr") throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.shaping", "basic shaper accepts only shaping v1 left-to-right paragraphs.");
    const t = [];
    for (const s of Ja(e.text)) {
      if (!mh(s.codePoint)) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.shaping", `U+${s.codePoint.toString(16).toUpperCase()} requires an advanced shaping provider.`);
      let n = Ft(e.fonts, s.codePoint), r = s.codePoint;
      if (!(!n && e.missingGlyph === "skip")) {
        if (!n && e.missingGlyph === "replace" && (n = Ft(e.fonts, e.replacementCodePoint) ?? Ft(e.fonts, 63), r = n ? e.replacementCodePoint : s.codePoint), !n) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.missingGlyph", `no glyph or replacement is available for U+${s.codePoint.toString(16).toUpperCase()}.`);
        t.push(Object.freeze({
          cluster: s.cluster,
          codePoint: r,
          fontId: n.font.id,
          glyphId: n.glyph.glyphId,
          advance: n.glyph.advance,
          offsetX: 0,
          offsetY: 0
        }));
      }
    }
    return Object.freeze({ shapingVersion: 1, direction: "ltr", glyphs: Object.freeze(t) });
  }
}
function yh(i) {
  const e = [];
  for (const t of Ja(i.text)) {
    let s = Ft(i.fonts, t.codePoint), n = t.codePoint;
    if (!(!s && i.missingGlyph === "skip")) {
      if (!s && i.missingGlyph === "replace" && (s = Ft(i.fonts, i.replacementCodePoint) ?? Ft(i.fonts, 63), n = s ? i.replacementCodePoint : t.codePoint), !s) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.missingGlyph", `no glyph or replacement is available for U+${t.codePoint.toString(16).toUpperCase()}.`);
      e.push(Object.freeze({
        cluster: t.cluster,
        codePoint: n,
        fontId: s.font.id,
        glyphId: s.glyph.glyphId,
        advance: s.glyph.advance,
        offsetX: 0,
        offsetY: 0
      }));
    }
  }
  return Object.freeze({ shapingVersion: 1, direction: "ltr", glyphs: Object.freeze(e) });
}
function bh(i, e) {
  if (!e || e.shapingVersion !== 1 || e.direction !== "ltr" || !Array.isArray(e.glyphs) || e.glyphs.length > 65536) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.shapingResult", "shaping provider returned an invalid result envelope.");
  let t = -1;
  const s = new Set(i.fonts.map((n) => n.id));
  for (const n of e.glyphs) {
    if (!Number.isSafeInteger(n.cluster) || n.cluster < t || n.cluster < 0 || n.cluster > i.text.length || !s.has(n.fontId) || !Number.isSafeInteger(n.glyphId) || !Number.isFinite(n.advance) || !Number.isFinite(n.offsetX) || !Number.isFinite(n.offsetY))
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.shapingResult.glyphs", "shaping provider returned invalid or unordered glyph data.");
    t = n.cluster;
  }
  return Object.freeze({ shapingVersion: 1, direction: "ltr", glyphs: Object.freeze(e.glyphs.map((n) => Object.freeze({ ...n }))) });
}
function wh(i) {
  return Object.freeze(i.map((e) => Object.freeze({
    id: e.id,
    unitsPerEm: e.product.kind === "font/msdf" ? 1 : e.product.size,
    glyphs: Object.freeze([...e.glyphs.values()].map((t) => Object.freeze({ codePoint: t.id, glyphId: t.id, advance: t.xAdvance })))
  })));
}
function ir(i, e) {
  return i.product.kind === "font/msdf" ? e : e / Math.abs(i.product.size);
}
function Qa(i, e) {
  const t = Math.floor(i / e + 1) * e;
  return Math.max(e, t - i);
}
function ei(i, e) {
  let t = 0;
  for (const s of i) t += s.tab ? Qa(t, e) : s.advance;
  return t;
}
function Ti(i) {
  let e = 0, t = i.length;
  for (; e < t && i[e].whitespace; ) e += 1;
  for (; t > e && i[t - 1].whitespace; ) t -= 1;
  return i.slice(e, t);
}
function vh(i, e, t, s) {
  if (t === "none" || !Number.isFinite(e)) return [{ tokens: [...i], width: ei(i, s), paragraphEnd: !0 }];
  const n = [];
  let r = [];
  for (const a of i) {
    const d = [...r, a];
    if (r.length > 0 && ei(d, s) > e) {
      if (t === "word") {
        let l = -1;
        for (let f = r.length - 1; f >= 0; f--) if (r[f].whitespace) {
          l = f;
          break;
        }
        if (l >= 0) {
          const f = Ti(r.slice(0, l)), h = Ti(r.slice(l + 1));
          n.push({ tokens: f, width: ei(f, s), paragraphEnd: !1 }), r = [...h, a];
          continue;
        }
      }
      const u = Ti(r);
      n.push({ tokens: u, width: ei(u, s), paragraphEnd: !1 }), r = a.whitespace ? [] : [a];
    } else r = d;
  }
  const o = Ti(r);
  return n.push({ tokens: o, width: ei(o, s), paragraphEnd: !0 }), n;
}
function Ih(i, e, t, s, n, r) {
  const o = [], a = wh(n), d = e.split("	");
  let u = 0;
  for (let l = 0; l < d.length; l++) {
    const f = d[l], h = Object.freeze({
      shapingVersion: 1,
      textId: i,
      text: f,
      direction: "ltr",
      fonts: a,
      missingGlyph: s.missingGlyph ?? "replace",
      replacementCodePoint: s.replacementCodePoint ?? 65533
    }), p = s.shaping === "advanced-provider" ? r?.shape(h) : s.shaping === "none" ? yh(h) : new gh().shape(h);
    if (!p) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.shaping", "advanced-provider shaping was requested but no provider was supplied.");
    const m = bh(h, p);
    let y;
    for (const b of m.glyphs) {
      const g = n.find((x) => x.id === b.fontId), w = g.glyphs.get(b.glyphId);
      if (!w) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.shapingResult.glyphId", "provider selected a glyph outside the supplied font catalog.");
      const z = ir(g, s.fontSize), O = s.shaping === "advanced-provider" || !y?.glyph || y.font !== g ? 0 : g.kernings.get(`${y.glyph.id}:${w.id}`) ?? 0, S = b.codePoint === 32, v = (b.advance + O) * z + (s.letterSpacing ?? 0) + (S ? s.wordSpacing ?? 0 : 0), I = {
        glyph: w,
        font: g,
        codePoint: b.codePoint,
        cluster: t + u + b.cluster,
        advance: v,
        tab: !1,
        whitespace: S
      };
      o.push(I), y = I;
    }
    u += f.length, l < d.length - 1 && (o.push({ codePoint: 9, cluster: t + u, advance: 0, tab: !0, whitespace: !0 }), u += 1);
  }
  return Object.freeze(o);
}
function Sh(i, e, t, s, n) {
  const r = i.font, o = i.glyph;
  if (!r || !o || i.whitespace) return null;
  const a = ir(r, n.fontSize);
  let d, u, l, f;
  if (r.product.kind === "font/msdf" && o.planeBounds) {
    const [p, m, y, b] = o.planeBounds;
    d = e + p * n.fontSize, u = t + r.product.base * n.fontSize - b * n.fontSize, l = (y - p) * n.fontSize, f = (b - m) * n.fontSize;
  } else
    d = e + o.xOffset * a, u = t + o.yOffset * a, l = o.width * a, f = o.height * a;
  const h = r.pages.get(o.page);
  if (!h) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.font.pages", `font page ${o.page} has no realized asset ID.`);
  return Object.freeze({
    codePoint: i.codePoint,
    cluster: i.cluster,
    fontId: r.id,
    glyphId: o.id,
    pageAssetId: h,
    kind: r.product.kind === "font/msdf" ? "msdf" : "bitmap",
    channel: o.channel,
    distanceRange: r.product.distanceRange ?? 0,
    x: d,
    y: u,
    width: l,
    height: f,
    region: Object.freeze([o.x, o.y, o.width, o.height]),
    line: s
  });
}
function Eh(i, e) {
  return JSON.stringify([
    i.id,
    e.revision,
    e.text,
    i.font,
    i.fallbackFonts,
    i.fontSize,
    i.lineHeight,
    i.maxWidth,
    i.maxHeight,
    i.wrap,
    i.align,
    i.verticalAlign,
    i.direction,
    i.shaping,
    i.letterSpacing,
    i.wordSpacing,
    i.tabSize,
    i.missingGlyph,
    i.replacementCodePoint
  ]);
}
function Ah(i, e, t, s) {
  if (i.direction === "rtl") throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.direction", "RTL text requires a qualified advanced provider and bidirectional layout, which is deferred.");
  if (i.direction === "auto" && /[\u0590-\u08ff]/u.test(e.text)) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.direction", "auto detected a right-to-left script; bidirectional layout is not qualified.");
  const n = e.text.normalize("NFC"), r = i.fontSize * (i.lineHeight ?? 1.2), o = t[0];
  if (!o) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text.font", "text requires a primary font.");
  const a = o.glyphs.get(32), d = Math.max(i.fontSize * 0.25, (a ? a.xAdvance * ir(o, i.fontSize) : i.fontSize * 0.5) * (i.tabSize ?? 4)), u = i.maxWidth ?? Number.POSITIVE_INFINITY, l = [];
  let f = 0;
  const h = n.split(`
`);
  h.forEach((I, x) => {
    l.push(...vh(Ih(i.id, I, f, i, t, s), u, i.wrap ?? "none", d)), f += I.length + (x < h.length - 1 ? 1 : 0);
  });
  const p = i.maxHeight === void 0 ? l.length : Math.max(0, Math.floor(i.maxHeight / r)), m = l.slice(0, p), y = m.length * r, b = i.maxWidth ?? Math.max(0, ...m.map((I) => I.width)), g = i.maxHeight ?? y, w = i.verticalAlign === "bottom" ? g - y : i.verticalAlign === "middle" ? (g - y) * 0.5 : 0, z = [], O = [];
  if (m.forEach((I, x) => {
    const R = i.align ?? "start", P = R === "center" ? (b - I.width) * 0.5 : R === "end" ? b - I.width : 0, L = I.tokens.filter((G) => G.whitespace && !G.tab).length, H = R === "justify" && !I.paragraphEnd && L > 0 ? (b - I.width) / L : 0, Ie = z.length;
    let Z = P;
    for (const G of I.tokens) {
      if (G.tab) {
        Z += Qa(Z - P, d);
        continue;
      }
      const ee = Sh(G, Z, w + x * r, x, i);
      ee && z.push(ee), Z += G.advance + (G.whitespace ? H : 0);
    }
    O.push(Object.freeze({ index: x, startGlyph: Ie, glyphCount: z.length - Ie, width: R === "justify" && !I.paragraphEnd ? b : I.width, x: P, y: w + x * r }));
  }), z.length > 65536) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.text", "laid-out glyph count exceeds 65,536.");
  const S = new Set(t.flatMap((I) => [...I.glyphs.keys()])), v = [...n].filter((I) => I !== `
` && I !== "	" && !S.has(I.codePointAt(0))).length;
  return Object.freeze({
    snapshotVersion: 1,
    textId: i.id,
    revision: e.revision,
    normalizedText: n,
    direction: "ltr",
    bounds: Object.freeze([0, 0, b, g]),
    lines: Object.freeze(O),
    glyphs: Object.freeze(z),
    missingGlyphs: v,
    cacheKey: Eh(i, e)
  });
}
function Ue(i, e) {
  throw new E("R2D_WEBGPU_SCENE_INVALID", i, e);
}
function $e(i, e, t = -Number.MAX_VALUE) {
  return typeof i != "number" || !Number.isFinite(i) || i < t ? Ue(e, "expected a finite numeric font metric.") : i;
}
function ti(i, e, t = 0) {
  return !Number.isSafeInteger(i) || i < t ? Ue(e, "expected a bounded integer font metric.") : i;
}
function xh(i, e) {
  if (!i || typeof i != "object") return Ue(e, "font asset is missing or is not an object.");
  const t = i;
  if (t.normalizationVersion !== 1 || t.kind !== "font/bitmap" && t.kind !== "font/msdf") return Ue(e, "font must be a normalized bitmap or MSDF product.");
  if ($e(t.size, `${e}.size`, Number.EPSILON), $e(t.lineHeight, `${e}.lineHeight`, Number.EPSILON), $e(t.base, `${e}.base`), ti(t.atlasWidth, `${e}.atlasWidth`, 1), ti(t.atlasHeight, `${e}.atlasHeight`, 1), !Array.isArray(t.pages) || t.pages.length === 0 || t.pages.length > 64) return Ue(`${e}.pages`, "font requires 1..64 pages.");
  if (!Array.isArray(t.glyphs) || t.glyphs.length > 65536) return Ue(`${e}.glyphs`, "font glyph catalog exceeds the qualified limit.");
  const s = /* @__PURE__ */ new Set();
  for (let r = 0; r < t.pages.length; r++) {
    const o = t.pages[r], a = ti(o.id, `${e}.pages[${r}].id`);
    s.has(a) && Ue(`${e}.pages[${r}].id`, "font page IDs must be unique."), s.add(a);
  }
  const n = /* @__PURE__ */ new Set();
  for (let r = 0; r < t.glyphs.length; r++) {
    const o = t.glyphs[r], a = `${e}.glyphs[${r}]`, d = ti(o.id, `${a}.id`);
    (d > 1114111 || n.has(d)) && Ue(`${a}.id`, "glyph IDs must be unique Unicode scalar values."), n.add(d), $e(o.x, `${a}.x`, 0), $e(o.y, `${a}.y`, 0), $e(o.width, `${a}.width`, 0), $e(o.height, `${a}.height`, 0), $e(o.xOffset, `${a}.xOffset`), $e(o.yOffset, `${a}.yOffset`), $e(o.xAdvance, `${a}.xAdvance`), s.has(ti(o.page, `${a}.page`)) || Ue(`${a}.page`, "glyph references an unavailable font page.");
  }
  return t.kind === "font/msdf" && $e(t.distanceRange, `${e}.distanceRange`, Number.EPSILON), t;
}
class _h {
  constructor(e) {
    c(this, "capacity");
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "hits", 0);
    c(this, "misses", 0);
    c(this, "evictions", 0);
    this.capacity = e;
  }
  get(e) {
    const t = this.values.get(e);
    if (!t) {
      this.misses += 1;
      return;
    }
    return this.values.delete(e), this.values.set(e, t), this.hits += 1, t;
  }
  set(e) {
    for (this.values.delete(e.cacheKey), this.values.set(e.cacheKey, e); this.values.size > this.capacity; ) {
      const t = this.values.keys().next().value;
      this.values.delete(t), this.evictions += 1;
    }
  }
  keys() {
    return Object.freeze([...this.values.keys()]);
  }
  metrics() {
    return Object.freeze({ hits: this.hits, misses: this.misses, evictions: this.evictions });
  }
  clear() {
    this.values.clear();
  }
}
const $h = Object.freeze([1, 0, 0, 1, 0, 0]);
function zh(i, e, t) {
  return Object.freeze([i[0], i[1], i[2], i[3], i[0] * e + i[2] * t + i[4], i[1] * e + i[3] * t + i[5]]);
}
function Oh(i, e, t) {
  const n = [[0, 0], [e, 0], [0, t], [e, t]].map((a) => Ce(i, a)), r = n.map((a) => a[0]), o = n.map((a) => a[1]);
  return Object.freeze([Math.min(...r), Math.min(...o), Math.max(...r) - Math.min(...r), Math.max(...o) - Math.min(...o)]);
}
function Dh(i, e) {
  const t = xh(e, `$.assets.${i}`), s = /* @__PURE__ */ new Map();
  for (const n of t.pages) {
    if (!n.texture.assetId) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.assets.${i}.pages.${n.id}`, "font page must resolve to an explicit Asset Pipeline dependency ID.");
    s.set(n.id, n.texture.assetId);
  }
  return Object.freeze({
    id: i,
    product: t,
    glyphs: new Map(t.glyphs.map((n) => [n.id, n])),
    pages: s,
    kernings: new Map(t.kernings.map((n) => [`${n.first}:${n.second}`, n.amount]))
  });
}
function Ch(i, e) {
  return `${i.kind}:${e}-text:${i.shaderAsset ?? i.builtin ?? "text"}:${i.blendMode ?? "alpha"}`;
}
class Nh {
  constructor(e, t, s, n = 256) {
    c(this, "definition");
    c(this, "provider");
    c(this, "fonts", /* @__PURE__ */ new Map());
    c(this, "cache");
    c(this, "lastLayouts", /* @__PURE__ */ new Map());
    c(this, "layoutBuilds", 0);
    c(this, "emittedGlyphs", 0);
    c(this, "missingGlyphs", 0);
    c(this, "advancedProviderCalls", 0);
    c(this, "destroyed", !1);
    if (this.definition = e, this.provider = s, !Number.isSafeInteger(n) || n < 1 || n > 2048) throw new RangeError("text cache must retain 1..2048 runs.");
    this.cache = new _h(n);
    for (const r of new Set(e.texts.flatMap((o) => [o.font, ...o.fallbackFonts ?? []]))) this.fonts.set(r, Dh(r, t.get(r)));
    for (const r of e.texts) {
      const o = e.materials.find((a) => a.id === r.material);
      if (!o || o.kind === "builtin" && o.builtin !== "bitmap-text" && o.builtin !== "msdf-text")
        throw new E("R2D_WEBGPU_SCENE_INVALID", `$.texts.${r.id}.material`, "text requires a builtin bitmap-text/MSDF-text material or a qualified custom material.");
      if (r.shaping === "advanced-provider" && (!s || s.apiVersion !== 1)) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.texts.${r.id}.shaping`, "advanced-provider text requires a shaping provider v1.");
    }
  }
  plan(e, t, s = /* @__PURE__ */ new Map(), n = { targetId: "surface", sampling: "asset" }) {
    this.assertAlive();
    const r = new Map(this.definition.texts.map((l) => [l.id, l])), o = new Map(this.definition.materials.map((l) => [l.id, l])), a = new Map(this.definition.layers.map((l, f) => [l.id, l.order?.zIndex ?? f])), d = [];
    let u = 0;
    return e.items.forEach((l, f) => {
      if (l.kind !== "text") return;
      const h = r.get(l.id);
      if (!h) return;
      u += 1;
      const p = s.get(l.id) ?? Object.freeze({ snapshotVersion: 1, textId: l.id, revision: 0, text: h.text }), m = [h.font, ...h.fallbackFonts ?? []].map((S) => this.fonts.get(S)), y = JSON.stringify([p.revision, p.text, h]);
      let b = this.cache.get(y);
      if (!b) {
        h.shaping === "advanced-provider" && (this.advancedProviderCalls += 1);
        const S = Ah(h, p, m, this.provider);
        b = Object.freeze({ ...S, cacheKey: y }), this.cache.set(b), this.layoutBuilds += 1;
      }
      this.lastLayouts.set(l.id, b), this.missingGlyphs += b.missingGlyphs;
      const g = o.get(h.material);
      if (!g) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.texts.${l.id}.material`, "text material is unavailable.");
      const w = Es(l.maskId ?? h.mask, this.definition, e), z = l.transform ?? $h, O = a.get(l.layer) ?? 0;
      b.glyphs.forEach((S, v) => {
        if (!t.has(S.pageAssetId)) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.texts.${l.id}.font.pages`, `realized texture ${S.pageAssetId} is unavailable.`);
        const I = zh(z, S.x, S.y), x = v;
        d.push(Object.freeze({
          id: `${l.id}/glyph/${v}`,
          layer: l.layer,
          order: l.order,
          layerOrder: O,
          stableIndex: x,
          sourceItemIndex: f,
          sourceSubIndex: v,
          packedSortKey: Wt(O, l.order, x),
          assetId: S.pageAssetId,
          materialId: g.id,
          pipelineId: Ch(g, S.kind),
          blendMode: g.blendMode ?? "alpha",
          samplerId: n.sampling === "asset" ? g.sampler ?? (S.kind === "msdf" ? "linear" : "asset") : n.sampling,
          targetId: l.targetId ?? h.target ?? n.targetId,
          geometry: "quad",
          transform: I,
          size: Object.freeze([S.width, S.height]),
          anchor: Object.freeze([0, 0]),
          region: S.region,
          flipX: !1,
          flipY: !1,
          nineSlice: null,
          scissor: w.scissor,
          stencilMasks: w.stencilMasks,
          bounds: Oh(I, S.width, S.height),
          tint: l.tint,
          opacity: l.opacity,
          textRunKey: b.cacheKey,
          textKind: S.kind,
          textDistanceRange: S.distanceRange,
          textChannel: S.channel
        }));
      });
    }), this.emittedGlyphs += d.length, Object.freeze({ sprites: Object.freeze(d), glyphCount: d.length, textCount: u, retainedRunKeys: this.cache.keys() });
  }
  inspectText(e) {
    return this.assertAlive(), this.lastLayouts.get(e) ?? null;
  }
  retainedRunKeys() {
    return this.assertAlive(), this.cache.keys();
  }
  inspect() {
    const e = this.cache.metrics();
    return Object.freeze({
      snapshotVersion: 1,
      retainedRuns: this.cache.keys().length,
      layoutBuilds: this.layoutBuilds,
      cacheHits: e.hits,
      cacheMisses: e.misses,
      evictions: e.evictions,
      emittedGlyphs: this.emittedGlyphs,
      missingGlyphs: this.missingGlyphs,
      advancedProviderCalls: this.advancedProviderCalls,
      destroyed: this.destroyed
    });
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.cache.clear(), this.lastLayouts.clear(), this.fonts.clear());
  }
  assertAlive() {
    if (this.destroyed) throw new E("R2D_WEBGPU_STATE", "$.textFeature", "text feature is destroyed.");
  }
}
function kh(i, e) {
  return i.animations.length > 0 ? new Rh(i, e) : null;
}
class Rh {
  constructor(e, t) {
    c(this, "definition");
    c(this, "clips", /* @__PURE__ */ new Map());
    c(this, "frameSelections", 0);
    c(this, "destroyed", !1);
    this.definition = e;
    for (const s of e.animations) {
      if (!s.asset || !s.clip || !s.target) continue;
      const n = t.get(s.asset);
      if (!n || n.kind !== "animation/2d" || n.normalizationVersion !== 1) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.animations.${s.id}.asset`, "animation asset is not a normalized Animation2dProduct.");
      const r = n.clips.find((a) => a.name === s.clip);
      if (!r || r.frames.length === 0 || r.durationMs <= 0) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.animations.${s.id}.clip`, `animation clip ${s.clip} is unavailable or empty.`);
      const o = 1 / (s.fixedStepHz ?? 60);
      if (Math.abs(r.durationMs / 1e3 - s.duration) > o) throw new E("R2D_WEBGPU_SCENE_INVALID", `$.animations.${s.id}.duration`, "descriptor and Animation2dProduct durations differ by more than one fixed step.");
      this.clips.set(s.id, r);
    }
  }
  frames(e) {
    this.assertAlive();
    const t = /* @__PURE__ */ new Map();
    for (const s of this.definition.animations) {
      const n = this.clips.get(s.id), r = e.get(s.id);
      if (!n || !r?.active || !s.target) continue;
      const o = Math.max(0, Math.min(n.durationMs, r.time * 1e3));
      let a = 0, d = n.frames[n.frames.length - 1].sprite;
      for (const u of n.frames)
        if (a += u.durationMs, o < a) {
          d = u.sprite;
          break;
        }
      t.set(s.target, d), this.frameSelections += 1;
    }
    return t;
  }
  inspect() {
    return Object.freeze({ animations: this.definition.animations.length, productClips: this.clips.size, frameSelections: this.frameSelections, destroyed: this.destroyed });
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.clips.clear());
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Animation2dFeature is destroyed.");
  }
}
function Ph(i) {
  return i.particles.length > 0 ? new jh(i) : null;
}
class jh {
  constructor(e) {
    c(this, "definition");
    c(this, "plannedFrames", 0);
    c(this, "plannedParticles", 0);
    c(this, "retained", /* @__PURE__ */ new Set());
    c(this, "destroyed", !1);
    this.definition = e;
  }
  plan(e, t, s = "surface") {
    this.assertAlive();
    const n = new Map(this.definition.particles.map((l) => [l.id, l])), r = new Map(this.definition.materials.map((l) => [l.id, l])), o = new Map(this.definition.layers.map((l, f) => [l.id, l.order?.zIndex ?? f])), a = new Map(e.items.map((l, f) => [l.id, { item: l, index: f }])), d = [], u = /* @__PURE__ */ new Set();
    for (const l of t.particles) {
      const f = n.get(l.emitterId), h = a.get(l.emitterId);
      if (!f || !h) continue;
      const p = r.get(f.material);
      if (!p) continue;
      const m = Math.max(0, Math.min(1, e.alpha)), y = l.previousPosition[0] + (l.position[0] - l.previousPosition[0]) * m, b = l.previousPosition[1] + (l.position[1] - l.previousPosition[1]) * m, g = h.item.transform ?? [1, 0, 0, 1, h.item.bounds[0], h.item.bounds[1]], w = Th(g, y, b, l.rotation), z = g[0] * y + g[2] * b + g[4], O = g[1] * y + g[3] * b + g[5], S = f.id;
      u.add(S);
      const v = o.get(f.layer) ?? 0, I = h.item.order, x = Es(f.mask, this.definition, e);
      d.push(Object.freeze({
        id: `${f.id}:particle:${l.id}`,
        layer: f.layer,
        order: I,
        layerOrder: v,
        stableIndex: d.length,
        sourceItemIndex: h.index,
        sourceSubIndex: l.id,
        packedSortKey: Wt(v, I, l.id),
        assetId: f.texture ?? "forgeng.render2d:fallback-white",
        materialId: f.material,
        pipelineId: `${p.kind}:${p.shaderAsset ?? p.builtin ?? "particle"}:${p.blendMode ?? "alpha"}`,
        blendMode: p.blendMode ?? "alpha",
        samplerId: p.sampler ?? "asset",
        targetId: f.target ?? s,
        geometry: "quad",
        transform: w,
        size: Object.freeze([l.size, l.size]),
        anchor: Object.freeze([0.5, 0.5]),
        region: null,
        flipX: !1,
        flipY: !1,
        nineSlice: null,
        scissor: x.scissor,
        stencilMasks: x.stencilMasks,
        bounds: Object.freeze([z - l.size / 2, O - l.size / 2, l.size, l.size]),
        tint: l.color,
        opacity: h.item.opacity,
        particleRunKey: S
      }));
    }
    this.plannedFrames += 1, this.plannedParticles += d.length, this.retained.clear();
    for (const l of u) this.retained.add(l);
    return Object.freeze({ sprites: Object.freeze(d), emitterCount: u.size, particleCount: d.length, activeRunKeys: Object.freeze([...u].sort()) });
  }
  retainedRunKeys() {
    return Object.freeze([...this.retained].sort());
  }
  inspect() {
    return Object.freeze({ capacity: this.definition.particles.reduce((e, t) => e + t.capacity, 0), plannedFrames: this.plannedFrames, plannedParticles: this.plannedParticles, retainedRuns: this.retained.size, destroyed: this.destroyed });
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.retained.clear());
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Particle2dFeature is destroyed.");
  }
}
function Th(i, e, t, s) {
  const n = Math.cos(s), r = Math.sin(s);
  return Object.freeze([
    i[0] * n + i[2] * r,
    i[1] * n + i[3] * r,
    i[0] * -r + i[2] * n,
    i[1] * -r + i[3] * n,
    i[0] * e + i[2] * t + i[4],
    i[1] * e + i[3] * t + i[5]
  ]);
}
class eo {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Set());
    c(this, "abortListeners", /* @__PURE__ */ new Set());
    c(this, "cancelled", !1);
    c(this, "reason");
  }
  cancel(e) {
    if (this.cancelled) return;
    this.cancelled = !0, this.reason = e;
    for (const s of this.listeners) s(e);
    const t = Object.freeze({ type: "abort" });
    for (const s of this.abortListeners) s(t);
    this.listeners.clear(), this.abortListeners.clear();
  }
  throwIfCancelled() {
    if (this.cancelled) throw new E(
      "R2D_WEBGPU_STATE",
      "$.cancellation",
      `operation cancelled: ${String(this.reason)}.`
    );
  }
  subscribe(e) {
    return this.cancelled ? (e(this.reason), () => {
    }) : (this.listeners.add(e), () => this.listeners.delete(e));
  }
  get aborted() {
    return this.cancelled;
  }
  addEventListener(e, t) {
    e === "abort" && (this.cancelled ? t(Object.freeze({ type: "abort" })) : this.abortListeners.add(t));
  }
  removeEventListener(e, t) {
    e === "abort" && this.abortListeners.delete(t);
  }
}
function rs(i, e) {
  const t = new Error(e);
  return t.name = "AggregateError", t.errors = Object.freeze([...i]), t;
}
async function Lh(i, e, t, s) {
  const n = /* @__PURE__ */ new Map();
  if (!i) return n;
  try {
    for (const a of [...new Set(e.definition.tilemaps.map((d) => d.tilemap))]) {
      s.throwIfCancelled();
      const d = await i.acquire(a, { signal: s });
      if (d.value.kind !== "tilemap/tiled-json" || d.value.normalizationVersion !== 1)
        throw await d.release(), new E("R2D_WEBGPU_SCENE_INVALID", `$.assets.${a}`, "tilemap asset is not a normalized Tiled CPU product.");
      n.set(a, d);
    }
    for (const a of [...new Set(e.definition.texts.flatMap((d) => [d.font, ...d.fallbackFonts ?? []]))]) {
      s.throwIfCancelled();
      const d = await i.acquire(a, { signal: s });
      if (d.value.kind !== "font/bitmap" && d.value.kind !== "font/msdf" || d.value.normalizationVersion !== 1)
        throw await d.release(), new E("R2D_WEBGPU_SCENE_INVALID", `$.assets.${a}`, "font asset is not a normalized bitmap/MSDF CPU product.");
      n.set(a, d);
    }
    for (const a of [...new Set(e.definition.animations.flatMap((d) => d.asset ? [d.asset] : []))]) {
      s.throwIfCancelled();
      const d = await i.acquire(a, { signal: s });
      if (d.value.kind !== "animation/2d" || d.value.normalizationVersion !== 1)
        throw await d.release(), new E("R2D_WEBGPU_SCENE_INVALID", `$.assets.${a}`, "animation asset is not a normalized Animation2dProduct.");
      n.set(a, d);
    }
    const r = [...n.values()].flatMap((a) => a.value.kind === "tilemap/tiled-json" ? a.value.dependencies.flatMap((d) => d.assetId ? [d.assetId] : []) : a.value.kind === "font/bitmap" || a.value.kind === "font/msdf" ? a.value.dependencies.flatMap((d) => d.assetId ? [d.assetId] : []) : []), o = [.../* @__PURE__ */ new Set([
      ...e.definition.sprites.flatMap((a) => [a.texture, a.normalTexture].filter((d) => d !== void 0)),
      ...e.definition.masks.flatMap((a) => a.texture ? [a.texture] : []),
      ...e.definition.particles.flatMap((a) => a.texture ? [a.texture] : []),
      ...e.definition.tilemaps.flatMap((a) => [...a.tilesetTextures ?? [], ...a.imageLayerTextures ?? []]),
      ...r
    ])];
    for (const a of o) {
      if (n.has(a)) continue;
      s.throwIfCancelled();
      const d = await i.acquire(a, { signal: s }), u = d.value;
      if (u.kind !== "texture/2d-webgpu" && u.kind !== "sprite/atlas-webgpu" || u.generation !== t)
        throw await d.release(), new E("R2D_WEBGPU_STALE_GENERATION", `$.assets.${a}`, "realized 2D asset belongs to another GPU generation.");
      n.set(a, d);
    }
    return n;
  } catch (r) {
    throw await sr(n).catch(() => {
    }), r;
  }
}
async function sr(i) {
  const e = [];
  for (const t of [...i.values()].reverse())
    try {
      await t.release();
    } catch (s) {
      e.push(s);
    }
  if (e.length > 0) throw rs(e, "WebGPU 2D asset lease cleanup failed.");
}
async function Za(i) {
  i.destroy ? await i.destroy() : await i.attachment.destroy();
}
async function to(i, e, t, s = null, n = null, r = null, o = null) {
  const a = [];
  try {
    t?.destroy();
  } catch (d) {
    a.push(d);
  }
  try {
    s?.destroy();
  } catch (d) {
    a.push(d);
  }
  try {
    n?.destroy();
  } catch (d) {
    a.push(d);
  }
  try {
    r?.destroy();
  } catch (d) {
    a.push(d);
  }
  try {
    o?.destroy();
  } catch (d) {
    a.push(d);
  }
  try {
    await Za(i);
  } catch (d) {
    a.push(d);
  }
  try {
    await sr(e);
  } catch (d) {
    a.push(d);
  }
  if (a.length > 0) throw rs(a, "WebGPU 2D scene asset cleanup failed.");
}
const Mh = /* @__PURE__ */ new Set(["forgeng.render2d:lighting-v1", "forgeng.render2d:effects-v1", "forgeng.render2d:path-masks-v1"]);
async function Vh(i, e, t, s) {
  if (!i.features.some((a) => Mh.has(a.capability))) return null;
  const n = t?.effects ? Object.freeze([...t.effects]) : Object.freeze(["color-adjust"]), r = Object.freeze({ lighting: t?.lighting ?? !0, hardShadows: t?.hardShadows ?? !0, pathMasks: t?.pathMasks ?? !0, effects: n });
  return (await Promise.resolve().then(() => ZI)).createRender2dAdvancedFeatureSet({ definition: i, device: e, support: r, fail: s });
}
const Gh = Object.freeze({ features: 0, fallbacks: Object.freeze([]), lightingBuffers: 0, lightingPipelines: 0, visibleLights: 0, shadowSegments: 0, pathMaskBuffers: 0, effectPasses: 0, buffers: 0, pipelines: 0, gpuResources: 0, destroyed: !1 });
function Fh(i) {
  return i ? i.inspect() : Gh;
}
const Bh = Object.freeze({
  gpuResources: 0,
  buffers: 0,
  textures: 0,
  targetTextures: 0,
  targetPixels: 0,
  renderTargets: Object.freeze([]),
  pipelines: 0,
  pendingRetirements: 0,
  trackedBufferBytes: 0,
  trackedTextureBytes: 0,
  instanceBufferCapacity: 0,
  instanceBufferGrowths: 0,
  instanceBufferWraps: 0,
  instanceUploads: 0,
  instanceReuses: 0,
  instanceDirtyBytes: 0,
  tileChunkBuffers: 0,
  tileChunkUploads: 0,
  tileChunkReuses: 0,
  tileChunkDirtyBytes: 0,
  textRunBuffers: 0,
  textRunUploads: 0,
  textRunReuses: 0,
  textRunDirtyBytes: 0,
  particleRunBuffers: 0,
  particleRunUploads: 0,
  particleRunReuses: 0,
  particleRunDirtyBytes: 0
});
function Uh(i) {
  const e = i.scope?.inspect() ?? Bh, t = i.responsive?.inspect(), s = i.text?.inspect(), n = i.animation?.inspect(), r = i.particles?.inspect(), o = Fh(i.advanced);
  return Object.freeze({
    snapshotVersion: 1,
    attachments: i.sceneActive ? 1 : 0,
    subscriptions: i.subscriptions,
    tasks: i.tasks,
    leases: i.leases + i.sceneAssetLeases,
    handles: i.handles,
    cleanupErrors: i.cleanupErrors,
    ...e,
    gpuResources: e.gpuResources + o.gpuResources,
    buffers: e.buffers + o.buffers,
    pipelines: e.pipelines + o.pipelines,
    textLayoutBuilds: s?.layoutBuilds ?? 0,
    textLayoutCacheHits: s?.cacheHits ?? 0,
    textLayoutEvictions: s?.evictions ?? 0,
    retainedTextRuns: s?.retainedRuns ?? 0,
    animationFrameSelections: n?.frameSelections ?? 0,
    particlePlannedFrames: r?.plannedFrames ?? 0,
    particlePlannedInstances: r?.plannedParticles ?? 0,
    retainedParticleRuns: r?.retainedRuns ?? 0,
    advancedFeatures: o.features,
    advancedFallbacks: o.fallbacks.length,
    lightingBuffers: o.lightingBuffers,
    lightingPipelines: o.lightingPipelines,
    visibleLights: o.visibleLights,
    shadowSegments: o.shadowSegments,
    pathMaskBuffers: o.pathMaskBuffers,
    effectPasses: o.effectPasses,
    surfaceRevision: t?.revision ?? i.surfaceRevision,
    resizeEvents: t?.resizeEvents ?? 0,
    resizeApplications: t?.resizeApplications ?? 0,
    coalescedResizes: t?.coalescedResizes ?? 0,
    backendGeneration: i.backendGeneration,
    firstUsefulFrame: i.firstUsefulFrame,
    presentedFrames: i.presentedFrames,
    destroyed: i.phase === "destroyed"
  });
}
function Wh(i) {
  return i === "ready" ? "attached" : i === "lost" ? "lost" : i === "detaching" ? "detaching" : i === "destroying" ? "destroying" : i === "destroyed" ? "destroyed" : i;
}
function Yh(i) {
  return typeof i != "object" || i === null ? { code: "R2D_WEBGPU_FAILURE", path: "$" } : { code: "code" in i ? String(i.code) : "R2D_WEBGPU_FAILURE", path: "path" in i ? String(i.path) : "$" };
}
class qh {
  constructor(e, t, s) {
    c(this, "instanceId");
    c(this, "domainId");
    c(this, "options");
    c(this, "phase", "created");
    c(this, "backendGeneration", 0);
    c(this, "surface", null);
    c(this, "responsiveSurface", null);
    c(this, "extension", null);
    c(this, "scope", null);
    c(this, "scene", null);
    c(this, "sceneAssetLeases", /* @__PURE__ */ new Map());
    c(this, "sceneTextureValues", /* @__PURE__ */ new Map());
    c(this, "tilemapFeature", null);
    c(this, "textFeature", null);
    c(this, "animationFeature", null);
    c(this, "particleFeature", null);
    c(this, "advancedFeature", null);
    c(this, "sceneCancellation", null);
    c(this, "sceneTransition", null);
    c(this, "destroyPromise", null);
    c(this, "detached", !1);
    c(this, "subscriptions", 0);
    c(this, "tasks", 0);
    c(this, "leases", 0);
    c(this, "handles", 0);
    c(this, "cleanupErrors", 0);
    c(this, "firstUsefulFrame", null);
    c(this, "presentedFrames", 0);
    c(this, "pendingFrames", /* @__PURE__ */ new Map());
    c(this, "frames", []);
    c(this, "inspectionObservedFrames", 0);
    c(this, "inspectionDroppedFrames", 0);
    c(this, "metrics");
    c(this, "inspectionClock");
    c(this, "failures");
    c(this, "background");
    c(this, "surfaceLoad");
    this.instanceId = e, this.domainId = t, this.options = s;
    const n = s.failAt;
    this.failures = new Set(n === void 0 ? [] : Array.isArray(n) ? n : [n]), this.background = Object.freeze(s.clearColor ?? [0.055, 0.071, 0.102, 1]), this.surfaceLoad = s.surfaceLoad, this.metrics = new ef(s.inspection);
    const r = this.metrics.inspection.profile === "diagnostic" || this.metrics.inspection.profile === "lab";
    this.inspectionClock = r ? s.inspectionClock ?? (() => globalThis.performance?.now?.() ?? Date.now()) : void 0;
  }
  attach(e) {
    return this.attachInternal(e);
  }
  async attachInternal(e) {
    this.assertPhase("attach", ["created"]), this.phase = "attaching", this.detached = !1;
    try {
      if (this.fail("probe"), !e.capabilities.find((r) => r.id === bi && r.version >= 1)) throw new E("R2D_WEBGPU_CAPABILITY_MISSING", "$.capabilities", "backend does not expose the 2D capability.");
      const s = e.backendInterop;
      if (!s || s.apiVersion !== 1 || s.generation !== e.backendGeneration)
        throw new E("R2D_WEBGPU_INTEROP_MISSING", "$.backendInterop", "versioned WebGPU frame interop is unavailable.");
      const n = s.requestExtension(Ua, 1);
      if (!n || n.apiVersion !== 1 || n.generation !== e.backendGeneration)
        throw new E("R2D_WEBGPU_INTEROP_MISSING", "$.backendInterop.extension", "WebGPU frame extension v1 is unavailable.");
      if (this.backendGeneration = e.backendGeneration, this.surface = Object.freeze({ ...e.surface ?? this.defaultSurface() }), this.responsiveSurface = new Eu(
        this.surface,
        this.options.maximumPixelRatio ?? 4,
        this.options.canvas
      ), this.extension = n, this.tasks = 1, this.subscriptions = 1, this.scope = tr.create(
        this.backendGeneration,
        n.device,
        n.format,
        this.options.shaderSource ?? Ou,
        (r) => this.fail(r),
        {
          customShaderSources: this.options.customShaderSources,
          customMaterialFallback: this.options.customMaterialFallback,
          tilemapShaderSource: Du,
          bitmapTextShaderSource: Cu,
          msdfTextShaderSource: Nu
        }
      ), this.options.assets?.recover) {
        const r = new eo();
        await this.options.assets.recover(this.backendGeneration, { signal: r });
      }
      this.fail("attach"), this.phase = "ready", e.sceneId !== null && await this.switchScene(e.sceneId);
    } catch (t) {
      throw this.scope?.destroyNow(), this.scope = null, this.tasks = 0, this.subscriptions = 0, this.extension = null, this.responsiveSurface = null, this.phase = "created", t;
    }
  }
  switchScene(e) {
    this.assertPhase("switch scene", ["ready"]), this.sceneCancellation?.cancel("scene-superseded");
    const t = new eo();
    this.sceneCancellation = t;
    const s = this.switchSceneInternal(e, t);
    return this.sceneTransition = s, s.finally(() => {
      this.sceneTransition === s && (this.sceneTransition = null);
    });
  }
  async switchSceneInternal(e, t) {
    if (e === null) {
      await this.retireScene();
      return;
    }
    this.fail("prepare");
    const s = await this.options.source.prepare(Object.freeze({
      sceneId: e,
      backendGeneration: this.backendGeneration,
      surface: this.surface,
      cancellation: t
    }));
    let n = null, r = null, o = null, a = null, d = null, u = null;
    try {
      if (t.throwIfCancelled(), s.sceneId !== e || s.sceneGeneration <= 0 || s.attachment.sceneId !== e || s.attachment.sceneGeneration !== s.sceneGeneration)
        throw new E("R2D_WEBGPU_SCENE_INVALID", "$.scene", "prepared scene identity or generation is invalid.");
      n = await Lh(this.options.assets, s, this.backendGeneration, t);
      const g = /* @__PURE__ */ new Map();
      for (const [w, z] of n) g.set(w, z.value);
      r = s.definition.tilemaps.length > 0 ? new ph(s.definition, g) : null, o = s.definition.texts.length > 0 ? new Nh(s.definition, g, this.options.textShapingProvider, this.options.textCacheRuns) : null, a = kh(s.definition, g), d = Ph(s.definition), u = await Vh(s.definition, this.extension.device, this.options.advancedFeatureSupport, (w) => this.fail(w)), t.throwIfCancelled();
    } catch (g) {
      throw r?.destroy(), o?.destroy(), a?.destroy(), d?.destroy(), u?.destroy(), n && await sr(n).catch(() => {
      }), await Za(s).catch(() => {
      }), g;
    }
    const l = this.scene, f = this.sceneAssetLeases, h = this.tilemapFeature, p = this.textFeature, m = this.animationFeature, y = this.particleFeature, b = this.advancedFeature;
    this.scene = s, this.sceneAssetLeases = n, this.sceneTextureValues = new Map([...n].flatMap(([g, w]) => w.value.kind === "texture/2d-webgpu" || w.value.kind === "sprite/atlas-webgpu" ? [[g, w.value]] : [])), this.tilemapFeature = r, this.textFeature = o, this.animationFeature = a, this.particleFeature = d, this.advancedFeature = u, this.frames.length = 0, this.inspectionObservedFrames = 0, this.inspectionDroppedFrames = 0, l && await to(l, f, h, p, m, y, b);
  }
  resize(e) {
    this.assertPhase("resize", ["ready"]), this.surface = Object.freeze({ ...e }), this.responsiveSurface.queue(this.surface);
  }
  contribute(e) {
    if (this.assertPhase("contribute", ["ready"]), !this.scene) throw new E("R2D_WEBGPU_SCENE_MISSING", "$.scene", "no committed 2D scene is available.");
    if (e.metadata.backendGeneration !== this.backendGeneration)
      throw new E("R2D_WEBGPU_STALE_GENERATION", "$.frame.backendGeneration", "frame belongs to a stale backend generation.");
    if (e.metadata.sceneId !== this.scene.sceneId)
      throw new E("R2D_WEBGPU_STALE_GENERATION", "$.frame.sceneId", "frame belongs to a stale scene.");
    if (this.pendingFrames.has(e.metadata.frame))
      throw new E("R2D_WEBGPU_STALE_FRAME", "$.frame", "frame was already contributed.");
    const t = this.inspectionClock?.() ?? 0;
    this.fail("extract"), this.leases += 1;
    try {
      this.fail("encode");
      const s = this.responsiveSurface.consume(), n = this.extension.getFrame(e.metadata.frame), r = s.visible ? Xu(
        e.metadata,
        n,
        this.scene,
        this.scope,
        s,
        this.background,
        this.sceneTextureValues,
        this.tilemapFeature,
        this.textFeature,
        this.animationFeature,
        this.particleFeature,
        this.advancedFeature,
        this.surfaceLoad,
        this.inspectionClock
      ) : null, o = r?.snapshot ?? Ju(e.metadata, this.scene);
      r && this.metrics.record(e.metadata.frame, r.planned, r.draws, Object.freeze({
        ...r.timings,
        contributionMicros: this.inspectionClock ? (this.inspectionClock() - t) * 1e3 : null
      }));
      const a = this.metrics.inspection.limits.history;
      if (a > 0 && (this.inspectionObservedFrames += 1, this.frames.push(o), this.frames.length > a)) {
        const d = this.frames.length - a;
        this.frames.splice(0, d), this.inspectionDroppedFrames += d;
      }
      this.pendingFrames.set(e.metadata.frame, o), this.handles += 1, e.frame.add(Object.freeze({
        domainId: this.domainId,
        type: "forgeng.render2d:webgpu-sprite-pass-v1",
        payload: Object.freeze({
          snapshotVersion: 1,
          frame: o.frame,
          backendGeneration: o.backendGeneration,
          sceneId: o.sceneId,
          sceneGeneration: o.sceneGeneration,
          visible: o.visible,
          cameraCount: o.cameraCount,
          cameraIds: o.cameras.map((d) => d.id),
          spriteCount: o.spriteCount,
          batchCount: o.batchCount,
          drawCount: o.drawCount,
          target: o.target,
          load: o.load,
          store: o.store,
          assetIds: o.assetIds,
          tileCount: o.tileCount,
          visibleTileChunks: o.visibleTileChunks,
          retainedTileChunks: o.retainedTileChunks,
          textCount: o.textCount,
          glyphCount: o.glyphCount,
          retainedTextRuns: o.retainedTextRuns,
          animationCount: o.animationCount,
          particleCount: o.particleCount,
          particleEmitters: o.particleEmitters,
          retainedParticleRuns: o.retainedParticleRuns,
          visibleLights: o.visibleLights,
          shadowSegments: o.shadowSegments,
          effectPasses: o.effectPasses,
          advancedFallbacks: o.advancedFallbacks
        })
      }));
    } catch (s) {
      const n = Yh(s);
      throw n.code !== "R2D_WEBGPU_INJECTED" && this.metrics.recordFailure(n.code, n.path), s;
    } finally {
      this.leases -= 1;
    }
  }
  submitResult(e) {
    if (this.assertPhase("accept submit result", ["ready"]), e.backendGeneration !== this.backendGeneration) throw new E("R2D_WEBGPU_STALE_GENERATION", "$.submitResult", "result belongs to a stale backend generation.");
    const t = this.pendingFrames.get(e.frame);
    if (!t) throw new E("R2D_WEBGPU_STALE_FRAME", "$.submitResult.frame", "frame is not retained by this domain.");
    this.pendingFrames.delete(e.frame), this.handles -= 1, e.submitted && this.scope?.submitted(), e.presented && (this.presentedFrames += 1, t.spriteCount > 0 && this.firstUsefulFrame === null && (this.firstUsefulFrame = t.frame)), this.fail("submit-result");
  }
  lose(e) {
    if (this.assertPhase("lose", ["ready"]), e.backendGeneration !== this.backendGeneration) throw new E("R2D_WEBGPU_STALE_GENERATION", "$.loss", "loss belongs to a stale generation.");
    this.fail("loss"), this.pendingFrames.clear(), this.handles = 0, this.scope?.destroyNow(), this.scope = null, this.advancedFeature?.destroy(), this.advancedFeature = null, this.phase = "lost";
  }
  recover(e) {
    if (this.assertPhase("recover", ["ready"]), e.backendGeneration !== this.backendGeneration || e.previousBackendGeneration >= e.backendGeneration)
      throw new E("R2D_WEBGPU_STALE_GENERATION", "$.recovery", "recovery generations are invalid.");
    this.fail("recover");
  }
  detach() {
    return this.detached || this.phase === "destroyed" ? Promise.resolve() : this.detachInternal();
  }
  async detachInternal() {
    this.phase = "detaching", this.sceneCancellation?.cancel("domain-detach"), await this.sceneTransition?.catch(() => {
    });
    const e = [];
    try {
      await this.retireScene();
    } catch (t) {
      e.push(t);
    }
    try {
      await this.scope?.destroyQueueSafe();
    } catch (t) {
      this.cleanupErrors += 1, e.push(t);
    }
    this.scope = null, this.pendingFrames.clear(), this.handles = 0, this.extension = null, this.subscriptions = 0, this.tasks = 0, this.responsiveSurface = null;
    try {
      this.fail("detach");
    } catch (t) {
      this.cleanupErrors += 1, e.push(t);
    }
    if (this.detached = !0, this.destroyPromise || (this.phase = "created"), e.length > 0) throw rs(e, "WebGPU 2D domain detach failed.");
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async destroyInternal() {
    if (this.phase === "destroyed") return;
    this.phase = "destroying";
    const e = [];
    if (!this.detached) try {
      await this.detachInternal();
    } catch (t) {
      e.push(t);
    }
    try {
      this.fail("destroy");
    } catch (t) {
      this.cleanupErrors += 1, e.push(t);
    }
    if (this.phase = "destroyed", this.frames.length = 0, this.inspectionObservedFrames = 0, this.inspectionDroppedFrames = 0, this.metrics.destroy(), e.length > 0) throw rs(e, "WebGPU 2D domain destroy failed.");
  }
  inspect() {
    return Uh({
      phase: this.phase,
      backendGeneration: this.backendGeneration,
      sceneActive: this.scene !== null,
      surfaceRevision: this.surface?.revision ?? 0,
      subscriptions: this.subscriptions,
      tasks: this.tasks,
      leases: this.leases,
      sceneAssetLeases: this.sceneAssetLeases.size,
      handles: this.handles,
      cleanupErrors: this.cleanupErrors,
      firstUsefulFrame: this.firstUsefulFrame,
      presentedFrames: this.presentedFrames,
      scope: this.scope,
      responsive: this.responsiveSurface,
      text: this.textFeature,
      animation: this.animationFeature,
      particles: this.particleFeature,
      advanced: this.advancedFeature
    });
  }
  getFrames() {
    return Object.freeze([...this.frames]);
  }
  inspect2d() {
    const e = this.scene;
    return this.metrics.inspect({
      domainId: this.domainId,
      phase: Wh(this.phase),
      backendGeneration: this.backendGeneration,
      sceneId: e?.sceneId ?? null,
      sceneGeneration: e?.sceneGeneration ?? 0,
      definition: e?.definition ?? null,
      frame: this.frames.at(-1) ?? null,
      resources: this.inspect(),
      history: Object.freeze({ observedFrames: this.inspectionObservedFrames, retainedFrames: this.frames.length, droppedFrames: this.inspectionDroppedFrames }),
      capabilities: Object.freeze([bi, Ss])
    });
  }
  getTextLayout(e) {
    return this.textFeature?.inspectText(e) ?? null;
  }
  getMetrics() {
    return this.metrics.snapshot();
  }
  async retireScene() {
    const e = this.scene, t = this.sceneAssetLeases, s = this.tilemapFeature, n = this.textFeature, r = this.animationFeature, o = this.particleFeature, a = this.advancedFeature;
    this.scene = null, this.sceneAssetLeases = /* @__PURE__ */ new Map(), this.sceneTextureValues = /* @__PURE__ */ new Map(), this.tilemapFeature = null, this.textFeature = null, this.animationFeature = null, this.particleFeature = null, this.advancedFeature = null, e && await to(e, t, s, n, r, o, a);
  }
  defaultSurface() {
    return Object.freeze({ snapshotVersion: 1, revision: 0, logicalWidth: 1, logicalHeight: 1, physicalWidth: 1, physicalHeight: 1, pixelRatio: 1, visible: !0 });
  }
  fail(e) {
    if (this.failures.has(e))
      throw this.metrics.recordFailure("R2D_WEBGPU_INJECTED", `$.${e}`), new E("R2D_WEBGPU_INJECTED", `$.${e}`, `injected failure at ${e}.`);
  }
  assertPhase(e, t) {
    if (!t.includes(this.phase)) throw new E("R2D_WEBGPU_STATE", "$.phase", `cannot ${e} while domain is ${this.phase}.`);
  }
}
function Kh(i) {
  const e = i.failAt;
  return new Set(e === void 0 ? [] : Array.isArray(e) ? e : [e]);
}
function Hh(i) {
  const e = i.id ?? Iu, t = Object.freeze({ ...i, surfaceLoad: i.surfaceLoad ?? "clear" }), s = Kh(i), n = [];
  let r = 1;
  return Object.freeze({
    apiVersion: zt,
    id: e,
    required: i.required ?? !0,
    requirements: Object.freeze([
      Object.freeze({ capability: bi, minimumVersion: 1, optional: i.required === !1 }),
      Object.freeze({ capability: Ss, minimumVersion: 1, optional: i.required === !1 })
    ]),
    order: Object.freeze({
      before: Object.freeze([...i.before ?? []]),
      after: Object.freeze([...i.after ?? []])
    }),
    surface: Object.freeze({
      target: "surface",
      phase: i.surfacePhase ?? "world",
      alpha: i.surfaceAlpha ?? "premultiplied",
      colorSpace: "srgb",
      colorLoad: i.surfaceLoad ?? "clear",
      colorStore: "store",
      depth: "none"
    }),
    attachment: Object.freeze({
      enabledByDefault: i.enabledByDefault ?? !0,
      sceneIds: Object.freeze([...i.sceneIds ?? []])
    }),
    create: () => {
      if (s.has("create")) throw new E("R2D_WEBGPU_INJECTED", "$.create", "injected failure at create.");
      const o = new qh(r++, e, t);
      return n.push(Object.freeze({
        id: o.instanceId,
        runtime: o,
        inspect: () => o.inspect(),
        inspect2d: () => o.inspect2d(),
        getFrames: () => o.getFrames(),
        getTextLayout: (a) => o.getTextLayout(a)
      })), o;
    },
    getInstances: () => Object.freeze([...n])
  });
}
const ec = Object.freeze([
  "image/rgba",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif"
]), Xh = "image/ktx2", Jh = "sprite/atlas", Qh = /* @__PURE__ */ new Set(["rgba8unorm", "rgba8unorm-srgb"]), Fs = /* @__PURE__ */ new Set(["nearest", "linear"]), io = /* @__PURE__ */ new Set(["clamp-to-edge", "repeat", "mirror-repeat"]);
function li(i, e) {
  return i.options?.[e];
}
function Ye(i, e, t, s) {
  if (i === void 0) return t;
  if (typeof i != "string" || !e.has(i))
    throw new E("R2D_WEBGPU_SCENE_INVALID", s, `unsupported value ${String(i)}.`);
  return i;
}
function Zh(i, e, t, s, n) {
  if (i === void 0) return e;
  if (!Number.isSafeInteger(i) || i < t || i > s)
    throw new E("R2D_WEBGPU_SCENE_INVALID", n, `expected an integer in ${t}..${s}.`);
  return i;
}
function ep(i) {
  return i && typeof i == "object" && !Array.isArray(i) ? i : {};
}
function tc(i, e) {
  const t = ep(li(i, "sampler"));
  return Object.freeze({
    minFilter: Ye(t.minFilter, Fs, e?.minFilter ?? "nearest", "$.options.sampler.minFilter"),
    magFilter: Ye(t.magFilter, Fs, e?.magFilter ?? "nearest", "$.options.sampler.magFilter"),
    mipmapFilter: Ye(t.mipmapFilter, Fs, e?.mipmapFilter ?? "nearest", "$.options.sampler.mipmapFilter"),
    addressModeU: Ye(t.addressModeU, io, e?.addressModeU ?? "clamp-to-edge", "$.options.sampler.addressModeU"),
    addressModeV: Ye(t.addressModeV, io, e?.addressModeV ?? "clamp-to-edge", "$.options.sampler.addressModeV"),
    maxAnisotropy: Zh(t.maxAnisotropy, e?.maxAnisotropy ?? 1, 1, 16, "$.options.sampler.maxAnisotropy")
  });
}
function tp(i) {
  const e = Ye(li(i, "colorSpace"), /* @__PURE__ */ new Set(["srgb", "linear"]), "srgb", "$.options.colorSpace"), t = Ye(li(i, "format"), Qh, e === "srgb" ? "rgba8unorm-srgb" : "rgba8unorm", "$.options.format");
  if (t.endsWith("-srgb") !== (e === "srgb"))
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.options.format", "texture format and colorSpace disagree.");
  return Object.freeze({
    format: t,
    colorSpace: e,
    alphaMode: Ye(li(i, "alphaMode"), /* @__PURE__ */ new Set(["premultiplied", "straight", "opaque"]), "premultiplied", "$.options.alphaMode"),
    mipPolicy: Ye(li(i, "mipPolicy"), /* @__PURE__ */ new Set(["none", "generate"]), "none", "$.options.mipPolicy"),
    sampler: tc(i),
    usage: Object.freeze(["copy-dst", "texture-binding", "render-attachment"])
  });
}
const ip = Object.freeze({
  rgba8unorm: "rgba8unorm",
  "rgba8unorm-srgb": "rgba8unorm-srgb",
  "astc-4x4-unorm": "astc-4x4-unorm",
  "astc-4x4-unorm-srgb": "astc-4x4-unorm-srgb",
  "bc7-rgba-unorm": "bc7-rgba-unorm",
  "bc7-rgba-unorm-srgb": "bc7-rgba-unorm-srgb",
  "bc5-rg-unorm": "bc5-rg-unorm",
  "etc2-rgba8unorm": "etc2-rgba8unorm",
  "etc2-rgba8unorm-srgb": "etc2-rgba8unorm-srgb"
});
function sp(i, e) {
  const t = ip[e.target];
  if (!t) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded.target", `unsupported KTX2 target ${e.target}.`);
  const s = e.levels.length > 1 ? "provided" : "none";
  return Object.freeze({
    format: t,
    colorSpace: e.colorSpace,
    alphaMode: e.hasAlpha ? "straight" : "opaque",
    mipPolicy: s,
    sampler: tc(i, e.sampler),
    usage: Object.freeze(["copy-dst", "texture-binding"])
  });
}
function ic(i, e) {
  return `${i}:${e.minFilter}:${e.magFilter}:${e.mipmapFilter}:${e.addressModeU}:${e.addressModeV}:${e.maxAnisotropy}`;
}
function Li(i, e, t) {
  return `${e}:${i}:${t.format}:${t.colorSpace}:${t.alphaMode}:${t.mipPolicy}:${ic(e, t.sampler)}`;
}
const np = 4, rp = 2, op = 4, ap = 16, cp = `
@group(0) @binding(0) var source_texture: texture_2d<f32>;
@group(0) @binding(1) var source_sampler: sampler;
struct Output { @builtin(position) position: vec4f, @location(0) uv: vec2f }
@vertex fn vs_mip(@builtin(vertex_index) index: u32) -> Output {
  let positions = array<vec2f, 3>(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  var output: Output; output.position = vec4f(positions[index], 0.0, 1.0);
  output.uv = positions[index] * vec2f(0.5, -0.5) + vec2f(0.5); return output;
}
@fragment fn fs_mip(input: Output) -> @location(0) vec4f { return textureSample(source_texture, source_sampler, input.uv); }
`;
function yt(i, e) {
  if (i.aborted) throw new E("R2D_WEBGPU_STATE", `$.realize.${e}`, `texture realization cancelled: ${String(i.reason)}.`);
}
function dp(i, e, t) {
  return t ? Math.floor(Math.log2(Math.max(i, e))) + 1 : 1;
}
function lp(i, e, t) {
  let s = 0;
  for (let n = 0; n < t; n += 1) s += Math.max(1, i >> n) * Math.max(1, e >> n) * 4;
  return s;
}
function up(i) {
  return i.startsWith("astc-") ? "texture-compression-astc" : i.startsWith("bc") ? "texture-compression-bc" : i.startsWith("etc2-") ? "texture-compression-etc2" : null;
}
function so(i) {
  return i.usage.reduce((e, t) => e | (t === "copy-dst" ? rp : t === "texture-binding" ? op : ap), 0);
}
class fp {
  constructor(e, t, s, n, r) {
    c(this, "deviceForGeneration");
    c(this, "maxTextureDimension2d");
    c(this, "maxTextureBytes");
    c(this, "failures");
    c(this, "onStage");
    c(this, "textures", /* @__PURE__ */ new Map());
    c(this, "textureInflight", /* @__PURE__ */ new Map());
    c(this, "samplers", /* @__PURE__ */ new Map());
    c(this, "mipPipelines", /* @__PURE__ */ new Map());
    c(this, "mipSampler", null);
    c(this, "stagingBuffers", 0);
    c(this, "logicalBytes", 0);
    c(this, "allocatedBytes", 0);
    c(this, "uploads", 0);
    c(this, "cacheHits", 0);
    c(this, "adapters", 0);
    c(this, "destroyed", !1);
    this.deviceForGeneration = e, this.maxTextureDimension2d = t, this.maxTextureBytes = s, this.failures = n, this.onStage = r;
  }
  retainAdapter() {
    if (this.destroyed) throw new Error("Render2d asset realization owner is destroyed.");
    this.adapters += 1;
  }
  async releaseAdapter() {
    this.adapters = Math.max(0, this.adapters - 1), this.adapters === 0 && await this.destroy();
  }
  fail(e) {
    if (this.onStage?.(e), this.failures.has(e)) throw new E("R2D_WEBGPU_INJECTED", `$.assets.${e}`, `injected asset failure at ${e}.`);
  }
  async acquireImage(e, t, s, n, r) {
    this.validateDimensions(s.width, s.height);
    const o = Li(e, t, n), a = await this.acquireEntry(o, () => this.createImageEntry(e, t, s, n, r));
    return Object.freeze({ value: a.value, release: () => this.releaseEntry(o, a) });
  }
  async acquireKtx2(e, t, s, n, r) {
    this.validateDimensions(s.width, s.height);
    const o = Li(e, t, n), a = await this.acquireEntry(o, () => this.createKtx2Entry(e, t, s, n, r));
    return Object.freeze({ value: a.value, release: () => this.releaseEntry(o, a) });
  }
  inspect() {
    return Object.freeze({
      snapshotVersion: 1,
      textures: this.textures.size,
      samplers: this.samplers.size,
      stagingBuffers: this.stagingBuffers,
      pipelines: this.mipPipelines.size,
      textureReferences: [...this.textures.values()].reduce((e, t) => e + t.references, 0),
      samplerReferences: [...this.samplers.values()].reduce((e, t) => e + t.references, 0),
      logicalBytes: this.logicalBytes,
      allocatedBytes: this.allocatedBytes,
      uploads: this.uploads,
      cacheHits: this.cacheHits,
      destroyed: this.destroyed
    });
  }
  async destroy() {
    if (this.destroyed) return;
    this.destroyed = !0;
    const e = [...this.textures.entries()].reverse();
    this.textures.clear(), this.textureInflight.clear();
    for (const [, t] of e)
      if (!t.released) {
        t.released = !0;
        try {
          await this.deviceForGeneration(t.value.generation).queue.onSubmittedWorkDone();
        } catch {
        }
        t.value.texture.destroy();
      }
    this.samplers.clear(), this.mipPipelines.clear(), this.mipSampler = null, this.logicalBytes = 0, this.allocatedBytes = 0, this.stagingBuffers = 0;
  }
  async acquireEntry(e, t) {
    if (this.destroyed) throw new Error("Render2d asset realization owner is destroyed.");
    const s = this.textures.get(e);
    if (s)
      return s.references += 1, this.cacheHits += 1, s;
    const n = this.textureInflight.get(e);
    if (n) {
      const o = await n;
      return o.references += 1, this.cacheHits += 1, o;
    }
    const r = t();
    this.textureInflight.set(e, r);
    try {
      const o = await r;
      return o.references = 1, this.textures.set(e, o), o;
    } finally {
      this.textureInflight.delete(e);
    }
  }
  async createImageEntry(e, t, s, n, r) {
    const o = this.deviceForGeneration(t);
    yt(r, "image-start"), this.fail("texture-create");
    const a = dp(s.width, s.height, n.mipPolicy === "generate"), d = lp(s.width, s.height, a);
    this.validateBytes(d);
    const u = o.createTexture({
      label: `ForgeNG 2D image ${e} generation ${t}`,
      size: { width: s.width, height: s.height, depthOrArrayLayers: 1 },
      format: n.format,
      mipLevelCount: a,
      usage: so(n)
    });
    let l = "";
    try {
      yt(r, "image-upload"), this.fail("texture-upload"), o.queue.copyExternalImageToTexture(
        { source: s.image },
        {
          texture: u,
          premultipliedAlpha: n.alphaMode === "premultiplied",
          ...n.colorSpace === "srgb" ? { colorSpace: "srgb" } : {}
        },
        { width: s.width, height: s.height, depthOrArrayLayers: 1 }
      ), a > 1 && await this.generateMips(o, u, n.format, a, r), this.fail("queue-fence"), await o.queue.onSubmittedWorkDone(), yt(r, "image-fence");
      const f = this.acquireSampler(o, t, n);
      l = f.key;
      const h = s.width * s.height * 4, p = Li(e, t, n), m = Object.freeze({
        kind: "texture/2d-webgpu",
        assetId: e,
        generation: t,
        texture: u,
        view: u.createView({ label: `ForgeNG 2D image view ${e}` }),
        sampler: f.sampler,
        width: s.width,
        height: s.height,
        mipLevels: a,
        policy: n,
        cacheKey: p,
        samplerKey: l,
        logicalBytes: h,
        allocatedBytes: d
      });
      return this.logicalBytes += h, this.allocatedBytes += d, this.uploads += 1, { value: m, references: 0, released: !1 };
    } catch (f) {
      throw l && this.releaseSampler(l), u.destroy(), f;
    }
  }
  async createKtx2Entry(e, t, s, n, r) {
    const o = this.deviceForGeneration(t);
    yt(r, "ktx2-start");
    const a = up(n.format);
    if (a && !o.features.has(a))
      throw new E("R2D_WEBGPU_CAPABILITY_MISSING", "$.device.features", `${a} is required for ${n.format}.`);
    if (s.levels.length === 0 || s.levels.some((h, p) => h.level !== p || h.depth !== 1 || h.layer !== 0 || h.face !== 0))
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded.levels", "KTX2 2D realization requires one ordered 2D face/layer.");
    this.fail("texture-create"), this.validateBytes(s.byteLength);
    const d = o.createTexture({
      label: `ForgeNG 2D KTX2 ${e} generation ${t}`,
      size: { width: s.width, height: s.height, depthOrArrayLayers: 1 },
      format: n.format,
      mipLevelCount: s.levels.length,
      usage: so(n)
    }), u = [];
    let l = !1, f = "";
    try {
      const h = o.createCommandEncoder({ label: `ForgeNG 2D KTX2 upload ${e}` });
      for (const w of s.levels) {
        yt(r, `ktx2-level-${w.level}`), this.fail("staging-create");
        const z = s.copyLevelBytes(w.level);
        if (z.byteLength !== w.byteLength || w.bytesPerRow <= 0 || w.rowsPerImage <= 0)
          throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded.levels", `KTX2 mip ${w.level} layout is invalid.`);
        const O = Math.ceil(w.bytesPerRow / 256) * 256, S = O * w.rowsPerImage, v = o.createBuffer({
          label: `ForgeNG 2D KTX2 staging ${e} mip ${w.level}`,
          size: S,
          usage: np,
          mappedAtCreation: !0
        });
        u.push(v), this.stagingBuffers += 1;
        const I = new Uint8Array(v.getMappedRange());
        for (let x = 0; x < w.rowsPerImage; x += 1)
          I.set(z.subarray(x * w.bytesPerRow, (x + 1) * w.bytesPerRow), x * O);
        v.unmap(), this.fail("staging-copy"), h.copyBufferToTexture(
          { buffer: v, bytesPerRow: O, rowsPerImage: w.rowsPerImage },
          { texture: d, mipLevel: w.level },
          { width: w.width, height: w.height, depthOrArrayLayers: 1 }
        );
      }
      this.fail("texture-upload"), o.queue.submit([h.finish()]), l = !0, this.fail("queue-fence"), await o.queue.onSubmittedWorkDone(), yt(r, "ktx2-fence");
      const p = this.acquireSampler(o, t, n);
      f = p.key;
      const m = s.width * s.height * 4, y = s.byteLength, b = Li(e, t, n), g = Object.freeze({
        kind: "texture/2d-webgpu",
        assetId: e,
        generation: t,
        texture: d,
        view: d.createView({ label: `ForgeNG 2D KTX2 view ${e}` }),
        sampler: p.sampler,
        width: s.width,
        height: s.height,
        mipLevels: s.levels.length,
        policy: n,
        cacheKey: b,
        samplerKey: f,
        logicalBytes: m,
        allocatedBytes: y
      });
      return this.logicalBytes += m, this.allocatedBytes += y, this.uploads += 1, { value: g, references: 0, released: !1 };
    } catch (h) {
      if (l)
        try {
          await o.queue.onSubmittedWorkDone();
        } catch {
        }
      throw f && this.releaseSampler(f), d.destroy(), h;
    } finally {
      for (const h of u)
        h.destroy(), this.stagingBuffers -= 1;
    }
  }
  async generateMips(e, t, s, n, r) {
    this.fail("mip-generation");
    let o = this.mipPipelines.get(s);
    if (!o) {
      const d = e.createShaderModule({ label: `ForgeNG 2D mip shader ${s}`, code: cp });
      o = e.createRenderPipeline({
        label: `ForgeNG 2D mip pipeline ${s}`,
        layout: "auto",
        vertex: { module: d, entryPoint: "vs_mip" },
        fragment: { module: d, entryPoint: "fs_mip", targets: [{ format: s }] },
        primitive: { topology: "triangle-list" }
      }), this.mipPipelines.set(s, o);
    }
    this.mipSampler ?? (this.mipSampler = e.createSampler({ minFilter: "linear", magFilter: "linear" }));
    const a = e.createCommandEncoder({ label: "ForgeNG 2D mip generation" });
    for (let d = 1; d < n; d += 1) {
      yt(r, `mip-${d}`);
      const u = e.createBindGroup({
        layout: o.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: t.createView({ baseMipLevel: d - 1, mipLevelCount: 1 }) },
          { binding: 1, resource: this.mipSampler }
        ]
      }), l = a.beginRenderPass({
        colorAttachments: [{
          view: t.createView({ baseMipLevel: d, mipLevelCount: 1 }),
          loadOp: "clear",
          storeOp: "store",
          clearValue: { r: 0, g: 0, b: 0, a: 0 }
        }]
      });
      l.setPipeline(o), l.setBindGroup(0, u), l.draw(3), l.end();
    }
    e.queue.submit([a.finish()]);
  }
  acquireSampler(e, t, s) {
    const n = ic(t, s.sampler), r = this.samplers.get(n);
    if (r)
      return r.references += 1, { key: n, sampler: r.sampler };
    const o = e.createSampler({ label: `ForgeNG 2D sampler ${n}`, ...s.sampler });
    return this.samplers.set(n, { sampler: o, references: 1 }), { key: n, sampler: o };
  }
  releaseSampler(e) {
    const t = this.samplers.get(e);
    t && (t.references = Math.max(0, t.references - 1), t.references === 0 && this.samplers.delete(e));
  }
  async releaseEntry(e, t) {
    if (!t.released && (t.references = Math.max(0, t.references - 1), !(t.references > 0))) {
      t.released = !0, this.textures.get(e) === t && this.textures.delete(e);
      try {
        await this.deviceForGeneration(t.value.generation).queue.onSubmittedWorkDone();
      } catch {
      }
      t.value.texture.destroy(), this.releaseSampler(t.value.samplerKey), this.logicalBytes -= t.value.logicalBytes, this.allocatedBytes -= t.value.allocatedBytes;
    }
  }
  validateDimensions(e, t) {
    if (!Number.isSafeInteger(e) || !Number.isSafeInteger(t) || e <= 0 || t <= 0 || e > this.maxTextureDimension2d || t > this.maxTextureDimension2d)
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.texture.size", `texture dimensions exceed ${this.maxTextureDimension2d}.`);
  }
  validateBytes(e) {
    if (!Number.isSafeInteger(e) || e < 0 || e > this.maxTextureBytes)
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.texture.bytes", `texture allocation exceeds ${this.maxTextureBytes} bytes.`);
  }
}
function no(i, e) {
  if (i.aborted) throw new E("R2D_WEBGPU_STATE", `$.decode.${e}`, `image decode cancelled: ${String(i.reason)}.`);
}
async function hp(i) {
  if (typeof createImageBitmap != "function")
    throw new E("R2D_WEBGPU_CAPABILITY_MISSING", "$.createImageBitmap", "browser image decoding is unavailable.");
  const e = new Blob([i.bytes.slice().buffer], { type: i.contentType });
  return createImageBitmap(e, { colorSpaceConversion: "none", premultiplyAlpha: "none" });
}
class pp {
  constructor(e, t) {
    c(this, "decodeImage");
    c(this, "fail");
    this.decodeImage = e, this.fail = t;
  }
  async initialize() {
  }
  async decode(e) {
    this.fail("decode-start"), no(e.signal, "start");
    let t = null;
    try {
      if (t = await this.decodeImage(Object.freeze({
        bytes: e.source.bytes.slice(),
        contentType: e.source.contentType ?? e.source.source.contentType ?? e.asset.kind,
        signal: e.signal
      })), no(e.signal, "complete"), this.fail("decode-complete"), !Number.isSafeInteger(t.width) || t.width <= 0 || !Number.isSafeInteger(t.height) || t.height <= 0)
        throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded.image", "decoded image dimensions are invalid.");
      const s = Object.freeze({
        kind: "image/2d-cpu",
        width: t.width,
        height: t.height,
        sourceBytes: e.source.bytes.byteLength,
        image: t
      });
      let n = !1;
      return Object.freeze({
        value: s,
        byteLength: e.source.bytes.byteLength,
        dispose: () => {
          n || (n = !0, t?.close(), t = null);
        }
      });
    } catch (s) {
      throw t?.close(), s;
    }
  }
  async destroy() {
  }
}
function mp(i, e) {
  return Object.freeze({
    id: "forgeng.assets.renderer2d.image-decoder",
    contractVersion: "1.0.0",
    implementationVersion: "0.2.0",
    capabilities: Object.freeze([]),
    kinds: ec,
    create: () => new pp(i ?? hp, e)
  });
}
const Ot = "1.0.0", ro = 1, sc = Object.freeze({
  maxManifests: 64,
  maxAssets: 1e4,
  maxGroups: 1e3,
  maxDependenciesPerAsset: 128,
  maxDependencyDepth: 128,
  maxSourceBytes: 512 * 1024 * 1024,
  maxConcurrentReads: 8,
  maxConcurrentDecodes: 4,
  maxConcurrentRealizations: 4
});
class Ei extends Error {
  constructor(t, s, n) {
    super(s);
    c(this, "code");
    c(this, "operation");
    c(this, "phase");
    c(this, "assetId");
    c(this, "cause");
    this.code = t, this.name = "AssetPipelineError", this.operation = n.operation, this.phase = n.phase, this.assetId = n.assetId, this.cause = n.cause;
  }
}
class gp extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "AssetContractError";
  }
}
const yp = /^[a-z0-9]+(?:[.-][a-z0-9]+)+$/, bp = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, wp = /^[a-z0-9]+(?:[._-][a-z0-9]+)*(?:\/[a-z0-9]+(?:[._-][a-z0-9]+)*)+$/, vp = /^[a-z0-9!#$&^_.+-]+\/[a-z0-9!#$&^_.+-]+$/, Ip = /^(?:sha256|sha384|sha512)-[A-Za-z0-9+/=_-]+$/, oo = 2048, Sp = ["uri", "contentType", "integrity", "expectedBytes", "metadata"], Ep = ["cache", "preload", "priority"];
function Y(i, e, t) {
  throw new gp(i, e, t);
}
function Ap(i) {
  if (typeof i != "object" || i === null || Array.isArray(i))
    return !1;
  const e = Object.getPrototypeOf(i);
  return e === Object.prototype || e === null;
}
function et(i, e, t) {
  Ap(i) || Y(t, e, `${e} must be a plain object.`);
}
function Ai(i, e, t) {
  for (const s of Object.keys(i))
    e.includes(s) || Y("unknown-field", `${t}.${s}`, `${t}.${s} is not supported.`);
}
function nr(i, e, t) {
  (typeof i != "string" || i.length === 0 || i.length > oo || i.trim() !== i) && Y(t, e, `${e} must be a non-empty normalized string of at most ${oo} characters.`);
}
function os(i, e) {
  bp.test(i) || Y("invalid-id", e, `${e} must be a normalized lower-case asset id.`);
}
function nc(i, e) {
  (typeof i != "string" || i.length > 128 || !yp.test(i)) && Y("invalid-namespace", e, `${e} must be a normalized namespaced id.`);
}
function xp(i, e) {
  (typeof i != "string" || i.length > 128 || !wp.test(i)) && Y("invalid-kind", e, `${e} must be a normalized kind with at least one slash.`);
}
function rc(i, e, t) {
  if (e.includes(":")) {
    const s = e.indexOf(":"), n = e.slice(0, s), r = e.slice(s + 1);
    return nc(n, t), os(r, t), `${n}:${r}`;
  }
  return os(e, t), `${i}:${e}`;
}
function An(i, e, t = /* @__PURE__ */ new WeakSet()) {
  if (i === null || typeof i == "string" || typeof i == "boolean")
    return i;
  if (typeof i == "number")
    return Number.isFinite(i) || Y("invalid-json", e, `${e} must contain only finite JSON numbers.`), i;
  typeof i != "object" && Y("invalid-json", e, `${e} must contain only JSON values.`), t.has(i) && Y("invalid-json", e, `${e} must not contain a reference cycle.`), t.add(i);
  let s;
  if (Array.isArray(i))
    s = Object.freeze(i.map((n, r) => An(n, `${e}[${r}]`, t)));
  else {
    et(i, e, "invalid-json");
    const n = {};
    for (const r of Object.keys(i).sort())
      r.length === 0 && Y("invalid-json", e, `${e} must not contain an empty key.`), n[r] = An(i[r], `${e}.${r}`, t);
    s = Object.freeze(n);
  }
  return t.delete(i), s;
}
function as(i, e) {
  return et(i, e, "invalid-json"), An(i, e);
}
function xn(i, e, t) {
  if (i === void 0)
    return Object.freeze([]);
  Array.isArray(i) || Y("manifest-invalid", e, `${e} must be an array.`);
  const s = /* @__PURE__ */ new Set(), n = i.map((r, o) => {
    const a = `${e}[${o}]`;
    nr(r, a, "manifest-invalid");
    const d = t(r, a);
    return s.has(d) && Y("duplicate-value", a, `${a} duplicates "${d}".`), s.add(d), d;
  });
  return Object.freeze(n);
}
function _p(i, e, t) {
  et(i, e, "invalid-source"), Ai(i, Sp, e), nr(i.uri, `${e}.uri`, "invalid-source"), /[\u0000-\u001f\\]/.test(i.uri) && Y("invalid-source", `${e}.uri`, `${e}.uri contains forbidden characters.`);
  const s = i.contentType, n = i.integrity, r = i.expectedBytes;
  return s !== void 0 && (typeof s != "string" || !vp.test(s)) && Y("invalid-source", `${e}.contentType`, `${e}.contentType must be a normalized media type.`), n !== void 0 && (typeof n != "string" || !Ip.test(n)) && Y("invalid-source", `${e}.integrity`, `${e}.integrity must be an SRI sha256, sha384, or sha512 value.`), r !== void 0 && ((!Number.isSafeInteger(r) || r < 0) && Y("invalid-source", `${e}.expectedBytes`, `${e}.expectedBytes must be a non-negative safe integer.`), r > t.maxSourceBytes && Y("limit-exceeded", `${e}.expectedBytes`, `${e}.expectedBytes exceeds maxSourceBytes.`)), Object.freeze({
    uri: i.uri,
    ...s === void 0 ? {} : { contentType: s },
    ...n === void 0 ? {} : { integrity: n },
    ...r === void 0 ? {} : { expectedBytes: r },
    ...i.metadata === void 0 ? {} : { metadata: as(i.metadata, `${e}.metadata`) }
  });
}
function $p(i, e) {
  if (i === void 0)
    return Object.freeze({ cache: "release-when-unused", preload: "none", priority: 0 });
  et(i, e, "invalid-policy"), Ai(i, Ep, e);
  const t = i.cache ?? "release-when-unused", s = i.preload ?? "none", n = i.priority ?? 0;
  return (typeof t != "string" || !["release-when-unused", "retain", "pinned"].includes(t)) && Y("invalid-policy", `${e}.cache`, `${e}.cache is invalid.`), (typeof s != "string" || !["none", "boot"].includes(s)) && Y("invalid-policy", `${e}.preload`, `${e}.preload is invalid.`), (!Number.isSafeInteger(n) || n < -1e3 || n > 1e3) && Y("invalid-policy", `${e}.priority`, `${e}.priority must be an integer from -1000 to 1000.`), Object.freeze({
    cache: t,
    preload: s,
    priority: n
  });
}
const zp = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, Op = ["version", "namespace", "assets", "groups", "metadata"], Dp = ["kind", "source", "dependencies", "tags", "label", "options", "policy", "metadata"], ao = Object.keys(sc);
function Cp(i, e, t, s, n) {
  et(i, s, "manifest-invalid"), Ai(i, Dp, s), xp(i.kind, `${s}.kind`);
  const r = xn(i.dependencies, `${s}.dependencies`, (a, d) => rc(e, a, d));
  r.length > n.maxDependenciesPerAsset && Y("limit-exceeded", `${s}.dependencies`, `${s}.dependencies exceeds maxDependenciesPerAsset.`);
  const o = xn(i.tags, `${s}.tags`, (a, d) => (zp.test(a) || Y("invalid-id", d, `${d} must be a normalized lower-case tag.`), a));
  return i.label !== void 0 && nr(i.label, `${s}.label`, "manifest-invalid"), Object.freeze({
    id: `${e}:${t}`,
    localId: t,
    kind: i.kind,
    source: _p(i.source, `${s}.source`, n),
    dependencies: r,
    tags: o,
    ...i.label === void 0 ? {} : { label: i.label },
    ...i.options === void 0 ? {} : { options: as(i.options, `${s}.options`) },
    policy: $p(i.policy, `${s}.policy`),
    ...i.metadata === void 0 ? {} : { metadata: as(i.metadata, `${s}.metadata`) }
  });
}
function Np(i, e, t) {
  et(i, e, "manifest-invalid"), Ai(i, Op, e), i.version !== ro && Y("invalid-version", `${e}.version`, `${e}.version must be 1.`), nc(i.namespace, `${e}.namespace`), et(i.assets, `${e}.assets`, "manifest-invalid");
  const n = Object.entries(i.assets).sort(([a], [d]) => a.localeCompare(d)).map(([a, d]) => (os(a, `${e}.assets.${a}`), Cp(d, i.namespace, a, `${e}.assets.${a}`, t))), r = i.groups ?? {};
  et(r, `${e}.groups`, "manifest-invalid");
  const o = Object.entries(r).sort(([a], [d]) => a.localeCompare(d)).map(([a, d]) => (os(a, `${e}.groups.${a}`), Object.freeze({
    id: `${i.namespace}:${a}`,
    localId: a,
    assets: xn(d, `${e}.groups.${a}`, (u, l) => rc(i.namespace, u, l))
  })));
  return Object.freeze({
    version: ro,
    namespace: i.namespace,
    assets: Object.freeze(n),
    groups: Object.freeze(o),
    ...i.metadata === void 0 ? {} : { metadata: as(i.metadata, `${e}.metadata`) }
  });
}
function _n(i = {}) {
  et(i, "limits", "invalid-limits"), Ai(i, ao, "limits");
  const e = { ...sc, ...i };
  for (const t of ao)
    (!Number.isSafeInteger(e[t]) || e[t] <= 0) && Y("invalid-limits", `limits.${t}`, `limits.${t} must be a positive safe integer.`);
  return Object.freeze(e);
}
function kp(i, e = {}) {
  Array.isArray(i) || Y("manifest-invalid", "manifests", "manifests must be an array.");
  const t = _n(e);
  i.length > t.maxManifests && Y("limit-exceeded", "manifests", "manifests exceeds maxManifests.");
  const s = i.map((f, h) => Np(f, `manifests[${h}]`, t)), n = [], r = [], o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
  for (const f of s) {
    for (const h of f.assets)
      o.has(h.id) && Y("duplicate-asset", h.id, `Asset "${h.id}" is declared more than once.`), o.set(h.id, h), n.push(h);
    for (const h of f.groups)
      a.has(h.id) && Y("duplicate-group", h.id, `Asset group "${h.id}" is declared more than once.`), a.add(h.id), r.push(h);
  }
  n.length > t.maxAssets && Y("limit-exceeded", "manifests.assets", "Asset count exceeds maxAssets."), r.length > t.maxGroups && Y("limit-exceeded", "manifests.groups", "Asset group count exceeds maxGroups.");
  for (const f of n)
    for (const h of f.dependencies)
      o.has(h) || Y("missing-dependency", f.id, `Asset "${f.id}" depends on missing asset "${h}".`);
  for (const f of r)
    for (const h of f.assets)
      o.has(h) || Y("missing-group-asset", f.id, `Asset group "${f.id}" references missing asset "${h}".`);
  const d = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), l = (f, h) => {
    if (d.has(f) && Y("dependency-cycle", f, `Asset dependency cycle: ${[...h, f].join(" -> ")}.`), !u.has(f)) {
      h.length >= t.maxDependencyDepth && Y("limit-exceeded", f, "Asset dependency depth exceeds maxDependencyDepth."), d.add(f);
      for (const p of o.get(f)?.dependencies ?? [])
        l(p, [...h, f]);
      d.delete(f), u.add(f);
    }
  };
  for (const f of n)
    l(f.id, []);
  return Object.freeze({
    manifests: Object.freeze(s),
    assets: Object.freeze(n),
    groups: Object.freeze(r)
  });
}
const cs = Object.freeze({
  sourceRangeReads: "source.range-reads",
  sourceIntegrity: "source.integrity",
  decoderDependencies: "decoder.dependencies",
  realizerRecovery: "realizer.recovery"
});
class Rp extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "AssetProviderContractError";
  }
}
const Pp = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, jp = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, Tp = /^[a-z0-9]+(?:[._-][a-z0-9]+)*(?:\/[a-z0-9]+(?:[._-][a-z0-9]+)*)+$/, oc = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/, ac = ["id", "contractVersion", "implementationVersion", "capabilities", "create"], cc = [...ac, "kinds"];
function we(i, e, t) {
  throw new Rp(i, e, t);
}
function rr(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function dc(i, e, t) {
  for (const s of Object.keys(i))
    e.includes(s) || we("unknown-field", `${t}.${s}`, `${t}.${s} is not supported.`);
}
function Lp(i, e) {
  Array.isArray(i) || we("invalid-capability", e, `${e} must be an array.`);
  const t = /* @__PURE__ */ new Set();
  return Object.freeze(i.map((s, n) => {
    const r = `${e}[${n}]`;
    return rr(s) || we("invalid-capability", r, `${r} must be an object.`), dc(s, ["id", "version"], r), (typeof s.id != "string" || !jp.test(s.id)) && we("invalid-capability", `${r}.id`, `${r}.id must be normalized.`), (typeof s.version != "string" || !oc.test(s.version)) && we("invalid-capability", `${r}.version`, `${r}.version must be semantic.`), t.has(s.id) && we("duplicate-capability", `${r}.id`, `Capability "${s.id}" is duplicated.`), t.add(s.id), Object.freeze({ id: s.id, version: s.version });
  }));
}
function or(i, e) {
  return rr(i) || we("invalid-descriptor", "descriptor", "Asset descriptor must be an object."), dc(i, e, "descriptor"), (typeof i.id != "string" || !Pp.test(i.id)) && we("invalid-provider-id", "descriptor.id", "Asset descriptor id must be normalized and namespaced."), i.contractVersion !== Ot && we("incompatible-contract-version", "descriptor.contractVersion", `Expected asset contract ${Ot}.`), (typeof i.implementationVersion != "string" || !oc.test(i.implementationVersion)) && we("invalid-implementation-version", "descriptor.implementationVersion", "implementationVersion must be semantic."), typeof i.create != "function" && we("invalid-factory", "descriptor.create", "Descriptor must define create()."), { value: i, capabilities: Lp(i.capabilities, "descriptor.capabilities") };
}
function lc(i) {
  (!Array.isArray(i) || i.length === 0) && we("invalid-kind", "descriptor.kinds", "descriptor.kinds must be non-empty.");
  const e = /* @__PURE__ */ new Set();
  return Object.freeze(i.map((t, s) => {
    const n = `descriptor.kinds[${s}]`;
    return (typeof t != "string" || !Tp.test(t)) && we("invalid-kind", n, `${n} must be a normalized asset kind.`), e.has(t) && we("duplicate-kind", n, `Asset kind "${t}" is duplicated.`), e.add(t), t;
  }));
}
function Mp(i) {
  const e = or(i, ac);
  return Object.freeze({
    id: e.value.id,
    contractVersion: Ot,
    implementationVersion: e.value.implementationVersion,
    capabilities: e.capabilities,
    create: e.value.create
  });
}
function Vp(i) {
  const e = or(i, cc);
  return Object.freeze({
    id: e.value.id,
    contractVersion: Ot,
    implementationVersion: e.value.implementationVersion,
    capabilities: e.capabilities,
    kinds: lc(e.value.kinds),
    create: e.value.create
  });
}
function Gp(i) {
  const e = or(i, cc);
  return Object.freeze({
    id: e.value.id,
    contractVersion: Ot,
    implementationVersion: e.value.implementationVersion,
    capabilities: e.capabilities,
    kinds: lc(e.value.kinds),
    create: e.value.create
  });
}
function ar(i, e, t, s) {
  (!rr(i) || e.some((n) => typeof i[n] != "function")) && we(t, s, `${s} must implement ${e.join(", ")}.`);
}
function Fp(i) {
  return ar(i, ["initialize", "resolve", "read", "destroy"], "invalid-provider-instance", "provider"), i;
}
function Bp(i) {
  return ar(i, ["initialize", "decode", "destroy"], "invalid-decoder-instance", "decoder"), i;
}
function Up(i) {
  return ar(i, ["initialize", "realize", "destroy"], "invalid-realizer-instance", "realizer"), i;
}
function Bs(i, e, t) {
  return Object.freeze({
    id: i,
    contractVersion: "1.0.0",
    implementationVersion: "0.2.0",
    capabilities: Object.freeze([Object.freeze({ id: cs.realizerRecovery, version: "1.0.0" })]),
    kinds: Object.freeze([...e]),
    create: t
  });
}
function Wp(i) {
  const e = i;
  if (!e || e.kind !== "image/2d-cpu" || !e.image || !Number.isSafeInteger(e.width) || !Number.isSafeInteger(e.height))
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded", "image realizer requires a qualified immutable 2D image product.");
  return e;
}
function Yp(i) {
  const e = i;
  if (!e || typeof e.target != "string" || typeof e.copyLevelBytes != "function" || !Array.isArray(e.levels) || !Number.isSafeInteger(e.width) || !Number.isSafeInteger(e.height))
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded", "KTX2 realizer requires the deferred KTX2 CPU product.");
  return e;
}
function qp(i) {
  const e = i;
  if (!e || e.kind !== "sprite/atlas" || e.normalizationVersion !== 1 || !Array.isArray(e.frames) || !e.image)
    throw new E("R2D_WEBGPU_SCENE_INVALID", "$.decoded", "atlas realizer requires SpriteAtlasProduct normalization v1.");
  return e;
}
function Kp(i) {
  return i.options?.textureOptional === !0;
}
class Hp {
  constructor(e) {
    c(this, "owner");
    this.owner = e, e.retainAdapter();
  }
  async initialize() {
  }
  async realize(e) {
    this.owner.fail("policy");
    const t = tp(e.asset), s = await this.owner.acquireImage(e.asset.id, e.generation, Wp(e.decoded), t, e.signal);
    try {
      return this.owner.fail("commit"), Object.freeze({
        value: s.value,
        byteLength: s.value.allocatedBytes,
        generation: e.generation,
        inspection: Object.freeze({
          category: "2d.texture",
          logicalBytes: s.value.logicalBytes,
          allocatedBytes: s.value.allocatedBytes,
          format: s.value.policy.format,
          colorSpace: s.value.policy.colorSpace,
          alphaMode: s.value.policy.alphaMode,
          mipLevels: s.value.mipLevels,
          dependencyIds: Object.freeze([])
        }),
        dispose: () => s.release()
      });
    } catch (n) {
      throw await s.release(), n;
    }
  }
  destroy() {
    return this.owner.releaseAdapter();
  }
}
class Xp {
  constructor(e) {
    c(this, "owner");
    this.owner = e, e.retainAdapter();
  }
  async initialize() {
  }
  async realize(e) {
    const t = Yp(e.decoded);
    this.owner.fail("policy");
    const s = sp(e.asset, t), n = await this.owner.acquireKtx2(e.asset.id, e.generation, t, s, e.signal);
    try {
      return this.owner.fail("commit"), Object.freeze({
        value: n.value,
        byteLength: n.value.allocatedBytes,
        generation: e.generation,
        inspection: Object.freeze({
          category: "2d.texture-compressed",
          logicalBytes: n.value.logicalBytes,
          allocatedBytes: n.value.allocatedBytes,
          format: n.value.policy.format,
          colorSpace: n.value.policy.colorSpace,
          alphaMode: n.value.policy.alphaMode,
          mipLevels: n.value.mipLevels,
          dependencyIds: Object.freeze([])
        }),
        dispose: () => n.release()
      });
    } catch (r) {
      throw await n.release(), r;
    }
  }
  destroy() {
    return this.owner.releaseAdapter();
  }
}
class Jp {
  constructor(e) {
    c(this, "owner");
    this.owner = e, e.retainAdapter();
  }
  async initialize() {
  }
  async realize(e) {
    this.owner.fail("atlas");
    const t = qp(e.decoded), s = t.image.assetId ?? null, r = s === null ? void 0 : e.dependencies[s];
    if (r && (r.kind !== "texture/2d-webgpu" || r.generation !== e.generation))
      throw new E("R2D_WEBGPU_STALE_GENERATION", "$.dependencies", "atlas texture belongs to another GPU generation.");
    if (r && (r.width !== t.width || r.height !== t.height))
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.dependencies", "atlas metadata dimensions do not match its realized texture.");
    if (!r && !Kp(e.asset))
      throw new E("R2D_WEBGPU_SCENE_INVALID", "$.dependencies", "required atlas texture dependency is unavailable.");
    const o = Object.freeze(t.frames.map((d) => Object.freeze({
      ...d,
      uv: Object.freeze([
        d.x / t.width,
        d.y / t.height,
        d.width / t.width,
        d.height / t.height
      ])
    }))), a = Object.freeze({
      kind: "sprite/atlas-webgpu",
      assetId: e.asset.id,
      generation: e.generation,
      width: t.width,
      height: t.height,
      textureAssetId: s,
      texture: r ?? null,
      fallback: r === void 0,
      frames: o
    });
    return this.owner.fail("commit"), Object.freeze({
      value: a,
      byteLength: 0,
      generation: e.generation,
      inspection: Object.freeze({
        category: "2d.atlas",
        logicalBytes: t.sourceBytes,
        allocatedBytes: 0,
        dependencyIds: Object.freeze(s === null ? [] : [s])
      })
    });
  }
  destroy() {
    return this.owner.releaseAdapter();
  }
}
function Qp(i) {
  return Object.freeze([
    Bs("forgeng.assets.renderer2d.image-realizer", ec, () => new Hp(i)),
    Bs("forgeng.assets.renderer2d.ktx2-realizer", [Xh], () => new Xp(i)),
    Bs("forgeng.assets.renderer2d.atlas-realizer", [Jh], () => new Jp(i))
  ]);
}
function Zp(i) {
  const e = i.failAt;
  return new Set(e === void 0 ? [] : Array.isArray(e) ? e : [e]);
}
function em(i) {
  const e = Zp(i), t = new fp(
    i.deviceForGeneration,
    i.maxTextureDimension2d ?? 16384,
    i.maxTextureBytes ?? 512 * 1024 * 1024,
    e,
    i.onStage
  ), s = (o) => t.fail(o), n = Object.freeze([mp(i.decodeImage, s)]), r = Qp(t);
  return Object.freeze({
    decoders: n,
    realizers: r,
    inspect: () => t.inspect(),
    destroy: () => t.destroy()
  });
}
function tm(i, e) {
  return new Map(e.map((t) => [t, {
    value: i.getPropertyValue(t),
    priority: i.getPropertyPriority(t)
  }]));
}
function im(i, e) {
  for (const [t, s] of e)
    s.value ? i.setProperty(t, s.value, s.priority) : i.removeProperty(t);
}
function sm(i, e, t) {
  const s = [];
  return i.style.display || (i.style.display = "block", s.push("display")), i.style.width || (i.style.width = `${e}px`, s.push("width")), i.style.height || (i.style.height = `${t}px`, s.push("height")), s;
}
const uc = ["display", "box-sizing", "width", "height"], nm = [
  ...uc,
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left"
];
function rm(i, e) {
  const t = e.mode === "viewport" ? nm : e.mode === "container" ? uc : ["display", "width", "height"], s = tm(i.style, t);
  e.mode === "fixed" ? sm(i, e.width, e.height) : (i.style.display = "block", i.style.boxSizing = "border-box", i.style.width = "100%", i.style.height = "100%", e.mode === "viewport" && (i.style.position = "fixed", i.style.top = "0", i.style.right = "0", i.style.bottom = "0", i.style.left = "0", i.style.marginTop = "0", i.style.marginRight = "0", i.style.marginBottom = "0", i.style.marginLeft = "0"));
  let n = !1;
  return {
    release() {
      n || (n = !0, im(i.style, s));
    }
  };
}
function om(i, e) {
  if (i instanceof HTMLCanvasElement) return i;
  const t = i ?? e;
  if (typeof t == "string" && t.length > 0) {
    const r = t.startsWith("#") ? document.querySelector(t) : document.getElementById(t);
    if (r instanceof HTMLCanvasElement) return r;
    throw new Error(`ForgEng canvas target "${t}" was not found or is not a canvas.`);
  }
  const s = document.getElementById("game-canvas") ?? document.querySelector("canvas");
  if (s instanceof HTMLCanvasElement) return s;
  const n = document.createElement("canvas");
  return n.id = "game-canvas", document.body.appendChild(n), n;
}
function am(i, e) {
  const t = Math.max(1, Math.floor(i.clientWidth || e.width || window.innerWidth || 1280)), s = Math.max(1, Math.floor(i.clientHeight || e.height || window.innerHeight || 720)), n = e.pixelRatio ?? 1, r = n === 0 ? window.devicePixelRatio || 1 : n, o = Math.max(0.1, Math.min(r, e.maxPixelRatio)), a = Math.max(1, Math.floor(t * o)), d = Math.max(1, Math.floor(s * o));
  return i.width !== a && (i.width = a), i.height !== d && (i.height = d), { width: a, height: d, pixelRatio: o };
}
function fc(i, e) {
  const t = globalThis.AggregateError;
  if (t)
    return new t(i, e);
  const s = new Error(e);
  return s.name = "AggregateError", s.errors = [...i], s;
}
function hc(i) {
  return i instanceof Error && i.name === "AggregateError" && Array.isArray(i.errors) ? i.errors : [i];
}
class cm {
  constructor(e) {
    c(this, "entry");
    this.entry = e;
  }
  get disposed() {
    return !this.entry.active;
  }
  dispose() {
    return this.entry.disposePromise ? this.entry.disposePromise : (this.entry.active = !1, this.entry.disposePromise = Promise.resolve().then(() => this.entry.disposer()), this.entry.disposePromise);
  }
}
class fe {
  constructor() {
    c(this, "entries", []);
    c(this, "state", "open");
    c(this, "disposePromise", null);
  }
  get disposed() {
    return this.state === "disposed";
  }
  defer(e) {
    if (this.state !== "open")
      throw new Error(`Cannot register a resource in a ${this.state} ResourceScope.`);
    if (typeof e != "function")
      throw new TypeError("Resource disposer must be a function.");
    const t = { active: !0, disposePromise: null, disposer: e }, s = new cm(t);
    return this.entries.push(s), s;
  }
  dispose() {
    return this.disposePromise || (this.disposePromise = this.disposeEntries()), this.disposePromise;
  }
  async disposeEntries() {
    this.state = "disposing";
    const e = [];
    for (let t = this.entries.length - 1; t >= 0; t -= 1)
      try {
        await this.entries[t].dispose();
      } catch (s) {
        e.push(...hc(s));
      }
    if (this.entries.length = 0, this.state = "disposed", e.length > 0)
      throw fc(e, "ResourceScope disposal failed.");
  }
}
async function pc(i) {
  const e = new fe();
  try {
    return { value: await i(e), scope: e };
  } catch (t) {
    try {
      await e.dispose();
    } catch (s) {
      throw fc([t, ...hc(s)], "Scoped initialization failed and rollback reported errors.");
    }
    throw t;
  }
}
function ds(i) {
  if (i instanceof Error && i.name === "AggregateError") {
    const e = i.errors;
    if (Array.isArray(e))
      return e.flatMap(ds);
  }
  return [i];
}
function mc(i, e) {
  const t = globalThis.AggregateError;
  if (t)
    return new t(i, e);
  const s = new Error(e);
  return s.name = "AggregateError", s.errors = [...i], s;
}
function ls(i, e, t) {
  return mc([...ds(i), ...ds(e)], t);
}
class dm {
  constructor() {
    c(this, "errors", []);
  }
  run(e) {
    try {
      e();
    } catch (t) {
      this.errors.push(...ds(t));
    }
  }
  finish(e) {
    if (this.errors.length > 0)
      throw mc(this.errors, e);
  }
}
function lm(i, e) {
  const t = new dm();
  for (const s of i)
    t.run(s);
  t.finish(e);
}
class um extends Error {
  constructor(t) {
    super("Neutral lifetime was aborted.");
    c(this, "reason");
    c(this, "code", "NEUTRAL_LIFETIME_ABORTED");
    this.reason = t, this.name = "NeutralLifetimeAbortError";
  }
}
class fm {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Set());
    c(this, "aborted", !1);
    c(this, "reason");
  }
  throwIfAborted() {
    if (this.aborted)
      throw this.reason instanceof Error ? this.reason : new um(this.reason);
  }
  subscribe(e) {
    return this.aborted ? (e(this.reason), () => {
    }) : (this.listeners.add(e), () => this.listeners.delete(e));
  }
  abort(e) {
    if (!this.aborted) {
      this.aborted = !0, this.reason = e;
      for (const t of this.listeners)
        t(e);
      this.listeners.clear();
    }
  }
}
class gc {
  constructor() {
    c(this, "implementation", new fm());
    c(this, "signal", this.implementation);
  }
  abort(e) {
    this.implementation.abort(e);
  }
}
class hm {
  constructor(e, t, s, n) {
    c(this, "slot");
    c(this, "value");
    c(this, "disposer");
    c(this, "onRelease");
    c(this, "releasePromise", null);
    this.slot = e, this.value = t, this.disposer = s, this.onRelease = n;
  }
  get released() {
    return this.releasePromise !== null;
  }
  release() {
    return this.releasePromise ?? (this.releasePromise = Promise.resolve().then(() => this.disposer()).finally(this.onRelease)), this.releasePromise;
  }
}
class pm {
  constructor() {
    c(this, "slots", /* @__PURE__ */ new Map());
    c(this, "acquisitionOrder", []);
    c(this, "destroyPromise", null);
  }
  retain(e, t, s) {
    if (!e.trim())
      throw new TypeError("Provider slot must be a non-empty string.");
    if (this.destroyPromise)
      throw new Error("Cannot retain a provider in a destroyed provider host.");
    if (this.slots.has(e))
      throw new Error(`Provider slot "${e}" is already occupied.`);
    const n = new hm(e, t, s, () => this.slots.delete(e));
    return this.slots.set(e, n), this.acquisitionOrder.push(n), n;
  }
  has(e) {
    return this.slots.has(e);
  }
  get(e) {
    return this.slots.get(e)?.value;
  }
  destroy() {
    return this.destroyPromise ?? (this.destroyPromise = this.destroyRetainedProviders()), this.destroyPromise;
  }
  async destroyRetainedProviders() {
    const e = new fe();
    for (const t of this.acquisitionOrder)
      t.released || e.defer(() => t.release());
    try {
      await e.dispose();
    } finally {
      this.acquisitionOrder.length = 0;
    }
  }
}
function jt(i, e, t) {
  return {
    metadata: { ...e, ...i?.metadata ?? {}, ...t },
    ...i && "error" in i ? { error: i.error } : {}
  };
}
function Ct(i, e = {}, t = {}) {
  return Object.freeze({
    trace: (n, r) => i.trace(n, jt(r, t, e)),
    debug: (n, r) => i.debug(n, jt(r, t, e)),
    info: (n, r) => i.info(n, jt(r, t, e)),
    warn: (n, r) => i.warn(n, jt(r, t, e)),
    error: (n, r) => i.error(n, jt(r, t, e)),
    fatal: (n, r) => i.fatal(n, jt(r, t, e)),
    child: (n, r = {}) => Ct(
      i.child(n),
      e,
      { ...t, ...r }
    )
  });
}
function mm(i, e) {
  const t = i.get(e.id);
  if (!t) throw new Error(`Missing runtime context for ForgEng plugin "${e.id}".`);
  return t;
}
async function gm(i, e, t) {
  for (const s of i)
    await s.install(mm(e, s)), t?.(s);
}
class ym {
  constructor(e) {
    c(this, "scope");
    c(this, "state", 0);
    c(this, "destroyPromise", null);
    c(this, "retainedPlugins", /* @__PURE__ */ new Set());
    c(this, "providerHost", new pm());
    this.scope = e, this.scope.defer(() => this.providerHost.destroy());
  }
  get destroyed() {
    return this.state >= 2;
  }
  retainCanvasLayout(e) {
    this.scope.defer(() => e.release());
  }
  retainLogging(e) {
    this.scope.defer(() => e.flush());
  }
  retainEngine(e) {
    this.scope.defer(() => e.destroy());
  }
  retainPresentation(e) {
    this.scope.defer(() => e.destroy());
  }
  retainSurfaceHost(e) {
    this.scope.defer(() => e.destroy());
  }
  retainInspection(e) {
    this.scope.defer(() => e.destroy());
  }
  retainPhysicsProvider(e) {
    this.retainProvider("physics", e);
  }
  retainUiShell(e) {
    this.retainProvider("ui", e);
  }
  retainInputProvider(e) {
    this.retainProvider("input", e);
  }
  retainInputActions(e) {
    this.scope.defer(() => e.destroy());
  }
  retainStorageProvider(e) {
    this.retainProvider("storage", e);
  }
  retainAssetRuntime(e) {
    this.retainProvider("assets", e);
  }
  retainAssetUiDiagnostics(e) {
    this.scope.defer(() => e.dispose());
  }
  retainProvider(e, t) {
    const s = this.providerHost.retain(e, t, () => t.destroy());
    this.scope.defer(() => s.release());
  }
  retainPlugin(e) {
    this.retainedPlugins.has(e) || (this.retainedPlugins.add(e), this.scope.defer(() => e.destroy?.()));
  }
  async installPlugins(e, t) {
    await gm(e, t, (s) => this.retainPlugin(s));
  }
  observeResize(e, t) {
    this.scope.defer(() => e.disconnect()), e.observe(t);
  }
  listenForResize(e, t) {
    e.addEventListener("resize", t), this.scope.defer(() => e.removeEventListener("resize", t));
  }
  retainLoop(e) {
    this.scope.defer(() => e.stopAndDrain());
  }
  completeInitialization() {
    if (this.state !== 0)
      throw new Error("Invalid lifecycle");
    this.state = 1;
  }
  destroy() {
    return this.destroyPromise ?? (this.state = 2, this.destroyPromise = this.disposeScope());
  }
  disposeScope() {
    return this.scope.dispose().finally(() => {
      this.state = 3;
    });
  }
}
async function bm(i) {
  return (await pc(async (t) => {
    const s = new ym(t), n = await i(s);
    return s.completeInitialization(), n;
  })).value;
}
const co = 2, wm = "forgeng.plugin:render-2d";
function vm(i, e = "$") {
  if (typeof i != "object" || i === null || Array.isArray(i))
    throw new Ee("SCENE_VALUE_INVALID", e, "expected a plugin descriptor object.");
  const t = i;
  if (t.apiVersion !== co)
    throw new Ee("SCENE_VERSION_UNSUPPORTED", `${e}.apiVersion`, "expected 2.");
  if (yn(t.id, `${e}.id`), typeof t.initialize != "function")
    throw new Ee("SCENE_FACTORY_INVALID", `${e}.initialize`, "expected a function.");
  const s = t.capabilities === void 0 ? [] : t.capabilities;
  if (!Array.isArray(s))
    throw new Ee("SCENE_VALUE_INVALID", `${e}.capabilities`, "expected an array.");
  const n = s.map((r, o) => {
    if (typeof r != "object" || r === null || Array.isArray(r))
      throw new Ee("SCENE_VALUE_INVALID", `${e}.capabilities[${o}]`, "expected an object.");
    const a = r;
    if (yn(a.id, `${e}.capabilities[${o}].id`), a.optional !== void 0 && typeof a.optional != "boolean")
      throw new Ee("SCENE_VALUE_INVALID", `${e}.capabilities[${o}].optional`, "expected a boolean.");
    return Object.freeze({ id: a.id, ...a.optional === void 0 ? {} : { optional: a.optional } });
  });
  return Object.freeze({
    apiVersion: co,
    id: t.id,
    capabilities: Object.freeze(n),
    initialize: t.initialize,
    ...typeof t.fixedUpdate == "function" ? { fixedUpdate: t.fixedUpdate } : {},
    ...typeof t.frameUpdate == "function" ? { frameUpdate: t.frameUpdate } : {},
    ...typeof t.destroy == "function" ? { destroy: t.destroy } : {}
  });
}
class Im {
  constructor(e, t) {
    c(this, "descriptor");
    c(this, "surface");
    c(this, "generation", 0);
    c(this, "state", "created");
    c(this, "runtime", null);
    c(this, "initializePromise", null);
    c(this, "destroyPromise", null);
    this.descriptor = e, this.surface = t;
  }
  async initialize() {
    if (this.state !== "ready") {
      if (this.initializePromise)
        return this.initializePromise;
      if (this.state !== "created")
        throw this.stateError("initialize");
      return this.initializePromise = this.createGeneration(), this.initializePromise;
    }
  }
  resize(e) {
    this.assertReady("resize"), this.surface = e, this.runtime.resize(e);
  }
  beginFrame(e) {
    return this.assertReady("begin a frame"), this.runtime.beginFrame(e);
  }
  submit(e) {
    this.assertReady("submit"), this.runtime.submit(e);
  }
  present() {
    this.assertReady("present"), this.runtime.present();
  }
  getInterop() {
    return this.assertReady("read backend interop"), this.runtime?.getInterop?.();
  }
  async recover() {
    if (this.state !== "ready" && this.state !== "lost" && this.state !== "failed")
      throw this.stateError("recover");
    this.state = "recovering";
    const e = this.runtime;
    this.runtime = null;
    try {
      await e?.destroy(), await this.createGeneration();
    } catch (t) {
      throw this.state = "failed", t;
    }
  }
  markLost() {
    this.assertReady("mark lost"), this.state = "lost";
  }
  getGeneration() {
    return this.generation;
  }
  getSnapshot() {
    return Object.freeze({
      snapshotVersion: 1,
      id: this.descriptor.id,
      generation: this.generation,
      state: this.state,
      capabilities: this.descriptor.capabilities
    });
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async createGeneration() {
    this.state = "initializing";
    const e = this.generation + 1, t = await this.descriptor.create({ generation: e, surface: this.surface });
    let s = !1;
    try {
      if (await t.initialize(), t.resize(this.surface), this.destroyPromise)
        throw await t.destroy(), s = !0, this.stateError("commit an initialized generation");
    } catch (n) {
      throw s || await Promise.resolve(t.destroy()).catch(() => {
      }), this.state = "failed", n;
    }
    this.runtime = t, this.generation = e, this.state = "ready";
  }
  async destroyInternal() {
    if (this.state === "destroyed")
      return;
    this.state = "destroying", this.initializePromise && await this.initializePromise.catch(() => {
    });
    const e = this.runtime;
    this.runtime = null;
    try {
      await e?.destroy();
    } finally {
      this.state = "destroyed";
    }
  }
  assertReady(e) {
    if (this.state !== "ready")
      throw this.stateError(e);
  }
  stateError(e) {
    const t = new Error(`Cannot ${e} while graphics backend is ${this.state}.`);
    return t.name = "GraphicsBackendLifecycleError", Object.assign(t, { code: "RC_STATE_INVALID", state: this.state });
  }
}
function cr(i, e) {
  const t = i.descriptor.attachment?.sceneIds ?? [];
  return t.length === 0 || e !== null && t.includes(e);
}
function $n(i, e) {
  return i.enabled && cr(i, e) ? e : null;
}
function Mi(i, e) {
  return i.state === "ready" && i.enabled && cr(i, e);
}
async function Sm(i, e, t) {
  const s = [];
  try {
    for (const n of i) {
      if (n.state !== "ready" || !n.runtime?.switchScene)
        continue;
      const r = $n(n, e), o = $n(n, t);
      r !== o && await n.runtime.switchScene(o), n.sceneAttached = o !== null, s.push({ owner: n, previousTarget: r });
    }
  } catch (n) {
    for (const r of s.reverse())
      await Promise.resolve(r.owner.runtime?.switchScene?.(r.previousTarget)).catch(() => {
      }), r.owner.sceneAttached = r.previousTarget !== null;
    throw n;
  }
}
async function Em(i, e, t, s) {
  const n = i.find((o) => o.descriptor.id === t);
  if (!n)
    throw Object.assign(new Error(`Unknown render domain "${t}".`), { code: "RC_DOMAIN_MISSING" });
  if (n.failureCode && n.state === "disabled")
    throw Object.assign(new Error(`Failed render domain "${t}" cannot be re-enabled before recovery.`), { code: n.failureCode });
  if (n.enabled === s)
    return;
  const r = s && cr(n, e) ? e : null;
  await n.runtime?.switchScene?.(r), n.enabled = s, n.sceneAttached = r !== null;
}
function bt(i, e) {
  const t = new Error(e);
  return t.name = "AggregateError", t.errors = Object.freeze([...i]), t;
}
const lo = /* @__PURE__ */ new WeakSet();
function Tt(i) {
  return typeof i == "object" && i !== null && "code" in i ? String(i.code) : "RC_RUNTIME_FAILURE";
}
class Am {
  constructor(e, t) {
    c(this, "surface");
    c(this, "descriptor");
    c(this, "backend");
    c(this, "domains");
    c(this, "state", "created");
    c(this, "frame", 0);
    c(this, "presentations", 0);
    c(this, "sceneId", null);
    c(this, "destroyPromise", null);
    c(this, "initializePromise", null);
    this.surface = t, this.descriptor = vu(e), this.backend = new Im(this.descriptor.backend, t), this.domains = this.descriptor.domains.map((s) => ({
      descriptor: s,
      runtime: null,
      state: "created",
      enabled: s.attachment?.enabledByDefault ?? !0,
      sceneAttached: !1
    }));
  }
  async initialize() {
    if (this.state !== "ready") {
      if (this.initializePromise)
        return this.initializePromise;
      if (this.state !== "created")
        throw this.stateError("initialize");
      return this.initializePromise = this.initializeInternal(), this.initializePromise;
    }
  }
  async initializeInternal() {
    this.state = "initializing";
    try {
      await this.backend.initialize(), await this.attachDomains(), this.state = "ready";
    } catch (e) {
      this.state = "failed";
      const t = [e];
      try {
        await this.disposeDomains();
      } catch (s) {
        t.push(s);
      }
      try {
        await this.backend.destroy();
      } catch (s) {
        t.push(s);
      }
      throw t.length === 1 ? e : bt(t, "Render composition initialization and rollback failed.");
    }
  }
  render(e) {
    if (this.state !== "ready")
      throw this.stateError("render");
    this.state = "framing";
    const t = Object.freeze({
      snapshotVersion: 1,
      frame: this.frame + 1,
      simulationTick: e.simulationTick,
      dt: e.dt,
      alpha: e.alpha,
      backendGeneration: this.backend.getGeneration(),
      sceneId: this.sceneId,
      surface: this.surface,
      ...e.extensions === void 0 ? {} : { extensions: e.extensions }
    }), s = this.backend.beginFrame(t), n = [];
    let r = !1, o = !1;
    try {
      for (const d of this.domains)
        if (!(!Mi(d, this.sceneId) || !d.runtime))
          try {
            d.runtime.contribute({ frame: s, metadata: t }), n.push(d);
          } catch (u) {
            if (d.failureCode = Tt(u), d.descriptor.required || this.descriptor.optionalDomainFailurePolicy === "fail-composition")
              throw u;
            d.state = "disabled";
          }
      this.backend.submit(s), r = !0, this.backend.present(), o = !0;
    } catch (d) {
      s.abort?.(d);
      const u = this.notifySubmitResults(n, Object.freeze({
        snapshotVersion: 1,
        frame: t.frame,
        backendGeneration: t.backendGeneration,
        submitted: r,
        presented: o,
        errorCode: Tt(d)
      }));
      throw this.state = "failed", u.length > 0 ? bt([d, ...u], "Render frame and submit-result notification failed.") : d;
    }
    const a = this.notifySubmitResults(n, Object.freeze({
      snapshotVersion: 1,
      frame: t.frame,
      backendGeneration: t.backendGeneration,
      submitted: !0,
      presented: !0
    }));
    if (a.length > 0)
      throw this.state = "failed", a.length === 1 ? a[0] : bt(a, "Render submit-result notification failed.");
    this.frame = t.frame, this.presentations += 1, this.state = "ready";
  }
  resize(e) {
    if (this.state !== "ready")
      throw this.stateError("resize");
    try {
      this.backend.resize(e);
      for (const t of this.domains)
        if (!(t.state !== "ready" || !t.runtime?.resize))
          try {
            t.runtime.resize(e);
          } catch (s) {
            if (t.failureCode = Tt(s), t.descriptor.required || this.descriptor.optionalDomainFailurePolicy === "fail-composition")
              throw s;
            t.state = "disabled";
          }
      this.surface = e;
    } catch (t) {
      throw this.state = "failed", t;
    }
  }
  async switchScene(e) {
    if (this.state !== "ready" && this.state !== "initializing")
      throw this.stateError("switch scene");
    await Sm(this.domains, this.sceneId, e), this.sceneId = e;
  }
  async setDomainEnabled(e, t) {
    if (this.state !== "ready")
      throw this.stateError("set domain enabled");
    await Em(this.domains, this.sceneId, e, t);
  }
  markLost(e = "backend-loss") {
    if (this.state !== "ready")
      throw this.stateError("mark lost");
    this.backend.markLost();
    const t = Object.freeze({
      snapshotVersion: 1,
      backendGeneration: this.backend.getGeneration(),
      reason: e
    }), s = [];
    for (const n of this.domains)
      if (!(n.state !== "ready" || !n.runtime?.lose))
        try {
          n.runtime.lose(t);
        } catch (r) {
          n.failureCode = Tt(r), s.push(r);
        }
    if (this.state = s.length === 0 ? "lost" : "failed", s.length > 0)
      throw s.length === 1 ? s[0] : bt(s, "Render domain loss notification failed.");
  }
  async recover() {
    if (this.state !== "ready" && this.state !== "lost" && this.state !== "failed")
      throw this.stateError("recover");
    const e = this.backend.getGeneration();
    this.state === "ready" && this.markLost("explicit-recovery"), this.state = "recovering";
    try {
      await this.disposeDomains(), await this.backend.recover(), await this.attachDomains();
      const t = Object.freeze({
        snapshotVersion: 1,
        previousBackendGeneration: e,
        backendGeneration: this.backend.getGeneration(),
        capabilities: this.descriptor.backend.capabilities
      });
      for (const s of this.domains)
        s.state !== "ready" || !s.runtime?.recover || await s.runtime.recover(t);
      this.state = "ready";
    } catch (t) {
      throw this.state = "failed", t;
    }
  }
  getSnapshot() {
    const e = this.domains.filter((s) => Mi(s, this.sceneId)), t = this.domains.filter((s) => Mi(s, this.sceneId));
    return Object.freeze({
      snapshotVersion: 1,
      id: this.descriptor.id,
      state: this.state,
      requestedDomainIds: Object.freeze(this.domains.map((s) => s.descriptor.id)),
      effectiveDomainIds: Object.freeze(e.map((s) => s.descriptor.id)),
      committedDomainIds: Object.freeze(t.map((s) => s.descriptor.id)),
      activeDomainIds: Object.freeze(t.map((s) => s.descriptor.id)),
      backend: this.backend.getSnapshot(),
      domains: Object.freeze(this.domains.map((s) => Object.freeze({
        snapshotVersion: 1,
        id: s.descriptor.id,
        required: s.descriptor.required ?? !0,
        state: s.state,
        enabled: s.enabled,
        sceneAttached: s.sceneAttached,
        active: Mi(s, this.sceneId),
        ...s.failureCode === void 0 ? {} : { failureCode: s.failureCode }
      }))),
      frame: this.frame,
      presentations: this.presentations,
      sceneId: this.sceneId
    });
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async attachDomains() {
    for (const e of this.domains) {
      e.state = "attaching";
      try {
        const t = await e.descriptor.create();
        if (e.descriptor.provider?.lifecycle.instanceOwnership === "fresh-per-composition") {
          if (lo.has(t))
            throw Object.assign(new Error(`Render-domain provider "${e.descriptor.provider.id}" reused a runtime instance.`), { code: "RDP_SINGLETON_REUSED", path: "$.domains.create" });
          lo.add(t);
        }
        e.runtime = t;
        const s = this.backend.getInterop(), n = $n(e, this.sceneId);
        await e.runtime.attach({
          domainId: e.descriptor.id,
          backendId: this.descriptor.backend.id,
          backendGeneration: this.backend.getGeneration(),
          capabilities: this.descriptor.backend.capabilities,
          sceneId: n,
          surface: this.surface,
          ...s === void 0 ? {} : { backendInterop: s }
        }), e.state = "ready", delete e.failureCode, e.sceneAttached = n !== null;
      } catch (t) {
        e.failureCode = Tt(t);
        const s = [];
        try {
          await Promise.resolve(e.runtime?.destroy());
        } catch (n) {
          s.push(n);
        }
        if (e.runtime = null, e.descriptor.required || this.descriptor.optionalDomainFailurePolicy === "fail-composition")
          throw e.state = "failed", s.length === 0 ? t : bt([t, ...s], "Render domain attachment and rollback failed.");
        e.state = "disabled";
      }
    }
  }
  async disposeDomains() {
    const e = [];
    for (const t of [...this.domains].reverse())
      if (t.runtime) {
        t.state = "destroying";
        try {
          await t.runtime.detach?.();
        } catch (s) {
          e.push(s);
        }
        try {
          await t.runtime.destroy();
        } catch (s) {
          e.push(s);
        }
        t.runtime = null, t.state = "destroyed", t.sceneAttached = !1;
      }
    if (e.length > 0)
      throw bt(e, "Render domain teardown failed.");
  }
  notifySubmitResults(e, t) {
    const s = [];
    for (const n of e)
      if (!(n.state !== "ready" || !n.runtime?.submitResult))
        try {
          n.runtime.submitResult(t);
        } catch (r) {
          n.failureCode = Tt(r), n.descriptor.required || this.descriptor.optionalDomainFailurePolicy === "fail-composition" ? s.push(r) : n.state = "disabled";
        }
    return s;
  }
  async destroyInternal() {
    if (this.state === "destroyed")
      return;
    this.state = "destroying";
    const e = [], t = this.backend.destroy(), s = this.disposeDomains();
    this.initializePromise && await this.initializePromise.catch((n) => e.push(n));
    try {
      await s;
    } catch (n) {
      e.push(n);
    }
    try {
      await t;
    } catch (n) {
      e.push(n);
    }
    if (this.state = "destroyed", e.length > 0)
      throw bt(e, "Render composition destroy failed.");
  }
  stateError(e) {
    const t = new Error(`Cannot ${e} while render composition is ${this.state}.`);
    return t.name = "RenderCompositionLifecycleError", Object.assign(t, { code: "RC_STATE_INVALID", state: this.state });
  }
}
function xm(i, e) {
  const t = new Error(e);
  return t.name = "AggregateError", t.errors = Object.freeze([...i]), t;
}
class ft extends Error {
  constructor(t, s, n) {
    super(`${t} at ${s}: ${n}`);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "NeutralSceneRuntimeError";
  }
}
class _m {
  constructor(e) {
    c(this, "values");
    this.values = e;
  }
  has(e) {
    return this.values.has(e);
  }
  get(e) {
    if (!this.values.has(e))
      throw new ft("SCENE_SERVICE_MISSING", "$.services", `missing "${e}".`);
    return this.values.get(e);
  }
  getOptional(e) {
    return this.values.get(e);
  }
}
function $m(i) {
  return Object.freeze({
    snapshotVersion: 1,
    sceneId: i.definition.id,
    activation: i.activation,
    state: i.state,
    ...i.failureCode === void 0 ? {} : { failureCode: i.failureCode }
  });
}
class zm {
  constructor(e = {}) {
    c(this, "options");
    c(this, "definitions", /* @__PURE__ */ new Map());
    c(this, "services");
    c(this, "queue", []);
    c(this, "state", "idle");
    c(this, "active", null);
    c(this, "preparing", null);
    c(this, "nextActivation", 1);
    c(this, "draining", !1);
    c(this, "drainPromise", null);
    c(this, "destroyPromise", null);
    c(this, "frame", 0);
    this.options = e;
    const t = e.services;
    this.services = new _m(t instanceof Map ? new Map(t) : new Map(Object.entries(t ?? {})));
  }
  register(e) {
    this.assertAlive("register a scene");
    const t = dl(e);
    if (this.definitions.has(t.id))
      throw new ft("SCENE_ID_DUPLICATE", "$.id", `duplicate "${t.id}".`);
    this.definitions.set(t.id, t);
  }
  registerAll(e) {
    e.forEach((t) => this.register(t));
  }
  startScene(e) {
    if (this.assertAlive("start a scene"), !this.definitions.has(e))
      return Promise.reject(new ft("SCENE_NOT_REGISTERED", "$.sceneId", `unknown "${e}".`));
    const t = new Promise((s, n) => this.queue.push({ sceneId: e, resolve: s, reject: n }));
    return this.ensureDrain(), t;
  }
  update(e, t, s) {
    const n = this.active;
    if (!n || n.state !== "active")
      return;
    const r = Object.freeze({ frame: ++this.frame, dt: e, steps: t, alpha: s });
    this.faultSync("fixed-update", n.definition.id), n.runtime?.fixedUpdate?.(r), this.faultSync("frame-update", n.definition.id), n.runtime?.frameUpdate?.(r), this.faultSync("presentation-sync", n.definition.id), n.runtime?.presentationSync?.(r);
  }
  getActiveSceneId() {
    return this.active?.definition.id ?? null;
  }
  getSnapshot() {
    return Object.freeze({
      snapshotVersion: 1,
      state: this.state,
      active: this.active ? $m(this.active) : null,
      queuedSceneIds: Object.freeze(this.queue.map((e) => e.sceneId)),
      registeredSceneIds: Object.freeze([...this.definitions.keys()].sort())
    });
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async drain() {
    if (!(this.draining || this.state === "destroying" || this.state === "destroyed")) {
      this.draining = !0;
      try {
        for (; this.queue.length > 0 && !this.destroyPromise; ) {
          const e = this.queue.shift();
          this.state = "transitioning";
          try {
            await this.transition(e.sceneId), e.resolve();
          } catch (t) {
            e.reject(t);
          } finally {
            this.state === "transitioning" && (this.state = "idle");
          }
        }
      } finally {
        this.draining = !1;
      }
    }
  }
  ensureDrain() {
    this.drainPromise || this.state === "destroying" || this.state === "destroyed" || (this.drainPromise = this.drain().finally(() => {
      this.drainPromise = null, this.queue.length > 0 && this.ensureDrain();
    }));
  }
  async transition(e) {
    const t = this.definitions.get(e), s = {
      definition: t,
      activation: this.nextActivation++,
      lifetime: new gc(),
      runtime: null,
      state: "preparing",
      destroyed: !1
    };
    this.preparing = s;
    try {
      await this.fault("requirement", e);
      for (const [r, o] of (t.requirements ?? []).entries())
        if (!o.optional && !this.services.has(o.capability))
          throw new ft("SCENE_CAPABILITY_REQUIRED", `$.requirements[${r}].capability`, `missing "${o.capability}".`);
      await this.fault("create", e), s.runtime = await t.create({
        activation: s.activation,
        signal: s.lifetime.signal,
        services: this.services
      }), s.lifetime.signal.throwIfAborted(), await this.fault("prepare", e), await s.runtime.prepare?.(), s.lifetime.signal.throwIfAborted(), s.state = "prepared", await this.fault("activate", e), await s.runtime.activate?.(), s.lifetime.signal.throwIfAborted(), await this.fault("commit", e);
      const n = this.active;
      await this.options.commitPresentation?.(e, n?.definition.id ?? null), s.state = "active", this.active = s, this.preparing = null, n && await this.retire(n);
    } catch (n) {
      throw s.state = "failed", s.failureCode = typeof n == "object" && n !== null && "code" in n ? String(n.code) : "SCENE_TRANSITION_FAILED", this.preparing = null, await this.destroyActivation(s, n).catch(() => {
      }), n;
    }
  }
  async retire(e) {
    e.state = "retiring", await this.fault("retire", e.definition.id), await e.runtime?.retire?.(), await this.destroyActivation(e, new ft("SCENE_RETIRED", "$.scene", `scene "${e.definition.id}" retired.`));
  }
  async destroyActivation(e, t) {
    e.destroyed || (e.destroyed = !0, e.state = "destroying", e.lifetime.abort(t), await this.fault("destroy", e.definition.id), await e.runtime?.destroy(), e.state = "destroyed");
  }
  async destroyInternal() {
    this.state = "destroying";
    const e = new ft("SCENE_OWNER_DESTROYED", "$", "scene owner was destroyed.");
    for (; this.queue.length > 0; )
      this.queue.shift().reject(e);
    this.preparing?.lifetime.abort(e), await this.drainPromise;
    const t = [];
    if (this.active)
      try {
        await this.options.commitPresentation?.(null, this.active.definition.id);
      } catch (s) {
        t.push(s);
      }
    for (const s of [this.preparing, this.active])
      if (s)
        try {
          await this.destroyActivation(s, e);
        } catch (n) {
          t.push(n);
        }
    if (this.preparing = null, this.active = null, this.definitions.clear(), this.state = "destroyed", t.length > 0)
      throw xm(t, "Neutral scene destroy failed.");
  }
  assertAlive(e) {
    if (this.state === "destroying" || this.state === "destroyed")
      throw new ft("SCENE_OWNER_DESTROYED", "$", `cannot ${e}.`);
  }
  fault(e, t) {
    return this.options.injectFault?.(e, t);
  }
  faultSync(e, t) {
    const s = this.options.injectFault?.(e, t);
    if (s && typeof s.then == "function")
      throw new ft("SCENE_ASYNC_UPDATE_FAULT_INVALID", "$.injectFault", "update fault hooks must be synchronous.");
  }
}
class ui extends Error {
  constructor(t, s) {
    super(`SURFACE_SNAPSHOT_INVALID at ${t}: ${s}`);
    c(this, "path");
    c(this, "code", "SURFACE_SNAPSHOT_INVALID");
    this.path = t, this.name = "SurfaceHostError";
  }
}
function ii(i, e) {
  if (!Number.isFinite(i) || i <= 0)
    throw new ui(e, "expected a positive finite number.");
  return i;
}
class Om {
  constructor(e) {
    c(this, "adapter");
    c(this, "revision", 0);
    c(this, "snapshot");
    c(this, "unsubscribe", null);
    c(this, "destroyed", !1);
    c(this, "listeners", /* @__PURE__ */ new Set());
    this.adapter = e, this.snapshot = this.capture(++this.revision), this.unsubscribe = e.subscribe?.(() => this.refresh()) ?? null;
  }
  getSnapshot() {
    return this.snapshot;
  }
  refresh() {
    if (this.destroyed)
      throw new ui("$", "surface host is destroyed.");
    const e = this.readValidated();
    if (e.logicalWidth !== this.snapshot.logicalWidth || e.logicalHeight !== this.snapshot.logicalHeight || e.physicalWidth !== this.snapshot.physicalWidth || e.physicalHeight !== this.snapshot.physicalHeight || e.pixelRatio !== this.snapshot.pixelRatio || e.safeArea?.some((t, s) => t !== (this.snapshot.safeArea?.[s] ?? 0)) || this.snapshot.safeArea?.some((t, s) => t !== (e.safeArea?.[s] ?? 0)) || e.visible !== this.snapshot.visible) {
      this.snapshot = Object.freeze({ snapshotVersion: 1, revision: ++this.revision, ...e });
      for (const t of this.listeners)
        t(this.snapshot);
    }
    return this.snapshot;
  }
  subscribe(e) {
    if (this.destroyed)
      throw new ui("$", "surface host is destroyed.");
    return this.listeners.add(e), () => this.listeners.delete(e);
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.unsubscribe?.(), this.unsubscribe = null, this.listeners.clear());
  }
  readValidated() {
    const e = this.adapter.read(), t = e.safeArea ?? [0, 0, 0, 0];
    if (t.length !== 4 || t.some((s) => !Number.isFinite(s) || s < 0))
      throw new ui("$.safeArea", "expected four non-negative finite logical-pixel insets.");
    if (t[0] + t[2] >= e.logicalWidth || t[1] + t[3] >= e.logicalHeight)
      throw new ui("$.safeArea", "insets must leave a positive logical surface.");
    return Object.freeze({
      logicalWidth: ii(e.logicalWidth, "$.logicalWidth"),
      logicalHeight: ii(e.logicalHeight, "$.logicalHeight"),
      physicalWidth: Math.floor(ii(e.physicalWidth, "$.physicalWidth")),
      physicalHeight: Math.floor(ii(e.physicalHeight, "$.physicalHeight")),
      pixelRatio: ii(e.pixelRatio, "$.pixelRatio"),
      safeArea: Object.freeze([t[0], t[1], t[2], t[3]]),
      visible: !!e.visible
    });
  }
  capture(e) {
    return Object.freeze({ snapshotVersion: 1, revision: e, ...this.readValidated() });
  }
}
function uo(i = {}) {
  const e = i.logicalWidth ?? 1, t = i.logicalHeight ?? 1, s = i.pixelRatio ?? 1;
  return Object.freeze({
    logicalWidth: e,
    logicalHeight: t,
    physicalWidth: Math.max(1, Math.floor(e * s)),
    physicalHeight: Math.max(1, Math.floor(t * s)),
    pixelRatio: s,
    safeArea: i.safeArea ?? Object.freeze([0, 0, 0, 0]),
    visible: i.visible ?? !0
  });
}
class Dm {
  constructor(e) {
    c(this, "value");
    this.value = e;
  }
  read() {
    return this.value;
  }
  set(e) {
    this.value = e;
  }
}
function Cm(i) {
  return i instanceof Map ? new Map(i) : new Map(Object.entries(i ?? {}));
}
class dr {
  constructor(e, t, s, n, r) {
    c(this, "surfaceAdapter");
    c(this, "surfaceHost");
    c(this, "sceneOwner");
    c(this, "presentationOwner");
    c(this, "plugins");
    c(this, "state", "ready");
    c(this, "simulationTick", 0);
    c(this, "destroyPromise", null);
    c(this, "presentationRecovery", null);
    this.surfaceAdapter = e, this.surfaceHost = t, this.sceneOwner = s, this.presentationOwner = n, this.plugins = r;
  }
  static async create(e) {
    if (typeof e != "object" || e === null || !("presentation" in e))
      throw new TypeError("Neutral ForgEng creation requires a presentation descriptor.");
    const t = e.providers;
    if (t && Object.prototype.hasOwnProperty.call(t, "renderer"))
      throw Object.assign(
        new TypeError("SDK_COMPOSITION_LEGACY_RENDERER_EXCLUSIVE at $.providers.renderer: renderer-provider v1 cannot be combined with render domains."),
        { code: "SDK_COMPOSITION_LEGACY_RENDERER_EXCLUSIVE", path: "$.providers.renderer" }
      );
    const s = Object.freeze((e.plugins ?? []).map((l, f) => vm(l, `$.plugins[${f}]`))), n = Cm(e.services);
    for (const [l, f] of s.entries())
      for (const [h, p] of (f.capabilities ?? []).entries())
        if (!p.optional && !n.has(p.id))
          throw Object.assign(
            new Error(`PLUGIN_CAPABILITY_MISSING at $.plugins[${l}].capabilities[${h}]: missing "${p.id}".`),
            { code: "PLUGIN_CAPABILITY_MISSING", path: `$.plugins[${l}].capabilities[${h}]` }
          );
    const r = new Dm(uo(e.surface)), o = new Om(r), a = new Am(e.presentation, o.getSnapshot()), d = new zm({
      services: n,
      commitPresentation: (l) => a.switchScene(l)
    }), u = [];
    try {
      d.registerAll(e.scenes ?? []), await a.initialize();
      for (const f of s) {
        const h = new gc(), p = Object.freeze({
          pluginId: f.id,
          signal: h.signal,
          has: (m) => n.has(m),
          get: (m) => {
            if (!n.has(m)) throw Object.assign(new Error(`Plugin capability "${m}" is unavailable.`), { code: "PLUGIN_CAPABILITY_MISSING" });
            return n.get(m);
          },
          getOptional: (m) => n.get(m),
          snapshot: () => Object.freeze(Object.fromEntries(
            (f.capabilities ?? []).map((m) => [m.id, n.has(m.id)])
          ))
        });
        await f.initialize(p), u.push(Object.freeze({ descriptor: f, lifetime: h }));
      }
      const l = new dr(
        r,
        o,
        d,
        a,
        Object.freeze(u)
      );
      return e.bootScene && await l.startScene(e.bootScene), l;
    } catch (l) {
      for (const f of u.reverse())
        f.lifetime.abort(l), await f.descriptor.destroy?.();
      throw await d.destroy().catch(() => {
      }), await a.destroy().catch(() => {
      }), o.destroy(), l;
    }
  }
  async startScene(e) {
    this.assertReady("start a scene"), await this.sceneOwner.startScene(e);
  }
  step(e) {
    this.assertReady("step");
    const t = e.steps ?? 1, s = e.alpha ?? 0;
    this.simulationTick += t;
    for (const n of this.plugins) n.descriptor.fixedUpdate?.(e.dt, t);
    this.sceneOwner.update(e.dt, t, s);
    for (const n of this.plugins) n.descriptor.frameUpdate?.(e.dt, s);
    this.presentationOwner.render({ simulationTick: this.simulationTick, dt: e.dt, alpha: s });
  }
  resize(e) {
    this.assertReady("resize"), this.surfaceAdapter.set(uo(e));
    const t = this.surfaceHost.refresh();
    return this.presentationOwner.resize(t), t;
  }
  recoverPresentation(e = "backend-loss") {
    return this.assertReady("recover presentation"), this.presentationRecovery || (this.presentationRecovery = this.recoverPresentationInternal(e).finally(() => {
      this.presentationRecovery = null;
    })), this.presentationRecovery;
  }
  inspect() {
    return Object.freeze({
      snapshotVersion: 1,
      state: this.state,
      surface: this.surfaceHost.getSnapshot(),
      scenes: this.sceneOwner.getSnapshot(),
      presentation: this.presentationOwner.getSnapshot()
    });
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async destroyInternal() {
    this.state = "destroying";
    const e = [];
    if (this.presentationRecovery)
      try {
        await this.presentationRecovery;
      } catch (t) {
        e.push(t);
      }
    for (const t of [...this.plugins].reverse()) {
      t.lifetime.abort("game-destroy");
      try {
        await t.descriptor.destroy?.();
      } catch (s) {
        e.push(s);
      }
    }
    try {
      await this.sceneOwner.destroy();
    } catch (t) {
      e.push(t);
    }
    try {
      await this.presentationOwner.destroy();
    } catch (t) {
      e.push(t);
    }
    if (this.surfaceHost.destroy(), this.state = "destroyed", e.length > 0)
      throw Object.assign(new Error("Neutral ForgEng game destroy failed."), { name: "AggregateError", errors: e });
  }
  async recoverPresentationInternal(e) {
    this.presentationOwner.getSnapshot().state === "ready" && this.presentationOwner.markLost(e), await this.presentationOwner.recover();
  }
  assertReady(e) {
    if (this.state !== "ready")
      throw Object.assign(new Error(`Cannot ${e} while neutral game is ${this.state}.`), { code: "NEUTRAL_GAME_DESTROYED" });
  }
}
const Nm = ["trace", "debug", "info", "warn", "error", "fatal"], fo = Object.freeze({
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
});
function Us(i) {
  if (!Nm.includes(i))
    throw new Error(`Unknown log level: ${String(i)}`);
}
function Ws(i) {
  const e = i.trim();
  if (!e || e.startsWith(".") || e.endsWith(".") || e.includes(".."))
    throw new Error(`Invalid log category prefix: ${i || "(empty)"}`);
  return e;
}
function Ys(i, e) {
  return i === e || i.startsWith(`${e}.`);
}
class zn {
  constructor(e = {}) {
    c(this, "minLevel");
    c(this, "included");
    c(this, "excluded");
    c(this, "categoryLevels");
    this.minLevel = e.minLevel ?? "trace", Us(this.minLevel), this.included = Object.freeze((e.includeCategories ?? []).map(Ws)), this.excluded = Object.freeze((e.excludeCategories ?? []).map(Ws)), this.categoryLevels = Object.freeze(Object.entries(e.categoryLevels ?? {}).map(([t, s]) => (Us(s), [Ws(t), s])).sort(([t], [s]) => s.length - t.length));
  }
  allows(e, t) {
    if (Us(e), this.excluded.some((r) => Ys(t, r)) || this.included.length > 0 && !this.included.some((r) => Ys(t, r)))
      return !1;
    const n = this.categoryLevels.find(([r]) => Ys(t, r))?.[1] ?? this.minLevel;
    return fo[e] >= fo[n];
  }
}
const ho = /* @__PURE__ */ Symbol("ForgEng.InternalLoggerRuntime");
function qs(i) {
  const e = i.trim();
  if (!e || e.startsWith(".") || e.endsWith(".") || e.includes(".."))
    throw new Error(`Invalid log category: ${i || "(empty)"}`);
  return e;
}
function km(i) {
  return typeof i.allows == "function";
}
function Rm(i) {
  return i ? km(i) ? i : new zn(i) : new zn();
}
function po(i, e, t, s) {
  try {
    i.onSinkFailure?.({ sink: e, record: t, error: s });
  } catch {
  }
}
class lr {
  constructor(e) {
    c(this, "runtime");
    c(this, "category");
    c(this, "metadata");
    const t = e[ho];
    if (t) {
      this.runtime = t, this.category = qs(e.category), this.metadata = Object.freeze({ ...e.metadata ?? {} });
      return;
    }
    this.runtime = {
      sinks: Object.freeze([...e.sinks ?? []]),
      clock: e.clock ?? Date.now,
      onSinkFailure: e.onSinkFailure,
      pending: /* @__PURE__ */ new Set(),
      sequence: 0,
      filter: Rm(e.filter)
    }, this.category = qs(e.category), this.metadata = Object.freeze({ ...e.metadata ?? {} });
  }
  trace(e, t) {
    this.write("trace", e, t);
  }
  debug(e, t) {
    this.write("debug", e, t);
  }
  info(e, t) {
    this.write("info", e, t);
  }
  warn(e, t) {
    this.write("warn", e, t);
  }
  error(e, t) {
    this.write("error", e, t);
  }
  fatal(e, t) {
    this.write("fatal", e, t);
  }
  child(e, t = {}) {
    const s = `${this.category}.${qs(e)}`;
    return new lr({
      category: s,
      metadata: Object.freeze({ ...this.metadata, ...t }),
      [ho]: this.runtime
    });
  }
  setFilter(e) {
    if (!e || typeof e.allows != "function")
      throw new TypeError("Logger filter must implement allows().");
    this.runtime.filter = e;
  }
  async flush() {
    for (; this.runtime.pending.size > 0; )
      await Promise.all([...this.runtime.pending]);
  }
  write(e, t, s) {
    if (!this.runtime.filter.allows(e, this.category))
      return;
    const n = Object.freeze({
      sequence: ++this.runtime.sequence,
      timestamp: this.runtime.clock(),
      level: e,
      category: this.category,
      message: t,
      metadata: Object.freeze({ ...this.metadata, ...s?.metadata ?? {} }),
      ...s && "error" in s ? { error: s.error } : {}
    });
    for (const r of this.runtime.sinks)
      try {
        const o = r.write(n);
        o && typeof o.then == "function" && this.trackAsyncSink(r, n, o);
      } catch (o) {
        po(this.runtime, r, n, o);
      }
  }
  trackAsyncSink(e, t, s) {
    let n;
    n = Promise.resolve(s).catch((r) => {
      po(this.runtime, e, t, r);
    }).finally(() => {
      this.runtime.pending.delete(n);
    }), this.runtime.pending.add(n);
  }
}
function Pm() {
  return console;
}
function jm(i) {
  return i === "fatal" ? "error" : i;
}
class Tm {
  constructor(e = {}) {
    c(this, "enabled");
    c(this, "target");
    this.enabled = e.enabled ?? !1, this.target = e.target ?? Pm();
  }
  setEnabled(e) {
    this.enabled = e;
  }
  getEnabled() {
    return this.enabled;
  }
  write(e) {
    if (!this.enabled)
      return;
    const t = [`[${e.category}] ${e.message}`];
    Object.keys(e.metadata).length > 0 && t.push(e.metadata), "error" in e && t.push(e.error), this.target[jm(e.level)](...t);
  }
}
class Lm {
  constructor(e = 500) {
    c(this, "capacity");
    c(this, "records");
    c(this, "nextIndex", 0);
    c(this, "count", 0);
    if (this.capacity = e, !Number.isInteger(e) || e <= 0)
      throw new RangeError(`Memory log capacity must be a positive integer: ${e}`);
    this.records = new Array(e);
  }
  write(e) {
    this.records[this.nextIndex] = e, this.nextIndex = (this.nextIndex + 1) % this.capacity, this.count = Math.min(this.count + 1, this.capacity);
  }
  snapshot() {
    const e = this.count < this.capacity ? 0 : this.nextIndex, t = [];
    for (let s = 0; s < this.count; s += 1) {
      const n = this.records[(e + s) % this.capacity];
      n && t.push(n);
    }
    return Object.freeze(t);
  }
  clear() {
    this.records.fill(void 0), this.nextIndex = 0, this.count = 0;
  }
  get size() {
    return this.count;
  }
}
const mo = 1024;
function go(i, e) {
  if (!Number.isInteger(i) || i <= 0)
    throw new RangeError(`${e} must be a positive integer: ${i}`);
}
function fi(i, e, t) {
  if (i === null)
    return "null";
  if (i === void 0)
    return "undefined";
  if (typeof i == "string")
    return `string:${JSON.stringify(i)}`;
  if (typeof i == "boolean")
    return `boolean:${i}`;
  if (typeof i == "number")
    return Number.isNaN(i) ? "number:NaN" : Object.is(i, -0) ? "number:-0" : `number:${i}`;
  if (typeof i == "bigint")
    return `bigint:${i.toString()}`;
  if (typeof i == "symbol")
    return `symbol:${String(i.description)}`;
  if (typeof i == "function")
    return `function:${i.name}`;
  const s = e.get(i);
  if (s)
    return `reference:${s}`;
  if (e.set(i, t), i instanceof Date)
    return `date:${i.toISOString()}`;
  if (i instanceof Error) {
    const o = "cause" in i ? fi(i.cause, e, `${t}.cause`) : "none", a = Object.keys(i).sort().map((d) => `${JSON.stringify(d)}:${fi(i[d], e, `${t}.${d}`)}`);
    return `error:${i.name}:${JSON.stringify(i.message)}:${o}:{${a.join(",")}}`;
  }
  if (Array.isArray(i))
    return `array:[${i.map((o, a) => fi(o, e, `${t}[${a}]`)).join(",")}]`;
  const n = Object.getPrototypeOf(i)?.constructor?.name ?? "Object", r = Object.keys(i).sort().map((o) => `${JSON.stringify(o)}:${fi(i[o], e, `${t}.${o}`)}`);
  return `object:${n}:{${r.join(",")}}`;
}
function Mm(i) {
  return fi({
    message: i.message,
    metadata: i.metadata,
    error: "error" in i ? i.error : void 0
  }, /* @__PURE__ */ new Map(), "$");
}
function Vm(i, e) {
  return `${i.category.length}:${i.category}:${i.level.length}:${i.level}:${e}`;
}
class Gm {
  constructor(e) {
    c(this, "states", /* @__PURE__ */ new Map());
    c(this, "windowMs");
    c(this, "burstLimit");
    c(this, "maxKeys");
    c(this, "clock");
    c(this, "keyFor");
    if (!Number.isFinite(e.windowMs) || e.windowMs <= 0)
      throw new RangeError(`windowMs must be finite and greater than zero: ${e.windowMs}`);
    go(e.burstLimit, "burstLimit"), go(e.maxKeys ?? mo, "maxKeys"), this.windowMs = e.windowMs, this.burstLimit = e.burstLimit, this.maxKeys = e.maxKeys ?? mo, this.clock = e.clock ?? Date.now, this.keyFor = e.keyFor ?? Mm;
  }
  process(e) {
    const t = this.readClock(), s = Vm(e, this.keyFor(e)), n = this.states.get(s);
    if (!n) {
      const o = this.evictOldest(t);
      return this.states.set(s, { accepted: 1, suppressed: 0, windowStartedAt: t }), Object.freeze([...o, e]);
    }
    this.touch(s, n);
    const r = t - n.windowStartedAt;
    if (r < 0 || r >= this.windowMs) {
      const o = this.summary(n, t);
      return n.accepted = 1, n.suppressed = 0, n.windowStartedAt = t, n.lastSuppressed = void 0, Object.freeze(o ? [o, e] : [e]);
    }
    return n.accepted < this.burstLimit ? (n.accepted += 1, Object.freeze([e])) : (n.suppressed += 1, n.lastSuppressed = e, Object.freeze([]));
  }
  drain() {
    const e = this.readClock(), t = [];
    for (const s of this.states.values()) {
      const n = this.summary(s, e);
      n && t.push(n), s.suppressed = 0, s.lastSuppressed = void 0;
    }
    return t.sort((s, n) => s.sequence - n.sequence), Object.freeze(t);
  }
  get trackedKeyCount() {
    return this.states.size;
  }
  readClock() {
    const e = this.clock();
    if (!Number.isFinite(e))
      throw new Error(`Log limiter clock returned a non-finite value: ${e}`);
    return e;
  }
  touch(e, t) {
    this.states.delete(e), this.states.set(e, t);
  }
  evictOldest(e) {
    if (this.states.size < this.maxKeys)
      return [];
    const t = this.states.keys().next().value, s = this.states.get(t);
    this.states.delete(t);
    const n = s ? this.summary(s, e) : void 0;
    return n ? [n] : [];
  }
  summary(e, t) {
    if (e.suppressed === 0 || !e.lastSuppressed)
      return;
    const s = e.lastSuppressed, n = e.suppressed === 1 ? "record" : "records";
    return Object.freeze({
      sequence: s.sequence,
      timestamp: t,
      level: s.level,
      category: s.category,
      message: `Suppressed ${e.suppressed} repeated log ${n}: ${s.message}`,
      metadata: Object.freeze({
        forgengSuppression: Object.freeze({
          count: e.suppressed,
          windowMs: this.windowMs,
          originalMessage: s.message
        })
      })
    });
  }
}
class Fm extends Error {
  constructor(t) {
    super("Rate-limited log sink delivery failed.");
    c(this, "errors");
    this.name = "RateLimitedSinkDeliveryError", this.errors = Object.freeze([...t]);
  }
}
function Ks(i) {
  return i.length === 1 ? i[0] : new Fm(i);
}
class Bm {
  constructor(e, t) {
    c(this, "downstream");
    c(this, "policy");
    if (this.downstream = e, !e || typeof e.write != "function")
      throw new TypeError("RateLimitedSink downstream must implement write().");
    this.policy = new Gm(t);
  }
  write(e) {
    return this.deliver(this.policy.process(e));
  }
  async flush() {
    const e = [];
    try {
      await this.deliver(this.policy.drain());
    } catch (t) {
      e.push(t);
    }
    try {
      await this.downstream.flush?.();
    } catch (t) {
      e.push(t);
    }
    if (e.length > 0)
      throw Ks(e);
  }
  get trackedKeyCount() {
    return this.policy.trackedKeyCount;
  }
  deliver(e) {
    const t = [], s = [];
    for (const n of e)
      try {
        const r = this.downstream.write(n);
        r && typeof r.then == "function" && s.push(Promise.resolve(r).catch((o) => {
          t.push(o);
        }));
      } catch (r) {
        t.push(r);
      }
    if (s.length === 0) {
      if (t.length > 0)
        throw Ks(t);
      return;
    }
    return Promise.all(s).then(() => {
      if (t.length > 0)
        throw Ks(t);
    });
  }
}
const Um = Object.freeze(
  []
);
new Set(Um.map((i) => i.code));
const Wm = 500, Ym = Object.freeze([]);
function Hs(i, e) {
  if (typeof i != "object" || i === null || Array.isArray(i))
    throw new TypeError(`logging.${e} must be an object or false.`);
}
function qm(i) {
  if (i.console !== void 0 && typeof i.console != "boolean")
    throw new TypeError("logging.console must be a boolean.");
  i.memory !== void 0 && i.memory !== !1 && Hs(i.memory, "memory"), i.filter !== void 0 && Hs(i.filter, "filter"), i.rateLimit !== void 0 && i.rateLimit !== !1 && Hs(i.rateLimit, "rateLimit");
}
class Km {
  constructor(e, t) {
    c(this, "consoleSink");
    c(this, "memorySink");
    this.consoleSink = e, this.memorySink = t;
  }
  write(e) {
    this.memorySink?.write(e), this.consoleSink.write(e);
  }
}
class Hm {
  constructor(e, t, s, n) {
    c(this, "logger");
    c(this, "consoleSink");
    c(this, "memorySink");
    c(this, "limiter");
    this.logger = e, this.consoleSink = t, this.memorySink = s, this.limiter = n;
  }
  snapshot() {
    return this.memorySink?.snapshot() ?? Ym;
  }
  clear() {
    this.memorySink?.clear();
  }
  setConsoleEnabled(e) {
    if (typeof e != "boolean") throw new TypeError("Console enabled state must be a boolean.");
    this.consoleSink.setEnabled(e);
  }
  getConsoleEnabled() {
    return this.consoleSink.getEnabled();
  }
  setFilter(e) {
    this.logger.setFilter(new zn(e));
  }
  async flush() {
    await this.logger.flush(), await this.limiter?.flush(), await this.logger.flush();
  }
}
function Xm(i = {}, e = {}) {
  qm(i);
  const t = i.memory === !1 ? null : new Lm(i.memory?.capacity ?? Wm), s = new Tm({
    enabled: i.console ?? !1,
    ...e.consoleTarget ? { target: e.consoleTarget } : {}
  }), n = new Km(s, t), r = i.rateLimit ? new Bm(n, { ...i.rateLimit, clock: e.clock }) : null, o = new lr({
    category: "engine",
    sinks: [r ?? n],
    filter: i.filter,
    clock: e.clock
  });
  return Object.freeze({
    logger: o,
    controller: new Hm(o, s, t, r)
  });
}
const us = "1.0.0", yc = Object.freeze({
  persistent: "persistent",
  boundedValueSize: "bounded-value-size"
}), yo = 255, bo = 8, Jm = 63, Xs = 128;
class Dt extends Error {
  constructor(t, s, n, r) {
    super(n);
    c(this, "code");
    c(this, "operation");
    c(this, "cause");
    this.code = t, this.operation = s, this.name = "StorageProviderError", this.cause = r;
  }
}
class ot extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "StorageProviderContractError";
  }
}
const Qm = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, Zm = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, bc = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/, eg = /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/, tg = ["trace", "debug", "info", "warn", "error", "fatal", "child"];
function _t(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function se(i, e, t) {
  throw new ot(i, e, t);
}
function wc(i, e, t) {
  (i.length === 0 || i.length > t || !eg.test(i)) && se("invalid-namespace", e, `${e} must be a normalized lower-case storage segment.`), (i === "." || i === ".." || i.startsWith("__") || i.includes("..")) && se("invalid-namespace", e, `${e} contains a reserved or traversal-like segment.`);
}
function mi(i, e) {
  (typeof i != "string" || i.length === 0 || i.length > yo) && se("invalid-namespace", e, `${e} must be a non-empty namespace of at most ${yo} characters.`), i.includes("\\") && se("invalid-namespace", e, `${e} must use normalized forward-slash namespace separators.`);
  const t = i.split("/");
  t.length > bo && se("invalid-namespace", e, `${e} may contain at most ${bo} segments.`), t.forEach((s, n) => {
    wc(s, `${e}[${n}]`, Jm);
  });
}
function ig(i, e) {
  (!_t(i) || typeof i.id != "string" || !Zm.test(i.id)) && se("invalid-capability", `${e}.id`, `${e}.id must be a normalized capability id.`), (typeof i.version != "string" || !bc.test(i.version)) && se("invalid-capability", `${e}.version`, `${e}.version must be a semantic version.`);
}
function sg(i) {
  _t(i) || se("invalid-descriptor", "descriptor", "Storage provider descriptor must be an object."), (typeof i.id != "string" || !Qm.test(i.id)) && se("invalid-provider-id", "descriptor.id", "Storage provider id must be normalized and namespaced."), i.contractVersion !== us && se("incompatible-contract-version", "descriptor.contractVersion", `Storage provider contract ${String(i.contractVersion)} is incompatible; expected ${us}.`), (typeof i.implementationVersion != "string" || !bc.test(i.implementationVersion)) && se("invalid-implementation-version", "descriptor.implementationVersion", "Storage provider implementationVersion must be a semantic version."), Array.isArray(i.capabilities) || se("invalid-capability", "descriptor.capabilities", "Storage provider capabilities must be an array.");
  const e = /* @__PURE__ */ new Set();
  i.capabilities.forEach((t, s) => {
    const n = `descriptor.capabilities[${s}]`;
    ig(t, n), e.has(t.id) && se("duplicate-capability", `${n}.id`, `Storage capability "${t.id}" is declared more than once.`), e.add(t.id);
  }), typeof i.create != "function" && se("invalid-factory", "descriptor.create", "Storage provider descriptor must define a create factory.");
}
function ng(i) {
  return sg(i), i;
}
function rg(i) {
  if ((!_t(i) || typeof i.initialize != "function" || typeof i.openNamespace != "function" || typeof i.destroy != "function") && se("invalid-provider-instance", "provider", "Storage provider must implement initialize, openNamespace and destroy."), i.limits !== void 0) {
    _t(i.limits) || se("invalid-provider-instance", "provider.limits", "Storage provider limits must be an object.");
    const e = i.limits.maxValueBytes;
    e !== void 0 && (!Number.isSafeInteger(e) || e <= 0) && se("invalid-provider-instance", "provider.limits.maxValueBytes", "Storage provider maxValueBytes must be a positive safe integer.");
  }
}
function og(i) {
  return rg(i), i;
}
function ag(i) {
  _t(i) || se("invalid-config", "context", "Storage provider context must be an object."), mi(i.applicationNamespace, "context.applicationNamespace");
  const e = i.logger;
  (!_t(e) || tg.some((t) => typeof e[t] != "function")) && se("invalid-config", "context.logger", "Storage provider context must include a logger."), (!_t(i.signal) || typeof i.signal.aborted != "boolean" || typeof i.signal.addEventListener != "function" || typeof i.signal.removeEventListener != "function") && se("invalid-config", "context.signal", "Storage provider context must include an AbortSignal-compatible signal.");
}
function vc(i) {
  return ag(i), i;
}
function wo(i) {
  return mi(i, "namespace"), i;
}
function Ic(i, e) {
  mi(i, "applicationNamespace"), mi(e, "childNamespace");
  const t = `${i}/${e}`;
  return mi(t, "namespace"), t;
}
function gi(i) {
  (typeof i != "string" || i.length === 0 || i.length > Xs) && se("invalid-key", "key", `Storage key must be non-empty and at most ${Xs} characters.`);
  try {
    wc(i, "key", Xs);
  } catch (e) {
    throw e instanceof ot && se("invalid-key", "key", "Storage key must be normalized and cannot contain reserved or traversal-like syntax."), e;
  }
  return i;
}
function cg(i) {
  return i instanceof Uint8Array || se("invalid-value", "value", "Storage value must be a Uint8Array."), i;
}
function Sc(i) {
  return cg(i).slice();
}
const Ec = "overrides.v1", dg = 512, lg = 256 * 1024;
function vo(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Js(i) {
  return `${i.mapId}\0${i.actionName}\0${i.bindingId}`;
}
function As(i) {
  if (typeof i != "string" || i.length > lg)
    return null;
  let e;
  try {
    e = JSON.parse(i);
  } catch {
    return null;
  }
  if (!vo(e) || e.version !== 1 || !Array.isArray(e.overrides) || e.overrides.length > dg)
    return null;
  const t = /* @__PURE__ */ new Set(), s = [];
  try {
    for (const [n, r] of e.overrides.entries()) {
      if (!vo(r) || typeof r.mapId != "string" || typeof r.actionName != "string" || typeof r.bindingId != "string" || !("binding" in r))
        return null;
      const o = Object.freeze({
        mapId: r.mapId,
        actionName: r.actionName,
        bindingId: r.bindingId,
        binding: r.binding === null ? null : Jn(r.binding, `overrides[${n}].binding`)
      }), a = Js(o);
      if (t.has(a))
        return null;
      t.add(a), s.push(o);
    }
  } catch {
    return null;
  }
  return s.sort((n, r) => Js(n).localeCompare(Js(r))), Object.freeze({ version: 1, overrides: Object.freeze(s) });
}
function ur(i) {
  const e = JSON.stringify({ version: 1, overrides: i });
  if (!As(e))
    throw new Si("ACTIONS_PERSISTENCE_FAILED", "Input action overrides do not satisfy schema version 1.", "overrides");
  return e;
}
const ug = Object.freeze({
  load: () => null,
  save: () => Promise.reject(new Si("ACTIONS_PERSISTENCE_FAILED", "Input action persistence is disabled.", "persistence")),
  destroy: () => Promise.resolve()
});
function Ac() {
  return ug;
}
function Yt(i) {
  return typeof i == "boolean" ? i ? 1 : 0 : typeof i == "number" ? Math.abs(i) : Math.hypot(i[0], i[1]);
}
function si(i, e) {
  return typeof i == "boolean" ? e(i ? 1 : 0, 0) >= 0.5 : typeof i == "number" ? e(i, 0) : [e(i[0], 0), e(i[1], 1)];
}
function xc(i, e) {
  let t = i;
  for (const s of e)
    switch (s.kind) {
      case "dead-zone": {
        const n = Yt(t);
        if (n <= s.minimum)
          t = typeof t == "boolean" ? !1 : typeof t == "number" ? 0 : [0, 0];
        else if (n < s.maximum) {
          const r = (n - s.minimum) / (s.maximum - s.minimum) / n;
          t = si(t, (o) => o * r);
        }
        break;
      }
      case "scale": {
        const n = s.factor;
        t = si(t, (r, o) => r * (typeof n == "number" ? n : n[o]));
        break;
      }
      case "invert":
        t = si(t, (n, r) => n * ((r === 0 ? s.x : s.y) ? -1 : 1));
        break;
      case "clamp":
        t = si(t, (n) => Math.max(s.minimum, Math.min(s.maximum, n)));
        break;
      case "normalize":
        if (Array.isArray(t)) {
          const n = Math.hypot(t[0], t[1]);
          n > 1 && (t = [t[0] / n, t[1] / n]);
        } else typeof t == "number" && (t = Math.max(-1, Math.min(1, t)));
        break;
      case "sensitivity":
        t = si(t, (n) => n * s.factor);
        break;
    }
  return t;
}
function fg(i, e, t) {
  if (i === "button")
    return !!e || !!t;
  if (i === "axis")
    return Math.max(-1, Math.min(1, Number(e) + Number(t)));
  const s = e, n = t, r = s[0] + n[0], o = s[1] + n[1], a = Math.hypot(r, o);
  return a > 1 ? [r / a, o / a] : [r, o];
}
function fr(i, e) {
  return Array.isArray(i) && Array.isArray(e) ? i[0] === e[0] && i[1] === e[1] : i === e;
}
function hg(i, e, t) {
  const s = t.get(i);
  if (s !== void 0)
    return s;
  const n = i.match(/^<([^>]+)>\/(.+)$/);
  if (!n)
    return 0;
  const [, r, o] = n;
  if (r === "Keyboard")
    return e.keyboard.pressed.includes(o);
  if (r === "Pointer") {
    if (o === "delta/x")
      return e.pointer.delta[0];
    if (o === "delta/y")
      return e.pointer.delta[1];
    if (o === "position/x")
      return e.pointer.position[0];
    if (o === "position/y")
      return e.pointer.position[1];
    if (o?.startsWith("button/"))
      return e.pointer.buttons.includes(Number(o.slice(7)));
  }
  if (r === "Wheel")
    return e.wheel.delta[o === "x" ? 0 : o === "y" ? 1 : 2];
  if (r === "Gamepad") {
    const a = e.gamepads[0];
    if (!a)
      return 0;
    if (o?.startsWith("button/")) {
      const d = a.buttons[Number(o.slice(7))];
      return d ? Math.max(d.value, d.pressed ? 1 : 0) : 0;
    }
    if (o?.startsWith("axis/"))
      return a.axes[Number(o.slice(5))] ?? 0;
  }
  if (r === "Touch") {
    const a = e.touches[0];
    if (!a)
      return 0;
    if (o === "position/x")
      return a.position[0];
    if (o === "position/y")
      return a.position[1];
    if (o === "active")
      return !0;
  }
  return 0;
}
function pg(i, e, t, s, n) {
  const r = (d) => s.has(d) ? 0 : hg(d, t, n);
  let o, a;
  if (i.kind === "control") {
    const d = r(i.control);
    o = e === "vector2" ? Array.isArray(d) ? d : [Number(d), 0] : d, a = [i.control];
  } else if (i.kind === "axis-composite")
    o = Number(r(i.positive)) - Number(r(i.negative)), a = [i.negative, i.positive];
  else {
    const d = Number(r(i.right)) - Number(r(i.left)), u = Number(r(i.up)) - Number(r(i.down)), l = Math.hypot(d, u);
    o = i.normalize && l > 1 ? [d / l, u / l] : [d, u], a = [i.up, i.down, i.left, i.right];
  }
  return { value: xc(o, i.processors), controls: a, interaction: i.interactions[0] ?? null };
}
function mg(i, e, t, s) {
  const n = /* @__PURE__ */ new Set();
  return i.keyboard.pressed.length && n.add("<Keyboard>"), (i.pointer.buttons.length || i.pointer.delta.some((r) => r !== 0)) && n.add("<Pointer>"), i.wheel.delta.some((r) => r !== 0) && n.add("<Wheel>"), i.gamepads.some((r) => r.buttons.some((o) => o.pressed || o.value > s) || r.axes.some((o) => Math.abs(o) > s)) && n.add("<Gamepad>"), i.touches.length && n.add("<Touch>"), [...t.values()].some((r) => Yt(r) > s) && n.add("<Virtual>"), n.size === 0 ? null : [...e].sort((r, o) => r.id.localeCompare(o.id)).find((r) => r.requiredDevices.length > 0 && r.requiredDevices.every((o) => n.has(o)))?.id ?? null;
}
function be(i, e, t) {
  return new Si(i, `Input Actions ${i}${e ? ` at "${e}"` : ""}.`, e ?? null, t ?? null);
}
function xi(i) {
  return Array.isArray(i) ? Object.freeze([i[0], i[1]]) : i;
}
function gg(i) {
  return i === "button" ? !1 : i === "axis" ? 0 : Object.freeze([0, 0]);
}
function hr(i) {
  return Object.freeze({ ...i, value: xi(i.value), controls: Object.freeze([...i.controls]) });
}
function yg(i, e, t, s, n, r, o, a, d) {
  const l = Yt(n) > (r?.threshold ?? d), f = i?.actuated ?? !1, h = !i || !fr(i.value, n);
  let p = l && !f, m = r === null ? l && (p || h) : !1, y = !l && f;
  return p && (e.pressedAt = o, e.performedHold = !1), r?.kind === "press" ? m = r.behavior !== "release-only" && p || r.behavior !== "press-only" && y : r?.kind === "hold" ? (m = l && !e.performedHold && e.pressedAt !== null && o - e.pressedAt >= r.durationMs, m && (e.performedHold = !0)) : r?.kind === "tap" ? m = y && e.pressedAt !== null && o - e.pressedAt <= r.maximumDurationMs : r?.kind === "multi-tap" && y && e.pressedAt !== null && o - e.pressedAt <= r.maximumTapDurationMs && (e.tapCount = e.lastTapAt === null || o - e.lastTapAt <= r.maximumDelayMs ? e.tapCount + 1 : 1, e.lastTapAt = o, m = e.tapCount >= r.tapCount, m && (e.tapCount = 0, e.lastTapAt = null)), m && !l && (y = !1), l || (e.pressedAt = null, e.performedHold = !1), hr({
    id: t,
    valueKind: s,
    value: n,
    phase: y ? "canceled" : m ? "performed" : p ? "started" : "waiting",
    actuated: l,
    changed: h,
    started: p,
    performed: m,
    canceled: y,
    controls: [...new Set(a)].sort()
  });
}
function Io(i, e, t, s, n, r) {
  const o = {}, a = {};
  for (const d of i)
    for (const u of Object.values(d.actions)) {
      const l = e?.states[u.id], f = xi(u.default);
      a[u.id] = f;
      const h = r && (l?.actuated ?? !1);
      o[u.id] = hr({
        id: u.id,
        valueKind: u.valueKind,
        value: f,
        phase: h ? "canceled" : "waiting",
        actuated: !1,
        changed: r && l ? !fr(l.value, f) : !1,
        started: !1,
        performed: !1,
        canceled: h,
        controls: []
      });
    }
  return Object.freeze({ sequence: t, timestampMs: s, scheme: n, values: Object.freeze(a), states: Object.freeze(o) });
}
function bg(i, e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw be("ACTIONS_INVALID_COMMAND", "command.tick");
  return Object.freeze({
    version: 1,
    tick: e,
    sequence: i.sequence,
    values: Object.freeze(Object.fromEntries(Object.entries(i.values).map(([t, s]) => [t, xi(s)]))),
    performed: Object.freeze(Object.values(i.states).filter((t) => t.performed).map((t) => t.id).sort()),
    canceled: Object.freeze(Object.values(i.states).filter((t) => t.canceled).map((t) => t.id).sort())
  });
}
function wg(i) {
  if (i.version !== 1 || !Number.isSafeInteger(i.tick) || i.tick < 0 || !Number.isSafeInteger(i.sequence))
    throw be("ACTIONS_INVALID_COMMAND", "command");
  const e = {};
  for (const [t, s] of Object.entries(i.values)) {
    if (typeof s != "boolean" && (typeof s != "number" || !Number.isFinite(s)) && (!Array.isArray(s) || s.length !== 2 || s.some((n) => !Number.isFinite(n))))
      throw be("ACTIONS_INVALID_COMMAND", `command.values.${t}`, t);
    e[t] = xi(s);
  }
  return Object.freeze({
    version: 1,
    tick: i.tick,
    sequence: i.sequence,
    values: Object.freeze(e),
    performed: Object.freeze([...i.performed]),
    canceled: Object.freeze([...i.canceled])
  });
}
function vg(i, e, t, s, n) {
  const r = {};
  for (const [o, a] of Object.entries(i.values)) {
    const d = e.states[o], u = i.performed.includes(o), l = i.canceled.includes(o);
    r[o] = hr({
      id: o,
      valueKind: Array.isArray(a) ? "vector2" : typeof a == "boolean" ? "button" : "axis",
      value: a,
      phase: l ? "canceled" : u ? "performed" : "waiting",
      actuated: Yt(a) > n,
      changed: !d || !fr(d.value, a),
      started: u && !(d?.actuated ?? !1),
      performed: u,
      canceled: l,
      controls: []
    });
  }
  return Object.freeze({ sequence: i.sequence, timestampMs: t, scheme: s, values: i.values, states: Object.freeze(r) });
}
function Ig(i, e, t, s, n, r, o, a, d, u) {
  let l = e.length > 0 ? gg(i.valueKind) : xi(i.default), f = 0, h = i.interactions[0] ?? null;
  const p = [];
  for (const y of e) {
    if (r && y.groups.length > 0 && !y.groups.some((w) => r.groups.includes(w)))
      continue;
    const b = pg(y, i.valueKind, t, s, n), g = Yt(b.value);
    !h && b.interaction && (h = b.interaction), l = fg(i.valueKind, l, i.valueKind === "button" ? g > (b.interaction?.threshold ?? u) : b.value), g > f && (f = g, h = b.interaction ?? h), g > u && p.push(...b.controls);
  }
  l = xc(l, i.processors), i.valueKind === "button" && (l = Yt(l) > u);
  const m = a.get(i.id) ?? { pressedAt: null, performedHold: !1, tapCount: 0, lastTapAt: null };
  return a.set(i.id, m), yg(o, m, i.id, i.valueKind, l, h, d, p, u);
}
function Sg(i, e, t, s, n, r, o, a, d, u, l, f) {
  const p = (f && n.size > 0 ? mg(i, n.values(), a, u) : null) ?? l, m = p ? n.get(p) ?? null : null, y = /* @__PURE__ */ new Set(), b = {}, g = {}, w = [...r.entries()].sort((z, O) => O[1].priority - z[1].priority || z[0].localeCompare(O[0]));
  for (const [z, O] of w) {
    const S = s.get(z);
    for (const v of Object.keys(S.actions).sort()) {
      const I = S.actions[v], x = Ig(I, o.bindingsFor(z, v, I.bindings), i, y, a, m, t.states[I.id], d, e, u);
      if (b[I.id] = x, g[I.id] = x.value, O.consume && x.actuated)
        for (const R of x.controls)
          y.add(R);
    }
  }
  return Object.freeze({
    sequence: t.sequence + 1,
    timestampMs: e,
    scheme: p,
    values: Object.freeze(g),
    states: Object.freeze(b)
  });
}
function Fe(i) {
  return `${i.mapId}\0${i.actionName}\0${i.bindingId}`;
}
function So(i) {
  return i.kind === "control" ? [i.control] : i.kind === "axis-composite" ? [i.negative, i.positive] : [i.up, i.down, i.left, i.right];
}
class Eg {
  constructor(e, t) {
    c(this, "maps");
    c(this, "onChange");
    c(this, "overrides", /* @__PURE__ */ new Map());
    this.maps = e, this.onChange = t;
  }
  bindingsFor(e, t, s) {
    return s.flatMap((n) => {
      const r = this.overrides.get(Fe({ mapId: e, actionName: t, bindingId: n.id }));
      return r ? r.binding ? [r.binding] : [] : [n];
    });
  }
  rebind(e, t) {
    if (!this.requireAction(e.mapId, e.actionName).bindings.some((o) => o.id === e.bindingId))
      throw be("ACTIONS_UNKNOWN_BINDING", "override.bindingId", e.bindingId);
    const n = Object.freeze({
      mapId: e.mapId,
      actionName: e.actionName,
      bindingId: e.bindingId,
      binding: e.binding === null ? null : Jn(e.binding, "override.binding")
    }), r = n.binding ? this.findConflicts(n, n.binding) : Object.freeze([]);
    return r.length > 0 && t === "reject" ? Object.freeze({ applied: !1, conflicts: r, override: null }) : (r.length > 0 && t === "replace" && this.replaceConflicts(r), this.overrides.set(Fe(n), n), this.onChange(), Object.freeze({ applied: !0, conflicts: r, override: n }));
  }
  clear(e, t, s) {
    this.requireAction(e, t);
    const n = this.overrides.delete(Fe({ mapId: e, actionName: t, bindingId: s }));
    return n && this.onChange(), n;
  }
  list() {
    return Object.freeze([...this.overrides.values()].sort((e, t) => Fe(e).localeCompare(Fe(t))));
  }
  load(e) {
    for (const t of e)
      try {
        this.requireAction(t.mapId, t.actionName), this.overrides.set(Fe(t), t);
      } catch {
      }
  }
  clearAll() {
    this.overrides.clear();
  }
  get size() {
    return this.overrides.size;
  }
  findConflicts(e, t) {
    const s = So(t), n = [];
    for (const [r, o] of this.maps)
      for (const [a, d] of Object.entries(o.actions))
        for (const u of this.bindingsFor(r, a, d.bindings)) {
          if (r === e.mapId && a === e.actionName && u.id === e.bindingId)
            continue;
          const l = So(u).filter((f) => s.includes(f));
          l.length > 0 && n.push(Object.freeze({
            mapId: r,
            actionName: a,
            bindingId: u.id,
            controls: Object.freeze(l.sort())
          }));
        }
    return Object.freeze(n.sort((r, o) => Fe(r).localeCompare(Fe(o))));
  }
  replaceConflicts(e) {
    for (const t of e)
      this.overrides.set(Fe(t), Object.freeze({
        mapId: t.mapId,
        actionName: t.actionName,
        bindingId: t.bindingId,
        binding: null
      }));
  }
  requireAction(e, t) {
    const s = this.maps.get(e);
    if (!s)
      throw be("ACTIONS_UNKNOWN_MAP", "mapId", e);
    const n = s.actions[t];
    if (!n)
      throw be("ACTIONS_UNKNOWN_ACTION", "actionName", t);
    return n;
  }
}
class Ag {
  constructor(e = {}) {
    c(this, "maps");
    c(this, "schemes");
    c(this, "persistence");
    c(this, "threshold");
    c(this, "autoSwitchScheme");
    c(this, "activeMaps", /* @__PURE__ */ new Map());
    c(this, "virtual", /* @__PURE__ */ new Map());
    c(this, "interactionMemory", /* @__PURE__ */ new Map());
    c(this, "listeners", /* @__PURE__ */ new Map());
    c(this, "rebinding");
    c(this, "current");
    c(this, "explicitScheme");
    c(this, "boundCommand", null);
    c(this, "destroyed", !1);
    c(this, "destroyPromise", null);
    c(this, "pendingSave", null);
    const { persistence: t, actuationThreshold: s, ...n } = e, r = Xd(n);
    if (this.maps = new Map((r.maps ?? []).map((o) => [o.id, o])), this.schemes = new Map((r.schemes ?? []).map((o) => [o.id, o])), this.persistence = t ?? Ac(), this.threshold = s ?? 0.5, !Number.isFinite(this.threshold) || this.threshold < 0 || this.threshold > 1)
      throw be("ACTIONS_INVALID_DEFINITION", "actions.actuationThreshold");
    this.autoSwitchScheme = r.autoSwitchScheme ?? !0, this.explicitScheme = r.defaultScheme ?? null, this.rebinding = new Eg(this.maps, () => this.scheduleSave());
    for (const o of this.maps.values())
      o.enabledByDefault && this.activeMaps.set(o.id, { count: 1, priority: o.priority, consume: o.consume });
    this.loadOverrides(), this.current = Io(this.maps.values(), null, 0, 0, this.explicitScheme, !1);
  }
  update(e, t = e.timestampMs) {
    if (this.assertAlive(), !Number.isFinite(t) || t < 0)
      throw be("ACTIONS_INVALID_DEFINITION", "timestampMs");
    return this.boundCommand ? (this.current = vg(this.boundCommand, this.current, t, this.explicitScheme, this.threshold), this.current) : !e.focused || !e.visible ? this.resetFrame(t) : (this.current = Sg(e, t, this.current, this.maps, this.schemes, this.activeMaps, this.rebinding, this.virtual, this.interactionMemory, this.threshold, this.explicitScheme, this.autoSwitchScheme), this.explicitScheme = this.current.scheme, this.emit(this.current.states), this.current);
  }
  snapshot() {
    return this.assertAlive(), this.current;
  }
  value(e, t) {
    this.assertAlive();
    const s = typeof e == "string" ? e : e.id, n = typeof e == "string" ? t : e.default;
    return this.current.values[s] ?? n;
  }
  state(e) {
    this.assertAlive();
    const t = typeof e == "string" ? e : e.id;
    return this.current.states[t] ?? null;
  }
  enableMap(e, t = {}) {
    this.assertAlive();
    const s = this.requireMap(e), n = this.activeMaps.get(e);
    this.activeMaps.set(e, {
      count: (n?.count ?? 0) + 1,
      priority: t.priority ?? n?.priority ?? s.priority,
      consume: t.consume ?? n?.consume ?? s.consume
    });
    let r = !1;
    return {
      id: e,
      get disposed() {
        return r;
      },
      dispose: () => {
        if (r || (r = !0, this.destroyed))
          return;
        const o = this.activeMaps.get(e);
        o && (o.count <= 1 ? this.activeMaps.delete(e) : this.activeMaps.set(e, { ...o, count: o.count - 1 }));
      }
    };
  }
  disableMap(e) {
    this.assertAlive(), this.requireMap(e), this.activeMaps.delete(e);
  }
  setControlScheme(e) {
    if (this.assertAlive(), e !== null && !this.schemes.has(e))
      throw be("ACTIONS_INVALID_DEFINITION", "scheme", e);
    this.explicitScheme = e;
  }
  getControlScheme() {
    return this.assertAlive(), this.explicitScheme;
  }
  setVirtualControl(e, t) {
    if (this.assertAlive(), ut(e, "virtual.path"), !e.startsWith("<Virtual>/"))
      throw be("ACTIONS_INVALID_CONTROL_PATH", "virtual.path", e);
    if (typeof t == "number" && !Number.isFinite(t) || Array.isArray(t) && (t.length !== 2 || t.some((s) => !Number.isFinite(s))))
      throw be("ACTIONS_INVALID_DEFINITION", "virtual.value");
    this.virtual.set(e, Array.isArray(t) ? Object.freeze([t[0], t[1]]) : t);
  }
  clearVirtualControl(e) {
    this.assertAlive(), this.virtual.delete(e);
  }
  rebind(e, t = "reject") {
    return this.assertAlive(), this.rebinding.rebind(e, t);
  }
  clearRebind(e, t, s) {
    return this.assertAlive(), this.rebinding.clear(e, t, s);
  }
  listOverrides() {
    return this.assertAlive(), this.rebinding.list();
  }
  saveOverrides() {
    this.assertAlive();
    const t = this.persistence.save(ur(this.rebinding.list())).finally(() => {
      this.pendingSave === t && (this.pendingSave = null);
    });
    return this.pendingSave = t, t;
  }
  captureCommand(e) {
    return this.assertAlive(), bg(this.current, e);
  }
  applyCommand(e) {
    this.assertAlive(), this.boundCommand = e === null ? null : wg(e);
  }
  subscribe(e, t, s) {
    this.assertAlive();
    const n = typeof e == "string" ? e : e.id;
    if (!["started", "performed", "canceled"].includes(t) || typeof s != "function")
      throw be("ACTIONS_INVALID_DEFINITION", "subscription");
    const r = this.listeners.get(n) ?? /* @__PURE__ */ new Map(), o = r.get(t) ?? /* @__PURE__ */ new Set();
    o.add(s), r.set(t, o), this.listeners.set(n, r);
    let a = !0;
    return { unsubscribe: () => {
      if (!a)
        return;
      a = !1;
      const d = this.listeners.get(n)?.get(t);
      d?.delete(s), d?.size === 0 && this.listeners.get(n)?.delete(t), this.listeners.get(n)?.size === 0 && this.listeners.delete(n);
    } };
  }
  inspect() {
    let e = 0, t = 0;
    for (const s of this.maps.values()) {
      const n = Object.values(s.actions);
      e += n.length;
      for (const r of n)
        t += r.bindings.length;
    }
    return Object.freeze({
      lifecycle: this.destroyed ? "destroyed" : "active",
      sequence: this.current.sequence,
      mapCount: this.maps.size,
      actionCount: e,
      bindingCount: t,
      overrideCount: this.rebinding.size,
      enabledMaps: Object.freeze([...this.activeMaps.keys()].sort()),
      scheme: this.explicitScheme
    });
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async destroyInternal() {
    if (this.destroyed)
      return;
    this.destroyed = !0;
    const e = [];
    if (this.pendingSave)
      try {
        await this.pendingSave;
      } catch (t) {
        e.push(t);
      }
    try {
      await this.persistence.destroy?.();
    } catch (t) {
      e.push(t);
    }
    if (this.activeMaps.clear(), this.rebinding.clearAll(), this.virtual.clear(), this.interactionMemory.clear(), this.listeners.clear(), this.boundCommand = null, this.current = Object.freeze({
      sequence: this.current.sequence,
      timestampMs: this.current.timestampMs,
      scheme: null,
      values: Object.freeze({}),
      states: Object.freeze({})
    }), e.length > 0)
      throw e.length === 1 ? e[0] : Object.assign(new Error("Input cleanup failed."), { errors: Object.freeze(e) });
  }
  resetFrame(e) {
    return this.current = Io(this.maps.values(), this.current, this.current.sequence + 1, e, this.explicitScheme, !0), this.interactionMemory.clear(), this.emit(this.current.states), this.current;
  }
  emit(e) {
    for (const t of Object.values(e))
      for (const s of ["started", "performed", "canceled"])
        if (t[s])
          for (const n of [...this.listeners.get(t.id)?.get(s) ?? []])
            n(t);
  }
  loadOverrides() {
    const e = this.persistence.load();
    if (!e)
      return;
    const t = As(e);
    t && this.rebinding.load(t.overrides);
  }
  scheduleSave() {
    this.saveOverrides().catch(() => {
    });
  }
  requireMap(e) {
    const t = this.maps.get(e);
    if (!t)
      throw be("ACTIONS_UNKNOWN_MAP", "mapId", e);
    return t;
  }
  assertAlive() {
    if (this.destroyed)
      throw be("ACTIONS_RUNTIME_DESTROYED");
  }
}
const xg = new TextEncoder(), _g = new TextDecoder("utf-8", { fatal: !0 });
function $g(i) {
  try {
    const e = _g.decode(i), t = As(e);
    return t ? ur(t.overrides) : null;
  } catch {
    return null;
  }
}
class zg {
  constructor(e, t) {
    c(this, "area");
    c(this, "cached");
    c(this, "pending", /* @__PURE__ */ new Set());
    c(this, "failures", []);
    c(this, "destroyed", !1);
    this.area = e, this.cached = t;
  }
  load() {
    return this.cached;
  }
  save(e) {
    if (this.destroyed) return Promise.reject(new Dt("provider-destroyed", "set", "Input actions persistence has been destroyed."));
    const t = As(e);
    if (!t) return Promise.reject(new TypeError("Input action overrides do not satisfy schema version 1."));
    const s = ur(t.overrides), n = this.area.set(Ec, xg.encode(s)).then(() => {
      this.cached = s;
    });
    return this.pending.add(n), n.then(() => {
      this.pending.delete(n);
    }, (r) => {
      this.pending.delete(n), this.failures.push(r);
    }), n;
  }
  async destroy() {
    if (!this.destroyed) {
      if (this.destroyed = !0, await Promise.allSettled([...this.pending]), this.failures.length === 1) throw this.failures[0];
      if (this.failures.length > 1) throw Object.assign(new Error("Input actions persistence cleanup observed failed writes."), { errors: Object.freeze([...this.failures]) });
    }
  }
}
async function Og(i) {
  const e = await i.get(Ec);
  return new zg(i, e ? $g(e) : null);
}
async function Dg(i, e, t) {
  const s = e ? await Og(e.openNamespace("input-actions")) : Ac(), n = new Ag({ ...i ?? {}, persistence: s });
  return t.retainInputActions(n), n;
}
const On = "1.0.0", wt = Object.freeze({
  keyboard: "keyboard",
  pointer: "pointer",
  pointerLock: "pointer-lock",
  wheel: "wheel",
  touch: "touch",
  gamepad: "gamepad",
  focusReset: "focus-reset"
});
class je extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "InputProviderContractError";
  }
}
const Cg = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, Ng = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, _c = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
function pr(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function kg(i, e) {
  if (!pr(i) || typeof i.id != "string" || !Ng.test(i.id))
    throw new je("invalid-capability", `${e}.id`, `${e}.id must be a normalized capability id.`);
  if (typeof i.version != "string" || !_c.test(i.version))
    throw new je("invalid-capability", `${e}.version`, `${e}.version must be a semantic version.`);
}
function Rg(i) {
  if (!pr(i))
    throw new je("invalid-descriptor", "descriptor", "Input provider descriptor must be an object.");
  if (typeof i.id != "string" || !Cg.test(i.id))
    throw new je("invalid-provider-id", "descriptor.id", "Input provider id must be normalized and namespaced.");
  if (i.contractVersion !== On)
    throw new je("incompatible-contract-version", "descriptor.contractVersion", `Input provider contract ${String(i.contractVersion)} is incompatible; expected ${On}.`);
  if (typeof i.implementationVersion != "string" || !_c.test(i.implementationVersion))
    throw new je("invalid-implementation-version", "descriptor.implementationVersion", "Input provider implementationVersion must be a semantic version.");
  if (!Array.isArray(i.capabilities))
    throw new je("invalid-capability", "descriptor.capabilities", "Input provider capabilities must be an array.");
  const e = /* @__PURE__ */ new Set();
  if (i.capabilities.forEach((t, s) => {
    const n = `descriptor.capabilities[${s}]`;
    if (kg(t, n), e.has(t.id))
      throw new je("duplicate-capability", `${n}.id`, `Input capability "${t.id}" is declared more than once.`);
    e.add(t.id);
  }), typeof i.create != "function")
    throw new je("invalid-factory", "descriptor.create", "Input provider descriptor must define a create factory.");
}
function $c(i) {
  return Rg(i), i;
}
function Pg(i) {
  if (!pr(i) || typeof i.initialize != "function" || typeof i.sample != "function" || typeof i.setCapturePolicy != "function" || typeof i.requestPointerLock != "function" || typeof i.exitPointerLock != "function" || typeof i.destroy != "function")
    throw new je("invalid-provider-instance", "provider", "Input provider must implement initialize, sample, capture policy, pointer-lock commands and destroy.");
}
function jg(i) {
  return Pg(i), i;
}
function Tg(i) {
  const e = i.ownerDocument, t = e.defaultView;
  if (!t)
    throw new Error("Browser input target must belong to a document with a window.");
  return {
    window: t,
    document: e,
    navigator: t.navigator,
    now: () => t.performance.now()
  };
}
function Lg(i, e) {
  return Object.freeze({
    id: i.identifier,
    position: Object.freeze([i.clientX, i.clientY]),
    pressure: Number.isFinite(i.force) ? i.force : 0,
    primary: e
  });
}
class Mg {
  constructor(e, t = Tg(e)) {
    c(this, "target");
    c(this, "platform");
    c(this, "keys", /* @__PURE__ */ new Set());
    c(this, "buttons", /* @__PURE__ */ new Set());
    c(this, "touches", /* @__PURE__ */ new Map());
    c(this, "listeners", []);
    c(this, "pointer", {
      x: 0,
      y: 0,
      deltaX: 0,
      deltaY: 0,
      wheelX: 0,
      wheelY: 0,
      wheelZ: 0
    });
    c(this, "captureCodes", /* @__PURE__ */ new Set());
    c(this, "keyboardCaptureActive", !1);
    c(this, "focused", !0);
    c(this, "visible", !0);
    c(this, "sequence", 0);
    c(this, "lastPinchDistance", 0);
    c(this, "lastTwoFingerMid", null);
    c(this, "lastPointerLockExitAtMs", -1 / 0);
    c(this, "pointerLockRequestInFlight", !1);
    c(this, "logger", null);
    c(this, "initialized", !1);
    c(this, "destroyed", !1);
    c(this, "destroyPromise", null);
    c(this, "onKeyDown", ((e) => {
      !this.canvasOwnsKeyboard() || this.isEditableTarget(e.target) || (this.captureCodes.has(e.code) && e.preventDefault(), this.keys.add(e.code));
    }));
    c(this, "onKeyUp", ((e) => {
      this.captureCodes.has(e.code) && !this.isEditableTarget(e.target) && this.canvasOwnsKeyboard() && e.preventDefault(), this.keys.delete(e.code);
    }));
    c(this, "onCanvasFocus", () => {
      this.keyboardCaptureActive = !0, this.focused = !0;
    });
    c(this, "onCanvasBlur", () => {
      this.platform.document.pointerLockElement !== this.target && (this.keyboardCaptureActive = !1, this.keys.clear());
    });
    c(this, "onWindowMouseDown", ((e) => {
      this.releaseKeyboardCapture(e.target);
    }));
    c(this, "onWindowTouchStart", ((e) => {
      this.releaseKeyboardCapture(e.target);
    }));
    c(this, "onCanvasMouseDown", ((e) => {
      this.pointer.x = e.clientX, this.pointer.y = e.clientY, this.buttons.add(e.button), this.activateKeyboardCapture(), e.preventDefault();
    }));
    c(this, "onCanvasMouseUp", ((e) => {
      this.buttons.delete(e.button);
    }));
    c(this, "onMouseMove", ((e) => {
      this.platform.document.pointerLockElement !== this.target && e.target !== this.target && this.buttons.size === 0 || (this.pointer.x = e.clientX, this.pointer.y = e.clientY, this.pointer.deltaX += e.movementX, this.pointer.deltaY += e.movementY);
    }));
    c(this, "onWheel", ((e) => {
      this.pointer.wheelX += e.deltaX, this.pointer.wheelY += e.deltaY, this.pointer.wheelZ += e.deltaZ, e.preventDefault();
    }));
    c(this, "onContextMenu", ((e) => e.preventDefault()));
    c(this, "onTouchStart", ((e) => {
      if (e.preventDefault(), this.activateKeyboardCapture(), this.updateTouchSnapshots(e.touches), this.updateSyntheticButtons(e.touches.length), e.touches.length >= 2) {
        const t = e.touches.item(0), s = e.touches.item(1);
        t && s && (this.lastPinchDistance = Math.hypot(t.clientX - s.clientX, t.clientY - s.clientY), this.lastTwoFingerMid = [(t.clientX + s.clientX) / 2, (t.clientY + s.clientY) / 2]);
      }
    }));
    c(this, "onTouchMove", ((e) => {
      e.preventDefault();
      const t = new Map(this.touches);
      if (this.updateTouchSnapshots(e.touches), this.updateSyntheticButtons(e.touches.length), e.touches.length === 1) {
        const s = e.touches.item(0), n = s ? t.get(s.identifier) : null;
        s && n && (this.pointer.deltaX += s.clientX - n.position[0], this.pointer.deltaY += s.clientY - n.position[1], this.pointer.x = s.clientX, this.pointer.y = s.clientY);
      } else if (e.touches.length >= 2) {
        const s = e.touches.item(0), n = e.touches.item(1);
        if (s && n) {
          const r = [
            (s.clientX + n.clientX) / 2,
            (s.clientY + n.clientY) / 2
          ];
          this.lastTwoFingerMid && (this.pointer.deltaX += r[0] - this.lastTwoFingerMid[0], this.pointer.deltaY += r[1] - this.lastTwoFingerMid[1]), this.lastTwoFingerMid = r;
          const o = Math.hypot(s.clientX - n.clientX, s.clientY - n.clientY);
          this.lastPinchDistance > 0 && (this.pointer.wheelY += -(o - this.lastPinchDistance) * 0.2), this.lastPinchDistance = o;
        }
      }
    }));
    c(this, "onTouchEnd", ((e) => {
      e.preventDefault(), this.updateTouchSnapshots(e.touches), this.updateSyntheticButtons(e.touches.length), e.touches.length < 2 && (this.lastPinchDistance = 0, this.lastTwoFingerMid = null);
    }));
    c(this, "onPointerLockChange", () => {
      this.platform.document.pointerLockElement === this.target ? this.activateKeyboardCapture() : this.lastPointerLockExitAtMs = this.platform.now();
    });
    c(this, "onWindowBlur", () => {
      this.focused = !1, this.keyboardCaptureActive = !1, this.resetHeldState();
    });
    c(this, "onWindowFocus", () => {
      this.focused = !0;
    });
    c(this, "onVisibilityChange", () => {
      this.visible = this.platform.document.visibilityState !== "hidden", this.visible || (this.focused = !1, this.keyboardCaptureActive = !1, this.resetHeldState());
    });
    c(this, "onAbort", () => {
      this.destroy().catch((e) => {
        this.logger?.error("Browser input provider abort cleanup failed.", { error: e });
      });
    });
    this.target = e, this.platform = t;
  }
  async initialize(e) {
    if (this.destroyed)
      throw new Error("Browser input provider has already been destroyed.");
    if (!this.initialized) {
      if (e.signal.aborted)
        throw new Error("Browser input provider initialization was aborted.");
      this.logger = e.logger, this.focused = this.platform.document.hasFocus?.() ?? !0, this.visible = this.platform.document.visibilityState !== "hidden";
      try {
        this.installListeners(e.signal), this.initialized = !0;
      } catch (t) {
        const s = this.removeListeners();
        throw this.destroyed = !0, this.clearState(), s.length > 0 ? Object.assign(new Error("Browser input provider initialization and rollback failed."), {
          name: "AggregateError",
          errors: [t, ...s]
        }) : t;
      }
    }
  }
  sample() {
    if (!this.initialized || this.destroyed)
      throw new Error("Browser input provider must be initialized before sampling.");
    const e = this.readGamepads(), t = Object.freeze({
      sequence: ++this.sequence,
      timestampMs: this.platform.now(),
      focused: this.focused,
      visible: this.visible,
      keyboard: Object.freeze({ pressed: Object.freeze([...this.keys].sort()) }),
      pointer: Object.freeze({
        position: Object.freeze([this.pointer.x, this.pointer.y]),
        delta: Object.freeze([this.pointer.deltaX, this.pointer.deltaY]),
        buttons: Object.freeze([...this.buttons].sort((s, n) => s - n)),
        locked: this.platform.document.pointerLockElement === this.target
      }),
      wheel: Object.freeze({
        delta: Object.freeze([
          this.pointer.wheelX,
          this.pointer.wheelY,
          this.pointer.wheelZ
        ])
      }),
      touches: Object.freeze([...this.touches.values()].sort((s, n) => s.id - n.id)),
      gamepads: e
    });
    return this.resetFrameDeltas(), t;
  }
  setCapturePolicy(e) {
    const t = [...e.preventDefaultCodes];
    if (t.some((s) => typeof s != "string" || s.length === 0))
      throw new TypeError("Input capture policy codes must be non-empty strings.");
    this.captureCodes = new Set(t);
  }
  async requestPointerLock() {
    if (!this.initialized || this.destroyed)
      return "denied";
    const e = this.target.requestPointerLock;
    if (typeof e != "function")
      return "unsupported";
    if (this.platform.document.pointerLockElement === this.target)
      return "requested";
    if (this.pointerLockRequestInFlight || this.platform.now() - this.lastPointerLockExitAtMs < 900)
      return "denied";
    this.activateKeyboardCapture(), this.pointerLockRequestInFlight = !0;
    try {
      return await Promise.resolve(e.call(this.target)), !this.initialized || this.destroyed ? (this.exitPointerLock(), "denied") : "requested";
    } catch (t) {
      return this.lastPointerLockExitAtMs = this.platform.now(), t instanceof DOMException && t.name === "SecurityError" || this.logger?.warn("Pointer lock request failed.", { error: t }), "denied";
    } finally {
      this.pointerLockRequestInFlight = !1;
    }
  }
  exitPointerLock() {
    if (this.platform.document.pointerLockElement === this.target)
      try {
        this.platform.document.exitPointerLock?.();
      } catch (e) {
        this.logger?.warn("Pointer lock exit failed.", { error: e });
      }
  }
  destroy() {
    return this.destroyPromise ? this.destroyPromise : (this.destroyPromise = Promise.resolve().then(() => {
      if (this.destroyed)
        return;
      this.destroyed = !0, this.initialized = !1;
      const e = this.removeListeners();
      if (this.exitPointerLock(), this.clearState(), this.logger = null, e.length > 0)
        throw Object.assign(new Error("Browser input provider cleanup failed."), {
          name: "AggregateError",
          errors: e
        });
    }), this.destroyPromise);
  }
  installListeners(e) {
    const { window: t, document: s } = this.platform;
    this.listen(t, "keydown", this.onKeyDown, { capture: !0 }), this.listen(t, "keyup", this.onKeyUp, { capture: !0 }), this.listen(t, "mousedown", this.onWindowMouseDown, { capture: !0 }), this.listen(t, "touchstart", this.onWindowTouchStart, { capture: !0, passive: !0 }), this.listen(t, "mousemove", this.onMouseMove), this.listen(t, "blur", this.onWindowBlur), this.listen(t, "focus", this.onWindowFocus), this.listen(s, "pointerlockchange", this.onPointerLockChange), this.listen(s, "visibilitychange", this.onVisibilityChange), this.listen(this.target, "focus", this.onCanvasFocus), this.listen(this.target, "blur", this.onCanvasBlur), this.listen(this.target, "mousedown", this.onCanvasMouseDown), this.listen(this.target, "mouseup", this.onCanvasMouseUp), this.listen(this.target, "wheel", this.onWheel, { passive: !1 }), this.listen(this.target, "contextmenu", this.onContextMenu), this.listen(this.target, "touchstart", this.onTouchStart, { passive: !1 }), this.listen(this.target, "touchmove", this.onTouchMove, { passive: !1 }), this.listen(this.target, "touchend", this.onTouchEnd, { passive: !1 }), this.listen(this.target, "touchcancel", this.onTouchEnd, { passive: !1 }), this.listen(e, "abort", this.onAbort, { once: !0 }), this.target.tabIndex < 0 && (this.target.tabIndex = 0);
  }
  listen(e, t, s, n) {
    e.addEventListener(t, s, n), this.listeners.push(() => e.removeEventListener(t, s, n));
  }
  removeListeners() {
    const e = [];
    for (let t = this.listeners.length - 1; t >= 0; t--)
      try {
        this.listeners[t]();
      } catch (s) {
        e.push(s);
      }
    return this.listeners.length = 0, e;
  }
  readGamepads() {
    const e = this.platform.navigator.getGamepads;
    if (typeof e != "function")
      return Object.freeze([]);
    const t = Array.from(e.call(this.platform.navigator) ?? []);
    return Object.freeze(t.flatMap((s) => !s || !s.connected ? [] : [Object.freeze({
      index: s.index,
      id: s.id,
      connected: s.connected,
      mapping: s.mapping,
      timestamp: s.timestamp,
      axes: Object.freeze([...s.axes]),
      buttons: Object.freeze(s.buttons.map((n) => Object.freeze({
        pressed: n.pressed,
        touched: n.touched,
        value: n.value
      })))
    })]));
  }
  clearState() {
    this.keys.clear(), this.buttons.clear(), this.touches.clear(), this.keyboardCaptureActive = !1, this.captureCodes.clear(), this.lastPinchDistance = 0, this.lastTwoFingerMid = null, this.resetFrameDeltas();
  }
  resetHeldState() {
    this.keys.clear(), this.buttons.clear(), this.touches.clear(), this.lastPinchDistance = 0, this.lastTwoFingerMid = null, this.resetFrameDeltas();
  }
  resetFrameDeltas() {
    this.pointer.deltaX = 0, this.pointer.deltaY = 0, this.pointer.wheelX = 0, this.pointer.wheelY = 0, this.pointer.wheelZ = 0;
  }
  canvasOwnsKeyboard() {
    return this.platform.document.activeElement === this.target || this.platform.document.pointerLockElement === this.target || this.keyboardCaptureActive;
  }
  isEditableTarget(e) {
    const t = e;
    return !t || typeof t.matches != "function" ? !1 : t.isContentEditable ? !0 : t.matches("input, textarea, select");
  }
  activateKeyboardCapture() {
    this.keyboardCaptureActive = !0, this.target.tabIndex < 0 && (this.target.tabIndex = 0), this.target.focus();
  }
  releaseKeyboardCapture(e) {
    this.platform.document.pointerLockElement !== this.target && e !== this.target && (this.keyboardCaptureActive = !1, this.keys.clear());
  }
  updateTouchSnapshots(e) {
    this.touches.clear();
    for (let t = 0; t < e.length; t++) {
      const s = e.item(t);
      s && this.touches.set(s.identifier, Lg(s, t === 0));
    }
  }
  updateSyntheticButtons(e) {
    this.buttons.delete(0), this.buttons.delete(1), this.buttons.delete(2), e === 1 ? (this.buttons.add(0), this.buttons.add(1)) : e >= 2 && this.buttons.add(2);
  }
}
function Vg(i, e) {
  return Object.freeze({
    id: "forgeng.input.browser",
    contractVersion: On,
    implementationVersion: "1.0.0",
    capabilities: Object.freeze([
      { id: wt.keyboard, version: "1.0.0" },
      { id: wt.pointer, version: "1.0.0" },
      { id: wt.pointerLock, version: "1.0.0" },
      { id: wt.wheel, version: "1.0.0" },
      { id: wt.touch, version: "1.0.0" },
      { id: wt.gamepad, version: "1.0.0" },
      { id: wt.focusReset, version: "1.0.0" }
    ]),
    create: () => new Mg(i, e)
  });
}
function Gg(i) {
  return /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/.test(i) ? i : "invalid-id";
}
function Fg(i, e) {
  return i === "default" ? Vg(e) : $c(i);
}
class Bg {
  constructor(e, t) {
    c(this, "provider");
    c(this, "abortController");
    c(this, "destroyPromise", null);
    this.provider = e, this.abortController = t;
  }
  destroy() {
    return this.destroyPromise || (this.abortController.abort(new Error("Input provider is shutting down.")), this.destroyPromise = this.provider.destroy()), this.destroyPromise;
  }
}
async function Ug(i, e, t, s) {
  const n = Fg(i, e);
  $c(n);
  const r = jg(n.create()), o = new AbortController(), a = new Bg(r, o);
  return s.retainInputProvider(a), await r.initialize({
    signal: o.signal,
    logger: Ct(t.child("input").child("provider").child(Gg(n.id)), {
      providerId: n.id,
      providerContractVersion: n.contractVersion,
      providerImplementationVersion: n.implementationVersion
    })
  }), a;
}
function Wg(i, e) {
  if (!e) return i;
  const t = /* @__PURE__ */ new Map(), s = (n, r, o) => {
    const a = o && !t.has(n.id) ? Object.freeze({ ...n, enabledByDefault: !1 }) : n, d = t.get(n.id);
    if (d && d !== n && JSON.stringify(d) !== JSON.stringify(a))
      throw new Si("ACTIONS_DUPLICATE_ID", `Action map "${n.id}" has conflicting definitions.`, r, n.id);
    d || t.set(n.id, a);
  };
  for (const [n, r] of (i.maps ?? []).entries()) s(r, `actions.maps[${n}]`, !1);
  for (const [n, r] of e.actionMaps.entries()) s(r, `gameplay.actionMaps[${n}]`, !1);
  for (const [n, r] of e.scenes.entries())
    for (const [o, a] of r.input.maps.entries()) s(a, `gameplay.scenes[${n}].input.maps[${o}]`, !0);
  return Object.freeze({ ...i, maps: Object.freeze([...t.values()]) });
}
function Yg(i, e, t) {
  if (typeof i != "object" || i === null)
    return !1;
  const s = i;
  return s.id === e && s.namespace === t && Object.prototype.toString.call(s.value) === "[object ArrayBuffer]";
}
function Zi(i, e) {
  return `${i}\0${e}`;
}
const Qs = "__forgeng.auto-id", zc = /^[0-9a-f]{32}$/;
function qg(i) {
  if (typeof i != "string" || !zc.test(i))
    throw new ot("invalid-config", "options.fingerprint", "Fingerprint must be 32 lower-case hex characters.");
  return i;
}
function Kg(i, e, t, s) {
  const n = Zi(Qs, e), r = i.get(n);
  r.onsuccess = () => {
    if (r.result === void 0) {
      const a = { id: n, namespace: Qs, value: t };
      i.put(a);
      return;
    }
    const o = r.result;
    !o || o.id !== n || o.namespace !== Qs || typeof o.value != "string" || !zc.test(o.value) ? s(new Dt("corrupt-data", "initialize", "Identity claim is corrupt.")) : o.value !== t && s(new Dt("unsupported-data", "initialize", "Namespace identity mismatch."));
  };
}
class Hg {
  constructor(e, t, s, n, r) {
    c(this, "namespace");
    c(this, "readValue");
    c(this, "writeValue");
    c(this, "removeValue");
    c(this, "clearValues");
    this.namespace = e, this.readValue = t, this.writeValue = s, this.removeValue = n, this.clearValues = r;
  }
  get(e, t) {
    return this.readValue(e, t);
  }
  set(e, t, s) {
    return this.writeValue(e, t, s);
  }
  remove(e, t) {
    return this.removeValue(e, t);
  }
  clear(e) {
    return this.clearValues(e);
  }
}
const Eo = 128, Xg = /[\u0000-\u001f\u007f]/;
function Jg(i) {
  if (typeof i != "string" || i.length === 0 || i.length > Eo || Xg.test(i))
    throw new ot("invalid-config", "options.databaseName", `Browser storage databaseName must contain 1-${Eo} non-control characters.`);
  return i;
}
function Qg(i) {
  if (typeof i != "object" || i === null || typeof i.open != "function")
    throw new ot("invalid-config", "options.indexedDB", "Browser storage indexedDB must implement IDBFactory.open().");
  return i;
}
const Zg = "forgeng-storage-v1", Ao = 1, vt = "records", Vi = "namespace", ey = Object.freeze({
  SecurityError: { code: "access-denied", message: "Browser storage access was denied." },
  NotAllowedError: { code: "access-denied", message: "Browser storage access was denied." },
  QuotaExceededError: { code: "quota-exceeded", message: "Browser storage quota was exceeded." },
  VersionError: { code: "unsupported-data", message: "Browser storage data or schema is unsupported." },
  DataError: { code: "unsupported-data", message: "Browser storage data or schema is unsupported." },
  InvalidStateError: { code: "unavailable", message: "Browser storage is unavailable." }
});
function oe(i, e, t, s) {
  return new Dt(i, e, t, s);
}
function ty(i) {
  const e = i?.name;
  return typeof e == "string" ? e : null;
}
class iy {
  constructor(e = {}) {
    c(this, "indexedDBFactory");
    c(this, "databaseName");
    c(this, "fingerprint");
    c(this, "lifecycleAbort", new AbortController());
    c(this, "pending", /* @__PURE__ */ new Set());
    c(this, "activeTransactions", /* @__PURE__ */ new Set());
    c(this, "lifecycle", "new");
    c(this, "applicationNamespace", null);
    c(this, "contextSignal", null);
    c(this, "database", null);
    c(this, "initializePromise", null);
    c(this, "destroyPromise", null);
    c(this, "onContextAbort", () => {
      this.destroy();
    });
    if (e === null || typeof e != "object" || Array.isArray(e))
      throw new ot("invalid-config", "options", "Browser storage options must be an object.");
    const t = typeof globalThis.indexedDB == "object" ? globalThis.indexedDB : null;
    this.indexedDBFactory = e.indexedDB === void 0 ? t : Qg(e.indexedDB), this.databaseName = Jg(e.databaseName ?? Zg), this.fingerprint = e.fingerprint === void 0 ? null : qg(e.fingerprint);
  }
  initialize(e) {
    if (this.initializePromise)
      return this.initializePromise;
    if (this.lifecycle === "destroying" || this.lifecycle === "destroyed")
      return Promise.reject(oe("provider-destroyed", "initialize", "Browser storage provider has been destroyed."));
    if (vc(e), e.signal.aborted)
      return Promise.reject(oe("aborted", "initialize", "Browser storage provider initialization was aborted."));
    if (!this.indexedDBFactory)
      return Promise.reject(oe("unavailable", "initialize", "IndexedDB is unavailable in this environment."));
    this.lifecycle = "initializing", this.applicationNamespace = e.applicationNamespace, this.contextSignal = e.signal, e.signal.addEventListener("abort", this.onContextAbort, { once: !0 });
    const t = this.openDatabase(e.signal).then(async (s) => {
      try {
        if (this.throwIfAborted("initialize", e.signal), this.lifecycle !== "initializing" || (this.fingerprint && await this.transactDatabase(s, "initialize", "readwrite", { signal: e.signal }, void 0, (n, r, o) => Kg(n, e.applicationNamespace, this.fingerprint, o)), this.throwIfAborted("initialize", e.signal), this.lifecycle !== "initializing"))
          throw oe("aborted", "initialize", "Browser storage provider initialization was aborted.");
      } catch (n) {
        throw s.close(), n;
      }
      this.database = s, this.installDatabaseLifecycle(s), this.lifecycle = "ready";
    }).catch((s) => {
      throw this.database?.close(), this.database = null, this.lifecycle === "initializing" && (e.signal.removeEventListener("abort", this.onContextAbort), this.contextSignal = null, this.applicationNamespace = null, this.lifecycle = "new"), this.classifyFailure(s, "initialize", e.signal.aborted);
    });
    return this.initializePromise = this.track(t), this.initializePromise;
  }
  openNamespace(e) {
    this.assertReady("open-namespace");
    const t = Ic(this.applicationNamespace, e);
    return new Hg(t, (s, n) => this.read(t, s, n), (s, n, r) => this.write(t, s, n, r), (s, n) => this.delete(t, s, n), (s) => this.clearNamespace(t, s));
  }
  destroy() {
    if (this.destroyPromise)
      return this.destroyPromise;
    this.lifecycle = "destroying", this.lifecycleAbort.abort(), this.contextSignal?.removeEventListener("abort", this.onContextAbort), this.contextSignal = null, this.database?.close(), this.database = null;
    for (const e of this.activeTransactions)
      this.abortTransaction(e);
    return this.destroyPromise = (async () => {
      await Promise.allSettled([...this.pending]), this.applicationNamespace = null, this.lifecycle = "destroyed";
    })(), this.destroyPromise;
  }
  openDatabase(e) {
    const t = this.indexedDBFactory;
    if (!t)
      return Promise.reject(oe("unavailable", "initialize", "IndexedDB is unavailable."));
    let s;
    try {
      s = t.open(this.databaseName, Ao);
    } catch (n) {
      return Promise.reject(this.classifyFailure(n, "initialize"));
    }
    return new Promise((n, r) => {
      let o = !1, a = e.aborted || this.lifecycleAbort.signal.aborted, d = null;
      const u = () => {
        e.removeEventListener("abort", f), this.lifecycleAbort.signal.removeEventListener("abort", f);
      }, l = (h) => {
        o || (o = !0, u(), r(h));
      }, f = () => {
        a = !0, s.transaction && this.abortTransaction(s.transaction);
      };
      e.addEventListener("abort", f, { once: !0 }), this.lifecycleAbort.signal.addEventListener("abort", f, { once: !0 }), s.onupgradeneeded = (h) => {
        if (a) {
          s.transaction && this.abortTransaction(s.transaction);
          return;
        }
        try {
          if (h.oldVersion !== 0 || s.result.objectStoreNames.contains(vt))
            throw oe("unsupported-data", "initialize", "Browser storage database schema is incompatible.");
          s.result.createObjectStore(vt, { keyPath: "id" }).createIndex(Vi, "namespace", { unique: !1 });
        } catch (p) {
          d = this.classifyFailure(p, "initialize"), s.transaction && this.abortTransaction(s.transaction);
        }
      }, s.onerror = () => {
        l(a ? oe("aborted", "initialize", "Browser storage initialization was aborted.") : d ?? this.classifyFailure(s.error, "initialize"));
      }, s.onblocked = () => {
        l(oe("unavailable", "initialize", "Browser storage database upgrade is blocked by another connection."));
      }, s.onsuccess = () => {
        const h = s.result;
        if (o || a) {
          h.close(), o || l(oe("aborted", "initialize", "Browser storage initialization was aborted."));
          return;
        }
        try {
          this.validateDatabaseSchema(h);
        } catch (p) {
          h.close(), l(p);
          return;
        }
        o = !0, u(), n(h);
      };
    });
  }
  validateDatabaseSchema(e) {
    if (e.version !== Ao || !e.objectStoreNames.contains(vt))
      throw oe("unsupported-data", "initialize", "Browser storage database schema is incompatible.");
    let t;
    try {
      t = e.transaction(vt, "readonly");
      const s = t.objectStore(vt);
      if (s.keyPath !== "id" || !s.indexNames.contains(Vi))
        throw oe("unsupported-data", "initialize", "Browser storage database schema is incompatible.");
      const n = s.index(Vi);
      if (n.keyPath !== "namespace" || n.unique)
        throw oe("unsupported-data", "initialize", "Browser storage database schema is incompatible.");
    } catch (s) {
      throw this.classifyFailure(s, "initialize");
    }
  }
  installDatabaseLifecycle(e) {
    const t = () => {
      e.close(), this.database === e && (this.database = null);
    };
    e.onversionchange = t, e.onclose = t;
  }
  read(e, t, s) {
    try {
      const n = gi(t), r = Zi(e, n);
      return this.transact("get", "readonly", s, null, (o, a, d) => {
        const u = o.get(r);
        u.onsuccess = () => {
          u.result === void 0 ? a(null) : Yg(u.result, r, e) ? a(new Uint8Array(u.result.value).slice()) : d(oe("corrupt-data", "get", "Browser storage record is corrupt."));
        };
      });
    } catch (n) {
      return Promise.reject(n);
    }
  }
  write(e, t, s, n) {
    try {
      const r = gi(t), o = Sc(s), a = Zi(e, r);
      return this.transact("set", "readwrite", n, void 0, (d) => {
        const u = {
          id: a,
          namespace: e,
          value: Uint8Array.from(o).buffer
        };
        d.put(u);
      });
    } catch (r) {
      return Promise.reject(r);
    }
  }
  delete(e, t, s) {
    try {
      const n = Zi(e, gi(t));
      return this.transact("remove", "readwrite", s, !1, (r, o) => {
        const a = r.getKey(n);
        a.onsuccess = () => {
          a.result !== void 0 && (o(!0), r.delete(n));
        };
      });
    } catch (n) {
      return Promise.reject(n);
    }
  }
  clearNamespace(e, t) {
    try {
      return this.transact("clear", "readwrite", t, void 0, (s) => {
        const n = s.index(Vi).openCursor(e);
        n.onsuccess = () => {
          const r = n.result;
          r && (r.delete(), r.continue());
        };
      });
    } catch (s) {
      return Promise.reject(s);
    }
  }
  transact(e, t, s, n, r) {
    return this.assertReady(e), this.throwIfAborted(e, s?.signal), this.transactDatabase(this.database, e, t, s, n, r);
  }
  transactDatabase(e, t, s, n, r, o) {
    let a;
    try {
      a = e.transaction(vt, s);
    } catch (u) {
      return Promise.reject(this.classifyFailure(u, t));
    }
    this.activeTransactions.add(a);
    const d = new Promise((u, l) => {
      let f = r, h = null, p = !1;
      const m = () => {
        n?.signal?.removeEventListener("abort", y), this.lifecycleAbort.signal.removeEventListener("abort", y), this.activeTransactions.delete(a);
      }, y = () => {
        p || this.abortTransaction(a);
      }, b = (g) => {
        h = g, this.abortTransaction(a);
      };
      n?.signal?.addEventListener("abort", y, { once: !0 }), this.lifecycleAbort.signal.addEventListener("abort", y, { once: !0 }), a.oncomplete = () => {
        p = !0, m(), u(f);
      }, a.onabort = () => {
        p = !0, m(), l(h ?? this.classifyFailure(a.error, t, n?.signal?.aborted || this.lifecycleAbort.signal.aborted));
      };
      try {
        o(a.objectStore(vt), (g) => {
          f = g;
        }, b);
      } catch (g) {
        b(this.classifyFailure(g, t));
      }
    });
    return this.track(d);
  }
  assertReady(e) {
    if (this.lifecycle === "destroying" || this.lifecycle === "destroyed")
      throw oe("provider-destroyed", e, "Browser storage provider has been destroyed.");
    if (this.lifecycle !== "ready" || !this.database)
      throw oe("unavailable", e, "Browser storage provider is unavailable.");
  }
  throwIfAborted(e, t) {
    if (t?.aborted || this.contextSignal?.aborted || this.lifecycleAbort.signal.aborted)
      throw oe("aborted", e, `Browser storage ${e} operation was aborted.`);
  }
  classifyFailure(e, t, s = !1) {
    if (e instanceof Dt)
      return e;
    if (s)
      return oe("aborted", t, `Browser storage ${t} operation was aborted.`);
    const n = ey[ty(e) ?? ""];
    return n ? oe(n.code, t, n.message, e) : oe("backend-failure", t, `Browser storage ${t} operation failed.`, e);
  }
  abortTransaction(e) {
    try {
      e.abort();
    } catch {
    }
  }
  track(e) {
    return this.pending.add(e), e.then(() => this.pending.delete(e), () => this.pending.delete(e)), e;
  }
}
const Oc = Object.freeze({
  id: "forgeng.storage.browser",
  contractVersion: us,
  implementationVersion: "1.0.1",
  capabilities: Object.freeze([
    Object.freeze({ id: yc.persistent, version: "1.0.0" })
  ]),
  create: (i) => new iy(i)
}), sy = 16 * 1024 * 1024, Dn = /* @__PURE__ */ Symbol("forgeng.memory-storage.backing-store-access"), fs = Promise.resolve();
function ni(i) {
  return i.then(() => {
  }, () => {
  });
}
class ny {
  constructor(e) {
    c(this, "state");
    this.state = e;
  }
  runKey(e, t) {
    const s = this.state.keyTails.get(e) ?? fs, n = Promise.all([
      ni(this.state.barrier),
      ni(s)
    ]).then(t), r = ni(n);
    return this.state.keyTails.set(e, r), r.then(() => {
      this.state.keyTails.get(e) === r && this.state.keyTails.delete(e);
    }), n;
  }
  runClear(e) {
    const t = [this.state.barrier, ...this.state.keyTails.values()], s = Promise.all(t.map(ni)).then(e);
    return this.state.barrier = ni(s), s;
  }
  get values() {
    return this.state.values;
  }
}
class xo {
  constructor() {
    c(this, "namespaces", /* @__PURE__ */ new Map());
  }
  [Dn](e) {
    let t = this.namespaces.get(e);
    return t || (t = {
      values: /* @__PURE__ */ new Map(),
      keyTails: /* @__PURE__ */ new Map(),
      barrier: fs
    }, this.namespaces.set(e, t)), new ny(t);
  }
}
function dt(i, e, t, s) {
  return new Dt(i, e, t, s);
}
function ry(i) {
  if (!Number.isSafeInteger(i) || i <= 0)
    throw new ot("invalid-config", "options.maxValueBytes", "Memory storage maxValueBytes must be a positive safe integer.");
  return i;
}
class oy {
  constructor(e, t, s, n, r) {
    c(this, "namespace");
    c(this, "readValue");
    c(this, "writeValue");
    c(this, "removeValue");
    c(this, "clearValues");
    this.namespace = e, this.readValue = t, this.writeValue = s, this.removeValue = n, this.clearValues = r;
  }
  get(e, t) {
    return this.readValue(e, t);
  }
  set(e, t, s) {
    return this.writeValue(e, t, s);
  }
  remove(e, t) {
    return this.removeValue(e, t);
  }
  clear(e) {
    return this.clearValues(e);
  }
}
class ay {
  constructor(e = {}) {
    c(this, "limits");
    c(this, "backingStore");
    c(this, "lifecycleAbort", new AbortController());
    c(this, "pending", /* @__PURE__ */ new Set());
    c(this, "lifecycle", "new");
    c(this, "applicationNamespace", null);
    c(this, "contextSignal", null);
    c(this, "initializePromise", null);
    c(this, "destroyPromise", null);
    c(this, "onContextAbort", () => {
      this.destroy();
    });
    if (e === null || typeof e != "object" || Array.isArray(e))
      throw new ot("invalid-config", "options", "Memory storage options must be an object.");
    if (e.backingStore !== void 0 && !(e.backingStore instanceof xo))
      throw new ot("invalid-config", "options.backingStore", "Memory storage backingStore must be a MemoryStorageBackingStore.");
    const t = ry(e.maxValueBytes ?? sy);
    this.backingStore = e.backingStore ?? new xo(), this.limits = Object.freeze({ maxValueBytes: t });
  }
  initialize(e) {
    if (this.initializePromise)
      return this.initializePromise;
    if (this.lifecycle === "destroying" || this.lifecycle === "destroyed")
      return Promise.reject(dt("provider-destroyed", "initialize", "Memory storage provider has been destroyed."));
    if (vc(e), e.signal.aborted)
      return Promise.reject(dt("aborted", "initialize", "Memory storage provider initialization was aborted."));
    this.lifecycle = "initializing", this.applicationNamespace = e.applicationNamespace, this.contextSignal = e.signal, e.signal.addEventListener("abort", this.onContextAbort, { once: !0 });
    const t = Promise.resolve().then(() => {
      if (this.throwIfAborted("initialize", e.signal), this.lifecycle !== "initializing")
        throw dt("aborted", "initialize", "Memory storage provider initialization was aborted.");
      this.lifecycle = "ready";
    }).catch((s) => {
      throw this.lifecycle === "initializing" && (e.signal.removeEventListener("abort", this.onContextAbort), this.contextSignal = null, this.applicationNamespace = null, this.lifecycle = "new"), this.classifyFailure(s, "initialize");
    });
    return this.initializePromise = this.track(t), this.initializePromise;
  }
  openNamespace(e) {
    this.assertReady("open-namespace");
    const t = Ic(this.applicationNamespace, e);
    return new oy(t, (s, n) => this.read(t, s, n), (s, n, r) => this.write(t, s, n, r), (s, n) => this.delete(t, s, n), (s) => this.clearNamespace(t, s));
  }
  destroy() {
    return this.destroyPromise ? this.destroyPromise : (this.lifecycle = "destroying", this.lifecycleAbort.abort(), this.contextSignal?.removeEventListener("abort", this.onContextAbort), this.contextSignal = null, this.destroyPromise = (async () => {
      await Promise.allSettled([...this.pending]), this.applicationNamespace = null, this.lifecycle = "destroyed";
    })(), this.destroyPromise);
  }
  read(e, t, s) {
    try {
      return this.runKey("get", e, t, s, (n, r) => {
        const o = n.get(r);
        return o === void 0 ? null : o.slice();
      });
    } catch (n) {
      return Promise.reject(n);
    }
  }
  write(e, t, s, n) {
    try {
      this.assertReady("set");
      const r = gi(t), o = Sc(s);
      return o.byteLength > this.limits.maxValueBytes ? Promise.reject(dt("value-too-large", "set", `Memory storage value exceeds the ${this.limits.maxValueBytes} byte limit.`)) : this.scheduleKey("set", e, r, n, (a) => {
        a.set(r, o);
      });
    } catch (r) {
      return Promise.reject(r);
    }
  }
  delete(e, t, s) {
    try {
      return this.runKey("remove", e, t, s, (n, r) => n.delete(r));
    } catch (n) {
      return Promise.reject(n);
    }
  }
  clearNamespace(e, t) {
    try {
      this.assertReady("clear"), this.throwIfAborted("clear", t?.signal);
      const s = this.backingStore[Dn](e), n = s.runClear(async () => {
        this.throwIfAborted("clear", t?.signal), await fs, this.throwIfAborted("clear", t?.signal), s.values.clear();
      });
      return this.track(n.catch((r) => {
        throw this.classifyFailure(r, "clear");
      }));
    } catch (s) {
      return Promise.reject(s);
    }
  }
  runKey(e, t, s, n, r) {
    this.assertReady(e);
    const o = gi(s);
    return this.scheduleKey(e, t, o, n, (a) => r(a, o));
  }
  scheduleKey(e, t, s, n, r) {
    this.throwIfAborted(e, n?.signal);
    const o = this.backingStore[Dn](t), a = o.runKey(s, async () => (this.throwIfAborted(e, n?.signal), await fs, this.throwIfAborted(e, n?.signal), r(o.values)));
    return this.track(a.catch((d) => {
      throw this.classifyFailure(d, e);
    }));
  }
  assertReady(e) {
    if (this.lifecycle === "destroying" || this.lifecycle === "destroyed")
      throw dt("provider-destroyed", e, "Memory storage provider has been destroyed.");
    if (this.lifecycle !== "ready")
      throw dt("unavailable", e, "Memory storage provider has not been initialized.");
  }
  throwIfAborted(e, t) {
    if (t?.aborted || this.contextSignal?.aborted || this.lifecycleAbort.signal.aborted)
      throw dt("aborted", e, `Memory storage ${e} operation was aborted.`);
  }
  classifyFailure(e, t) {
    return e instanceof Dt ? e : dt("backend-failure", t, `Memory storage ${t} operation failed.`, e);
  }
  track(e) {
    return this.pending.add(e), e.then(() => this.pending.delete(e), () => this.pending.delete(e)), e;
  }
}
const cy = Object.freeze({
  id: "forgeng.storage.memory",
  contractVersion: us,
  implementationVersion: "1.0.0",
  capabilities: Object.freeze([
    Object.freeze({ id: yc.boundedValueSize, version: "1.0.0" })
  ]),
  create: (i) => new ay(i)
});
function dy(i) {
  return typeof i == "object" && i !== null && "provider" in i && !("create" in i);
}
function ly(i) {
  return i === void 0 ? { selection: "disabled" } : dy(i) ? { selection: i.provider, applicationNamespace: i.applicationNamespace } : { selection: i };
}
function Dc(i, e = 2166136261) {
  let t = e;
  for (let s = 0; s < i.length; s++)
    t ^= i.charCodeAt(s), t = Math.imul(t, 16777619);
  return t >>> 0;
}
function _o(i) {
  return Dc(i).toString(36).padStart(7, "0");
}
function uy(i) {
  return [2654435761, 2246822519, 3266489917, 668265263].map((e) => Dc(i, e).toString(16).padStart(8, "0")).join("");
}
function fy(i, e) {
  if (e !== void 0)
    return { applicationNamespace: wo(e) };
  const t = i.ownerDocument, s = t.defaultView?.location, n = i.id.trim(), r = s ? `${s.origin}${s.pathname}` : "detached-document";
  let o = `id:${i.id}`;
  if (n.length === 0) {
    const d = [...t.querySelectorAll("canvas")].indexOf(i);
    if (d < 0)
      throw new TypeError("Detached storage needs explicit applicationNamespace.");
    o = `index:${d}`;
  }
  const a = i.isConnected && !!s && n.length > 0 && ![...t.querySelectorAll("[id]")].some((d) => d !== i && d.id === i.id);
  return {
    applicationNamespace: wo(
      `forgeng/app-${_o(r)}/canvas-${_o(o)}`
    ),
    fingerprint: uy(JSON.stringify([r, o])),
    legacy: !a
  };
}
function hy(i) {
  return i === "default" ? Oc : i === "memory" ? cy : i;
}
class py {
  constructor(e, t, s) {
    c(this, "provider");
    c(this, "applicationNamespace");
    c(this, "abortController");
    c(this, "destroyPromise", null);
    this.provider = e, this.applicationNamespace = t, this.abortController = s;
  }
  destroy() {
    return this.destroyPromise || (this.abortController.abort(new Error("Storage provider is shutting down.")), this.destroyPromise = this.provider.destroy()), this.destroyPromise;
  }
}
async function my(i, e, t, s) {
  const n = ly(i);
  if (n.selection === "disabled") return null;
  const r = fy(e, n.applicationNamespace);
  r.legacy && t.child("storage").warn("Legacy auto namespace.");
  const o = hy(n.selection);
  ng(o);
  const a = og(n.selection === "default" ? Oc.create({
    fingerprint: r.fingerprint
  }) : o.create()), d = r.applicationNamespace, u = new AbortController(), l = new py(a, d, u);
  return s.retainStorageProvider(l), await a.initialize({
    applicationNamespace: d,
    signal: u.signal,
    logger: Ct(
      t.child("storage").child("provider").child(o.id),
      {
        providerId: o.id,
        providerContractVersion: o.contractVersion,
        providerImplementationVersion: o.implementationVersion,
        applicationNamespace: d
      }
    )
  }), l;
}
const gy = "1.1.0", yy = Object.freeze([
  "top-bar",
  "side-panel",
  "bottom-status",
  "floating-overlay"
]), Cc = "forgeng.ui.surfaces", Zs = 1;
class le extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "UiShellContractError";
  }
}
const wi = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, by = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, mr = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/, wy = ["boolean", "number", "text", "select", "command", "status"], vy = [
  ["contributions", ["register", "list", "subscribe", "getMountTarget"]],
  ["commands", ["register", "execute", "list"]],
  ["notifications", ["publish", "list", "dismiss", "subscribe"]],
  ["dialogs", ["open", "dismiss"]],
  ["settings", ["register", "get", "list", "subscribe", "refresh"]],
  ["preferences", ["get", "update", "reset", "subscribe"]]
];
function tt(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function en(i, e) {
  return e.every((t) => typeof i[t] == "function");
}
function Iy(i) {
  return i.startsWith("1.") && mr.test(i);
}
function Sy(i, e) {
  if (i === void 0)
    return;
  if (!Array.isArray(i))
    throw new le("invalid-descriptor", e, "Invalid capability.");
  const t = /* @__PURE__ */ new Set();
  i.forEach((s, n) => {
    if (!tt(s) || typeof s.id != "string" || !wi.test(s.id) || typeof s.version != "string" || !mr.test(s.version))
      throw new le("invalid-descriptor", `${e}[${n}]`, "Invalid capability.");
    if (t.has(s.id))
      throw new le("invalid-descriptor", `${e}[${n}].id`, "Duplicate UI shell capability");
    t.add(s.id);
  });
}
function Ey(i) {
  if (!tt(i))
    throw new le("invalid-descriptor", "descriptor", "UI shell provider descriptor must be an object.");
  if (typeof i.id != "string" || !wi.test(i.id))
    throw new le("invalid-provider-id", "descriptor.id", "UI shell provider id must be normalized and namespaced.");
  if (typeof i.contractVersion != "string" || !Iy(i.contractVersion))
    throw new le("incompatible-contract-version", "descriptor.contractVersion", "Incompatible UI contract.");
  if (typeof i.implementationVersion != "string" || !mr.test(i.implementationVersion))
    throw new le("invalid-implementation-version", "descriptor.implementationVersion", "UI shell implementationVersion must be semantic.");
  if (Sy(i.capabilities, "descriptor.capabilities"), typeof i.create != "function")
    throw new le("invalid-factory", "descriptor.create", "UI shell descriptor must define a create factory.");
}
function Ay(i) {
  return Ey(i), i;
}
function xy(i) {
  if (!tt(i) || typeof i.id != "string" || !wi.test(i.id) || typeof i.title != "string" || i.title.trim().length === 0 || i.presentation !== void 0 && i.presentation !== "card" && i.presentation !== "mount-only" || !yy.includes(i.slot))
    throw new le("invalid-contribution", "contribution", "UI contribution requires a namespaced id, title, and supported slot.");
}
function _y(i) {
  if (!tt(i) || typeof i.id != "string" || !wi.test(i.id) || typeof i.title != "string" || i.title.trim().length === 0 || !Array.isArray(i.fields))
    throw new le("invalid-settings-schema", "schema", "UI settings schema requires a namespaced id, title, and fields array.");
  const e = /* @__PURE__ */ new Set();
  i.fields.forEach((t, s) => {
    if (!tt(t) || typeof t.id != "string" || !by.test(t.id) || typeof t.label != "string" || t.label.trim().length === 0 || typeof t.kind != "string" || !wy.includes(t.kind) || t.read !== void 0 && typeof t.read != "function" || t.write !== void 0 && typeof t.write != "function")
      throw new le("invalid-settings-schema", `schema.fields[${s}]`, "UI setting field is invalid.");
    if (t.kind === "select" && (!Array.isArray(t.options) || t.options.length === 0 || !t.options.every((n) => tt(n) && typeof n.value == "string" && typeof n.label == "string" && n.label.trim().length > 0)))
      throw new le("invalid-settings-schema", `schema.fields[${s}].options`, "Select field options are invalid.");
    if (t.kind === "command" && (typeof t.commandId != "string" || !wi.test(t.commandId)))
      throw new le("invalid-settings-schema", `schema.fields[${s}].commandId`, "Command field commandId is invalid.");
    if (e.has(t.id))
      throw new le("invalid-settings-schema", `schema.fields[${s}].id`, `Duplicate setting field "${t.id}".`);
    e.add(t.id);
  });
}
function $y(i) {
  if (!tt(i) || !en(i, ["initialize", "destroy"]) || vy.some(([e, t]) => !tt(i[e]) || !en(i[e], t)))
    throw new le("invalid-shell-instance", "shell", "UI shell instance does not implement the complete contract.");
  if (i.surfaces !== void 0 && (!tt(i.surfaces) || !en(i.surfaces, ["create", "get", "list", "subscribe"])))
    throw new le("invalid-shell-instance", "shell.surfaces", "Invalid surface API.");
}
function zy(i) {
  return $y(i), i;
}
class Oy {
  constructor(e, t) {
    c(this, "shell");
    c(this, "abortController");
    c(this, "destroyPromise", null);
    this.shell = e, this.abortController = t;
  }
  destroy() {
    return this.destroyPromise || (this.abortController.abort(new Error("UI shell is shutting down.")), this.destroyPromise = this.shell.destroy()), this.destroyPromise;
  }
}
async function Dy(i, e, t, s) {
  Ay(i);
  const n = zy(i.create());
  if ((i.capabilities?.some(({ id: d }) => d === Cc) ?? !1) !== (n.surfaces !== void 0))
    throw new le(
      "invalid-shell-instance",
      "shell.surfaces",
      "UI surface capability mismatch."
    );
  const o = new AbortController(), a = new Oy(n, o);
  return s.retainUiShell(a), await n.initialize({
    host: e,
    signal: o.signal,
    logger: Ct(t.child("ui").child("provider"), {
      providerId: i.id,
      providerContractVersion: i.contractVersion,
      providerImplementationVersion: i.implementationVersion
    })
  }), a;
}
const Cy = `
.forgeng-ui-shell{--fg-bg:rgba(10,16,28,.92);--fg-panel:rgba(18,28,46,.94);--fg-border:rgba(132,170,220,.26);--fg-text:#edf5ff;--fg-muted:#9fb2ca;--fg-accent:#53d8a2;position:fixed;inset:0;z-index:10000;pointer-events:none;color:var(--fg-text);font:12px/1.45 Inter,ui-sans-serif,system-ui,sans-serif}
.forgeng-ui-shell[data-theme="light"]{--fg-bg:rgba(245,249,255,.94);--fg-panel:rgba(255,255,255,.97);--fg-border:rgba(34,65,104,.2);--fg-text:#122036;--fg-muted:#52647a;--fg-accent:#087f5b}
.forgeng-ui-surfaces{position:absolute;inset:0;pointer-events:none}
.forgeng-ui-surface{pointer-events:auto;color:inherit;background:transparent;border:0;padding:0}
.forgeng-ui-slot{position:absolute;display:flex;gap:8px}
.forgeng-ui-slot[data-slot="top-bar"]{left:12px;right:12px;top:12px;align-items:flex-start}
.forgeng-ui-slot[data-slot="side-panel"]{right:12px;top:60px;bottom:48px;width:var(--fg-side-width,320px);flex-direction:column;align-items:stretch;overflow:auto}
.forgeng-ui-slot[data-slot="bottom-status"]{left:12px;right:12px;bottom:12px;align-items:flex-end}
.forgeng-ui-slot[data-slot="floating-overlay"]{inset:0}
.forgeng-ui-card{pointer-events:auto;min-width:140px;border:1px solid var(--fg-border);border-radius:10px;background:var(--fg-panel);box-shadow:0 12px 36px rgba(0,0,0,.24);backdrop-filter:blur(14px);overflow:hidden}
.forgeng-ui-card[data-presentation="mount-only"]{position:absolute;inset:0;min-width:0;border:0;border-radius:0;background:transparent;box-shadow:none;backdrop-filter:none;overflow:visible;pointer-events:none}
.forgeng-ui-card[data-presentation="mount-only"]>.forgeng-ui-card__body{position:absolute;inset:0;padding:0;pointer-events:none}
.forgeng-ui-card[data-presentation="mount-only"]>.forgeng-ui-card__body>*{pointer-events:auto}
.forgeng-ui-card__title{padding:8px 11px;font-weight:650;letter-spacing:.02em;border-bottom:1px solid var(--fg-border)}
.forgeng-ui-card__body{padding:9px 11px;display:flex;flex-direction:column;gap:8px}
.forgeng-ui-field{display:grid;grid-template-columns:minmax(90px,1fr) minmax(80px,1fr);gap:8px;align-items:center;color:var(--fg-muted)}
.forgeng-ui-field input,.forgeng-ui-field select,.forgeng-ui-field button,.forgeng-ui-dialog button{font:inherit;color:var(--fg-text);background:var(--fg-bg);border:1px solid var(--fg-border);border-radius:6px;padding:5px 7px}
.forgeng-ui-field button,.forgeng-ui-dialog button{cursor:pointer}
.forgeng-ui-status{color:var(--fg-text);text-align:right}
.forgeng-ui-notifications{position:absolute;right:12px;bottom:54px;width:min(360px,calc(100vw - 24px));display:flex;flex-direction:column;gap:8px;pointer-events:auto}
.forgeng-ui-notification{padding:10px 12px;border:1px solid var(--fg-border);border-left:3px solid var(--fg-accent);border-radius:8px;background:var(--fg-panel)}
.forgeng-ui-notification strong{display:block;margin-bottom:2px}
.forgeng-ui-dialog-layer{position:absolute;inset:0;display:grid;place-items:center;background:rgba(2,6,14,.5);pointer-events:auto}
.forgeng-ui-dialog{width:min(420px,calc(100vw - 32px));padding:18px;border:1px solid var(--fg-border);border-radius:12px;background:var(--fg-panel);box-shadow:0 24px 80px rgba(0,0,0,.45)}
.forgeng-ui-dialog h2{font-size:16px;margin:0 0 8px}.forgeng-ui-dialog p{color:var(--fg-muted);margin:0 0 16px}.forgeng-ui-dialog__actions{display:flex;justify-content:flex-end;gap:8px}
.forgeng-ui-shell[data-side-collapsed="true"] .forgeng-ui-slot[data-slot="side-panel"]{display:none}
`;
function Cn(i, e) {
  try {
    return e.read?.();
  } catch (t) {
    i.warn("UI setting read failed.", { error: t, metadata: { settingId: e.id } });
    return;
  }
}
function Ny(i, e) {
  const t = Cn(i, e);
  return t == null ? "—" : String(t);
}
function ky(i, e, t) {
  if (!e.write)
    return;
  let s;
  t.tagName === "INPUT" && e.kind === "boolean" ? s = t.checked : e.kind === "number" ? s = Number(t.value) : s = t.value, Promise.resolve(e.write(s)).catch((n) => {
    i.error("UI setting write failed.", { error: n, metadata: { settingId: e.id } });
  });
}
function Ry(i, e, t, s) {
  const n = i.createElement("label");
  n.className = "forgeng-ui-field";
  const r = i.createElement("span");
  if (r.textContent = s.label, n.appendChild(r), s.kind === "status") {
    const a = i.createElement("span");
    return a.className = "forgeng-ui-status", a.textContent = Ny(e, s), n.appendChild(a), n;
  }
  if (s.kind === "command") {
    const a = i.createElement("button");
    return a.type = "button", a.textContent = s.label, a.addEventListener("click", () => {
      s.commandId && t.execute(s.commandId).catch((d) => {
        e.error("UI command failed.", { error: d, metadata: { commandId: s.commandId } });
      });
    }), n.appendChild(a), n;
  }
  const o = s.kind === "select" ? i.createElement("select") : i.createElement("input");
  if (o.tagName === "INPUT") {
    const a = o;
    a.type = s.kind === "boolean" ? "checkbox" : s.kind, s.minimum !== void 0 && (a.min = String(s.minimum)), s.maximum !== void 0 && (a.max = String(s.maximum)), s.step !== void 0 && (a.step = String(s.step));
    const d = Cn(e, s);
    s.kind === "boolean" ? a.checked = d === !0 : d != null && (a.value = String(d));
  } else {
    for (const d of s.options ?? []) {
      const u = i.createElement("option");
      u.value = d.value, u.textContent = d.label, o.appendChild(u);
    }
    const a = Cn(e, s);
    a != null && (o.value = String(a));
  }
  return o.addEventListener("change", () => ky(e, s, o)), n.appendChild(o), n;
}
const $o = ["top-bar", "side-panel", "bottom-status", "floating-overlay"];
function zo(i) {
  return !!i && typeof i == "object" && typeof i.appendChild == "function";
}
function Py(i, e, t) {
  if (i)
    return i;
  if (zo(e) && e.tagName === "CANVAS") {
    if (e.parentElement)
      return e.parentElement;
    throw new Error("DOM UI shell requires an explicit root or an attached canvas host.");
  }
  if (zo(e))
    return e;
  throw new Error("DOM UI shell requires an explicit root or DOM host container.");
}
function ae(i) {
  if (i !== void 0)
    return typeof i == "number" ? `${i}px` : String(i);
}
function tn(i, e, t) {
  const s = e ? ["top", "right", "bottom", "left"].map((n) => `${e}-${n}`) : ["top", "right", "bottom", "left"];
  for (const n of s)
    i.removeProperty(n);
  t && (t.top !== void 0 && i.setProperty(s[0], ae(t.top)), t.right !== void 0 && i.setProperty(s[1], ae(t.right)), t.bottom !== void 0 && i.setProperty(s[2], ae(t.bottom)), t.left !== void 0 && i.setProperty(s[3], ae(t.left)));
}
const jy = [
  "position",
  "display",
  "flex-direction",
  "flex-wrap",
  "gap",
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height",
  "overflow",
  "box-sizing",
  "z-index",
  "grid-template-columns",
  "grid-template-rows",
  "grid-column-start",
  "grid-column-end",
  "grid-row-start",
  "grid-row-end",
  "align-items",
  "justify-items",
  "align-content",
  "justify-content",
  "align-self",
  "justify-self",
  "transform"
], Ty = [
  "background",
  "opacity",
  "visibility",
  "border-color",
  "border-style",
  "border-width",
  "border-radius",
  "box-shadow",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "color",
  "text-align"
];
function Ly(i, e, t) {
  const s = e.layout, n = i.style;
  for (const o of jy)
    n.removeProperty(o);
  n.position = s?.placement?.mode ?? "relative";
  const r = s?.mode ?? "stack";
  if (n.display = r === "grid" ? "grid" : r === "overlay" ? "block" : "flex", n.display === "flex" && (n.flexDirection = s?.direction ?? (r === "row" ? "row" : "column")), s?.wrap && (n.flexWrap = s.wrap), s?.gap !== void 0 && (n.gap = ae(s.gap)), s?.width !== void 0 && (n.width = ae(s.width)), s?.height !== void 0 && (n.height = ae(s.height)), s?.minWidth !== void 0 && (n.minWidth = ae(s.minWidth)), s?.minHeight !== void 0 && (n.minHeight = ae(s.minHeight)), s?.maxWidth !== void 0 && (n.maxWidth = ae(s.maxWidth)), s?.maxHeight !== void 0 && (n.maxHeight = ae(s.maxHeight)), s?.overflow && (n.overflow = s.overflow), s?.clip && (n.overflow = "clip"), s?.boxSizing && (n.boxSizing = s.boxSizing), s?.placement?.zLayer !== void 0 && (n.zIndex = String(s.placement.zLayer)), s?.gridColumns && (n.gridTemplateColumns = s.gridColumns.map((o) => ae(o.size)).join(" ")), s?.gridRows && (n.gridTemplateRows = s.gridRows.map((o) => ae(o.size)).join(" ")), s?.gridPlacement?.column !== void 0 && (n.gridColumnStart = String(s.gridPlacement.column)), s?.gridPlacement?.columnSpan !== void 0 && (n.gridColumnEnd = `span ${s.gridPlacement.columnSpan}`), s?.gridPlacement?.row !== void 0 && (n.gridRowStart = String(s.gridPlacement.row)), s?.gridPlacement?.rowSpan !== void 0 && (n.gridRowEnd = `span ${s.gridPlacement.rowSpan}`), s?.alignItems && (n.alignItems = s.alignItems), s?.justifyItems && (n.justifyItems = s.justifyItems), s?.alignContent && (n.alignContent = s.alignContent), s?.justifyContent && (n.justifyContent = s.justifyContent), s?.alignSelf && (n.alignSelf = s.alignSelf), s?.justifySelf && (n.justifySelf = s.justifySelf), tn(n, "margin", s?.margin), tn(n, "padding", s?.padding), tn(n, "", s?.placement?.inset), s?.safeArea)
    for (const o of ["top", "right", "bottom", "left"]) {
      const a = ae(s.padding?.[o]), d = `env(safe-area-inset-${o}, 0px)`;
      n.setProperty(`padding-${o}`, a ? `calc(${a} + ${d})` : d);
    }
  if (s?.placement?.anchor) {
    const o = s.placement.anchor;
    o.includes("top") && (n.top || (n.top = "0")), o.includes("bottom") && (n.bottom || (n.bottom = "0")), o.includes("left") && (n.left || (n.left = "0")), o.includes("right") && (n.right || (n.right = "0")), o === "center" && (n.left = "50%", n.top = "50%", n.transform = "translate(-50%, -50%)");
  }
}
function My(i, e, t = /* @__PURE__ */ new Set()) {
  for (const r of Ty)
    i.style.removeProperty(r);
  for (const r of t)
    i.style.removeProperty(r);
  const s = e.style;
  if (!s)
    return /* @__PURE__ */ new Set();
  s.background && (i.style.background = s.background), s.opacity !== void 0 && (i.style.opacity = String(s.opacity)), s.visibility && (i.style.visibility = s.visibility), s.border?.color && (i.style.borderColor = s.border.color), s.border?.width !== void 0 && (i.style.borderStyle = "solid", i.style.borderWidth = ae(s.border.width)), s.border?.radius !== void 0 && (i.style.borderRadius = ae(s.border.radius)), s.border?.shadow && (i.style.boxShadow = s.border.shadow), s.font?.family && (i.style.fontFamily = s.font.family), s.font?.size !== void 0 && (i.style.fontSize = ae(s.font.size)), s.font?.weight !== void 0 && (i.style.fontWeight = String(s.font.weight)), s.font?.lineHeight !== void 0 && (i.style.lineHeight = ae(s.font.lineHeight)), s.font?.color && (i.style.color = s.font.color), s.font?.align && (i.style.textAlign = s.font.align);
  const n = /* @__PURE__ */ new Set();
  for (const [r, o] of Object.entries(s.tokens ?? {})) {
    const a = r.startsWith("--") ? r : `--${r}`;
    n.add(a), i.style.setProperty(a, String(o));
  }
  return n;
}
const Vy = ["stack", "row", "column", "grid", "overlay"], Gy = ["row", "column"], Fy = ["nowrap", "wrap", "wrap-reverse"], By = ["content-box", "border-box"], Uy = ["start", "center", "end", "stretch", "space-between", "space-around", "space-evenly"], Wy = ["visible", "hidden", "clip", "scroll", "auto"], Yy = ["relative", "absolute", "fixed"], qy = ["top-left", "top", "top-right", "left", "center", "right", "bottom-left", "bottom", "bottom-right"], Ky = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|%|rem|vw|vh|fr)$/;
function St(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Nn(i, e) {
  if (i !== void 0 && (typeof i != "number" || !Number.isFinite(i)))
    throw new TypeError(`${e} must be a finite number.`);
}
function lt(i, e, t) {
  if (i !== void 0 && (typeof i != "string" || !e.includes(i)))
    throw new TypeError(`${t} is invalid.`);
}
function kn(i, e) {
  if (i !== void 0) {
    if (typeof i == "number")
      return Nn(i, e);
    if (i !== "auto" && (typeof i != "string" || !Ky.test(i)))
      throw new TypeError(`${e} is invalid.`);
  }
}
function sn(i, e) {
  if (i != null) {
    if (!St(i))
      throw new TypeError(`${e} must be an object.`);
    for (const t of ["top", "right", "bottom", "left"])
      kn(i[t], `${e}.${t}`);
  }
}
function Hy(i, e) {
  if (i !== void 0 && (!Number.isInteger(i) || i < 1))
    throw new TypeError(`${e} must be a positive integer.`);
}
function Nc(i, e, t) {
  if (i !== void 0) {
    if (!St(i))
      throw new TypeError(`${e} must be an object.`);
    lt(i.mode, Vy, `${e}.mode`), lt(i.direction, Gy, `${e}.direction`), lt(i.wrap, Fy, `${e}.wrap`);
    for (const s of ["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "gap"])
      kn(i[s], `${e}.${s}`);
    sn(i.margin, `${e}.margin`), sn(i.padding, `${e}.padding`), lt(i.boxSizing, By, `${e}.boxSizing`);
    for (const s of ["alignItems", "justifyItems", "alignContent", "justifyContent", "alignSelf", "justifySelf"])
      lt(i[s], Uy, `${e}.${s}`);
    if (lt(i.overflow, Wy, `${e}.overflow`), i.clip !== void 0 && typeof i.clip != "boolean")
      throw new TypeError(`${e}.clip must be a boolean.`);
    if (i.safeArea !== void 0 && typeof i.safeArea != "boolean")
      throw new TypeError(`${e}.safeArea must be a boolean.`);
    for (const s of ["gridColumns", "gridRows"]) {
      const n = i[s];
      if (n !== void 0) {
        if (!Array.isArray(n))
          throw new TypeError(`${e}.${s} must be an array.`);
        n.forEach((r, o) => {
          if (!St(r) || r.size === void 0)
            throw new TypeError(`${e}.${s}[${o}].size is required.`);
          kn(r.size, `${e}.${s}[${o}].size`);
        });
      }
    }
    if (i.gridPlacement !== void 0 && i.gridPlacement !== null) {
      if (!St(i.gridPlacement))
        throw new TypeError(`${e}.gridPlacement must be an object.`);
      for (const s of ["column", "columnSpan", "row", "rowSpan"])
        Hy(i.gridPlacement[s], `${e}.gridPlacement.${s}`);
    }
    if (i.placement !== void 0 && i.placement !== null) {
      if (!St(i.placement))
        throw new TypeError(`${e}.placement must be an object.`);
      lt(i.placement.mode, Yy, `${e}.placement.mode`), lt(i.placement.anchor, qy, `${e}.placement.anchor`), Nn(i.placement.zLayer, `${e}.placement.zLayer`), sn(i.placement.inset, `${e}.placement.inset`);
    }
    if (!(i.responsive === void 0 || i.responsive === null)) {
      if (!Array.isArray(i.responsive))
        throw new TypeError(`${e}.responsive must be an array.`);
      i.responsive.forEach((s, n) => {
        if (!St(s) || !St(s.query))
          throw new TypeError(`${e}.responsive[${n}] requires a query.`);
        const r = s.query;
        for (const o of ["minWidth", "maxWidth", "minHeight", "maxHeight"])
          if (Nn(r[o], `${e}.responsive[${n}].query.${o}`), typeof r[o] == "number" && r[o] < 0)
            throw new TypeError(`${e}.responsive[${n}].query.${o} cannot be negative.`);
        if (typeof r.minWidth == "number" && typeof r.maxWidth == "number" && r.minWidth > r.maxWidth)
          throw new TypeError(`${e}.responsive[${n}] minWidth cannot exceed maxWidth.`);
        if (typeof r.minHeight == "number" && typeof r.maxHeight == "number" && r.minHeight > r.maxHeight)
          throw new TypeError(`${e}.responsive[${n}] minHeight cannot exceed maxHeight.`);
        Nc(s.layout, `${e}.responsive[${n}].layout`, t), t(s.style, `${e}.responsive[${n}].style`);
      });
    }
  }
}
const Xy = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|%|rem|vw|vh|fr)$/;
function Gi(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Rn(i, e) {
  if (i !== void 0 && (typeof i != "number" || !Number.isFinite(i)))
    throw new TypeError(`${e} must be a finite number.`);
}
function ri(i, e) {
  if (i !== void 0 && (typeof i != "string" || i.trim().length === 0))
    throw new TypeError(`${e} must be a non-empty string.`);
}
function nn(i, e, t) {
  if (i !== void 0 && (typeof i != "string" || !e.includes(i)))
    throw new TypeError(`${t} is invalid.`);
}
function Fi(i, e) {
  if (i !== void 0) {
    if (typeof i == "number")
      return Rn(i, e);
    if (i !== "auto" && (typeof i != "string" || !Xy.test(i)))
      throw new TypeError(`${e} is invalid.`);
  }
}
function Oo(i, e) {
  if (i !== void 0) {
    if (!Gi(i))
      throw new TypeError(`${e} must be an object.`);
    if (ri(i.background, `${e}.background`), Rn(i.opacity, `${e}.opacity`), typeof i.opacity == "number" && (i.opacity < 0 || i.opacity > 1))
      throw new TypeError(`${e}.opacity must be between 0 and 1.`);
    if (nn(i.visibility, ["visible", "hidden"], `${e}.visibility`), nn(i.pointerEvents, ["auto", "none", "painted"], `${e}.pointerEvents`), i.border !== void 0 && i.border !== null) {
      if (!Gi(i.border))
        throw new TypeError(`${e}.border must be an object.`);
      ri(i.border.color, `${e}.border.color`), Fi(i.border.width, `${e}.border.width`), Fi(i.border.radius, `${e}.border.radius`), ri(i.border.shadow, `${e}.border.shadow`);
    }
    if (i.font !== void 0 && i.font !== null) {
      if (!Gi(i.font))
        throw new TypeError(`${e}.font must be an object.`);
      if (ri(i.font.family, `${e}.font.family`), Fi(i.font.size, `${e}.font.size`), i.font.weight !== void 0 && typeof i.font.weight != "number" && typeof i.font.weight != "string")
        throw new TypeError(`${e}.font.weight is invalid.`);
      typeof i.font.weight == "number" && Rn(i.font.weight, `${e}.font.weight`), Fi(i.font.lineHeight, `${e}.font.lineHeight`), ri(i.font.color, `${e}.font.color`), nn(i.font.align, ["start", "center", "end", "justify"], `${e}.font.align`);
    }
    if (!(i.tokens === void 0 || i.tokens === null)) {
      if (!Gi(i.tokens))
        throw new TypeError(`${e}.tokens must be an object.`);
      for (const [t, s] of Object.entries(i.tokens))
        if (!/^(?:--)?[a-z][a-z0-9-]*$/.test(t) || typeof s != "string" && (typeof s != "number" || !Number.isFinite(s)))
          throw new TypeError(`${e}.tokens must use normalized names and string or finite number values.`);
    }
  }
}
const Do = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, Jy = ["generic", "container", "banner", "complementary", "navigation", "toolbar", "status", "dialog", "button", "text"];
function xs(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Pn(i, e = /* @__PURE__ */ new WeakSet()) {
  if (typeof i != "object" && typeof i != "function" || i === null)
    return i;
  const t = i;
  if (e.has(t))
    return i;
  if (e.add(t), Array.isArray(i))
    i.forEach((s) => Pn(s, e));
  else
    for (const s of Object.values(t))
      Pn(s, e);
  return Object.freeze(i);
}
function _s(i, e) {
  try {
    return Pn(structuredClone(i));
  } catch {
    throw new TypeError(`${e} must contain cloneable data.`);
  }
}
function Et(i, e) {
  if (e === void 0)
    return i ? { ...i } : void 0;
  if (e === null)
    return;
  const t = { ...i ?? {}, ...e };
  return Object.keys(t).length > 0 ? t : void 0;
}
function Co(i, e) {
  if (i !== void 0 && typeof i != "boolean")
    throw new TypeError(`${e} must be a boolean.`);
}
function Qy(i, e) {
  if (i !== void 0 && (typeof i != "string" || i.trim().length === 0))
    throw new TypeError(`${e} must be a non-empty string.`);
}
function Zy(i, e, t) {
  if (i !== void 0 && (typeof i != "string" || !e.includes(i)))
    throw new TypeError(`${t} is invalid.`);
}
function eb(i) {
  if (i != null) {
    if (!xs(i) || i.kind !== void 0 && i.kind !== "none" && i.kind !== "text")
      throw new TypeError("UI surface content is invalid.");
    if (i.kind === "text" && typeof i.value != "string")
      throw new TypeError("UI surface text content requires a string value.");
  }
}
function hs(i) {
  return i === void 0 ? void 0 : _s(i, "UI surface layout");
}
function ps(i) {
  return i === void 0 ? void 0 : _s(i, "UI surface style");
}
function jn(i) {
  return i === void 0 ? void 0 : _s(i, "UI surface content");
}
function Bi(i) {
  if (!xs(i) || i.version !== Zs || !Object.hasOwn(i, "value"))
    throw new TypeError(`UI surface binding snapshot must use version ${Zs}.`);
  return Object.freeze({
    version: Zs,
    value: _s(i.value, "UI surface binding snapshot value")
  });
}
function Tn(i) {
  if (i) {
    if (i.onPress !== void 0 && typeof i.onPress != "function")
      throw new TypeError("UI surface onPress action must be a function.");
    return Object.freeze({ onPress: i.onPress });
  }
}
function kc(i) {
  if (!xs(i) || typeof i.getSnapshot != "function" || typeof i.subscribe != "function")
    throw new TypeError("UI surface binding must implement getSnapshot and subscribe.");
  const e = i.getSnapshot, t = i.subscribe;
  return Object.freeze({
    getSnapshot: () => Reflect.apply(e, i, []),
    subscribe: (s) => Reflect.apply(t, i, [s])
  });
}
function Ln(i) {
  if (i) {
    if (typeof i.mount != "function")
      throw new TypeError("UI surface mountContent must define mount.");
    return Object.freeze({ mount: i.mount });
  }
}
function Rc(i, e) {
  return hs(e === void 0 ? i : {
    ...i ?? {},
    ...e,
    margin: Et(i?.margin, e.margin),
    padding: Et(i?.padding, e.padding),
    placement: e.placement === null ? void 0 : Et(i?.placement, e.placement ? {
      ...e.placement,
      inset: Et(i?.placement?.inset, e.placement.inset)
    } : void 0),
    gridPlacement: Et(i?.gridPlacement, e.gridPlacement),
    responsive: e.responsive === null ? void 0 : e.responsive ?? i?.responsive
  });
}
function Pc(i, e) {
  return ps(e === void 0 ? i : {
    ...i ?? {},
    ...e,
    border: Et(i?.border, e.border),
    font: Et(i?.font, e.font),
    tokens: e.tokens === null ? void 0 : e.tokens ?? i?.tokens
  });
}
function tb(i, e) {
  if (i !== void 0 && (typeof i != "number" || !Number.isFinite(i)))
    throw new TypeError(`${e} must be a finite number.`);
}
function No(i, e) {
  if (!xs(i) || typeof i.id != "string" || !Do.test(i.id))
    throw new TypeError("UI surface id must be normalized and namespaced.");
  if (i.parentId !== void 0) {
    if (typeof i.parentId != "string" || !Do.test(i.parentId))
      throw new TypeError("UI surface parent id must be normalized and namespaced.");
    if (!e.has(i.parentId))
      throw new Error(`UI surface parent "${i.parentId}" does not exist.`);
  }
  tb(i.order, "UI surface order"), Zy(i.role, Jy, "UI surface role"), Qy(i.accessibleLabel, "UI surface accessibleLabel"), Co(i.focusable, "UI surface focusable"), Co(i.hidden, "UI surface hidden"), Nc(i.layout, "UI surface layout", Oo), Oo(i.style, "UI surface style"), eb(i.content), Tn(i.actions), i.binding !== void 0 && kc(i.binding), Ln(i.mountContent);
}
function ib(i, e, t) {
  const s = i.layout?.responsive;
  if (!s?.length)
    return i;
  let n = i.layout, r = i.style;
  for (const o of s) {
    const a = o.query;
    a.minWidth !== void 0 && e < a.minWidth || a.maxWidth !== void 0 && e > a.maxWidth || a.minHeight !== void 0 && t < a.minHeight || a.maxHeight !== void 0 && t > a.maxHeight || (n = Rc(n, o.layout), r = Pc(r, o.style));
  }
  return { ...i, layout: n, style: r };
}
class sb {
  constructor(e, t, s, n, r) {
    c(this, "document");
    c(this, "services");
    c(this, "logger");
    c(this, "configuredRoot");
    c(this, "host");
    c(this, "scope", new fe());
    c(this, "mountedContent", /* @__PURE__ */ new Map());
    c(this, "mountedSurfaces", /* @__PURE__ */ new Map());
    c(this, "renderedSurfaces", /* @__PURE__ */ new Map());
    c(this, "pendingCleanup", /* @__PURE__ */ new Set());
    c(this, "slots", /* @__PURE__ */ new Map());
    c(this, "root", null);
    c(this, "surfaceLayer", null);
    c(this, "destroyed", !1);
    c(this, "destroyPromise", null);
    c(this, "surfaceRenderQueued", !1);
    c(this, "styleId", `fg-ui-${Math.random().toString(36).slice(2, 10)}`);
    c(this, "warnedUnsupported", /* @__PURE__ */ new Set());
    c(this, "previousFocus", null);
    this.document = e, this.services = t, this.logger = s, this.configuredRoot = n, this.host = r;
  }
  async initialize() {
    if (this.root)
      throw new Error("DOM UI shell renderer is already initialized.");
    try {
      const e = this.document.createElement("style");
      e.dataset.forgengUiShell = "styles", e.dataset.forgengUiShellInstance = this.styleId, e.textContent = Cy.replaceAll(".forgeng-ui-shell", `.forgeng-ui-shell[data-ui-instance="${this.styleId}"]`), this.document.head.appendChild(e), this.scope.defer(() => e.remove());
      const t = Py(this.configuredRoot, this.host, this.document), s = this.document.createElement("div");
      s.className = "forgeng-ui-shell", s.dataset.forgengUiShell = "root", s.dataset.uiInstance = this.styleId, s.setAttribute("aria-live", "polite");
      const n = this.document.createElement("div");
      n.className = "forgeng-ui-surfaces", s.appendChild(n), this.surfaceLayer = n;
      for (const o of $o) {
        const a = this.document.createElement("div");
        a.className = "forgeng-ui-slot", a.dataset.slot = o, s.appendChild(a), this.slots.set(o, a);
      }
      t.appendChild(s), this.root = s, this.scope.defer(() => s.remove()), this.retain(this.services.contributions.subscribe(() => this.renderContributions())), this.retain(this.services.settings.subscribe(() => this.renderContributions())), this.retain(this.services.notifications.subscribe(() => this.renderNotifications())), this.retain(this.services.dialogs.subscribe(() => this.renderDialogs())), this.retain(this.services.preferences.subscribe(() => this.applyPreferences())), this.retain(this.services.surfaces.subscribe(() => this.renderSurfaces()));
      const r = this.document.defaultView;
      if (r) {
        const o = () => this.queueSurfaceRender();
        r.addEventListener("resize", o), this.scope.defer(() => r.removeEventListener("resize", o));
      }
      this.applyPreferences(), this.renderNow();
    } catch (e) {
      try {
        await this.scope.dispose();
      } catch (t) {
        throw ls(e, t, "DOM UI shell initialization and rollback failed.");
      }
      throw e;
    }
  }
  destroy() {
    return this.destroyPromise ?? (this.destroyPromise = this.destroyOnce()), this.destroyPromise;
  }
  async destroyOnce() {
    this.destroyed = !0;
    const e = new fe();
    e.defer(() => this.scope.dispose());
    for (const s of [...this.mountedContent.keys()])
      e.defer(() => this.detachMountedContent(s)?.dispose());
    for (const s of [...this.mountedSurfaces.keys()])
      e.defer(() => this.detachMountedSurface(s)?.dispose());
    for (const [s, n] of this.renderedSurfaces)
      this.services.surfaces.setMountTarget(s, null), n.element.remove();
    this.renderedSurfaces.clear();
    const t = [...this.pendingCleanup];
    t.length > 0 && e.defer(() => Promise.all(t).then(() => {
    })), this.root = null, this.surfaceLayer = null, this.slots.clear(), await e.dispose();
  }
  retain(e) {
    this.scope.defer(() => e.dispose());
  }
  queueSurfaceRender() {
    this.surfaceRenderQueued || this.destroyed || (this.surfaceRenderQueued = !0, queueMicrotask(() => {
      this.surfaceRenderQueued = !1, this.renderSurfaces();
    }));
  }
  renderNow() {
    this.destroyed || (this.renderSurfaces(), this.renderContributions(), this.renderNotifications(), this.renderDialogs());
  }
  renderSurfaces() {
    const e = this.surfaceLayer;
    if (!e)
      return;
    const t = [];
    this.collectSurfaceTree(void 0, t);
    const s = new Set(t.map((n) => n.id));
    for (const n of [...this.renderedSurfaces.keys()])
      s.has(n) || this.releaseRenderedSurface(n);
    for (const n of t) {
      const r = n.parentId ? this.renderedSurfaces.get(n.parentId)?.element : e;
      if (!r)
        continue;
      const o = !!n.actions?.onPress;
      let a = this.renderedSurfaces.get(n.id);
      a && (a.element.tagName !== (o ? "BUTTON" : "DIV") || a.mountContent !== n.mountContent) && (this.releaseRenderedSurface(n.id), a = void 0);
      const d = !a;
      a ?? (a = this.createRenderedSurface(n, o)), this.updateRenderedSurface(a, n), r.appendChild(a.element), this.services.surfaces.setMountTarget(n.id, a.element), d && n.mountContent && this.mountSurfaceContent(n, a.element);
    }
  }
  collectSurfaceTree(e, t) {
    for (const s of this.services.surfaces.list(e))
      t.push(s), this.collectSurfaceTree(s.id, t);
  }
  createRenderedSurface(e, t) {
    const s = this.document.createElement(t ? "button" : "div");
    if (s.className = "forgeng-ui-surface", s.dataset.surfaceId = e.id, t) {
      const r = s;
      r.type = "button", r.addEventListener("click", (o) => {
        o.stopPropagation();
        const a = this.renderedSurfaces.get(e.id)?.snapshot.actions?.onPress;
        if (a)
          try {
            Promise.resolve(a()).catch((d) => this.logger.error("UI surface action failed.", {
              error: d,
              metadata: { surfaceId: e.id }
            }));
          } catch (d) {
            this.logger.error("UI surface action failed.", { error: d, metadata: { surfaceId: e.id } });
          }
      });
    }
    const n = {
      element: s,
      snapshot: e,
      mountContent: e.mountContent,
      textNode: null,
      tokens: /* @__PURE__ */ new Set()
    };
    return this.renderedSurfaces.set(e.id, n), n;
  }
  updateRenderedSurface(e, t) {
    const s = this.document.defaultView, n = ib(t, this.root?.clientWidth || s?.innerWidth || 0, this.root?.clientHeight || s?.innerHeight || 0), { element: r } = e;
    e.snapshot = t, r.removeAttribute("role"), r.removeAttribute("aria-label"), r.removeAttribute("tabindex"), n.role && n.role !== "generic" && r.setAttribute("role", n.role === "button" ? "button" : n.role), n.accessibleLabel && r.setAttribute("aria-label", n.accessibleLabel), n.focusable && (r.tabIndex = 0), r.hidden = n.hidden === !0, Ly(r, n), e.tokens = My(r, n, e.tokens), r.style.pointerEvents = n.actions?.onPress || n.style?.pointerEvents === "auto" ? "auto" : n.style?.pointerEvents === "none" ? "none" : "auto", n.hidden === !0 && (r.style.display = "none");
    const o = n.binding?.getSnapshot();
    o ? r.dataset.bindingVersion = String(o.version) : delete r.dataset.bindingVersion;
    const a = n.content;
    a?.kind === "text" ? (e.textNode ?? (e.textNode = this.document.createTextNode("")), e.textNode.data = a.value, e.textNode.parentNode !== r && r.insertBefore(e.textNode, r.firstChild)) : (e.textNode?.remove(), e.textNode = null);
  }
  mountSurfaceContent(e, t) {
    const s = new fe();
    this.mountedSurfaces.set(e.id, s);
    try {
      const n = e.mountContent?.mount({
        target: t,
        registerDispose: (r) => s.defer(r)
      });
      n && s.defer(() => n.dispose());
    } catch (n) {
      this.logger.error("UI surface mount failed.", { error: n, metadata: { surfaceId: e.id } }), this.mountedSurfaces.delete(e.id), this.trackCleanup(s, "UI surface cleanup failed.", { surfaceId: e.id });
    }
  }
  releaseRenderedSurface(e) {
    const t = this.renderedSurfaces.get(e);
    if (!t)
      return;
    this.renderedSurfaces.delete(e), this.services.surfaces.setMountTarget(e, null);
    const s = this.detachMountedSurface(e);
    s && this.trackCleanup(s, "UI surface cleanup failed.", { surfaceId: e }), t.element.remove();
  }
  detachMountedSurface(e) {
    const t = this.mountedSurfaces.get(e) ?? null;
    return this.mountedSurfaces.delete(e), t;
  }
  renderContributions() {
    for (const e of [...this.mountedContent.keys()])
      this.releaseMountedContent(e);
    for (const e of $o) {
      const t = this.slots.get(e);
      if (!t)
        continue;
      t.replaceChildren();
      const s = this.services.preferences.get().layout.hiddenSlots.includes(e);
      if (t.hidden = s, !s)
        for (const n of this.services.contributions.list(e))
          t.appendChild(this.renderContribution(n));
    }
  }
  renderContribution(e) {
    const t = this.document.createElement("section");
    t.className = "forgeng-ui-card", t.dataset.contributionId = e.id;
    const s = e.presentation ?? "card";
    if (t.dataset.presentation = s, s === "card") {
      const o = this.document.createElement("div");
      o.className = "forgeng-ui-card__title", o.textContent = e.title, t.appendChild(o);
    }
    const n = this.document.createElement("div");
    n.className = "forgeng-ui-card__body", t.appendChild(n), this.services.contributions.setMountTarget(e.id, n);
    const r = e.settingsSchemaId ? this.services.settings.get(e.settingsSchemaId) : null;
    if (r)
      for (const o of r.fields)
        n.appendChild(Ry(this.document, this.logger, this.services.commands, o));
    return e.content && this.mountContent(e, n), t;
  }
  mountContent(e, t) {
    const s = new fe();
    this.mountedContent.set(e.id, s);
    try {
      const n = e.content?.mount({
        target: t,
        registerDispose: (r) => s.defer(r)
      });
      n && s.defer(() => n.dispose());
    } catch (n) {
      this.logger.error("UI contribution mount failed.", { error: n, metadata: { contributionId: e.id } }), s.dispose();
    }
  }
  releaseMountedContent(e) {
    this.services.contributions.setMountTarget(e, null);
    const t = this.detachMountedContent(e);
    t && this.trackCleanup(t, "UI contribution cleanup failed.", { contributionId: e });
  }
  detachMountedContent(e) {
    const t = this.mountedContent.get(e) ?? null;
    return this.mountedContent.delete(e), t;
  }
  renderNotifications() {
    const e = this.slots.get("floating-overlay");
    if (!e || this.destroyed)
      return;
    e.querySelector(".forgeng-ui-notifications")?.remove();
    const t = this.services.notifications.list();
    if (t.length === 0)
      return;
    const s = this.document.createElement("div");
    s.className = "forgeng-ui-notifications";
    for (const n of t) {
      const r = this.document.createElement("div");
      r.className = "forgeng-ui-notification", r.dataset.level = n.level;
      const o = this.document.createElement("strong");
      o.textContent = n.title, r.appendChild(o), n.message && r.append(n.message), s.appendChild(r);
    }
    e.appendChild(s);
  }
  renderDialogs() {
    const e = this.slots.get("floating-overlay");
    if (!e || this.destroyed)
      return;
    e.querySelector(".forgeng-ui-dialog-layer")?.remove();
    const t = this.services.dialogs.list()[0];
    if (!t) {
      this.previousFocus?.focus?.(), this.previousFocus = null;
      return;
    }
    const s = this.document.createElement("div");
    s.className = "forgeng-ui-dialog-layer";
    const n = this.document.createElement("div");
    n.className = "forgeng-ui-dialog", n.setAttribute("role", "dialog"), n.setAttribute("aria-modal", "true");
    const r = this.document.createElement("h2");
    if (r.textContent = t.title, n.appendChild(r), t.message) {
      const a = this.document.createElement("p");
      a.textContent = t.message, n.appendChild(a);
    }
    const o = this.document.createElement("div");
    o.className = "forgeng-ui-dialog__actions", this.previousFocus ?? (this.previousFocus = this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null);
    for (const a of t.actions) {
      const d = this.document.createElement("button");
      d.type = "button", d.textContent = a.label, d.dataset.kind = a.kind ?? "secondary", d.addEventListener("click", () => this.services.dialogs.resolve(t.id, a.id)), o.appendChild(d);
    }
    n.appendChild(o), s.appendChild(n), e.appendChild(s), o.querySelector("button")?.focus();
  }
  applyPreferences() {
    const e = this.root;
    if (!e)
      return;
    const t = this.services.preferences.get();
    e.dataset.theme = t.theme, e.dataset.sideCollapsed = String(t.layout.sidePanelCollapsed), e.style.setProperty("--fg-side-width", `${t.layout.sidePanelWidth}px`), this.renderContributions();
  }
  trackCleanup(e, t, s) {
    const n = e.dispose().catch((r) => this.logger.error(t, { error: r, metadata: s }));
    this.pendingCleanup.add(n), n.finally(() => this.pendingCleanup.delete(n));
  }
  warnUnsupportedOnce(e, t) {
    this.warnedUnsupported.has(e) || (this.warnedUnsupported.add(e), this.logger.warn(t));
  }
}
class _i {
  constructor(e) {
    c(this, "release");
    c(this, "disposed", !1);
    this.release = e;
  }
  dispose() {
    if (!this.disposed)
      return this.disposed = !0, this.release();
  }
}
class $i {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Set());
  }
  subscribe(e) {
    return this.listeners.add(e), new _i(() => {
      this.listeners.delete(e);
    });
  }
  emit(...e) {
    for (const t of [...this.listeners])
      t(...e);
  }
  clear() {
    this.listeners.clear();
  }
}
class nb {
  constructor() {
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "mountTargets", /* @__PURE__ */ new Map());
    c(this, "changes", new $i());
  }
  register(e) {
    if (xy(e), this.values.has(e.id))
      throw new Error(`UI contribution "${e.id}" is already registered.`);
    return this.values.set(e.id, Object.freeze({ ...e })), this.changes.emit(), new _i(() => {
      this.values.delete(e.id) && (this.mountTargets.delete(e.id), this.changes.emit());
    });
  }
  list(e) {
    return [...this.values.values()].filter((t) => e === void 0 || t.slot === e).sort((t, s) => (t.order ?? 0) - (s.order ?? 0) || t.id.localeCompare(s.id));
  }
  subscribe(e) {
    return this.changes.subscribe(e);
  }
  getMountTarget(e) {
    return this.mountTargets.get(e) ?? null;
  }
  setMountTarget(e, t) {
    t === null ? this.mountTargets.delete(e) : this.values.has(e) && this.mountTargets.set(e, t);
  }
  clear() {
    this.values.clear(), this.mountTargets.clear(), this.changes.clear();
  }
}
class rb {
  constructor() {
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "changes", new $i());
  }
  open(e) {
    return !e.id || !e.title || e.actions.length === 0 ? Promise.reject(new TypeError("UI dialog requires id, title, and at least one action.")) : this.values.has(e.id) ? Promise.reject(new Error(`UI dialog "${e.id}" is already open.`)) : new Promise((t) => {
      this.values.set(e.id, { request: e, resolve: t }), this.changes.emit();
    });
  }
  dismiss(e) {
    this.resolve(e, null);
  }
  resolve(e, t) {
    const s = this.values.get(e);
    s && (this.values.delete(e), s.resolve({ actionId: t }), this.changes.emit());
  }
  list() {
    return [...this.values.values()].map(({ request: e }) => e);
  }
  subscribe(e) {
    return this.changes.subscribe(e);
  }
  clear() {
    for (const e of [...this.values.keys()])
      this.resolve(e, null);
    this.changes.clear();
  }
}
class ob {
  constructor() {
    c(this, "values", /* @__PURE__ */ new Map());
  }
  register(e) {
    if (!e.id || !e.title || typeof e.execute != "function")
      throw new TypeError("UI command requires id, title, and execute.");
    if (this.values.has(e.id))
      throw new Error(`UI command "${e.id}" is already registered.`);
    return this.values.set(e.id, e), new _i(() => {
      this.values.delete(e.id);
    });
  }
  async execute(e, t) {
    const s = this.values.get(e);
    if (!s)
      throw new Error(`UI command "${e}" is not registered.`);
    return await s.execute(t);
  }
  list() {
    return [...this.values.values()].map(({ id: e, title: t }) => Object.freeze({ id: e, title: t }));
  }
  clear() {
    this.values.clear();
  }
}
class ab {
  constructor() {
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "changes", new $i());
    c(this, "nextId", 0);
  }
  publish(e) {
    const t = e.id ?? `forgeng.ui.notification.${this.nextId++}`;
    if (this.values.has(t))
      throw new Error(`UI notification "${t}" is already active.`);
    return this.values.set(t, Object.freeze({ ...e, id: t, createdAt: Date.now() })), this.changes.emit(), new _i(() => this.dismiss(t));
  }
  list() {
    return [...this.values.values()];
  }
  dismiss(e) {
    this.values.delete(e) && this.changes.emit();
  }
  subscribe(e) {
    return this.changes.subscribe(e);
  }
  clear() {
    this.values.clear(), this.changes.clear();
  }
}
class cb {
  constructor() {
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "changes", new $i());
  }
  register(e) {
    if (_y(e), this.values.has(e.id))
      throw new Error(`UI settings schema "${e.id}" is already registered.`);
    return this.values.set(e.id, Object.freeze({ ...e, fields: Object.freeze([...e.fields]) })), this.changes.emit(), new _i(() => {
      this.values.delete(e.id) && this.changes.emit();
    });
  }
  get(e) {
    return this.values.get(e) ?? null;
  }
  list() {
    return [...this.values.values()];
  }
  subscribe(e) {
    return this.changes.subscribe(e);
  }
  refresh(e) {
    this.changes.emit();
  }
  clear() {
    this.values.clear(), this.changes.clear();
  }
}
function rn(i) {
  return Object.freeze({
    id: i.id,
    parentId: i.parentId,
    order: i.order,
    role: i.role,
    accessibleLabel: i.accessibleLabel,
    focusable: i.focusable,
    hidden: i.hidden,
    visible: !i.hidden,
    disposed: i.disposed,
    layout: hs(i.layout),
    style: ps(i.style),
    content: jn(i.content),
    actions: i.actions,
    binding: i.bindingState?.port,
    mountContent: i.mountContent
  });
}
class db {
  constructor(e, t) {
    c(this, "store");
    c(this, "record");
    this.store = e, this.record = t;
  }
  get id() {
    return this.record.id;
  }
  getSnapshot() {
    return this.store.snapshotRecord(this.record);
  }
  update(e) {
    return this.store.updateRecord(this.record, e);
  }
  show() {
    return this.update({ hidden: !1 });
  }
  hide() {
    return this.update({ hidden: !0 });
  }
  dispose() {
    return this.store.disposeRecord(this.record), Promise.resolve();
  }
}
class lb {
  constructor() {
    c(this, "values", /* @__PURE__ */ new Map());
    c(this, "handles", /* @__PURE__ */ new Map());
    c(this, "mountTargets", /* @__PURE__ */ new Map());
    c(this, "changes", new $i());
  }
  create(e) {
    const t = this.valuesAsSet();
    if (No(e, t), this.values.has(e.id))
      throw new Error(`UI surface "${e.id}" is already registered.`);
    if (e.parentId && this.createsCycle(e.id, e.parentId))
      throw new Error(`UI surface "${e.id}" would create a parent cycle.`);
    const s = e.binding ? this.prepareBinding(e.binding) : void 0, n = {
      id: e.id,
      parentId: e.parentId,
      order: e.order,
      role: e.role,
      accessibleLabel: e.accessibleLabel,
      focusable: e.focusable,
      hidden: e.hidden,
      disposed: !1,
      layout: hs(e.layout),
      style: ps(e.style),
      content: jn(e.content),
      actions: Tn(e.actions),
      bindingState: s,
      mountContent: Ln(e.mountContent),
      children: /* @__PURE__ */ new Set()
    }, r = new db(this, n);
    this.values.set(n.id, n), this.handles.set(n.id, r), n.parentId && this.values.get(n.parentId)?.children.add(n.id);
    try {
      s && this.subscribeBinding(n, s);
    } catch (o) {
      throw this.values.get(n.parentId ?? "")?.children.delete(n.id), this.values.delete(n.id), this.handles.delete(n.id), n.disposed = !0, s?.subscription?.dispose(), o;
    }
    return this.changes.emit(), r;
  }
  get(e) {
    return this.handles.get(e) ?? null;
  }
  list(e) {
    return Object.freeze([...this.values.values()].filter((t) => t.parentId === e).sort((t, s) => (t.order ?? 0) - (s.order ?? 0) || t.id.localeCompare(s.id)).map((t) => rn(t)));
  }
  subscribe(e) {
    return this.changes.subscribe(e);
  }
  getMountTarget(e) {
    return this.mountTargets.get(e) ?? null;
  }
  setMountTarget(e, t) {
    t === null ? this.mountTargets.delete(e) : this.values.has(e) && this.mountTargets.set(e, t);
  }
  clear() {
    const e = [...this.values.values()];
    e.forEach((t) => {
      t.disposed = !0;
    }), this.values.clear(), this.handles.clear(), this.mountTargets.clear();
    try {
      this.disposeBindingSubscriptions(e);
    } finally {
      e.length > 0 && this.changes.emit(), this.changes.clear();
    }
  }
  snapshot(e) {
    const t = this.values.get(e);
    if (!t)
      throw this.disposedError(e);
    return this.snapshotRecord(t);
  }
  updateSurface(e, t) {
    const s = this.values.get(e);
    if (!s)
      throw this.disposedError(e);
    return this.updateRecord(s, t);
  }
  disposeSurface(e) {
    const t = this.values.get(e);
    if (!t)
      throw this.disposedError(e);
    this.disposeRecord(t);
  }
  snapshotRecord(e) {
    return this.assertCurrent(e), rn(e);
  }
  updateRecord(e, t) {
    this.assertCurrent(e);
    const s = t.parentId === null ? void 0 : t.parentId ?? e.parentId, n = t.layout === void 0 ? e.layout : Rc(e.layout, t.layout), r = t.style === void 0 ? e.style : Pc(e.style, t.style), o = t.content === void 0 ? e.content : jn(t.content ?? void 0), a = t.actions === void 0 ? e.actions : Tn(t.actions ?? void 0), d = t.mountContent === void 0 ? e.mountContent : Ln(t.mountContent ?? void 0), u = {
      id: e.id,
      parentId: s,
      order: t.order ?? e.order,
      role: t.role ?? e.role,
      accessibleLabel: t.accessibleLabel === null ? void 0 : t.accessibleLabel ?? e.accessibleLabel,
      focusable: t.focusable ?? e.focusable,
      hidden: t.hidden ?? e.hidden,
      layout: n,
      style: r,
      content: o,
      actions: a,
      binding: t.binding === null ? void 0 : t.binding ?? e.bindingState?.port,
      mountContent: d
    };
    if (No(u, this.valuesAsSet()), s && this.createsCycle(e.id, s))
      throw new Error(`UI surface "${e.id}" would create a parent cycle.`);
    const l = t.binding !== void 0, f = t.binding ? this.prepareBinding(t.binding) : t.binding === null ? void 0 : e.bindingState;
    l && f && this.subscribeBinding(e, f);
    const h = e.parentId, p = e.bindingState;
    return e.parentId = s, e.order = u.order, e.role = u.role, e.accessibleLabel = u.accessibleLabel, e.focusable = u.focusable, e.hidden = u.hidden, e.layout = n, e.style = r, e.content = o, e.actions = a, e.bindingState = f, e.mountContent = d, h !== s && (this.values.get(h ?? "")?.children.delete(e.id), this.values.get(s ?? "")?.children.add(e.id)), this.changes.emit(), l && p !== f && p?.subscription?.dispose(), rn(e);
  }
  disposeRecord(e) {
    if (e.disposed)
      return;
    this.assertCurrent(e);
    const t = [];
    this.collectForDisposal(e, t), this.values.get(e.parentId ?? "")?.children.delete(e.id);
    for (const s of t)
      s.disposed = !0, this.values.delete(s.id), this.handles.delete(s.id), this.mountTargets.delete(s.id);
    try {
      this.disposeBindingSubscriptions(t);
    } finally {
      this.changes.emit();
    }
  }
  prepareBinding(e) {
    const t = kc(e), s = {
      sourcePort: t,
      port: t,
      snapshot: Bi(t.getSnapshot())
    };
    return s.port = Object.freeze({
      getSnapshot: () => Bi(s.snapshot),
      subscribe: (n) => t.subscribe((r) => {
        n(Bi(r));
      })
    }), s;
  }
  subscribeBinding(e, t) {
    const s = t.sourcePort.subscribe((n) => {
      t.snapshot = Bi(n), !e.disposed && this.values.get(e.id) === e && e.bindingState === t && this.changes.emit();
    });
    if (!s || typeof s.dispose != "function")
      throw new TypeError("UI surface binding subscription must return a disposable.");
    t.subscription = s;
  }
  collectForDisposal(e, t) {
    for (const s of [...e.children]) {
      const n = this.values.get(s);
      n && this.collectForDisposal(n, t);
    }
    t.push(e);
  }
  assertCurrent(e) {
    if (e.disposed || this.values.get(e.id) !== e)
      throw this.disposedError(e.id);
  }
  disposedError(e) {
    return new Error(`UI surface "${e}" is disposed.`);
  }
  disposeBindingSubscriptions(e) {
    lm(e.flatMap((t) => t.bindingState?.subscription ? [() => t.bindingState?.subscription?.dispose()] : []), "UI surface binding cleanup failed.");
  }
  valuesAsSet() {
    return new Set(this.values.keys());
  }
  createsCycle(e, t) {
    let s = t;
    for (; s; ) {
      if (s === e)
        return !0;
      s = this.values.get(s)?.parentId;
    }
    return !1;
  }
}
const ub = Object.freeze({
  sidePanelWidth: 320,
  sidePanelCollapsed: !1,
  hiddenSlots: Object.freeze([])
}), Bt = Object.freeze({
  version: 1,
  theme: "dark",
  layout: ub
}), fb = /* @__PURE__ */ new Set(["system", "light", "dark"]), hb = /* @__PURE__ */ new Set(["top-bar", "side-panel", "bottom-status", "floating-overlay"]);
function ko(i) {
  if (typeof i != "object" || i === null)
    return Bt;
  const e = i;
  if (e.version !== 1 || !fb.has(e.theme))
    return Bt;
  const t = e.layout;
  return !t || !Number.isFinite(t.sidePanelWidth) || typeof t.sidePanelCollapsed != "boolean" || !Array.isArray(t.hiddenSlots) || t.hiddenSlots.some((s) => !hb.has(s)) ? Bt : pb(e.theme, {
    sidePanelWidth: Math.min(640, Math.max(220, t.sidePanelWidth)),
    sidePanelCollapsed: t.sidePanelCollapsed,
    hiddenSlots: [...new Set(t.hiddenSlots)]
  });
}
function pb(i, e) {
  return Object.freeze({
    version: 1,
    theme: i,
    layout: Object.freeze({ ...e, hiddenSlots: Object.freeze([...e.hiddenSlots]) })
  });
}
class mb {
  constructor(e, t = "forgeng.ui.preferences.v1") {
    c(this, "storage");
    c(this, "storageKey");
    c(this, "listeners", /* @__PURE__ */ new Set());
    c(this, "snapshot");
    c(this, "destroyPromise", null);
    c(this, "destroyed", !1);
    this.storage = e, this.storageKey = t, this.snapshot = this.read();
  }
  get() {
    return this.snapshot;
  }
  update(e) {
    this.assertActive();
    const t = { ...this.snapshot.layout, ...e.layout ?? {} };
    return this.snapshot = ko({
      version: 1,
      theme: e.theme ?? this.snapshot.theme,
      layout: t
    }), this.persist(), this.emit(), this.snapshot;
  }
  reset() {
    return this.assertActive(), this.snapshot = Bt, this.storage?.removeItem(this.storageKey), this.emit(), this.snapshot;
  }
  subscribe(e) {
    return this.listeners.add(e), { dispose: () => {
      this.listeners.delete(e);
    } };
  }
  clear() {
    this.listeners.clear();
  }
  flush() {
    return this.storage?.flush?.() ?? Promise.resolve();
  }
  destroy() {
    return this.destroyPromise || (this.destroyed = !0, this.destroyPromise = this.flush().finally(() => this.clear())), this.destroyPromise;
  }
  assertActive() {
    if (this.destroyed)
      throw new Error("UI preferences have been destroyed.");
  }
  read() {
    const e = this.storage?.getItem(this.storageKey);
    if (!e)
      return Bt;
    try {
      return ko(JSON.parse(e));
    } catch {
      return Bt;
    }
  }
  persist() {
    this.storage?.setItem(this.storageKey, JSON.stringify(this.snapshot));
  }
  emit() {
    for (const e of [...this.listeners])
      e(this.snapshot);
  }
}
function jc(i, e) {
  if (i.length === 1)
    return i[0];
  const t = new Error(e);
  return Object.defineProperty(t, "errors", { value: Object.freeze([...i]) }), t;
}
const gb = new TextEncoder(), yb = new TextDecoder("utf-8", { fatal: !0 });
class bb {
  constructor(e, t, s) {
    c(this, "area");
    c(this, "storageKey");
    c(this, "cached");
    c(this, "pending", /* @__PURE__ */ new Set());
    c(this, "failures", []);
    this.area = e, this.storageKey = t, this.cached = s;
  }
  getItem(e) {
    return this.assertKey(e), this.cached;
  }
  setItem(e, t) {
    this.assertKey(e), this.cached = t, this.track(this.area.set(e, gb.encode(t)));
  }
  removeItem(e) {
    this.assertKey(e), this.cached = null, this.track(this.area.remove(e).then(() => {
    }));
  }
  async flush() {
    if (await Promise.allSettled([...this.pending]), this.failures.length > 0)
      throw jc(this.failures, "UI preference persistence observed failed writes.");
  }
  assertKey(e) {
    if (e !== this.storageKey)
      throw new TypeError(`UI preference adapter owns only the configured key "${this.storageKey}".`);
  }
  track(e) {
    this.pending.add(e), e.then(() => {
      this.pending.delete(e);
    }, (t) => {
      this.pending.delete(e), this.failures.push(t);
    });
  }
}
async function wb(i, e) {
  const t = await i.get(e);
  let s = null;
  if (t)
    try {
      s = yb.decode(t);
    } catch {
      s = null;
    }
  return new bb(i, e, s);
}
const vb = "forgeng.ui.preferences.v1";
function Ib(i, e) {
  if (e)
    return e;
  const t = i?.ownerDocument;
  if (t && typeof t.createElement == "function")
    return t;
  throw new Error("DOM UI shell requires an explicit Document or a DOM host with ownerDocument.");
}
class Sb {
  constructor(e = {}) {
    c(this, "options");
    c(this, "contributions", new nb());
    c(this, "commands", new ob());
    c(this, "notifications", new ab());
    c(this, "dialogs", new rb());
    c(this, "settings", new cb());
    c(this, "surfaces", new lb());
    c(this, "preferences");
    c(this, "state", "new");
    c(this, "initializePromise", null);
    c(this, "destroyPromise", null);
    c(this, "scope", null);
    this.options = e, this.preferences = new mb(e.storage ?? null, e.storageKey);
  }
  initialize(e) {
    return this.initializePromise ? this.initializePromise : this.state !== "new" ? Promise.reject(new Error(`Cannot initialize DOM UI shell in state ${this.state}.`)) : (this.state = "initializing", this.initializePromise = this.initializeOnce(e), this.initializePromise);
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyOnce()), this.destroyPromise;
  }
  async initializeOnce(e) {
    try {
      if (e.signal.aborted)
        throw e.signal.reason;
      const t = Ib(e.host, this.options.document), s = await pc(async (n) => {
        const r = new sb(t, this, e.logger.child("dom"), this.options.root ?? null, e.host);
        if (await r.initialize(), n.defer(() => r.destroy()), e.signal.aborted)
          throw e.signal.reason;
      });
      this.scope = s.scope, this.state = "ready";
    } catch (t) {
      throw this.state = "destroyed", t;
    }
  }
  async destroyOnce() {
    if (this.state = "destroying", this.initializePromise)
      try {
        await this.initializePromise;
      } catch {
      }
    const e = this.scope;
    this.scope = null;
    const t = await Promise.allSettled([
      e?.dispose() ?? Promise.resolve(),
      this.preferences.destroy()
    ]);
    try {
      this.dialogs.clear(), this.notifications.clear(), this.contributions.clear(), this.settings.clear(), this.commands.clear(), this.surfaces.clear(), this.state = "destroyed";
    } finally {
      const s = t.filter((n) => n.status === "rejected").map((n) => n.reason);
      if (s.length > 0)
        throw jc(s, "DOM UI shell cleanup failed.");
    }
  }
}
function Tc(i = {}) {
  return Object.freeze({
    id: "forgeng.ui.dom-devtools",
    contractVersion: gy,
    implementationVersion: "3.0.0",
    capabilities: [{ id: Cc, version: "1.0.0" }],
    create: (t = i) => new Sb(t),
    bindStorageArea: async (t) => Tc({
      ...i,
      storage: t ? await wb(t, i.storageKey ?? vb) : null
    })
  });
}
const Eb = Tc(), Ro = 104;
class Ab {
  constructor(e, t = {}, s = _b) {
    c(this, "profile");
    c(this, "source");
    c(this, "limits");
    c(this, "samples", 0);
    c(this, "totalMicros", 0);
    c(this, "maximumMicros", 0);
    c(this, "clock");
    const n = _a(t);
    this.profile = n.profile, this.limits = n.limits, this.source = e, this.clock = s;
  }
  inspect(e) {
    const t = this.profile === "off" ? 0 : this.clock(), s = this.source, n = s?.composition(), r = s?.engine(), o = s?.scene() ?? null, a = s?.domain() ?? null, d = e ? this.resolve(e) : null, u = [];
    o && this.profile !== "off" && u.push(Object.freeze({
      owner: "engine-scene",
      sceneId: o.sceneId,
      domainId: `forgeng.engine2d:${o.domainGeneration}`,
      cpuBytes: o.bufferCapacity * Ro,
      gpuBufferBytes: 0,
      gpuTextureBytes: 0,
      trackedBytes: o.bufferCapacity * Ro,
      buffers: o.retainedBuffers,
      textures: 0,
      pipelines: 0,
      leases: o.leasedBuffers,
      handles: o.entities,
      pendingRetirements: 0
    })), a && u.push(a.resources);
    const l = $a(Object.freeze({
      snapshotVersion: 2,
      apiVersion: Gd,
      schemaVersion: zr,
      profile: this.profile,
      composition: Object.freeze({ id: n?.id ?? "destroyed", state: n?.state ?? "destroyed", frame: n?.frame ?? 0, presentations: n?.presentations ?? 0 }),
      engine: Object.freeze({
        definitions: r?.definitionCount ?? 0,
        attachments: r?.activeAttachments ?? 0,
        entities: r?.retainedEntities ?? 0,
        retainedBuffers: r?.retainedBuffers ?? 0
      }),
      scene: o ? Object.freeze({ id: o.sceneId, sceneGeneration: o.sceneGeneration, domainGeneration: o.domainGeneration }) : null,
      domain: a,
      resourceOwners: Object.freeze(u),
      selection: d,
      overhead: this.overhead(0),
      destroyed: s === null
    })), f = this.profile === "off" ? 0 : Math.max(0, (this.clock() - t) * 1e3);
    return this.samples += this.profile === "off" ? 0 : 1, this.totalMicros += f, this.maximumMicros = Math.max(this.maximumMicros, f), Object.freeze({ ...l, overhead: this.overhead(f) });
  }
  resolve(e) {
    if (!this.source || this.limits.selections === 0 || e.referenceVersion !== 1) return null;
    const t = this.source.scene(), s = this.source.definition();
    if (!t || !s || e.sceneId !== t.sceneId || e.sceneGeneration !== t.sceneGeneration) return null;
    const n = xb(s), r = e.kind === "item" ? n.filter((a) => a.id === e.id) : n.filter((a) => a.entity === e.id);
    if (r.length === 0) return null;
    const o = r[0];
    return Object.freeze({
      snapshotVersion: 1,
      reference: Object.freeze({ ...e }),
      itemIds: Object.freeze(r.slice(0, this.limits.selections).map((a) => a.id)),
      entityId: o.entity,
      kind: e.kind === "entity" ? "entity" : o.kind,
      layerId: o.layer
    });
  }
  exportScene(e) {
    if (!this.source) throw Object.assign(new Error("2D inspection was destroyed."), { code: "SDK_2D_INSPECTION_DESTROYED", path: "$.twoD.inspection" });
    return Bd(Object.freeze({
      exportVersion: Fd,
      schemaVersion: zr,
      minimumReaderVersion: 1,
      migrations: Object.freeze([]),
      definition: this.source.definition(),
      inspection: this.inspect(e)
    }));
  }
  destroy() {
    this.source = null;
  }
  overhead(e) {
    const t = this.limits.overheadBudgetMicros;
    return Object.freeze({
      samples: this.samples,
      lastMicros: e,
      totalMicros: this.totalMicros,
      maximumMicros: this.maximumMicros,
      budgetMicros: t,
      withinBudget: this.profile === "off" || this.maximumMicros <= t
    });
  }
}
function xb(i) {
  const e = [], t = (s, n) => {
    for (const r of n) e.push(Object.freeze({ id: r.id, entity: r.entity, layer: r.layer, kind: s }));
  };
  return t("sprite", i.sprites), t("tilemap", i.tilemaps), t("text", i.texts), t("particle", i.particles), Object.freeze(e);
}
function _b() {
  return globalThis.performance?.now?.() ?? Date.now();
}
class $b {
  constructor(e, t) {
    c(this, "disposables", []);
    c(this, "destroyPromise", null);
    const s = Object.freeze([
      Object.freeze({ id: "profile", label: "Inspection profile", kind: "status", read: () => t.profile }),
      Object.freeze({ id: "scene", label: "2D scene", kind: "status", read: () => t.inspect().domain?.sceneId ?? "none" }),
      Object.freeze({ id: "frame", label: "Presented frame", kind: "status", read: () => t.inspect().composition.frame }),
      Object.freeze({ id: "draws", label: "Draw calls", kind: "status", read: () => t.inspect().domain?.batches.drawCalls ?? 0 })
    ]), n = Object.freeze([
      Object.freeze({ id: "items", label: "Visible items", kind: "status", read: () => t.inspect().domain?.cameras.reduce((r, o) => r + o.visibleItems, 0) ?? 0 }),
      Object.freeze({ id: "tracked-bytes", label: "Tracked renderer bytes", kind: "status", read: () => t.inspect().domain?.resources.trackedBytes ?? 0 }),
      Object.freeze({ id: "failures", label: "Failures", kind: "status", read: () => t.inspect().domain?.failures.reduce((r, o) => r + o.count, 0) ?? 0 }),
      Object.freeze({ id: "overhead", label: "Inspection overhead (us)", kind: "status", read: () => Math.round(t.inspect().overhead.maximumMicros) })
    ]);
    this.disposables.push(e.settings.register(Object.freeze({ id: "forgeng.render2d.status", title: "ForgeNG 2D Status", fields: s }))), this.disposables.push(e.settings.register(Object.freeze({ id: "forgeng.render2d.diagnostics", title: "ForgeNG 2D Diagnostics", fields: n }))), this.disposables.push(e.contributions.register(Object.freeze({ id: "forgeng.render2d.status", title: "2D Renderer", slot: "bottom-status", order: 200, settingsSchemaId: "forgeng.render2d.status" }))), this.disposables.push(e.contributions.register(Object.freeze({ id: "forgeng.render2d.diagnostics", title: "2D Diagnostics", slot: "side-panel", order: 220, settingsSchemaId: "forgeng.render2d.diagnostics" })));
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async destroyInternal() {
    const e = [];
    for (const t of [...this.disposables].reverse()) try {
      await t.dispose();
    } catch (s) {
      e.push(s);
    }
    if (this.disposables.length = 0, e.length > 0) throw Object.assign(new Error("2D inspection UI cleanup failed."), { name: "AggregateError", errors: Object.freeze(e) });
  }
}
function zb(i, e) {
  const t = globalThis.AggregateError;
  return t ? new t(i, e) : Object.assign(new Error(e), {
    name: "AggregateError",
    errors: i
  });
}
class Ob {
  constructor(e = [], t) {
    c(this, "onFailure");
    c(this, "snapshots");
    c(this, "byId");
    this.onFailure = t;
    const s = /* @__PURE__ */ new Set();
    this.snapshots = Object.freeze([...e].sort((n, r) => n.id.localeCompare(r.id)).map((n) => {
      if (!/^[a-z0-9]+(?:[._/-][a-z0-9]+)*:[a-z0-9]+(?:[._/-][a-z0-9]+)*$/.test(n.id) || typeof n.version != "string" || n.version.length === 0 || typeof n.available != "boolean")
        throw this.onFailure?.("GAMEPLAY_INVALID_CAPABILITY"), new D({
          code: "GAMEPLAY_INVALID_CAPABILITY",
          operation: "capability",
          id: n.id,
          message: "Capability snapshots require a namespaced id, non-empty version, and boolean availability."
        });
      if (s.has(n.id))
        throw new D({
          code: "GAMEPLAY_AMBIGUOUS_OWNERSHIP",
          operation: "capability",
          id: n.id,
          message: `Capability "${n.id}" is declared more than once.`
        });
      return s.add(n.id), Object.freeze({ ...n });
    })), this.byId = new Map(this.snapshots.map((n) => [n.id, n]));
  }
  has(e) {
    return this.byId.get(e)?.available === !0;
  }
  require(e) {
    const t = this.byId.get(e);
    if (!t?.available)
      throw this.onFailure?.("GAMEPLAY_CAPABILITY_UNAVAILABLE"), new D({
        code: "GAMEPLAY_CAPABILITY_UNAVAILABLE",
        operation: "capability",
        id: e,
        message: `Required gameplay capability "${e}" is unavailable.`
      });
    return t;
  }
  list() {
    return this.snapshots;
  }
}
class Db {
  constructor() {
    c(this, "values", Object.freeze({}));
  }
  set(e) {
    const t = {};
    for (const s of Object.keys(e).sort()) {
      const n = e[s];
      if (typeof n == "boolean" || typeof n == "number" && Number.isFinite(n))
        t[s] = n;
      else if (Array.isArray(n) && n.length === 2 && n.every((r) => Number.isFinite(r)))
        t[s] = Object.freeze([n[0], n[1]]);
      else
        throw new D({
          code: "GAMEPLAY_INVALID_COMPONENT_VALUE",
          operation: "validate",
          path: `input.${s}`,
          message: "Gameplay input snapshots contain only booleans, finite numbers, or finite vector2 tuples."
        });
    }
    this.values = Object.freeze(t);
  }
  value(e) {
    return this.values[e.id] ?? e.default;
  }
  snapshot() {
    return this.values;
  }
}
class Cb {
  constructor(e) {
    c(this, "adapter");
    c(this, "values", Object.freeze({}));
    c(this, "pending", {});
    this.adapter = e;
  }
  publish(e, t) {
    if (!/^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/.test(e))
      throw new D({
        code: "GAMEPLAY_INVALID_ID",
        operation: "world",
        path: "presentation.channel",
        message: "Presentation channel must be a normalized local id."
      });
    const s = Mn(JSON.parse(JSON.stringify(t)));
    this.pending[e] = s, this.adapter?.publish(e, s);
  }
  async flush(e) {
    const t = Object.freeze(Object.fromEntries(Object.keys(this.pending).sort().map((s) => [s, this.pending[s]])));
    this.pending = {}, this.values = t, await this.adapter?.synchronize?.(t, e);
  }
  snapshot() {
    return this.values;
  }
  clear() {
    this.pending = {}, this.values = Object.freeze({});
  }
  async destroy() {
    this.clear(), await this.adapter?.destroy?.();
  }
}
function Mn(i) {
  if (i !== null && typeof i == "object" && !Object.isFrozen(i)) {
    if (Array.isArray(i))
      for (const e of i)
        Mn(e);
    else
      for (const e of Object.values(i))
        Mn(e);
    Object.freeze(i);
  }
  return i;
}
function Nb(i) {
  return {
    async prepare({ assetIds: e, signal: t }) {
      t.throwIfAborted();
      const s = [];
      try {
        for (const r of e)
          s.push(await i(r, t)), t.throwIfAborted();
      } catch (r) {
        throw await Promise.allSettled([...s].reverse().map((o) => o.release())), r;
      }
      let n = !1;
      return { async release() {
        if (n)
          return;
        n = !0;
        const o = (await Promise.allSettled([...s].reverse().map((a) => a.release()))).flatMap((a) => a.status === "rejected" ? [a.reason] : []);
        if (o.length > 0)
          throw zb(o, "Gameplay external lease release failed.");
      } };
    }
  };
}
function Lt(i, e, t) {
  const s = /* @__PURE__ */ new Map();
  for (const n of [...e, ...t]) {
    if (s.has(n.id))
      throw new D({
        code: "GAMEPLAY_DUPLICATE_DEFINITION",
        operation: "catalog",
        id: n.id,
        message: `Scene scope contains duplicate ${i} definition "${n.id}".`
      });
    s.set(n.id, n);
  }
  return s;
}
class Lc {
  constructor(e, t) {
    c(this, "game");
    c(this, "scene");
    c(this, "components");
    c(this, "prefabs");
    c(this, "systems");
    c(this, "events");
    c(this, "commands");
    c(this, "actionMaps");
    this.game = e, this.scene = t, this.components = Lt("component", e.components, t.components), this.prefabs = Lt("prefab", e.prefabs, t.prefabs), this.systems = Lt("system", e.systems, t.systems), this.events = Lt("event", e.events, t.events), this.commands = Lt("command", e.commands, t.commands), this.actionMaps = Lt("action map", e.actionMaps, t.input.maps);
  }
  requirePrefab(e) {
    const t = this.prefabs.get(e);
    if (!t)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "spawn",
        id: e,
        message: `Prefab "${e}" is not available in scene "${this.scene.id}".`
      });
    return t;
  }
  requireComponent(e) {
    const t = this.components.get(e);
    if (!t)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "restore",
        id: e,
        message: `Component "${e}" is not available in scene "${this.scene.id}".`
      });
    return t;
  }
}
class kb {
  constructor(e) {
    c(this, "game");
    c(this, "scenes");
    this.game = e, this.scenes = new Map(e.scenes.map((t) => [t.id, t]));
  }
  requireScene(e) {
    const t = this.scenes.get(e);
    if (!t)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "catalog",
        id: e,
        message: `Gameplay scene "${e}" is not part of game "${this.game.id}".`
      });
    return t;
  }
  forScene(e) {
    return new Lc(this.game, this.requireScene(e));
  }
  inspect() {
    const e = (t, s) => [.../* @__PURE__ */ new Set([...t.map((n) => n.id), ...this.game.scenes.flatMap((n) => n[s].map((r) => r.id))])].sort();
    return Object.freeze({
      gameId: this.game.id,
      scenes: Object.freeze(this.game.scenes.map((t) => t.id).sort()),
      prefabs: Object.freeze(e(this.game.prefabs, "prefabs")),
      components: Object.freeze(e(this.game.components, "components")),
      systems: Object.freeze(e(this.game.systems, "systems")),
      events: Object.freeze(e(this.game.events, "events")),
      commands: Object.freeze(e(this.game.commands, "commands")),
      schedule: Object.freeze([...this.game.systems, ...this.game.scenes.flatMap((t) => t.systems)].sort((t, s) => t.phase.localeCompare(s.phase) || t.id.localeCompare(s.id)).map((t) => Object.freeze({
        id: t.id,
        phase: t.phase,
        before: Object.freeze(t.before.map((s) => s.id).sort()),
        after: Object.freeze(t.after.map((s) => s.id).sort())
      })))
    });
  }
}
class Rb {
  constructor(e) {
    c(this, "listeners", /* @__PURE__ */ new Set());
    c(this, "aborted", !1);
    c(this, "reason");
    c(this, "signal");
    const t = this;
    this.signal = Object.freeze({
      get aborted() {
        return t.aborted;
      },
      get reason() {
        return t.reason;
      },
      throwIfAborted: () => this.throwIfAborted(),
      subscribe: (s) => this.subscribe(s)
    }), e && (e.aborted ? this.abort(e.reason) : e.subscribe((s) => this.abort(s)));
  }
  abort(e = new Error("Gameplay operation cancelled.")) {
    if (this.aborted)
      return;
    this.aborted = !0, this.reason = e;
    const t = [...this.listeners];
    this.listeners.clear();
    for (const s of t)
      s(e);
  }
  throwIfAborted() {
    if (this.aborted)
      throw this.reason;
  }
  subscribe(e) {
    if (this.aborted)
      return e(this.reason), Object.freeze({ dispose() {
      } });
    this.listeners.add(e);
    let t = !0;
    return Object.freeze({
      dispose: () => {
        t && (t = !1, this.listeners.delete(e));
      }
    });
  }
}
class Pb {
  constructor() {
    c(this, "active", /* @__PURE__ */ new Set());
    c(this, "free", []);
    c(this, "nextId", 0);
    c(this, "destroyed", !1);
  }
  allocate() {
    if (this.destroyed)
      throw new D({
        code: "GAMEPLAY_WORLD_DISPOSED",
        operation: "world",
        message: "Entity store is destroyed."
      });
    const e = this.free.shift() ?? this.nextId++;
    return this.active.add(e), e;
  }
  release(e) {
    if (!this.active.delete(e))
      return;
    const t = this.free.findIndex((s) => s > e);
    t < 0 ? this.free.push(e) : this.free.splice(t, 0, e);
  }
  has(e) {
    return this.active.has(e);
  }
  count() {
    return this.active.size;
  }
  clear() {
    const e = [...this.active].sort((t, s) => t - s);
    this.active.clear(), this.free.splice(0, this.free.length, ...e);
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.active.clear(), this.free.length = 0);
  }
}
const Po = [
  "scene-preparation",
  "scene-retirement",
  "checkpoint-create",
  "checkpoint-restore",
  "replay"
];
class jb {
  constructor(e = "forgeng.gameplay:unbound") {
    c(this, "activeGameId");
    c(this, "activeSceneId", null);
    c(this, "lifecycleGeneration", 0);
    c(this, "entityCount", 0);
    c(this, "componentCount", 0);
    c(this, "systemCount", 0);
    c(this, "prefabCount", 0);
    c(this, "spawnCount", 0);
    c(this, "despawnCount", 0);
    c(this, "commandCount", 0);
    c(this, "eventCount", 0);
    c(this, "checkpointCount", 0);
    c(this, "restoreCount", 0);
    c(this, "replayCount", 0);
    c(this, "staleHandleFailures", 0);
    c(this, "validationFailures", 0);
    c(this, "capabilityFailures", 0);
    c(this, "lifecycleFailures", 0);
    c(this, "queueOverflowFailures", 0);
    c(this, "trackedEstimateBytes", 0);
    c(this, "eventQueueHighWater", 0);
    c(this, "commandQueueHighWater", 0);
    c(this, "failureCounts", /* @__PURE__ */ new Map());
    c(this, "systemTimingValues", /* @__PURE__ */ new Map());
    c(this, "operationTimingValues", new Map(Po.map((e) => [e, { samples: 0, totalMilliseconds: 0, maxMilliseconds: 0 }])));
    this.activeGameId = e;
  }
  failure(e) {
    this.failureCounts.set(e, (this.failureCounts.get(e) ?? 0) + 1), (e === "GAMEPLAY_STALE_ENTITY" || e === "GAMEPLAY_STALE_WORLD") && (this.staleHandleFailures += 1), (e.startsWith("GAMEPLAY_INVALID") || e === "GAMEPLAY_MISSING_REFERENCE") && (this.validationFailures += 1), (e === "GAMEPLAY_CAPABILITY_UNAVAILABLE" || e === "GAMEPLAY_INVALID_CAPABILITY") && (this.capabilityFailures += 1), (e === "GAMEPLAY_LIFECYCLE_INVALID" || e === "GAMEPLAY_SYSTEM_FAILED") && (this.lifecycleFailures += 1), e === "GAMEPLAY_QUEUE_OVERFLOW" && (this.queueOverflowFailures += 1);
  }
  recordSystem(e, t, s) {
    const n = `${t}:${e}`;
    let r = this.systemTimingValues.get(n);
    r || (r = { id: e, phase: t, samples: 0, totalMilliseconds: 0, maxMilliseconds: 0 }, this.systemTimingValues.set(n, r)), this.addTiming(r, s);
  }
  recordOperation(e, t) {
    this.addTiming(this.operationTimingValues.get(e), t);
  }
  snapshot() {
    return Object.freeze({
      activeGameId: this.activeGameId,
      activeSceneId: this.activeSceneId,
      lifecycleGeneration: this.lifecycleGeneration,
      entityCount: this.entityCount,
      componentCount: this.componentCount,
      systemCount: this.systemCount,
      prefabCount: this.prefabCount,
      spawnCount: this.spawnCount,
      despawnCount: this.despawnCount,
      commandCount: this.commandCount,
      eventCount: this.eventCount,
      checkpointCount: this.checkpointCount,
      restoreCount: this.restoreCount,
      replayCount: this.replayCount,
      staleHandleFailures: this.staleHandleFailures,
      validationFailures: this.validationFailures,
      capabilityFailures: this.capabilityFailures,
      lifecycleFailures: this.lifecycleFailures,
      queueOverflowFailures: this.queueOverflowFailures,
      trackedEstimateBytes: this.trackedEstimateBytes,
      systemTimings: Object.freeze([...this.systemTimingValues.values()].sort((e, t) => e.phase.localeCompare(t.phase) || e.id.localeCompare(t.id)).map((e) => Object.freeze({ ...e }))),
      operationTimings: Object.freeze(Object.fromEntries(Po.map((e) => [
        e,
        Object.freeze({ ...this.operationTimingValues.get(e) })
      ]))),
      queueHighWaterMarks: Object.freeze({ events: this.eventQueueHighWater, commands: this.commandQueueHighWater }),
      failures: Object.freeze(Object.fromEntries([...this.failureCounts.entries()].sort(([e], [t]) => e.localeCompare(t))))
    });
  }
  addTiming(e, t) {
    const s = Number.isFinite(t) ? Math.max(0, t) : 0;
    e.samples += 1, e.totalMilliseconds += s, e.maxMilliseconds = Math.max(e.maxMilliseconds, s);
  }
}
class Tb {
  constructor(e, t, s, n) {
    c(this, "catalog");
    c(this, "metrics");
    c(this, "maxEvents");
    c(this, "maxCommands");
    c(this, "eventListeners", /* @__PURE__ */ new Map());
    c(this, "eventQueue", []);
    c(this, "commandQueue", []);
    c(this, "sequence", 0);
    c(this, "destroyed", !1);
    this.catalog = e, this.metrics = t, this.maxEvents = s, this.maxCommands = n;
  }
  emit(e, t) {
    const s = e.kind, n = e.id;
    this.assertOpen(s);
    const r = s === "event", o = r ? this.catalog.events.get(n) : this.catalog.commands.get(n);
    if (o !== e)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: s,
        id: n,
        message: `${s} "${n}" is not owned by the active scene catalog.`
      });
    const a = r ? this.eventQueue : this.commandQueue, d = r ? this.maxEvents : this.maxCommands;
    if (a.length >= d)
      throw this.metrics.failure("GAMEPLAY_QUEUE_OVERFLOW"), new D({
        code: "GAMEPLAY_QUEUE_OVERFLOW",
        operation: s,
        id: n,
        message: `${s} queue exceeded its configured limit of ${d}.`
      });
    a.push({ sequence: this.sequence++, definitionId: n, value: o.validateValue(t) }), r ? (this.metrics.eventCount += 1, this.metrics.eventQueueHighWater = Math.max(this.metrics.eventQueueHighWater, a.length)) : (this.metrics.commandCount += 1, this.metrics.commandQueueHighWater = Math.max(this.metrics.commandQueueHighWater, a.length));
  }
  subscribe(e, t) {
    this.assertOpen("event");
    const s = e.id;
    if (this.catalog.events.get(s) !== e)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "event",
        id: s,
        message: `Event "${s}" is not owned by the active scene catalog.`
      });
    let n = this.eventListeners.get(s);
    n || this.eventListeners.set(s, n = /* @__PURE__ */ new Set());
    const r = t;
    n.add(r);
    let o = !1;
    const a = this;
    return Object.freeze({
      get disposed() {
        return o;
      },
      dispose() {
        o || (o = !0, a.eventListeners.get(s)?.delete(r));
      }
    });
  }
  flushEvents(e) {
    this.assertOpen("event");
    const t = this.eventQueue;
    this.eventQueue = [];
    for (const s of t) {
      const n = this.catalog.events.get(s.definitionId);
      if (!(e?.time.mode === "replay" && n.replayPolicy === "suppress"))
        for (const r of [...this.eventListeners.get(s.definitionId) ?? []])
          r(n.validateValue(s.value));
    }
  }
  flushCommands(e) {
    this.assertOpen("command");
    const t = this.commandQueue;
    this.commandQueue = [];
    for (const s of t) {
      const n = this.catalog.commands.get(s.definitionId);
      e.time.mode === "replay" && n.replayPolicy === "suppress" || n.handle?.(e, n.validateValue(s.value));
    }
  }
  snapshotEvents() {
    return this.snapshotQueue(this.eventQueue);
  }
  snapshotCommands() {
    return this.snapshotQueue(this.commandQueue);
  }
  restore(e, t) {
    this.eventQueue = e.map((s) => this.restoreItem("event", s)), this.commandQueue = t.map((s) => this.restoreItem("command", s)), this.sequence = Math.max(0, ...e.map((s) => s.sequence + 1), ...t.map((s) => s.sequence + 1));
  }
  clear() {
    this.eventQueue = [], this.commandQueue = [];
  }
  destroy() {
    this.clear(), this.eventListeners.clear(), this.destroyed = !0;
  }
  snapshotQueue(e) {
    return Object.freeze(e.map((t) => Object.freeze({
      sequence: t.sequence,
      definitionId: t.definitionId,
      value: t.value
    })));
  }
  restoreItem(e, t) {
    const s = e === "event" ? this.catalog.events.get(t.definitionId) : this.catalog.commands.get(t.definitionId);
    if (!s)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "restore",
        id: t.definitionId,
        message: `Snapshot references missing ${e} "${t.definitionId}".`
      });
    if (!Number.isSafeInteger(t.sequence) || t.sequence < 0)
      throw new D({
        code: "GAMEPLAY_INVALID_SNAPSHOT",
        operation: "restore",
        message: "Queue sequence must be a non-negative safe integer."
      });
    return { sequence: t.sequence, definitionId: t.definitionId, value: s.validateValue(t.value) };
  }
  assertOpen(e) {
    if (this.destroyed)
      throw new D({
        code: "GAMEPLAY_WORLD_DISPOSED",
        operation: e,
        message: "Gameplay queues are destroyed."
      });
  }
}
function Ui() {
  return globalThis.performance?.now() ?? 0;
}
function Lb(i, e) {
  const t = i.filter((u) => u.phase === e), s = new Map(t.map((u) => [u.id, u])), n = new Map(t.map((u) => [u.id, /* @__PURE__ */ new Set()])), r = new Map(t.map((u) => [u.id, 0])), o = (u, l) => {
    if (!s.has(u) || !s.has(l))
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "schedule",
        id: s.has(u) ? l : u,
        message: `System ordering reference must resolve within phase "${e}".`
      });
    n.get(u).has(l) || (n.get(u).add(l), r.set(l, r.get(l) + 1));
  };
  for (const u of t) {
    for (const l of u.after)
      o(l.id, u.id);
    for (const l of u.before)
      o(u.id, l.id);
  }
  const a = [...t.filter((u) => r.get(u.id) === 0)].sort((u, l) => u.id.localeCompare(l.id)), d = [];
  for (; a.length > 0; ) {
    const u = a.shift();
    d.push(u);
    for (const l of [...n.get(u.id)].sort())
      r.set(l, r.get(l) - 1), r.get(l) === 0 && (a.push(s.get(l)), a.sort((f, h) => f.id.localeCompare(h.id)));
  }
  if (d.length !== t.length)
    throw new D({
      code: "GAMEPLAY_DEPENDENCY_CYCLE",
      operation: "schedule",
      message: `System dependency cycle exists in phase "${e}".`
    });
  return Object.freeze(d);
}
class Mb {
  constructor(e, t) {
    c(this, "metrics");
    c(this, "ordered");
    c(this, "lifecycleOrder");
    c(this, "destroyed", !1);
    this.metrics = t;
    const s = ["fixed-simulation", "post-simulation-sync", "frame", "render-sync"], n = Object.fromEntries(s.map((r) => [
      r,
      Lb(e, r).map((o) => ({ definition: o, disabled: !1, initialized: !1, started: !1 }))
    ]));
    this.ordered = Object.freeze(n), this.lifecycleOrder = Object.freeze(s.flatMap((r) => n[r])), t.systemCount = e.length;
  }
  async initialize(e) {
    const t = [];
    try {
      for (const s of this.lifecycleOrder)
        await s.definition.initialize?.(e), s.initialized = !0, t.push(s);
    } catch (s) {
      const n = [s];
      for (const r of t.reverse()) {
        r.initialized = !1;
        try {
          await r.definition.destroy?.(e);
        } catch (o) {
          n.push(o);
        }
      }
      throw this.lifecycleFailure(n, "initialize");
    }
  }
  async start(e) {
    const t = [];
    try {
      for (const s of this.lifecycleOrder)
        !s.initialized || s.disabled || (await s.definition.start?.(e), s.started = !0, t.push(s));
    } catch (s) {
      const n = [s];
      for (const r of t.reverse()) {
        r.started = !1;
        try {
          await r.definition.stop?.(e);
        } catch (o) {
          n.push(o);
        }
      }
      throw this.lifecycleFailure(n, "start");
    }
  }
  async run(e, t) {
    if (this.destroyed)
      throw new D({
        code: "GAMEPLAY_LIFECYCLE_INVALID",
        operation: "schedule",
        lifecyclePhase: "destroyed",
        message: "Gameplay scheduler is destroyed."
      });
    for (const s of this.ordered[e]) {
      if (s.disabled || !s.started)
        continue;
      const n = Ui();
      try {
        const r = s.definition.run(t);
        if (e === "fixed-simulation" && r && typeof r.then == "function")
          throw Promise.resolve(r).catch(() => {
          }), new D({
            code: "GAMEPLAY_ASYNC_FIXED_SYSTEM",
            operation: "schedule",
            id: s.definition.id,
            message: `Fixed simulation system "${s.definition.id}" returned a promise.`
          });
        await r;
      } catch (r) {
        const o = r instanceof D ? r : new D({
          code: "GAMEPLAY_SYSTEM_FAILED",
          operation: "schedule",
          id: s.definition.id,
          message: `Gameplay system "${s.definition.id}" failed.`,
          cause: r
        });
        if (this.metrics.failure(o.code), s.definition.failurePolicy === "disable-system") {
          s.disabled = !0;
          continue;
        }
        throw o;
      } finally {
        this.metrics.recordSystem(s.definition.id, e, Ui() - n);
      }
    }
  }
  runFixed(e) {
    if (this.destroyed)
      throw new D({
        code: "GAMEPLAY_LIFECYCLE_INVALID",
        operation: "schedule",
        lifecyclePhase: "destroyed",
        message: "Gameplay scheduler is destroyed."
      });
    for (const t of this.ordered["fixed-simulation"]) {
      if (t.disabled || !t.started)
        continue;
      const s = Ui();
      try {
        const n = t.definition.run(e);
        if (n && typeof n.then == "function")
          throw Promise.resolve(n).catch(() => {
          }), new D({
            code: "GAMEPLAY_ASYNC_FIXED_SYSTEM",
            operation: "schedule",
            id: t.definition.id,
            message: `Fixed simulation system "${t.definition.id}" returned a promise.`
          });
      } catch (n) {
        const r = n instanceof D ? n : new D({
          code: "GAMEPLAY_SYSTEM_FAILED",
          operation: "schedule",
          id: t.definition.id,
          message: `Gameplay system "${t.definition.id}" failed.`,
          cause: n
        });
        if (this.metrics.failure(r.code), t.definition.failurePolicy === "disable-system") {
          t.disabled = !0;
          continue;
        }
        throw r;
      } finally {
        this.metrics.recordSystem(t.definition.id, "fixed-simulation", Ui() - s);
      }
    }
  }
  async stop(e) {
    const t = [];
    for (const s of [...this.lifecycleOrder].reverse())
      if (s.started) {
        s.started = !1;
        try {
          await s.definition.stop?.(e);
        } catch (n) {
          t.push(n);
        }
      }
    if (t.length > 0)
      throw this.lifecycleFailure(t, "stop");
  }
  async destroy(e) {
    if (this.destroyed)
      return;
    const t = [];
    for (const s of [...this.lifecycleOrder].reverse())
      if (s.initialized) {
        s.initialized = !1;
        try {
          await s.definition.destroy?.(e);
        } catch (n) {
          t.push(n);
        }
      }
    if (this.destroyed = !0, t.length > 0)
      throw this.lifecycleFailure(t, "destroy");
  }
  inspect() {
    return Object.freeze(this.lifecycleOrder.map((e) => Object.freeze({
      id: e.definition.id,
      phase: e.definition.phase,
      disabled: e.disabled,
      started: e.started
    })));
  }
  lifecycleFailure(e, t) {
    return this.metrics.failure("GAMEPLAY_SYSTEM_FAILED"), new D({
      code: "GAMEPLAY_SYSTEM_FAILED",
      operation: "system-lifecycle",
      message: `Gameplay system ${t} lifecycle failed.`,
      cause: e.length === 1 ? e[0] : e
    });
  }
}
function ms(i) {
  if (i === null || typeof i != "object")
    return JSON.stringify(i);
  if (Array.isArray(i))
    return `[${i.map(ms).join(",")}]`;
  const e = i;
  return `{${Object.keys(e).sort().map((t) => `${JSON.stringify(t)}:${ms(e[t])}`).join(",")}}`;
}
function jo(i) {
  const e = ms(i);
  let t = 2166136261;
  for (let s = 0; s < e.length; s += 1)
    t ^= e.charCodeAt(s), t = Math.imul(t, 16777619) >>> 0;
  return `fnv1a32:${t.toString(16).padStart(8, "0")}`;
}
function Vb(i) {
  return ms(i).length;
}
class Gb {
  constructor(e) {
    c(this, "value");
    this.value = e >>> 0 || 1831565813;
  }
  next() {
    let e = this.value;
    return e ^= e << 13, e ^= e >>> 17, e ^= e << 5, this.value = e >>> 0, this.value / 4294967296;
  }
  integer(e, t) {
    if (!Number.isSafeInteger(e) || !Number.isSafeInteger(t) || t < e)
      throw new D({
        code: "GAMEPLAY_INVALID_DEFINITION",
        operation: "world",
        message: "Random integer bounds must be safe integers with maximum >= minimum."
      });
    return e + Math.floor(this.next() * (t - e + 1));
  }
  state() {
    return this.value;
  }
  restore(e) {
    if (!Number.isSafeInteger(e) || e < 0 || e > 4294967295)
      throw new D({
        code: "GAMEPLAY_INVALID_SNAPSHOT",
        operation: "restore",
        message: "Random state must be a uint32."
      });
    this.value = e >>> 0;
  }
}
class Fb {
  constructor(e, t, s, n) {
    c(this, "fixedDeltaSeconds");
    c(this, "maxTimers");
    c(this, "commands");
    c(this, "catalog");
    c(this, "tick", 0);
    c(this, "deltaSeconds", 0);
    c(this, "elapsedSeconds", 0);
    c(this, "scale", 1);
    c(this, "paused", !1);
    c(this, "nextTimerId", 1);
    c(this, "timers", /* @__PURE__ */ new Map());
    if (this.fixedDeltaSeconds = e, this.maxTimers = t, this.commands = s, this.catalog = n, !Number.isFinite(e) || e <= 0)
      throw new D({
        code: "GAMEPLAY_INVALID_DEFINITION",
        operation: "timer",
        message: "fixedDeltaSeconds must be positive."
      });
  }
  schedule(e, t, s) {
    if (!Number.isFinite(e) || e < 0)
      throw new D({
        code: "GAMEPLAY_INVALID_DEFINITION",
        operation: "timer",
        message: "Timer delay must be finite and non-negative."
      });
    const n = this.catalog.commands.get(t.id);
    if (n !== t)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "timer",
        id: t.id,
        message: `Timer command "${t.id}" is not owned by the active scene catalog.`
      });
    if (this.timers.size >= this.maxTimers)
      throw new D({
        code: "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "timer",
        message: `Timer count exceeded ${this.maxTimers}.`
      });
    const r = {
      id: this.nextTimerId++,
      dueTick: this.tick + Math.max(1, Math.ceil(e / this.fixedDeltaSeconds)),
      command: n,
      value: n.validateValue(s),
      cancelled: !1
    };
    this.timers.set(r.id, r);
    const o = this;
    return Object.freeze({ get id() {
      return r.id;
    }, get cancelled() {
      return r.cancelled;
    }, cancel() {
      r.cancelled || (r.cancelled = !0, o.timers.delete(r.id));
    } });
  }
  advance(e = this.fixedDeltaSeconds) {
    if (!Number.isFinite(e) || e < 0)
      throw new D({
        code: "GAMEPLAY_INVALID_DEFINITION",
        operation: "timer",
        message: "Clock delta must be finite and non-negative."
      });
    this.deltaSeconds = this.paused ? 0 : e * this.scale, this.paused || (this.tick += 1, this.elapsedSeconds += this.deltaSeconds);
    const t = [...this.timers.values()].filter((s) => !s.cancelled && s.dueTick <= this.tick).sort((s, n) => s.dueTick - n.dueTick || s.id - n.id);
    for (const s of t)
      this.timers.delete(s.id), s.cancelled = !0, this.commands.emit(s.command, s.value);
  }
  configure(e) {
    if (e.scale !== void 0) {
      if (!Number.isFinite(e.scale) || e.scale < 0)
        throw new D({
          code: "GAMEPLAY_INVALID_DEFINITION",
          operation: "timer",
          message: "Time scale must be finite and non-negative."
        });
      this.scale = e.scale;
    }
    e.paused !== void 0 && (this.paused = e.paused);
  }
  snapshotTimers() {
    return Object.freeze([...this.timers.values()].sort((e, t) => e.dueTick - t.dueTick || e.id - t.id).map((e) => Object.freeze({
      id: e.id,
      dueTick: e.dueTick,
      commandId: e.command.id,
      value: e.value
    })));
  }
  restore(e) {
    if (!Number.isSafeInteger(e.tick) || e.tick < 0 || !Number.isFinite(e.elapsedSeconds) || e.elapsedSeconds < 0 || !Number.isFinite(e.scale) || e.scale < 0)
      throw new D({
        code: "GAMEPLAY_INVALID_SNAPSHOT",
        operation: "restore",
        message: "Snapshot clock state is invalid."
      });
    if (e.timers.length > this.maxTimers)
      throw new D({
        code: "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "restore",
        message: "Snapshot timer count exceeds the configured limit."
      });
    this.timers.clear(), this.tick = e.tick, this.elapsedSeconds = e.elapsedSeconds, this.scale = e.scale, this.paused = e.paused, this.deltaSeconds = 0;
    for (const t of e.timers) {
      const s = this.catalog.commands.get(t.commandId);
      if (!s || !Number.isSafeInteger(t.id) || t.id <= 0 || !Number.isSafeInteger(t.dueTick) || t.dueTick < 0)
        throw new D({
          code: "GAMEPLAY_INVALID_SNAPSHOT",
          operation: "restore",
          id: t.commandId,
          message: "Snapshot timer is invalid or references a missing command."
        });
      this.timers.set(t.id, { id: t.id, dueTick: t.dueTick, command: s, value: s.validateValue(t.value), cancelled: !1 });
    }
    this.nextTimerId = Math.max(1, ...e.timers.map((t) => t.id + 1));
  }
  clear() {
    this.timers.clear(), this.deltaSeconds = 0;
  }
}
function To(...i) {
  const e = /* @__PURE__ */ new Map();
  for (const t of i)
    for (const s of t)
      e.set(s.component.id, s);
  return Object.freeze([...e.values()]);
}
class Bb {
  constructor(e, t, s, n) {
    c(this, "catalog");
    c(this, "limits");
    c(this, "spawnSerial");
    c(this, "assertLocalIdAvailable");
    c(this, "nodes", []);
    c(this, "rootIndexes", []);
    c(this, "prefabIds", /* @__PURE__ */ new Set());
    c(this, "assetIds", /* @__PURE__ */ new Set());
    c(this, "capabilityIds", /* @__PURE__ */ new Set());
    this.catalog = e, this.limits = t, this.spawnSerial = s, this.assertLocalIdAvailable = n;
  }
  plan(e) {
    const t = /* @__PURE__ */ new Set();
    for (const [s, n] of e.entries()) {
      const r = n.prefab.kind === "prefab" && "components" in n.prefab ? n.prefab : void 0, o = this.resolveOwnedPrefab(n.prefab.id, r), a = n.overrides?.id ?? `spawn-${this.spawnSerial + s}`, d = n.overrides?.id ?? null;
      if (this.assertLocalIdAvailable(d), d && t.has(d))
        throw new D({
          code: "GAMEPLAY_DUPLICATE_DEFINITION",
          operation: "spawn",
          id: d,
          message: `Spawn batch contains duplicate local id "${d}".`
        });
      d && t.add(d), this.rootIndexes.push(this.nodes.length), this.flatten(this.resolveShape(o, []), a, null, d, n.overrides?.components ?? []);
    }
    return Object.freeze({
      nodes: Object.freeze(this.nodes),
      rootIndexes: Object.freeze(this.rootIndexes),
      prefabIds: Object.freeze([...this.prefabIds].sort()),
      assetIds: Object.freeze([...this.assetIds].sort()),
      capabilityIds: Object.freeze([...this.capabilityIds].sort())
    });
  }
  resolveOwnedPrefab(e, t) {
    const s = this.catalog.prefabs.get(e);
    if (!s)
      throw new D({
        code: "GAMEPLAY_STALE_PREFAB",
        operation: "spawn",
        id: e,
        message: `Prefab "${e}" is not available in the active scene.`
      });
    if (t && t !== s)
      throw new D({
        code: "GAMEPLAY_STALE_PREFAB",
        operation: "spawn",
        id: e,
        message: `Prefab "${e}" belongs to a different gameplay catalog generation.`
      });
    return s;
  }
  resolveShape(e, t) {
    if (t.includes(e.id) || t.length >= this.limits.maxPrefabDepth)
      throw new D({
        code: t.includes(e.id) ? "GAMEPLAY_DEPENDENCY_CYCLE" : "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "spawn",
        id: e.id,
        message: `Prefab expansion for "${e.id}" is cyclic or too deep.`
      });
    const s = e.variantOf ? this.resolveShape(this.catalog.requirePrefab(e.variantOf.id), [...t, e.id]) : null, n = /* @__PURE__ */ new Map();
    for (const r of s?.children ?? [])
      n.set(r.path, r);
    for (const r of e.children)
      n.set(r.path, {
        path: r.path,
        prefab: this.resolveOwnedPrefab(r.prefab.id, r.definition),
        components: r.components
      });
    return {
      prefabId: e.id,
      components: To(s?.components ?? [], e.components),
      children: Object.freeze([...n.values()].sort((r, o) => r.path.localeCompare(o.path))),
      assets: Object.freeze([.../* @__PURE__ */ new Set([...s?.assets ?? [], ...e.assets.map((r) => r.id)])].sort()),
      capabilities: Object.freeze([.../* @__PURE__ */ new Set([...s?.capabilities ?? [], ...e.capabilities])].sort())
    };
  }
  flatten(e, t, s, n, r) {
    const o = this.nodes.length;
    this.nodes.push({
      prefabId: e.prefabId,
      localId: n,
      path: t,
      parentIndex: s,
      components: To(e.components, r)
    }), this.prefabIds.add(e.prefabId);
    for (const a of e.assets)
      this.assetIds.add(a);
    for (const a of e.capabilities)
      this.capabilityIds.add(a);
    for (const a of e.children)
      this.flatten(this.resolveShape(a.prefab, []), `${t}/${a.path}`, o, null, a.components);
  }
}
function Ub(i, e, t, s, n) {
  return new Bb(i, e, t, n).plan(s);
}
function Vn(i) {
  if (i === null || typeof i != "object" || Object.isFrozen(i))
    return i;
  if (Array.isArray(i))
    for (const e of i)
      Vn(e);
  else
    for (const e of Object.values(i))
      Vn(e);
  return Object.freeze(i);
}
function Wb(i) {
  return Vn(JSON.parse(JSON.stringify(i)));
}
function Yb(i, e, t, s, n, r) {
  if (r.length > i.maxComponentsPerEntity)
    throw new D({
      code: "GAMEPLAY_LIMIT_EXCEEDED",
      operation: "component",
      path: s,
      message: "Entity component count exceeds maxComponentsPerEntity."
    });
  const o = i.allocate(), a = Object.freeze({ worldId: i.worldId, id: o, generation: i.generationFor(o) }), d = new fe();
  d.defer(() => i.release(o));
  const u = /* @__PURE__ */ new Map();
  try {
    for (const l of r) {
      if (u.has(l.component.id))
        throw new D({
          code: "GAMEPLAY_DUPLICATE_DEFINITION",
          operation: "component",
          id: l.component.id,
          message: `Entity contains duplicate component "${l.component.id}".`
        });
      if (i.catalog.components.get(l.component.id) !== l.component)
        throw new D({
          code: "GAMEPLAY_MISSING_REFERENCE",
          operation: "component",
          id: l.component.id,
          message: `Component "${l.component.id}" is not owned by the active scene catalog.`
        });
      u.set(l.component.id, {
        definition: l.component,
        value: l.component.validateValue(l.value),
        cleanup: null
      });
    }
  } catch (l) {
    throw d.dispose(), l;
  }
  return { handle: a, localId: e, prefabId: t, path: s, parentId: n, components: u, scope: d, externalRelease: null };
}
async function Gn(i) {
  const e = i.cleanup;
  e && (i.cleanup = null, await e());
}
function qb(i, e, t, s) {
  const n = i.components.get(e.id);
  if (n || s(), !n && e.initialize)
    throw new D({
      code: "GAMEPLAY_LIFECYCLE_INVALID",
      operation: "component",
      id: e.id,
      message: "Components with initialize hooks must be added through transactional prefab spawn."
    });
  i.components.set(e.id, n ? { ...n, value: e.validateValue(t) } : { definition: e, value: e.validateValue(t), cleanup: null });
}
async function Kb(i, e, t) {
  const s = i.components.get(e);
  return s ? (i.components.delete(e), await Gn(s), t(), !0) : !1;
}
function Hb(i, e) {
  const t = i.parentId === null ? null : e.get(i.parentId)?.handle ?? null;
  return Object.freeze({
    handle: i.handle,
    localId: i.localId,
    prefabId: i.prefabId,
    path: i.path,
    parent: t,
    components: Object.freeze(Object.fromEntries([...i.components.entries()].sort(([s], [n]) => s.localeCompare(n)).map(([s, n]) => [s, n.definition.validateValue(n.value)])))
  });
}
function Xb(i) {
  return Object.freeze([...i.values()].sort((e, t) => e.path.localeCompare(t.path)).map((e) => Object.freeze({
    localId: e.localId,
    prefabId: e.prefabId,
    path: e.path,
    parentPath: e.parentId === null ? null : i.get(e.parentId)?.path ?? null,
    components: Object.freeze([...e.components.values()].filter((t) => t.definition.serializable).sort((t, s) => t.definition.id.localeCompare(s.definition.id)).map((t) => {
      const s = t.definition.serialize ? t.definition.serialize(t.value) : t.definition.validateValue(t.value);
      return Object.freeze({
        id: t.definition.id,
        version: t.definition.version,
        value: Wb(s)
      });
    }))
  })));
}
function Jb(i, e) {
  const t = [];
  for (const s of i.components) {
    const n = e.requireComponent(s.id);
    let r = s.value;
    if (s.version > n.version)
      throw new D({
        code: "GAMEPLAY_UNSUPPORTED_COMPONENT_VERSION",
        operation: "restore",
        id: n.id,
        message: `Snapshot component "${n.id}" is newer than its runtime definition.`
      });
    for (let a = s.version; a < n.version; a += 1) {
      const d = n.migrations[a];
      if (!d)
        throw new D({
          code: "GAMEPLAY_MIGRATION_MISSING",
          operation: "restore",
          id: n.id,
          message: `Missing migration for component "${n.id}" from version ${a}.`
        });
      r = d(r);
    }
    const o = n.deserialize ? n.deserialize(r) : n.validateValue(r);
    t.push(n(o));
  }
  return Object.freeze(t);
}
function Qb(i, e) {
  const t = [], s = (n) => {
    t.push(n);
    const r = [...i.values()].filter((o) => o.parentId === n).sort((o, a) => o.path.localeCompare(a.path));
    for (const o of r)
      s(o.handle.id);
  };
  return s(e), t;
}
function Zb(i, e, t, s) {
  return i.worldId !== e ? !1 : (t.get(i.id) ?? s.get(i.id))?.handle.generation === i.generation;
}
function ew(i, e, t, s) {
  return i.worldId === e && !t.has(i.id) && s.get(i.id) === i.generation + 1;
}
function tw(i, e) {
  if (i && !/^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/.test(i))
    throw new D({
      code: "GAMEPLAY_INVALID_ID",
      operation: "spawn",
      id: i,
      path: "spawn.id",
      message: "Entity local id must be a normalized stable path."
    });
  if (i && e.has(i))
    throw new D({
      code: "GAMEPLAY_DUPLICATE_DEFINITION",
      operation: "spawn",
      id: i,
      message: `Entity local id "${i}" is already active.`
    });
}
function Wi(i, e) {
  const t = globalThis.AggregateError;
  if (t)
    return new t(i, e);
  const s = new Error(e);
  return s.name = "AggregateError", s.errors = i, s;
}
class iw {
  constructor(e) {
    c(this, "options");
    c(this, "worldId");
    c(this, "records", /* @__PURE__ */ new Map());
    c(this, "generations", /* @__PURE__ */ new Map());
    c(this, "localIds", /* @__PURE__ */ new Map());
    c(this, "limits");
    c(this, "revision", 0);
    c(this, "liveQueries", 0);
    c(this, "spawnSerial", 0);
    c(this, "disposed", !1);
    c(this, "transactionTail", Promise.resolve());
    c(this, "stagedRecords", /* @__PURE__ */ new Map());
    this.options = e, this.worldId = e.worldId, this.limits = e.limits ?? Na;
  }
  create(e = [], t = {}) {
    if (this.assertStructural("world"), e.some((r) => r.component.initialize))
      throw new D({
        code: "GAMEPLAY_LIFECYCLE_INVALID",
        operation: "component",
        message: "Components with initialize hooks must be created through transactional prefab spawn."
      });
    const s = t.id ?? null;
    this.assertLocalIdAvailable(s);
    const n = this.stageRecord(s, null, s ?? `entity/${this.spawnSerial++}`, null, e);
    return this.records.set(n.handle.id, n), s && this.localIds.set(s, n.handle.id), this.bump(), n.handle;
  }
  spawn(e, t) {
    return this.spawnBatch([{ prefab: e, ...t ? { overrides: t } : {} }]).then((s) => s[0]);
  }
  async spawnBatch(e) {
    const t = this.transactionTail.then(() => this.spawnBatchTransaction(e));
    return this.transactionTail = t.then(() => {
    }, () => {
    }), t;
  }
  async spawnBatchTransaction(e) {
    if (this.assertStructural("spawn"), e.length === 0)
      return Object.freeze([]);
    const t = Ub(this.options.catalog, this.limits, this.spawnSerial, e, (r) => this.assertLocalIdAvailable(r));
    if (this.records.size + t.nodes.length > this.limits.maxEntities)
      throw new D({
        code: "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "spawn",
        message: "Spawn would exceed maxEntities."
      });
    for (const r of t.capabilityIds)
      this.options.capabilities.require(r);
    if (this.options.signal.aborted)
      throw this.options.metrics.failure("GAMEPLAY_SPAWN_CANCELLED"), new D({
        code: "GAMEPLAY_SPAWN_CANCELLED",
        operation: "spawn",
        lifecyclePhase: "cancelling",
        message: "Prefab spawn was cancelled before preparation.",
        cause: this.options.signal.reason
      });
    let s = null;
    const n = [];
    try {
      s = await this.options.spawnAdapter?.prepare({
        prefabIds: t.prefabIds,
        assetIds: t.assetIds,
        capabilityIds: t.capabilityIds,
        signal: this.options.signal
      }) ?? null, this.options.signal.throwIfAborted();
      for (const [r, o] of t.nodes.entries()) {
        const a = o.parentIndex === null ? null : n[o.parentIndex].handle.id, d = this.stageRecord(o.localId, o.prefabId, o.path, a, o.components);
        n.push(d), this.stagedRecords.set(d.handle.id, d);
        for (const u of d.components.values()) {
          const l = u.definition.initialize?.({
            entity: d.handle,
            world: this,
            value: u.value,
            capabilities: this.options.capabilities,
            signal: this.options.signal
          });
          if (l && typeof l.then == "function")
            throw new D({
              code: "GAMEPLAY_LIFECYCLE_INVALID",
              operation: "component",
              id: u.definition.id,
              message: `Component initializer "${u.definition.id}" must be synchronous.`
            });
          typeof l == "function" && (u.cleanup = l, d.scope.defer(() => Gn(u)));
        }
        r % 32 === 0 && this.options.signal.throwIfAborted();
      }
      this.options.signal.throwIfAborted(), await s?.commit?.(), this.options.signal.throwIfAborted();
      for (const r of n)
        this.stagedRecords.delete(r.handle.id), this.records.set(r.handle.id, r), r.localId && this.localIds.set(r.localId, r.handle.id);
      if (s) {
        let r = t.rootIndexes.length, o = !1;
        for (const a of t.rootIndexes)
          n[a].externalRelease = async () => {
            r -= 1, !(r > 0 || o) && (o = !0, await s.release());
          };
      }
      return this.spawnSerial += e.length, this.options.metrics.spawnCount += e.length, this.bump(), Object.freeze(t.rootIndexes.map((r) => n[r].handle));
    } catch (r) {
      const o = [];
      for (let u = n.length - 1; u >= 0; u -= 1) {
        this.stagedRecords.delete(n[u].handle.id);
        try {
          await n[u].scope.dispose();
        } catch (l) {
          o.push(l);
        }
      }
      if (s)
        try {
          await s.release();
        } catch (u) {
          o.push(u);
        }
      const a = this.options.signal.aborted, d = r instanceof D ? r : new D({
        code: a ? "GAMEPLAY_SPAWN_CANCELLED" : "GAMEPLAY_SPAWN_FAILED",
        operation: "spawn",
        lifecyclePhase: a ? "cancelling" : void 0,
        message: a ? "Prefab spawn was cancelled." : "Transactional prefab spawn failed.",
        cause: r
      });
      throw this.options.metrics.failure(d.code), o.length > 0 ? Wi([d, ...o], "Prefab spawn failed and rollback reported errors.") : d;
    }
  }
  async despawn(e) {
    if (this.assertStructural("world"), ew(e, this.worldId, this.records, this.generations))
      return !1;
    const t = this.requireRecord(e), s = Qb(this.records, t.handle.id), n = [];
    for (const r of s.reverse()) {
      const o = this.records.get(r);
      if (o) {
        this.records.delete(r), o.localId && this.localIds.delete(o.localId), this.generations.set(r, o.handle.generation + 1);
        try {
          await o.scope.dispose();
        } catch (a) {
          n.push(a);
        }
        if (o.externalRelease)
          try {
            await o.externalRelease();
          } catch (a) {
            n.push(a);
          }
      }
    }
    if (this.options.metrics.despawnCount += 1, this.bump(), n.length > 0)
      throw Wi(n, "Entity despawn cleanup failed.");
    return !0;
  }
  has(e) {
    return Zb(e, this.worldId, this.records, this.stagedRecords);
  }
  hasComponent(e, t) {
    return this.requireRecord(e).components.has(t.id);
  }
  get(e, t) {
    const s = this.requireRecord(e).components.get(t.id);
    if (!s)
      throw new D({
        code: "GAMEPLAY_MISSING_REFERENCE",
        operation: "component",
        id: t.id,
        message: `Entity does not contain component "${t.id}".`
      });
    return t.validateValue(s.value);
  }
  set(e, t, s) {
    this.assertOpen("component");
    const n = this.requireRecord(e);
    qb(n, t, s, () => this.assertStructural("component")), this.bump();
  }
  patch(e, t, s) {
    if (typeof s != "function")
      throw new D({
        code: "GAMEPLAY_INVALID_DEFINITION",
        operation: "component",
        message: "Component patch must be a function."
      });
    this.set(e, t, s(this.get(e, t)));
  }
  async remove(e, t) {
    this.assertStructural("component");
    const s = this.requireRecord(e);
    return Kb(s, t.id, () => this.bump());
  }
  query(...e) {
    this.assertOpen("query");
    const t = [...this.records.values()].filter((n) => e.every((r) => n.components.has(r.id))).map((n) => n.handle).sort((n, r) => n.id - r.id), s = this;
    return Object.freeze({
      size: t.length,
      toArray: () => Object.freeze([...t]),
      *[Symbol.iterator]() {
        s.liveQueries += 1;
        try {
          yield* t;
        } finally {
          s.liveQueries -= 1;
        }
      }
    });
  }
  async clear() {
    this.assertStructural("world");
    const e = [...this.records.values()].filter((s) => s.parentId === null).map((s) => s.handle).sort((s, n) => n.id - s.id), t = [];
    for (const s of e)
      try {
        await this.despawn(s);
      } catch (n) {
        t.push(n);
      }
    if (t.length > 0)
      throw Wi(t, "Gameplay world clear failed.");
  }
  inspect(e = 256) {
    (!Number.isSafeInteger(e) || e < 0) && (e = 256);
    const t = [...this.records.values()].sort((s, n) => s.path.localeCompare(n.path));
    return Object.freeze({
      worldId: this.worldId,
      sceneId: this.options.catalog.scene.id,
      lifecycleGeneration: this.options.lifecycleGeneration,
      revision: this.revision,
      disposed: this.disposed,
      entityCount: this.records.size,
      componentCount: t.reduce((s, n) => s + n.components.size, 0),
      entities: Object.freeze(t.slice(0, e).map((s) => Hb(s, this.records))),
      truncated: t.length > e
    });
  }
  serializeEntities() {
    return Xb(this.records);
  }
  async restoreEntities(e) {
    if (await this.clear(), e.length > this.limits.maxEntities)
      throw new D({
        code: "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "restore",
        message: "Snapshot entity count exceeds maxEntities."
      });
    const t = /* @__PURE__ */ new Map();
    try {
      for (const s of e) {
        if (t.has(s.path) || s.localId && this.localIds.has(s.localId))
          throw new D({
            code: "GAMEPLAY_INVALID_SNAPSHOT",
            operation: "restore",
            path: s.path,
            message: "Snapshot entity paths and local ids must be unique."
          });
        const n = Jb(s, this.options.catalog), r = s.parentPath === null ? null : t.get(s.parentPath)?.handle.id;
        if (s.parentPath !== null && r === void 0)
          throw new D({
            code: "GAMEPLAY_INVALID_SNAPSHOT",
            operation: "restore",
            path: s.path,
            message: `Parent path "${s.parentPath}" must precede its child.`
          });
        const o = this.stageRecord(s.localId, s.prefabId, s.path, r ?? null, n);
        for (const a of o.components.values()) {
          const d = a.definition.initialize?.({
            entity: o.handle,
            world: this,
            value: a.value,
            capabilities: this.options.capabilities,
            signal: this.options.signal
          });
          if (d && typeof d.then == "function")
            throw new D({
              code: "GAMEPLAY_LIFECYCLE_INVALID",
              operation: "restore",
              id: a.definition.id,
              message: "Component initialize hooks must be synchronous during restore."
            });
          typeof d == "function" && (a.cleanup = d, o.scope.defer(() => Gn(a)));
        }
        this.records.set(o.handle.id, o), o.localId && this.localIds.set(o.localId, o.handle.id), t.set(s.path, o);
      }
      this.bump();
    } catch (s) {
      try {
        await this.clear();
      } catch (n) {
        throw Wi([s, n], "Snapshot restore failed and cleanup reported errors.");
      }
      throw s;
    }
  }
  async destroy() {
    if (this.disposed)
      return;
    await this.transactionTail;
    let e;
    try {
      await this.clear();
    } catch (t) {
      e = t;
    }
    if (this.disposed = !0, this.options.store.destroy(), this.bump(), e)
      throw e;
  }
  stageRecord(e, t, s, n, r) {
    return Yb({
      worldId: this.worldId,
      maxComponentsPerEntity: this.limits.maxComponentsPerEntity,
      allocate: () => this.options.store.allocate(),
      release: (o) => this.options.store.release(o),
      generationFor: (o) => this.generations.get(o) ?? 0,
      catalog: this.options.catalog
    }, e, t, s, n, r);
  }
  requireRecord(e) {
    if (this.assertOpen("world"), e.worldId !== this.worldId)
      throw this.options.metrics.failure("GAMEPLAY_STALE_WORLD"), new D({ code: "GAMEPLAY_STALE_WORLD", operation: "world", message: "Entity handle belongs to a different world generation." });
    const t = this.records.get(e.id) ?? this.stagedRecords.get(e.id);
    if (!t || t.handle.generation !== e.generation)
      throw this.options.metrics.failure("GAMEPLAY_STALE_ENTITY"), new D({
        code: "GAMEPLAY_STALE_ENTITY",
        operation: "world",
        id: String(e.id),
        message: "Entity handle is stale or has been despawned."
      });
    return t;
  }
  assertLocalIdAvailable(e) {
    tw(e, this.localIds);
  }
  assertStructural(e) {
    if (this.assertOpen(e), this.liveQueries > 0)
      throw new D({
        code: "GAMEPLAY_ILLEGAL_STRUCTURAL_MUTATION",
        operation: e,
        message: "Structural world mutation is forbidden while a query iterator is active."
      });
  }
  assertOpen(e) {
    if (this.disposed)
      throw new D({ code: "GAMEPLAY_WORLD_DISPOSED", operation: e, message: "Gameplay world is disposed." });
  }
  bump() {
    this.revision += 1, this.options.metrics.entityCount = this.records.size, this.options.metrics.componentCount = [...this.records.values()].reduce((e, t) => e + t.components.size, 0), this.options.metrics.trackedEstimateBytes = this.options.metrics.entityCount * 96 + this.options.metrics.componentCount * 64;
  }
}
function Yi(i, e) {
  const t = globalThis.AggregateError;
  return t ? new t(i, e) : Object.assign(new Error(e), { name: "AggregateError", errors: i });
}
function Re() {
  return globalThis.performance?.now() ?? 0;
}
class sw {
  constructor(e) {
    c(this, "options");
    c(this, "catalog");
    c(this, "world");
    c(this, "queues");
    c(this, "clock");
    c(this, "random");
    c(this, "scheduler");
    c(this, "lifecycle", "registered");
    c(this, "limits");
    c(this, "checkpoints", []);
    c(this, "stepIndex", 0);
    c(this, "destroyPromise", null);
    this.options = e, this.limits = e.limits ?? Na, this.catalog = new Lc(e.game, e.scene), this.queues = new Tb(this.catalog, e.metrics, this.limits.maxEventQueue, this.limits.maxCommandQueue), this.clock = new Fb(e.fixedDeltaSeconds ?? 1 / 60, this.limits.maxTimers, this.queues, this.catalog), this.random = new Gb(e.game.randomSeed + e.lifecycleGeneration >>> 0), this.world = new iw({
      worldId: `${e.game.id}/${e.scene.id}#${e.lifecycleGeneration}`,
      lifecycleGeneration: e.lifecycleGeneration,
      catalog: this.catalog,
      store: e.entityStore,
      capabilities: e.capabilities,
      metrics: e.metrics,
      signal: e.signal,
      spawnAdapter: e.spawnAdapter,
      limits: this.limits
    }), this.scheduler = new Mb([...e.game.systems, ...e.scene.systems], e.metrics), e.metrics.prefabCount = this.catalog.prefabs.size;
  }
  getLifecycleState() {
    return this.lifecycle;
  }
  getMetricsSnapshot() {
    return this.options.metrics.snapshot();
  }
  async initialize() {
    const e = Re();
    this.requireLifecycle("registered"), this.lifecycle = "preparing";
    const t = this.context("fixed-simulation", 0, 1);
    try {
      for (const s of this.options.scene.capabilities.required)
        this.options.capabilities.require(s);
      await this.scheduler.initialize(t), this.options.scene.entities.length > 0 && await this.world.spawnBatch(this.options.scene.entities.map((s) => ({
        prefab: s.definition ?? this.catalog.requirePrefab(s.prefab.id),
        overrides: { ...s.id ? { id: s.id } : {}, components: s.components }
      }))), await this.options.scene.setup?.(t), await this.scheduler.start(t), this.lifecycle = "prepared";
    } catch (s) {
      this.lifecycle = "failed";
      const n = [s];
      try {
        await this.scheduler.stop(t);
      } catch (r) {
        n.push(r);
      }
      try {
        await this.world.clear();
      } catch (r) {
        n.push(r);
      }
      try {
        await this.scheduler.destroy(t);
      } catch (r) {
        n.push(r);
      }
      throw n.length === 1 ? s : Yi(n, "Gameplay scene initialization failed and rollback reported errors.");
    } finally {
      this.options.metrics.recordOperation("scene-preparation", Re() - e);
    }
  }
  activate() {
    if (this.lifecycle !== "prepared" && this.lifecycle !== "activating")
      throw new D({
        code: "GAMEPLAY_LIFECYCLE_INVALID",
        operation: "scene-lifecycle",
        lifecyclePhase: this.lifecycle,
        message: `Gameplay scene cannot activate from lifecycle "${this.lifecycle}".`
      });
    this.lifecycle = "activating", this.lifecycle = "active", this.options.metrics.activeSceneId = this.options.scene.id, this.options.metrics.lifecycleGeneration = this.options.lifecycleGeneration;
  }
  async activateDeferred() {
    this.lifecycle === "active" && await this.options.scene.deferred?.(this.context("frame", 0, 1));
  }
  async runPhase(e, t, s = 0, n = 1, r = "live") {
    if (this.lifecycle !== "active")
      return;
    this.options.signal.throwIfAborted(), e === "fixed-simulation" && (this.clock.advance(t), this.stepIndex += 1);
    const o = this.context(e, s, n, r);
    try {
      await this.scheduler.run(e, o), this.queues.flushCommands(o), this.queues.flushEvents(o), e === "render-sync" && await this.options.presentation.flush(this.options.signal);
    } catch (a) {
      throw r === "live" && a instanceof D && a.code === "GAMEPLAY_SYSTEM_FAILED" && (this.lifecycle = "failed"), a;
    }
  }
  runFixedPhase(e, t = 0, s = 1) {
    if (this.lifecycle !== "active")
      return;
    this.options.signal.throwIfAborted(), this.clock.advance(e), this.stepIndex += 1;
    const n = this.context("fixed-simulation", t, s);
    try {
      this.scheduler.runFixed(n), this.queues.flushCommands(n), this.queues.flushEvents(n);
    } catch (r) {
      throw r instanceof D && r.code === "GAMEPLAY_SYSTEM_FAILED" && (this.lifecycle = "failed"), r;
    }
  }
  createSnapshot() {
    const e = {
      version: Or,
      gameId: this.options.game.id,
      sceneId: this.options.scene.id,
      lifecycleGeneration: this.options.lifecycleGeneration,
      tick: this.clock.tick,
      elapsedSeconds: this.clock.elapsedSeconds,
      timeScale: this.clock.scale,
      paused: this.clock.paused,
      randomState: this.random.state(),
      input: this.options.input.snapshot(),
      entities: this.world.serializeEntities(),
      timers: this.clock.snapshotTimers(),
      commands: this.queues.snapshotCommands(),
      events: this.queues.snapshotEvents()
    };
    if (Vb(e) > this.limits.maxSnapshotBytes)
      throw new D({
        code: "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "checkpoint",
        message: "Snapshot exceeds maxSnapshotBytes."
      });
    return Object.freeze({ ...e, hash: jo(e) });
  }
  checkpoint(e = `checkpoint-${this.clock.tick}-${this.checkpoints.length + 1}`) {
    const t = Re();
    try {
      if (!/^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/.test(e))
        throw new D({
          code: "GAMEPLAY_INVALID_ID",
          operation: "checkpoint",
          id: e,
          message: "Checkpoint id must be a normalized local id."
        });
      const s = Object.freeze({ id: e, createdAtTick: this.clock.tick, state: this.createSnapshot() });
      return this.checkpoints.push(s), this.checkpoints.length > this.limits.maxSnapshotHistory && this.checkpoints.shift(), this.options.metrics.checkpointCount += 1, s;
    } finally {
      this.options.metrics.recordOperation("checkpoint-create", Re() - t);
    }
  }
  listCheckpoints() {
    return Object.freeze([...this.checkpoints]);
  }
  async restore(e) {
    const t = Re(), s = "state" in e ? e.state : e, n = this.createSnapshot();
    try {
      await this.applySnapshot(s), this.options.metrics.restoreCount += 1;
    } catch (r) {
      try {
        await this.applySnapshot(n, !1);
      } catch (o) {
        throw Yi([r, o], "Gameplay restore failed and rollback could not restore the previous state.");
      }
      throw r;
    } finally {
      this.options.metrics.recordOperation("checkpoint-restore", Re() - t);
    }
  }
  async replay(e, t, s = 1 / 60) {
    const n = Re();
    if (t.length > this.limits.maxReplayCommands)
      throw new D({
        code: "GAMEPLAY_LIMIT_EXCEEDED",
        operation: "replay",
        message: "Replay command range exceeds maxReplayCommands."
      });
    if (!Number.isFinite(s) || s <= 0)
      throw new D({
        code: "GAMEPLAY_INVALID_DEFINITION",
        operation: "replay",
        message: "Replay deltaSeconds must be positive and finite."
      });
    for (const [o, a] of t.entries()) {
      const d = e.tick + o + 1;
      if (a.tick !== d)
        throw new D({
          code: "GAMEPLAY_INVALID_SNAPSHOT",
          operation: "replay",
          path: `commands[${o}].tick`,
          message: `Replay command tick must be ${d}.`
        });
    }
    const r = this.createSnapshot();
    try {
      await this.applySnapshot(e);
      for (const [o, a] of t.entries())
        this.options.input.set(a.values), await this.runPhase("fixed-simulation", s, o, t.length, "replay"), await this.runPhase("post-simulation-sync", s, o, t.length, "replay");
      return this.options.metrics.replayCount += 1, this.createSnapshot();
    } catch (o) {
      try {
        await this.applySnapshot(r, !1);
      } catch (a) {
        throw Yi([o, a], "Gameplay replay failed and rollback could not restore the previous state.");
      }
      throw o;
    } finally {
      this.options.metrics.recordOperation("replay", Re() - n);
    }
  }
  inspect() {
    return Object.freeze({
      id: this.options.scene.id,
      lifecycle: this.lifecycle,
      generation: this.options.lifecycleGeneration,
      world: this.lifecycle === "destroyed" ? null : this.world.inspect()
    });
  }
  retire(e = new Error("Gameplay scene retired.")) {
    this.lifecycle === "destroyed" || this.lifecycle === "retiring" || (this.lifecycle = "retiring", this.options.signal.aborted);
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyInternal()), this.destroyPromise;
  }
  async destroyInternal() {
    if (this.lifecycle === "destroyed")
      return;
    const e = Re();
    this.lifecycle = "retiring";
    const t = this.context("fixed-simulation", 0, 1), s = [];
    try {
      await this.scheduler.stop(t);
    } catch (n) {
      s.push(n);
    }
    try {
      await this.world.destroy();
    } catch (n) {
      s.push(n);
    }
    try {
      await this.scheduler.destroy(t);
    } catch (n) {
      s.push(n);
    }
    try {
      await this.options.presentation.flush(this.options.signal);
    } catch (n) {
      this.options.signal.aborted || s.push(n);
    }
    this.queues.destroy(), this.clock.clear();
    try {
      await this.options.presentation.destroy();
    } catch (n) {
      s.push(n);
    }
    if (this.lifecycle = "destroyed", this.options.metrics.activeSceneId = null, this.options.metrics.recordOperation("scene-retirement", Re() - e), s.length > 0)
      throw Yi(s, "Gameplay scene destruction reported errors.");
  }
  context(e, t, s, n = "live") {
    const r = this.clock, o = Object.freeze({
      get tick() {
        return r.tick;
      },
      get deltaSeconds() {
        return r.deltaSeconds;
      },
      get elapsedSeconds() {
        return r.elapsedSeconds;
      },
      get scale() {
        return r.scale;
      },
      get paused() {
        return r.paused;
      },
      phase: e,
      stepIndex: t,
      stepCount: s,
      mode: n,
      schedule: r.schedule.bind(r)
    });
    return Object.freeze({
      world: this.world,
      input: this.options.input,
      events: this.queues,
      commands: this.queues,
      time: o,
      random: this.random,
      capabilities: this.options.capabilities,
      presentation: this.options.presentation
    });
  }
  async applySnapshot(e, t = !0) {
    if (e.version !== Or || e.gameId !== this.options.game.id || e.sceneId !== this.options.scene.id)
      throw new D({
        code: "GAMEPLAY_INVALID_SNAPSHOT",
        operation: "restore",
        message: "Snapshot version, game id, or scene id does not match the active runtime."
      });
    const { hash: s, ...n } = e;
    if (t && s !== jo(n))
      throw new D({
        code: "GAMEPLAY_INVALID_SNAPSHOT",
        operation: "restore",
        message: "Snapshot integrity hash does not match its contents."
      });
    await this.world.restoreEntities(e.entities), this.clock.restore({
      tick: e.tick,
      elapsedSeconds: e.elapsedSeconds,
      scale: e.timeScale,
      paused: e.paused,
      timers: e.timers
    }), this.random.restore(e.randomState), this.options.input.set(e.input), this.queues.restore(e.events, e.commands);
  }
  requireLifecycle(e) {
    if (this.lifecycle !== e)
      throw new D({
        code: "GAMEPLAY_LIFECYCLE_INVALID",
        operation: "scene-lifecycle",
        lifecyclePhase: this.lifecycle,
        message: `Expected lifecycle "${e}", received "${this.lifecycle}".`
      });
  }
}
function nw(i, e) {
  let t = null;
  const s = Object.freeze([.../* @__PURE__ */ new Set([
    ...i.capabilities.map((r) => r.id),
    ...e.flatMap((r) => r.provider?.capabilities.map((o) => o.id) ?? [])
  ])].sort()), n = Object.freeze({
    apiVersion: 1,
    hasCapability: (r) => s.includes(r),
    snapshot: () => {
      const r = t?.();
      return Object.freeze({ snapshotVersion: 1, requestedDomainIds: Object.freeze(r?.requestedDomainIds ?? e.map((o) => o.id)), activeDomainIds: Object.freeze(r?.activeDomainIds ?? []), backendGeneration: r?.backend.generation ?? 0, capabilities: s });
    }
  });
  return Object.freeze({
    services: Object.freeze({ [wm]: n }),
    bind: (r) => {
      t = r;
    }
  });
}
class rw {
  constructor(e, t, s, n = Object.freeze({ audio: !1, storage: !1, ui: !1 })) {
    c(this, "definition");
    c(this, "actions");
    c(this, "assets");
    c(this, "optionalCapabilities");
    c(this, "api");
    c(this, "catalog");
    c(this, "metrics");
    c(this, "currentRuntime", null);
    c(this, "activateScene", null);
    this.definition = e, this.actions = t, this.assets = s, this.optionalCapabilities = n, this.catalog = new kb(e), this.metrics = new jb(e.id);
    const r = () => this.currentRuntime, o = (a) => {
      const d = r();
      if (!d) throw new Error(`Cannot ${a} without an active gameplay scene.`);
      return d;
    };
    this.api = Object.freeze({
      scenes: Object.freeze({
        activate: async (a) => {
          if (!this.activateScene) throw new Error("Gameplay composition is not bound to a game.");
          await this.activateScene(typeof a == "string" ? a : a.id);
        },
        current: () => r()?.inspect() ?? null,
        list: () => Object.freeze(e.scenes.map((a) => a.id))
      }),
      world: Object.freeze({ inspect: (a) => r()?.world.inspect(a) ?? null }),
      checkpoints: Object.freeze({
        create: (a) => o("create a checkpoint").checkpoint(a),
        restore: (a) => o("restore a checkpoint").restore(a),
        list: () => o("list checkpoints").listCheckpoints(),
        replay: (a, d, u) => o("replay input").replay("state" in a ? a.state : a, d, u)
      }),
      inspect: () => Object.freeze({
        catalog: this.catalog.inspect(),
        scene: r()?.inspect() ?? null,
        metrics: r()?.getMetricsSnapshot() ?? this.metrics.snapshot()
      })
    });
  }
  bind(e) {
    if (this.activateScene) throw new Error("Gameplay composition is already bound.");
    this.activateScene = e;
  }
  async prepare(e, t, s, n) {
    const r = this.definition.scenes.find((g) => g.id === e);
    if (!r) return null;
    const o = new Rb(), a = s.subscribe((g) => o.abort(g));
    s.aborted && o.abort(s.reason);
    const d = new Db(), u = new Ob([
      Object.freeze({ id: "forgeng.runtime:assets", version: "1.0.0", available: this.assets !== null }),
      Object.freeze({ id: "forgeng.runtime:input", version: "1.0.0", available: !0 }),
      Object.freeze({ id: "forgeng.runtime:render-2d", version: "1.0.0", available: !0 }),
      Object.freeze({ id: "forgeng.runtime:presentation", version: "1.0.0", available: !0 }),
      Object.freeze({ id: "forgeng.runtime:audio", version: "1.0.0", available: this.optionalCapabilities.audio }),
      Object.freeze({ id: "forgeng.runtime:storage", version: "1.0.0", available: this.optionalCapabilities.storage }),
      Object.freeze({ id: "forgeng.runtime:ui", version: "1.0.0", available: this.optionalCapabilities.ui })
    ]), l = this.assets ? Nb((g, w) => this.assets.acquire(g, { signal: ow(w) })) : null, f = new sw({
      game: this.definition,
      scene: r,
      lifecycleGeneration: t,
      entityStore: new Pb(),
      capabilities: u,
      input: d,
      presentation: new Cb(n),
      metrics: this.metrics,
      signal: o.signal,
      spawnAdapter: l
    }), h = r.input.maps.map((g) => this.actions.enableMap(g.id));
    try {
      await f.initialize();
    } catch (g) {
      throw h.reverse().forEach((w) => w.dispose()), a(), o.abort(g), await f.destroy().catch(() => {
      }), g;
    }
    let p = Promise.resolve(), m = !1;
    const y = () => {
      const g = {};
      for (const w of f.catalog.actionMaps.values())
        for (const z of Object.values(w.actions)) g[z.id] = this.actions.value(z);
      d.set(g);
    }, b = (g, w) => {
      p = p.then(() => f.runPhase(g, w));
    };
    return Object.freeze({
      activate: () => {
        f.activate(), this.currentRuntime = f;
      },
      fixedUpdate: (g) => {
        y();
        for (let w = 0; w < g.steps; w += 1)
          f.runFixedPhase(g.dt, w, g.steps);
        b("post-simulation-sync", g.dt);
      },
      frameUpdate: (g) => {
        y(), b("frame", g.dt);
      },
      presentationSync: (g) => b("render-sync", g.dt),
      destroy: async () => {
        if (m) return;
        m = !0, this.currentRuntime === f && (this.currentRuntime = null), o.abort(new Error(`Gameplay scene "${e}" retired.`)), a();
        const g = [];
        try {
          await p;
        } catch (w) {
          g.push(w);
        }
        try {
          await f.destroy();
        } catch (w) {
          g.push(w);
        }
        for (const w of h.reverse()) try {
          w.dispose();
        } catch (z) {
          g.push(z);
        }
        if (g.length > 0) throw Object.assign(new Error("2D gameplay scene cleanup failed."), { errors: Object.freeze(g) });
      }
    });
  }
}
function ow(i) {
  const e = /* @__PURE__ */ new Map();
  return Object.freeze({
    get aborted() {
      return i.aborted;
    },
    get reason() {
      return i.reason;
    },
    addEventListener: (t, s, n) => {
      if (e.has(s)) return;
      const r = i.subscribe(() => {
        s({ type: "abort" }), n?.once && (r.dispose(), e.delete(s));
      });
      e.set(s, r);
    },
    removeEventListener: (t, s) => {
      e.get(s)?.dispose(), e.delete(s);
    }
  });
}
const qi = 256;
function aw(i, e) {
  return Object.freeze({
    inspect: () => {
      const t = i(), s = e(), n = t?.inspectDevtools() ?? null, r = t?.inspectRuntime() ?? null, o = s.domain, a = n?.animations ?? [], d = n?.colliders ?? [], u = Object.freeze((o?.failures ?? []).filter((f) => f.code.toLowerCase().includes("stale"))), l = s.resourceOwners;
      return Object.freeze({
        snapshotVersion: 1,
        activeScene: n === null ? null : Object.freeze({
          id: n.sceneId,
          sceneGeneration: n.sceneGeneration,
          domainGeneration: n.domainGeneration
        }),
        render: Object.freeze({
          frame: s.composition.frame,
          visibleItems: o?.workload.items.visible ?? r?.visibleItems ?? 0,
          culledItems: o?.workload.items.culled ?? r?.culledItems ?? 0,
          draws: o?.batches.drawCalls ?? 0,
          batches: o?.batches.logicalBatches ?? 0,
          pipelineChanges: o?.batches.pipelineChanges ?? 0,
          bindGroupChanges: o?.batches.bindGroupChanges ?? 0
        }),
        resources: Object.freeze({
          trackedCpuBytes: l.reduce((f, h) => f + h.cpuBytes, 0),
          trackedGpuBytes: l.reduce((f, h) => f + h.gpuBufferBytes + h.gpuTextureBytes, 0),
          retainedBuffers: r?.retainedBuffers ?? 0,
          leasedBuffers: r?.leasedBuffers ?? 0,
          handles: l.reduce((f, h) => f + h.handles, 0),
          pendingRetirements: l.reduce((f, h) => f + h.pendingRetirements, 0)
        }),
        animations: Object.freeze(a.slice(0, qi).map((f) => cw(f, t.definition, t))),
        colliders: Object.freeze(d.slice(0, qi).map(lw)),
        staleWork: Object.freeze({
          rejections: u.reduce((f, h) => f + h.count, 0),
          failures: u
        }),
        totals: Object.freeze({ animations: a.length, colliders: d.length }),
        truncated: Object.freeze({
          animations: a.length > qi,
          colliders: d.length > qi
        }),
        destroyed: s.destroyed
      });
    }
  });
}
function cw(i, e, t) {
  const s = t.getAnimationIdentity(i.animationId), n = i.transition === null ? void 0 : t.getAnimationIdentity(i.transition.toAnimationId);
  return Object.freeze({
    snapshotVersion: 1,
    id: s?.sourceAnimationId ?? i.animationId,
    runtimeId: i.animationId,
    spriteId: s?.spriteId ?? dw(e, i.animationId),
    revision: i.revision,
    status: i.status,
    active: i.active,
    time: i.time,
    speed: i.speed,
    direction: i.direction,
    iteration: i.iteration,
    frame: i.frame,
    transition: i.transition === null ? null : Object.freeze({
      toId: n?.sourceAnimationId ?? i.transition.toAnimationId,
      toRuntimeId: i.transition.toAnimationId,
      startedTick: i.transition.startedTick,
      durationTicks: i.transition.durationTicks,
      progress: i.transition.progress
    })
  });
}
function dw(i, e) {
  const t = i.animations.find((r) => r.id === e);
  if (!t) return null;
  const s = /* @__PURE__ */ new Set([...t.target === void 0 ? [] : [t.target], ...t.tracks.map((r) => r.target)]), n = i.sprites.filter((r) => s.has(r.id) || s.has(r.entity));
  return n.length === 1 ? n[0].id : null;
}
function lw(i) {
  return Object.freeze({
    snapshotVersion: 1,
    id: i.handle.colliderId,
    entityId: i.handle.entity.entityId,
    generation: i.handle.colliderGeneration,
    shape: i.shape,
    sensor: i.sensor,
    filter: i.filter,
    bounds: i.bounds
  });
}
function uw(i, e) {
  const t = () => {
    const n = i.getCameraState(e), r = n.following;
    return Object.freeze({
      snapshotVersion: 1,
      id: e,
      position: n.camera.position,
      effectivePosition: n.camera.effectivePosition,
      scale: n.camera.scale,
      logicalViewport: n.camera.logicalViewport,
      pixelSnap: n.camera.pixelSnap,
      followingEntityId: r?.entity.entityId ?? null,
      followOffset: r?.offset ?? Object.freeze([0, 0]),
      bounds: r?.bounds ?? null
    });
  }, s = () => i.getCameraState(e).camera;
  return Object.freeze({
    id: e,
    state: t,
    setPosition: (n) => (i.setCameraPosition(e, n), t()),
    setPixelSnap: (n) => (i.setCameraPixelSnap(e, n), t()),
    follow: (n, r) => (i.followCamera(e, i.getEntityHandle(n), r), t()),
    unfollow: () => (i.unfollowCamera(e), t()),
    worldToLogical: (n) => ya(s(), n),
    logicalToWorld: (n) => ba(s(), n)
  });
}
function Fn(i) {
  return Object.freeze({
    snapshotVersion: 1,
    id: i.handle.colliderId,
    entityId: i.handle.entity.entityId,
    generation: i.handle.colliderGeneration,
    shape: i.shape,
    sensor: i.sensor,
    filter: i.filter,
    bounds: i.bounds
  });
}
function Lo(i, e) {
  const t = () => {
    const s = i.getCollider(e.colliderId);
    if (!s || s.handle.colliderGeneration !== e.colliderGeneration) throw Ae("SDK_2D_COLLIDER_STALE", "$.collider", `collider "${e.colliderId}" is stale or destroyed.`);
    return Fn(s);
  };
  return Object.freeze({
    id: e.colliderId,
    entityId: e.entity.entityId,
    state: t,
    overlaps: (s = !0) => (t(), Object.freeze(i.overlapCollider(e, s).map(Fn))),
    destroy: () => {
      t(), i.destroyCollider(e);
    }
  });
}
function Mo(i, e) {
  const t = () => {
    const s = i.getSpawnedSprite(e.spriteId);
    if (!s || s.handle.spriteGeneration !== e.spriteGeneration) throw Ae("SDK_2D_SPRITE_STALE", "$.sprite", `spawned sprite "${e.spriteId}" is stale or destroyed.`);
    return Object.freeze({
      snapshotVersion: 1,
      id: e.spriteId,
      template: s.templateId,
      entityId: e.entity.entityId,
      spriteGeneration: e.spriteGeneration,
      sceneGeneration: e.sceneGeneration,
      transform: s.transform,
      presentation: s.presentation,
      animationIds: Object.freeze(s.animationBindings.map((n) => n.sourceAnimationId))
    });
  };
  return Object.freeze({
    id: e.spriteId,
    entityId: e.entity.entityId,
    state: t,
    animation: () => (t(), Mc(i, e.spriteId)),
    setTransform: (s) => (t(), i.setTransform(e.entity, s), t()),
    setPresentation: (s) => (t(), i.setPresentation(e.entity, s), t()),
    destroy: () => {
      t(), i.destroySprite(e);
    }
  });
}
function Ae(i, e, t) {
  return Object.assign(new TypeError(`${i} at ${e}: ${t}`), { code: i, path: e });
}
function Mc(i, e) {
  const t = i.getSpriteAnimationBindings(e);
  if (t === null) throw Ae("SDK_2D_SPRITE_MISSING", "$.spriteId", `unknown sprite "${e}".`);
  const s = Object.freeze(t.map((g) => g.sourceAnimationId));
  if (s.length === 0) throw Ae("SDK_2D_SPRITE_ANIMATIONS_MISSING", "$.spriteId", `sprite "${e}" has no animations.`);
  const n = new Map(t.map((g) => [g.sourceAnimationId, g.animationId])), r = new Map(t.map((g) => [g.animationId, g.sourceAnimationId])), o = () => {
    const g = i.getSpriteAnimationBindings(e);
    if (g === null || g.length !== t.length || g.some((w, z) => w.animationId !== t[z].animationId))
      throw Ae("SDK_2D_SPRITE_STALE", "$.sprite", `sprite animation controller "${e}" is stale or destroyed.`);
  }, a = (g) => {
    const w = n.get(g);
    if (!w) throw Ae("SDK_2D_SPRITE_ANIMATION_MISSING", "$.animationId", `animation "${g}" does not target sprite "${e}".`);
    return w;
  }, d = () => (o(), t.map((g) => i.getAnimationState(g.animationId))), u = (g = d()) => {
    const w = g.filter((O) => O.transition !== null);
    if (w.length > 1) throw Ae("SDK_2D_SPRITE_ANIMATION_CONFLICT", "$.animations", `sprite "${e}" has multiple active transitions.`);
    if (w.length === 1) {
      const O = w[0], S = /* @__PURE__ */ new Set([O.animationId, O.transition.toAnimationId]);
      if (g.some((v) => v.active && !S.has(v.animationId))) throw Ae("SDK_2D_SPRITE_ANIMATION_CONFLICT", "$.animations", `sprite "${e}" has overlapping active animations.`);
      return O;
    }
    const z = g.filter((O) => O.active);
    if (z.length > 1) throw Ae("SDK_2D_SPRITE_ANIMATION_CONFLICT", "$.animations", `sprite "${e}" has overlapping active animations.`);
    return z[0] ?? null;
  }, l = (g) => g === null ? null : Object.freeze({
    ...g,
    animationId: r.get(g.animationId) ?? g.animationId,
    transition: g.transition === null ? null : Object.freeze({
      ...g.transition,
      toAnimationId: r.get(g.transition.toAnimationId) ?? g.transition.toAnimationId
    })
  }), f = () => Object.freeze({ snapshotVersion: 1, spriteId: e, animationIds: s, current: l(u()) }), h = (g, w) => i.commandAnimation({ commandVersion: 1, animationId: g, expectedRevision: i.getAnimationState(g).revision, ...w }), p = (g, w) => {
    const z = [...g].sort((O, S) => +(S.transition !== null) - +(O.transition !== null));
    for (const O of z)
      O.animationId === w || !O.active && O.status === "stopped" && O.transition === null || h(O.animationId, { command: "stop" });
  }, m = () => {
    const g = u();
    if (!g) throw Ae("SDK_2D_SPRITE_ANIMATION_INACTIVE", "$.animations", `sprite "${e}" has no active animation.`);
    return g;
  }, y = (g, w) => {
    if (g.transition) throw Ae("SDK_2D_SPRITE_ANIMATION_TRANSITION_ACTIVE", "$.animations", `cannot ${w} while sprite "${e}" is transitioning.`);
  };
  let b;
  return b = {
    spriteId: e,
    animationIds: s,
    state: f,
    play: (g, w = "continue") => {
      const z = a(g);
      if (w !== "continue" && w !== "restart") throw Ae("SDK_2D_ANIMATION_PLAY_MODE_INVALID", "$.mode", 'mode must be "continue" or "restart".');
      return p(d(), z), w === "restart" && h(z, { command: "stop" }), h(z, { command: "play" }), f();
    },
    pause: () => {
      const g = m();
      return y(g, "pause"), h(g.animationId, { command: "pause" }), f();
    },
    stop: () => (p(d()), f()),
    restart: () => b.play(r.get(m().animationId), "restart"),
    seek: (g) => {
      const w = m();
      return y(w, "seek"), h(w.animationId, { command: "seek", time: g }), f();
    },
    setSpeed: (g) => {
      const w = m();
      return y(w, "change speed"), h(w.animationId, { command: "set-speed", speed: g }), f();
    },
    setDirection: (g) => {
      const w = m();
      return y(w, "change direction"), h(w.animationId, { command: "set-direction", direction: g }), f();
    },
    transition: (g, w) => {
      const z = a(g), O = m();
      return O.animationId === z || (p(d(), O.animationId), h(O.animationId, { command: "transition", toAnimationId: z, transitionTicks: w })), f();
    }
  }, Object.freeze(b);
}
function fw(i, e, t, s, n) {
  const r = (o) => i.getEntityHandle(o);
  return Object.freeze({
    id: i.sceneId,
    physics: t,
    audio: s,
    hud: n,
    setTransform: (o, a) => i.setTransform(r(o), a),
    setPresentation: (o, a) => i.setPresentation(r(o), a),
    pick: (o, a) => i.pick(o, a)?.entityId ?? null,
    camera: (o) => (i.getCameraState(o), uw(i, o)),
    updateText: (o) => {
      i.updateText(o);
    },
    patchTilemap: (o) => {
      i.applyTilemapPatches(o);
    },
    commandAnimation: (o) => i.commandAnimation(o),
    animationState: (o) => i.getAnimationState(o),
    drainAnimationEvents: () => Object.freeze(i.drainAnimationEvents().map((o) => {
      const a = i.getAnimationIdentity(o.animationId);
      return a ? Object.freeze({ ...o, animationId: a.sourceAnimationId, spriteId: a.spriteId }) : o;
    })),
    spriteAnimation: (o) => Mc(i, o),
    spawnSprite: (o) => Mo(i, i.spawnSprite({
      spriteId: o.id,
      templateId: o.template,
      ...o.entityId === void 0 ? {} : { entityId: o.entityId },
      ...o.transform === void 0 ? {} : { transform: o.transform },
      ...o.presentation === void 0 ? {} : { presentation: o.presentation },
      ...o.parentEntityId === void 0 ? {} : { parent: o.parentEntityId === null ? null : i.getEntityHandle(o.parentEntityId) }
    })),
    findSprite: (o) => {
      const a = i.getSpawnedSprite(o);
      return a ? Mo(i, a.handle) : null;
    },
    createCollider: (o) => Lo(i, i.createCollider(o)),
    collider: (o) => {
      const a = i.getCollider(o);
      return a ? Lo(i, a.handle) : null;
    },
    queryColliders: (o) => Object.freeze(i.queryColliders(o).map(Fn)),
    commandParticles: (o) => i.commandParticleEmitter(o)
  });
}
function hw(i, e) {
  const t = e(), s = t === null ? void 0 : i.get(t);
  if (!s) throw Ae("SDK_2D_SCENE_INACTIVE", "$.twoD", "no active 2D scene is available.");
  return s;
}
function gs(i, e) {
  const t = e();
  return t === null ? null : i.get(t) ?? null;
}
function pw(i, e, t, s) {
  const n = () => t.inspect().scenes.active?.sceneId ?? null, r = () => hw(e, n), o = aw(
    () => gs(e, n)?.attachment ?? null,
    () => s.inspect()
  );
  return Object.freeze({
    inspection: s,
    devtools: o,
    activeScene: n,
    get physics() {
      return r().facade.physics;
    },
    get audio() {
      return r().facade.audio;
    },
    get hud() {
      return r().facade.hud;
    },
    setTransform: (d, u) => r().facade.setTransform(d, u),
    setPresentation: (d, u) => r().facade.setPresentation(d, u),
    pick: (d, u) => r().facade.pick(d, u),
    camera: (d) => r().facade.camera(d),
    updateText: (d) => r().facade.updateText(d),
    patchTilemap: (d) => r().facade.patchTilemap(d),
    commandAnimation: (d) => r().facade.commandAnimation(d),
    animationState: (d) => r().facade.animationState(d),
    drainAnimationEvents: () => r().facade.drainAnimationEvents(),
    spriteAnimation: (d) => r().facade.spriteAnimation(d),
    spawnSprite: (d) => r().facade.spawnSprite(d),
    findSprite: (d) => r().facade.findSprite(d),
    createCollider: (d) => r().facade.createCollider(d),
    collider: (d) => r().facade.collider(d),
    queryColliders: (d) => r().facade.queryColliders(d),
    commandParticles: (d) => r().facade.commandParticles(d),
    inspect: () => {
      const d = gs(e, n)?.attachment.inspectRuntime() ?? null, u = i.inspect();
      return Object.freeze({
        snapshotVersion: 1,
        activeSceneId: n(),
        definitionIds: i.definitions.ids(),
        definitionCount: u.definitionCount,
        activeAttachments: u.activeAttachments,
        retainedEntities: u.retainedEntities,
        retainedBuffers: u.retainedBuffers,
        activeScene: d === null ? null : Object.freeze({
          entities: d.entities,
          visibleItems: d.visibleItems,
          culledItems: d.culledItems,
          colliders: d.colliders,
          collisionQueries: d.collisionQueries,
          retainedBuffers: d.retainedBuffers,
          leasedBuffers: d.leasedBuffers
        }),
        composition: t.inspect().presentation
      });
    },
    inspectDetailed: () => s.inspect()
  });
}
function Vo(i, e, t) {
  const s = i.scope && t ? "SDK_2D_PHYSICS_CAPABILITY_MISSING" : i.status === "loading" ? "SDK_2D_PHYSICS_LOADING" : i.status === "failed" ? "SDK_2D_PHYSICS_FAILED" : "SDK_2D_PHYSICS_UNAVAILABLE", n = t ? `Physics capability "${t}" is unavailable for this 2D scene.` : `Cannot ${e}; 2D scene physics is ${i.status}.`;
  return Object.assign(new Error(`${s}: ${n}`), {
    code: s,
    operation: `scene.physics.${e}`,
    status: i.status,
    capabilityId: t ?? null,
    cause: i.lastError ?? void 0
  });
}
function mw(i) {
  const e = {
    scope: null,
    status: "unavailable",
    capabilities: Object.freeze([]),
    lastError: null
  }, t = (r, o) => {
    const a = e.scope;
    if (!a) return Object.freeze({ ok: !1, status: e.status, capability: null, scope: null, error: Vo(e, r) });
    const d = o === void 0 ? null : e.capabilities.find((u) => u.id === o) ?? null;
    return Object.freeze(o !== void 0 && !d ? { ok: !1, status: e.status, capability: null, scope: null, error: Vo(e, r, o) } : { ok: !0, status: "active", capability: d, scope: a, error: null });
  }, s = (r) => {
    const o = t(r);
    if (!o.ok || !o.scope) throw o.error;
    return o.scope;
  }, n = Object.freeze({
    get status() {
      return e.status;
    },
    get capabilities() {
      return e.capabilities;
    },
    get lastError() {
      return e.lastError;
    },
    getScopeResult: (r) => t("get-scope", r),
    createBody: (r) => s("create-body").createBody(r),
    removeBody: (r) => s("remove-body").removeBody(r),
    setBodyTransform: (r, o) => s("set-body-transform").setBodyTransform(r, o),
    applyBodyImpulse: (r, o, a) => s("apply-body-impulse").applyBodyImpulse(r, o, a),
    readBodySnapshot: (r) => s("read-body-snapshot").readBodySnapshot(r)
  });
  return Object.freeze({ name: i, providerPhysics: e, api: n });
}
function gw() {
  return Object.assign(new TypeError("SDK_2D_SCENE_STALE at $.scene: scene was not prepared."), {
    code: "SDK_2D_SCENE_STALE",
    path: "$.scene"
  });
}
function yw(i, e, t, s, n, r, o, a, d, u) {
  return Object.freeze({
    apiVersion: 1,
    id: i.id,
    create: ({ activation: l, signal: f }) => {
      let h = null, p = null, m = !1, y = 0, b = null, g = null, w = null, z = null;
      const O = (v, I) => I.length === 0 ? null : Object.assign(new Error(v), { errors: Object.freeze(I) }), S = async () => {
        const v = b;
        b = null;
        const I = z;
        z = null;
        const x = w;
        w = null;
        const R = g;
        g = null;
        const P = [];
        try {
          await v?.destroy();
        } catch (H) {
          P.push(H);
        }
        try {
          I?.destroy();
        } catch (H) {
          P.push(H);
        }
        try {
          x?.destroy();
        } catch (H) {
          P.push(H);
        }
        try {
          R && await o.releaseScene(R);
        } catch (H) {
          P.push(H);
        }
        const L = O("2D scene service cleanup failed.", P);
        if (L) throw L;
      };
      return {
        prepare: async () => {
          f.throwIfAborted(), y = u(), h = t.scenes.prepare({
            attachmentVersion: 1,
            sceneId: i.id,
            sceneGeneration: l,
            definition: e
          }, {
            surface: n,
            colliders: i.colliders,
            initialSimulationTick: y
          }), g = mw(i.id), w = a.createScene(i.id, l), z = d.createScene(i.id, l, w.api);
          try {
            await o.prepareScene(g), p = fw(h, e, g.api, w.api, z.hud), await i.setup?.(p), b = await r?.prepare(i.id, l, f, z.adapter) ?? null, f.throwIfAborted();
          } catch (v) {
            const I = await S().then(() => null, (x) => x);
            throw t.scenes.rollback(h), h = null, p = null, I ? Object.assign(new Error("2D scene setup and rollback failed."), { cause: v, cleanup: I }) : v;
          }
        },
        activate: () => {
          if (!h || !p) throw gw();
          t.scenes.commit(h), s.set(i.id, { attachment: h, facade: p }), m = !0, b?.activate(), z?.activate();
        },
        fixedUpdate: (v) => {
          if (!(!h || !p || !m)) {
            b?.fixedUpdate(v);
            for (let I = 0; I < v.steps; I += 1)
              h.beginSimulationStep(++y), i.fixedUpdate?.(p, y);
          }
        },
        frameUpdate: (v) => b?.frameUpdate(v),
        presentationSync: (v) => b?.presentationSync(v),
        retire: async () => {
          s.get(i.id)?.attachment === h && s.delete(i.id);
          const v = [];
          try {
            await S();
          } catch (x) {
            v.push(x);
          }
          try {
            h?.destroy();
          } catch (x) {
            v.push(x);
          }
          h = null, p = null;
          const I = O("2D scene retirement failed.", v);
          if (I) throw I;
        },
        destroy: async () => {
          s.get(i.id)?.attachment === h && s.delete(i.id);
          const v = [];
          try {
            await S();
          } catch (x) {
            v.push(x);
          }
          try {
            h && (m ? h.destroy() : t.scenes.rollback(h));
          } catch (x) {
            v.push(x);
          }
          h = null, p = null;
          const I = O("2D scene destruction failed.", v);
          if (I) throw I;
        }
      };
    }
  });
}
function Pe(i, e, t) {
  return Object.assign(new TypeError(`${i} at ${e}: ${t}`), { code: i, path: e });
}
function bw(i) {
  const e = i;
  if (!e || typeof e != "object") throw Pe("SDK_2D_CONFIG_INVALID", "$", "options must be an object.");
  if (!Array.isArray(e.scenes) || e.scenes.length === 0)
    throw Pe("SDK_2D_SCENES_REQUIRED", "$.scenes", "at least one 2D scene is required.");
  if (e.providers && Object.prototype.hasOwnProperty.call(e.providers, "renderer"))
    throw Pe("SDK_2D_LEGACY_RENDERER_EXCLUSIVE", "$.providers.renderer", "renderer-provider v1 cannot be combined with composed 2D or hybrid domains.");
  const t = /* @__PURE__ */ new Set();
  if (e.scenes.forEach((r, o) => {
    if (!r || typeof r != "object" || typeof r.id != "string" || r.id.length === 0)
      throw Pe("SDK_2D_SCENE_INVALID", `$.scenes[${o}].id`, "scene id is required.");
    if (t.has(r.id)) throw Pe("SDK_2D_SCENE_DUPLICATE", `$.scenes[${o}].id`, `duplicate scene "${r.id}".`);
    t.add(r.id);
  }), e.gameplay) {
    if (e.gameplay.kind !== "game") throw Pe("SDK_2D_GAMEPLAY_INVALID", "$.gameplay", "use defineGame().");
    e.gameplay.scenes.forEach((r, o) => {
      if (!t.has(r.id)) throw Pe("SDK_2D_GAMEPLAY_SCENE_MISSING", `$.gameplay.scenes[${o}].id`, `2D scene "${r.id}" is missing.`);
    });
  }
  if (e.providers?.assets === "disabled" && ((e.assets?.manifests?.length ?? 0) > 0 || (e.assets?.preload?.length ?? 0) > 0))
    throw Pe("SDK_2D_ASSETS_DISABLED", "$.assets", "manifests and preload groups require an asset provider.");
  const s = e.fixedDeltaSeconds ?? 1 / 60;
  if (!Number.isFinite(s) || s <= 0) throw Pe("SDK_2D_LOOP_INVALID", "$.fixedDeltaSeconds", "value must be positive and finite.");
  const n = e.maximumFixedSteps ?? 5;
  if (!Number.isSafeInteger(n) || n < 1 || n > 60)
    throw Pe("SDK_2D_LOOP_INVALID", "$.maximumFixedSteps", "value must be an integer from 1 through 60.");
}
class ww {
  constructor(e, t, s, n) {
    c(this, "tick");
    c(this, "fixedDelta");
    c(this, "maximumSteps");
    c(this, "failure");
    c(this, "request", 0);
    c(this, "previous", 0);
    c(this, "accumulator", 0);
    c(this, "active", !1);
    c(this, "pending", Promise.resolve());
    c(this, "frame", (e) => {
      if (!this.active) return;
      const t = async () => {
        const s = this.previous === 0 ? this.fixedDelta : Math.min(0.25, Math.max(0, (e - this.previous) / 1e3));
        this.previous = e, this.accumulator = Math.min(this.accumulator + s, this.fixedDelta * this.maximumSteps);
        const n = Math.min(this.maximumSteps, Math.floor((this.accumulator + Number.EPSILON) / this.fixedDelta));
        this.accumulator = Math.max(0, this.accumulator - n * this.fixedDelta);
        const r = Math.min(1, this.accumulator / this.fixedDelta);
        await this.tick(this.fixedDelta, n, r), this.active && (this.request = requestAnimationFrame(this.frame));
      };
      this.pending = t().catch((s) => {
        this.stop(), this.failure(s);
      });
    });
    this.tick = e, this.fixedDelta = t, this.maximumSteps = s, this.failure = n;
  }
  get running() {
    return this.active;
  }
  start() {
    this.active || (this.active = !0, this.previous = 0, this.request = requestAnimationFrame(this.frame));
  }
  stop() {
    this.active && (this.active = !1, cancelAnimationFrame(this.request), this.request = 0);
  }
  async stopAndDrain() {
    this.stop(), await this.pending;
  }
}
class vw {
  constructor() {
    c(this, "tail", Promise.resolve());
    c(this, "accepting", !0);
  }
  run(e) {
    if (!this.accepting) return Promise.reject(Object.assign(new Error("2D game work queue is stopped."), { code: "SDK_2D_QUEUE_STOPPED" }));
    const t = this.tail.then(e);
    return this.tail = t.then(() => {
    }, () => {
    }), t;
  }
  stop() {
    this.accepting = !1;
  }
  async stopAndDrain() {
    this.stop(), await this.tail;
  }
}
function K(i, e, t, s = "failed", n, r) {
  return new Ei(i, e, {
    operation: t,
    phase: s,
    ...n === void 0 ? {} : { assetId: n },
    ...r === void 0 ? {} : { cause: r }
  });
}
function vi(i, e, t, s, n) {
  if (i instanceof Ei)
    return i;
  const r = i instanceof Error ? i.message : String(i);
  return K(e, `${t} failed: ${r}`, t, s, n, i);
}
async function xt(i, e) {
  const t = [];
  for (const n of [...i].reverse())
    try {
      await n();
    } catch (r) {
      t.push(r);
    }
  if (t.length === 0)
    return;
  const s = new Error(e);
  throw s.name = "AggregateError", s.errors = Object.freeze(t), s;
}
async function $s(i, e, t) {
  try {
    await e();
  } catch (s) {
    const n = new Error(t);
    throw n.name = "AggregateError", n.errors = Object.freeze([i, s]), n;
  }
  throw i;
}
function Go(i, e) {
  const t = /* @__PURE__ */ new Set();
  for (const s of i) {
    if (t.has(s.id))
      throw K("invalid-state", `Duplicate ${e} descriptor "${s.id}".`, "adapter-registration");
    t.add(s.id);
  }
}
function Vc(i, e = []) {
  const t = new Set(i.capabilities.map((s) => s.id));
  return e.every((s) => t.has(s));
}
function Fo(i, e) {
  if (i === void 0)
    return;
  const t = {};
  for (const [s, n] of Object.entries(i).sort(([r], [o]) => r.localeCompare(o))) {
    if (!Array.isArray(n) || n.some((r) => typeof r != "string"))
      throw K("invalid-state", `${e}.${s} must be an array of capability ids.`, "adapter-registration");
    t[s] = Object.freeze([...new Set(n)]);
  }
  return Object.freeze(t);
}
function Iw(i) {
  return Object.freeze({
    ...i?.source === void 0 ? {} : { source: Object.freeze([...new Set(i.source)]) },
    ...i?.decoders === void 0 ? {} : { decoders: Fo(i.decoders, "capabilities.decoders") },
    ...i?.realizers === void 0 ? {} : { realizers: Fo(i.realizers, "capabilities.realizers") }
  });
}
function Bo(i, e, t, s) {
  const n = t?.[e] ?? [], r = i.find((o) => o.kinds.includes(e) && Vc(o, n));
  if (r)
    return r;
  throw K("unsupported-kind", `No ${s} supports asset kind "${e}" with capabilities [${n.join(", ")}].`, "adapter-selection");
}
class gr {
  constructor(e, t, s, n, r, o) {
    c(this, "sourceDescriptor");
    c(this, "source");
    c(this, "decoderEntries");
    c(this, "realizerEntries");
    c(this, "requirements");
    c(this, "ownership");
    this.sourceDescriptor = e, this.source = t, this.decoderEntries = s, this.realizerEntries = n, this.requirements = r, this.ownership = o;
  }
  static async initialize(e, t, s, n) {
    const r = Mp(e.sourceProvider), o = e.decoders.map(Vp).sort((l, f) => l.id.localeCompare(f.id)), a = e.realizers.map(Gp).sort((l, f) => l.id.localeCompare(f.id));
    Go(o, "decoder"), Go(a, "realizer");
    const d = Iw(e.capabilities);
    if (!Vc(r, d.source))
      throw K("provider-unavailable", "Source provider does not satisfy required capabilities.", "adapter-registration");
    const u = new fe();
    try {
      const l = Fp(r.create(e.sourceOptions));
      u.defer(() => l.destroy()), await l.initialize({ logger: n.child("source"), signal: t, progress: s });
      const f = [];
      for (const p of o) {
        const m = Bp(p.create(e.decoderOptions?.[p.id]));
        u.defer(() => m.destroy()), await m.initialize({
          logger: n.child(`decoder.${p.id}`),
          signal: t,
          progress: s,
          read: async (y, b) => {
            const g = "forgeng.runtime:nested", w = await l.resolve({ assetId: g, source: y, signal: b });
            return l.read({ assetId: g, source: w, signal: b });
          }
        }), f.push(Object.freeze({ descriptor: p, instance: m }));
      }
      const h = [];
      for (const p of a) {
        const m = Up(p.create(e.realizerOptions?.[p.id]));
        u.defer(() => m.destroy()), await m.initialize({ logger: n.child(`realizer.${p.id}`), signal: t, progress: s }), h.push(Object.freeze({ descriptor: p, instance: m }));
      }
      return new gr(r, l, Object.freeze(f), Object.freeze(h), d, u);
    } catch (l) {
      try {
        await u.dispose();
      } catch (f) {
        const h = new Error("Asset adapter initialization and rollback failed.");
        throw h.name = "AggregateError", h.errors = Object.freeze([l, f]), h;
      }
      throw l;
    }
  }
  decoder(e) {
    const t = Bo(this.decoderEntries.map((s) => s.descriptor), e, this.requirements.decoders, "decoder");
    return this.decoderEntries.find((s) => s.descriptor.id === t.id);
  }
  realizer(e) {
    const t = Bo(this.realizerEntries.map((s) => s.descriptor), e, this.requirements.realizers, "realizer");
    return this.realizerEntries.find((s) => s.descriptor.id === t.id);
  }
  destroy() {
    return this.ownership.dispose();
  }
}
const Uo = Object.freeze({ type: "abort" });
class Sw {
  constructor() {
    c(this, "listeners", /* @__PURE__ */ new Map());
    c(this, "abortedValue", !1);
    c(this, "reasonValue");
  }
  get aborted() {
    return this.abortedValue;
  }
  get reason() {
    return this.reasonValue;
  }
  addEventListener(e, t, s) {
    if (e === "abort") {
      if (this.abortedValue) {
        t(Uo);
        return;
      }
      this.listeners.set(t, s?.once === !0);
    }
  }
  removeEventListener(e, t) {
    e === "abort" && this.listeners.delete(t);
  }
  abort(e) {
    if (this.abortedValue)
      return;
    this.abortedValue = !0, this.reasonValue = e;
    const t = [...this.listeners.entries()];
    for (const [s, n] of t) {
      try {
        s(Uo);
      } catch {
      }
      n && this.listeners.delete(s);
    }
    this.listeners.clear();
  }
}
class Bn {
  constructor() {
    c(this, "innerSignal", new Sw());
  }
  get signal() {
    return this.innerSignal;
  }
  abort(e) {
    this.innerSignal.abort(e);
  }
}
function Un(i, e, t, s) {
  return new Ei("aborted", `Asset operation "${i}" was cancelled.`, {
    operation: i,
    phase: e,
    ...t === void 0 ? {} : { assetId: t },
    ...s === void 0 ? {} : { cause: s }
  });
}
function Je(i, e, t, s) {
  if (i.aborted)
    throw Un(e, t, s, i.reason);
}
class Ew {
  constructor(e, t) {
    c(this, "assetById");
    c(this, "groupById");
    c(this, "topologicalIds");
    c(this, "inspectionSnapshot");
    c(this, "bundle");
    this.bundle = kp(e, t), this.assetById = new Map(this.bundle.assets.map((s) => [s.id, s])), this.groupById = new Map(this.bundle.groups.map((s) => [s.id, s])), this.topologicalIds = Object.freeze(this.buildTopologicalOrder()), this.inspectionSnapshot = Object.freeze({
      assets: this.bundle.assets,
      groups: this.bundle.groups,
      topologicalOrder: this.topologicalIds
    });
  }
  get assets() {
    return this.bundle.assets;
  }
  get topologicalOrder() {
    return this.topologicalIds;
  }
  inspection() {
    return this.inspectionSnapshot;
  }
  asset(e) {
    const t = this.assetById.get(e);
    if (!t)
      throw K("source-not-found", `Asset "${e}" is not registered.`, "catalog-lookup", "queued", e);
    return t;
  }
  resolve(e) {
    const t = typeof e == "string" ? e : e.id, s = this.asset(t);
    if (typeof e != "string" && e.kind !== s.kind)
      throw K("invalid-state", `Asset "${t}" has kind "${s.kind}", not "${e.kind}".`, "catalog-lookup", "queued", t);
    return s;
  }
  group(e) {
    const t = this.groupById.get(e) ?? this.resolveLocalGroup(e);
    if (!t)
      throw K("source-not-found", `Asset group "${e}" is not registered.`, "group-lookup");
    return t;
  }
  resolveLocalGroup(e) {
    if (e.includes(":"))
      return;
    const t = this.bundle.groups.filter((s) => s.localId === e);
    if (t.length > 1)
      throw K("invalid-state", `Asset group "${e}" is ambiguous; use a canonical namespace:group id.`, "group-lookup");
    return t[0];
  }
  buildTopologicalOrder() {
    const e = /* @__PURE__ */ new Set(), t = [], s = (n) => {
      if (!e.has(n)) {
        for (const r of this.assetById.get(n)?.dependencies ?? [])
          s(r);
        e.add(n), t.push(n);
      }
    };
    for (const n of this.bundle.assets)
      s(n.id);
    return t;
  }
}
class Aw {
  constructor(e, t, s) {
    c(this, "operationId");
    c(this, "assetId");
    c(this, "controller", new Bn());
    c(this, "result");
    c(this, "waiterCountValue", 0);
    c(this, "settledValue", !1);
    this.operationId = e, this.assetId = t, this.result = Promise.resolve().then(() => s(this.controller.signal)).finally(() => {
      this.settledValue = !0;
    });
  }
  get waiters() {
    return this.waiterCountValue;
  }
  get settled() {
    return this.settledValue;
  }
  wait(e) {
    return e?.aborted ? (this.abortWhenUnobserved(e.reason), Promise.reject(Un(this.operationId, "cancelled", this.assetId, e.reason))) : (this.waiterCountValue += 1, new Promise((t, s) => {
      let n = !0;
      const r = () => n ? (n = !1, e?.removeEventListener("abort", o), this.waiterCountValue -= 1, !0) : !1, o = () => {
        r() && (this.abortWhenUnobserved(e?.reason), s(Un(this.operationId, "cancelled", this.assetId, e?.reason)));
      };
      e?.addEventListener("abort", o, { once: !0 }), this.result.then((a) => {
        r() && t(a);
      }, (a) => {
        r() && s(a);
      });
    }));
  }
  abort(e) {
    this.controller.abort(e);
  }
  completion() {
    return this.result;
  }
  abortWhenUnobserved(e) {
    this.waiterCountValue === 0 && !this.settledValue && this.controller.abort(e);
  }
}
function Gc(i, e) {
  if (i === void 0)
    return 0;
  if (!Number.isSafeInteger(i) || i < 0)
    throw K("invalid-state", `${e} must be a non-negative safe integer.`, "cache-value");
  return i;
}
function xw(i, e, t) {
  if (!i || !(i.bytes instanceof Uint8Array) || !i.source || typeof i.source.uri != "string")
    throw K("source-read-failed", "Source provider returned an invalid result.", "source-read", "fetching", t.id);
  if (i.bytes.byteLength > e)
    throw K("source-too-large", `Asset "${t.id}" exceeds maxSourceBytes.`, "source-read", "fetching", t.id);
  const s = Object.freeze({ ...i.source });
  return Object.freeze({
    source: s,
    bytes: i.bytes.slice(),
    ...i.contentType === void 0 ? {} : { contentType: i.contentType },
    ...i.etag === void 0 ? {} : { etag: i.etag },
    ...i.integrity === void 0 ? {} : { integrity: i.integrity }
  });
}
function _w(i, e) {
  if (!i || typeof i != "object" || !("value" in i))
    throw K("decode-failed", "Decoder returned an invalid value.", "decode", "decoding", e.id);
  if (i.dispose !== void 0 && typeof i.dispose != "function")
    throw K("decode-failed", "Decoded dispose must be a function.", "decode", "decoding", e.id);
  return Gc(i.byteLength, "decoded.byteLength"), i;
}
class $w {
  constructor(e, t) {
    c(this, "adapters");
    c(this, "callbacks");
    c(this, "sources", /* @__PURE__ */ new Map());
    c(this, "sourceInflight", /* @__PURE__ */ new Map());
    c(this, "decoded", /* @__PURE__ */ new Map());
    c(this, "decodedInflight", /* @__PURE__ */ new Map());
    this.adapters = e, this.callbacks = t;
  }
  sourceEntries() {
    return [...this.sources.values()];
  }
  decodedEntries() {
    return [...this.decoded.values()];
  }
  async decodedValue(e, t, s, n) {
    const r = this.decoded.get(e.id);
    if (r)
      return r;
    const o = this.decodedInflight.get(e.id);
    if (o)
      return o;
    const a = this.decode(e, t, s, n);
    this.decodedInflight.set(e.id, a);
    try {
      const d = await a;
      return this.decoded.set(e.id, d), d;
    } finally {
      this.decodedInflight.delete(e.id);
    }
  }
  retainDecoded(e) {
    e.references += 1;
  }
  async releaseDecoded(e, t, s = !1) {
    t.references = Math.max(0, t.references - 1), !(!s && (t.references > 0 || e.policy.cache !== "release-when-unused")) && this.decoded.get(e.id) === t && (this.decoded.delete(e.id), await t.ownership.dispose());
  }
  async destroy() {
    const e = [], t = [...this.decoded.values()].reverse();
    this.decoded.clear();
    for (const s of t)
      try {
        await s.ownership.dispose();
      } catch (n) {
        e.push(n);
      }
    if (this.sources.clear(), this.sourceInflight.clear(), this.decodedInflight.clear(), e.length > 0) {
      const s = new Error("Asset layer cache cleanup failed.");
      throw s.name = "AggregateError", s.errors = Object.freeze(e), s;
    }
  }
  async sourceValue(e, t, s) {
    const n = this.sources.get(e.id);
    if (n)
      return n;
    const r = this.sourceInflight.get(e.id);
    if (r)
      return r;
    const o = this.readSource(e, t, s);
    this.sourceInflight.set(e.id, o);
    try {
      const a = await o;
      return this.sources.set(e.id, a), a;
    } finally {
      this.sourceInflight.delete(e.id);
    }
  }
  async readSource(e, t, s) {
    try {
      this.callbacks.phase(e, t, "resolving");
      const n = await this.adapters.source.resolve({ assetId: e.id, source: e.source, signal: s });
      this.callbacks.phase(e, t, "fetching");
      const r = xw(await this.adapters.source.read({ assetId: e.id, source: n, signal: s }), this.callbacks.maxSourceBytes, e);
      return Je(s, t, "fetching", e.id), { assetId: e.id, result: r, byteLength: r.bytes.byteLength, references: 0 };
    } catch (n) {
      throw vi(n, "source-read-failed", "source-read", "fetching", e.id);
    }
  }
  async decode(e, t, s, n) {
    const r = await this.sourceValue(e, s, n);
    r.references += 1;
    const o = new fe();
    o.defer(() => this.releaseSource(e, r));
    try {
      Je(n, s, "decoding", e.id), this.callbacks.phase(e, s, "decoding");
      const a = this.adapters.decoder(e.kind), d = _w(await a.instance.decode({
        asset: e,
        source: r.result,
        dependencies: t,
        signal: n
      }), e);
      return d.dispose && o.defer(d.dispose), Je(n, s, "decoding", e.id), {
        assetId: e.id,
        value: d.value,
        byteLength: Gc(d.byteLength, "decoded.byteLength"),
        ownership: o,
        references: 0
      };
    } catch (a) {
      const d = vi(a, "decode-failed", "decode", "decoding", e.id);
      return $s(d, () => o.dispose(), "Asset decode and rollback failed.");
    }
  }
  releaseSource(e, t) {
    t.references = Math.max(0, t.references - 1), t.references === 0 && e.policy.cache === "release-when-unused" && this.sources.get(e.id) === t && this.sources.delete(e.id);
  }
}
class zw {
  constructor(e, t, s) {
    c(this, "asset");
    c(this, "retainedValue");
    c(this, "releaseOwnedValue");
    c(this, "releasedValue", !1);
    c(this, "releasePromise", null);
    c(this, "releaseObservers", /* @__PURE__ */ new Set());
    this.asset = e, this.retainedValue = t, this.releaseOwnedValue = s;
  }
  get id() {
    return this.asset.id;
  }
  get kind() {
    return this.asset.kind;
  }
  get released() {
    return this.releasedValue;
  }
  get value() {
    if (this.releasedValue)
      throw K("lease-released", `Asset lease "${this.asset.id}" was released.`, "lease-value", "releasing", this.asset.id);
    return this.retainedValue();
  }
  release() {
    if (this.releasePromise)
      return this.releasePromise;
    this.releasedValue = !0;
    for (const e of this.releaseObservers)
      e();
    return this.releaseObservers.clear(), this.releasePromise = this.releaseOwnedValue(), this.releasePromise;
  }
  observeRelease(e) {
    this.releasedValue ? e() : this.releaseObservers.add(e);
  }
}
class Ow {
  trace(e, t) {
  }
  debug(e, t) {
  }
  info(e, t) {
  }
  warn(e, t) {
  }
  error(e, t) {
  }
  fatal(e, t) {
  }
  child(e, t) {
    return this;
  }
}
const Dw = Object.freeze(new Ow());
function Cw(i) {
  return i ?? Dw;
}
const Nw = Object.freeze([
  "queued",
  "resolving",
  "fetching",
  "decoding",
  "realizing",
  "committing",
  "ready",
  "releasing",
  "evicting",
  "failed",
  "cancelled"
]);
function It(i, e) {
  return Math.min(Number.MAX_SAFE_INTEGER, i + e);
}
function kw(i, e) {
  return !Number.isFinite(i) || !Number.isFinite(e) ? 0 : Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, e - i));
}
class Rw {
  constructor(e) {
    c(this, "changed");
    c(this, "counters", {
      started: 0,
      ready: 0,
      failed: 0,
      cancelled: 0,
      cacheHits: 0,
      inflightJoins: 0
    });
    c(this, "activePhases", /* @__PURE__ */ new Map());
    c(this, "timings", /* @__PURE__ */ new Map());
    this.changed = e;
  }
  increment(e) {
    this.counters[e] = It(this.counters[e], 1), this.changed();
  }
  enterPhase(e, t, s) {
    const n = this.activePhases.get(e);
    n?.phase !== t && (n && this.recordTiming(n.phase, kw(n.startedAtMs, s)), t === "queued" && !n && (this.counters.started = It(this.counters.started, 1)), t === "ready" && (this.counters.ready = It(this.counters.ready, 1)), t === "failed" && (this.counters.failed = It(this.counters.failed, 1)), t === "cancelled" && (this.counters.cancelled = It(this.counters.cancelled, 1)), t === "ready" || t === "failed" || t === "cancelled" ? this.activePhases.delete(e) : this.activePhases.set(e, { phase: t, startedAtMs: s }), this.changed());
  }
  snapshot(e) {
    const t = Object.freeze(Object.fromEntries(Nw.flatMap((s) => {
      const n = this.timings.get(s);
      return n ? [[s, Object.freeze({ ...n })]] : [];
    })));
    return Object.freeze({
      counters: Object.freeze({ ...this.counters }),
      phaseTimings: t,
      resources: e
    });
  }
  clear() {
    this.activePhases.clear();
  }
  recordTiming(e, t) {
    const s = this.timings.get(e) ?? { samples: 0, totalMs: 0, maximumMs: 0 };
    s.samples = It(s.samples, 1), s.totalMs = It(s.totalMs, t), s.maximumMs = Math.max(s.maximumMs, t), this.timings.set(e, s);
  }
}
class Pw {
  constructor(e) {
    c(this, "maxSubscribers");
    c(this, "listeners", /* @__PURE__ */ new Set());
    this.maxSubscribers = e;
  }
  subscribe(e) {
    if (typeof e != "function")
      throw K("invalid-state", "Progress listener must be a function.", "subscribe-progress");
    if (this.listeners.size >= this.maxSubscribers)
      throw K("limit-exceeded", "Asset progress subscriber limit was reached.", "subscribe-progress");
    this.listeners.add(e);
    let t = !1;
    return Object.freeze({
      get disposed() {
        return t;
      },
      dispose: () => {
        t || (t = !0, this.listeners.delete(e));
      }
    });
  }
  report(e) {
    const t = Object.freeze({ ...e });
    for (const s of [...this.listeners])
      try {
        s(t);
      } catch {
      }
  }
  clear() {
    this.listeners.clear();
  }
}
function Fc(i, e, t) {
  if (!i || typeof i != "object" || !("value" in i))
    throw K("realize-failed", "Realizer returned an invalid value.", "realize", "realizing", t.id);
  if (i.generation !== e)
    throw K("realize-failed", `Realizer returned generation ${i.generation}; expected ${e}.`, "realize", "realizing", t.id);
  if (i.byteLength !== void 0 && (!Number.isSafeInteger(i.byteLength) || i.byteLength < 0))
    throw K("realize-failed", "Realized byteLength must be a non-negative safe integer.", "realize", "realizing", t.id);
  if (i.dispose !== void 0 && typeof i.dispose != "function")
    throw K("realize-failed", "Realized dispose must be a function.", "realize", "realizing", t.id);
  i.inspection !== void 0 && jw(i.inspection, t);
  const s = i.inspection === void 0 ? void 0 : Object.freeze({
    ...i.inspection,
    ...i.inspection.dependencyIds === void 0 ? {} : { dependencyIds: Object.freeze([...i.inspection.dependencyIds]) }
  });
  return Object.freeze({
    value: i.value,
    ...i.byteLength === void 0 ? {} : { byteLength: i.byteLength },
    generation: i.generation,
    ...s === void 0 ? {} : { inspection: s },
    ...i.dispose === void 0 ? {} : { dispose: i.dispose }
  });
}
function jw(i, e) {
  if (!i || typeof i != "object" || typeof i.category != "string" || !Number.isSafeInteger(i.logicalBytes) || i.logicalBytes < 0 || !Number.isSafeInteger(i.allocatedBytes) || i.allocatedBytes < 0 || i.dependencyIds !== void 0 && (!Array.isArray(i.dependencyIds) || i.dependencyIds.some((t) => typeof t != "string")))
    throw K("realize-failed", "Realized inspection metadata is invalid.", "realize", "realizing", e.id);
}
async function Tw(i) {
  const e = /* @__PURE__ */ new Map();
  try {
    for (const t of i.topologicalOrder) {
      const s = i.ready.get(t);
      if (!s)
        continue;
      Je(i.signal, `recover:${t}`, "realizing", t);
      const n = Lw(s, e), r = i.adapters.realizer(s.asset.kind), o = Fc(await r.instance.realize({
        asset: s.asset,
        decoded: s.decoded.value,
        dependencies: n,
        generation: i.generation,
        signal: i.signal
      }), i.generation, s.asset), a = new fe();
      o.dispose && a.defer(o.dispose), e.set(t, { output: o, ownership: a });
    }
    Je(i.signal, "recover:commit", "committing");
  } catch (t) {
    return $s(vi(t, "realize-failed", "recover", "realizing"), () => xt([...e.values()].map((s) => () => s.ownership.dispose()), "Asset recovery rollback failed."), "Asset recovery and rollback failed.");
  }
  return Mw(i.ready, e, i.generation);
}
function Lw(i, e) {
  const t = {};
  for (const [s, n] of Object.entries(i.dependencyLeases))
    t[s] = e.get(s)?.output.value ?? n.value;
  return Object.freeze(t);
}
function Mw(i, e, t) {
  return [...e.entries()].map(([s, n]) => {
    const r = i.get(s), o = r.realizedOwnership;
    return r.value = n.output.value, r.byteLength = n.output.byteLength ?? 0, r.generation = t, r.inspection = n.output.inspection, r.realizedOwnership = n.ownership, o;
  });
}
const Vw = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
class yr {
  constructor(e, t, s) {
    c(this, "id");
    c(this, "owner");
    c(this, "onDestroyed");
    c(this, "stateValue", "active");
    c(this, "children", []);
    c(this, "childIds", /* @__PURE__ */ new Set());
    c(this, "leases", /* @__PURE__ */ new Set());
    c(this, "destroyPromise", null);
    if (this.id = e, this.owner = t, this.onDestroyed = s, !Vw.test(e))
      throw K("invalid-state", `Asset scope id "${e}" is invalid.`, "scope-create");
  }
  get state() {
    return this.stateValue;
  }
  async acquire(e, t) {
    this.assertActive("acquire");
    const s = await this.owner.acquireUnscoped(e, t);
    if (this.stateValue !== "active")
      throw await s.release(), K("scope-destroyed", `Asset scope "${this.id}" was destroyed during acquisition.`, "scope-acquire");
    return this.leases.add(s), s.observeRelease(() => this.leases.delete(s)), s;
  }
  async preload(e, t) {
    this.assertActive("preload");
    const s = await Promise.allSettled(this.owner.groupAssetIds(e).map((o) => this.acquire(o, t))), n = s.find((o) => o.status === "rejected");
    if (!n || n.status !== "rejected")
      return;
    const r = s.flatMap((o) => o.status === "fulfilled" ? [o.value] : []);
    return $s(n.reason, () => xt(r.map((o) => () => o.release()), `Asset group "${e}" rollback failed.`), `Asset group "${e}" preload and rollback failed.`);
  }
  createChild(e) {
    if (this.assertActive("create child"), this.childIds.has(e))
      throw K("invalid-state", `Asset scope "${this.id}" already has child "${e}".`, "scope-create");
    this.childIds.add(e);
    const t = new yr(e, this.owner, () => {
      this.childIds.delete(e);
      const s = this.children.indexOf(t);
      s >= 0 && this.children.splice(s, 1);
    });
    return this.children.push(t), t;
  }
  destroy() {
    return this.destroyPromise ? this.destroyPromise : (this.stateValue = "destroying", this.destroyPromise = this.destroyOwned(), this.destroyPromise);
  }
  async destroyOwned() {
    const e = this.children.map((s) => () => s.destroy()), t = [...this.leases].map((s) => () => s.release());
    this.children.length = 0, this.childIds.clear(), this.leases.clear();
    try {
      await xt([...t, ...e], `Asset scope "${this.id}" cleanup failed.`);
    } finally {
      this.stateValue = "destroyed", this.onDestroyed?.();
    }
  }
  assertActive(e) {
    if (this.stateValue !== "active")
      throw K("scope-destroyed", `Cannot ${e} in ${this.stateValue} asset scope "${this.id}".`, "scope-state");
  }
}
function on(i, e, t, s = !1) {
  const n = i ?? e;
  if (!Number.isSafeInteger(n) || (s ? n < 0 : n <= 0))
    throw K("invalid-state", `${t} must be ${s ? "non-negative" : "positive"} safe integer.`, "runtime-create");
  return n;
}
class br {
  constructor(e, t, s, n) {
    c(this, "catalog");
    c(this, "adapters");
    c(this, "progress");
    c(this, "cancellation", new Bn());
    c(this, "status", /* @__PURE__ */ new Map());
    c(this, "ready", /* @__PURE__ */ new Map());
    c(this, "inflight", /* @__PURE__ */ new Map());
    c(this, "cache");
    c(this, "generation");
    c(this, "now");
    c(this, "metrics");
    c(this, "operationSequence", 0);
    c(this, "revision", 1);
    c(this, "snapshotCache", null);
    c(this, "inspectionCache", null);
    c(this, "state", "active");
    c(this, "destroyPromise", null);
    c(this, "game");
    this.catalog = e, this.adapters = t, this.progress = s;
    const r = _n(n.limits);
    this.generation = on(n.generation, 0, "generation", !0), this.now = n.now ?? (() => Date.now()), this.metrics = new Rw(() => this.invalidateSnapshots()), this.cache = new $w(t, {
      maxSourceBytes: r.maxSourceBytes,
      phase: (o, a, d) => this.reportPhase(o, a, d)
    });
    for (const o of e.assets)
      this.status.set(o.id, { state: "registered" });
    this.game = new yr("game", this);
  }
  static async create(e) {
    if (!e || typeof e != "object")
      throw K("invalid-state", "Asset runtime options are required.", "runtime-create");
    const t = _n(e.limits), s = new Ew(e.manifests, t), n = on(e.maxProgressSubscribers, 32, "maxProgressSubscribers"), r = new Pw(n), o = new Bn(), a = await gr.initialize(e, o.signal, r, Cw(e.logger));
    try {
      for (const u of new Set(s.assets.map((l) => l.kind)))
        a.decoder(u), a.realizer(u);
      const d = new br(s, a, r, e);
      return d.cancellation.signal.addEventListener("abort", () => o.abort(d.cancellation.signal.reason), { once: !0 }), d;
    } catch (d) {
      throw await a.destroy(), d;
    }
  }
  async acquire(e, t) {
    return this.assertActive("acquire asset"), this.game.acquire(e, t);
  }
  preload(e, t) {
    return this.assertActive("preload asset group"), this.game.preload(e, t);
  }
  createScope(e) {
    return this.assertActive("create scope"), this.game.createChild(e);
  }
  async recover(e, t) {
    this.assertActive("recover realized assets");
    const s = on(e, 0, "generation", !0);
    if (s === this.generation)
      return;
    if (s < this.generation)
      throw K("invalid-state", `Recovery generation ${s} must be newer than ${this.generation}.`, "recover");
    if ([...this.inflight.values()].filter((o) => !o.settled).length > 0)
      throw K("invalid-state", "Cannot recover while asset acquisitions are in flight.", "recover");
    const r = await Tw({
      topologicalOrder: this.catalog.topologicalOrder,
      ready: this.ready,
      adapters: this.adapters,
      generation: s,
      signal: t?.signal ?? this.cancellation.signal
    });
    this.generation = s, this.invalidateSnapshots(), await xt(r.map((o) => () => o.dispose()), "Previous asset generation cleanup failed.");
  }
  groupAssetIds(e) {
    return this.assertActive("resolve asset group"), this.catalog.group(e).assets;
  }
  subscribeProgress(e) {
    return this.assertActive("subscribe to progress"), this.progress.subscribe(e);
  }
  snapshot() {
    if (this.snapshotCache)
      return this.snapshotCache;
    const e = this.cache.sourceEntries(), t = this.cache.decodedEntries(), s = new Map(e.map((o) => [o.assetId, o.byteLength])), n = new Map(t.map((o) => [o.assetId, o.byteLength])), r = this.catalog.assets.map((o) => {
      const a = this.status.get(o.id), d = this.ready.get(o.id);
      return Object.freeze({
        id: o.id,
        kind: o.kind,
        state: a.state,
        ...a.phase === void 0 ? {} : { phase: a.phase },
        consumers: d?.consumers ?? 0,
        sourceBytes: s.get(o.id) ?? 0,
        decodedBytes: n.get(o.id) ?? 0,
        realizedBytes: d?.byteLength ?? 0,
        generation: d?.generation ?? this.generation,
        ...a.errorCode === void 0 ? {} : { errorCode: a.errorCode }
      });
    });
    return this.snapshotCache = Object.freeze({
      revision: this.revision,
      assets: Object.freeze(r),
      sourceBytes: e.reduce((o, a) => o + a.byteLength, 0),
      decodedBytes: t.reduce((o, a) => o + a.byteLength, 0),
      realizedBytes: [...this.ready.values()].reduce((o, a) => o + a.byteLength, 0)
    }), this.snapshotCache;
  }
  inspect() {
    if (this.inspectionCache)
      return this.inspectionCache;
    const e = [...this.ready.values()].flatMap((s) => {
      const n = s.inspection;
      return n?.category.startsWith("2d.") ? [Object.freeze({
        assetId: s.asset.id,
        kind: s.asset.kind,
        generation: s.generation,
        category: n.category,
        logicalBytes: n.logicalBytes,
        allocatedBytes: n.allocatedBytes,
        ...n.format === void 0 ? {} : { format: n.format },
        ...n.colorSpace === void 0 ? {} : { colorSpace: n.colorSpace },
        ...n.alphaMode === void 0 ? {} : { alphaMode: n.alphaMode },
        ...n.mipLevels === void 0 ? {} : { mipLevels: n.mipLevels },
        dependencyIds: Object.freeze([...n.dependencyIds ?? []])
      })] : [];
    }), t = e.length === 0 ? void 0 : Object.freeze({
      values: Object.freeze(e),
      logicalBytes: e.reduce((s, n) => s + n.logicalBytes, 0),
      allocatedBytes: e.reduce((s, n) => s + n.allocatedBytes, 0)
    });
    return this.inspectionCache = Object.freeze({
      catalog: this.catalog.inspection(),
      runtime: this.snapshot(),
      metrics: this.metrics.snapshot(this.resourceAccounting()),
      ...t === void 0 ? {} : { realized2d: t }
    }), this.inspectionCache;
  }
  /** Package-internal compatibility seam for legacy plugin GET helpers. */
  async readCompatibilitySource(e) {
    this.assertActive("read compatibility asset source");
    const t = "forgeng.compatibility:plugin", s = Object.freeze({ uri: e }), n = await this.adapters.source.resolve({
      assetId: t,
      source: s,
      signal: this.cancellation.signal
    });
    return this.adapters.source.read({
      assetId: t,
      source: n,
      signal: this.cancellation.signal
    });
  }
  async acquireUnscoped(e, t) {
    this.assertActive("acquire asset");
    const s = this.catalog.resolve(e), n = this.ready.get(s.id);
    if (n)
      return this.metrics.increment("cacheHits"), this.createLease(n);
    const o = await this.operation(s).wait(t?.signal);
    if (this.state !== "active")
      throw await this.evictIfUnused(o, !0), K("pipeline-destroyed", "Asset runtime was destroyed during acquisition.", "acquire", "cancelled", s.id);
    return this.createLease(o);
  }
  destroy() {
    if (this.destroyPromise)
      return this.destroyPromise;
    this.state = "destroying", this.cancellation.abort(K("pipeline-destroyed", "Asset runtime is being destroyed.", "runtime-destroy"));
    for (const e of this.inflight.values())
      e.abort(this.cancellation.signal.reason);
    return this.destroyPromise = this.destroyOwned(), this.destroyPromise;
  }
  operation(e) {
    const t = this.inflight.get(e.id);
    if (t && !t.settled)
      return this.metrics.increment("inflightJoins"), t;
    t && this.inflight.delete(e.id);
    const s = `asset-${++this.operationSequence}:${e.id}`;
    this.reportPhase(e, s, "queued");
    const n = new Aw(s, e.id, (r) => this.loadRealized(e, s, r));
    return this.inflight.set(e.id, n), n.completion().then(() => {
    }, (r) => {
      const o = r instanceof Ei ? r : vi(r, "backend-failure", "acquire", "failed", e.id);
      this.setFailure(e, s, o);
    }).finally(() => {
      this.inflight.get(e.id) === n && this.inflight.delete(e.id);
    }), n;
  }
  async loadRealized(e, t, s) {
    const n = new fe(), r = new fe();
    try {
      Je(s, t, "queued", e.id);
      const o = {}, a = {};
      for (const p of e.dependencies) {
        const m = await this.acquireUnscoped(p, { signal: s });
        n.defer(() => m.release()), a[p] = m, o[p] = m.value;
      }
      const d = Object.freeze({ ...o }), u = await this.cache.decodedValue(e, d, t, s);
      this.cache.retainDecoded(u), n.defer(() => this.cache.releaseDecoded(e, u)), Je(s, t, "realizing", e.id), this.reportPhase(e, t, "realizing");
      const l = this.adapters.realizer(e.kind), f = Fc(await l.instance.realize({
        asset: e,
        decoded: u.value,
        dependencies: d,
        generation: this.generation,
        signal: s
      }), this.generation, e);
      f.dispose && r.defer(f.dispose), Je(s, t, "committing", e.id), this.reportPhase(e, t, "committing");
      const h = {
        asset: e,
        value: f.value,
        byteLength: f.byteLength ?? 0,
        generation: f.generation,
        inspection: f.inspection,
        decoded: u,
        dependencyLeases: Object.freeze({ ...a }),
        lifetimeOwnership: n,
        realizedOwnership: r,
        consumers: 0
      };
      return this.ready.set(e.id, h), this.reportPhase(e, t, "ready"), h;
    } catch (o) {
      let a = o;
      if (s.aborted)
        try {
          Je(s, t, "cancelled", e.id);
        } catch (d) {
          a = d;
        }
      else
        a = vi(o, "realize-failed", "asset-load", "failed", e.id);
      return $s(a, () => xt([
        () => n.dispose(),
        () => r.dispose()
      ], "Asset acquisition rollback failed."), "Asset acquisition and rollback failed.");
    }
  }
  createLease(e) {
    return e.consumers += 1, this.touch(e.asset, { state: "ready", phase: "ready" }), new zw(e.asset, () => e.value, async () => {
      e.consumers = Math.max(0, e.consumers - 1), this.invalidateSnapshots(), this.reportLifecycleProgress(e.asset, "releasing"), await this.evictIfUnused(e);
    });
  }
  async evictIfUnused(e, t = !1) {
    e.consumers > 0 || !t && e.asset.policy.cache !== "release-when-unused" || this.ready.get(e.asset.id) === e && (this.ready.delete(e.asset.id), this.touch(e.asset, { state: "evicted", phase: "evicting" }), await xt([
      () => e.lifetimeOwnership.dispose(),
      () => e.realizedOwnership.dispose()
    ], `Asset "${e.asset.id}" realized/lifetime cleanup failed.`), this.touch(e.asset, { state: "evicted", phase: "evicting" }), this.reportLifecycleProgress(e.asset, "evicting"));
  }
  reportPhase(e, t, s) {
    const n = this.now();
    this.metrics.enterPhase(t, s, n);
    const r = s === "ready" ? "ready" : s === "failed" ? "failed" : "loading";
    this.touch(e, { state: r, phase: s });
    const o = Object.freeze({
      operationId: t,
      assetId: e.id,
      phase: s,
      timestampMs: n
    });
    this.progress.report(o);
  }
  setFailure(e, t, s) {
    const n = s.code === "aborted" ? "cancelled" : "failed", r = this.now();
    this.metrics.enterPhase(t, n, r), this.touch(e, { state: "failed", phase: n, errorCode: s.code }), this.progress.report(Object.freeze({
      operationId: t,
      assetId: e.id,
      phase: n,
      message: s.message,
      timestampMs: r
    }));
  }
  reportLifecycleProgress(e, t) {
    this.progress.report(Object.freeze({
      operationId: `asset-${++this.operationSequence}:${t}:${e.id}`,
      assetId: e.id,
      phase: t,
      timestampMs: this.now()
    }));
  }
  touch(e, t) {
    this.status.set(e.id, t), this.invalidateSnapshots();
  }
  async destroyOwned() {
    const e = [...this.inflight.values()], t = [];
    try {
      try {
        await this.game.destroy();
      } catch (n) {
        t.push(n);
      }
      await Promise.allSettled(e.map((n) => n.completion()));
      const s = [...this.ready.values()].map((n) => () => this.evictIfUnused(n, !0));
      try {
        await xt([
          () => this.progress.clear(),
          () => this.adapters.destroy(),
          () => this.cache.destroy(),
          ...s
        ], "Asset runtime cleanup failed.");
      } catch (n) {
        t.push(n);
      }
    } finally {
      this.ready.clear(), this.inflight.clear(), this.progress.clear(), this.metrics.clear(), this.invalidateSnapshots(), this.state = "destroyed";
    }
    if (t.length > 0) {
      const s = new Error("Asset runtime destroy reported cleanup errors.");
      throw s.name = "AggregateError", s.errors = Object.freeze(t), s;
    }
  }
  assertActive(e) {
    if (this.state !== "active")
      throw K("pipeline-destroyed", `Cannot ${e}; asset runtime is ${this.state}.`, "runtime-state");
  }
  resourceAccounting() {
    const e = this.cache.sourceEntries(), t = this.cache.decodedEntries(), s = e.reduce((a, d) => a + d.byteLength, 0), n = t.reduce((a, d) => a + d.byteLength, 0), r = [...this.ready.values()].reduce((a, d) => a + d.byteLength, 0), o = Object.freeze({
      "assets-core.source-cache": Object.freeze({
        resources: e.length,
        trackedBytes: s
      }),
      "assets-core.decoded-cache": Object.freeze({
        resources: t.length,
        trackedBytes: n
      }),
      "assets-core.realized-cache": Object.freeze({
        resources: this.ready.size,
        trackedBytes: r
      })
    });
    return Object.freeze({
      semantics: "tracked-estimate",
      byOwner: o,
      resources: Object.values(o).reduce((a, d) => a + d.resources, 0),
      trackedBytes: Object.values(o).reduce((a, d) => Math.min(Number.MAX_SAFE_INTEGER, a + d.trackedBytes), 0)
    });
  }
  invalidateSnapshots() {
    this.revision = Math.min(Number.MAX_SAFE_INTEGER, this.revision + 1), this.snapshotCache = null, this.inspectionCache = null;
  }
}
class C extends Error {
  constructor(t, s, n, r, o) {
    super(n);
    c(this, "code");
    c(this, "phase");
    c(this, "path");
    c(this, "cause");
    c(this, "format", "assets-2d");
    c(this, "formatCode");
    this.code = t, this.phase = s, this.path = r, this.cause = o, this.name = "Asset2dFormatError", this.formatCode = `assets-2d.${t}`;
  }
}
const Gw = "1.0.0", qe = Object.freeze({
  spriteAtlas: "sprite/atlas",
  tiledTilemap: "tilemap/tiled-json",
  bitmapFont: "font/bitmap",
  msdfFont: "font/msdf",
  animation: "animation/2d"
}), Fw = Object.freeze({
  maxSourceBytes: 16 * 1024 * 1024,
  maxStringLength: 16 * 1024,
  maxAtlasFrames: 65536,
  maxLayers: 1024,
  maxLayerDepth: 32,
  maxTileCount: 4194304,
  maxObjects: 1e5,
  maxObjectPoints: 1e6,
  maxTilesets: 256,
  maxExternalDependencyBytes: 8 * 1024 * 1024,
  maxFontPages: 64,
  maxFontGlyphs: 65536,
  maxKerningPairs: 262144,
  maxAnimationClips: 4096,
  maxAnimationFrames: 1048576
});
function Bw(i) {
  const e = { ...Fw, ...i };
  for (const [t, s] of Object.entries(e))
    if (!Number.isSafeInteger(s) || s <= 0)
      throw new C("invalid-schema", "validation", `${t} must be a positive safe integer.`, t);
  return Object.freeze(e);
}
function Ve(i, e) {
  if (i.aborted)
    throw new C("cancelled", "lifecycle", "2D asset decode was cancelled.", e);
}
function Bc(i) {
  const e = globalThis.TextDecoder;
  return new e("utf-8", { fatal: !0 }).decode(i);
}
function Kt(i, e, t, s) {
  if (Ve(t, s), i.byteLength > e.maxSourceBytes)
    throw new C("limit-exceeded", "validation", `${s} exceeds maxSourceBytes.`, s);
  try {
    const n = JSON.parse(Bc(i));
    return te(n, s);
  } catch (n) {
    throw n instanceof C ? n : new C("invalid-json", "parse", `${s} is not valid UTF-8 JSON.`, s, n);
  }
}
function te(i, e) {
  if (!i || typeof i != "object" || Array.isArray(i))
    throw new C("invalid-schema", "validation", `${e} must be an object.`, e);
  return i;
}
function wr(i, e) {
  if (!Array.isArray(i))
    throw new C("invalid-schema", "validation", `${e} must be an array.`, e);
  return i;
}
function ue(i, e, t, s) {
  if (i === void 0 && s !== void 0)
    return s;
  if (typeof i != "string" || i.length > t.maxStringLength)
    throw new C("invalid-schema", "validation", `${e} must be a bounded string.`, e);
  return i;
}
function de(i, e, t) {
  const s = ue(i, e, t);
  if (s.length === 0)
    throw new C("invalid-schema", "validation", `${e} must not be empty.`, e);
  return s;
}
function B(i, e, t) {
  if (i === void 0 && t !== void 0)
    return t;
  if (typeof i != "number" || !Number.isFinite(i))
    throw new C("invalid-schema", "validation", `${e} must be a finite number.`, e);
  return i;
}
function V(i, e, t = 0, s) {
  const n = B(i, e, s);
  if (!Number.isSafeInteger(n) || n < t)
    throw new C("invalid-schema", "validation", `${e} must be a safe integer >= ${t}.`, e);
  return n;
}
function Ki(i, e, t) {
  const s = B(i, e, t);
  if (!Number.isSafeInteger(s))
    throw new C("invalid-schema", "validation", `${e} must be a safe integer.`, e);
  return s;
}
function Me(i, e, t) {
  if (i === void 0 && t !== void 0)
    return t;
  if (typeof i != "boolean")
    throw new C("invalid-schema", "validation", `${e} must be boolean.`, e);
  return i;
}
function ve(i, e, t) {
  const s = wr(i, e);
  if (s.length > t)
    throw new C("limit-exceeded", "validation", `${e} exceeds its item limit.`, e);
  return s;
}
function Le(i, e) {
  return i === void 0 ? void 0 : te(i, e);
}
function Ii(i, e, t) {
  if (i === void 0)
    return Object.freeze([]);
  const n = ve(i, e, t.maxObjects).map((r, o) => {
    const a = te(r, `${e}[${o}]`), d = a.value;
    if (d !== null && typeof d != "string" && typeof d != "number" && typeof d != "boolean")
      throw new C("invalid-schema", "validation", `${e}[${o}].value must be a JSON primitive.`, `${e}[${o}].value`);
    if (typeof d == "number" && !Number.isFinite(d))
      throw new C("invalid-schema", "validation", `${e}[${o}].value must be finite.`, `${e}[${o}].value`);
    return Object.freeze({
      name: de(a.name, `${e}[${o}].name`, t),
      type: ue(a.type, `${e}[${o}].type`, t, "string"),
      value: d
    });
  }).sort((r, o) => r.name.localeCompare(o.name));
  return Object.freeze(n);
}
function Uw(i, e, t) {
  const s = B(i, e, t);
  if (Math.min(1, Math.max(0, s)) !== s)
    throw new C("invalid-schema", "validation", `${e} must be from 0 through 1.`, e);
  return s;
}
function Wo(i) {
  const e = [];
  for (const t of i.split("/"))
    !t || t === "." || (t === ".." ? e.pop() : e.push(t));
  return e.join("/");
}
function Ht(i, e) {
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(e) || e.startsWith("/"))
    return e;
  const t = i.split(/[?#]/, 1)[0] ?? i, s = t.match(/^([A-Za-z][A-Za-z0-9+.-]*:\/\/[^/]*)(?:\/(.*))?$/);
  if (s) {
    const r = (s[2] ?? "").split("/").slice(0, -1).join("/");
    return `${s[1]}/${Wo(`${r}/${e}`)}`;
  }
  const n = t.split("/").slice(0, -1).join("/");
  return Wo(`${n}/${e}`);
}
function zi(i, e) {
  return Object.freeze({ uri: i, contentType: e });
}
function Ww(i, e, t, s) {
  const n = i * e;
  if (!Number.isSafeInteger(n) || n > s)
    throw new C("limit-exceeded", "validation", `${t} exceeds its size limit.`, t);
  return n;
}
function Yw(i, e) {
  const s = Kt(i.source.bytes, e, i.signal, "animation-2d").clips, n = Array.isArray(s) ? ve(s, "clips", e.maxAnimationClips).map((a, d) => {
    const u = te(a, `clips[${d}]`);
    return [de(u.name, `clips[${d}].name`, e), u];
  }) : Object.entries(te(s, "clips"));
  if (n.length === 0)
    throw new C("invalid-schema", "validation", "Animation metadata has no clips.", "clips");
  if (n.length > e.maxAnimationClips)
    throw new C("limit-exceeded", "validation", "Animation metadata exceeds maxAnimationClips.", "clips");
  let r = 0;
  const o = n.map(([a, d], u) => {
    const l = `clips[${u}]`, f = te(d, l), h = de(a, `${l}.name`, e), p = ve(f.frames, `${l}.frames`, e.maxAnimationFrames).map((y, b) => {
      if (r += 1, r > e.maxAnimationFrames)
        throw new C("limit-exceeded", "validation", "Animation metadata exceeds maxAnimationFrames.", `${l}.frames`);
      (r & 16383) === 0 && Ve(i.signal, `${l}.frames[${b}]`);
      const g = te(y, `${l}.frames[${b}]`);
      return Object.freeze({
        sprite: de(g.sprite ?? g.frame, `${l}.frames[${b}].sprite`, e),
        durationMs: V(g.durationMs ?? g.duration, `${l}.frames[${b}].durationMs`, 1),
        ...g.event === void 0 ? {} : {
          event: de(g.event, `${l}.frames[${b}].event`, e)
        }
      });
    });
    if (p.length === 0)
      throw new C("invalid-schema", "validation", `${l} has no frames.`, `${l}.frames`);
    const m = p.reduce((y, b) => y + b.durationMs, 0);
    if (!Number.isSafeInteger(m))
      throw new C("limit-exceeded", "validation", `${l} duration exceeds a safe integer.`, l);
    return Object.freeze({ name: h, loop: Me(f.loop, `${l}.loop`, !0), durationMs: m, frames: Object.freeze(p) });
  });
  o.sort((a, d) => a.name.localeCompare(d.name));
  for (let a = 1; a < o.length; a += 1)
    if (o[a - 1].name === o[a].name)
      throw new C("invalid-schema", "validation", `Duplicate animation clip ${o[a].name}.`, "clips");
  return Ve(i.signal, "animation-2d"), Object.freeze({
    normalizationVersion: 1,
    kind: "animation/2d",
    clips: Object.freeze(o),
    sourceBytes: i.source.bytes.byteLength
  });
}
function qw(i) {
  const e = {};
  for (const t of i.matchAll(/([A-Za-z][A-Za-z0-9]*)=("[^"]*"|[^\s]+)/g)) {
    const s = t[2], n = s.startsWith('"') ? s.slice(1, -1) : s, r = Number(n);
    e[t[1]] = n !== "" && Number.isFinite(r) ? r : n;
  }
  return e;
}
function Kw(i, e) {
  let t;
  try {
    t = Bc(i);
  } catch (r) {
    throw new C("invalid-json", "parse", "Bitmap font metadata is not valid UTF-8.", "font", r);
  }
  const s = t.split(/\r?\n/);
  if (s.length > e.maxFontGlyphs + e.maxKerningPairs + e.maxFontPages + 16)
    throw new C("limit-exceeded", "validation", "Bitmap font text has too many records.", "font");
  const n = { pages: [], chars: [], kernings: [] };
  for (const r of s) {
    const o = r.trim();
    if (!o)
      continue;
    const a = o.indexOf(" "), d = a < 0 ? o : o.slice(0, a), u = qw(a < 0 ? "" : o.slice(a + 1));
    d === "info" || d === "common" ? n[d] = u : d === "page" ? n.pages.push(u) : d === "char" ? n.chars.push(u) : d === "kerning" && n.kernings.push(u);
  }
  return n;
}
function Hw(i, e) {
  return i.source.bytes.find((s) => s > 32) === 123 ? Kt(i.source.bytes, e, i.signal, "bitmap-font") : Kw(i.source.bytes, e);
}
function Uc(i, e, t) {
  const s = Math.max(e.length, i.asset.dependencies.length);
  if (s === 0)
    throw new C("missing-dependency", "dependency", "Font metadata requires at least one texture page.", "pages");
  if (s > t.maxFontPages)
    throw new C("limit-exceeded", "validation", "Font metadata exceeds maxFontPages.", "pages");
  const n = [], r = [];
  for (let o = 0; o < s; o += 1) {
    const a = e[o], d = i.asset.dependencies[o];
    if (d && !(d in i.dependencies))
      throw new C("missing-dependency", "dependency", `Font texture asset ${d} is unavailable.`, `pages[${o}]`);
    if (!a?.file && !d)
      throw new C("missing-dependency", "dependency", `Font page ${o} has no file or asset dependency.`, `pages[${o}]`);
    const u = a?.file ? zi(Ht(i.source.source.uri, a.file), "image/*") : void 0, l = Object.freeze({
      role: "font-page",
      ...u ? { source: u } : {},
      ...d ? { assetId: d } : {}
    });
    n.push(l), r.push(Object.freeze({ id: a?.id ?? o, ...a?.file ? { file: a.file } : {}, texture: l }));
  }
  return r.sort((o, a) => o.id - a.id), Object.freeze({ pages: Object.freeze(r), dependencies: Object.freeze(n) });
}
function Xw(i, e) {
  const t = Hw(i, e), s = te(t.info, "info"), n = te(t.common, "common"), o = (t.pages === void 0 ? [] : ve(t.pages, "pages", e.maxFontPages)).map((h, p) => {
    if (typeof h == "string")
      return Object.freeze({ id: p, file: de(h, `pages[${p}]`, e) });
    const m = te(h, `pages[${p}]`);
    return Object.freeze({
      id: V(m.id, `pages[${p}].id`, 0, p),
      file: de(m.file, `pages[${p}].file`, e)
    });
  }), a = Uc(i, o, e), u = ve(t.chars, "chars", e.maxFontGlyphs).map((h, p) => {
    const m = te(h, `chars[${p}]`);
    return Object.freeze({
      id: V(m.id, `chars[${p}].id`),
      ...typeof m.char == "string" ? { char: ue(m.char, `chars[${p}].char`, e) } : {},
      x: B(m.x, `chars[${p}].x`, 0),
      y: B(m.y, `chars[${p}].y`, 0),
      width: B(m.width, `chars[${p}].width`, 0),
      height: B(m.height, `chars[${p}].height`, 0),
      xOffset: B(m.xoffset ?? m.xOffset, `chars[${p}].xoffset`, 0),
      yOffset: B(m.yoffset ?? m.yOffset, `chars[${p}].yoffset`, 0),
      xAdvance: B(m.xadvance ?? m.xAdvance, `chars[${p}].xadvance`),
      page: V(m.page, `chars[${p}].page`, 0, 0),
      channel: V(m.chnl ?? m.channel, `chars[${p}].chnl`, 0, 0)
    });
  }), f = (t.kernings === void 0 ? [] : ve(t.kernings, "kernings", e.maxKerningPairs)).map((h, p) => {
    const m = te(h, `kernings[${p}]`);
    return Object.freeze({
      first: V(m.first, `kernings[${p}].first`),
      second: V(m.second, `kernings[${p}].second`),
      amount: B(m.amount, `kernings[${p}].amount`)
    });
  });
  return u.sort((h, p) => h.id - p.id), f.sort((h, p) => h.first - p.first || h.second - p.second), Object.freeze({
    normalizationVersion: 1,
    kind: "font/bitmap",
    family: de(s.face, "info.face", e),
    size: B(s.size, "info.size"),
    lineHeight: B(n.lineHeight ?? n.lineheight, "common.lineHeight"),
    base: B(n.base, "common.base"),
    atlasWidth: V(n.scaleW ?? n.scalew, "common.scaleW", 1),
    atlasHeight: V(n.scaleH ?? n.scaleh, "common.scaleH", 1),
    pages: a.pages,
    glyphs: Object.freeze(u),
    kernings: Object.freeze(f),
    dependencies: a.dependencies,
    sourceBytes: i.source.bytes.byteLength
  });
}
function Jw(i, e) {
  const t = Kt(i.source.bytes, e, i.signal, "msdf-font"), s = te(t.atlas, "atlas"), n = te(t.metrics, "metrics"), r = t.pages === void 0 ? [] : wr(t.pages, "pages").map((l, f) => ({ id: f, file: de(l, `pages[${f}]`, e) })), o = Uc(i, r, e), a = V(s.height, "atlas.height", 1), d = ue(s.yOrigin, "atlas.yOrigin", e, "bottom"), u = ve(t.glyphs, "glyphs", e.maxFontGlyphs).map((l, f) => {
    const h = te(l, `glyphs[${f}]`), p = Le(h.atlasBounds, `glyphs[${f}].atlasBounds`), m = Le(h.planeBounds, `glyphs[${f}].planeBounds`), y = B(p?.left, `glyphs[${f}].atlasBounds.left`, 0), b = B(p?.right, `glyphs[${f}].atlasBounds.right`, y), g = B(p?.bottom, `glyphs[${f}].atlasBounds.bottom`, 0), w = B(p?.top, `glyphs[${f}].atlasBounds.top`, g), z = d === "top" ? g : a - w;
    return Object.freeze({
      id: V(h.unicode, `glyphs[${f}].unicode`),
      x: y,
      y: z,
      width: b - y,
      height: w - g,
      xOffset: 0,
      yOffset: 0,
      xAdvance: B(h.advance, `glyphs[${f}].advance`),
      page: 0,
      channel: 0,
      ...m ? { planeBounds: Object.freeze([
        B(m.left, `glyphs[${f}].planeBounds.left`, 0),
        B(m.bottom, `glyphs[${f}].planeBounds.bottom`, 0),
        B(m.right, `glyphs[${f}].planeBounds.right`, 0),
        B(m.top, `glyphs[${f}].planeBounds.top`, 0)
      ]) } : {}
    });
  });
  return u.sort((l, f) => l.id - f.id), Object.freeze({
    normalizationVersion: 1,
    kind: "font/msdf",
    family: ue(t.name, "name", e, "msdf"),
    size: B(s.size, "atlas.size"),
    lineHeight: B(n.lineHeight, "metrics.lineHeight"),
    base: B(n.ascender, "metrics.ascender"),
    atlasWidth: V(s.width, "atlas.width", 1),
    atlasHeight: a,
    distanceRange: B(s.distanceRange, "atlas.distanceRange"),
    pages: o.pages,
    glyphs: Object.freeze(u),
    kernings: Object.freeze([]),
    dependencies: o.dependencies,
    sourceBytes: i.source.bytes.byteLength
  });
}
function Qw(i, e) {
  Ve(i.signal, "font");
  const t = i.asset.kind === "font/bitmap" ? Xw(i, e) : i.asset.kind === "font/msdf" ? Jw(i, e) : void 0;
  if (!t)
    throw new C("invalid-schema", "validation", `Unsupported font kind ${i.asset.kind}.`, "asset.kind");
  return Ve(i.signal, "font"), t;
}
function Zw(i, e, t) {
  if (i.asset.dependencies.length > 1)
    throw new C("invalid-schema", "validation", "Sprite atlas accepts exactly one image dependency.", "asset.dependencies");
  const s = i.asset.dependencies[0];
  if (s && !(s in i.dependencies))
    throw new C("missing-dependency", "dependency", "Sprite atlas image asset is unavailable.", "asset.dependencies[0]");
  const n = e.image === void 0 ? void 0 : de(e.image, "meta.image", t), r = n === void 0 ? void 0 : zi(Ht(i.source.source.uri, n), "image/*");
  if (!s && !r)
    throw new C("missing-dependency", "dependency", "Sprite atlas requires meta.image or one manifest image dependency.", "meta.image");
  return Object.freeze({ role: "atlas-image", ...r ? { source: r } : {}, ...s ? { assetId: s } : {} });
}
function Yo(i, e, t, s, n) {
  const r = te(i, t), o = Le(r.frame, `${t}.frame`) ?? r, a = V(o.x, `${t}.frame.x`), d = V(o.y, `${t}.frame.y`), u = V(o.w ?? o.width, `${t}.frame.w`, 1), l = V(o.h ?? o.height, `${t}.frame.h`, 1);
  if (a + u > s || d + l > n)
    throw new C("invalid-schema", "validation", `${t}.frame exceeds atlas bounds.`, `${t}.frame`);
  const f = Le(r.sourceSize, `${t}.sourceSize`), h = Le(r.spriteSourceSize, `${t}.spriteSourceSize`), p = Le(r.pivot, `${t}.pivot`), m = B(p?.x, `${t}.pivot.x`, 0.5), y = B(p?.y, `${t}.pivot.y`, 0.5);
  if (m < 0 || m > 1 || y < 0 || y > 1)
    throw new C("invalid-schema", "validation", `${t}.pivot must be normalized.`, `${t}.pivot`);
  return Object.freeze({
    name: e,
    x: a,
    y: d,
    width: u,
    height: l,
    sourceWidth: V(f?.w ?? f?.width, `${t}.sourceSize.w`, 1, u),
    sourceHeight: V(f?.h ?? f?.height, `${t}.sourceSize.h`, 1, l),
    spriteSourceX: V(h?.x, `${t}.spriteSourceSize.x`, 0, 0),
    spriteSourceY: V(h?.y, `${t}.spriteSourceSize.y`, 0, 0),
    pivotX: m,
    pivotY: y,
    rotated: Me(r.rotated, `${t}.rotated`, !1),
    trimmed: Me(r.trimmed, `${t}.trimmed`, !1)
  });
}
function ev(i, e) {
  const t = Kt(i.source.bytes, e, i.signal, "sprite-atlas"), s = Le(t.meta, "meta") ?? Object.freeze({}), n = Le(s.size, "meta.size"), r = V(n?.w ?? t.width, "meta.size.w", 1), o = V(n?.h ?? t.height, "meta.size.h", 1);
  let a;
  if (Array.isArray(t.frames))
    a = ve(t.frames, "frames", e.maxAtlasFrames).map((u, l) => {
      const f = te(u, `frames[${l}]`);
      return Yo(f, de(f.filename ?? f.name, `frames[${l}].filename`, e), `frames[${l}]`, r, o);
    });
  else {
    const u = te(t.frames, "frames"), l = Object.entries(u);
    if (l.length > e.maxAtlasFrames)
      throw new C("limit-exceeded", "validation", "frames exceeds maxAtlasFrames.", "frames");
    a = l.map(([f, h]) => Yo(h, de(f, `frames.${f}`, e), `frames.${f}`, r, o));
  }
  if (a.length === 0)
    throw new C("invalid-schema", "validation", "Sprite atlas has no frames.", "frames");
  a.sort((u, l) => u.name.localeCompare(l.name));
  for (let u = 1; u < a.length; u += 1)
    if (a[u - 1].name === a[u].name)
      throw new C("invalid-schema", "validation", `Duplicate sprite frame ${a[u].name}.`, "frames");
  Ve(i.signal, "sprite-atlas");
  const d = Zw(i, s, e);
  return Object.freeze({
    normalizationVersion: 1,
    kind: "sprite/atlas",
    width: r,
    height: o,
    frames: Object.freeze(a),
    image: d,
    dependencies: Object.freeze([d]),
    sourceBytes: i.source.bytes.byteLength
  });
}
function vr(i, e) {
  const t = `${e.role}|${e.source?.uri ?? ""}|${e.assetId ?? ""}`;
  return i.dependencyKeys.has(t) || (i.dependencyKeys.add(t), i.dependencies.push(e)), e;
}
function Wc(i, e) {
  const t = V(i, e);
  if (t > 4294967295)
    throw new C("invalid-schema", "validation", `${e} must be an unsigned 32-bit GID.`, e);
  return t;
}
function qo(i, e, t, s, n, r, o) {
  if (typeof i == "string")
    throw new C("unsupported-encoding", "validation", `${s} base64/compressed tile data is not supported; export a JSON array.`, s);
  const a = wr(i, s), d = Ww(e, t, s, r.maxTileCount);
  if (a.length !== d)
    throw new C("invalid-schema", "validation", `${s} length must equal width * height.`, s);
  if (n.tiles += a.length, n.tiles > r.maxTileCount)
    throw new C("limit-exceeded", "validation", "Tilemap exceeds maxTileCount.", s);
  const u = a.map((l, f) => ((f & 16383) === 0 && Ve(o.signal, `${s}[${f}]`), Wc(l, `${s}[${f}]`)));
  return Object.freeze(u);
}
function Ko(i, e, t, s) {
  if (i === void 0)
    return Object.freeze([]);
  const n = ve(i, e, s.maxObjectPoints);
  if (t.points += n.length, t.points > s.maxObjectPoints)
    throw new C("limit-exceeded", "validation", "Tilemap exceeds maxObjectPoints.", e);
  return Object.freeze(n.map((r, o) => {
    const a = te(r, `${e}[${o}]`);
    return Object.freeze({
      x: B(a.x, `${e}[${o}].x`),
      y: B(a.y, `${e}[${o}].y`)
    });
  }));
}
function Yc(i, e, t, s) {
  if (t.objects += 1, t.objects > s.maxObjects)
    throw new C("limit-exceeded", "validation", "Tilemap exceeds maxObjects.", e);
  const n = te(i, e), r = n.polygon === void 0 ? void 0 : Ko(n.polygon, `${e}.polygon`, t, s), o = n.polyline === void 0 ? void 0 : Ko(n.polyline, `${e}.polyline`, t, s), a = Le(n.text, `${e}.text`), d = n.gid === void 0 ? void 0 : Wc(n.gid, `${e}.gid`), u = d !== void 0 ? "tile" : Me(n.ellipse, `${e}.ellipse`, !1) ? "ellipse" : Me(n.point, `${e}.point`, !1) ? "point" : r ? "polygon" : o ? "polyline" : a ? "text" : "rectangle";
  return Object.freeze({
    id: V(n.id, `${e}.id`, 1),
    name: ue(n.name, `${e}.name`, s, ""),
    className: ue(n.class ?? n.type, `${e}.class`, s, ""),
    x: B(n.x, `${e}.x`, 0),
    y: B(n.y, `${e}.y`, 0),
    width: B(n.width, `${e}.width`, 0),
    height: B(n.height, `${e}.height`, 0),
    rotation: B(n.rotation, `${e}.rotation`, 0),
    visible: Me(n.visible, `${e}.visible`, !0),
    ...d === void 0 ? {} : { gid: d },
    shape: u,
    points: r ?? o ?? Object.freeze([]),
    ...a ? { text: ue(a.text, `${e}.text.text`, s, "") } : {},
    properties: Ii(n.properties, `${e}.properties`, s)
  });
}
function es(i, e, t, s) {
  return {
    id: V(i.id, `${e}.id`, 1),
    name: ue(i.name, `${e}.name`, s, ""),
    path: t,
    visible: Me(i.visible, `${e}.visible`, !0),
    opacity: B(i.opacity, `${e}.opacity`, 1),
    offsetX: B(i.offsetx, `${e}.offsetx`, 0),
    offsetY: B(i.offsety, `${e}.offsety`, 0),
    parallaxX: B(i.parallaxx, `${e}.parallaxx`, 1),
    parallaxY: B(i.parallaxy, `${e}.parallaxy`, 1),
    properties: Ii(i.properties, `${e}.properties`, s)
  };
}
function tv(i, e, t, s, n, r) {
  const o = V(i.width, `${e}.width`), a = V(i.height, `${e}.height`);
  let d = Object.freeze([]), u = Object.freeze([]);
  return i.chunks !== void 0 ? u = Object.freeze(ve(i.chunks, `${e}.chunks`, n.maxTileCount).map((l, f) => {
    const h = `${e}.chunks[${f}]`, p = te(l, h), m = V(p.width, `${h}.width`, 1), y = V(p.height, `${h}.height`, 1);
    return Object.freeze({
      x: Ki(p.x, `${h}.x`),
      y: Ki(p.y, `${h}.y`),
      width: m,
      height: y,
      gids: qo(p.data, m, y, `${h}.data`, s, n, r)
    });
  })) : d = qo(i.data, o, a, `${e}.data`, s, n, r), Object.freeze({
    ...es(i, e, t, n),
    type: "tilelayer",
    width: o,
    height: a,
    x: Ki(i.x, `${e}.x`, 0),
    y: Ki(i.y, `${e}.y`, 0),
    gids: d,
    chunks: u
  });
}
function qc(i, e, t, s, n, r) {
  if (t > n.maxLayerDepth)
    throw new C("limit-exceeded", "validation", "Tilemap exceeds maxLayerDepth.", e);
  const a = ve(i, e, n.maxLayers).map((d, u) => {
    if (s.layers += 1, s.layers > n.maxLayers)
      throw new C("limit-exceeded", "validation", "Tilemap exceeds maxLayers.", e);
    const l = `${e}[${u}]`, f = te(d, l), h = ue(f.name, `${l}.name`, n, `layer-${u}`), p = e === "layers" ? h : `${e}/${h}`, m = de(f.type, `${l}.type`, n);
    if (m === "tilelayer")
      return tv(f, l, p, s, n, r);
    if (m === "objectgroup") {
      const y = ue(f.draworder, `${l}.draworder`, n, "topdown");
      if (y !== "index" && y !== "topdown")
        throw new C("invalid-schema", "validation", `${l}.draworder is unsupported.`, `${l}.draworder`);
      return Object.freeze({
        ...es(f, l, p, n),
        type: "objectgroup",
        drawOrder: y,
        objects: Object.freeze(ve(f.objects, `${l}.objects`, n.maxObjects).map((g, w) => Yc(g, `${l}.objects[${w}]`, s, n)))
      });
    }
    if (m === "imagelayer") {
      const y = f.image === void 0 ? void 0 : de(f.image, `${l}.image`, n), b = y === void 0 ? void 0 : vr(s, Object.freeze({
        role: "image-layer",
        source: zi(Ht(r.source.source.uri, y), "image/*")
      }));
      return Object.freeze({
        ...es(f, l, p, n),
        type: "imagelayer",
        ...b ? { image: b } : {},
        repeatX: Me(f.repeatx, `${l}.repeatx`, !1),
        repeatY: Me(f.repeaty, `${l}.repeaty`, !1)
      });
    }
    if (m === "group")
      return Object.freeze({
        ...es(f, l, p, n),
        type: "group",
        layers: qc(f.layers, p, t + 1, s, n, r)
      });
    throw new C("invalid-schema", "validation", `${l}.type ${m} is unsupported.`, `${l}.type`);
  });
  return Object.freeze(a);
}
function Kc(i, e, t, s, n, r) {
  const o = i.image === void 0 ? void 0 : de(i.image, "tileset.image", r), a = o === void 0 ? void 0 : vr(n, Object.freeze({
    role: "tileset-image",
    source: zi(Ht(t, o), "image/*")
  })), d = V(i.tilecount, "tileset.tilecount", 1), u = /* @__PURE__ */ new Set(), l = Object.freeze(ve(i.tiles ?? [], "tileset.tiles", Math.min(d, r.maxTileCount)).map((f, h) => {
    const p = `tileset.tiles[${h}]`, m = te(f, p), y = V(m.id, `${p}.id`);
    if (y >= d || u.has(y))
      throw new C("invalid-schema", "validation", `${p}.id is duplicated or exceeds tilecount.`, `${p}.id`);
    u.add(y);
    const b = Le(m.objectgroup, `${p}.objectgroup`), g = Uw(m.probability, `${p}.probability`, 1);
    return Object.freeze({
      id: y,
      className: ue(m.class ?? m.type, `${p}.class`, r, ""),
      probability: g,
      properties: Ii(m.properties, `${p}.properties`, r),
      collisionObjects: Object.freeze(b === void 0 ? [] : ve(b.objects, `${p}.objectgroup.objects`, r.maxObjects).map((w, z) => Yc(w, `${p}.objectgroup.objects[${z}]`, n, r)))
    });
  }));
  return Object.freeze({
    firstGid: e,
    name: de(i.name, "tileset.name", r),
    tileWidth: V(i.tilewidth, "tileset.tilewidth", 1),
    tileHeight: V(i.tileheight, "tileset.tileheight", 1),
    tileCount: d,
    columns: V(i.columns, "tileset.columns"),
    spacing: V(i.spacing, "tileset.spacing", 0, 0),
    margin: V(i.margin, "tileset.margin", 0, 0),
    ...a ? { image: a } : {},
    ...s ? { source: s } : {},
    properties: Ii(i.properties, "tileset.properties", r),
    tiles: l
  });
}
async function Hc(i, e, t, s, n, r, o) {
  if (o.includes(e))
    throw new C("dependency-cycle", "dependency", `External tileset dependency cycle at ${e}.`, e);
  Ve(s.signal, e);
  const a = zi(e, "application/json"), d = vr(n, Object.freeze({ role: "tileset", source: a }));
  let u;
  try {
    u = await t.read(a, s.signal);
  } catch (f) {
    throw new C("missing-dependency", "dependency", `Unable to read external tileset ${e}.`, e, f);
  }
  if (u.bytes.byteLength > r.maxExternalDependencyBytes)
    throw new C("limit-exceeded", "dependency", `${e} exceeds maxExternalDependencyBytes.`, e);
  const l = Kt(u.bytes, r, s.signal, e);
  if (l.source !== void 0) {
    const f = Ht(e, de(l.source, `${e}.source`, r));
    return Hc(i, f, t, s, n, r, [...o, e]);
  }
  return Kc(l, i, e, d.source, n, r);
}
async function iv(i, e, t) {
  const s = Kt(i.source.bytes, t, i.signal, "tiled-map");
  if (s.type !== void 0 && s.type !== "map")
    throw new C("invalid-schema", "validation", "Tiled root type must be map.", "type");
  const n = { layers: 0, tiles: 0, objects: 0, points: 0, dependencies: [], dependencyKeys: /* @__PURE__ */ new Set() }, r = Me(s.infinite, "infinite", !1), o = V(s.width, "width"), a = V(s.height, "height");
  if (!r && (o === 0 || a === 0))
    throw new C("invalid-schema", "validation", "Finite Tiled maps require non-zero width and height.", "width");
  const d = ve(s.tilesets, "tilesets", t.maxTilesets), u = [];
  for (let g = 0; g < d.length; g += 1) {
    Ve(i.signal, `tilesets[${g}]`);
    const w = te(d[g], `tilesets[${g}]`), z = V(w.firstgid, `tilesets[${g}].firstgid`, 1);
    if (w.source !== void 0) {
      const O = Ht(i.source.source.uri, de(w.source, `tilesets[${g}].source`, t));
      u.push(await Hc(z, O, e, i, n, t, []));
    } else
      u.push(Kc(w, z, i.source.source.uri, void 0, n, t));
  }
  u.sort((g, w) => g.firstGid - w.firstGid);
  for (let g = 1; g < u.length; g += 1)
    if (u[g - 1].firstGid === u[g].firstGid)
      throw new C("invalid-schema", "validation", "Tileset firstGid values must be unique.", "tilesets");
  const l = ue(s.orientation, "orientation", t, "orthogonal");
  if (!["orthogonal", "isometric", "staggered", "hexagonal"].includes(l))
    throw new C("invalid-schema", "validation", `Unsupported Tiled orientation ${l}.`, "orientation");
  const f = ue(s.renderorder, "renderorder", t, "right-down");
  if (!["right-down", "right-up", "left-down", "left-up"].includes(f))
    throw new C("invalid-schema", "validation", `Unsupported Tiled renderorder ${f}.`, "renderorder");
  const h = l === "staggered" || l === "hexagonal", p = s.staggeraxis === void 0 ? null : ue(s.staggeraxis, "staggeraxis", t), m = s.staggerindex === void 0 ? null : ue(s.staggerindex, "staggerindex", t);
  if (h && p !== "x" && p !== "y")
    throw new C("invalid-schema", "validation", "Staggered and hexagonal maps require staggeraxis x or y.", "staggeraxis");
  if (h && m !== "odd" && m !== "even")
    throw new C("invalid-schema", "validation", "Staggered and hexagonal maps require staggerindex odd or even.", "staggerindex");
  const y = s.hexsidelength === void 0 ? 0 : V(s.hexsidelength, "hexsidelength", 0);
  if (l === "hexagonal") {
    const g = p === "x" ? V(s.tilewidth, "tilewidth", 1) : V(s.tileheight, "tileheight", 1);
    if (y <= 0 || y > g)
      throw new C("invalid-schema", "validation", `hexsidelength must be in 1..${g}.`, "hexsidelength");
  } else if (y !== 0)
    throw new C("invalid-schema", "validation", "hexsidelength is valid only for hexagonal maps.", "hexsidelength");
  const b = qc(s.layers, "layers", 1, n, t, i);
  return n.dependencies.sort((g, w) => `${g.role}|${g.source?.uri ?? ""}`.localeCompare(`${w.role}|${w.source?.uri ?? ""}`)), Ve(i.signal, "tiled-map"), Object.freeze({
    normalizationVersion: 1,
    kind: "tilemap/tiled-json",
    tiledVersion: ue(s.tiledversion, "tiledversion", t, "unknown"),
    orientation: l,
    renderOrder: f,
    staggerAxis: p,
    staggerIndex: m,
    hexSideLength: y,
    infinite: r,
    width: o,
    height: a,
    tileWidth: V(s.tilewidth, "tilewidth", 1),
    tileHeight: V(s.tileheight, "tileheight", 1),
    layers: b,
    tilesets: Object.freeze(u),
    dependencies: Object.freeze(n.dependencies),
    properties: Ii(s.properties, "properties", t),
    sourceBytes: i.source.bytes.byteLength
  });
}
function sv(i) {
  if (!("dependencies" in i))
    return Object.freeze([]);
  const e = /* @__PURE__ */ new Map();
  for (const t of i.dependencies)
    t.source && e.set(t.source.uri, t.source);
  return Object.freeze([...e.values()].sort((t, s) => t.uri.localeCompare(s.uri)));
}
class nv {
  constructor(e, t) {
    c(this, "mode");
    c(this, "options");
    c(this, "context");
    this.mode = e, this.options = t;
  }
  async initialize(e) {
    this.context = e;
  }
  async decode(e) {
    const t = this.context;
    if (!t)
      throw new C("not-initialized", "lifecycle", "2D CPU decoder is not initialized.");
    const s = Bw(this.options.limits), n = this.mode === "atlas" ? ev(e, s) : this.mode === "tiled" ? await iv(e, t, s) : this.mode === "font" ? Qw(e, s) : Yw(e, s);
    return Object.freeze({
      value: n,
      byteLength: n.sourceBytes,
      dependencies: sv(n)
    });
  }
  async destroy() {
    this.context = void 0;
  }
}
function Hi(i, e, t, s) {
  const n = s.limits ? Object.freeze({ ...s.limits }) : void 0;
  return Object.freeze({
    id: i,
    contractVersion: Ot,
    implementationVersion: Gw,
    capabilities: Object.freeze([{ id: cs.decoderDependencies, version: "1.0.0" }]),
    kinds: Object.freeze([...t]),
    create: (r = Object.freeze({})) => new nv(e, Object.freeze({
      limits: Object.freeze({ ...n, ...r.limits })
    }))
  });
}
function rv(i = Object.freeze({})) {
  const e = Object.freeze({ limits: i.limits ? Object.freeze({ ...i.limits }) : void 0 }), t = Hi("forgeng.assets2d.sprite-atlas", "atlas", [qe.spriteAtlas], e), s = Hi("forgeng.assets2d.tiled-json", "tiled", [qe.tiledTilemap], e), n = Hi("forgeng.assets2d.font-metadata", "font", [qe.bitmapFont, qe.msdfFont], e), r = Hi("forgeng.assets2d.animation", "animation", [qe.animation], e);
  return Object.freeze({
    spriteAtlas: t,
    tiledTilemap: s,
    fonts: n,
    animation: r,
    all: Object.freeze([t, s, n, r])
  });
}
const ov = Object.freeze([
  qe.tiledTilemap,
  qe.bitmapFont,
  qe.msdfFont,
  qe.animation
]);
class av {
  async initialize() {
  }
  async realize(e) {
    const t = e.decoded;
    if (!t || t.kind !== e.asset.kind || t.normalizationVersion !== 1)
      throw new TypeError(`2D CPU asset "${e.asset.id}" does not match kind "${e.asset.kind}" or normalization version 1.`);
    return Object.freeze({
      value: t,
      byteLength: t.sourceBytes,
      generation: e.generation,
      inspection: Object.freeze({
        category: `2d.cpu.${t.kind}`,
        logicalBytes: t.sourceBytes,
        allocatedBytes: 0,
        dependencyIds: Object.freeze(("dependencies" in t ? t.dependencies : []).flatMap((s) => s.assetId === void 0 ? [] : [s.assetId]))
      })
    });
  }
  async destroy() {
  }
}
function cv() {
  return Object.freeze([Object.freeze({
    id: "forgeng.assets2d.cpu-realizer",
    contractVersion: "1.0.0",
    implementationVersion: "1.0.0",
    capabilities: Object.freeze([]),
    kinds: ov,
    create: () => new av()
  })]);
}
function U(i, e, t, s, n = "fetching", r) {
  return new Ei(i, t, {
    operation: e,
    phase: n,
    ...s === void 0 ? {} : { assetId: s },
    ...r === void 0 ? {} : { cause: r }
  });
}
const dv = /^(sha256|sha384|sha512)-([A-Za-z0-9+/_=-]+)$/;
function lv(i) {
  const e = dv.exec(i);
  if (!e)
    throw U("integrity-failed", "verify-integrity", "Asset integrity metadata is invalid.");
  const t = e[1], s = e[2].replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, ""), n = t === "sha256" ? "SHA-256" : t === "sha384" ? "SHA-384" : "SHA-512";
  return { normalized: `${t}-${s}`, algorithm: n, digest: s };
}
function uv(i) {
  let e = "";
  for (let t = 0; t < i.length; t += 32768)
    e += String.fromCharCode(...i.subarray(t, t + 32768));
  return btoa(e).replace(/=+$/, "");
}
function fv(i) {
  const t = i.get("content-digest")?.match(/sha-(256|384|512)=:([A-Za-z0-9+/=_-]+):/i);
  if (t)
    return `sha${t[1]}-${t[2]}`;
  const n = i.get("digest")?.match(/sha-(256|384|512)=([A-Za-z0-9+/=_-]+)/i);
  return n ? `sha${n[1]}-${n[2]}` : void 0;
}
async function Ho(i, e, t) {
  if (!e)
    return;
  const s = lv(e), n = globalThis.crypto?.subtle;
  if (!n)
    throw U("integrity-failed", "verify-integrity", "Web Crypto is unavailable.", t);
  const r = Uint8Array.from(i).buffer, o = new Uint8Array(await n.digest(s.algorithm, r));
  if (uv(o) !== s.digest)
    throw U("integrity-failed", "verify-integrity", `Integrity verification failed for "${t}".`, t);
  return s.normalized;
}
const hv = 64 * 1024 * 1024, pv = 3e4, mv = /* @__PURE__ */ new Set([
  "baseUrl",
  "allowedProtocols",
  "allowedOrigins",
  "credentials",
  "headers",
  "maxBytes",
  "timeoutMs",
  "allowRangeRequests",
  "fetch"
]), gv = /* @__PURE__ */ new Set(["https:", "http:", "data:", "blob:"]), yv = /* @__PURE__ */ new Set(["omit", "same-origin", "include"]), bv = /* @__PURE__ */ new Set(["content-length", "host", "range"]);
function he(i, e) {
  return U("invalid-state", "configure", `${i} ${e}`, void 0, "queued");
}
function Xc(i, e) {
  if (typeof i != "object" || i === null || Array.isArray(i) || Object.getPrototypeOf(i) !== Object.prototype && Object.getPrototypeOf(i) !== null)
    throw he(e, "must be a plain object.");
  return i;
}
function wv(i) {
  if (i === void 0) {
    const e = globalThis.location?.href;
    return typeof e == "string" && e.length > 0 ? new URL(e).href : void 0;
  }
  if (typeof i != "string" || i.trim() !== i || i.length === 0)
    throw he("options.baseUrl", "must be a normalized absolute URL.");
  try {
    return new URL(i).href;
  } catch {
    throw he("options.baseUrl", "must be an absolute URL.");
  }
}
function vv(i) {
  const e = i ?? ["https:", "http:", "data:", "blob:"];
  if (!Array.isArray(e) || e.length === 0)
    throw he("options.allowedProtocols", "must be non-empty.");
  const t = /* @__PURE__ */ new Set();
  for (const s of e) {
    if (typeof s != "string" || !gv.has(s))
      throw he("options.allowedProtocols", `contains unsupported protocol "${String(s)}".`);
    t.add(s);
  }
  return Object.freeze([...t]);
}
function Iv(i) {
  const e = i ?? ["self"];
  if (!Array.isArray(e) || e.length === 0)
    throw he("options.allowedOrigins", "must be non-empty.");
  const t = /* @__PURE__ */ new Set();
  for (const s of e) {
    if (s === "*" || s === "self") {
      t.add(s);
      continue;
    }
    if (typeof s != "string")
      throw he("options.allowedOrigins", "must contain origins.");
    let n;
    try {
      n = new URL(s);
    } catch {
      throw he("options.allowedOrigins", `contains invalid origin "${s}".`);
    }
    if (!["http:", "https:"].includes(n.protocol) || n.origin !== n.href.replace(/\/$/, ""))
      throw he("options.allowedOrigins", `contains non-origin URL "${s}".`);
    t.add(n.origin);
  }
  return Object.freeze([...t]);
}
function Sv(i) {
  if (i === void 0)
    return Object.freeze({});
  const e = Xc(i, "options.headers"), t = {};
  for (const [s, n] of Object.entries(e).sort(([r], [o]) => r.localeCompare(o))) {
    const r = s.toLowerCase();
    if (bv.has(r))
      throw he(`options.headers.${s}`, "is provider-controlled.");
    if (typeof n != "string" || n.trim() !== n || n.length === 0)
      throw he(`options.headers.${s}`, "must be a normalized string.");
    try {
      new Headers({ [r]: n });
    } catch {
      throw he(`options.headers.${s}`, "is invalid.");
    }
    t[r] = n;
  }
  return Object.freeze(t);
}
function Xo(i, e, t, s) {
  const n = i ?? e;
  if (!Number.isSafeInteger(n) || n <= 0 || n > s)
    throw he(t, `must be a positive safe integer no greater than ${s}.`);
  return n;
}
function Ev(i = {}) {
  const e = Xc(i, "options");
  for (const r of Object.keys(e))
    if (!mv.has(r))
      throw he(`options.${r}`, "is not supported.");
  const t = e.credentials ?? "same-origin";
  if (typeof t != "string" || !yv.has(t))
    throw he("options.credentials", "must be omit, same-origin or include.");
  if (e.allowRangeRequests !== void 0 && typeof e.allowRangeRequests != "boolean")
    throw he("options.allowRangeRequests", "must be boolean.");
  if (e.fetch !== void 0 && typeof e.fetch != "function")
    throw he("options.fetch", "must be a function.");
  const s = typeof globalThis.fetch == "function" ? globalThis.fetch.bind(globalThis) : null, n = wv(e.baseUrl);
  return Object.freeze({
    ...n === void 0 ? {} : { baseUrl: n },
    allowedProtocols: vv(e.allowedProtocols),
    allowedOrigins: Iv(e.allowedOrigins),
    credentials: t,
    headers: Sv(e.headers),
    maxBytes: Xo(e.maxBytes, hv, "options.maxBytes", 512 * 1024 * 1024),
    timeoutMs: Xo(e.timeoutMs, pv, "options.timeoutMs", 10 * 6e4),
    allowRangeRequests: e.allowRangeRequests ?? !0,
    fetch: e.fetch ?? s
  });
}
function ts(i) {
  if (i == null)
    return;
  const e = i.split(";", 1)[0]?.trim().toLowerCase();
  return e || void 0;
}
function Av(i, e, t) {
  const s = i.headers.get("content-length");
  if (s === null)
    return;
  if (!/^\d+$/.test(s))
    throw U("source-read-failed", "read-source", "Response Content-Length is invalid.", e);
  const n = Number(s);
  if (!Number.isSafeInteger(n))
    throw U("source-read-failed", "read-source", "Response Content-Length is unsafe.", e);
  if (n > t)
    throw U("source-too-large", "read-source", `Asset "${e}" exceeds the ${t} byte limit.`, e);
  return n;
}
function an(i, e, t, s) {
  i.report(Object.freeze({
    operationId: `source:${e}`,
    assetId: e,
    phase: "fetching",
    loadedBytes: t,
    ...s === void 0 ? {} : {
      totalBytes: s,
      ratio: s === 0 ? 1 : Math.min(1, t / s)
    },
    timestampMs: Date.now()
  }));
}
async function xv(i, e, t, s) {
  const n = Av(i, t, e), r = i.body?.getReader();
  if (!r) {
    const l = new Uint8Array(await i.arrayBuffer());
    if (l.byteLength > e)
      throw U("source-too-large", "read-source", `Asset "${t}" exceeds the ${e} byte limit.`, t);
    if (n !== void 0 && l.byteLength !== n)
      throw U("source-read-failed", "read-source", "Response byte length does not match its declared Content-Length.", t);
    return an(s, t, l.byteLength, n), l;
  }
  const o = [];
  let a = 0;
  try {
    for (; ; ) {
      const l = await r.read();
      if (l.done)
        break;
      if (a += l.value.byteLength, a > e)
        throw await r.cancel(), U("source-too-large", "read-source", `Asset "${t}" exceeds the ${e} byte limit.`, t);
      o.push(l.value.slice()), an(s, t, a, n);
    }
  } finally {
    r.releaseLock();
  }
  if (n !== void 0 && a !== n)
    throw U("source-read-failed", "read-source", "Response byte length does not match its declared Content-Length.", t);
  const d = new Uint8Array(a);
  let u = 0;
  for (const l of o)
    d.set(l, u), u += l.byteLength;
  return an(s, t, a, n), d;
}
function _v(i, e, t) {
  if (i !== void 0) {
    if (!e)
      throw U("provider-unavailable", "read-range", "Browser asset range reads are disabled.");
    if (!Number.isSafeInteger(i.offset) || i.offset < 0 || !Number.isSafeInteger(i.length) || i.length <= 0)
      throw U("invalid-state", "read-range", "Asset read range must use a non-negative offset and positive safe length.");
    if (i.length > t || i.offset + i.length > Number.MAX_SAFE_INTEGER)
      throw U("source-too-large", "read-range", `Asset range exceeds the ${t} byte limit.`);
    return Object.freeze({ offset: i.offset, length: i.length });
  }
}
function $v(i) {
  return `bytes=${i.offset}-${i.offset + i.length - 1}`;
}
function zv(i, e, t, s) {
  if (t) {
    if (i.byteLength > e.length)
      throw U("source-read-failed", "read-range", "Partial response exceeds the requested range.", s);
    return i;
  }
  if (e.offset >= i.byteLength)
    throw U("source-read-failed", "read-range", "Requested range starts beyond the source.", s);
  return i.slice(e.offset, Math.min(i.byteLength, e.offset + e.length));
}
function Ov(i, e, t) {
  if (i.status !== 206)
    return;
  const n = i.headers.get("content-range")?.match(/^bytes (\d+)-(\d+)\/(?:\d+|\*)$/);
  if (!n || Number(n[1]) !== e.offset || Number(n[2]) < Number(n[1]) || Number(n[2]) >= e.offset + e.length)
    throw U("source-read-failed", "read-range", "Partial response Content-Range is invalid.", t);
}
function Jc(i) {
  if (i === void 0)
    return;
  const e = (t) => Array.isArray(t) ? Object.freeze(t.map(e)) : t !== null && typeof t == "object" ? Object.freeze(Object.fromEntries(Object.entries(t).map(([s, n]) => [s, e(n)]))) : t;
  return e(i);
}
function Dv(i) {
  const e = ts(i.contentType), t = Jc(i.metadata);
  return Object.freeze({
    uri: i.uri,
    ...e === void 0 ? {} : { contentType: e },
    ...i.integrity === void 0 ? {} : { integrity: i.integrity },
    ...i.expectedBytes === void 0 ? {} : { expectedBytes: i.expectedBytes },
    ...t === void 0 ? {} : { metadata: t }
  });
}
function Cv(i) {
  if (i === null)
    return;
  const e = i.trim();
  return e.length > 0 ? e : void 0;
}
function Jo(i, e, t, s) {
  return t && s === "timeout" ? U("source-read-failed", "read-source", `Asset read for "${e}" timed out.`, e, "fetching", i) : t || i?.name === "AbortError" ? U("aborted", "read-source", `Asset read for "${e}" was aborted.`, e, "cancelled", i) : i instanceof Error && i.name === "TypeError" ? U("source-access-denied", "read-source", `Browser access to asset "${e}" failed; verify the URL, CORS and credential policy.`, e, "fetching", i) : U("source-read-failed", "read-source", `Asset "${e}" could not be read.`, e, "fetching", i);
}
function Nv(i, e) {
  return i.status === 404 || i.status === 410 ? U("source-not-found", "read-source", `Asset "${e}" was not found.`, e) : i.status === 401 || i.status === 403 || i.type === "opaque" ? U("source-access-denied", "read-source", `Access to asset "${e}" was denied.`, e) : U("source-read-failed", "read-source", `Asset "${e}" returned HTTP ${i.status}.`, e);
}
function kv(i, e, t, s) {
  return s.aborted ? Promise.reject(new DOMException("Asset fetch was aborted.", "AbortError")) : new Promise((n, r) => {
    let o = !1;
    const a = (u) => {
      o || (o = !0, s.removeEventListener("abort", d), u());
    }, d = () => a(() => r(new DOMException("Asset fetch was aborted.", "AbortError")));
    s.addEventListener("abort", d, { once: !0 }), Promise.resolve().then(() => i(e, t)).then((u) => a(() => n(u)), (u) => a(() => r(u)));
  });
}
class Rv {
  constructor(e = {}) {
    c(this, "policy");
    c(this, "active", /* @__PURE__ */ new Set());
    c(this, "pending", /* @__PURE__ */ new Set());
    c(this, "lifecycle", "new");
    c(this, "context", null);
    c(this, "destroyPromise", null);
    c(this, "onContextAbort", () => {
      this.destroy();
    });
    this.policy = Ev(e);
  }
  async initialize(e) {
    if (this.lifecycle === "destroying" || this.lifecycle === "destroyed")
      throw U("provider-destroyed", "initialize", "Browser asset provider has been destroyed.", void 0, "queued");
    if (this.lifecycle !== "ready") {
      if (!e || typeof e != "object" || typeof e.logger?.child != "function" || typeof e.progress?.report != "function" || typeof e.signal?.addEventListener != "function")
        throw U("invalid-state", "initialize", "Browser asset provider context is invalid.", void 0, "queued");
      if (e.signal.aborted)
        throw U("aborted", "initialize", "Browser asset provider initialization was aborted.", void 0, "cancelled");
      if (!this.policy.fetch)
        throw U("provider-unavailable", "initialize", "Fetch is unavailable in this browser environment.", void 0, "queued");
      if (this.context = e, this.lifecycle = "ready", e.signal.addEventListener("abort", this.onContextAbort, { once: !0 }), e.signal.aborted)
        throw await this.destroy(), U("aborted", "initialize", "Browser asset provider initialization was aborted.", void 0, "cancelled");
    }
  }
  resolve(e) {
    this.assertReady("resolve-source"), this.throwIfCancelled(e.signal, "resolve-source", e.assetId);
    const t = e.parent?.uri, s = t === void 0 ? this.policy.baseUrl : this.canonicalUrl(t, this.policy.baseUrl, e.assetId), n = this.canonicalUrl(e.source.uri, s, e.assetId), r = new URL(n);
    if (r.hash = "", this.assertAllowed(r, e.assetId), e.source.expectedBytes !== void 0 && e.source.expectedBytes > this.policy.maxBytes)
      throw U("source-too-large", "resolve-source", `Asset "${e.assetId}" exceeds the ${this.policy.maxBytes} byte limit.`, e.assetId, "resolving");
    const o = ts(e.source.contentType), a = Jc(e.source.metadata);
    return Object.freeze({
      uri: r.href,
      ...o === void 0 ? {} : { contentType: o },
      ...e.source.integrity === void 0 ? {} : { integrity: e.source.integrity },
      ...e.source.expectedBytes === void 0 ? {} : { expectedBytes: e.source.expectedBytes },
      ...a === void 0 ? {} : { metadata: a }
    });
  }
  read(e) {
    try {
      this.assertReady("read-source"), this.throwIfCancelled(e.signal, "read-source", e.assetId);
      const t = _v(e.range, this.policy.allowRangeRequests, this.policy.maxBytes), s = Dv(e.source), n = new URL(this.canonicalUrl(s.uri, void 0, e.assetId));
      this.assertAllowed(n, e.assetId);
      const r = Object.freeze({ ...e, source: s, ...t === void 0 ? {} : { range: t } }), o = new AbortController(), a = () => o.abort(e.signal.reason);
      e.signal.addEventListener("abort", a, { once: !0 }), this.active.add(o);
      const d = setTimeout(() => o.abort("timeout"), this.policy.timeoutMs), u = this.performRead(r, t, o.signal).finally(() => {
        clearTimeout(d), e.signal.removeEventListener("abort", a), this.active.delete(o);
      });
      return this.track(u);
    } catch (t) {
      return Promise.reject(t);
    }
  }
  destroy() {
    if (this.destroyPromise)
      return this.destroyPromise;
    this.lifecycle = "destroying", this.context?.signal.removeEventListener("abort", this.onContextAbort), this.context = null;
    for (const e of this.active)
      e.abort("provider-destroyed");
    return this.destroyPromise = (async () => {
      await Promise.allSettled([...this.pending]), this.active.clear(), this.lifecycle = "destroyed";
    })(), this.destroyPromise;
  }
  async performRead(e, t, s) {
    const n = this.context, r = this.policy.fetch;
    (!n || !r) && this.assertReady("read-source");
    const o = new Headers(this.policy.headers);
    t && o.set("range", $v(t));
    let a;
    try {
      const b = {
        method: "GET",
        headers: o,
        credentials: this.policy.credentials,
        signal: s
      };
      a = await kv(r, e.source.uri, b, s);
    } catch (b) {
      throw Jo(b, e.assetId, s.aborted || e.signal.aborted || this.lifecycle !== "ready", s.reason);
    }
    if (!a.ok && a.status !== 206)
      throw Nv(a, e.assetId);
    t && Ov(a, t, e.assetId);
    const d = t && a.status === 206 ? Math.min(this.policy.maxBytes, t.length) : this.policy.maxBytes;
    let u;
    try {
      u = await xv(a, d, e.assetId, n.progress);
    } catch (b) {
      throw s.aborted || e.signal.aborted || this.lifecycle !== "ready" ? Jo(b, e.assetId, !0, s.reason) : b;
    }
    t && (u = zv(u, t, a.status === 206, e.assetId));
    const l = ts(a.headers.get("content-type")), f = ts(e.source.contentType);
    if (f && l && l !== f)
      throw U("mime-mismatch", "read-source", `Asset "${e.assetId}" expected ${f} but received ${l}.`, e.assetId);
    if (!t && e.source.expectedBytes !== void 0 && u.byteLength !== e.source.expectedBytes)
      throw U("source-read-failed", "read-source", `Asset "${e.assetId}" expected ${e.source.expectedBytes} bytes but received ${u.byteLength}.`, e.assetId);
    const h = fv(a.headers);
    let p;
    if (!t) {
      p = await Ho(u, e.source.integrity, e.assetId);
      const b = await Ho(u, h, e.assetId);
      p ?? (p = b);
    }
    const m = l ?? f, y = Cv(a.headers.get("etag"));
    return Object.freeze({
      source: e.source,
      bytes: u.slice(),
      ...m === void 0 ? {} : { contentType: m },
      ...y === void 0 ? {} : { etag: y },
      ...p === void 0 ? {} : { integrity: p }
    });
  }
  canonicalUrl(e, t, s) {
    try {
      return t === void 0 ? new URL(e).href : new URL(e, t).href;
    } catch (n) {
      throw U("source-not-found", "resolve-source", `Asset "${s}" has an invalid or unresolved source URL.`, s, "resolving", n);
    }
  }
  assertAllowed(e, t) {
    if (!this.policy.allowedProtocols.includes(e.protocol))
      throw U("source-access-denied", "resolve-source", `Protocol "${e.protocol}" is not allowed for asset "${t}".`, t, "resolving");
    if (e.username || e.password)
      throw U("source-access-denied", "resolve-source", "Credentials are not allowed in asset URLs.", t, "resolving");
    if (!(e.protocol !== "http:" && e.protocol !== "https:") && !(this.policy.allowedOrigins.includes("*") || this.policy.allowedOrigins.includes(e.origin)) && !(this.policy.allowedOrigins.includes("self") && this.policy.baseUrl && new URL(this.policy.baseUrl).origin === e.origin))
      throw U("source-access-denied", "resolve-source", `Origin "${e.origin}" is not allowed for asset "${t}".`, t, "resolving");
  }
  assertReady(e) {
    if (this.lifecycle === "destroying" || this.lifecycle === "destroyed")
      throw U("provider-destroyed", e, "Browser asset provider has been destroyed.");
    if (this.lifecycle !== "ready" || !this.context)
      throw U("provider-unavailable", e, "Browser asset provider is not initialized.");
  }
  throwIfCancelled(e, t, s) {
    if (e.aborted || this.context?.signal.aborted)
      throw U("aborted", t, `Asset operation "${t}" was aborted.`, s, "cancelled", e.reason);
  }
  track(e) {
    return this.pending.add(e), e.then(() => this.pending.delete(e), () => this.pending.delete(e)), e;
  }
}
const Pv = Object.freeze({
  id: "forgeng.assets.browser",
  contractVersion: Ot,
  implementationVersion: "1.0.0",
  capabilities: Object.freeze([
    Object.freeze({ id: cs.sourceRangeReads, version: "1.0.0" }),
    Object.freeze({ id: cs.sourceIntegrity, version: "1.0.0" })
  ]),
  create: (i) => new Rv(i)
}), Qo = "1.0.0";
class ze extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "PhysicsProviderContractError";
  }
}
const jv = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, Tv = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, Qc = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
function Ir(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Lv(i, e) {
  if (!Ir(i) || typeof i.id != "string" || !Tv.test(i.id))
    throw new ze("invalid-capability", `${e}.id`, `${e}.id must be a normalized capability id.`);
  if (typeof i.version != "string" || !Qc.test(i.version))
    throw new ze("invalid-capability", `${e}.version`, `${e}.version must be a semantic version.`);
}
function Mv(i) {
  if (!Ir(i))
    throw new ze("invalid-descriptor", "descriptor", "Physics provider descriptor must be an object.");
  if (typeof i.id != "string" || !jv.test(i.id))
    throw new ze("invalid-provider-id", "descriptor.id", "Physics provider id must be a normalized, namespaced id.");
  if (i.contractVersion !== Qo)
    throw new ze("incompatible-contract-version", "descriptor.contractVersion", `Physics provider contract ${String(i.contractVersion)} is incompatible; expected ${Qo}.`);
  if (typeof i.implementationVersion != "string" || !Qc.test(i.implementationVersion))
    throw new ze("invalid-implementation-version", "descriptor.implementationVersion", "Physics provider implementationVersion must be a semantic version.");
  if (!Array.isArray(i.capabilities))
    throw new ze("invalid-capability", "descriptor.capabilities", "Physics provider capabilities must be an array.");
  const e = /* @__PURE__ */ new Set();
  for (let t = 0; t < i.capabilities.length; t += 1) {
    const s = i.capabilities[t], n = `descriptor.capabilities[${t}]`;
    if (Lv(s, n), e.has(s.id))
      throw new ze("duplicate-capability", `${n}.id`, `Physics provider capability "${s.id}" is declared more than once.`);
    e.add(s.id);
  }
  if (typeof i.create != "function")
    throw new ze("invalid-factory", "descriptor.create", "Physics provider descriptor must define a create factory.");
}
function Zc(i) {
  return Mv(i), i;
}
function Vv(i) {
  if (!Ir(i) || typeof i.initialize != "function" || typeof i.createScene != "function" || typeof i.step != "function" || typeof i.destroy != "function")
    throw new ze("invalid-provider-instance", "provider", "Physics provider instance must implement initialize, createScene, step, and destroy.");
}
function Gv(i) {
  return Vv(i), i;
}
function Fv(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function Bv(i, e, t) {
  throw new ze(i, e, t);
}
function Uv(i) {
  return (!Fv(i) || typeof i.handle != "string" || i.handle.length === 0 || typeof i.createBody != "function" || typeof i.removeBody != "function" || typeof i.setBodyTransform != "function" || typeof i.applyBodyImpulse != "function" || typeof i.readBodySnapshot != "function" || typeof i.destroy != "function") && Bv("invalid-scene-scope", "sceneScope", "Physics scene scope must expose a handle and the complete body ownership lifecycle."), i;
}
function Wv(i) {
  const e = i.trim();
  return /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/.test(e) ? e : `id-${encodeURIComponent(i).replace(/\./g, "%2E") || "empty"}`;
}
class Yv {
  constructor(e, t, s) {
    c(this, "provider");
    c(this, "abortController");
    c(this, "sceneBridge");
    c(this, "destroyPromise", null);
    this.provider = e, this.abortController = t, this.sceneBridge = s;
  }
  async step(e, t) {
    for (let s = 0; s < t; s += 1)
      await this.provider.step({ deltaSeconds: e, stepIndex: s, stepCount: t });
  }
  destroy() {
    return this.destroyPromise || (this.abortController.abort(), this.destroyPromise = this.destroyOwners()), this.destroyPromise;
  }
  async destroyOwners() {
    const e = new fe();
    e.defer(() => this.provider.destroy()), this.sceneBridge && e.defer(() => this.sceneBridge.destroy()), await e.dispose();
  }
}
async function qv(i, e, t, s, n, r) {
  Zc(i);
  const o = Gv(i.create()), a = new AbortController(), d = new Yv(o, a, n), u = t.child("provider").child(Wv(i.id));
  try {
    await o.initialize({
      device: e,
      signal: a.signal,
      logger: Ct(u, {
        providerId: i.id,
        providerContractVersion: i.contractVersion,
        providerImplementationVersion: i.implementationVersion
      }),
      uiShell: r
    });
  } catch (l) {
    throw await d.destroy().catch(() => {
    }), l;
  }
  return n?.bind(o, i), d;
}
function Kv(i, e) {
  return Object.assign(
    new Error(`Physics scene scope for "${i}" failed validation.`),
    {
      name: "ForgeSceneContractError",
      code: "scene_physics_failed",
      operation: "scene.physics.prepareScene",
      currentState: "loading",
      requestedState: "active",
      remediation: "Check the configured physics provider implementation and scene initialization inputs.",
      details: Object.freeze({ sceneName: i }),
      cause: e
    }
  );
}
function Hv(i) {
  const e = i.toLowerCase().replace(/[^a-z0-9._:-]+/g, "-").replace(/^-+|-+$/g, "") || "unnamed";
  let t = 2166136261;
  for (let s = 0; s < i.length; s += 1)
    t ^= i.charCodeAt(s), t = Math.imul(t, 16777619);
  return `scene.${e}.${(t >>> 0).toString(16).padStart(8, "0")}`;
}
class Xv {
  constructor() {
    c(this, "provider", null);
    c(this, "capabilities", Object.freeze([]));
    c(this, "scopes", /* @__PURE__ */ new Map());
  }
  bind(e, t) {
    if (this.provider && this.provider !== e)
      throw new Error("Physics scene bridge is already bound to another provider.");
    this.provider = e, this.capabilities = Object.freeze([...t?.capabilities ?? []]);
  }
  async prepareScene(e) {
    if (!this.provider) {
      e.providerPhysics.scope = null, e.providerPhysics.status = "unavailable", e.providerPhysics.capabilities = Object.freeze([]), e.providerPhysics.lastError = null;
      return;
    }
    if (this.scopes.has(e) || e.providerPhysics.scope)
      throw new Error(`Physics scene scope for "${e.name}" is already active.`);
    e.providerPhysics.status = "loading", e.providerPhysics.capabilities = this.capabilities, e.providerPhysics.lastError = null;
    const t = this.provider.createScene({ id: Hv(e.name) });
    let s;
    try {
      s = Uv(t);
    } catch (n) {
      e.providerPhysics.status = "failed", e.providerPhysics.lastError = Kv(e.name, n);
      try {
        await t.destroy();
      } catch (r) {
        throw ls(n, r, "Invalid physics scene scope cleanup failed.");
      }
      throw n;
    }
    this.scopes.set(e, s), e.providerPhysics.scope = s, e.providerPhysics.status = "active", e.providerPhysics.capabilities = this.capabilities;
  }
  async releaseScene(e) {
    const t = this.scopes.get(e);
    e.providerPhysics.scope = null, e.providerPhysics.status = "unavailable", e.providerPhysics.lastError = null, t && (this.scopes.delete(e), await t.destroy());
  }
  async destroy() {
    this.provider = null, this.capabilities = Object.freeze([]);
    const e = Array.from(this.scopes.entries());
    this.scopes.clear();
    const t = new fe();
    for (const [s, n] of e)
      t.defer(async () => {
        s.providerPhysics.scope = null, s.providerPhysics.status = "unavailable", s.providerPhysics.capabilities = Object.freeze([]), s.providerPhysics.lastError = null, await n.destroy();
      });
    await t.dispose();
  }
}
function Jv(i) {
  return i === "disabled" ? null : i === void 0 || i === "default" ? Pv : i;
}
async function Qv(i, e, t, s, n) {
  if (!i) return null;
  const r = rv(), o = em({ deviceForGeneration: (d) => {
    const u = t.get(d);
    if (!u) throw Object.assign(new Error(`SDK_2D_GPU_GENERATION_MISSING: WebGPU generation ${d} is unavailable.`), { code: "SDK_2D_GPU_GENERATION_MISSING", path: "$.assets" });
    return u;
  } });
  s.retainProvider("assets-2d-realizers", { destroy: () => o.destroy() });
  const a = await br.create({
    manifests: e.manifests ?? [],
    sourceProvider: i,
    decoders: Object.freeze([...r.all, ...o.decoders, ...e.decoders ?? []]),
    realizers: Object.freeze([...cv(), ...o.realizers, ...e.realizers ?? []]),
    logger: Ct(n.child("assets").child("2d")),
    generation: 1
  });
  return s.retainAssetRuntime(a), a;
}
class Zv {
  constructor(e) {
    c(this, "bridge", new Xv());
    c(this, "descriptor");
    c(this, "runtime", null);
    this.descriptor = e === void 0 || e === "disabled" ? null : Zc(e);
  }
  get enabled() {
    return this.descriptor !== null;
  }
  get provider() {
    return this.runtime?.provider ?? null;
  }
  prepareScene(e) {
    return this.bridge.prepareScene(e);
  }
  releaseScene(e) {
    return this.bridge.releaseScene(e);
  }
  step(e, t) {
    return this.runtime?.step(e, t) ?? Promise.resolve();
  }
  async initialize(e, t, s) {
    return this.descriptor ? (this.runtime = await qv(
      this.descriptor,
      e,
      t,
      {},
      this.bridge,
      s
    ), this.runtime) : null;
  }
  async initializeForGame(e, t, s, n, r, o) {
    if (!this.descriptor) return;
    const a = t.get(e);
    if (!a)
      throw await r().catch(() => {
      }), Object.assign(new Error("SDK_2D_PHYSICS_DEVICE_MISSING: presentation backend did not expose its WebGPU device."), { code: "SDK_2D_PHYSICS_DEVICE_MISSING", path: "$.providers.physics" });
    try {
      const d = await this.initialize(a, s, o);
      d && n.retainPhysicsProvider(d);
    } catch (d) {
      throw await r().catch(() => {
      }), d;
    }
  }
}
function eI(i, e, t) {
  const s = {};
  for (const [n, r] of Object.entries(e)) s[n] = { value: r, enumerable: !0 };
  for (const [n, r] of Object.entries(t)) s[n] = { value: r };
  Object.defineProperties(i, s);
}
class tI {
  constructor() {
    c(this, "pendingReason", null);
    c(this, "handler", null);
    c(this, "notify", (e) => {
      this.handler ? this.handler(e) : this.pendingReason = e;
    });
  }
  bind(e, t, s, n) {
    if (this.handler = (r) => {
      const o = t.running;
      t.stop(), Promise.resolve().then(() => n?.()).then(() => e.recoverPresentation(r)).then(() => {
        o && e.inspect().state === "ready" && t.start();
      }).catch(s);
    }, this.pendingReason !== null) {
      const r = this.pendingReason;
      this.pendingReason = null, this.handler(r);
    }
  }
}
const Wn = "1.0.0", Xi = Object.freeze({
  playback: "playback",
  spatialAudio: "spatial-audio",
  voiceVirtualization: "voice-virtualization",
  uiContribution: "ui-contribution"
});
class Oe extends Error {
  constructor(t, s, n) {
    super(n);
    c(this, "code");
    c(this, "path");
    this.code = t, this.path = s, this.name = "AudioProviderContractError";
  }
}
const iI = /^[a-z0-9]+(?:[._-][a-z0-9]+)+$/, sI = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, ed = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
function zs(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function nI(i, e) {
  if (!zs(i) || typeof i.id != "string" || !sI.test(i.id))
    throw new Oe("invalid-capability", `${e}.id`, `${e}.id must be a normalized capability id.`);
  if (typeof i.version != "string" || !ed.test(i.version))
    throw new Oe("invalid-capability", `${e}.version`, `${e}.version must be a semantic version.`);
}
function rI(i) {
  if (!zs(i))
    throw new Oe("invalid-descriptor", "descriptor", "Audio provider descriptor must be an object.");
  if (typeof i.id != "string" || !iI.test(i.id))
    throw new Oe("invalid-provider-id", "descriptor.id", "Audio provider id must be a normalized, namespaced id.");
  if (i.contractVersion !== Wn)
    throw new Oe("incompatible-contract-version", "descriptor.contractVersion", `Audio provider contract ${String(i.contractVersion)} is incompatible; expected ${Wn}.`);
  if (typeof i.implementationVersion != "string" || !ed.test(i.implementationVersion))
    throw new Oe("invalid-implementation-version", "descriptor.implementationVersion", "Audio provider implementationVersion must be a semantic version.");
  if (!Array.isArray(i.capabilities))
    throw new Oe("invalid-capability", "descriptor.capabilities", "Audio provider capabilities must be an array.");
  const e = /* @__PURE__ */ new Set();
  if (i.capabilities.forEach((t, s) => {
    const n = `descriptor.capabilities[${s}]`;
    if (nI(t, n), e.has(t.id))
      throw new Oe("duplicate-capability", `${n}.id`, `Audio provider capability "${t.id}" is declared more than once.`);
    e.add(t.id);
  }), typeof i.create != "function")
    throw new Oe("invalid-factory", "descriptor.create", "Audio provider descriptor must define a create factory.");
}
function oI(i) {
  return rI(i), i;
}
function aI(i) {
  if (!zs(i) || typeof i.available != "boolean" || typeof i.loadClip != "function" || typeof i.play != "function" || typeof i.setMasterVolume != "function" || typeof i.resume != "function" || typeof i.suspend != "function" || typeof i.updateListener != "function")
    throw new Oe("invalid-backend", "provider.backend", "Audio provider backend is incomplete.");
}
function cI(i) {
  if (!zs(i) || typeof i.initialize != "function" || typeof i.destroy != "function")
    throw new Oe("invalid-provider-instance", "provider", "Audio provider instance must implement initialize and destroy.");
  aI(i.backend);
}
function dI(i) {
  return cI(i), i;
}
function lI(i, e) {
  const t = globalThis.AggregateError;
  return t ? new t(i, e) : Object.assign(new Error(e), { name: "AggregateError", errors: [...i] });
}
class cn {
  constructor(e) {
    c(this, "buffer");
    this.buffer = e;
  }
  get duration() {
    return Number.isFinite(this.buffer.duration) ? Math.max(0, this.buffer.duration) : 0;
  }
}
class uI {
  constructor(e, t, s, n) {
    c(this, "context");
    c(this, "ended");
    c(this, "resolveEnded");
    c(this, "stopTimer", null);
    c(this, "destroyed", !1);
    c(this, "source");
    c(this, "gain");
    c(this, "panner");
    this.context = e, this.source = t, this.gain = s, this.panner = n, this.ended = new Promise((r) => {
      this.resolveEnded = r;
    }), t.onended = () => this.destroy();
  }
  setGain(e, t = 0) {
    const s = this.gain?.gain;
    if (!s)
      return;
    const n = Math.max(0, Number.isFinite(e) ? e : 0);
    t > 0 && typeof s.setValueAtTime == "function" && typeof s.linearRampToValueAtTime == "function" && (s.setValueAtTime(s.value, this.context.currentTime), s.linearRampToValueAtTime(n, this.context.currentTime + t / 1e3)), s.value = n;
  }
  setPosition(e) {
    const t = this.panner;
    t && ("positionX" in t ? (t.positionX.value = e[0], t.positionY.value = e[1], t.positionZ.value = e[2]) : t.setPosition?.(e[0], e[1], e[2]));
  }
  stop(e = 0) {
    const t = this.source;
    if (t) {
      if (e > 0) {
        this.setGain(0, e), this.stopTimer !== null && clearTimeout(this.stopTimer), this.stopTimer = setTimeout(() => {
          this.stopTimer = null;
          try {
            t.stop();
          } catch {
          }
          this.destroy();
        }, e);
        return;
      }
      try {
        t.stop();
      } catch {
      }
      this.destroy();
    }
  }
  destroy() {
    if (this.destroyed)
      return;
    this.destroyed = !0, this.stopTimer !== null && clearTimeout(this.stopTimer), this.stopTimer = null;
    const e = this.source, t = this.gain, s = this.panner;
    this.source = null, this.gain = null, this.panner = null, e && (e.onended = null);
    try {
      e?.disconnect();
    } catch {
    }
    try {
      t?.disconnect();
    } catch {
    }
    try {
      s?.disconnect();
    } catch {
    }
    this.resolveEnded();
  }
}
function fI() {
  return {
    createContext: () => {
      if (typeof window > "u")
        return null;
      const i = window, e = i.AudioContext ?? i.webkitAudioContext;
      if (!e)
        return null;
      try {
        return new e();
      } catch {
        return null;
      }
    },
    fetch: (i, e) => fetch(i, e)
  };
}
class hI {
  constructor(e = fI(), t) {
    c(this, "platform");
    c(this, "context", null);
    c(this, "masterGain", null);
    c(this, "voices", /* @__PURE__ */ new Set());
    c(this, "spatialVoices", /* @__PURE__ */ new Set());
    c(this, "listenerValues", new Float32Array(9));
    c(this, "listenerValuesValid", !1);
    c(this, "lastListenerWriteTime", Number.NEGATIVE_INFINITY);
    c(this, "destroyPromise", null);
    c(this, "clipSource");
    this.platform = e, this.clipSource = t ?? {
      read: async (s, n) => {
        const r = await this.platform.fetch(s, n ? { signal: n } : void 0);
        if (!r.ok)
          throw new Error(`Failed to load audio: ${s} (${r.status} ${r.statusText})`);
        return r.arrayBuffer();
      }
    };
  }
  get available() {
    return this.context !== null && this.masterGain !== null;
  }
  async initialize() {
    if (this.destroyPromise)
      throw new Error("WebAudio backend is already destroyed.");
    if (this.context)
      return;
    const e = this.platform.createContext();
    if (e)
      try {
        const t = e.createGain();
        t.gain.value = 1, t.connect(e.destination), this.context = e, this.masterGain = t;
      } catch (t) {
        try {
          await e.close();
        } catch (s) {
          throw lI([t, s], "WebAudio backend initialization and rollback failed.");
        }
        throw t;
      }
  }
  getContext() {
    return this.context;
  }
  getMasterGain() {
    return this.masterGain;
  }
  async loadClip(e, t) {
    return new cn(await this.loadNativeClip(e, t));
  }
  async loadNativeClip(e, t) {
    if (!this.context)
      throw new Error(`WebAudio is unavailable; cannot decode clip: ${e}`);
    const s = await this.clipSource.read(e, t);
    return this.decodeNativeClip(s, e);
  }
  /** Realization seam used by assets-core; it never performs network I/O. */
  async decodeClipBytes(e, t) {
    t?.throwIfAborted();
    const s = await this.decodeNativeClip(e.slice().buffer, "asset source");
    return t?.throwIfAborted(), new cn(s);
  }
  async decodeNativeClip(e, t = "asset source") {
    const s = this.context;
    if (!s)
      throw new Error(`WebAudio is unavailable; cannot decode clip: ${t}`);
    return s.decodeAudioData(e);
  }
  play(e, t) {
    return e instanceof cn ? this.playNativeBufferDetailed(e.buffer, t)?.voice ?? null : null;
  }
  playNativeBufferDetailed(e, t) {
    const s = this.context, n = this.masterGain;
    if (!s || !n)
      return null;
    const r = s.createBufferSource(), o = s.createGain();
    let a = null;
    r.buffer = e, r.loop = t.loop, o.gain.value = Math.max(0, t.volume), o.connect(n), t.spatial ? (a = s.createPanner(), this.configurePanner(a, t.spatial), a.connect(o), r.connect(a)) : r.connect(o);
    const d = new uI(s, r, o, a);
    this.voices.add(d), a && this.spatialVoices.add(d), d.ended.then(() => {
      this.voices.delete(d), this.spatialVoices.delete(d);
    });
    const u = Number.isFinite(e.duration) ? Math.max(0, e.duration) : 0, l = Math.max(0, t.startOffsetSeconds), f = t.loop && u > 0 ? l % u : l;
    return r.start(0, f), { voice: d, source: r, gain: o, panner: a };
  }
  setMasterVolume(e) {
    this.masterGain && (this.masterGain.gain.value = Math.max(0, e));
  }
  async resume() {
    this.context && this.context.state !== "running" && await this.context.resume();
  }
  async suspend() {
    this.context?.state === "running" && await this.context.suspend();
  }
  updateListener(e) {
    const t = this.context?.listener;
    if (!t || this.spatialVoices.size === 0)
      return;
    const { position: s, forward: n, up: r } = e, o = [...s, ...n, ...r];
    if (this.listenerValuesValid && o.every((d, u) => this.listenerValues[u] === d))
      return;
    const a = this.context?.currentTime ?? 0;
    if (!(a - this.lastListenerWriteTime < 1 / 30))
      if (this.listenerValues.set(o), this.listenerValuesValid = !0, this.lastListenerWriteTime = a, "positionX" in t) {
        const d = [
          t.positionX,
          t.positionY,
          t.positionZ,
          t.forwardX,
          t.forwardY,
          t.forwardZ,
          t.upX,
          t.upY,
          t.upZ
        ];
        for (let u = 0; u < d.length; u += 1)
          d[u].cancelScheduledValues(0), d[u].setValueAtTime(o[u], a);
      } else {
        const d = t;
        d.setPosition(...s), d.setOrientation(...n, ...r);
      }
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyOwners()), this.destroyPromise;
  }
  async destroyOwners() {
    const e = this.context, t = Array.from(this.voices);
    this.context = null, this.masterGain = null, this.voices.clear(), this.spatialVoices.clear(), this.listenerValuesValid = !1, this.lastListenerWriteTime = Number.NEGATIVE_INFINITY;
    const s = new fe();
    e && s.defer(() => e.close());
    for (const n of t)
      s.defer(() => n.destroy());
    await s.dispose();
  }
  configurePanner(e, t) {
    e.panningModel = t.panningModel ?? "HRTF", e.distanceModel = t.distanceModel ?? "inverse", Number.isFinite(t.refDistance) && (e.refDistance = Math.max(0, t.refDistance)), Number.isFinite(t.maxDistance) && (e.maxDistance = Math.max(0, t.maxDistance)), Number.isFinite(t.rolloffFactor) && (e.rolloffFactor = Math.max(0, t.rolloffFactor)), Number.isFinite(t.coneInnerAngle) && (e.coneInnerAngle = Math.max(0, t.coneInnerAngle)), Number.isFinite(t.coneOuterAngle) && (e.coneOuterAngle = Math.max(0, t.coneOuterAngle)), Number.isFinite(t.coneOuterGain) && (e.coneOuterGain = Math.max(0, t.coneOuterGain)), t.position && this.setPannerPosition(e, t.position);
  }
  setPannerPosition(e, t) {
    "positionX" in e ? (e.positionX.value = t[0], e.positionY.value = t[1], e.positionZ.value = t[2]) : e.setPosition?.(...t);
  }
}
class pI {
  constructor(e = {}) {
    c(this, "backend");
    c(this, "uiHandle", null);
    c(this, "uiScope", null);
    c(this, "destroyPromise", null);
    c(this, "masterVolume", 1);
    this.backend = new hI(e.platform);
  }
  async initialize(e) {
    if (this.destroyPromise)
      throw new Error("WebAudio provider is already destroyed.");
    try {
      if (await this.backend.initialize(), e.signal.aborted)
        throw e.signal.reason;
      this.backend.available ? e.logger.info("WebAudio provider initialized.") : e.logger.warn("WebAudio is unavailable; audio is running in silent compatibility mode."), e.uiShell ? this.uiScope = await this.registerUi(e.uiShell) : this.uiHandle = e.ui?.register({
        id: "forgeng.audio.webaudio",
        title: "Audio",
        settings: [
          { id: "master-volume", label: "Master volume", kind: "number", minimum: 0, maximum: 1, step: 0.01 },
          { id: "runtime-status", label: "Runtime status", kind: "status" }
        ]
      }) ?? null;
    } catch (t) {
      try {
        await this.destroy();
      } catch (s) {
        throw ls(t, s, "WebAudio initialization and rollback failed.");
      }
      throw t;
    }
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyOwners()), this.destroyPromise;
  }
  async destroyOwners() {
    const e = this.uiHandle;
    this.uiHandle = null;
    const t = this.uiScope;
    this.uiScope = null;
    const s = new fe();
    s.defer(() => this.backend.destroy()), e && s.defer(() => e.dispose()), t && s.defer(() => t.dispose()), await s.dispose();
  }
  async registerUi(e) {
    const t = new fe(), s = (n) => {
      t.defer(() => n.dispose());
    };
    try {
      return s(e.settings.register({
        id: "forgeng.audio.webaudio.settings",
        title: "Audio settings",
        fields: [
          {
            id: "master-volume",
            label: "Master volume",
            kind: "number",
            minimum: 0,
            maximum: 1,
            step: 0.01,
            read: () => this.masterVolume,
            write: (n) => {
              const r = typeof n == "number" && Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : this.masterVolume;
              this.masterVolume = r, this.backend.setMasterVolume(r);
            }
          },
          {
            id: "runtime-status",
            label: "Runtime status",
            kind: "status",
            read: () => this.backend.available ? "Ready" : "Silent compatibility mode"
          }
        ]
      })), s(e.contributions.register({
        id: "forgeng.audio.webaudio.panel",
        title: "Audio",
        slot: "side-panel",
        order: 30,
        settingsSchemaId: "forgeng.audio.webaudio.settings"
      })), t;
    } catch (n) {
      try {
        await t.dispose();
      } catch (r) {
        throw ls(n, r, "WebAudio UI registration and rollback failed.");
      }
      throw n;
    }
  }
}
const mI = Object.freeze({
  id: "forgeng.audio.webaudio",
  contractVersion: Wn,
  implementationVersion: "1.0.3",
  capabilities: Object.freeze([
    { id: Xi.playback, version: "1.0.0" },
    { id: Xi.spatialAudio, version: "1.0.0" },
    { id: Xi.voiceVirtualization, version: "1.0.0" },
    { id: Xi.uiContribution, version: "1.0.0" }
  ]),
  create: (i) => new pI(i)
}), gI = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/;
function De(i, e, t, s) {
  return Object.assign(new Error(`${i}: ${t}`), { code: i, operation: `audio.${e}`, cause: s });
}
function At(i, e, t, s) {
  if (!Number.isFinite(i) || i < e || i > t)
    throw De("SDK_2D_AUDIO_CONFIG_INVALID", "configure", `${s} must be between ${e} and ${t}.`);
  return i;
}
function yI(i, e) {
  if (!i || typeof i != "object" || !gI.test(i.id))
    throw De("SDK_2D_AUDIO_CONFIG_INVALID", "configure", `audio.cues[${e}].id must be a normalized id.`);
  if (typeof i.url != "string" || i.url.length === 0)
    throw De("SDK_2D_AUDIO_CONFIG_INVALID", "configure", `audio.cues[${e}].url is required.`);
  return i.volume !== void 0 && At(i.volume, 0, 1, `audio.cues[${e}].volume`), i.startOffsetSeconds !== void 0 && At(i.startOffsetSeconds, 0, Number.MAX_VALUE, `audio.cues[${e}].startOffsetSeconds`), Object.freeze({ ...i });
}
class bI {
  constructor(e, t, s) {
    c(this, "root");
    c(this, "sceneId");
    c(this, "sceneGeneration");
    c(this, "api");
    c(this, "voices", /* @__PURE__ */ new Set());
    c(this, "stale", !1);
    this.root = e, this.sceneId = t, this.sceneGeneration = s, this.api = Object.freeze({
      get available() {
        return e.available;
      },
      get cueIds() {
        return e.cueIds;
      },
      load: (n) => this.run("load", async () => {
        await e.load(n);
      }),
      play: (n, r) => this.run("play", async () => {
        const o = await e.play(n, r);
        try {
          this.assertCurrent("play");
        } catch (a) {
          throw o?.stop(), a;
        }
        return o && this.voices.add(o), o?.ended.finally(() => this.voices.delete(o)), o;
      }),
      resume: () => this.run("resume", () => e.resume()),
      suspend: () => this.run("suspend", () => e.suspend()),
      setMasterVolume: (n) => {
        this.assertCurrent("set-master-volume"), e.setMasterVolume(n);
      },
      stopAll: (n) => this.stopAll(n),
      inspect: () => Object.freeze({ ...e.inspect(), activeVoices: this.voices.size })
    });
  }
  destroy() {
    this.stale || (this.stale = !0, this.stopVoices(), this.root.releaseScene(this));
  }
  async run(e, t) {
    this.assertCurrent(e);
    const s = await t();
    return this.assertCurrent(e), s;
  }
  assertCurrent(e) {
    if (this.stale) throw De(
      "SDK_2D_AUDIO_SCOPE_STALE",
      e,
      `audio scope for scene "${this.sceneId}" generation ${this.sceneGeneration} is retired.`
    );
  }
  stopAll(e) {
    this.assertCurrent("stop-all"), this.stopVoices(e);
  }
  stopVoices(e) {
    for (const t of [...this.voices]) t.stop(e);
    this.voices.clear();
  }
}
class wI {
  constructor(e, t = {}) {
    c(this, "selection");
    c(this, "options");
    c(this, "cueIds");
    c(this, "cues", /* @__PURE__ */ new Map());
    c(this, "clips", /* @__PURE__ */ new Map());
    c(this, "voices", /* @__PURE__ */ new Set());
    c(this, "scenes", /* @__PURE__ */ new Set());
    c(this, "abortController", new AbortController());
    c(this, "provider", null);
    c(this, "destroyPromise", null);
    this.selection = e, this.options = t;
    const s = /* @__PURE__ */ new Set();
    for (const [n, r] of (t.cues ?? []).entries()) {
      const o = yI(r, n);
      if (s.has(o.id)) throw De("SDK_2D_AUDIO_CUE_DUPLICATE", "configure", `duplicate cue "${o.id}".`);
      s.add(o.id), this.cues.set(o.id, o);
    }
    this.cueIds = Object.freeze([...s].sort()), t.masterVolume !== void 0 && At(t.masterVolume, 0, 1, "audio.masterVolume");
  }
  get available() {
    return this.provider?.backend.available === !0;
  }
  async initialize(e, t, s) {
    if (this.selection === void 0 || this.selection === "disabled") return;
    const n = oI(
      this.selection === "default" ? mI : this.selection
    );
    this.provider = dI(n.create()), s.retainProvider("audio", this);
    try {
      await this.provider.initialize({
        signal: this.abortController.signal,
        uiShell: e ?? void 0,
        logger: Ct(t.child("audio").child("provider"), {
          providerId: n.id,
          providerContractVersion: n.contractVersion,
          providerImplementationVersion: n.implementationVersion
        })
      }), this.options.masterVolume !== void 0 && this.provider.backend.setMasterVolume(this.options.masterVolume);
    } catch (r) {
      throw await this.destroy().catch(() => {
      }), r;
    }
  }
  createScene(e, t) {
    if (this.destroyPromise) throw De("SDK_2D_AUDIO_DESTROYED", "create-scene", "audio runtime is destroyed.");
    const s = new bI(this, e, t);
    return this.scenes.add(s), s;
  }
  releaseScene(e) {
    this.scenes.delete(e);
  }
  async load(e) {
    await this.loadClip(e);
  }
  async play(e, t = {}) {
    const s = this.requireProvider("play"), n = this.requireCue(e), r = await this.loadClip(e);
    if (this.destroyPromise) throw De("SDK_2D_AUDIO_DESTROYED", "play", "audio runtime is destroyed.");
    const o = Object.freeze({
      volume: At(t.volume ?? n.volume ?? 1, 0, 1, "audio.play.volume"),
      loop: t.loop ?? n.loop ?? !1,
      startOffsetSeconds: At(t.startOffsetSeconds ?? n.startOffsetSeconds ?? 0, 0, Number.MAX_VALUE, "audio.play.startOffsetSeconds"),
      enforceCooldown: t.enforceCooldown ?? n.enforceCooldown ?? !0,
      ...t.position === void 0 ? {} : { spatial: Object.freeze({ position: t.position }) },
      metadata: Object.freeze({ ...n.metadata ?? {}, ...t.metadata ?? {}, cueId: e })
    }), a = s.backend.play(r, o);
    return a ? this.trackVoice(e, a) : null;
  }
  resume() {
    return this.requireProvider("resume").backend.resume();
  }
  suspend() {
    return this.requireProvider("suspend").backend.suspend();
  }
  setMasterVolume(e) {
    this.requireProvider("set-master-volume").backend.setMasterVolume(At(e, 0, 1, "audio.masterVolume"));
  }
  stopAll(e) {
    for (const t of [...this.voices]) t.stop(e);
    this.voices.clear();
  }
  inspect() {
    return Object.freeze({
      snapshotVersion: 1,
      available: this.available,
      cueIds: this.cueIds,
      loadedCues: this.clips.size,
      activeVoices: this.voices.size
    });
  }
  destroy() {
    return this.destroyPromise || (this.destroyPromise = this.destroyOwners()), this.destroyPromise;
  }
  async loadClip(e) {
    const t = this.requireProvider("load"), s = this.requireCue(e);
    let n = this.clips.get(e);
    return n || (n = t.backend.loadClip(s.url, this.abortController.signal), this.clips.set(e, n), n.catch(() => {
      this.clips.get(e) === n && this.clips.delete(e);
    })), n;
  }
  requireProvider(e) {
    if (this.destroyPromise) throw De("SDK_2D_AUDIO_DESTROYED", e, "audio runtime is destroyed.");
    if (!this.provider) throw De("SDK_2D_AUDIO_UNAVAILABLE", e, "configure providers.audio to use audio.");
    return this.provider;
  }
  requireCue(e) {
    const t = this.cues.get(e);
    if (!t) throw De("SDK_2D_AUDIO_CUE_MISSING", "cue", `unknown cue "${e}".`);
    return t;
  }
  trackVoice(e, t) {
    let s = !1, n;
    const r = () => {
      s || (s = !0, this.voices.delete(n), t.destroy());
    };
    return n = Object.freeze({
      cueId: e,
      ended: t.ended.finally(r),
      get stopped() {
        return s;
      },
      setGain: (o, a) => {
        s || t.setGain(At(o, 0, 1, "audio.voice.gain"), a);
      },
      setPosition: (o) => {
        s || t.setPosition(o);
      },
      stop: (o) => {
        s || (t.stop(o), r());
      }
    }), this.voices.add(n), n;
  }
  async destroyOwners() {
    this.abortController.abort(De("SDK_2D_AUDIO_DESTROYED", "destroy", "audio runtime is shutting down."));
    for (const t of [...this.scenes]) t.destroy();
    this.stopAllAfterDestroy(), this.clips.clear();
    const e = this.provider;
    this.provider = null, await e?.destroy();
  }
  stopAllAfterDestroy() {
    for (const e of [...this.voices]) e.stop();
    this.voices.clear();
  }
}
const vI = /^[a-z0-9]+(?:[._/-][a-z0-9]+)*$/, Zo = Object.freeze({});
function Yn(i, e, t) {
  return Object.assign(new Error(`${i}: ${t}`), { code: i, operation: `hud.${e}` });
}
function ea(i) {
  return qn(JSON.parse(JSON.stringify(i)));
}
function qn(i) {
  if (i !== null && typeof i == "object" && !Object.isFrozen(i)) {
    if (Array.isArray(i)) for (const e of i) qn(e);
    else for (const e of Object.values(i)) qn(e);
    Object.freeze(i);
  }
  return i;
}
function II(i) {
  return i !== null && typeof i == "object" && !Array.isArray(i);
}
function ta(i) {
  if (typeof i == "string") return Object.freeze({ id: i });
  if (!II(i) || typeof i.id != "string") return null;
  const e = typeof i.volume == "number" ? i.volume : void 0, t = typeof i.loop == "boolean" ? i.loop : void 0, s = typeof i.startOffsetSeconds == "number" ? i.startOffsetSeconds : void 0, n = typeof i.enforceCooldown == "boolean" ? i.enforceCooldown : void 0;
  return Object.freeze({ id: i.id, options: Object.freeze({
    ...e === void 0 ? {} : { volume: e },
    ...t === void 0 ? {} : { loop: t },
    ...s === void 0 ? {} : { startOffsetSeconds: s },
    ...n === void 0 ? {} : { enforceCooldown: n }
  }) });
}
function ia(i) {
  if (i === void 0) return Object.freeze([]);
  if (Array.isArray(i)) return Object.freeze(i.map(ta).filter((t) => t !== null));
  const e = ta(i);
  return Object.freeze(e ? [e] : []);
}
class SI {
  constructor(e, t, s, n) {
    c(this, "root");
    c(this, "audio");
    c(this, "sceneId");
    c(this, "sceneGeneration");
    c(this, "hud");
    c(this, "adapter");
    c(this, "values", Zo);
    c(this, "revision", 0);
    c(this, "stale", !1);
    c(this, "active", !1);
    c(this, "listeners", /* @__PURE__ */ new Set());
    this.root = e, this.audio = t, this.sceneId = s, this.sceneGeneration = n, this.hud = Object.freeze({
      snapshot: () => this.snapshot(),
      value: (r) => this.values[r] ?? null,
      set: (r, o) => this.set(r, o),
      clear: (r) => this.clear(r),
      subscribe: (r) => this.subscribe(r)
    }), this.adapter = Object.freeze({
      publish: () => {
      },
      synchronize: (r, o) => this.synchronize(r, o),
      destroy: () => this.destroy()
    });
  }
  activate() {
    this.assertCurrent("activate"), this.active = !0, this.root.activate(this);
  }
  destroy() {
    this.stale || (this.stale = !0, this.active = !1, this.values = Zo, this.root.release(this), this.emit(null), this.listeners.clear());
  }
  current() {
    return this.active && !this.stale ? this.snapshot() : null;
  }
  snapshot() {
    return this.assertCurrent("snapshot"), Object.freeze({
      snapshotVersion: 1,
      sceneId: this.sceneId,
      sceneGeneration: this.sceneGeneration,
      revision: this.revision,
      values: this.values
    });
  }
  set(e, t) {
    this.assertChannel(e), this.assertCurrent("set"), this.values = Object.freeze({ ...this.values, [e]: ea(t) }), this.revision += 1;
    const s = this.snapshot();
    return this.emit(s), s;
  }
  clear(e) {
    this.assertCurrent("clear"), e !== void 0 && this.assertChannel(e);
    const t = { ...this.values };
    if (e === void 0) for (const n of Object.keys(t)) delete t[n];
    else delete t[e];
    this.values = Object.freeze(t), this.revision += 1;
    const s = this.snapshot();
    return this.emit(s), s;
  }
  subscribe(e) {
    this.assertCurrent("subscribe"), this.listeners.add(e);
    let t = !1;
    return Object.freeze({ dispose: () => {
      t || (t = !0, this.listeners.delete(e));
    } });
  }
  async synchronize(e, t) {
    this.assertCurrent("synchronize"), t.throwIfAborted();
    const s = Object.fromEntries(Object.keys(e).filter((o) => o.startsWith("hud/")).sort().map((o) => [o, ea(e[o])]));
    this.values = Object.freeze(s), this.revision += 1;
    const n = this.snapshot();
    this.emit(n);
    const r = [...ia(e["audio/cue"]), ...ia(e["audio/cues"])];
    for (const o of r)
      t.throwIfAborted(), await this.audio.play(o.id, o.options);
  }
  emit(e) {
    for (const t of this.listeners) t(e);
    this.active && this.root.notify(e);
  }
  assertCurrent(e) {
    if (this.stale) throw Yn(
      "SDK_2D_HUD_SCOPE_STALE",
      e,
      `HUD scope for scene "${this.sceneId}" generation ${this.sceneGeneration} is retired.`
    );
  }
  assertChannel(e) {
    if (!vI.test(e)) throw Yn("SDK_2D_HUD_CHANNEL_INVALID", "channel", `invalid channel "${e}".`);
  }
}
class EI {
  constructor() {
    c(this, "hud");
    c(this, "active", null);
    c(this, "scenes", /* @__PURE__ */ new Set());
    c(this, "listeners", /* @__PURE__ */ new Set());
    this.hud = Object.freeze({
      snapshot: () => this.active?.current() ?? null,
      value: (e) => this.active?.current()?.values[e] ?? null,
      set: (e, t) => this.requireActive("set").hud.set(e, t),
      clear: (e) => this.requireActive("clear").hud.clear(e),
      subscribe: (e) => {
        this.listeners.add(e);
        let t = !1;
        return Object.freeze({ dispose: () => {
          t || (t = !0, this.listeners.delete(e));
        } });
      }
    });
  }
  createScene(e, t, s) {
    const n = new SI(this, s, e, t);
    return this.scenes.add(n), n;
  }
  activate(e) {
    this.active = e, this.notify(e.current());
  }
  release(e) {
    this.scenes.delete(e), this.active === e && (this.active = null, this.notify(null));
  }
  notify(e) {
    for (const t of this.listeners) t(e);
  }
  destroy() {
    for (const e of [...this.scenes]) e.destroy();
    this.listeners.clear(), this.active = null;
  }
  requireActive(e) {
    if (!this.active) throw Yn("SDK_2D_HUD_SCENE_INACTIVE", e, "no active 2D HUD scene is available.");
    return this.active;
  }
}
const sa = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/, dn = "slots.index";
function Be(i, e, t, s) {
  return Object.assign(new Error(`${i}: ${t}`), { code: i, operation: `saves.${e}`, cause: s });
}
function na(i) {
  return new TextEncoder().encode(JSON.stringify(i));
}
function ra(i, e) {
  try {
    return JSON.parse(new TextDecoder().decode(i));
  } catch (t) {
    throw Be("SDK_2D_SAVE_CORRUPT", e, "stored save data is not valid JSON.", t);
  }
}
class AI {
  constructor(e, t, s) {
    c(this, "gameId");
    c(this, "gameplay");
    c(this, "area");
    c(this, "slots", /* @__PURE__ */ new Set());
    c(this, "tail", Promise.resolve());
    this.gameId = e, this.gameplay = t, this.area = s?.openNamespace("gameplay-saves") ?? null;
  }
  get available() {
    return this.area !== null && this.gameplay !== null;
  }
  save(e, t) {
    return this.run(async () => {
      const s = this.requireArea("save"), n = this.requireGameplay("save");
      this.assertSlot(e);
      const r = n.scenes.current();
      if (!r) throw Be("SDK_2D_SAVE_SCENE_INACTIVE", "save", "cannot save without an active gameplay scene.");
      const o = n.checkpoints.create(t ?? `save-${e}`), a = Object.freeze({
        schema: "forgeng.2d-save",
        version: 1,
        gameId: this.gameId,
        sceneId: r.id,
        checkpoint: o
      });
      return await s.set(e, na(a)), this.slots.add(e), await this.writeIndex(s), o;
    });
  }
  load(e) {
    return this.run(async () => {
      const t = this.requireArea("load"), s = this.requireGameplay("load"), n = await this.read(t, e, "load");
      return s.scenes.current()?.id !== n.sceneId && await s.scenes.activate(n.sceneId), await s.checkpoints.restore(n.checkpoint), this.slots.add(e), n.checkpoint;
    });
  }
  replay(e, t, s) {
    return this.run(async () => {
      const n = this.requireArea("replay"), r = this.requireGameplay("replay"), o = await this.read(n, e, "replay");
      return r.scenes.current()?.id !== o.sceneId && await r.scenes.activate(o.sceneId), r.checkpoints.replay(o.checkpoint, t, s);
    });
  }
  remove(e) {
    return this.run(async () => {
      const t = this.requireArea("remove");
      this.assertSlot(e);
      const s = await t.remove(e);
      return this.slots.delete(e), await this.writeIndex(t), s;
    });
  }
  list() {
    return this.run(async () => {
      const t = await this.requireArea("list").get(dn);
      if (this.slots.clear(), t) {
        const s = ra(t, "list");
        if (!Array.isArray(s) || s.some((n) => typeof n != "string" || !sa.test(n)))
          throw Be("SDK_2D_SAVE_CORRUPT", "list", "stored save index is invalid.");
        for (const n of s) this.slots.add(n);
      }
      return Object.freeze([...this.slots].sort());
    });
  }
  inspect() {
    return Object.freeze({ snapshotVersion: 1, available: this.available, slots: Object.freeze([...this.slots].sort()) });
  }
  run(e) {
    const t = this.tail.then(e, e);
    return this.tail = t.then(() => {
    }, () => {
    }), t;
  }
  async read(e, t, s) {
    this.assertSlot(t);
    const n = await e.get(t);
    if (!n) throw Be("SDK_2D_SAVE_MISSING", s, `save slot "${t}" does not exist.`);
    const r = ra(n, s);
    if (r.schema !== "forgeng.2d-save" || r.version !== 1 || r.gameId !== this.gameId || typeof r.sceneId != "string" || !r.checkpoint || typeof r.checkpoint != "object")
      throw Be("SDK_2D_SAVE_CORRUPT", s, `save slot "${t}" is incompatible with game "${this.gameId}".`);
    return r;
  }
  async writeIndex(e) {
    await e.set(dn, na([...this.slots].sort()));
  }
  assertSlot(e) {
    if (!sa.test(e)) throw Be("SDK_2D_SAVE_SLOT_INVALID", "slot", `invalid save slot "${e}".`);
    if (e === dn) throw Be("SDK_2D_SAVE_SLOT_INVALID", "slot", "save slot is reserved.");
  }
  requireArea(e) {
    if (!this.area) throw Be("SDK_2D_SAVE_STORAGE_UNAVAILABLE", e, "configure a storage provider to use saves.");
    return this.area;
  }
  requireGameplay(e) {
    if (!this.gameplay) throw Be("SDK_2D_SAVE_GAMEPLAY_UNAVAILABLE", e, "configure a gameplay definition to use saves and replay.");
    return this.gameplay;
  }
}
function xI(i) {
  return typeof i == "string" || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement ? { target: i } : i ?? {};
}
function oa(i, e) {
  const t = am(i, {
    width: e.width ?? 1280,
    height: e.height ?? 720,
    pixelRatio: e.pixelRatio,
    maxPixelRatio: e.maxPixelRatio ?? 4
  });
  return Object.freeze({
    revision: 1,
    logicalSize: Object.freeze([
      Math.max(1, i.clientWidth || Math.round(t.width / t.pixelRatio)),
      Math.max(1, i.clientHeight || Math.round(t.height / t.pixelRatio))
    ]),
    physicalSize: Object.freeze([t.width, t.height]),
    pixelRatio: t.pixelRatio,
    maximumPixelRatio: e.maxPixelRatio ?? 4,
    safeArea: Object.freeze([0, 0, 0, 0]),
    visible: typeof document > "u" || !document.hidden && document.visibilityState !== "hidden"
  });
}
const _I = 268435455, $I = 2147483648, zI = 1073741824, OI = 536870912;
function Ke(i, e, t) {
  return Object.assign(new TypeError(`${i} at ${e}: ${t}`), { code: i, path: e });
}
function DI(i) {
  const e = [];
  if (i.chunks.length > 0) for (const t of i.chunks) for (let s = 0; s < t.gids.length; s += 1)
    e.push({ x: i.x + t.x + s % t.width, y: i.y + t.y + Math.floor(s / t.width), rawGid: t.gids[s] });
  else for (let t = 0; t < i.gids.length; t += 1)
    e.push({ x: i.x + t % i.width, y: i.y + Math.floor(t / i.width), rawGid: i.gids[t] });
  return e;
}
function aa(i, e) {
  const t = e * Math.PI / 180, s = Math.cos(t), n = Math.sin(t);
  return [i[0] * s - i[1] * n, i[0] * n + i[1] * s];
}
function CI(i) {
  if (i.shape === "point" || i.shape === "polyline" || i.shape === "text" || i.shape === "tile")
    throw Ke("SDK_2D_TILE_COLLISION_SHAPE_UNSUPPORTED", "$.tileset.tiles.collisionObjects", `Tiled ${i.shape} object ${i.id} cannot become a collider.`);
  const e = [[0, 0], [i.width, 0], [i.width, i.height], [0, i.height]], t = i.shape === "polygon" ? i.points.map((u) => aa([u.x, u.y], i.rotation)) : e.map((u) => aa(u, i.rotation));
  if (t.length === 0) throw Ke("SDK_2D_TILE_COLLISION_SHAPE_INVALID", "$.tileset.tiles.collisionObjects", `Tiled object ${i.id} has no area.`);
  const s = t.map((u) => u[0] + i.x), n = t.map((u) => u[1] + i.y), r = Math.min(...s), o = Math.min(...n), a = Math.max(...s) - r, d = Math.max(...n) - o;
  if (!(a > 0 && d > 0)) throw Ke("SDK_2D_TILE_COLLISION_SHAPE_INVALID", "$.tileset.tiles.collisionObjects", `Tiled object ${i.id} must have positive area.`);
  return { x: r, y: o, width: a, height: d };
}
function NI(i, e, t, s, n) {
  if ((n & OI) !== 0) throw Ke("SDK_2D_TILE_COLLISION_FLIP_UNSUPPORTED", "$.layers.gids", "diagonally flipped collision tiles are not supported.");
  let r = e.x + e.width * 0.5, o = e.y + e.height * 0.5;
  (n & $I) !== 0 && (r = t - r), (n & zI) !== 0 && (o = s - o);
  const a = Object.freeze([r, o]);
  return i.shape === "ellipse" && i.rotation === 0 && Math.abs(e.width - e.height) <= Number.EPSILON ? Object.freeze({ kind: "circle", radius: e.width * 0.5, offset: a }) : Object.freeze({ kind: "aabb", size: Object.freeze([e.width, e.height]), offset: a });
}
function kI(i, e) {
  if (i.kind !== "tilemap/tiled-json" || i.normalizationVersion !== 1) throw Ke("SDK_2D_TILEMAP_INVALID", "$.tilemap", "expected a normalized Tiled product.");
  if (i.orientation !== "orthogonal") throw Ke("SDK_2D_TILE_COLLISION_ORIENTATION_UNSUPPORTED", "$.tilemap.orientation", "only orthogonal collision maps are supported.");
  if (!e.entityId || !e.idPrefix) throw Ke("SDK_2D_TILE_COLLISION_OPTIONS_INVALID", "$.options", "entityId and idPrefix are required.");
  const t = e.maxColliders ?? 1e5;
  if (!Number.isSafeInteger(t) || t < 1) throw Ke("SDK_2D_TILE_COLLISION_OPTIONS_INVALID", "$.options.maxColliders", "expected a positive integer.");
  const s = /* @__PURE__ */ new Map();
  for (const a of i.tilesets) for (const d of a.tiles) s.set(a.firstGid + d.id, [a, d]);
  const n = e.layerPaths === void 0 ? null : new Set(e.layerPaths), r = [], o = (a, d, u) => {
    for (const l of a) {
      const f = [d[0] + l.offsetX, d[1] + l.offsetY], h = u && l.visible;
      if (l.type === "group") {
        o(l.layers, f, h);
        continue;
      }
      if (!(l.type !== "tilelayer" || !e.includeInvisible && !h || n && !n.has(l.path)))
        for (const p of DI(l)) {
          const m = p.rawGid & _I;
          if (m === 0) continue;
          const y = s.get(m);
          if (!y) continue;
          const [b, g] = y;
          for (const w of g.collisionObjects) {
            if (!e.includeInvisible && !w.visible) continue;
            if (r.length >= t) throw Ke("SDK_2D_TILE_COLLISION_LIMIT", "$.options.maxColliders", `tilemap exceeds ${t} generated colliders.`);
            const z = CI(w), O = NI(w, z, b.tileWidth, b.tileHeight, p.rawGid), S = O.offset, v = Object.freeze([f[0] + p.x * i.tileWidth + S[0], f[1] + p.y * i.tileHeight + S[1]]), I = Object.freeze({ ...O, offset: v });
            r.push(Object.freeze({
              id: `${e.idPrefix}:${l.id}:${p.x}:${p.y}:${w.id}`,
              entityId: e.entityId,
              shape: I,
              sensor: e.sensor ?? !1,
              ...e.filter === void 0 ? {} : { filter: e.filter }
            }));
          }
        }
    }
  };
  return o(i.layers, [0, 0], !0), Object.freeze(r);
}
function RI(i) {
  return i === void 0 || i === "disabled" ? null : i === "default" ? Eb : i;
}
function PI(i) {
  return i ?? "default";
}
function td(i) {
  return i === void 0 ? void 0 : Object.freeze({
    ...i.profile === void 0 ? {} : { profile: i.profile },
    ...i.maximumHistory === void 0 ? {} : { maximumHistory: i.maximumHistory },
    ...i.maximumSelections === void 0 ? {} : { maximumSelections: i.maximumSelections }
  });
}
function jI(i, e, t, s) {
  const n = new Ab(i, td(e));
  return s(n), t && n.profile !== "off" && e?.ui === !0 && s(new $b(t, n)), n;
}
const TI = "3.0.0";
function t0(i, e) {
  return kI(i, e);
}
function Ji(i, e, t) {
  return Object.assign(new TypeError(`${i} at ${e}: ${t}`), { code: i, path: e });
}
async function LI(i) {
  return bw(i), bm(async (e) => {
    const t = Xm(i.logging);
    e.retainLogging(t.controller);
    const s = xI(i.canvas), n = i.size?.width ?? 1280, r = i.size?.height ?? 720, o = om(s.target, s.id);
    e.retainCanvasLayout(rm(o, {
      mode: s.layout ?? "fixed",
      width: n,
      height: r
    }));
    const a = oa(o, i.size ?? {}), d = await my(
      PI(i.providers?.storage),
      o,
      t.logger,
      e
    ), u = RI(i.providers?.ui), l = u ? await Dy(u, o, t.logger, e) : null, f = new wI(i.providers?.audio, i.audio);
    await f.initialize(l?.shell ?? null, t.logger, e);
    const h = await Ug(
      i.providers?.input ?? "default",
      o,
      t.logger,
      e
    ), p = i.gameplay ? Wg(i.actions ?? {}, i.gameplay) : i.actions, m = await Dg(p, d?.provider ?? null, e), y = /* @__PURE__ */ new Map(), b = await Qv(
      Jv(i.providers?.assets),
      i.assets ?? {},
      y,
      e,
      t.logger
    ), g = iu();
    e.retainEngine(g);
    const w = new Zv(i.providers?.physics), z = new EI();
    e.retainEngine(z);
    const O = i.gameplay ? new rw(i.gameplay, m, b, {
      audio: f.available,
      storage: d !== null,
      ui: l !== null
    }) : null, S = new AI(i.gameplay?.id ?? "forgeng.2d", O?.api ?? null, d?.provider ?? null), v = /* @__PURE__ */ new Map();
    for (const F of i.scenes) v.set(F.id, g.definitions.register(F.render));
    const I = /* @__PURE__ */ new Map();
    let x = 0;
    const R = i.scenes.map((F) => yw(
      F,
      v.get(F.id),
      g,
      I,
      a,
      O,
      w,
      f,
      z,
      () => x
    )), P = Object.freeze({
      prepare: ({ sceneId: F }) => {
        const k = I.get(F);
        if (!k) throw Ji("SDK_2D_SCENE_INACTIVE", "$.presentation.scene", `scene "${F}" has no committed 2D attachment.`);
        return Object.freeze({
          sceneId: F,
          sceneGeneration: k.attachment.sceneGeneration,
          definition: k.attachment.definition,
          attachment: k.attachment,
          destroy: () => {
          }
        });
      }
    }), L = new tI(), H = i.presentation?.backend ?? zu({
      canvas: o,
      ...i.presentation?.backendOptions,
      onDeviceReady: (F, k) => {
        y.set(F, k);
      },
      onDeviceLost: L.notify
    }), Ie = i.presentation?.includeDefaultDomain !== !1, Z = td(i.inspection), G = Ie ? Hh({
      source: P,
      ...b ? { assets: b } : {},
      ...i.presentation?.domain,
      inspection: Z ?? i.presentation?.domain?.inspection
    }) : null, ee = Object.freeze([
      ...G ? [G] : [],
      ...i.presentation?.domains ?? []
    ]);
    if (ee.length === 0) throw Ji("SDK_2D_DOMAINS_REQUIRED", "$.presentation.domains", "composition must contain at least one domain.");
    const me = Object.freeze({
      apiVersion: 1,
      id: i.presentation?.id ?? "forgeng.preset:2d",
      backend: H,
      domains: ee,
      optionalDomainFailurePolicy: i.presentation?.optionalDomainFailurePolicy ?? "fail-composition"
    }), J = nw(H, ee), X = await dr.create({
      presentation: me,
      scenes: R,
      services: J.services,
      ...i.plugins === void 0 ? {} : { plugins: i.plugins },
      surface: {
        logicalWidth: a.logicalSize[0],
        logicalHeight: a.logicalSize[1],
        pixelRatio: a.pixelRatio,
        visible: a.visible
      }
    });
    J.bind(() => X.inspect().presentation);
    const pt = X.step.bind(X), Xt = X.startScene.bind(X);
    await w.initializeForGame(
      X.inspect().presentation.backend.generation,
      y,
      t.logger,
      e,
      X.destroy.bind(X),
      l?.shell ?? void 0
    ), e.retainEngine({ destroy: X.destroy.bind(X) });
    const at = async (F, k, ne) => {
      k > 0 && m.update(h.provider.sample()), await w.step(F, k), x += k, pt({ dt: F, steps: k, alpha: ne });
    }, _e = new vw(), Ne = new ww(
      (F, k, ne) => _e.run(() => at(F, k, ne)),
      i.fixedDeltaSeconds ?? 1 / 60,
      i.maximumFixedSteps ?? 5,
      (F) => t.logger.fatal("2D game loop stopped after an unhandled frame failure.", { error: F })
    );
    L.bind(X, Ne, (F) => t.logger.fatal("2D presentation recovery failed after device loss.", { error: F }), w.enabled ? () => {
      throw Ji("SDK_2D_PHYSICS_DEVICE_LOSS_RECREATE_REQUIRED", "$.providers.physics", "destroy and recreate the game after WebGPU device loss while physics is enabled.");
    } : void 0);
    const Se = jI({
      composition: () => X.inspect().presentation,
      engine: () => g.inspect(),
      scene: () => gs(I, () => X.inspect().scenes.active?.sceneId ?? null)?.attachment.inspectRuntime() ?? null,
      domain: () => G?.getInstances().at(-1)?.inspect2d() ?? null,
      definition: () => gs(I, () => X.inspect().scenes.active?.sceneId ?? null)?.attachment.definition ?? null
    }, i.inspection, l?.shell ?? null, (F) => e.retainInspection(F)), mt = pw(g, I, X, Se);
    eI(
      X,
      {
        canvas: o,
        loop: Ne,
        twoD: mt,
        actions: m,
        gameplay: O?.api ?? null,
        assets: b,
        ui: l?.shell ?? null,
        storage: d?.provider ?? null,
        physics: w.provider,
        audio: f,
        hud: z.hud,
        saves: S,
        logs: t.controller
      },
      {
        inspect2d: mt.inspect,
        inspect2dDetailed: mt.inspectDetailed,
        inspect2dDevtools: mt.devtools.inspect,
        destroy: () => e.destroy()
      }
    );
    const Ge = X;
    Object.defineProperty(Ge, "startScene", { value: (F) => _e.run(() => Xt(F)) }), O?.bind((F) => Ge.startScene(F)), e.retainLoop(_e), e.retainLoop(Ne), Object.defineProperty(Ge, "step", {
      value: (F) => {
        if (w.enabled) throw Ji("SDK_2D_PHYSICS_STEP_ASYNC_REQUIRED", "$.step", "use await game.stepAsync(...) while a physics provider is enabled.");
        const k = F.steps ?? 1;
        k > 0 && m.update(h.provider.sample()), x += k, pt(F);
      }
    }), Object.defineProperty(Ge, "stepAsync", {
      value: (F) => _e.run(() => at(F.dt, F.steps ?? 1, F.alpha ?? 0))
    });
    for (const F of i.assets?.preload ?? []) await b?.preload(F);
    const Oi = (typeof i.boot == "string" ? i.boot : i.boot?.scene) ?? i.gameplay?.initialScene.id ?? i.scenes[0].id;
    await Ge.startScene(Oi);
    const Di = () => {
      const F = oa(o, i.size ?? {});
      for (const k of I.values()) k.attachment.resize(F);
      Ge.resize({
        logicalWidth: F.logicalSize[0],
        logicalHeight: F.logicalSize[1],
        pixelRatio: F.pixelRatio,
        visible: F.visible
      });
    };
    return i.size?.autoResize !== !1 && (typeof ResizeObserver < "u" ? e.observeResize(new ResizeObserver(Di), o) : e.listenForResize(window, Di)), (typeof i.boot == "object" ? i.boot.autoStart : void 0) !== !1 && Ne.start(), Ge;
  });
}
const i0 = Object.freeze({ version: TI, create: LI }), MI = `struct Params { values: vec4f }
@group(0) @binding(0) var source_texture: texture_2d<f32>;
@group(0) @binding(1) var source_sampler: sampler;
@group(0) @binding(2) var<uniform> params: Params;
struct Output { @builtin(position) position: vec4f, @location(0) uv: vec2f }
@vertex fn vs_effect(@builtin(vertex_index) index: u32) -> Output {
    let positions = array<vec2f,3>(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0));
    var output: Output; output.position = vec4f(positions[index],0.0,1.0); output.uv = positions[index] * vec2f(0.5,-0.5) + vec2f(0.5); return output;
}
@fragment fn fs_color_adjust(input: Output) -> @location(0) vec4f {
    let sampled = textureSample(source_texture, source_sampler, input.uv); var color = sampled.rgb + vec3f(params.values.x);
    color = (color - vec3f(0.5)) * params.values.y + vec3f(0.5); let luma = dot(color, vec3f(0.2126,0.7152,0.0722));
    color = mix(vec3f(luma), color, params.values.z); return vec4f(color, sampled.a);
}
`, VI = 8, GI = 64, ln = 2;
class FI {
  constructor(e, t, s) {
    c(this, "device");
    c(this, "definition");
    c(this, "fail");
    c(this, "buffers", /* @__PURE__ */ new Map());
    c(this, "pipelines", /* @__PURE__ */ new Map());
    c(this, "sampler");
    c(this, "passes", 0);
    c(this, "destroyed", !1);
    this.device = e, this.definition = t, this.fail = s, this.sampler = e.createSampler({ label: "ForgeNG Effects2D linear sampler", minFilter: "linear", magFilter: "linear" });
  }
  encode(e, t) {
    this.assertAlive();
    let s = 0;
    for (const n of [...this.definition.effects].filter((r) => r.enabled !== !1).sort((r, o) => (r.order ?? 0) - (o.order ?? 0) || r.id.localeCompare(o.id))) {
      const r = t.access(n.input, e), o = t.access(n.output, e), a = this.pipeline(o.format);
      let d = this.buffers.get(n.id);
      d || (d = this.device.createBuffer({ label: `ForgeNG effect ${n.id} parameters`, size: 16, usage: GI | VI }), this.buffers.set(n.id, d));
      const u = n.options ?? {};
      this.device.queue.writeBuffer(d, 0, new Float32Array([u.brightness ?? 0, u.contrast ?? 1, u.saturation ?? 1, 0]));
      const l = this.device.createBindGroup({ label: `ForgeNG effect ${n.id} bindings`, layout: a.layout, entries: [{ binding: 0, resource: r.view }, { binding: 1, resource: this.sampler }, { binding: 2, resource: { buffer: d } }] }), f = e.encoder.beginRenderPass({ label: `ForgeNG effect ${n.id}`, colorAttachments: [{ view: o.view, loadOp: "clear", storeOp: "store", clearValue: { r: 0, g: 0, b: 0, a: 0 } }] });
      f.setViewport(0, 0, o.width, o.height, 0, 1), f.setScissorRect(0, 0, o.width, o.height), f.setPipeline(a.pipeline), f.setBindGroup(0, l), f.draw(3), f.end(), s += 1;
    }
    return this.passes += s, s;
  }
  inspect() {
    return Object.freeze({ buffers: this.buffers.size, pipelines: this.pipelines.size, passes: this.passes, gpuResources: 1 + this.buffers.size + this.pipelines.size * 4 });
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const e of this.buffers.values()) e.destroy();
      this.buffers.clear(), this.pipelines.clear();
    }
  }
  pipeline(e) {
    const t = this.pipelines.get(e);
    if (t) return t;
    this.fail("shader-module");
    const s = this.device.createShaderModule({ label: "ForgeNG color-adjust2D shader", code: MI });
    this.fail("bind-group-layout");
    const n = this.device.createBindGroupLayout({ label: "ForgeNG color-adjust2D bindings", entries: [{ binding: 0, visibility: ln, texture: { sampleType: "float", viewDimension: "2d" } }, { binding: 1, visibility: ln, sampler: { type: "filtering" } }, { binding: 2, visibility: ln, buffer: { type: "uniform", minBindingSize: 16 } }] });
    this.fail("pipeline-layout");
    const r = this.device.createPipelineLayout({ label: "ForgeNG color-adjust2D layout", bindGroupLayouts: [n] });
    this.fail("pipeline");
    const o = this.device.createRenderPipeline({ label: "ForgeNG color-adjust2D pipeline", layout: r, vertex: { module: s, entryPoint: "vs_effect" }, fragment: { module: s, entryPoint: "fs_color_adjust", targets: [{ format: e }] }, primitive: { topology: "triangle-list", cullMode: "none" } }), a = Object.freeze({ layout: n, pipeline: o });
    return this.pipelines.set(e, a), a;
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Effects2dFeature is destroyed.");
  }
}
const BI = `struct Camera2d { clip_x: vec4f, clip_y: vec4f }
struct Sprite2dInstance { basis: vec4f, translation_size: vec4f, uv_rect: vec4f, tint: vec4f, trim: vec4f, pivot_flip: vec4f, nine_slice: vec4f, source_flags: vec4f }
struct Material2d { tint_multiplier: vec4f, custom_0: vec4f, custom_1: vec4f, custom_2: vec4f }
struct Light2d { position_radius: vec4f, color_intensity: vec4f }
struct Lighting2d { ambient: vec4f, metadata: vec4f, lights: array<Light2d> }
struct VertexOutput { @builtin(position) position: vec4f, @location(0) uv: vec2f, @location(1) tint: vec4f, @location(2) world: vec2f }
@group(0) @binding(0) var<uniform> camera: Camera2d;
@group(0) @binding(1) var<storage, read> instances: array<Sprite2dInstance>;
@group(0) @binding(2) var sprite_texture: texture_2d<f32>;
@group(0) @binding(3) var sprite_sampler: sampler;
@group(0) @binding(4) var<uniform> material: Material2d;
@group(0) @binding(5) var normal_texture: texture_2d<f32>;
@group(0) @binding(6) var<storage, read> lighting: Lighting2d;
@group(0) @binding(7) var<storage, read> shadow_segments: array<vec4f>;
const QUAD: array<vec2f, 6> = array<vec2f, 6>(vec2f(0.0), vec2f(1.0,0.0), vec2f(0.0,1.0), vec2f(0.0,1.0), vec2f(1.0,0.0), vec2f(1.0));
fn cross2(a: vec2f, b: vec2f) -> f32 { return a.x * b.y - a.y * b.x; }
fn blocked(origin: vec2f, light_position: vec2f) -> bool {
    let ray = light_position - origin;
    for (var i = 0u; i < u32(lighting.metadata.y); i += 1u) {
        let segment = shadow_segments[i]; let a = segment.xy; let edge = segment.zw - a;
        let denominator = cross2(ray, edge);
        if (abs(denominator) > 0.00001) {
            let delta = a - origin; let t = cross2(delta, edge) / denominator; let u = cross2(delta, ray) / denominator;
            if (t > 0.001 && t < 0.999 && u >= 0.0 && u <= 1.0) { return true; }
        }
    }
    return false;
}
@vertex fn vs_sprite(@builtin(vertex_index) vertex_index: u32, @builtin(instance_index) instance_index: u32) -> VertexOutput {
    let instance = instances[instance_index]; let local = QUAD[vertex_index] * instance.translation_size.zw;
    let pivoted = local - instance.pivot_flip.xy * instance.translation_size.zw;
    let world = instance.translation_size.xy + vec2f(instance.basis.x*pivoted.x + instance.basis.z*pivoted.y, instance.basis.y*pivoted.x + instance.basis.w*pivoted.y);
    let world3 = vec3f(world, 1.0); var output: VertexOutput;
    output.position = vec4f(dot(camera.clip_x.xyz, world3), dot(camera.clip_y.xyz, world3), 0.0, 1.0);
    var uvLocal = QUAD[vertex_index]; if (instance.pivot_flip.z < 0.0) { uvLocal.x = 1.0-uvLocal.x; } if (instance.pivot_flip.w < 0.0) { uvLocal.y = 1.0-uvLocal.y; }
    output.uv = instance.uv_rect.xy + uvLocal * instance.uv_rect.zw; output.tint = instance.tint * material.tint_multiplier; output.world = world; return output;
}
@fragment fn fs_sprite_lit(input: VertexOutput) -> @location(0) vec4f {
    let albedo = textureSample(sprite_texture, sprite_sampler, input.uv) * input.tint;
    let encoded = textureSample(normal_texture, sprite_sampler, input.uv).xyz;
    let normal = normalize(vec3f(encoded.x * 2.0 - 1.0, -(encoded.y * 2.0 - 1.0), encoded.z * 2.0 - 1.0));
    var illumination = lighting.ambient.rgb;
    for (var i = 0u; i < u32(lighting.metadata.x); i += 1u) {
        let light = lighting.lights[i]; let delta = light.position_radius.xy - input.world; let distance = length(delta); let radius = max(0.0001, light.position_radius.z);
        if (distance < radius && (light.position_radius.w < 0.5 || !blocked(input.world, light.position_radius.xy))) {
            let direction = vec3f(delta / max(distance, 0.0001), 0.25); let diffuse = max(0.0, dot(normal, normalize(direction)));
            illumination += light.color_intensity.rgb * light.color_intensity.w * diffuse * (1.0 - distance / radius);
        }
    }
    return vec4f(albedo.rgb * illumination, albedo.a);
}
@fragment fn fs_mask(input: VertexOutput) -> @location(0) vec4f { if (textureSample(sprite_texture, sprite_sampler, input.uv).a <= 0.001) { discard; } return vec4f(0.0); }
`, ca = 8, da = 128, un = 1, Mt = 2, UI = 15;
function la(i, e) {
  const t = i ?? { position: [0, 0], rotation: 0, scale: [1, 1] }, s = Math.cos(t.rotation), n = Math.sin(t.rotation);
  return Object.freeze([t.position[0] + s * t.scale[0] * e[0] - n * t.scale[1] * e[1], t.position[1] + n * t.scale[0] * e[0] + s * t.scale[1] * e[1]]);
}
function WI(i) {
  if (i.kind === "polygon") return i.points.map((s) => la(i.transform, s));
  const e = i.rect;
  return [[e[0], e[1]], [e[0] + e[2], e[1]], [e[0] + e[2], e[1] + e[3]], [e[0], e[1] + e[3]]].map((s) => la(i.transform, s));
}
class YI {
  constructor(e, t, s, n, r) {
    c(this, "device");
    c(this, "definition");
    c(this, "fail");
    c(this, "resources", []);
    c(this, "pipelines", /* @__PURE__ */ new Map());
    c(this, "counts", /* @__PURE__ */ new Map());
    c(this, "maxLights");
    c(this, "maxShadowSegments");
    c(this, "shadows");
    c(this, "destroyed", !1);
    if (this.device = e, this.definition = t, this.fail = n, s.capability !== He) throw new TypeError("Lighting2dFeature received the wrong capability.");
    const o = s.options ?? {};
    this.maxLights = Number(o.maxLightsPerCamera ?? 32), this.maxShadowSegments = Number(o.maxShadowSegmentsPerCamera ?? 2048), this.shadows = o.shadows === "hard" && r;
  }
  prepareCamera(e, t, s) {
    this.assertAlive();
    const n = this.cameraResources(e), r = new Map(s.items.filter((p) => p.kind === "light").map((p) => [p.id, p])), o = [t.effectivePosition[0], t.effectivePosition[1]], a = (p) => !p || p.length === 0 || t.layers.length === 0 || p.some((m) => t.layers.includes(m)), d = [0, 0, 0], u = this.definition.lights.filter((p) => p.enabled !== !1 && a(p.layers)).flatMap((p) => {
      if (p.kind === "ambient")
        return d[0] += p.color[0] * p.intensity, d[1] += p.color[1] * p.intensity, d[2] += p.color[2] * p.intensity, [];
      if (p.kind !== "point") return [];
      const m = r.get(p.id)?.transform ? [r.get(p.id).transform[4], r.get(p.id).transform[5]] : p.transform?.position ?? [0, 0], y = Math.hypot(m[0] - o[0], m[1] - o[1]), b = Math.hypot(t.virtualSize[0], t.virtualSize[1]) / Math.max(t.zoom, Number.EPSILON) / 2;
      return y <= (p.radius ?? 0) + b ? [{ light: p, position: m, distance: y }] : [];
    }).sort((p, m) => p.distance - m.distance || p.light.id.localeCompare(m.light.id)).slice(0, this.maxLights), l = [];
    if (this.shadows && u.some((p) => p.light.shadow?.enabled)) for (const p of this.definition.shadowCasters) {
      if (p.enabled === !1 || !a(p.layers) || l.length / 4 >= this.maxShadowSegments) continue;
      const m = WI(p);
      for (let y = 0; y < m.length && l.length / 4 < this.maxShadowSegments; y++) {
        const b = m[(y + 1) % m.length];
        l.push(m[y][0], m[y][1], b[0], b[1]);
      }
    }
    const f = new Float32Array(8 + this.maxLights * 8);
    f.set([d[0], d[1], d[2], 1, u.length, l.length / 4, 0, 0]), u.forEach((p, m) => f.set([p.position[0], p.position[1], p.light.radius ?? 0, this.shadows && p.light.shadow?.enabled ? 1 : 0, p.light.color[0], p.light.color[1], p.light.color[2], p.light.intensity], 8 + m * 8)), this.device.queue.writeBuffer(n.lights, 0, f), this.device.queue.writeBuffer(n.shadows, 0, new Float32Array(l.length > 0 ? l : [0, 0, 0, 0]));
    const h = Object.freeze({ visibleLights: u.length, shadowSegments: l.length / 4 });
    return this.counts.set(e, h), h;
  }
  pipeline(e, t, s, n) {
    this.assertAlive();
    const r = `${e}:${t}:${s.blendMode}:${n}`, o = this.pipelines.get(r);
    if (o) return o;
    this.fail("shader-module");
    const a = this.device.createShaderModule({ label: "ForgeNG lit Sprite2D pipeline", code: BI });
    this.fail("bind-group-layout");
    const d = this.device.createBindGroupLayout({ label: "ForgeNG lit Sprite2D bindings", entries: [
      { binding: 0, visibility: un, buffer: { type: "uniform", minBindingSize: 32 } },
      { binding: 1, visibility: un, buffer: { type: "read-only-storage", minBindingSize: 128 } },
      { binding: 2, visibility: Mt, texture: { sampleType: "float", viewDimension: "2d" } },
      { binding: 3, visibility: Mt, sampler: { type: "filtering" } },
      { binding: 4, visibility: un | Mt, buffer: { type: "uniform", minBindingSize: 64 } },
      { binding: 5, visibility: Mt, texture: { sampleType: "float", viewDimension: "2d" } },
      { binding: 6, visibility: Mt, buffer: { type: "read-only-storage", minBindingSize: 64 } },
      { binding: 7, visibility: Mt, buffer: { type: "read-only-storage", minBindingSize: 16 } }
    ] });
    this.fail("pipeline-layout");
    const u = this.device.createPipelineLayout({ label: "ForgeNG lit Sprite2D layout", bindGroupLayouts: [d] }), l = n === "push" || n === "pop", f = { compare: n === "ignore" ? "always" : "equal", passOp: n === "push" ? "increment-clamp" : n === "pop" ? "decrement-clamp" : "keep" };
    this.fail("pipeline");
    const h = this.device.createRenderPipeline({
      label: "ForgeNG lit Sprite2D render pipeline",
      layout: u,
      vertex: { module: a, entryPoint: "vs_sprite" },
      fragment: { module: a, entryPoint: l ? "fs_mask" : "fs_sprite_lit", targets: [{ format: e, blend: l ? void 0 : Ka(s.blendMode), writeMask: l ? 0 : UI }] },
      primitive: { topology: "triangle-list", cullMode: "none" },
      ...n === "none" ? {} : { depthStencil: { format: "depth24plus-stencil8", depthWriteEnabled: !1, depthCompare: "always", stencilFront: f, stencilBack: f, stencilReadMask: 255, stencilWriteMask: l ? 255 : 0 } },
      multisample: { count: t }
    }), p = Object.freeze({ shader: a, bindGroupLayout: d, pipelineLayout: u, pipeline: h });
    return this.pipelines.set(r, p), p;
  }
  entries(e, t) {
    const s = this.cameraResources(e);
    return Object.freeze([{ binding: 5, resource: t }, { binding: 6, resource: { buffer: s.lights } }, { binding: 7, resource: { buffer: s.shadows } }]);
  }
  inspect() {
    return Object.freeze({ buffers: this.resources.length * 2, pipelines: this.pipelines.size, visibleLights: [...this.counts.values()].reduce((e, t) => e + t.visibleLights, 0), shadowSegments: [...this.counts.values()].reduce((e, t) => e + t.shadowSegments, 0), gpuResources: this.resources.length * 2 + this.pipelines.size * 4 });
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const e of this.resources)
        e.lights.destroy(), e.shadows.destroy();
      this.resources.length = 0, this.pipelines.clear(), this.counts.clear();
    }
  }
  cameraResources(e) {
    for (; this.resources.length <= e; ) this.resources.push(Object.freeze({ lights: this.device.createBuffer({ label: "ForgeNG Lighting2D lights", size: 32 + this.maxLights * 32, usage: da | ca }), shadows: this.device.createBuffer({ label: "ForgeNG Lighting2D hard-shadow segments", size: Math.max(16, this.maxShadowSegments * 16), usage: da | ca }) }));
    return this.resources[e];
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Lighting2dFeature is destroyed.");
  }
}
const qI = `struct Camera2d { clip_x: vec4f, clip_y: vec4f }
@group(0) @binding(0) var<uniform> camera: Camera2d;
@group(0) @binding(1) var<storage, read> vertices: array<vec2f>;
@vertex fn vs_path_mask(@builtin(vertex_index) vertex_index: u32) -> @builtin(position) vec4f {
    let world3 = vec3f(vertices[vertex_index], 1.0);
    return vec4f(dot(camera.clip_x.xyz, world3), dot(camera.clip_y.xyz, world3), 0.0, 1.0);
}
@fragment fn fs_path_mask() -> @location(0) vec4f { return vec4f(0.0); }
`, KI = 8, HI = 128, ua = 1, fa = 1016 * 3 * 2;
class XI {
  constructor(e, t) {
    c(this, "device");
    c(this, "fail");
    c(this, "buffers", []);
    c(this, "ranges", /* @__PURE__ */ new Map());
    c(this, "pipelines", /* @__PURE__ */ new Map());
    c(this, "uploads", 0);
    c(this, "destroyed", !1);
    this.device = e, this.fail = t;
  }
  prepare(e, t) {
    this.assertAlive();
    const s = [], n = /* @__PURE__ */ new Map();
    for (const o of t) if (o.kind === "path") {
      const a = o.points ?? [], d = s.length / 2;
      for (let u = 1; u + 1 < a.length; u++) s.push(a[0][0], a[0][1], a[u][0], a[u][1], a[u + 1][0], a[u + 1][1]);
      n.set(o.id, Object.freeze({ first: d, count: s.length / 2 - d }));
    }
    if (s.length > fa) throw new RangeError("Render2D active path-mask vertices exceed the bounded stencil policy.");
    const r = this.buffer(e);
    s.length > 0 && (this.device.queue.writeBuffer(r, 0, new Float32Array(s)), this.uploads += 1), this.ranges.set(e, n);
  }
  encode(e, t, s, n, r, o, a, d) {
    const u = this.ranges.get(s)?.get(o.id);
    if (!u || u.count === 0) return 0;
    const l = this.pipeline(t.format, t.sampleCount, a);
    return e.setStencilReference(d), e.setPipeline(l.pipeline), e.setBindGroup(0, this.device.createBindGroup({ label: `ForgeNG path mask ${o.id}`, layout: l.layout, entries: [{ binding: 0, resource: { buffer: n, offset: r, size: 32 } }, { binding: 1, resource: { buffer: this.buffer(s) } }] })), e.draw(u.count, 1, u.first, 0), 1;
  }
  inspect() {
    return Object.freeze({ buffers: this.buffers.length, pipelines: this.pipelines.size, uploads: this.uploads, gpuResources: this.buffers.length + this.pipelines.size * 4 });
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = !0;
      for (const e of this.buffers) e.destroy();
      this.buffers.length = 0, this.ranges.clear(), this.pipelines.clear();
    }
  }
  buffer(e) {
    for (; this.buffers.length <= e; ) this.buffers.push(this.device.createBuffer({ label: "ForgeNG Render2D path-mask vertices", size: fa * 4, usage: HI | KI }));
    return this.buffers[e];
  }
  pipeline(e, t, s) {
    const n = `${e}:${t}:${s}`, r = this.pipelines.get(n);
    if (r) return r;
    this.fail("shader-module");
    const o = this.device.createShaderModule({ label: "ForgeNG path-mask shader", code: qI });
    this.fail("bind-group-layout");
    const a = this.device.createBindGroupLayout({ label: "ForgeNG path-mask bindings", entries: [{ binding: 0, visibility: ua, buffer: { type: "uniform", minBindingSize: 32 } }, { binding: 1, visibility: ua, buffer: { type: "read-only-storage", minBindingSize: 24 } }] });
    this.fail("pipeline-layout");
    const d = this.device.createPipelineLayout({ label: "ForgeNG path-mask layout", bindGroupLayouts: [a] }), u = { compare: "equal", passOp: s === "push" ? "increment-clamp" : "decrement-clamp" };
    this.fail("pipeline");
    const l = this.device.createRenderPipeline({ label: `ForgeNG path-mask ${s}`, layout: d, vertex: { module: o, entryPoint: "vs_path_mask" }, fragment: { module: o, entryPoint: "fs_path_mask", targets: [{ format: e, writeMask: 0 }] }, primitive: { topology: "triangle-list", cullMode: "none" }, depthStencil: { format: "depth24plus-stencil8", depthWriteEnabled: !1, depthCompare: "always", stencilFront: u, stencilBack: u, stencilReadMask: 255, stencilWriteMask: 255 }, multisample: { count: t } }), f = Object.freeze({ layout: a, pipeline: l });
    return this.pipelines.set(n, f), f;
  }
  assertAlive() {
    if (this.destroyed) throw new Error("PathMasks2dFeature is destroyed.");
  }
}
const JI = Object.freeze({ visibleLights: 0, shadowSegments: 0 });
class id {
  constructor(e) {
    c(this, "lighting");
    c(this, "pathMasks");
    c(this, "effects");
    c(this, "fallbacks", []);
    c(this, "destroyed", !1);
    const t = e.definition.features.find((a) => a.capability === He), s = e.definition.features.find((a) => a.capability === ns), n = e.definition.features.find((a) => a.capability === ss);
    this.lighting = t && e.support.lighting ? new YI(e.device, e.definition, t, e.fail, e.support.hardShadows) : null, t && !this.lighting && this.rejectOrFallback(t.required ?? !1, He, "lighting capability unavailable"), t && t.options?.shadows === "hard" && !e.support.hardShadows && this.rejectOrFallback(t.required ?? !1, `${He}:hard-shadows`, "hard shadows unavailable"), this.pathMasks = s && e.support.pathMasks ? new XI(e.device, e.fail) : null, s && !this.pathMasks && this.rejectOrFallback(s.required ?? !1, ns, "path masks unavailable");
    const o = [...new Set(e.definition.effects.map((a) => a.kind))].every((a) => e.support.effects.includes(a));
    this.effects = n && o ? new FI(e.device, e.definition, e.fail) : null, n && !this.effects && this.rejectOrFallback(n.required ?? e.definition.effects.some((a) => a.required), ss, "requested effect unavailable");
  }
  prepareCamera(e, t, s) {
    return this.assertAlive(), this.lighting?.prepareCamera(e, t, s) ?? JI;
  }
  litPipeline(e, t, s, n) {
    return this.lighting?.pipeline(e, t, s, n) ?? null;
  }
  litEntries(e, t) {
    return this.lighting?.entries(e, t) ?? Object.freeze([]);
  }
  pathMasksEnabled() {
    return this.pathMasks !== null;
  }
  preparePathMasks(e, t) {
    this.pathMasks?.prepare(e, t);
  }
  encodePathMask(e, t, s, n, r, o, a, d) {
    return this.pathMasks?.encode(e, t, s, n, r, o, a, d) ?? 0;
  }
  encodeEffects(e, t) {
    return this.effects?.encode(e, t) ?? 0;
  }
  inspect() {
    const e = this.lighting?.inspect(), t = this.pathMasks?.inspect(), s = this.effects?.inspect();
    return Object.freeze({ features: +(this.lighting !== null) + +(this.pathMasks !== null) + +(this.effects !== null), fallbacks: Object.freeze([...this.fallbacks]), lightingBuffers: e?.buffers ?? 0, lightingPipelines: e?.pipelines ?? 0, visibleLights: e?.visibleLights ?? 0, shadowSegments: e?.shadowSegments ?? 0, pathMaskBuffers: t?.buffers ?? 0, effectPasses: s?.passes ?? 0, buffers: (e?.buffers ?? 0) + (t?.buffers ?? 0) + (s?.buffers ?? 0), pipelines: (e?.pipelines ?? 0) + (t?.pipelines ?? 0) + (s?.pipelines ?? 0), gpuResources: (e?.gpuResources ?? 0) + (t?.gpuResources ?? 0) + (s?.gpuResources ?? 0), destroyed: this.destroyed });
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.effects?.destroy(), this.pathMasks?.destroy(), this.lighting?.destroy());
  }
  rejectOrFallback(e, t, s) {
    if (e) throw new E("R2D_WEBGPU_SCENE_INVALID", "$.features", `required ${t} is unavailable: ${s}.`);
    this.fallbacks.push(`${t}:${s}`);
  }
  assertAlive() {
    if (this.destroyed) throw new Error("Render2dAdvancedFeatureSet is destroyed.");
  }
}
function QI(i) {
  return new id(i);
}
const ZI = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Render2dAdvancedFeatureSet: id,
  createRender2dAdvancedFeatureSet: QI
}, Symbol.toStringTag, { value: "Module" }));
export {
  i0 as Forge2d,
  LI as create,
  t0 as createTiledCollisionDefinitions,
  i0 as default,
  TI as version
};

