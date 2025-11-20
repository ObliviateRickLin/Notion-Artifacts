export const DEFAULT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Holographic HDD</title>
    <style>
        body { margin: 0; overflow: hidden; background: #000; color: #0f0; font-family: 'Courier New', monospace; }
        canvas { display: block; }
        #info { position: absolute; top: 10px; left: 10px; pointer-events: none; }
    </style>
</head>
<body>
    <div id="info">HOLOGRAPHIC STORAGE SYSTEM v9.0</div>
    <script type="module">
        import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
        import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // HDD Platters
        const geometry = new THREE.CylinderGeometry(2, 2, 0.1, 64);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.5 });
        
        const platter1 = new THREE.Mesh(geometry, material);
        const platter2 = new THREE.Mesh(geometry, material);
        platter2.position.y = 0.5;
        
        scene.add(platter1);
        scene.add(platter2);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0x00ffff });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 5;
        camera.position.y = 2;

        function animate() {
            requestAnimationFrame(animate);
            
            platter1.rotation.y += 0.02;
            platter2.rotation.y -= 0.02;
            particlesMesh.rotation.y += 0.005;
            
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>`;

export const TEMPLATES = {
    "Holographic HDD": DEFAULT_TEMPLATE,
    "Simple Button": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: transparent; }
        button {
            padding: 15px 30px;
            font-size: 18px;
            background: linear-gradient(45deg, #ff00cc, #3333ff);
            border: none;
            border-radius: 25px;
            color: white;
            cursor: pointer;
            transition: transform 0.2s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        button:hover { transform: scale(1.05); }
        button:active { transform: scale(0.95); }
    </style>
</head>
<body>
    <button onclick="alert('Clicked!')">Click Me</button>
</body>
</html>`
};
