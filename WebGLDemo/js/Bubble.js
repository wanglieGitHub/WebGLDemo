/**
 * Created by Administrator on 2016/4/28.
 */
var camera, scene, renderer;
var  stats;
var canvas;
var cube;
var num = 0;
var info;
function canvas3D() {
    init();
    CreateCube();
    animate();
}


function init() {

    //添加界面层
    info = document.createElement( 'div' );
    document.getElementById("container").appendChild(info);
    info.style.position = 'absolute';
    info.style.margin = 'auto';
    info.style.zIndex="100";
    info.style.top = '55px';
    info.style.right='15px';
    //添加控制界面组件
    var configs = new function () {
        this.ArrayNum = 3;
        this.Array = "1,2,3";
    }
    var  gui = new  dat.GUI();
    var f1 = gui.addFolder('CreateArray');
    f1.add(configs,'ArrayNum');
    f1.add(configs,'Array');
    var f2 = gui.addFolder('ControlSort');
    f1.open();
    info.appendChild(gui.domElement)

    var width = document.getElementById('container').clientWidth;//获取画布「container」的宽
    var  height = document.getElementById('container').clientHeight;//获取画布「container」的高

    //场景
    scene = new THREE.Scene();
    //相机
    camera = new THREE.PerspectiveCamera( 70, width / height, 1, 1000 );
    //设置相机
    camera.position.x = 00;
    camera.position.y = 12;
    camera.position.z = 28;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //光线
    var ambiLight = new THREE.AmbientLight(0x141414)
    scene.add(ambiLight);
    var light = new THREE.DirectionalLight();
    light.position.set(0, 20, 20);
    scene.add(light)
    //渲染器
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0xf0f0f0, 1.0);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;
    document.getElementById("container").appendChild(renderer.domElement);

    //控制
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 1, 0 );
    controls.update();
    //性能监视器
   // stats = new Stats();
    //document.getElementById("stats-output").appendChild(stats.domElement);

}

function CreateCube() {
    //材质
    canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    var context = canvas.getContext( '2d' );
    context.fillStyle='rgba(255, 0, 204,1)';
    context.fillRect(0,0,256,128);
    context.shadowColor = 'rgba(255,255,255,1)';
    context.shadowBlur=10;
    context.font ='100px Arial';
    context.fillStyle = 'rgba(255,255,255,0.75)';
    context.textAlign="center";
    context.fillText("10",90,90);
    //创建物体
    var geometry = new THREE.CubeGeometry( 10, 10, 1);
    //将材质转换成纹理
    var canvasMap = new THREE.Texture(canvas);
    //将纹理贴在物体上
    var materialArray =[];
    materialArray.push(new THREE.MeshBasicMaterial({transparent: true,opacity: 0.5,color:0xff00cc}));
    materialArray.push(new THREE.MeshBasicMaterial({transparent: true,opacity: 0.5,color:0xff00cc}));
    materialArray.push(new THREE.MeshBasicMaterial({transparent: true,opacity: 0.5,color:0xff00cc}));
    materialArray.push(new THREE.MeshBasicMaterial({transparent: true,opacity: 0.5,color:0xff00cc}));
    materialArray.push(new THREE.MeshBasicMaterial({map:canvasMap}));
    materialArray.push(new THREE.MeshBasicMaterial({transparent: true,opacity: 0.5,color:0xff00cc}));
    var faceMaterial = new THREE.MeshFaceMaterial(materialArray);
    cube = new  THREE.Mesh(geometry,faceMaterial);
    cube.position.y = 0;
    cube.position.X = 0;
    cube.position.Z = 0;
    scene.add( cube );
}

function animate() {
    requestAnimationFrame( animate );
   // stats.begin();
    cube.material.materials[4].map.needsUpdate = true;
    render();
    //stats.end();
}
function render() {
    renderer.render(scene, camera);
}