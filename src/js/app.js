var scene, camera, renderer, tick, curves = [];
const rad = Math.PI / 180;

function randomGen(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 250;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 1 );
  document.body.appendChild( renderer.domElement );
  
  tick = 0;
  addCurve();
}

function addCurve(){
  for(var i = 0, l = 5; i < l; i++){
    var hash = randomGen(1, 10);
    var curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3( -window.innerWidth / 10, 0, 0 ),
      new THREE.Vector3( -Math.sin((tick + i * 10) * rad) * window.innerWidth / 4, Math.cos((tick + i * 10) * rad) * window.innerHeight / 4, 0 ),
      new THREE.Vector3( Math.cos((tick + i * 10) * rad) * window.innerWidth / 4, -Math.sin((tick + i * 10) * rad) * window.innerHeight / 4, 0 ),
      new THREE.Vector3( window.innerWidth / 10, 0, 0 )
    );

    var geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints( 50 );
    var material = new THREE.LineBasicMaterial( { color : 0xdddddd } );

    var curveObject = new THREE.Line( geometry, material );  
    scene.add( curveObject );
    curves.push(curveObject);
    curveObject.curve = curve;
    curveObject.hash = hash;
  }
  renderer.render( scene, camera );
  animate();
}

function updateCurve() {
  tick++;
  for (var i = 0, l = curves.length; i < l; i++) {
    var curveLine = curves[i];
    curveLine.curve.v1.x = -Math.sin((tick + i * 10) * rad) * window.innerWidth / 4;
    curveLine.curve.v1.y = Math.cos((tick + i * 10) * rad) * window.innerHeight / 4;
    curveLine.curve.v2.x = Math.cos((tick + i * 10) * rad) * window.innerWidth / 4;
    curveLine.curve.v2.y = -Math.sin((tick + i * 10) * rad) * window.innerHeight / 4;
    curveLine.geometry.vertices = curveLine.curve.getPoints( 50 ); 
    curveLine.geometry.verticesNeedUpdate = true;
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  updateCurve();
  renderer.render( scene, camera );
}

window.addEventListener('resize', ()=>{
  renderer.setSize( window.innerWidth, window.innerHeight );
});

window.addEventListener('load', init);