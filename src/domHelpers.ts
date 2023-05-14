export function getElementById(id:string):HTMLElement | null{
    return document.getElementById(id) || null
}

export function clearParent(domElem: HTMLElement){
    domElem.innerHTML = ''
}

export function placeText(domElement:HTMLElement, content:string | number){
    return domElement.textContent = content.toString()
}

export function createParent(elem:string, classNames:string[], id?:string){ //divs, sections, etc
    let domElem = document.createElement(elem)
    addClassNamesToElement(domElem, classNames)
    if(id) domElem.id = id
    return domElem
}

export function createElement(element:string, content:string | number, classNames:string[], id?:string){
    let domElem = document.createElement(element)
    placeText(domElem, content)
    addClassNamesToElement(domElem, classNames)
    if(id) domElem.id = id
    return domElem
}

export function createImage(source:string, classNames:string[], id?:string){
    let imgElem = document.createElement('img')
    imgElem.setAttribute('src', source)
    addClassNamesToElement(imgElem, classNames)
    if(id) imgElem.id = id
    return imgElem
}

export function appendToBody(domElement:HTMLElement, elements:HTMLElement[]){
    if(domElement) elements.forEach(elem => domElement.append(elem))
    return null
}

function addClassNamesToElement(domElem:HTMLElement, classNames:string[]){
    classNames.forEach(className => {
        if(className) domElem.classList.add(className)
    })
}