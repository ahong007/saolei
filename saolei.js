const log = console.log.bind(console)
const s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
let square = JSON.parse(s)
const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 错误`
        alert(s)
        return null
    } else {
        return element
    }
}
const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = ` ${selector} 写错了`
        alert(s)
        return []
    } else {
        return elements
    }
}
const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}
const templateCell = function(line, x) {
    let result = ''
    line = square[x]
    for (let i = 0; i < line.length; i++) {
        result += `<div class="cell" data-number="${line[i]}" data-x="${x}" data-y="${i}">${line[i]}</div>`
    }
    // log('result is', result)
    return result
}
const templateRow = function(square) {
    let result = ''
    for (let i = 0; i < square.length; i++) {
        let row = templateCell(square[i],i)
        result +=`<div class="row clearfix">${row}</div>`
    }
    return result
}

const renderSquare = function(square) {
    let result = ''
    let body = e('body')
    let container = templateRow(square)
    result =`<div id="id-div-mime">${container}</div>`
    body.insertAdjacentHTML('beforeend', result)
}

const bindEventDelegate = function(square) {
    let a = e('#id-div-mime')
    a.addEventListener('click', function(event) {
        let self = event.target
        if (self.classList.contains('cell')) {
            vjkl(self, square)
        }
    })
}
const vjkl = function(cell, square) {
    let a = es('.cell')
    let b = parseInt(cell.dataset.x, 10)
    let c = parseInt(cell.dataset.y, 10)
    let num =  parseInt(cell.dataset.number, 10)
    let g = String(`[data-number='9']`)
    let k = es(g)

    if (!cell.classList.contains('show')) {
        if (num === 9) {
            for (let i = 0; i < a.length; i++) {
                let b = a[i]
                b.classList.add('show')
            }
            for (let i = 0; i < k.length; i++) {
                let nine = k[i]
                nine.classList.add('tu')
            }
            alert('游戏结束')
        } else if (num === 0){
            cell.classList.add('bs')
            vjklAround(square, b, c)
        } else {
            cell.classList.add('show')
        }
    }
}

const vjklAround = function(square, x, y) {
    if (square[x][y] === 0) {
        vjkl1(square, x - 1, y - 1)
        vjkl1(square, x, y - 1)
        vjkl1(square, x + 1, y + 1)

        vjkl1(square, x - 1, y)
        vjkl1(square, x + 1, y)

        vjkl1(square, x - 1, y + 1)
        vjkl1(square, x, y + 1)
        vjkl1(square, x + 1, y + 1)

    }
}

const vjkl1 = function(square, x, y) {
    let n = square.length
    //4个边界，递归的退出条件
    if (x >= 0 && x < n && y >= 0 && y < n) {
        let a = square[x][y]
        let data_x = `[data-x='${x}']`
        let data_y = `[data-y='${y}']`
        let m = String(data_x) + String(data_y)
        let d = e(m)
        if (!d.classList.contains('show')){
            if (square[x][y] === 9) {
            } else if (square[x][y] === 0) {
                d.classList.add('show')
                d.classList.add('bs')
                vjklAround(square, x, y)
            } else {
                d.classList.add('show')
            }
        }
    }
}


const __main = function() {
    templateRow(square)
    renderSquare(square)
    bindEventDelegate(square)
}

__main()