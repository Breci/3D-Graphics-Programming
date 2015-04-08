// Global scene object 
var scene;

// Global camera object 
var camera;

// The cube has to rotate around all three axes, so we need three rotation values. 

// x, y and z rotation 
var xRotation = 0.0;
var yRotation = 0.0;
var zRotation = 0.0;

// Global mesh object of the cube 
var cubeMesh;

// Initialize the scene 
initializeScene();

// Animate the scene 
animateScene();

/** 
 * Initialze the scene. 
 */
function initializeScene() {

    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setClearColor(0x000000, 1);

    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth, canvasHeight);
    document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

    scene = new THREE.Scene();
    
    //camera
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(scene.position);
    scene.add(camera);
    
    //textures
    var negxTexture = new THREE.ImageUtils.loadTexture("negx.jpg");
    var negyTexture = new THREE.ImageUtils.loadTexture("negy.jpg");
    var negzTexture = new THREE.ImageUtils.loadTexture("negz.jpg");
    var posxTexture = new THREE.ImageUtils.loadTexture("posx.jpg");
    var posyTexture = new THREE.ImageUtils.loadTexture("posy.jpg");
    var poszTexture = new THREE.ImageUtils.loadTexture("posz.jpg");

    //texture array
    var materials = [
        new THREE.MeshBasicMaterial({map: negxTexture, side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({map: negyTexture, side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({map: negzTexture, side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({map: posxTexture, side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({map: posyTexture, side: THREE.FrontSide}),
        new THREE.MeshBasicMaterial({map: poszTexture, side: THREE.FrontSide})];

    var MovingCubeMat = new THREE.MeshFaceMaterial(materials);
    var MovingCubeGeom = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1, materials);
    boxMesh = new THREE.Mesh(MovingCubeGeom, MovingCubeMat);
    boxMesh.position.set(0.0, 0.0, 4.0);
    scene.add(boxMesh);

    
}

/** 
 * Animate the scene and call rendering. 
 */
function animateScene() {
    // At last, we update the rotation values and assign it to the mesh's rotation. 

    // Increase the x, y and z rotation of the cube 
    xRotation += 0.03;
    yRotation += 0.02;
    zRotation += 0.04;
    boxMesh.rotation.set(xRotation, yRotation, zRotation);

    // Define the function, which is called by the browser supported timer loop. If the 
    // browser tab is not visible, the animation is paused. So 'animateScene()' is called 
    // in a browser controlled loop. 
    requestAnimationFrame(animateScene);

    // Map the 3D scene down to the 2D screen (render the frame) 
    renderScene();
}

/** 
 * Render the scene. Map the 3D world to the 2D screen.
 */
function renderScene() {
    renderer.render(scene, camera);
}