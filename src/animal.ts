// import { gsap } from "gsap";
// import { PixiPlugin } from "gsap/PixiPlugin.js";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

import { appendToBody, createParent, getElementById, createImage } from "./domHelpers"
import { generateRandomColor, } from "./helpers"
import { AnimalSelect } from "./types"

const animals = [
    {name:'cat', img: './cat.png'},
    {name:'bird', img: './bird.png'},
    {name:'crab', img: './crab.png'},
    {name:'mouse', img: './mouse.png'}
]

export function generateRandomAnimal():AnimalSelect{
    return animals[Math.floor(Math.random() * animals.length)]
}

// get the the current of the platform.
// useful when user screen changes later during the game play
function getPlatformWidth(){
    const platform = getElementById('platform') as HTMLElement
    return platform.clientWidth    
}

export default class Animal{
    randomAnimal: {name:string, img:string}
    animal:HTMLElement
    animalImg:HTMLImageElement
    color:string
    left:number
    animalPress : (id:string)=>void

    constructor(animalPress:(id:string)=>void){
        this.randomAnimal = generateRandomAnimal()
        this.animal = createParent('div', ['animal'], this.randomAnimal.name)
        this.animal.setAttribute("animal", "")
        this.animalImg = createImage(this.randomAnimal.img, ['animal-img'], this.randomAnimal.name)
        this.color = generateRandomColor()
        this.left = Math.floor(Math.random()* (getPlatformWidth() - 50)) //use the current platformWidth so animal does not go offscreen
        this.animal.style.backgroundColor = this.color
        this.animal.style.left = this.left + 'px'
        this.animalPress = animalPress

        this.animal.addEventListener('click', ()=>this.animalPress(this.randomAnimal.name))
        appendToBody(this.animal, [this.animalImg])
    }

    addToPlayground(){
        
        appendToBody(document.getElementById('platform') as HTMLElement, [this.animal])
        let speed = Math.random() * 5 + 10
    
        // gsap.fromTo(this.animal, {y:0, }, {y:-1000, duration:speed, ease:"power1.out"})

        // remove animal after said time
        // the animal would by then be offscreen
        // setInterval(()=>{
        //     this.animal.remove()    
        // }, Math.floor(speed) * 100)
    }

    removeFromPlayground(){
        this.animal.remove()
    }
}

