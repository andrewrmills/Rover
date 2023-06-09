import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setSunLight()
        this.setAmbientLight()
        this.setEnvironmentMap()
        
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.near = -5
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)

        // Shadow Helper
        // this.sunLightCameraHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
        // this.scene.add(this.sunLightCameraHelper)

                // Debug
                if(this.debug.active)
                {
                    this.debugFolder
                    .add(this.sunLight, 'intensity')
                    .name('sunLightIntensity')
                    .min(0)
                    .max(10)
                    .step(0.001)

                    this.debugFolder
                    .add(this.sunLight.position, 'x')
                    .name('sunLightX')
                    .min(-5)
                    .max(5)
                    .step(0.001)

                    this.debugFolder
                    .add(this.sunLight.position, 'y')
                    .name('sunLightY')
                    .min(-5)
                    .max(5)
                    .step(0.001)

                    this.debugFolder
                    .add(this.sunLight.position, 'z')
                    .name('sunLightZ')
                    .min(-5)
                    .max(5)
                    .step(0.001)
                }
    }

    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
        this.scene.add(this.ambientLight)

                        // Debug
                        if(this.debug.active)
                        {
                            this.debugFolder
                            .add(this.ambientLight, 'intensity')
                            .name('ambientLightIntensity')
                            .min(0)
                            .max(10)
                            .step(0.001)
                        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.texture = this.resources.items.environmentHdrTexture
        this.environmentMap.texture.mapping = THREE.EquirectangularReflectionMapping

        this.scene.background = this.environmentMap.texture

        // this.environmentMap = {}
        // this.environmentMap.intensity = 0.4
        // this.environmentMap.texture = this.resources.items.environmentMapTexture
        // this.environmentMap.texture.encoding = THREE.sRGBEncoding

        // this.scene.environment = this.environmentMap.texture

        // this.environmentMap.updateMaterials = () =>
        // {
        //     this.scene.traverse((child) => 
        //     {
        //         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        //         {
        //             child.material.envMap = this.environmentMap.texture
        //             child.material.envMapIntensity = this.environmentMap.intensity
        //             child.material.needsUpdate = true
        //         }
        //     })
        // }
        // this.environmentMap.updateMaterials()

        // // Debug
        // if(this.debug.active)
        // {
        //     this.debugFolder
        //         .add(this.environmentMap, 'intensity')
        //         .name('envMapIntenity')
        //         .min(0)
        //         .max(4)
        //         .step(0.001)
        //         .onChange(this.environmentMap.updateMaterials)
        // }
    }
    update(){

        this.roverX = this.experience.world.scene.children[2].position.x
        this.roverY = this.experience.world.scene.children[2].position.y
        this.roverZ = this.experience.world.scene.children[2].position.z

        this.sunLight.lookAt(this.experience.world.scene.children[2].position)

        this.sunLight.position.set(
            this.roverX + 3.5,
            this.roverY + 2,
            this.roverZ - 1.25
        )
    }
}