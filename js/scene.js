import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const constraints = {
    audio: true,
    video: false
}

console.log(await navigator.mediaDevices.enumerateDevices());

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(2, 512, 512);


const vertexShader = /*glsl*/`
struct wave{
    float theta;
    float phi;
    float amplitude;
    float time;
};
const int num_waves = 20;
uniform wave waves[num_waves];
varying vec4 vertPos;
varying vec3 truPos;
void main() {
  truPos = position;

  for (int i = 0; i < num_waves; ++i) {
    vec3 wavePos = vec3(2.0 * sin(waves[i].phi) * cos(waves[i].theta), 2.0 *  sin(waves[i].phi) * sin(waves[i].theta), 2.0 * cos(waves[i].phi));
    vec3 distanceVector = wavePos - truPos;
    float dist = sqrt(dot(distanceVector, distanceVector));
    truPos = truPos * (1.0 + min(1.0, waves[i].time) * pow(cos((dist + waves[i].time - 1.0) * 2.0), 21.0)/(10.0/waves[i].amplitude * max(1.0, dist) * pow(max(1.0, waves[i].time), 2.0)));
  }
  
  vertPos = projectionMatrix * modelViewMatrix * vec4(truPos, 1.0);
  gl_Position = vertPos;
}
`;
const fragmentShader = /*glsl*/`
varying vec4 vertPos;
varying vec3 truPos;

void main() {
  gl_FragColor = vec4(normalize(truPos), 1.0) + vec4(0.1, 0.1, 0.1, 1.0);
}
`;
const material = new THREE.ShaderMaterial({
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    uniforms: {
        waves: {
            value: [{ theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 },
            { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 },
            { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 },
            { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 },
            { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }, { theta: 0, phi: 1, amplitude: 3, time: Math.random() * 10 }]
        }
    }
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    sphere.material.uniforms.waves.value.forEach(wave => { // adjust time
        wave.time += 0.005;
    })

    for (let i = 0; i < sphere.material.uniforms.waves.value.length; i++) {
        if (sphere.material.uniforms.waves.value[i].time >= 10) {
            sphere.material.uniforms.waves.value[i] = {
                theta: Math.random() * 2 * Math.PI,
                phi: Math.random() * Math.PI,
                amplitude: Math.random() * 3 + 1,
                time: 0
            }
        }
    }
    // replace old waves
    sphere.rotation.x += 0.003;
    sphere.rotation.y += 0.003;

    renderer.render(scene, camera);
}

animate();

