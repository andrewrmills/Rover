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
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Camera')
        }

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
            this.instance.position.set(50, 25, -40)
            this.scene.add(this.instance)

            if(this.debug.active)
            {
                this.debugFolder
                .add(this.instance.position, 'x')
                .name('cameraX')
                .min(-50)
                .max(50)
                .step(1)

                this.debugFolder
                .add(this.instance.position, 'y')
                .name('cameraY')
                .min(-50)
                .max(50)
                .step(1)

                this.debugFolder
                .add(this.instance.position, 'z')
                .name('cameraZ')
                .min(-50)
                .max(50)
                .step(1)
            }
   
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
            this.roverX + 50,
            this.roverY + 25,
            this.roverZ - 40
        )

        this.instance.lookAt(this.experience.world.scene.children[2].position)  
    }

    update() 
    {
        this.controls.update()
        // this.followRover()
    }
}