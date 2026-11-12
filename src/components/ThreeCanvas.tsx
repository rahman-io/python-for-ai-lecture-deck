import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Eye, EyeOff, RotateCcw, Sparkles, Orbit } from 'lucide-react';

interface ThreeCanvasProps {
  currentSlide: number;
  thread: 'python' | 'ai' | 'convergence' | 'neutral';
  isExploding?: boolean;
  theme?: 'kinetic' | 'focus' | 'slideegg';
}

// Scratch math helpers at module scope to ensure zero GC in animation loop
const _scratchVec3 = new THREE.Vector3();
const _scratchQuat = new THREE.Quaternion();
const _scratchMatrix = new THREE.Matrix4();
const _scratchColor = new THREE.Color();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ currentSlide, thread, isExploding, theme = 'kinetic' }) => {
  // Theme 3 (SlideEgg) is a pure academic light theme modeled after the PDF with crisp geometric shapes and no 3D canvas
  if (theme === 'slideegg') {
    return null;
  }

  const mountRef = useRef<HTMLDivElement>(null);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [particleDensity, setParticleDensity] = useState<'normal' | 'high'>('normal');
  const [isInteractive, setIsInteractive] = useState(false);

  // Store mutable refs for animation loop
  const stateRef = useRef({
    currentSlide,
    thread,
    theme,
    isExploding: !!isExploding,
    targetRotationY: 0,
    targetCameraZ: 14,
    cameraZ: 14,
    rotX: 0,
    rotY: 0,
    mouseNormX: 0,
    mouseNormY: 0,
    isMouseDown: false,
    prevPointerX: 0,
    prevPointerY: 0,
  });

  useEffect(() => {
    stateRef.current.currentSlide = currentSlide;
    stateRef.current.thread = thread;
    stateRef.current.theme = theme;
    stateRef.current.isExploding = !!isExploding;

    // Adjust camera & zoom based on lecture moments
    if (theme === 'focus') {
      stateRef.current.targetCameraZ = 16.5; // wider perspective in focus mode
    } else if (currentSlide === 6 || currentSlide === 15 || currentSlide === 17) {
      stateRef.current.targetCameraZ = 9.5; // dramatic zoom
    } else if (currentSlide === 22) {
      stateRef.current.targetCameraZ = 16.5; // wide view for explosion
    } else {
      stateRef.current.targetCameraZ = 13.5;
    }
  }, [currentSlide, thread, isExploding, theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL guard detection
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060a17);
    scene.fog = new THREE.FogExp2(0x060a17, 0.038);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (RoomEnvironment via PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key + Cool Hemisphere + Rim)
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x060a17, 1.8);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 2.4);
    dirLight.position.set(6, 9, 7);
    if (!isSoftwareGl) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.0005;
      dirLight.shadow.normalBias = 0.02;
    }
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x818cf8, 3.2, 25);
    accentLight.position.set(-6, -2, 4);
    scene.add(accentLight);

    // 5. Procedural Texture for Glowing Nodes (Zero 404s)
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.85)');
      grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };
    const glowTexture = createGlowTexture();

    // 6. Ground Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.5,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.8;
    scene.add(shadowMesh);

    // 7. COMPOSITE PROCEDURAL MODEL: Dual Thread Sculpture
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // PART A: Python Thread (Amber/Gold braided strand)
    const pythonGroup = new THREE.Group();
    mainGroup.add(pythonGroup);

    const pythonCurvePoints: THREE.Vector3[] = [];
    const strandRadius = 2.4;
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 4;
      const x = Math.sin(t) * strandRadius;
      const y = (i / 60) * 7 - 3.5;
      const z = Math.cos(t) * strandRadius;
      pythonCurvePoints.push(new THREE.Vector3(x, y, z));
    }
    const pythonCurve = new THREE.CatmullRomCurve3(pythonCurvePoints);
    const pythonTubeGeo = new THREE.TubeGeometry(pythonCurve, 80, 0.08, 10, false);
    const pythonTubeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.85,
      roughness: 0.22,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 1.0,
    });
    const pythonTubeMesh = new THREE.Mesh(pythonTubeGeo, pythonTubeMat);
    pythonGroup.add(pythonTubeMesh);

    // Python Instanced Node Beads
    const nodeCount = 30;
    const nodeGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 1.0,
    });
    const pythonNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    pythonNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    for (let i = 0; i < nodeCount; i++) {
      const pt = pythonCurve.getPoint(i / (nodeCount - 1));
      _scratchMatrix.makeTranslation(pt.x, pt.y, pt.z);
      pythonNodes.setMatrixAt(i, _scratchMatrix);
    }
    pythonNodes.computeBoundingSphere();
    pythonGroup.add(pythonNodes);

    // PART B: AI Neural Strand (Electric Cyan/Violet counter-helix)
    const aiGroup = new THREE.Group();
    mainGroup.add(aiGroup);

    const aiCurvePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 4 + Math.PI; // Phase shifted by 180 degrees
      const x = Math.sin(t) * strandRadius;
      const y = (i / 60) * 7 - 3.5;
      const z = Math.cos(t) * strandRadius;
      aiCurvePoints.push(new THREE.Vector3(x, y, z));
    }
    const aiCurve = new THREE.CatmullRomCurve3(aiCurvePoints);
    const aiTubeGeo = new THREE.TubeGeometry(aiCurve, 80, 0.08, 10, false);
    const aiTubeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 1.0,
    });
    const aiTubeMesh = new THREE.Mesh(aiTubeGeo, aiTubeMat);
    aiGroup.add(aiTubeMesh);

    // AI Instanced Icosahedral Synapse Nodes
    const aiNodeGeo = new THREE.IcosahedronGeometry(0.18, 1);
    const aiNodeMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 1.0,
    });
    const aiNodes = new THREE.InstancedMesh(aiNodeGeo, aiNodeMat, nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      const pt = aiCurve.getPoint(i / (nodeCount - 1));
      _scratchMatrix.makeTranslation(pt.x, pt.y, pt.z);
      aiNodes.setMatrixAt(i, _scratchMatrix);
    }
    aiNodes.computeBoundingSphere();
    aiGroup.add(aiNodes);

    // PART C: Orbital Beveled Rings (Algorithmic Core)
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.95,
      roughness: 0.15,
      emissive: 0x1e293b,
      emissiveIntensity: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    mainGroup.add(ring2);

    // PART D: Central Radiant Core (Emerges on Slide 15 - 17 Convergence)
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.3,
      roughness: 0.1,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // PART E: Floating Code Matrix Shards (for Exploding Transition Slide 22)
    const shardCount = 70;
    const shardGeo = new THREE.BoxGeometry(0.35, 0.12, 0.02);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const shardsMesh = new THREE.InstancedMesh(shardGeo, shardMat, shardCount);
    const shardVelocities: THREE.Vector3[] = [];
    const shardBasePositions: THREE.Vector3[] = [];

    for (let i = 0; i < shardCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 6
      );
      shardBasePositions.push(pos.clone());
      shardVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        )
      );
      _scratchMatrix.makeTranslation(pos.x, pos.y, pos.z);
      shardsMesh.setMatrixAt(i, _scratchMatrix);
    }
    shardsMesh.computeBoundingSphere();
    mainGroup.add(shardsMesh);

    // PART F: Background Ambient Stardust (Instanced Particles)
    const starCount = 300;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 36;
      starPositions[i + 1] = (Math.random() - 0.5) * 24;
      starPositions[i + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      map: glowTexture,
      size: 0.35,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 8. Pointer / Orbit Drag Handler
    const handlePointerDown = (e: MouseEvent) => {
      stateRef.current.isMouseDown = true;
      stateRef.current.prevPointerX = e.clientX;
      stateRef.current.prevPointerY = e.clientY;
    };
    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.mouseNormX = normX;
      stateRef.current.mouseNormY = normY;

      if (stateRef.current.isMouseDown) {
        const dx = e.clientX - stateRef.current.prevPointerX;
        const dy = e.clientY - stateRef.current.prevPointerY;
        stateRef.current.rotY += dx * 0.006;
        stateRef.current.rotX += dy * 0.006;
        stateRef.current.prevPointerX = e.clientX;
        stateRef.current.prevPointerY = e.clientY;
      }
    };
    const handlePointerUp = () => {
      stateRef.current.isMouseDown = false;
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP with Exponential Damping & Software WebGL Pacing
    let frameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const status = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const state = stateRef.current;

      // Exponential damping for camera zoom
      state.cameraZ = THREE.MathUtils.damp(state.cameraZ, state.targetCameraZ, 3.5, dt);
      camera.position.z = state.cameraZ;

      // Subtle parallax response to mouse
      const targetCamX = state.mouseNormX * 0.8;
      const targetCamY = 1.2 + state.mouseNormY * 0.5;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 2.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 2.5, dt);
      camera.lookAt(0, 0, 0);

      // Theme 1 (Kinetic) vs Theme 2 (Focus) transformation
      const isFocusTheme = state.theme === 'focus';
      const targetScale = isFocusTheme ? 0.58 : 1.0;
      const targetPosX = isFocusTheme ? 4.3 : 0;
      const targetPosY = isFocusTheme ? -0.8 : 0;
      const targetPosZ = isFocusTheme ? -3.5 : 0;

      mainGroup.scale.setScalar(THREE.MathUtils.damp(mainGroup.scale.x, targetScale, 3.2, dt));
      mainGroup.position.x = THREE.MathUtils.damp(mainGroup.position.x, targetPosX, 3.2, dt);
      mainGroup.position.y = THREE.MathUtils.damp(mainGroup.position.y, targetPosY, 3.2, dt);
      mainGroup.position.z = THREE.MathUtils.damp(mainGroup.position.z, targetPosZ, 3.2, dt);

      // Model auto-rotation + interactive drag
      mainGroup.rotation.y += (isFocusTheme ? 0.12 : 0.22) * dt + state.rotY;
      mainGroup.rotation.x = THREE.MathUtils.damp(mainGroup.rotation.x, state.rotX, 4.0, dt);
      state.rotY *= 0.92; // friction decay

      // Secondary orbital ring precession
      ring1.rotation.z += 0.4 * dt;
      ring2.rotation.x -= 0.35 * dt;

      // Dynamic Story Thread Visual Response
      const emissiveDimmer = isFocusTheme ? 0.35 : 1.0;
      const opacityTarget = isFocusTheme ? 0.35 : 1.0;
      pythonTubeMat.opacity = opacityTarget;
      aiTubeMat.opacity = opacityTarget;

      if (state.thread === 'python') {
        pythonTubeMat.emissiveIntensity = (0.75 + Math.sin(elapsed * 2.5) * 0.2) * emissiveDimmer;
        aiTubeMat.emissiveIntensity = 0.15 * emissiveDimmer;
        pythonGroup.scale.setScalar(1.05);
        aiGroup.scale.setScalar(0.92);
        coreMat.opacity = isFocusTheme ? 0.05 : 0.1;
      } else if (state.thread === 'ai') {
        pythonTubeMat.emissiveIntensity = 0.15 * emissiveDimmer;
        aiTubeMat.emissiveIntensity = (0.85 + Math.sin(elapsed * 3.0) * 0.25) * emissiveDimmer;
        pythonGroup.scale.setScalar(0.92);
        aiGroup.scale.setScalar(1.08);
        coreMat.opacity = isFocusTheme ? 0.05 : 0.15;
      } else {
        // Convergence or neutral (Slide 15 onwards)
        pythonTubeMat.emissiveIntensity = 0.65 * emissiveDimmer;
        aiTubeMat.emissiveIntensity = 0.65 * emissiveDimmer;
        pythonGroup.scale.setScalar(1.0);
        aiGroup.scale.setScalar(1.0);
        coreMat.opacity = (0.35 + Math.sin(elapsed * 1.5) * 0.15) * emissiveDimmer;
      }

      // Exploding code fragments behavior on slide 22
      if (state.isExploding || state.currentSlide === 22) {
        for (let i = 0; i < shardCount; i++) {
          const vel = shardVelocities[i];
          const base = shardBasePositions[i];
          const explosionDist = 3.5;
          _scratchVec3.copy(base).addScaledVector(vel, explosionDist * 20);
          _scratchQuat.setFromAxisAngle(vel, elapsed * 2.0);
          _scratchMatrix.compose(_scratchVec3, _scratchQuat, _scratchVec3.set(1.4, 1.4, 1.4));
          shardsMesh.setMatrixAt(i, _scratchMatrix);
        }
        shardsMesh.instanceMatrix.needsUpdate = true;
      } else {
        // Subtle floating shards
        for (let i = 0; i < shardCount; i++) {
          const base = shardBasePositions[i];
          _scratchVec3.copy(base);
          _scratchVec3.y += Math.sin(elapsed * 1.2 + i) * 0.15;
          _scratchQuat.setFromAxisAngle(_scratchVec3.set(0, 1, 0), elapsed * 0.1 + i);
          _scratchMatrix.compose(_scratchVec3, _scratchQuat, _scratchVec3.set(1, 1, 1));
          shardsMesh.setMatrixAt(i, _scratchMatrix);
        }
        shardsMesh.instanceMatrix.needsUpdate = true;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      pythonTubeGeo.dispose();
      pythonTubeMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      aiTubeGeo.dispose();
      aiTubeMat.dispose();
      aiNodeGeo.dispose();
      aiNodeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      shardGeo.dispose();
      shardMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      glowTexture.dispose();
      shadowTex.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className={`w-full h-full ${isInteractive ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
      />

      {/* Viewport-First Collapsible Bottom Control Dock (per threejs skill) */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-300 z-30 ${
          isCinemaMode ? 'translate-y-16 opacity-40 hover:opacity-100 hover:translate-y-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ maxWidth: 'min(940px, 94vw)' }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs shadow-2xl text-slate-300">
          <button
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-slate-800 transition text-slate-300 font-medium"
            title="Toggle Cinema Mode (Hide/Show 3D HUD)"
          >
            {isCinemaMode ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isCinemaMode ? 'Show 3D HUD' : 'Cinema View'}</span>
          </button>

          <span className="w-px h-3.5 bg-slate-800" />

          <button
            onClick={() => setIsInteractive(!isInteractive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition font-medium ${
              isInteractive ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'hover:bg-slate-800 text-slate-400'
            }`}
            title="Enable/disable dragging the 3D model with your mouse"
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>{isInteractive ? 'Orbit Active' : 'Enable Orbit'}</span>
          </button>

          <span className="w-px h-3.5 bg-slate-800" />

          <div className="flex items-center gap-1 text-[11px] text-slate-400 px-1">
            <span
              className={`w-2 h-2 rounded-full ${
                thread === 'python'
                  ? 'bg-amber-400'
                  : thread === 'ai'
                  ? 'bg-cyan-400'
                  : 'bg-emerald-400'
              }`}
            />
            <span className="font-mono uppercase text-[10px] tracking-wide">
              {thread === 'python' ? 'Python Helix' : thread === 'ai' ? 'AI Neural Cluster' : 'Converged Matrix'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
