import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import EventEmitter from './EventEmitter.js'
import { gsap } from 'gsap'

export default class Resources extends EventEmitter 
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.loadingBarElement = document.querySelector('.loading-bar')
        this.spacemanElement = document.querySelector('.spaceman')
        this.loadingTextElement = document.querySelector('.loading-text')
        this.controlsElement = document.querySelector('.controls')

        this.overlayGeometry = new THREE.PlaneGeometry(2,2,1,1)
        this.overlayMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uAlpha: { value: 1}
        },
        vertexShader: `
            void main()
            {
                gl_Position = vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uAlpha;

            void main()
            {
                gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
            }
        `
    })

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.dracoLoader = new DRACOLoader()
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.rgbeLoader = new RGBELoader()
    }

    startLoading()
    {
        // Load each source
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'dracoModel')
            {
                this.loaders.dracoLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'RGBEtexture')
            {
                this.loaders.rgbeLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.loaded++

        const progressRatio = this.loaded / this.toLoad
        const progressPercent = Math.floor(progressRatio * 100)
        this.loadingBarElement.style.transform = `scaleX(${progressRatio})`
        this.loadingTextElement.textContent = `Loading ${progressPercent}%`

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')

            gsap.delayedCall(0.5, () =>
            {
                gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0})
                this.loadingBarElement.classList.add('ended')
                this.spacemanElement.classList.add('ended')
                this.loadingTextElement.classList.add('ended')
                this.controlsElement.classList.add('ended')
                this.loadingBarElement.style.transform = ``
                // document.body.style.overflow = 'visible'
            })
        }
    }
}
