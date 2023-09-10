import Robot from './Robot.js'

export default class FlyingRobot extends Robot
{   
    constructor(name, legs)
    {
        super(name, legs)

        //Calling the baseclass sayHi Method not the one in this class
        super.sayHI()
    }
    sayHI()
    {
        console.log(`Hello! My name is ${this.name} and I am flying robot`)
    }
    takeOff()
    {
        console.log(`Have a good flight ${this.name}`)
    }
}