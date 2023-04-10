import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './floor.js'
import Rover from './Rover.js'
import Lander from './Lander.js'
import Gantry from './Gantry.js'
import Ramp from './Ramp.js'
import HSU from './HSU.js'
import Platform from './Platform.js'

export default class World
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.rover = new Rover()
            this.lander = new Lander()
            this.gantry = new Gantry()
            this.ramp = new Ramp()
            this.hsu = new HSU()
            this.platform = new Platform()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.rover)
        {
            this.rover.update()
            // this.environment.update()
        }
        if(this.lander)
        {
            this.lander.update()
        }
        if(this.platform)
        {
            this.platform.update()
        }
    }
}