import * as THREE from 'three'
import * as CANNON from 'cannon-es'
// import CannonDebugger from 'cannon-es-debugger'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Debug from './Utils/Debug.js'

let instance = null

export default class Experience
{
    constructor(canvas) 
    {
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Physics
        this.physics = new CANNON.World()
        this.physics.broadphase = new CANNON.SAPBroadphase(this.physics)
        // this.physics.allowSleep = true
        this.physics.gravity.set(0, -3, 0)
        
        this.defaultMaterial = new CANNON.Material('default')
        
        
        this.defaultContactMaterial = new CANNON.ContactMaterial(
           this.defaultMaterial,
           this.defaultMaterial,
          {
               friction: 0.3,
               restitution: 0.7
          }
        )
        this.physics.addContactMaterial(this.defaultContactMaterial)

        // this.cannonDebugger = new CannonDebugger(this.scene, this.physics)

        // Sizes resize event
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => 
        {
            this.update()
        })
    }
    resize() 
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update() 
    {   
        this.physics.step(1/60, this.time.delta, 3)
        // this.physics.fixedStep()

        if(this.world.rover)
        {
        this.camera.update()
        }
        this.world.update()
        this.renderer.update()
        // this.cannonDebugger.update()

    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse whole scene
        this.scene.traverse((child) => 
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
    }
}

