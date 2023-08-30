document.addEventListener("click", () => {
    boxmaterial.wireframe = !boxmaterial.wireframe;
    spherematerial.wireframe = !spherematerial.wireframe;
    torusmaterial.wireframe = !torusmaterial.wireframe;
    d20material.wireframe = !d20material.wireframe;
});

var d20pulse = 1;

function animate() {

    requestAnimationFrame( animate );

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    sphere.rotation.x += 0.02;

    torusKnot.rotation.y += 0.02;
    torusKnot.rotation.z += 0.02;

    d20.rotation.y += 0.02;
    d20.scale.set(d20pulse%3, d20pulse%3, d20pulse%3);
    d20pulse++;

    renderer.render( scene, camera );
}


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

