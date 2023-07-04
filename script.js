const scene = new THREE.Scene();
const camera = new THREE.Camera();

scene.add(camera);
const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var ArToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
});
ArToolkitSource.init(function(){
    setTimeout(function(){
        ArToolkitSource.onResizeElement();
        ArToolkitSource.copyElementSizeTo(renderer.domElement)
    })
});
var ArToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: 'camera_para.dat',
    detectionMode: 'color_and_matrix',
});
ArToolkitContext.init(function(){
    camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
})

var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext,camera,{
   type : 'pattern',
   patternUrl : 'pattern-1_sekou.patt',
   changeMatrixMode : 'cameraTransformMatrix'
});
scene.visible = false;

//

//// Create a video element
const video = document.createElement('video');
video.src = '1_sekou.mp4';
video.autoplay = true;
video.loop = true;

// Create a texture from the video element
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;
videoTexture.format = THREE.RGBFormat;

// Create a plane geometry
const geometry = new THREE.PlaneGeometry(1, 1);

// Create a material with the video texture
const material = new THREE.MeshBasicMaterial({ map: videoTexture });

// Create a mesh using the geometry and material
const plane = new THREE.Mesh(geometry, material);

// Set the position of the plane
plane.position.y = 0; // Adjust the position as needed

// Add the plane to the scene
scene.add(plane);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

    ArToolkitContext.update(ArToolkitSource.domElement);
    scene.visible = camera.visible;
	renderer.render( scene, camera );
}

animate();