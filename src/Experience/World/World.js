import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './floor.js'
import Rover from './Rover.js'
import Lander from './Lander.js'

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
    }
}