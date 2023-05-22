import { clearParent, getElementById, placeText } from "./domHelpers"
import { createIntroUI, createPlaygroundUI, createGameEndUI } from "./helpers"
import Animal, {generateRandomAnimal } from "./animal"
import { utils } from "./defaults"
import { Mode } from "./types"

const app = getElementById('app') as HTMLElement

let timeCount = 0
let chancesCount = 0
let scoreCount = 0
let animalSelect = generateRandomAnimal()

let lastRenderedTime = 0
let delta:number = 0

updateUI("INTRO")


// functions

function updateUI(mode:Mode){
  clearParent(app) //remove the current app content

  if(mode === "INTRO"){
    createIntroUI(()=>updateUI("PLAY"))
  }

  if(mode === "PLAY"){
    // set utils
    timeCount = utils.timeCount
    chancesCount = utils.chancesCount
    scoreCount = utils.scoreCount
    animalSelect = generateRandomAnimal()
    createPlaygroundUI(timeCount, chancesCount, scoreCount, animalSelect)

    //@ts-ignore
    gameLoop()
    countDownTime()
  }

  if(mode === "END"){
    createGameEndUI(
      (timeCount <= 0 ? "Time is up" : "Game Over"),
      `You scored ${scoreCount}pts`,
      ()=>updateUI("PLAY"),
      ()=>updateUI("INTRO")
    )
  }

}

function gameLoop(time:number){
  if(lastRenderedTime === 0){
    console.log('got here 1')
    lastRenderedTime = time
    requestAnimationFrame(gameLoop)
    return
  }

  let newDelta = Math.floor(time - lastRenderedTime)
  lastRenderedTime = time

  if(Number.isNaN(delta)){
    delta = newDelta
    requestAnimationFrame(gameLoop)
    return
  }

  if(delta > 1000){
    const animal = new Animal()
    animal.addEventListener(()=>animalPress(animal))
    animal.moveToTop()
    delta = 0
    requestAnimationFrame(gameLoop)
    return
  }

  delta = delta + newDelta
  requestAnimationFrame(gameLoop)
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