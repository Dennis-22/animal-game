import { appendToBody, createParent, createElement, getElementById, createImage, placeText } from "./domHelpers"
import { AnimalSelect, functionVoid } from "./types"
import { app, introTexts } from "./defaults"

// UI for introduction
export function createIntroUI(startBtnFn:functionVoid){
    const intro = createParent('div', ['intro'])
    const introTitle = createElement('p', app.name, ['intro-title'])
    const introText = createElement('p', app.desc, ['intro-text'])
    const instructions = createParent('div', ['instructions'])
    const instructionTitle = createElement('p', "Instructions", ['ins-title'])
    const instructionsLists = createParent('ul', ['ins-lists'])
    const button = createElement('button', 'Start', ['btn', 'intro-btn'])

    introTexts.forEach((text) => {
        let list = createElement('li', text, [''])
        appendToBody(instructionsLists, [list])
    })

    button.addEventListener('click', startBtnFn)

    appendToBody(instructions, [instructionTitle, instructionsLists])
    appendToBody(intro, [introTitle, introText, instructions, button])
    appendToBody(getElementById('app') as HTMLElement, [intro])
}

// UI for ready
export function createReadyUI(animalSelect:AnimalSelect, gotoPlay:functionVoid){
    const ready = createParent('div', ['ready'])
    const readyTitle = createElement('p', 'Ready', ['ready-title'])
    const readyCount = createElement('p', '3', ['ready-count'], 'ready-count')
    const readyText = createElement('p', `Select all ${animalSelect.name}s`, ['ready-text'])
    const readyAnimal = createImage(animalSelect.img, ['ready-animal'])

    appendToBody(ready, [readyTitle, readyCount, readyText, readyAnimal])
    appendToBody(getElementById('app') as HTMLElement, [ready]);


    // start the count down
    (()=>{
        let count = 3
        let interval = setInterval(()=>{
            if(count === 0){
                clearInterval(interval)
                return gotoPlay()
            }
            count--
            placeText(readyCount, count)
        },1000)
    })();
}

// creates the game ui itslef
export function createPlaygroundUI(timeCount:number, chancesCount:number, scoreCount:number, animalSelect:AnimalSelect){
    const playground = createParent('div', ['playground'])
    const utils = createParent('div', ['utils'])
    const userUtil = createParent('div', ['user-util'])
  
    const time = createElement('p', 'time: ', ['time'])
    const timeText = createElement('span', timeCount, [''], 'time')
  
    const chance = createElement('p', '💛'.repeat(chancesCount), ['chance'], 'chance')
    const score = createElement('p', 'score: ', ['score'])
    const scoreText = createElement('span', scoreCount, [''], 'score')
  
    const selectAnimal = createImage(animalSelect.img, ['animal-select'], animalSelect.name)
  
    const platform = createParent('div', ['platform'], 'platform')
  
    appendToBody(time, [timeText])
    appendToBody(score, [scoreText])
  
    appendToBody(userUtil, [time, score])
    appendToBody(utils, [userUtil, chance, selectAnimal])
  
  
    appendToBody(playground, [utils, platform])
    appendToBody(getElementById('app') as HTMLElement, [playground])
}

// UI for game end
export function createGameEndUI(titleText:string, subText:string, playAginFn:functionVoid, goToIntroFn:functionVoid){

    const gameEnd = createParent('div', ["game-end"])
    const title = createElement('p', titleText, ["g-e-title"])
    const text = createElement('p', subText, ["g-e-text"])
    const btns = createParent('div', ['g-e-btns'])
    const playAgainBtn = createElement('button', 'Play again', ["btn"])
    const gotoIntroBtn = createElement('button', 'Go to introduction', ["btn"])
        
    playAgainBtn.addEventListener('click', playAginFn)
    gotoIntroBtn.addEventListener('click', goToIntroFn)
    
    appendToBody(btns, [playAgainBtn, gotoIntroBtn])
    appendToBody(gameEnd, [title, text, btns])
    appendToBody(getElementById('app') as HTMLElement, [gameEnd])
}

export function generateRandomColor(){
    let red = 'hsl(348, 88%, 43%)'
    let yellow = 'hsl(51, 89%, 42%)'
    let blue = 'hsl(215, 71%, 45%)'
    
    let colors = [red, yellow, blue]

    return colors[Math.floor(Math.random() * colors.length)]
}