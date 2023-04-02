import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './floor.js'
import Rover from './Rover.js'

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
    }
}