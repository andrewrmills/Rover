import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Ramp
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
            this.debugFolder = this.debug.ui.addFolder('Ramp')
        }

        // Setup
        this.resource = this.resources.items.gantryModel

        this.setRamp()
    }
    setRamp()
    {
        // Physics
        this.shape = new CANNON.Box(new CANNON.Vec3(8, 1, 20))
        this.body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(-43, 1.4, -33),
            quaternion: new CANNON.Quaternion(), 
            shape: this.shape,
            material: this.experience.physics.defaultMaterial
        })
        this.body.quaternion.set(1, 0, 0, Math.PI/16)
        this.world.addBody(this.body)

        this.boxGeometry = new THREE.BoxGeometry(16, 2, 40)
        this.boxMaterial = new THREE.MeshStandardMaterial()
        this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.scene.add(this.boxMesh)

        this.boxMesh.position.copy(this.body.position)
        this.boxMesh.quaternion.copy(this.body.quaternion)

    }

}