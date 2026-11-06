import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ZenAtmosphereSceneProps {
  isDark: boolean;
}

export const ZenAtmosphereScene: React.FC<ZenAtmosphereSceneProps> = ({ isDark }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<{
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    terrainMat: THREE.MeshStandardMaterial;
    hemiLight: THREE.HemisphereLight;
    keyLight: THREE.DirectionalLight;
    backRim: THREE.DirectionalLight;
  } | null>(null);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    // Software WebGL probe
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.0 : 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const bgColor = isDark ? 0x08080a : 0xfcfcfd;
    scene.fog = new THREE.Fog(bgColor, 6, 22);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 40);
    camera.position.set(0, 1.4, 9.5);

    // Track disposables
    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];

    // Lighting
    const hemiLight = new THREE.HemisphereLight(
      isDark ? 0x1f2430 : 0xffffff,
      isDark ? 0x08080a : 0xe2e8f0,
      isDark ? 1.2 : 2.0
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 1.2 : 2.4);
    keyLight.position.set(5, 8, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const backRim = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0xbae6fd, isDark ? 0.8 : 1.0);
    backRim.position.set(-6, 2, -6);
    scene.add(backRim);

    // Parametric Terrain (smooth undulating porcelain landscape)
    const terrainGeo = new THREE.PlaneGeometry(28, 20, 64, 48);
    geos.push(terrainGeo);

    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const u = posAttr.getX(i);
      const v = posAttr.getY(i);
      const zWave =
        Math.sin(u * 0.35) * 0.45 +
        Math.cos(v * 0.3) * 0.5 +
        Math.sin((u + v) * 0.2) * 0.35 +
        Math.cos(u * 0.8) * 0.12;
      posAttr.setZ(i, zWave);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x111319 : 0xf8fafc,
      roughness: 0.82,
      metalness: 0.04,
      flatShading: false,
    });
    mats.push(terrainMat);

    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.rotation.x = -Math.PI / 2.3;
    terrain.position.set(0, -1.2, 0);
    terrain.receiveShadow = !isSoftwareGl;
    scene.add(terrain);

    elementsRef.current = {
      scene,
      renderer,
      terrainMat,
      hemiLight,
      keyLight,
      backRim,
    };

    // Parallax mouse tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 1.2;
      targetMouseY = y * 0.6;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      // Smooth mouse damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 1.5;
      camera.position.y = 1.4 - currentMouseY * 0.8;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);

      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      elementsRef.current = null;
    };
  }, []); // Run once on mount

  // React to isDark prop changes dynamically without remounting the WebGL canvas
  useEffect(() => {
    if (!elementsRef.current) return;
    const { scene, renderer, terrainMat, hemiLight, keyLight, backRim } = elementsRef.current;
    const bgColor = isDark ? 0x08080a : 0xfcfcfd;
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.setHex(bgColor);
    }
    terrainMat.color.setHex(isDark ? 0x111319 : 0xf8fafc);
    hemiLight.color.setHex(isDark ? 0x1f2430 : 0xffffff);
    hemiLight.groundColor.setHex(isDark ? 0x08080a : 0xe2e8f0);
    hemiLight.intensity = isDark ? 1.2 : 2.0;
    keyLight.intensity = isDark ? 1.2 : 2.4;
    backRim.color.setHex(isDark ? 0x38bdf8 : 0xbae6fd);
    renderer.toneMappingExposure = isDark ? 1.0 : 1.15;
  }, [isDark]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div ref={containerRef} className="w-full h-full" />
      {/* Bottom fade gradient into page */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#fbfbfd] dark:from-[#08080a] to-transparent pointer-events-none transition-colors duration-400" />
    </div>
  );
};
