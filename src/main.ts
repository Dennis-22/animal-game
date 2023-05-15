import { clearParent, getElementById, placeText } from "./domHelpers"
import { createIntroAndEndUI, createPlaygroundUI } from "./helpers"
import Animal, {generateRandomAnimal } from "./animal"
import { Mode } from "./types"

const app = getElementById('app') as HTMLElement

let timeCount = 0
let chancesCount = 0
let scoreCount = 0
let animalSelect = generateRandomAnimal()
let gameLoop:any = null

updateUI("INTRO")

// TODO: make game loop

// functions

function updateUI(mode:Mode){
  clearParent(app) //remove the current app content

  if(mode === "INTRO"){
    createIntroAndEndUI(
      "Animal Farm", 
      "Punch animals, hav fun", "Start", 
      ()=>updateUI("PLAY")
    )
  }

  if(mode === "PLAY"){
    // set utils
    timeCount = 10
    chancesCount = 3
    scoreCount = 0
    animalSelect = generateRandomAnimal()
    createPlaygroundUI(timeCount, chancesCount, scoreCount, animalSelect)

    gameLoop = setInterval(()=>{
      const animal = new Animal()
      animal.addEventListener(()=>animalPress(animal))
      animal.moveToTop()
    },800)
    countDownTime()
  }

  if(mode === "END"){
    clearInterval(gameLoop)
    createIntroAndEndUI(
      (timeCount <= 0 ? "Time is up" : "Game Over"), 
      `You scored ${scoreCount}pts`, 
      "Play again", 
      ()=>updateUI("PLAY")
    )
  }

}

function countDownTime(){
  let timer = getElementById('time') as HTMLElement
  let countdownTimer = setInterval(()=>{
      if(timeCount < 0){
        //the game has end
        clearInterval(countdownTimer)
        // endGame("You run out of time")
        updateUI("END")
      }
      else{
        placeText(timer, timeCount)
      }
      timeCount--
  },1000)
}


function animalPress(animal:Animal){
  //get the animal to select id and march to what the user pressed

  if(animal.id === animalSelect.name){
    // increase score and time and remove the animal
      scoreCount++
      timeCount = timeCount+2
      placeText(getElementById('score') as HTMLElement, scoreCount)
      placeText(getElementById('time') as HTMLElement, timeCount)
      animal.removeFromDom()
  }else{
    // decrease user chance by one
    chancesCount--
    placeText(getElementById('chance') as HTMLElement, '💛'.repeat(chancesCount))
    if(chancesCount === 0){ //user ran out of chances
      updateUI("END")
    }
  }
}