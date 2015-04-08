var scene = new THREE.Scene();

var height = 500;
var width = 500;

var camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 10 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
var quad = new THREE.Mesh( geometry, material );

//renderer size
renderer.setSize( width, height );
//link renderer to html body
document.body.appendChild( renderer.domElement );
//add cube to scene
scene.add( quad );
//render scene
renderer.render(scene,camera);