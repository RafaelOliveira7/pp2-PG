// GL
const vShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
`
const fShader = `
varying vec2 v_uv;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_time;

void main() {
  vec2 v = u_mouse / u_resolution;
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float colorIndex = mod(u_time * 0.5, 3.3); // Alterna entre 0, 1 e 2
  vec3 color;

  if (colorIndex < 1.0) {
    color = vec3(0.0, 0.0, 1.0); // Azul
  } else if (colorIndex < 2.0) {
    color = vec3(0.0, 1.0, 0.0); // Verde
  } else {
    color = vec3(1.0, 1.0, 0.0); // Amarelo
  }
  
  gl_FragColor = vec4(color, 1.0);
}
`

// shader uniforms
const uniforms = {
  u_mouse: { value: { x: window.innerWidth / 2, y: window.innerHeight / 2 } },
  u_resolution: { value: { x: window.innerWidth, y: window.innerHeight } },
  u_time: { value: 0.0 },
  u_color: { value: new THREE.Color(0xFF0000) }
}

// scene
const scene = new THREE.Scene();

// set clock
const clock = new THREE.Clock();

// camera
let aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera( 15, aspect, 1, 1000 );
camera.position.z = 10;

// renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// geometry and material
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms
});

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add( cube ); // add to scene

// render
function render() {
  // rotate the cube
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  // update time uniform
  uniforms.u_time.value = clock.getElapsedTime();
  // animation loop
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}

// mousemove
document.addEventListener('mousemove', (e) =>{
   uniforms.u_mouse.value.x = e.clientX;
   uniforms.u_mouse.value.y = e.clientY;
 })
// window resize
function onWindowResize( event ) {
  const aspectRatio = window.innerWidth/window.innerHeight;
  let width, height;
  if (aspectRatio>=1){
    width = 1;
    height = (window.innerHeight/window.innerWidth) * width;
  }else{
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  if (uniforms.u_resolution !== undefined){
    uniforms.u_resolution.value.x = window.innerWidth;
    uniforms.u_resolution.value.y = window.innerHeight;
  }
}

// run everything
render();