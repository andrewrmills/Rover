import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor() 
    {
        this.experience = new Experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            // FOV
            35,
            // Aspect
            this.sizes.width / this.sizes.height,
            // Near
            0.1,
            // Far
            500
            )
            // this.instance.position.set(16, 8, 18)
            this.instance.position.set(-0.2, 27, -35)
            this.scene.add(this.instance)
   
    }

    setOrbitControls() 
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() 
    {
        this.instance.aspect - this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    followRover()
    {
        this.roverX = this.experience.world.scene.children[2].position.x
        this.roverY = this.experience.world.scene.children[2].position.y
        this.roverZ = this.experience.world.scene.children[2].position.z

        this.instance.position.set(
            this.roverX - 0.2,
            this.roverY + 27,
            this.roverZ - 35
        )

        this.instance.lookAt(this.experience.world.scene.children[2].position)  
    }

    update() 
    {
        this.controls.update()
        this.followRover()
    }
}