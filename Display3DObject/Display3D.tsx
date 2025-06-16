import './App.css'
import * as THREE from "three";
import { useEffect } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function App() {
  let canvas: HTMLCanvasElement;
  let model: THREE.Group;

  useEffect(() => {

    canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    }
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    // camera

    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(-1.3, 0, 2);

    // renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true, // 背景を透明にする
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // importing 3D model
    const gltfloader = new GLTFLoader();

    gltfloader.load("./models/HATO_Joy.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5); // モデルのスケールを調整

      // Add new material to the model
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshBasicMaterial({
            color: 0x00ff00, // ここで色を選択できる 
          });
        }
      });
      scene.add(model);
    });

    // animation 
    const tick = () => {
      if (model) {
        model.rotation.y += 0.01; // モデルを回転させる
      }
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
    // リサイズ対応
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    // ウィンドウのサイズに合わせてカメラとレンダラーを更新
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <>
      <canvas id='canvas'></canvas>
      <div className='mainContent'>
        <h3>あなたの心の形(⋈◍＞◡＜◍)。✧♡</h3>
        <p>yesterday</p>
      </div>
    </>
  )
}

export default App
