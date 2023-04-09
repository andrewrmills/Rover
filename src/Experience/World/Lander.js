import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Lander
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.world = this.experience.physics
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Lander')
        }

        // Setup
        this.resource = this.resources.items.landerModel

        this.setModel()
    }

    setModel()
    {

      this.x = 2
      this.y = 2
      this.z = 2


        // Physics
        this.shape = new CANNON.Box(new CANNON.Vec3(this.x, this.y, this.z))
        this.body = new CANNON.Body({
            mass: 10,
            position: new CANNON.Vec3(-43, 12, 3),
            quaternion: new CANNON.Quaternion(0, Math.PI/2, 0, 0), 
            shape: this.shape,
            material: this.experience.physics.defaultMaterial
        })

        this.world.addBody(this.body)

        if(this.debug.active)
        {
            this.debugFolder
            .add(this.body.position, 'x')
            .name('landerPositionX')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.body.position, 'y')
            .name('landerPositionY')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.body.position, 'z')
            .name('landerPositionZ')
            .min(-50)
            .max(50)
            .step(1)
        }

        // Model
        this.model = this.resource.scene
        this.model.position.copy(this.body.position)
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)


    }

    update() 
    {      
        this.model.position.copy(this.body.position)
        this.model.quaternion.copy(this.body.quaternion)
    }
}