import { gsap } from "gsap";
// import { PixiPlugin } from "gsap/PixiPlugin.js";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

import { appendToBody, createParent, getElementById, createImage } from "./domHelpers"
import { generateRandomColor } from "./helpers"
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

// get the the current width of the platform.
// useful when user screen changes later during the game play
function getPlatformWidth(){
    const platform = getElementById('platform') as HTMLElement
    if(platform) return platform.clientWidth //the platform width
    return (getElementById('app') as HTMLElement).clientWidth //the app div width
}

export default class Animal{
    animal: {name:string, img:string}
    animalDiv:HTMLElement
    animalImg:HTMLImageElement
    color:string
    left:number

    constructor(){
        this.animal = generateRandomAnimal()
        this.animalDiv = createParent('div', ['animal'], this.animal.name)
        this.animalDiv.setAttribute("animal", "")
        this.animalImg = createImage(this.animal.img, ['animal-img'], this.animal.name)
        this.color = generateRandomColor()
        this.left = Math.floor(Math.random()* (getPlatformWidth() - 50)) //use the current platformWidth so animal does not go offscreen
        this.animalDiv.style.backgroundColor = this.color
        this.animalDiv.style.left = this.left + 'px'

        appendToBody(this.animalDiv, [this.animalImg])
        appendToBody(getElementById('platform') as HTMLElement, [this.animalDiv])
    }

    get id(){
        return this.animal.name
    }

    addEventListener(eventListener:()=>void){
        this.animalDiv.addEventListener('click', eventListener)
    }

    moveToTop(){
        let speed = Math.random() * 5 + 5
     
        gsap.to(this.animalDiv, {y:-1000, duration:speed, ease:"power1.out"})
 
        // remove animal after said time
        setInterval(()=>{
            this.removeFromDom()
        }, Math.floor(speed) * 1000) // animal would by then be offscreen
    }

    removeFromDom(){
        this.animalDiv.remove()
    }
}

