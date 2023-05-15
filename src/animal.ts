import { gsap } from "gsap";
// import { PixiPlugin } from "gsap/PixiPlugin.js";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

import { appendToBody, createParent, getElementById, createImage } from "./domHelpers"
import { generateRandomColor, generateRandomNum } from "./helpers"
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
    animalPress : (animal:HTMLElement)=>void

    constructor(animalPress:(animal:HTMLElement)=>void){
        this.randomAnimal = generateRandomAnimal()
        this.animal = createParent('div', ['animal'], this.randomAnimal.name)
        this.animal.setAttribute("animal", "")
        this.animalImg = createImage(this.randomAnimal.img, ['animal-img'], this.randomAnimal.name)
        this.color = generateRandomColor()
        this.left = Math.floor(Math.random()* (getPlatformWidth() - 50)) //use the current platformWidth so animal does not go offscreen
        this.animal.style.backgroundColor = this.color
        this.animal.style.left = this.left + 'px'
        this.animalPress = animalPress

        this.animal.addEventListener('click', ()=>this.animalPress(this.animal))
        appendToBody(this.animal, [this.animalImg])
    }

    moveToTop(){
        appendToBody(document.getElementById('platform') as HTMLElement, [this.animal])
        let speed = Math.random() * 5 + 10
    
        gsap.fromTo(this.animal, {y:0, }, {y:-1000, duration:speed, ease:"power1.out"})

        // remove animal after said time
        setInterval(()=>{
            this.animal.remove()
        }, Math.floor(speed) * 1000) // animal would by then be offscreen
    }

    // moveAround(){
    //     const randomX = generateRandomNum(1, 100)
    //     const randomY = generateRandomNum(1, 100);
    //     const randomDelay = generateRandomNum(0, 1);
    //     const randomTime = generateRandomNum(3, 5);
    //     const randomTime2 = generateRandomNum(5, 10);
    //     const randomAngle = generateRandomNum(-100, 100);

    //     function moveY(animal:HTMLElement, direction:number) {
    //         gsap.to(animal, randomTime(), {
    //           y: randomY(direction),
    //           ease:"power1.out",
    //           onComplete: moveY,
    //           onCompleteParams: [animal, direction * -1]
    //         });
    //     }
    
    //     function moveX(animal:HTMLElement, direction:number) {
    //         gsap.to(animal, randomTime(), {
    //             x: randomX(direction),
    //             ease:"power1.out",
    //             onComplete: moveX,
    //             onCompleteParams: [animal, direction * -1]
    //         });
    //     }

    //     appendToBody(getElementById('app') as HTMLElement, [this.animal])

    //     gsap.set(this.animal, {
    //         x: randomX(-1),
    //         y: randomX(1),
    //         // rotation: randomAngle(-1)
    //     })

    //     moveX(this.animal, 1)
    //     moveY(this.animal, -1)
    // }
}

