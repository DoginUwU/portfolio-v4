import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export class ThreePlanet {
  private readonly scene: THREE.Scene
  private readonly camera: THREE.PerspectiveCamera
  private readonly renderer: THREE.WebGLRenderer
  private readonly controls: OrbitControls
  private readonly gltfLoader: GLTFLoader
  private readonly parent: HTMLElement
  private planet: THREE.Object3D | null = null
  private mixer: THREE.AnimationMixer | null = null

  constructor(parent: HTMLElement) {
    this.parent = parent
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, parent.clientWidth / parent.clientHeight, 0.1, 1000)
    this.controls = new OrbitControls(this.camera, parent)
    this.controls.enableZoom = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.09

    this.gltfLoader = new GLTFLoader()

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(parent.clientWidth, parent.clientHeight)
    this.renderer.setClearColor(0xFFFFFF, 0)
    parent.appendChild(this.renderer.domElement)

    this.gltfLoader.load('/assets/models/stylized_planet.glb', (gltf) => {
      this.scene.add(gltf.scene)
      this.planet = gltf.scene

      this.planetResize()

      this.mixer = new THREE.AnimationMixer(gltf.scene)

      gltf.animations.forEach((clip) => {
        this.mixer?.clipAction(clip).play()
      })
    })

    const light = new THREE.AmbientLight(0xFFFFFF, 2)
    light.position.set(0, 0, 5)
    this.scene.add(light)

    this.camera.position.z = 5
  }

  public animate(): void {
    requestAnimationFrame(this.animate.bind(this))

    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    this.mixer?.update(0.01)
  }

  public onWindowResize(): void {
    const width = this.parent.clientWidth
    const height = this.parent.clientHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)

    this.planetResize()
  }

  private planetResize(): void {
    const width = this.parent.clientWidth

    if (width < 768) {
      this.planet?.scale.set(1.8, 1.8, 1.8)
    }
    else {
      this.planet?.scale.set(3, 3, 3)
    }
  }
}
