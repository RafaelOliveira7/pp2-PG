document.addEventListener("click", () => {
    torusMaterial.wireframe = !torusMaterial.wireframe;
    d20material.wireframe = !d20material.wireframe;
});

var d20pulse = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

const topCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
topCamera.position.set(0, 10, 0);
topCamera.lookAt(0, 0, 0);

let activeCamera = camera;

document.addEventListener("keydown", (event) => {
    if (event.key === "1") {
        activeCamera = camera;
    } else if (event.key === "2") {
        activeCamera = topCamera;
    }
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const d20geometry = new THREE.IcosahedronGeometry(1,0);
const d20material = new THREE.MeshBasicMaterial( { color: 0xf20303 } );
d20material.wireframe = true;
const d20 = new THREE.Mesh( d20geometry, d20material );
d20.scale.set(0.9,0.9,0.9);
d20.position.set(0,-2,0);

const torusGeomentry = new THREE.TorusGeometry( 1, 0.4, 12, 25 ); 
const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xdb03fc } ); 
torusMaterial.wireframe = true;
const torus = new THREE.Mesh( torusGeomentry, torusMaterial );
torus.scale.set(0.9,0.9,0.9);
torus.position.set(0,2,0);

camera.position.z = 5;
camera.lookAt(0, 0, 0);

scene.add( torus, d20 );

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.02;

    d20.rotation.y += 0.02;
    d20.scale.set(d20pulse%3, d20pulse%3, d20pulse%3);
    d20pulse++;

    renderer.render( scene, activeCamera );
}

animate();
