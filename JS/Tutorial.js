// Define Constants
var moveObject    = false;
var startMovingY   = false;

var startMoving  = false;
document.getElementById("FW2").disabled=false;
document.getElementById("FW").disabled=false;
document.getElementById("LF2").disabled=false;
document.getElementById("LF").disabled=false;
document.getElementById("M").disabled=false;

// Define Machine
var Machine = {
    name: 'Machine',
    position: {x: 0, y: 0, z: 0},
    scale:    {w: 1, l: 0.8, h: 0.8},
    size:     {w: 1, l: 0.8, h: 0.8},
color: 0x888888,
    addObject: function(){
         geometry = new THREE.SphereGeometry(this.size.w, this.size.h, this.size.d);
         material = new THREE.MeshPhongMaterial({color: this.color, transparent: true });
         mesh     = new THREE.Mesh(geometry, material);
        mesh.receiveShadow=true;
        material.opacity = 0.6;
        mesh.position.x = this.position.x;
        mesh.scale.x = this.size.w;
        this.object  = mesh;
    }
  
};



// Define Metal
var Metal = {
    name: 'Metal',
    position: {x: 1.2, y: 0, z: 0},
    size:    {w: 0.5, l: 1, h: 1},
    color: 0xffff88,
    addObject: function(){
        geometry = new THREE.BoxGeometry(this.size.w, this.size.h, this.size.d);
        material = new THREE.MeshPhongMaterial({color: this.color});
        mesh     = new THREE.Mesh(geometry, material);
        mesh.receiveShadow=true;
        mesh.position.x = this.position.x;
        mesh.scale.x = this.size.w;
        this.object  = mesh;
    }
};


// instantiate a loader
var loader = new THREE.TextureLoader();
loader.crossOrigin = true;
// load a resource
loader.load(
    // resource URL
    '/home/mint/Public/Bomb Game/Bomb Game/chess_board.jpg',
    // Function when resource is loaded
    function ( texture ) {
        // do something with the texture
        material.map = texture;
        material.needsUpdate = true;
    },
);
// --------Plane ---------
var texture = new THREE.TextureLoader().load( '/home/mint/Public/Bomb Game/Bomb Game/chess_board.jpg' );

var geometry = new THREE.PlaneGeometry(20, 20);
var material = new THREE.MeshPhongMaterial({map: texture, color: 0xFFFFFF})
var plane = new THREE.Mesh(geometry, material);
// Initialize function
function init() {
    var scene   = new THREE.Scene();
    var gui     = new dat.GUI();
    Machine.addObject();
    Metal.addObject();

    // console.log(Machine);

    // Object control
    // var folder3 = gui.addFolder('position');
    // gui.add(Metal.object.position, 'x', -20,20);
    // gui.add(Metal.object.position, 'y', -20,20);
    // gui.add(Metal.object.position, 'z', -20,20);
    // folder3.open();
    // var folder4 = gui.addFolder('scale');
    // gui.add(Metal.object.scale, 'x', 0,5);
    // gui.add(Metal.object.scale, 'y', 0,5);
    // gui.add(Metal.object.scale, 'z', 0,5);
    // folder4.open();

    //start lights_____________________________________________________________
    // light one
    var spotLight = new THREE.SpotLight( 0xffffff );
    var spotLight = getSpotLight(1);
    spotLight.position.set( 4, 3, 2 );
    spotLight.position.y = 4;
    spotLight.intensity  = 2;
    spotLight.castShadow  = true;

    // light two
    var spotLight2 = new THREE.SpotLight( 0xffffff );
    var spotLight2 = getSpotLight(1);
    spotLight2.position.set( 7, 7, 7 );


    spotLight2.castShadow = true;

    // lighting control
    var folder5 = gui.addFolder('lights');
    gui.add(spotLight2, 'intensity', 0, 10);

    gui.add(spotLight, 'intensity', 0, 10);
    folder5.open();
    // spotLight
    function getSpotLight(intensity) {
        var spotLight = new THREE.SpotLight(0xffffff, intensity);
        spotLight.castShadow = true;

        spotLight.shadow.bias = 0.001;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;

        return spotLight;
    }
    //end lights_______________________________________________________________

    //Start Camera ____________________________________________________________
    var camera = new THREE.PerspectiveCamera(45, 500/500, 1, 1000);
    // var camera = new THREE.OrthographicCamera(-15, 15, 15, -15, 1, 1000);
    camera.position.x= 1;
    camera.position.y =2;
    camera.position.z= 5;
    camera.lookAt(new THREE.Vector3(1,1,1));

    //End   Camera ___________________________________________________________

    // Add items to the scene
    scene.add(Metal.object);
    scene.add(Machine.object);
    scene.add(plane);
    scene.add(spotLight);
    scene.add(spotLight2);

   
    // renderer here
    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
	renderer.setSize(500, 500);
	renderer.setClearColor('rgb(0,0,128)');
    document.getElementById('webgl').appendChild(renderer.domElement);
    // document.getElementById("webgl").width = "10";
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls, Machine, Metal);

    return scene;
}


// animation


function update(renderer, scene,camera, controls, Machine, Metal, moveObjectfw){
    renderer.render(scene, camera);


      function moveToPos() {
      FW2 = document.getElementById('FW');
      var value= FW2.value;
    //   console.log(value);
      if(startMoving){
          if(Math.abs(Machine.object.position.x - value) >= 0.02 ){
              if (value > Machine.object.position.x){
                  Machine.object.position.x += 0.02;

              } else {
                  Machine.object.position.x -= 0.02;

              }
          } else {
              startMoving = false;
          }
      }

}
function moveToPosY() {
LF2 = document.getElementById('LF');
var value= LF2.value;
// console.log(value);
if(startMovingY){
    if(Math.abs(Machine.object.position.y - value) >= 0.02 ){
        if (value > Machine.object.position.y){
            Machine.object.position.y += 0.02;

        } else {
            Machine.object.position.y -= 0.02;

        }
    } else {
        startMovingY = false;
    }
}

}
    scene.traverse(function(chld){

    });
    moveToPos();
    moveToPosY();
            requestAnimationFrame(function(){
            update(renderer,scene,camera, controls, Machine, Metal);
        });
    };
function render(){
    renderer.render(scene, camera);
}

function moveToPos(){
    startMoving = true;
}
function moveToPosY(){
    startMovingY = true;
}
init();
moveToPos();
moveToPosY();
RED();
function M(){
 Machine.object.position.x += 2;
}
