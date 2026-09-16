import type { AudioProviderDescriptor, AudioVector3 } from 'forgeng/contracts/audio';
import type { GameplayCheckpointSnapshot, GameplayInputCommandSnapshot, GameplayJsonValue, GameplayWorldSnapshot } from 'forgeng/contracts/gameplay';
import type { PhysicsBodyDefinition, PhysicsBodyHandle, PhysicsBodySnapshot, PhysicsProviderCapability, PhysicsSceneScope, PhysicsTransform, PhysicsVector3 } from 'forgeng/contracts/physics';
import type { NormalizedRender2dDefinition, Render2dAnimationCommandRequest, Render2dAnimationEventSnapshot, Render2dAnimationStateSnapshot, Render2dDefinition, Render2dFailureInspectionSnapshot, Render2dInspectionOptions, Render2dInspectionSnapshotV2, Render2dInspectorV2, Render2dParticleCommandRequest, Render2dParticleEmitterSnapshot, Render2dTextUpdateRequest, Render2dTilemapPatchRequest } from 'forgeng/contracts/2d';
import type { ForgePluginV2Descriptor } from 'forgeng/contracts/plugin-v2';
import type { StorageProvider, StorageProviderDescriptor } from 'forgeng/contracts/storage';
import type { UiShell, UiShellProviderDescriptor } from 'forgeng/contracts/ui';
export type Forge2dPixelSnap = 'off' | 'camera' | 'camera-and-items';
export interface Forge2dCameraFollowOptions {
    readonly offset?: readonly [number, number];
    readonly bounds?: readonly [number, number, number, number] | null;
}
export interface Forge2dCameraSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly position: readonly [number, number];
    readonly effectivePosition: readonly [number, number];
    readonly scale: readonly [number, number];
    readonly logicalViewport: readonly [number, number, number, number];
    readonly pixelSnap: Forge2dPixelSnap;
    readonly followingEntityId: string | null;
    readonly followOffset: readonly [number, number];
    readonly bounds: readonly [number, number, number, number] | null;
}
export interface Forge2dCameraController {
    readonly id: string;
    state(): Forge2dCameraSnapshot;
    setPosition(position: readonly [number, number]): Forge2dCameraSnapshot;
    setPixelSnap(pixelSnap: Forge2dPixelSnap): Forge2dCameraSnapshot;
    follow(entityId: string, options?: Forge2dCameraFollowOptions): Forge2dCameraSnapshot;
    unfollow(): Forge2dCameraSnapshot;
    worldToLogical(point: readonly [number, number]): readonly [number, number];
    logicalToWorld(point: readonly [number, number]): readonly [number, number];
}
export interface Forge2dCollisionFilter {
    readonly group: number;
    readonly mask: number;
}
export interface Forge2dAabbShape {
    readonly kind: 'aabb';
    readonly size: readonly [number, number];
    readonly offset?: readonly [number, number];
}
export interface Forge2dCircleShape {
    readonly kind: 'circle';
    readonly radius: number;
    readonly offset?: readonly [number, number];
}
export type Forge2dCollisionShape = Forge2dAabbShape | Forge2dCircleShape;
export interface Forge2dColliderDefinition {
    readonly id: string;
    readonly entityId: string;
    readonly shape: Forge2dCollisionShape;
    readonly sensor?: boolean;
    readonly filter?: Partial<Forge2dCollisionFilter>;
}
export interface Forge2dCollisionQuery {
    readonly shape: Forge2dCollisionShape;
    readonly position: readonly [number, number];
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly includeSensors?: boolean;
}
export interface Forge2dColliderSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly entityId: string;
    readonly generation: number;
    readonly shape: Forge2dCollisionShape;
    readonly sensor: boolean;
    readonly filter: Forge2dCollisionFilter;
    readonly bounds: readonly [number, number, number, number];
}
export interface Forge2dCollider {
    readonly id: string;
    readonly entityId: string;
    state(): Forge2dColliderSnapshot;
    overlaps(includeSensors?: boolean): readonly Forge2dColliderSnapshot[];
    destroy(): void;
}
export type Forge2dPhysicsSceneStatus = 'unavailable' | 'loading' | 'active' | 'failed';
export interface Forge2dPhysicsSceneFailure extends Error {
    readonly code: string;
    readonly operation: string;
    readonly currentState: string;
    readonly requestedState: string;
    readonly remediation: string;
    readonly details: Readonly<Record<string, unknown>>;
    readonly cause?: unknown;
}
export interface Forge2dPhysicsCapabilityResult {
    readonly ok: boolean;
    readonly status: Forge2dPhysicsSceneStatus;
    readonly capability: PhysicsProviderCapability | null;
    readonly scope: PhysicsSceneScope | null;
    readonly error: Error | null;
}
export interface Forge2dPhysicsSceneApi {
    readonly status: Forge2dPhysicsSceneStatus;
    readonly capabilities: readonly PhysicsProviderCapability[];
    readonly lastError: Forge2dPhysicsSceneFailure | null;
    getScopeResult(capabilityId?: string): Forge2dPhysicsCapabilityResult;
    createBody(definition: PhysicsBodyDefinition): PhysicsBodyHandle;
    removeBody(handle: PhysicsBodyHandle): boolean;
    setBodyTransform(handle: PhysicsBodyHandle, transform: PhysicsTransform): boolean;
    applyBodyImpulse(handle: PhysicsBodyHandle, impulse: PhysicsVector3, worldPoint?: PhysicsVector3): boolean;
    readBodySnapshot(handle: PhysicsBodyHandle): Promise<PhysicsBodySnapshot | null>;
}
export type Forge2dAudioProviderSelection = 'default' | 'disabled' | AudioProviderDescriptor;
export interface Forge2dAudioCueDefinition {
    readonly id: string;
    readonly url: string;
    readonly volume?: number;
    readonly loop?: boolean;
    readonly startOffsetSeconds?: number;
    readonly enforceCooldown?: boolean;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface Forge2dAudioOptions {
    readonly cues?: readonly Forge2dAudioCueDefinition[];
    readonly masterVolume?: number;
}
export interface Forge2dAudioPlayOptions {
    readonly volume?: number;
    readonly loop?: boolean;
    readonly startOffsetSeconds?: number;
    readonly enforceCooldown?: boolean;
    readonly position?: AudioVector3;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface Forge2dAudioVoice {
    readonly cueId: string;
    readonly ended: Promise<void>;
    readonly stopped: boolean;
    setGain(value: number, rampMs?: number): void;
    setPosition(position: AudioVector3): void;
    stop(fadeOutMs?: number): void;
}
export interface Forge2dAudioSnapshot {
    readonly snapshotVersion: 1;
    readonly available: boolean;
    readonly cueIds: readonly string[];
    readonly loadedCues: number;
    readonly activeVoices: number;
}
export interface Forge2dAudioApi {
    readonly available: boolean;
    readonly cueIds: readonly string[];
    load(cueId: string): Promise<void>;
    play(cueId: string, options?: Forge2dAudioPlayOptions): Promise<Forge2dAudioVoice | null>;
    resume(): Promise<void>;
    suspend(): Promise<void>;
    setMasterVolume(volume: number): void;
    stopAll(fadeOutMs?: number): void;
    inspect(): Forge2dAudioSnapshot;
}
export interface Forge2dHudSnapshot {
    readonly snapshotVersion: 1;
    readonly sceneId: string;
    readonly sceneGeneration: number;
    readonly revision: number;
    readonly values: Readonly<Record<string, GameplayJsonValue>>;
}
export interface Forge2dHudSubscription {
    dispose(): void;
}
export interface Forge2dHudApi {
    snapshot(): Forge2dHudSnapshot | null;
    value(channel: string): GameplayJsonValue | null;
    set(channel: string, value: GameplayJsonValue): Forge2dHudSnapshot;
    clear(channel?: string): Forge2dHudSnapshot;
    subscribe(listener: (snapshot: Forge2dHudSnapshot | null) => void): Forge2dHudSubscription;
}
export interface Forge2dSaveSnapshot {
    readonly snapshotVersion: 1;
    readonly available: boolean;
    readonly slots: readonly string[];
}
export interface Forge2dSavesApi {
    readonly available: boolean;
    save(slot: string, checkpointId?: string): Promise<GameplayCheckpointSnapshot>;
    load(slot: string): Promise<GameplayCheckpointSnapshot>;
    replay(slot: string, commands: readonly GameplayInputCommandSnapshot[], deltaSeconds?: number): Promise<GameplayWorldSnapshot>;
    remove(slot: string): Promise<boolean>;
    list(): Promise<readonly string[]>;
    inspect(): Forge2dSaveSnapshot;
}
export interface Forge2dDevtoolsAnimationSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly runtimeId: string;
    readonly spriteId: string | null;
    readonly revision: number;
    readonly status: Render2dAnimationStateSnapshot['status'];
    readonly active: boolean;
    readonly time: number;
    readonly speed: number;
    readonly direction: 1 | -1;
    readonly iteration: number;
    readonly frame: number | null;
    readonly transition: Readonly<{
        readonly toId: string;
        readonly toRuntimeId: string;
        readonly startedTick: number;
        readonly durationTicks: number;
        readonly progress: number;
    }> | null;
}
export interface Forge2dDevtoolsSnapshot {
    readonly snapshotVersion: 1;
    readonly activeScene: Readonly<{
        readonly id: string;
        readonly sceneGeneration: number;
        readonly domainGeneration: number;
    }> | null;
    readonly render: Readonly<{
        readonly frame: number;
        readonly visibleItems: number;
        readonly culledItems: number;
        readonly draws: number;
        readonly batches: number;
        readonly pipelineChanges: number;
        readonly bindGroupChanges: number;
    }>;
    readonly resources: Readonly<{
        readonly trackedCpuBytes: number;
        readonly trackedGpuBytes: number;
        readonly retainedBuffers: number;
        readonly leasedBuffers: number;
        readonly handles: number;
        readonly pendingRetirements: number;
    }>;
    readonly animations: readonly Forge2dDevtoolsAnimationSnapshot[];
    readonly colliders: readonly Forge2dColliderSnapshot[];
    readonly staleWork: Readonly<{
        readonly rejections: number;
        readonly failures: readonly Render2dFailureInspectionSnapshot[];
    }>;
    readonly totals: Readonly<{
        readonly animations: number;
        readonly colliders: number;
    }>;
    readonly truncated: Readonly<{
        readonly animations: boolean;
        readonly colliders: boolean;
    }>;
    readonly destroyed: boolean;
}
export interface Forge2dDevtoolsApi {
    inspect(): Forge2dDevtoolsSnapshot;
}
export interface Forge2dTiledCollisionOptions {
    readonly entityId: string;
    readonly idPrefix: string;
    readonly layerPaths?: readonly string[];
    readonly includeInvisible?: boolean;
    readonly sensor?: boolean;
    readonly filter?: Partial<Forge2dCollisionFilter>;
    readonly maxColliders?: number;
}
export interface Forge2dTiledCollisionObject {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly rotation: number;
    readonly visible: boolean;
    readonly shape: 'rectangle' | 'ellipse' | 'point' | 'polygon' | 'polyline' | 'text' | 'tile';
    readonly points: readonly Readonly<{
        readonly x: number;
        readonly y: number;
    }>[];
}
export interface Forge2dTiledTileLayer {
    readonly type: 'tilelayer';
    readonly id: number;
    readonly path: string;
    readonly visible: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly width: number;
    readonly height: number;
    readonly x: number;
    readonly y: number;
    readonly gids: readonly number[];
    readonly chunks: readonly Readonly<{
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly gids: readonly number[];
    }>[];
}
export interface Forge2dTiledGroupLayer {
    readonly type: 'group';
    readonly id: number;
    readonly path: string;
    readonly visible: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly layers: readonly Forge2dTiledLayer[];
}
export interface Forge2dTiledIgnoredLayer {
    readonly type: 'objectgroup' | 'imagelayer';
    readonly id: number;
    readonly path: string;
    readonly visible: boolean;
    readonly offsetX: number;
    readonly offsetY: number;
}
export type Forge2dTiledLayer = Forge2dTiledTileLayer | Forge2dTiledGroupLayer | Forge2dTiledIgnoredLayer;
export interface Forge2dTiledCollisionProduct {
    readonly normalizationVersion: 1;
    readonly kind: 'tilemap/tiled-json';
    readonly orientation: 'orthogonal' | 'isometric' | 'staggered' | 'hexagonal';
    readonly tileWidth: number;
    readonly tileHeight: number;
    readonly layers: readonly Forge2dTiledLayer[];
    readonly tilesets: readonly Readonly<{
        readonly firstGid: number;
        readonly tileWidth: number;
        readonly tileHeight: number;
        readonly tiles: readonly Readonly<{
            readonly id: number;
            readonly collisionObjects: readonly Forge2dTiledCollisionObject[];
        }>[];
    }>[];
}
import type { InputActionsRuntime as InputActionsApi } from 'forgeng/contracts/actions';
import type { AssetDecoderDescriptor, AssetManifestInput, AssetRealizerDescriptor, AssetRuntimeClient, AssetSourceProviderDescriptor } from 'forgeng/contracts/assets';
import type { GameDefinition, GameplayGameApi } from 'forgeng/contracts/gameplay';
import type { Transform2dValue } from 'forgeng/contracts/gameplay';
import type { InputProviderDescriptor } from 'forgeng/contracts/input';
import type { PhysicsProvider, PhysicsProviderDescriptor } from 'forgeng/contracts/physics';
import type { GraphicsBackendDescriptor, RenderCompositionDescriptor, RenderCompositionSnapshot, RenderDomainDescriptor } from 'forgeng/contracts/render-composition';
import type { InputActionsConfiguration } from 'forgeng/contracts/actions';
import { ForgeNeutralGame } from 'forgeng/neutral';
import type { ForgeLoggingController, ForgeLoggingOptions } from 'forgeng';
export declare const version: string;
export declare function createTiledCollisionDefinitions(product: Forge2dTiledCollisionProduct, options: Forge2dTiledCollisionOptions): readonly Forge2dColliderDefinition[];
export interface Forge2dSceneDefinition {
    readonly id: string;
    readonly render: Render2dDefinition;
    readonly colliders?: readonly Forge2dColliderDefinition[];
    readonly setup?: (scene: Forge2dSceneFacade) => void | Promise<void>;
    readonly fixedUpdate?: (scene: Forge2dSceneFacade, tick: number) => void;
}
export interface Forge2dSceneFacade {
    readonly id: string;
    readonly physics: Forge2dPhysicsSceneApi;
    readonly audio: Forge2dAudioApi;
    readonly hud: Forge2dHudApi;
    setTransform(entityId: string, value: Transform2dValue): void;
    setPresentation(entityId: string, value: Forge2dPresentationState): void;
    pick(cameraId: string, point: readonly [number, number]): string | null;
    camera(cameraId: string): Forge2dCameraController;
    updateText(request: Render2dTextUpdateRequest): void;
    patchTilemap(request: Render2dTilemapPatchRequest): void;
    commandAnimation(request: Render2dAnimationCommandRequest): Render2dAnimationStateSnapshot;
    animationState(animationId: string): Render2dAnimationStateSnapshot;
    drainAnimationEvents(): readonly Forge2dAnimationEventSnapshot[];
    spriteAnimation(spriteId: string): Forge2dSpriteAnimationController;
    spawnSprite(options: Forge2dSpawnSpriteOptions): Forge2dSpawnedSprite;
    findSprite(spriteId: string): Forge2dSpawnedSprite | null;
    createCollider(definition: Forge2dColliderDefinition): Forge2dCollider;
    collider(colliderId: string): Forge2dCollider | null;
    queryColliders(query: Forge2dCollisionQuery): readonly Forge2dColliderSnapshot[];
    commandParticles(request: Render2dParticleCommandRequest): Render2dParticleEmitterSnapshot;
}
export interface Forge2dFacadeSnapshot {
    readonly snapshotVersion: 1;
    readonly activeSceneId: string | null;
    readonly definitionIds: readonly string[];
    readonly definitionCount: number;
    readonly activeAttachments: number;
    readonly retainedEntities: number;
    readonly retainedBuffers: number;
    readonly activeScene: Readonly<{
        entities: number;
        visibleItems: number;
        culledItems: number;
        colliders: number;
        collisionQueries: number;
        retainedBuffers: number;
        leasedBuffers: number;
    }> | null;
    readonly composition: RenderCompositionSnapshot;
}
export type Forge2dInspectionApi = Render2dInspectorV2;
export interface Forge2dFacade {
    readonly inspection: Forge2dInspectionApi;
    readonly devtools: Forge2dDevtoolsApi;
    readonly physics: Forge2dPhysicsSceneApi;
    readonly audio: Forge2dAudioApi;
    readonly hud: Forge2dHudApi;
    activeScene(): string | null;
    setTransform(entityId: string, value: Transform2dValue): void;
    setPresentation(entityId: string, value: Forge2dPresentationState): void;
    pick(cameraId: string, point: readonly [number, number]): string | null;
    camera(cameraId: string): Forge2dCameraController;
    updateText(request: Render2dTextUpdateRequest): void;
    patchTilemap(request: Render2dTilemapPatchRequest): void;
    commandAnimation(request: Render2dAnimationCommandRequest): Render2dAnimationStateSnapshot;
    animationState(animationId: string): Render2dAnimationStateSnapshot;
    drainAnimationEvents(): readonly Forge2dAnimationEventSnapshot[];
    spriteAnimation(spriteId: string): Forge2dSpriteAnimationController;
    spawnSprite(options: Forge2dSpawnSpriteOptions): Forge2dSpawnedSprite;
    findSprite(spriteId: string): Forge2dSpawnedSprite | null;
    createCollider(definition: Forge2dColliderDefinition): Forge2dCollider;
    collider(colliderId: string): Forge2dCollider | null;
    queryColliders(query: Forge2dCollisionQuery): readonly Forge2dColliderSnapshot[];
    commandParticles(request: Render2dParticleCommandRequest): Render2dParticleEmitterSnapshot;
    inspect(): Forge2dFacadeSnapshot;
    inspectDetailed(): Render2dInspectionSnapshotV2;
}
export interface Forge2dGameLoop {
    readonly running: boolean;
    start(): void;
    stop(): void;
}
export interface Forge2dPresentationState {
    readonly visible?: boolean;
    readonly opacity?: number;
    readonly tint?: readonly [number, number, number, number];
    readonly clip?: string | null;
}
export type Forge2dAnimationPlayMode = 'continue' | 'restart';
/** `spriteId` identifies a runtime-spawned private animation bank. */
export interface Forge2dAnimationEventSnapshot extends Render2dAnimationEventSnapshot {
    readonly spriteId?: string;
}
export interface Forge2dSpriteAnimationSnapshot {
    readonly snapshotVersion: 1;
    readonly spriteId: string;
    readonly animationIds: readonly string[];
    readonly current: Render2dAnimationStateSnapshot | null;
}
/**
 * Scene-generation-bound controller for every animation that targets one sprite.
 * A controller becomes stale when its owning scene is retired.
 */
export interface Forge2dSpriteAnimationController {
    readonly spriteId: string;
    readonly animationIds: readonly string[];
    state(): Forge2dSpriteAnimationSnapshot;
    play(animationId: string, mode?: Forge2dAnimationPlayMode): Forge2dSpriteAnimationSnapshot;
    pause(): Forge2dSpriteAnimationSnapshot;
    stop(): Forge2dSpriteAnimationSnapshot;
    restart(): Forge2dSpriteAnimationSnapshot;
    seek(time: number): Forge2dSpriteAnimationSnapshot;
    setSpeed(speed: number): Forge2dSpriteAnimationSnapshot;
    setDirection(direction: 1 | -1): Forge2dSpriteAnimationSnapshot;
    transition(animationId: string, transitionTicks: number): Forge2dSpriteAnimationSnapshot;
}
export interface Forge2dSpawnSpriteOptions {
    readonly id: string;
    readonly template: string;
    readonly entityId?: string;
    readonly transform?: Transform2dValue;
    readonly presentation?: Forge2dPresentationState;
    readonly parentEntityId?: string | null;
}
export interface Forge2dSpawnedSpriteSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly template: string;
    readonly entityId: string;
    readonly spriteGeneration: number;
    readonly sceneGeneration: number;
    readonly transform: Transform2dValue;
    readonly presentation: Required<Forge2dPresentationState>;
    readonly animationIds: readonly string[];
}
export interface Forge2dSpawnedSprite {
    readonly id: string;
    readonly entityId: string;
    state(): Forge2dSpawnedSpriteSnapshot;
    animation(): Forge2dSpriteAnimationController;
    setTransform(value: Transform2dValue): Forge2dSpawnedSpriteSnapshot;
    setPresentation(value: Forge2dPresentationState): Forge2dSpawnedSpriteSnapshot;
    destroy(): void;
}
export type Forge2dGame = ForgeNeutralGame & Readonly<{
    canvas: HTMLCanvasElement;
    loop: Forge2dGameLoop;
    twoD: Forge2dFacade;
    actions: InputActionsApi;
    gameplay: GameplayGameApi | null;
    assets: AssetRuntimeClient | null;
    ui: UiShell | null;
    storage: StorageProvider | null;
    physics: PhysicsProvider | null;
    audio: Forge2dAudioApi;
    hud: Forge2dHudApi;
    saves: Forge2dSavesApi;
    logs: ForgeLoggingController;
    inspect2d(): Forge2dFacadeSnapshot;
    inspect2dDetailed(): Render2dInspectionSnapshotV2;
    inspect2dDevtools(): Forge2dDevtoolsSnapshot;
    stepAsync(input: Parameters<ForgeNeutralGame['step']>[0]): Promise<void>;
}>;
export interface Forge2dCanvasOptions {
    readonly target?: string | HTMLCanvasElement;
    readonly id?: string;
    readonly layout?: Forge2dCanvasLayoutMode;
}
export type Forge2dCanvasLayoutMode = 'fixed' | 'container' | 'viewport';
export interface Forge2dSizeOptions {
    readonly width?: number;
    readonly height?: number;
    readonly pixelRatio?: number;
    readonly maxPixelRatio?: number;
    readonly autoResize?: boolean;
}
export interface Forge2dBootOptions {
    readonly scene?: string;
    readonly autoStart?: boolean;
}
export interface Forge2dProviderSelections {
    /** A renderer-provider v1 selection is intentionally invalid for a composed 2D game. */
    readonly renderer?: never;
    readonly ui?: 'default' | 'disabled' | UiShellProviderDescriptor;
    readonly input?: 'default' | InputProviderDescriptor;
    readonly storage?: 'default' | 'memory' | 'disabled' | StorageProviderDescriptor;
    readonly assets?: 'default' | 'disabled' | AssetSourceProviderDescriptor;
    /** Explicit opt-in only; 2D never imports a default physics implementation. */
    readonly physics?: 'disabled' | PhysicsProviderDescriptor;
    readonly audio?: Forge2dAudioProviderSelection;
}
export interface Forge2dAssetsOptions {
    readonly manifests?: readonly AssetManifestInput[];
    readonly preload?: readonly string[];
    readonly decoders?: readonly AssetDecoderDescriptor[];
    readonly realizers?: readonly AssetRealizerDescriptor[];
}
export interface Forge2dPresentationOptions {
    readonly id?: string;
    readonly backend?: GraphicsBackendDescriptor;
    readonly backendOptions?: Forge2dWebGpuBackendOptions;
    readonly includeDefaultDomain?: boolean;
    readonly domain?: Forge2dDomainOptions;
    readonly domains?: readonly RenderDomainDescriptor[];
    readonly optionalDomainFailurePolicy?: RenderCompositionDescriptor['optionalDomainFailurePolicy'];
}
export interface Forge2dWebGpuBackendOptions {
    readonly gpu?: GPU;
    readonly format?: GPUTextureFormat;
    readonly alphaMode?: GPUCanvasAlphaMode;
    readonly powerPreference?: GPUPowerPreference;
    readonly maximumPixelRatio?: number;
}
export interface Forge2dDomainOptions {
    readonly id?: string;
    readonly required?: boolean;
    readonly before?: readonly string[];
    readonly after?: readonly string[];
    readonly enabledByDefault?: boolean;
    readonly sceneIds?: readonly string[];
    readonly surfacePhase?: 'background' | 'world' | 'overlay';
    readonly surfaceLoad?: 'clear' | 'load';
    readonly surfaceAlpha?: 'opaque' | 'premultiplied';
    readonly clearColor?: readonly [number, number, number, number];
    readonly maximumPixelRatio?: number;
    readonly customShaderSources?: Readonly<Record<string, string>>;
    readonly customMaterialFallback?: 'reject' | 'builtin-sprite';
    readonly textCacheRuns?: number;
    readonly inspection?: Render2dInspectionOptions;
    readonly advancedFeatureSupport?: Readonly<{
        readonly lighting?: boolean;
        readonly hardShadows?: boolean;
        readonly pathMasks?: boolean;
        readonly effects?: readonly 'color-adjust'[];
    }>;
    readonly failAt?: Forge2dFailurePoint | readonly Forge2dFailurePoint[];
}
export type Forge2dFailurePoint = 'create' | 'probe' | 'attach' | 'shader-module' | 'bind-group-layout' | 'pipeline-layout' | 'pipeline' | 'sampler' | 'fallback-texture' | 'camera-buffer' | 'instance-buffer' | 'prepare' | 'extract' | 'encode' | 'submit-result' | 'loss' | 'recover' | 'detach' | 'destroy';
export interface Forge2dPresetCreateOptions {
    readonly canvas?: string | HTMLCanvasElement | Forge2dCanvasOptions;
    readonly size?: Forge2dSizeOptions;
    readonly boot?: string | Forge2dBootOptions;
    readonly scenes: readonly Forge2dSceneDefinition[];
    readonly presentation?: Forge2dPresentationOptions;
    readonly providers?: Forge2dProviderSelections;
    readonly assets?: Forge2dAssetsOptions;
    readonly audio?: Forge2dAudioOptions;
    readonly actions?: InputActionsConfiguration;
    readonly gameplay?: GameDefinition;
    readonly plugins?: readonly ForgePluginV2Descriptor[];
    readonly inspection?: Render2dInspectionOptions & Readonly<{
        ui?: boolean;
    }>;
    readonly logging?: ForgeLoggingOptions;
    readonly fixedDeltaSeconds?: number;
    readonly maximumFixedSteps?: number;
}
export declare function create(options: Forge2dPresetCreateOptions): Promise<Forge2dGame>;
export declare const Forge2d: Readonly<{
    version: string;
    create: typeof create;
}>;
export default Forge2d;
