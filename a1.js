/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vjan2018
//  Assignment 1 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('Assignment 1 (Zafer Cavdar)');
// console.log(3/0); // This prints infinity
// console.log(isFalse); // ReferenceError: isFalse is not defined
// var foo;
//console.log(foo); // undefined

// Semicolons are not statement terminators but separators. If we don't put a semicolon,
// interpreter insert one semicolon to end of var, expression, continue, return, break statements.
// But we have to use semicolons if we want to type more than one expression in a single line
// Source: http://inimino.org/~inimino/blog/javascript_semicolons

/*
  a=4;
  b=5;
  function go() {
    var a = 14;
    b = 15;
  }
  go();
  console.log('a=',a,'b=',b);
  // a=4, b= 15, because variable a defined function go is a local variable
  // b is a global variable.
*/

//  another print example
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(0xd0f0d0); // set background colour
renderer.setClearColor(0x87CEFA); // sky light-blue
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////

light = new THREE.PointLight(0xFFFFFF);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var yellowMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var orangeMaterial = new THREE.MeshLambertMaterial( {color: 0xee8317, side: THREE.DoubleSide } );


///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////
// WORLD COORDINATE FRAME
/////////////////////////////////////

var worldFrame = new THREE.AxisHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////
// FLOOR with texture
/////////////////////////////////////

floorTexture = new THREE.ImageUtils.loadTexture('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, yellowMaterial);
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   twisting boxes
///////////////////////////////////////////////////////////////////////

var whiteMaterial = new THREE.MeshLambertMaterial( {color: 0xF7F7F2} );
var greenMaterial = new THREE.MeshLambertMaterial( {color: 0x46DA2B} );
var yellowMaterial = new THREE.MeshLambertMaterial( {color: 0xE4E40B} );
var materials = [whiteMaterial, greenMaterial, yellowMaterial];
boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
for (var i = 0; i < 3; i++) {
  box = new THREE.Mesh( boxGeometry, materials[i] );
  box.position.set(-4, i, 0);
  box.rotation.set(0, -i*0.4, 0);
  scene.add( box );
}


///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html]
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
var mccMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
  // Cube parameters: width (x), height (y), depth (z),
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
// using THREE.MeshFaceMaterial() in the constructor below
// causes the mesh to use the materials stored in the geometry
mcc = new THREE.Mesh( mccGeometry, mccMaterials );
mcc.position.set(-2,0,0);
scene.add( mcc );


// CREATIVE Part
// helix structure
var helixSize = 50;
var helixGap = 1.0 / helixSize;
var rectHeight = 5.0 / helixSize;
var helixColorMaterialGreen = new THREE.MeshLambertMaterial( {color: 0x1f3ac4} );
var helixColorMaterialRed = new THREE.MeshLambertMaterial( {color: 0xc13e20} );
var rectangeGeometry = new THREE.BoxGeometry(2, rectHeight, 0.1);
var leftRectangles = [];
var rightRectangles = [];

for (var i = 0; i < helixSize * 1.5; i++) {
  rectangle = new THREE.Mesh(rectangeGeometry, helixColorMaterialGreen);
  rectangle.position.set(-1, (rectHeight + helixGap) * i - 1, 7);
  rectangle.rotation.set(0, (3.14 / helixSize) * i , 0);
  scene.add(rectangle);
  leftRectangles.push(rectangle);

  rectangle2 = new THREE.Mesh(rectangeGeometry, helixColorMaterialRed);
  rectangle2.rotation.set(0, -(3.14 / helixSize) * i , 0);
  rectangle2.position.set(+1, (rectHeight + helixGap) * i - 1, 7);
  scene.add(rectangle2);
  rightRectangles.push(rectangle2);
}


/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
cylinder.position.set(2, 0, 0);
scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );


// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torus2 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus2.position.set(6 + 1.2, 0, 0);   // translation
torus2.rotation.set(1.57 ,0,0);     // rotation about x,y,z axes
scene.add( torus2 );

/////////////////////////////////////
//  CUSTOM OBJECT
////////////////////////////////////

var geom = new THREE.Geometry();
var v0 = new THREE.Vector3(0,0,0);
var v1 = new THREE.Vector3(3,0,0);
var v2 = new THREE.Vector3(0,0,3);
var v3 = new THREE.Vector3(3,0,3);
var v4 = new THREE.Vector3(1.5, 2, 1.5);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.faces.push( new THREE.Face3( 4, 2, 0 ) );
geom.faces.push( new THREE.Face3( 4, 0, 1 ) );
geom.faces.push( new THREE.Face3( 4, 2, 3 ) );
geom.faces.push( new THREE.Face3( 4, 1, 3 ) );
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, orangeMaterial );
customObject.position.set(-1.5, 0, -6);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial();

// LOAD SHADERS
var shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo.fs.glsl'];
})


//   NOTE:  Unfortunately, the following loading code does not easily allow for multiple
//          instantiations of the OBJ geometry.

function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = worldFrame;
    scene.add(object);

  }, onProgress, onError);
}

  // now load the actual armadillol
loadOBJ('obj/armadillo.obj', armadilloMaterial, 1, 0,0,0, 0,Math.PI,0);

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) {
    console.log('W pressed');
    if (light.position.y <= 4.9) {
      light.position.y += 0.1;
    }
  } else if (keyboard.pressed("S")) {
    console.log('S pressed');
    if (light.position.y >= -4.9) {
      light.position.y -= 0.1;
    }
  }

  if (keyboard.pressed("A")) {
    console.log('A pressed');
    if (light.position.x >= -4.9) {
      light.position.x -= 0.1;
    }
  }

  else if (keyboard.pressed("D")) {
    console.log('D pressed');
    if (light.position.x <= 4.9) {
      light.position.x += 0.1;
    }
  }
  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// Animation Function
///////////////////////////////////////////////////////////////////////////////////////
function animate() {
  for (var i in leftRectangles) {
      rect = leftRectangles[i];
      rect.rotation.y += 0.0628;
  }
  for (var i in rightRectangles) {
      rect = rightRectangles[i];
      rect.rotation.y -= 0.0628;
  }
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  animate();
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();

// THREE.WebGLShader: Shader couldn't compile when I removed a semicolon.
