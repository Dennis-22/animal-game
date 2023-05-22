import { appendToBody, createParent, createElement, getElementById, createImage } from "./domHelpers"
import { AnimalSelect } from "./types"
import { introTexts } from "./defaults"

export function createIntroUI(startBtnFn:()=>void){
    const intro = createParent('div', ['intro'])
    const introTitle = createElement('p', 'Animal Farm', ['intro-title'])
    const introText = createElement('p', 'Have fun punching animals', ['intro-text'])
    const instructions = createParent('div', ['instructions'])
    const instructionTitle = createElement('p', "Instruction", ['ins-title'])
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

export function createGameEndUI(titleText:string, subText:string, 
    playAginFn:()=>void, goToIntroFn:()=>void){
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

export function generateRandomNum(min:number, max:number){
    const delta = max - min;
    return (direction = 1) => (min + delta * Math.random()) * direction;
}