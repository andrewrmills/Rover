import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Jump
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
            this.debugFolder = this.debug.ui.addFolder('Jump')
        }

        // Setup
        this.resource = this.resources.items.gantryModel

        this.setJump()
        this.setBarrels()
    }

    setJump() 
    {
        this.jumpShape = new CANNON.Box(new CANNON.Vec3(14, 8, 12))
        this.jumpBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(20, -2, -80),
            quaternion: new CANNON.Quaternion(), 
            shape: this.jumpShape,
            material: this.experience.physics.ddefaultContactMaterial
        })
        this.jumpBody.quaternion.set(0, 0, 1, Math.PI/14)
        this.world.addBody(this.jumpBody)

        this.boxGeometry = new THREE.BoxGeometry(28, 16, 24)
        this.boxMaterial = new THREE.MeshStandardMaterial()
        this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.scene.add(this.boxMesh)

        this.boxMesh.position.copy(this.jumpBody.position)
        this.boxMesh.quaternion.copy(this.jumpBody.quaternion)
    
    }
    setBarrels() 
    {
        this.mass = 0.5
        this.centerX = -10
        this.centerY = 2
        this.centerZ = -80

        this.barrelShape = new CANNON.Cylinder(2, 2, 4, 16)
        this.barrelBody1 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.centerX, this.centerY, this.centerZ),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody1)

        this.barrelBody2 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.centerX, this.centerY, this.centerZ - 5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody2)

        this.barrelBody3 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.centerX, this.centerY, this.centerZ + 5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody3)

        this.barrelBody4 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.centerX, this.centerY + 4, this.centerZ - 2.5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody4)

        this.barrelBody5 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.centerX, this.centerY + 4, this.centerZ + 2.5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody5)

        this.barrelBody6 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(this.centerX, this.centerY + 8, this.centerZ),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody6)


        this.barrelGeometry = new THREE.CylinderGeometry(2, 2, 4, 16)
        this.barrelMaterial = new THREE.MeshStandardMaterial()

        this.barrelMesh1 = new THREE.Mesh(this.barrelGeometry, this.barrelMaterial)
        this.barrelMesh2 = new THREE.Mesh(this.barrelGeometry, this.barrelMaterial)
        this.barrelMesh3 = new THREE.Mesh(this.barrelGeometry, this.barrelMaterial)
        this.barrelMesh4 = new THREE.Mesh(this.barrelGeometry, this.barrelMaterial)
        this.barrelMesh5 = new THREE.Mesh(this.barrelGeometry, this.barrelMaterial)
        this.barrelMesh6 = new THREE.Mesh(this.barrelGeometry, this.barrelMaterial)

        this.scene.add(
            this.barrelMesh1, 
            this.barrelMesh2, 
            this.barrelMesh3,
            this.barrelMesh4, 
            this.barrelMesh5,
            this.barrelMesh6
            )

    }

    resetModel()
    {
        this.world.removeBody(
            this.barrelBody1, 
            this.barrelBody2, 
            this.barrelBody3,
            this.barrelBody4, 
            this.barrelBody5,
            this.barrelBody6
        )

        this.scene.remove(
            this.barrelMesh1, 
            this.barrelMesh2, 
            this.barrelMesh3,
            this.barrelMesh4, 
            this.barrelMesh5,
            this.barrelMesh6
            )

        this.setBarrels()
    }

    update() 
    {      
        this.barrelMesh1.position.copy(this.barrelBody1.position)
        this.barrelMesh1.quaternion.copy(this.barrelBody1.quaternion)
        this.barrelMesh2.position.copy(this.barrelBody2.position)
        this.barrelMesh2.quaternion.copy(this.barrelBody2.quaternion)
        this.barrelMesh3.position.copy(this.barrelBody3.position)
        this.barrelMesh3.quaternion.copy(this.barrelBody3.quaternion)
        this.barrelMesh4.position.copy(this.barrelBody4.position)
        this.barrelMesh4.quaternion.copy(this.barrelBody4.quaternion)
        this.barrelMesh5.position.copy(this.barrelBody5.position)
        this.barrelMesh5.quaternion.copy(this.barrelBody5.quaternion)
        this.barrelMesh6.position.copy(this.barrelBody6.position)
        this.barrelMesh6.quaternion.copy(this.barrelBody6.quaternion)

    }


}