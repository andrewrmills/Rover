import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from '../Experience.js'

export default class Rover
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
            this.debugFolder = this.debug.ui.addFolder('Rover')
        }

        // Setup
        this.resource = this.resources.items.roverModel

        this.setModel()
    }

    setModel()
    {

      this.x = 2
      this.y = 1
      this.z = 3


        // Physics
        this.shape = new CANNON.Box(new CANNON.Vec3(this.x, this.y, this.z))
        this.body = new CANNON.Body({
            mass: 100,
            linearDamping: 0.5,
            position: new CANNON.Vec3(0, 10, 0),
            quaternion: new CANNON.Quaternion(), 
            shape: this.shape,
            material: this.experience.physics.defaultMaterial
        })

        // Vehicle
        this.vehicle = new CANNON.RigidVehicle({
            chassisBody: this.body
        })       

        // Wheels
        this.mass = 5;
        this.axisWidth = 4
        this.friction = 0.7
        this.wheelShape = new CANNON.Sphere(1);
        this.wheelMaterial = new CANNON.Material('wheel');
        this.down = new CANNON.Vec3(0, -1, 0);
    
        this.wheelBody1 = new CANNON.Body({ mass: this.mass, material: this.wheelMaterial });
        this.wheelBody1.addShape(this.wheelShape);
        this.wheelBody1.angularDamping = 0.4;
        this.vehicle.addWheel({
          body: this.wheelBody1,
          isFrontWheel: true,
          position: new CANNON.Vec3(this.axisWidth / 2, -1.1, 2),
          axis: new CANNON.Vec3(1, 0, 0),
          direction: this.down
        });

        this.wheelBody2 = new CANNON.Body({ mass: this.mass, material: this.wheelMaterial });
        this.wheelBody2.addShape(this.wheelShape);
        this.wheelBody2.angularDamping = 0.4;
        this.vehicle.addWheel({
          body: this.wheelBody2,
          position: new CANNON.Vec3(this.axisWidth / 2, -1.1, -3),
          axis: new CANNON.Vec3(1, 0, 0),
          direction: this.down
        });

        this.wheelBody3 = new CANNON.Body({ mass: this.mass, material: this.wheelMaterial });
        this.wheelBody3.addShape(this.wheelShape);
        this.wheelBody3.angularDamping = 0.4;
        this.vehicle.addWheel({
          body: this.wheelBody3,
          isFrontWheel: true,
          position: new CANNON.Vec3(-this.axisWidth / 2, -1.1, 2),
          axis: new CANNON.Vec3(1, 0, 0),
          direction: this.down
        });

        this.wheelBody4 = new CANNON.Body({ mass: this.mass, material: this.wheelMaterial });
        this.wheelBody4.addShape(this.wheelShape);
        this.wheelBody4.angularDamping = 0.4;
        this.vehicle.addWheel({
          body: this.wheelBody4,
          position: new CANNON.Vec3(-this.axisWidth / 2, -1.1, -3),
          axis: new CANNON.Vec3(1, 0, 0),
          direction: this.down
        });

        this.vehicle.addToWorld(this.world)
        // this.world.addBody(this.body)

        // this.boxGeometry = new THREE.BoxGeometry(this.x, this.y, this.z)
        // this.boxMaterial = new THREE.MeshStandardMaterial()
        // this.boxMesh = new THREE.Mesh(this.boxGeometry, this.boxMaterial)
        // this.scene.add(this.boxMesh)

        // this.sphereGeometry1 = new THREE.SphereGeometry(1)
        // this.sphereMaterial1 = new THREE.MeshNormalMaterial({wireframe: true})
        // this.sphereMesh1 = new THREE.Mesh(this.sphereGeometry1, this.sphereMaterial1)
        // this.scene.add(this.sphereMesh1)

        // this.sphereGeometry2 = new THREE.SphereGeometry(1)
        // this.sphereMaterial2 = new THREE.MeshNormalMaterial({wireframe: true})
        // this.sphereMesh2 = new THREE.Mesh(this.sphereGeometry2, this.sphereMaterial2)
        // this.scene.add(this.sphereMesh2)

        // this.sphereGeometry3 = new THREE.SphereGeometry(1)
        // this.sphereMaterial3 = new THREE.MeshNormalMaterial({wireframe: true})
        // this.sphereMesh3 = new THREE.Mesh(this.sphereGeometry3, this.sphereMaterial3)
        // this.scene.add(this.sphereMesh3)

        // this.sphereGeometry4 = new THREE.SphereGeometry(1)
        // this.sphereMaterial4 = new THREE.MeshNormalMaterial({wireframe: true})
        // this.sphereMesh4 = new THREE.Mesh(this.sphereGeometry4, this.sphereMaterial4)
        // this.scene.add(this.sphereMesh4)

        // Model
        this.model = this.resource.scene
        this.model.rotation.set(0, Math.PI/2, 0)
        this.model.position.copy(this.body.position)
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)

        // this.model.traverse((child) => 
        // {
        //     if(child instanceof THREE.Mesh)
        //     {
        //         child.castShadow = true
        //         child.receiveShadow = true
        //     }
        // })
    }
    resetModel()
    {
      this.body.position.set(0, 0, 0)
    }

    moveModel()
    {

    document.addEventListener('keydown', (event) => {
        this.maxSteerVal = Math.PI / 8;
        this.maxForce = 500;
      
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
            this.vehicle.setWheelForce(this.maxForce, 0);
            this.vehicle.setWheelForce(this.maxForce, 2);
            break;
      
            case 's':
            case 'ArrowDown':
            this.vehicle.setWheelForce(-this.maxForce / 2, 0);
            this.vehicle.setWheelForce(-this.maxForce / 2, 2);
            break;
      
            case 'a':
            case 'ArrowLeft':
            this.vehicle.setSteeringValue(this.maxSteerVal, 0);
            this.vehicle.setSteeringValue(this.maxSteerVal, 2);
            break;
      
            case 'd':
            case 'ArrowRight':
            this.vehicle.setSteeringValue(-this.maxSteerVal, 0);
            this.vehicle.setSteeringValue(-this.maxSteerVal, 2);
            break;
            
            case 'Shift':
            this.vehicle.setWheelForce((this.maxForce) * 2, 0);
            this.vehicle.setWheelForce((this.maxForce) * 2, 2);
            break
         }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
              case 'w':
              case 'ArrowUp':
                this.vehicle.setWheelForce(0, 0);
                this.vehicle.setWheelForce(0, 2);
                break;
      
              case 's':
              case 'ArrowDown':
                this.vehicle.setWheelForce(0, 0);
                this.vehicle.setWheelForce(0, 2);
                break;
      
              case 'a':
              case 'ArrowLeft':
                this.vehicle.setSteeringValue(0, 0);
                this.vehicle.setSteeringValue(0, 2);
                break;
      
              case 'd':
              case 'ArrowRight':
                this.vehicle.setSteeringValue(0, 0);
                this.vehicle.setSteeringValue(0, 2);
                break;

              case 'Shift':
                this.vehicle.setWheelForce(this.maxForce, 0);
                this.vehicle.setWheelForce(this.maxForce, 2);
                break

              case 'r':
                this.resetModel()
                break
            }
          });

        this.model.position.copy(this.body.position)
        this.model.quaternion.copy(this.body.quaternion)
    }

    update() 
    {      
        this.moveModel()

        // this.sphereMesh1.position.copy(this.wheelBody1.position)
        // this.sphereMesh1.quaternion.copy(this.wheelBody1.quaternion)
        // this.sphereMesh2.position.copy(this.wheelBody2.position)
        // this.sphereMesh2.quaternion.copy(this.wheelBody2.quaternion)
        // this.sphereMesh3.position.copy(this.wheelBody3.position)
        // this.sphereMesh3.quaternion.copy(this.wheelBody3.quaternion)
        // this.sphereMesh4.position.copy(this.wheelBody4.position)
        // this.sphereMesh4.quaternion.copy(this.wheelBody4.quaternion)
        // this.boxMesh.position.copy(this.body.position)
        // this.boxMesh.quaternion.copy(this.body.quaternion)

        this.model.position.copy(this.body.position)
        this.model.quaternion.copy(this.body.quaternion)
    }
}