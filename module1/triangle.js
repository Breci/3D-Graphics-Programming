// Global scene object 
            var scene; 
 
            // Global camera object 
            var camera; 
  
            // Initialize the scene 
            initializeScene(); 
  
            // Render the scene (map the 3D world to the 2D scene) 
            renderScene(); 
  
            /** 
            * Initialze the scene. 
            */ 
            function initializeScene(){ 

                renderer = new THREE.WebGLRenderer({antialias:true}); 
 
                // Set the background color of the renderer to black, with full opacity 
                renderer.setClearColor(0xFFFFFF, 1); 
  
                // Get the size of the inner window (content area) to create a full size renderer 
                canvasWidth = 500; 
                canvasHeight = 500; 
 
                // Set the renderers size to the content areas size 
                renderer.setSize(canvasWidth, canvasHeight); 
 
                // Get the DIV element from the HTML document by its ID and append the renderers DOM 
                // object to it 
                document.getElementById("WebGLCanvas").appendChild(renderer.domElement); 
 
                // Create the scene, in which all objects are stored (e. g. camera, lights, 
                // geometries, ...) 
                scene = new THREE.Scene(); 
 
                // Now that we have a scene, we want to look into it. Therefore we need a camera. 
                // Three.js offers three camera types: 
                //  - PerspectiveCamera (perspective projection) 
                //  - OrthographicCamera (parallel projection) 
                //  - CombinedCamera (allows to switch between perspective / parallel projection 
                //    during runtime) 
                // In this example we create a perspective camera. Parameters for the perspective 
                // camera are ... 
                // ... field of view (FOV), 
                // ... aspect ratio (usually set to the quotient of canvas width to canvas height) 
                // ... near and 
                // ... far. 
                // Near and far define the cliping planes of the view frustum. Three.js provides an 
                // example (http://mrdoob.github.com/three.js/examples/ 
                // -> canvas_camera_orthographic2.html), which allows to play around with these 
                // parameters. 
                // The camera is moved 10 units towards the z axis to allow looking to the center of 
                // the scene. 
                // After definition, the camera has to be added to the scene. 
                camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100); 
                camera.position.set(0, 0, 10); 
                camera.lookAt(scene.position); 
                scene.add(camera); 
  
                // Create the triangle (or any arbitrary geometry). 
                // 1. Instantiate the geometry object 
                // 2. Add the vertices 
                // 3. Define the faces by setting the vertices indices 
                var triangleGeometry = new THREE.Geometry(); 
                triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  1.0, 0.0)); 
                triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
                triangleGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
                triangleGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
  
                // To color the surface, a material has to be created. If all faces have the same color, 
                // the THREE.MeshBasicMaterial fits our needs. It offers a lot of attributes (see 
                // https://github.com/mrdoob/three.js/blob/master/src/materials/MeshBasicMaterial.js) 
                // from which we need in this lesson only 'color'. 
  
                // Create a white basic material and activate the 'doubleSided' attribute to force the 
                // rendering of both sides of each face (front and back). This prevents the so called 
                // 'backface culling'. Usually, only the side is rendered, whose normal vector points 
                // towards the camera. The other side is not rendered (backface culling). But this 
                // performance optimization sometimes leads to wholes in the surface. When this happens 
                // in your surface, simply set 'doubleSided' to 'true'. 
                var triangleMaterial = new THREE.MeshBasicMaterial({ 
                    color:0xFF0000, 
                    side:THREE.DoubleSide 
                }); 
  
                // Create a mesh and insert the geometry and the material. Translate the whole mesh 
                // by -1.5 on the x axis and by 4 on the z axis. Finally add the mesh to the scene. 
                var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 
                triangleMesh.position.set(-1.5, 0.0, 4.0); 
                scene.add(triangleMesh); 
            } 
  
            /** 
            * Render the scene. Map the 3D world to the 2D screen.
            */ 
            function renderScene(){ 
                renderer.render(scene, camera); 
            } 