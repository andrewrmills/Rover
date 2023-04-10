import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Platform
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
            this.debugFolder = this.debug.ui.addFolder('Platform')
        }

        // Setup
        this.resource = this.resources.items.gantryModel

        this.setPlatform()
        this.setRamps()
        this.setBarrels()
    }
    setPlatform()
    {
        // Physics
        this.platformShape = new CANNON.Box(new CANNON.Vec3(8, 4, 8))
        this.platformBody = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(43, 0, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.platformShape,
            material: this.experience.physics.defaultContactMaterial
        })
        // this.body.quaternion.set(1, 0, 0, Math.PI/16)
        this.world.addBody(this.platformBody)

        this.boxGeometry = new THREE.BoxGeometry(16, 8, 16)
        this.boxMaterial = new THREE.MeshStandardMaterial()
        this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.scene.add(this.boxMesh)

        this.boxMesh.position.copy(this.platformBody.position)
        this.boxMesh.quaternion.copy(this.platformBody.quaternion)

    }
    setRamps() 
    {
        this.ramp1Shape = new CANNON.Box(new CANNON.Vec3(8, 3, 8))
        this.ramp1Body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(43, -2.1, -14.5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.ramp1Shape,
            material: this.experience.physics.ddefaultContactMaterial
        })
        this.ramp1Body.quaternion.set(1, 0, 0, Math.PI/16)
        this.world.addBody(this.ramp1Body)

        this.boxGeometry = new THREE.BoxGeometry(16, 6, 16)
        this.boxMaterial = new THREE.MeshStandardMaterial()
        this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        this.scene.add(this.boxMesh)

        this.boxMesh.position.copy(this.ramp1Body.position)
        this.boxMesh.quaternion.copy(this.ramp1Body.quaternion)

        this.ramp2Shape = new CANNON.Box(new CANNON.Vec3(8, 3, 8))
        this.ramp2Body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(43, -2.1, 14.5),
            quaternion: new CANNON.Quaternion(), 
            shape: this.ramp2Shape,
            material: this.experience.physics.defaultContactMaterial
        })
        this.ramp2Body.quaternion.set(1, 0, 0, -Math.PI/16)
        this.world.addBody(this.ramp2Body)

        this.boxGeometry2 = new THREE.BoxGeometry(16, 6, 16)
        this.boxMaterial2 = new THREE.MeshStandardMaterial()
        this.boxMesh2 = new THREE.Mesh(this.boxGeometry2, this.boxMaterial2)
        this.scene.add(this.boxMesh2)

        this.boxMesh2.position.copy(this.ramp2Body.position)
        this.boxMesh2.quaternion.copy(this.ramp2Body.quaternion)
    
    }
    setBarrels() 
    {
        this.mass = 0.5

        this.barrelShape = new CANNON.Cylinder(1, 1, 2, 16)
        this.barrelBody1 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(43, 6, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody1)

        this.barrelBody2 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(46, 6, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody2)

        this.barrelBody3 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(40, 6, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody3)

        this.barrelBody4 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(44.5, 8, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody4)

        this.barrelBody5 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(41.5, 8, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody5)

        this.barrelBody6 = new CANNON.Body({
            mass: this.mass,
            position: new CANNON.Vec3(43, 10, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.barrelShape,
            material: this.experience.physics.ddefaultContactMaterial
        })

        this.world.addBody(this.barrelBody6)

        this.barrelGeometry = new THREE.CylinderGeometry(1, 1, 2, 16)
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