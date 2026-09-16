import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root 3D group
    const spiderGroup = new THREE.Group();
    scene.add(spiderGroup);

    // -------------------------------------------------------------
    // 1. MATERIALS (Metallic Ruby Red & Dark Carbon)
    // -------------------------------------------------------------
    const rubyRedMat = new THREE.MeshStandardMaterial({
      color: 0xe61a22,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x55080c,
      emissiveIntensity: 0.5,
    });

    const darkCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x141822,
      metalness: 0.7,
      roughness: 0.35,
      emissive: 0x070a10,
    });

    const extrudeSettings = {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    // -------------------------------------------------------------
    // 2. SPIDER BODY (Thorax & Elongated Abdomen)
    // -------------------------------------------------------------
    // Head
    const headShape = new THREE.Shape();
    headShape.moveTo(0, 0.65);
    headShape.lineTo(0.22, 0.45);
    headShape.lineTo(0.18, 0.25);
    headShape.lineTo(-0.18, 0.25);
    headShape.lineTo(-0.22, 0.45);
    headShape.closePath();
    const headMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(headShape, extrudeSettings), rubyRedMat);
    spiderGroup.add(headMesh);

    // Thorax (Chest)
    const thoraxShape = new THREE.Shape();
    thoraxShape.moveTo(0, 0.24);
    thoraxShape.lineTo(0.32, 0.05);
    thoraxShape.lineTo(0.24, -0.22);
    thoraxShape.lineTo(0, -0.32);
    thoraxShape.lineTo(-0.24, -0.22);
    thoraxShape.lineTo(-0.32, 0.05);
    thoraxShape.closePath();
    const thoraxMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(thoraxShape, extrudeSettings), rubyRedMat);
    spiderGroup.add(thoraxMesh);

    // Elongated Tapered Abdomen (The Amazing Spider-Man style)
    const abdomenShape = new THREE.Shape();
    abdomenShape.moveTo(0, -0.34);
    abdomenShape.lineTo(0.38, -0.65);
    abdomenShape.lineTo(0.3, -1.25);
    abdomenShape.lineTo(0, -1.8);
    abdomenShape.lineTo(-0.3, -1.25);
    abdomenShape.lineTo(-0.38, -0.65);
    abdomenShape.closePath();
    const abdomenMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(abdomenShape, extrudeSettings), rubyRedMat);
    spiderGroup.add(abdomenMesh);

    // -------------------------------------------------------------
    // 3. 8 ANGULAR NEEDLE LEGS (Andrew Garfield / Amazing Spider Style)
    // -------------------------------------------------------------
    // Helper to create symmetric leg pairs
    const createLegPair = (points, depthOffset = 0) => {
      // Right Leg
      const rightShape = new THREE.Shape();
      rightShape.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        rightShape.lineTo(points[i][0], points[i][1]);
      }
      rightShape.closePath();
      const rMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(rightShape, extrudeSettings), rubyRedMat);
      rMesh.position.z = depthOffset;
      spiderGroup.add(rMesh);

      // Left Leg (Mirrored on X)
      const leftShape = new THREE.Shape();
      leftShape.moveTo(-points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        leftShape.lineTo(-points[i][0], points[i][1]);
      }
      leftShape.closePath();
      const lMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(leftShape, extrudeSettings), rubyRedMat);
      lMesh.position.z = depthOffset;
      spiderGroup.add(lMesh);
    };

    // Leg 1: Highest Upper Leg (Rising up steep and sharp)
    createLegPair([
      [0.2, 0.2],
      [0.45, 1.1],
      [0.38, 1.85],
      [0.28, 1.8],
      [0.34, 1.05],
      [0.15, 0.25],
    ]);

    // Leg 2: Flared Upper-Mid Leg (Sweeping wide & sharp)
    createLegPair([
      [0.25, 0.05],
      [0.85, 0.75],
      [1.45, 1.35],
      [1.35, 1.32],
      [0.78, 0.68],
      [0.18, 0.08],
    ], 0.02);

    // Leg 3: Lower-Mid Leg (Angular elbow reaching wide then down)
    createLegPair([
      [0.25, -0.2],
      [1.15, -0.1],
      [1.65, -0.85],
      [1.52, -0.88],
      [1.05, -0.18],
      [0.2, -0.26],
    ]);

    // Leg 4: Longest Downward Leg (Curving down towards abdomen tip)
    createLegPair([
      [0.22, -0.38],
      [0.85, -0.65],
      [1.15, -1.6],
      [1.02, -1.65],
      [0.72, -0.72],
      [0.18, -0.44],
    ], 0.02);

    // -------------------------------------------------------------
    // 4. FLOATING METALLIC BACKPLATE CREST & ORBITAL RINGS
    // -------------------------------------------------------------
    // Dark metallic crest disc
    const crestGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.1, 48);
    const crestMesh = new THREE.Mesh(crestGeo, darkCarbonMat);
    crestMesh.rotation.x = Math.PI / 2;
    crestMesh.position.z = -0.22;
    spiderGroup.add(crestMesh);

    // Outer Glowing Crimson Energy Ring
    const outerRingGeo = new THREE.TorusGeometry(2.7, 0.03, 16, 80);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xff2229,
      transparent: true,
      opacity: 0.65,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    spiderGroup.add(outerRing);

    // Orbital Cyan Web Ring (Incline rotation)
    const cyanRingGeo = new THREE.TorusGeometry(3.1, 0.02, 16, 80);
    const cyanRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.55,
    });
    const cyanRing = new THREE.Mesh(cyanRingGeo, cyanRingMat);
    cyanRing.rotation.x = Math.PI / 3;
    spiderGroup.add(cyanRing);

    // -------------------------------------------------------------
    // 5. AMBIENT CODE EMBERS & PARTICLES
    // -------------------------------------------------------------
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff3b44,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    spiderGroup.add(particleCloud);

    // -------------------------------------------------------------
    // 6. CINEMATIC DUAL LIGHTING (Crimson & Electric Cyan)
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff1f26, 6, 16);
    redLight.position.set(-3.5, 2.5, 4);
    scene.add(redLight);

    const blueLight = new THREE.PointLight(0x00d2ff, 5.5, 16);
    blueLight.position.set(3.5, -2.5, 4);
    scene.add(blueLight);

    // Front directional key light for metallic sheen
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(0, 3, 5);
    scene.add(keyLight);

    // -------------------------------------------------------------
    // 7. MOUSE PARALLAX & ANIMATION LOOP
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.7;
      targetY = y * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Subtle breathing float & 3D rotation
      spiderGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.25 + mouseX;
      spiderGroup.rotation.x = Math.sin(elapsedTime * 0.6) * 0.12 - mouseY;
      spiderGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12; // breathing bob

      // Spin orbital rings
      cyanRing.rotation.z += 0.006;
      outerRing.rotation.z -= 0.004;

      // Particle drift
      particleCloud.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-scene-wrapper">
      <div ref={containerRef} className="three-canvas-container" />
      {/* Spider HUD Badges */}
      <div className="scene-badge-top">
        <span className="hero-badge-pulse"></span>
        <span>SPIDER-MAN INSIGNIA // 3D</span>
      </div>
      <div className="scene-badge-bottom">
        <span>THE AMAZING SPIDER // ACTIVE</span>
      </div>
    </div>
  );
}
