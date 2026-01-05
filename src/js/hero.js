
import * as THREE from 'three';

const initHero = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6c5ce7,
        transparent: true,
        opacity: 0.8,
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    // Target position for smooth interpolation
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.001;
        mouseY = (event.clientY - windowHalfY) * 0.001;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation based on mouse
        targetX = mouseX * 2;
        targetY = mouseY * 2;

        particlesMesh.rotation.y += 0.001; // Constant rotation
        particlesMesh.rotation.x += (mouseY - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX - particlesMesh.rotation.y * 0.05) * 0.05;

        // Wave motion
        particlesMesh.position.y = Math.sin(elapsedTime * 0.2) * 0.2;

        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();

    // Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initHero);
