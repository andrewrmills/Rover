import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Gantry
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
            this.debugFolder = this.debug.ui.addFolder('Gantry')
        }

        // Setup
        this.resource = this.resources.items.gantryModel

        this.setModel()
    }

    setModel()
    {

      this.x = 17
      this.y = 10
      this.z = 17


        // Physics
        this.shape = new CANNON.Box(new CANNON.Vec3(this.x, this.y, this.z))
        this.body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(-42, 0.1, 3),
            quaternion: new CANNON.Quaternion(), 
            shape: this.shape,
            material: this.experience.physics.defaultContactMaterial
        })

        this.world.addBody(this.body)

        this.shape2 = new CANNON.Box(new CANNON.Vec3(5, 30, 8))
        this.body2 = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(-70, 0.1, 7),
            quaternion: new CANNON.Quaternion(), 
            shape: this.shape2,
            material: this.experience.physics.defaultMaterial
        })

        this.world.addBody(this.body2)

        this.shape3 = new CANNON.Box(new CANNON.Vec3(7, 20, 3))
        this.body3 = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(-71, 0.1, 38),
            quaternion: new CANNON.Quaternion(), 
            shape: this.shape3,
            material: this.experience.physics.defaultMaterial
        })

        this.world.addBody(this.body3)

        this.shape4 = new CANNON.Box(new CANNON.Vec3(0.5, 10, 0.5))
        this.body4 = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(-23, 0.1, -40.5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.shape4,
            material: this.experience.physics.defaultMaterial
        })

        this.world.addBody(this.body4)

        // Model
        this.model = this.resource.scene
        this.model.rotation.set(0,11, 0)
        this.model.position.set(-50, 0, 0)
        // this.model.position.copy(this.body.position)
        this.model.scale.set(4, 4, 4)
        this.scene.add(this.model)

        if(this.debug.active)
        {
            this.debugFolder
            .add(this.model.position, 'x')
            .name('gantryPositionX')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.model.position, 'y')
            .name('gantryPositionY')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.model.position, 'z')
            .name('gantryPositionZ')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.model.rotation, 'x')
            .name('gantryRotationX')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.model.rotation, 'y')
            .name('gantryRotationY')
            .min(-50)
            .max(50)
            .step(1)

            this.debugFolder
            .add(this.model.rotation, 'z')
            .name('gantryRotationZ')
            .min(-50)
            .max(50)
            .step(1)
        }


    }

    update() 
    {      
        // this.model.position.copy(this.body.position)
        // this.model.quaternion.copy(this.body.quaternion)
        // this.model.position.y -= 2.1
    }
}