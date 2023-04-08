import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import Experience from "../Experience"

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.world = this.experience.physics
        this.resources = this.experience.resources

        this.setPhysics()
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setPhysics() 
    {
        this.floorShape = new CANNON.Plane()
        this.floorBody = new CANNON.Body({
            mass: 0,
            shape: this.floorShape,
            material: this.experience.physics.defaultMaterial
        })
        this.floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI / 2
        )
        this.world.addBody(this.floorBody)

        // this.floorBody.quaternion.setFromEuler(-Math.PI / 4.5, 0 , 0);
        // groundBody.quaternion.setFromEuler(-Math.PI / 2, Math.PI / 24, 0);
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(250, 64)
    }

    setTextures()
    {
        this.repeatX = 1
        this.repeatY = 1

        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(this.repeatX, this.repeatY)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(this.repeatX, this.repeatY)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping

        // this.textures.ambientOcclusion = this.resources.items.moonOccTexture
        // this.textures.ambientOcclusion.repeat.set(this.repeatX, this.repeatY)
        // this.textures.ambientOcclusion.wrapS = THREE.RepeatWrapping
        // this.textures.ambientOcclusion.wrapT = THREE.RepeatWrapping

        // this.textures.disp = this.resources.items.moonDispTexture
        // this.textures.disp.repeat.set(this.repeatX, this.repeatY)
        // this.textures.disp.wrapS = THREE.RepeatWrapping
        // this.textures.disp.wrapT = THREE.RepeatWrapping

    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
            // aoMap: this.textures.ambientOcclusion,
            // displacementMap: this.textures.disp,
            // displacementScale : 1
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        // this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}