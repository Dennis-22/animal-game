import { clearParent, getElementById, placeText } from "./domHelpers"
import { createIntroAndEndUI, createPlaygroundUI } from "./helpers"
import Animal, {generateRandomAnimal } from "./animal"
import { Mode } from "./types"

const app = getElementById('app') as HTMLElement

let timeCount = 5
let chancesCount = 3
let scoreCount = 0
let animalSelect = generateRandomAnimal()

updateUI("PLAY")

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
    timeCount = 50
    chancesCount = 3
    scoreCount = 0
    animalSelect = generateRandomAnimal()
    createPlaygroundUI(timeCount, chancesCount, scoreCount, animalSelect)

      // setInterval(()=>{
        const bird = new Animal(animalPress)
        bird.addToPlayground()
        // }, 1000)
      countDownTime()
  }

  if(mode === "END"){
    createIntroAndEndUI(
      (timeCount <= 0 ? "Time is up" : "Game Over"), 
      `You scored ${scoreCount}pts`, 
      "Play again", 
      ()=>updateUI("INTRO")
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

function animalPress(animalId:string){
  //get the animal to select id and march to what the user pressed

  if(animalId === animalSelect.name){
    // increase score
      placeText(getElementById('score') as HTMLElement, scoreCount++)
  }else{
    // decrease user chance by one
    chancesCount--
    placeText(getElementById('chance') as HTMLElement, '💛'.repeat(chancesCount))
    if(chancesCount === 0){ //user ran out of chances
      updateUI("END")
    }
  }
}