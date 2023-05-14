import { appendToBody, createParent, createElement, getElementById, createImage } from "./domHelpers"
import { AnimalSelect } from "./types"

// created the intro ui and game end ui
export function createIntroAndEndUI(titleText:string, subText:string, btnText:string, btnFn:()=>void){
    const UIView = createParent('div', ["UI-view"])
    const title = createElement('p', titleText, ["UI-title"])
    const text = createElement('p', subText, ["UI-text"])
    const button = createElement('button', btnText, ["btn"])
  
    button.addEventListener('click', btnFn)
  
    appendToBody(UIView, [title, text, button])
    appendToBody(getElementById('app') as HTMLElement, [UIView])
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


export function generateRandomColor(){
    let red = 'hsl(348, 88%, 43%)'
    let yellow = 'hsl(51, 89%, 42%)'
    let blue = 'hsl(215, 71%, 45%)'
    
    let colors = [red, yellow, blue]

    return colors[Math.floor(Math.random() * colors.length)]
}