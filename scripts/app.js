function setupGame() {

  // Grid set-up
  const width = 10
  const grid = document.querySelector('#grid')
  const gridSize = 2 * (width ** 2)
  const cells = []
  const start = document.querySelector('#start')
  const scoreInput = document.querySelector('#score-input')
  const linesInput = document.querySelector('#lines-input')

  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // console.log(firstRow)
  // const gameOver = firstRow.some((elem) => {
  //   return (elem.classList.contains('occupied'))
  // })

  let rowArray = []
  for (let i = 0; i < 20; i++) {
    rowArray.push(cells.slice(i * 10, ((i * 10) + 10)))
  }

  const firstRow = rowArray[0]
  console.log(firstRow)

  function gameOver() {
    return firstRow.some((elem) => {
      return (elem.classList.contains('stationary'))
    })
  }

  const lastRow = []
  for (let i = 190; i < gridSize; i++) {
    lastRow.push(cells[i])
  }

  // Tertriminos set-up
  let line = []
  let tee = []
  let ell = []
  let square = []
  let zed = []
  let startClicked = 0
  const allShapes = ['line', 'tee', 'ell', 'square', 'zed']
  let shapeInPlay
  let rotation = 0
  let initialShape
  let rowCounter = 0

  // Function to generate a new shape when called
  function newShape() {
    if (gameOver()) {
      alert('GAME OVER!')
      return
    } else {
      let currentShape = allShapes[Math.floor(Math.random() * 5)]
      console.log(currentShape)

      if (currentShape === 'line') {
        line = [0, 1, 2, 3]
        initialShape = line
        rotation = 0
        shapeInPlay = line
        shapeSelected(shapeInPlay)
      } else if (currentShape === 'square') {
        square = [11, 10, 1, 0]
        initialShape = square
        rotation = 0
        shapeInPlay = square
        shapeSelected(square)
      } else if (currentShape === 'tee') {
        tee = [11, 0, 1, 2]
        initialShape = tee
        rotation = 0
        shapeInPlay = tee
        shapeSelected(tee)
      } else if (currentShape === 'ell') {
        ell = [10, 0, 1, 2]
        initialShape = ell
        rotation = 0
        shapeInPlay = ell
        shapeSelected(ell)
      } else if (currentShape === 'zed') {
        zed = [0, 1, 11, 12]
        initialShape = zed
        rotation = 0
        shapeInPlay = zed
        shapeSelected(zed)
      }
    }
  }

  // Event listener to start game
  start.addEventListener('click', () => {
    startClicked = startClicked + 1
    if (startClicked === 1) {
      newShape()
    } else {
      return
    }
  })

  // Control functions to monitor when a shape is no longer movable
  function isAtBottom(shape) {
    return shape.some((elem) => {
      return elem > (gridSize - width - 1)
    })
  }

  function isShapeBelow(shape) {
    return shape.some((elem) => {
      return cells[elem + width].classList.contains('stationary')
    })
  }

  function isShapeTwoBelow(shape) {
    return shape.some((elem) => {
      return cells[elem + (2 * width)].classList.contains('stationary')
    })
  }

  function isShapeFarRight(shape) {
    return shape.some((elem) => {
      return (elem + 1) % width === 0
    })
  }

  function isShapeFarLeft(shape) {
    return shape.some((elem) => {
      return elem % width === 0
    })
  }

  function isLineFarLeft(shape) {
    return shape.every((elem) => {
      return elem % width < 3 && elem % width >= 0
    })
  }

  function isLineFarRight(shape) {
    return shape.every((elem) => {
      return elem % width <= 9 && elem % width > 6
    })
  }

  function isEllFarLeft(shape) {
    return shape.some((elem) => {
      return elem % width <= 1 && elem % width >= 0
    })
  }

  function isEllFarRight(shape) {
    return shape.some((elem) => {
      return elem % width <= 9 && elem % width > 7
    })
  }

  function isZedFarLeft(shape) {
    return shape.some((elem) => {
      return elem % width === 0
    })
  }

  // *** Removing and moving rows down when filled ***
  function isRowFull() {
    let checkForFullRow = []
    for (let i = 0; i < 20; i++) {
      checkForFullRow.push(rowArray[i].every((elem) => {
        return elem.classList.contains('stationary')
      })
      )
      console.log(checkForFullRow)
    }

    let indexArray = []
    for (let i = 0; i < 20; i++) {
      if (checkForFullRow[i] === true) {
        indexArray.push(i)
        rowCounter = rowCounter + 1
        console.log(rowCounter)
        scoreInput.innerHTML = rowCounter * 100
        linesInput.innerHTML = rowCounter
      }
      console.log(indexArray)
    }

    
    for (let i = 0; i < indexArray.length; i++) {
      const fullRow = rowArray[indexArray[i]]
      for (let j = 0; j < fullRow.length; j++) {
        fullRow[j].classList.remove('stationary')
      }
      console.log(fullRow)

      let newFixedArray = []
      for (let k = 0; k < (indexArray[0] * 10); k++) {
        if (cells[k].classList.contains('stationary')) {
          cells[k].classList.remove('stationary')
          newFixedArray.push(cells[k + (width * indexArray.length)])
        }
      }
      for (let j = 0; j < newFixedArray.length; j++) {
        newFixedArray[j].classList.add('stationary')
      }
    }
  }




  // Function to move shape instantaneously to assigned new position
  function moveShape(newPositions) {
    shapeInPlay.forEach(oldPosition => {
      cells[oldPosition].classList.remove('occupied') // remove occupied class
    })
    newPositions.forEach(newPosition => {
      cells[newPosition].classList.add('occupied') // add occupied class
    })
    shapeInPlay = newPositions
  }

  // Main function for adding shapes to board and moves down grid automatically
  function shapeSelected() {

    for (let j = 0; j < shapeInPlay.length; j++) {
      cells[shapeInPlay[j]].classList.add('occupied')
    }

    const boardInterval = setInterval(() => {
      if (isAtBottom(shapeInPlay)) {
        clearInterval(boardInterval)
        for (let i = 0; i < shapeInPlay.length; i++) {
          cells[shapeInPlay[i]].classList.remove('occupied')
          cells[shapeInPlay[i]].classList.add('stationary')
        }
        isRowFull()
        newShape()

      } else if (isShapeBelow(shapeInPlay)) {
        clearInterval(boardInterval)
        for (let i = 0; i < shapeInPlay.length; i++) {
          cells[shapeInPlay[i]].classList.remove('occupied')
          cells[shapeInPlay[i]].classList.add('stationary')
        }
        isRowFull()
        newShape()

      } else {
        let newPositions = []
        for (let i = 0; i < shapeInPlay.length; i++) {
          newPositions.push(shapeInPlay[i] + width)
        }
        moveShape(newPositions)
      }
    }, 250)
  }

  // Event listeners - Make the piece move right, left, down on player click

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 39: {
        console.log('player pressed right')
        if (isShapeFarRight(shapeInPlay) || isAtBottom(shapeInPlay) || isAtBottom(shapeInPlay)) {
          return
        } else {
          let newPositions = []
          for (let k = 0; k < shapeInPlay.length; k++) {
            newPositions.push(shapeInPlay[k] + 1)
          }
          moveShape(newPositions)
        }
      }
        break
      case 37:
        console.log('player pressed left')
        if (isShapeFarLeft(shapeInPlay) || isAtBottom(shapeInPlay) || isShapeBelow(shapeInPlay)) {
          return
        } else {
          let newPositions = []
          for (let k = 0; k < shapeInPlay.length; k++) {
            newPositions.push(shapeInPlay[k] - 1)
          }
          moveShape(newPositions)
        }
        break
      case 40:
        console.log('player pressed down')
        if (isAtBottom(shapeInPlay)) {

          for (let i = 0; i < shapeInPlay.length; i++) {
            cells[shapeInPlay[i]].classList.remove('occupied')
            cells[shapeInPlay[i]].classList.add('stationary')
          }
          return
        } else if (isShapeBelow(shapeInPlay)) {

          for (let i = 0; i < shapeInPlay.length; i++) {
            cells[shapeInPlay[i]].classList.remove('occupied')
            cells[shapeInPlay[i]].classList.add('stationary')
          }
          return

        } else {
          let newPositions = []
          for (let k = 0; k < shapeInPlay.length; k++) {
            newPositions.push(shapeInPlay[k] + width)
          }
          moveShape(newPositions)
        }
        break
      case 38:
        if (isAtBottom(shapeInPlay) || isShapeBelow(shapeInPlay) || isShapeTwoBelow(shapeInPlay)){
          return
        } 
        if (initialShape === line) {
          rotation = rotation + 1
          if (rotation % 4 === 1) {
            let newPositions = []
            for (let i = 0; i < shapeInPlay.length; i++) {
              newPositions.push(shapeInPlay[i] + (i * (width - 1)))
            }
            moveShape(newPositions)
          }
          if (rotation % 4 === 2) {
            if (isLineFarLeft(shapeInPlay)) {
              rotation = rotation - 1
              console.log('shape far left')
              return
            } else {
              let newPositions = []
              for (let i = 0; i < shapeInPlay.length; i++) {
                newPositions.push(shapeInPlay[i] + (-i * (width + 1)))
              }
              moveShape(newPositions)
            }
          }
          if (rotation % 4 === 3) {
            let newPositions = []
            for (let i = 0; i < shapeInPlay.length; i++) {
              newPositions.push(shapeInPlay[i] + (i * (1 - width)))
            }
            moveShape(newPositions)
          }
          if (rotation % 4 === 0) {
            if (isLineFarRight(shapeInPlay)) {
              rotation = rotation - 1
              console.log('shape far right')
              return
            }
            let newPositions = []
            for (let i = 0; i < shapeInPlay.length; i++) {
              newPositions.push(shapeInPlay[i] + (i * (width + 1)))
            }
            moveShape(newPositions)
          }
        }
        if (initialShape === ell) {
          rotation = rotation + 1
          if (rotation % 4 === 1) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] + width + 1)
            newPositions.push(shapeInPlay[2] + (2 * width))
            newPositions.push(shapeInPlay[3] + ((3 * width) - 1))
            moveShape(newPositions)
          }
          if (rotation % 4 === 2) {
            if (isEllFarLeft(shapeInPlay)) {
              rotation = rotation - 1
              console.log('ell is far left')
              return
            } else {
              let newPositions = []
              newPositions.push(shapeInPlay[0])
              newPositions.push(shapeInPlay[1] + width - 1)
              newPositions.push(shapeInPlay[2] - 2)
              newPositions.push(shapeInPlay[3] - width - 3)
              moveShape(newPositions)
            }
          }
          if (rotation % 4 === 3) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] - width - 1)
            newPositions.push(shapeInPlay[2] - (2 * width))
            newPositions.push(shapeInPlay[3] - (3 * width) + 1)
            moveShape(newPositions)
          }
          if (rotation % 4 === 0) {
            if (isEllFarRight(shapeInPlay)) {
              rotation = rotation - 1
              return 
            }
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] - width + 1)
            newPositions.push(shapeInPlay[2] + 2)
            newPositions.push(shapeInPlay[3] + 3 + width)
            moveShape(newPositions)
          }
        }
        if (initialShape === tee) {
          rotation = rotation + 1
          if (rotation % 4 === 1) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] + 2)
            newPositions.push(shapeInPlay[2] + 1 + width)
            newPositions.push(shapeInPlay[3] + (2 * width))
            moveShape(newPositions)
          }
          if (rotation % 4 === 2) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] + (2 * width))
            newPositions.push(shapeInPlay[2] + width - 1)
            newPositions.push(shapeInPlay[3] - 2)
            moveShape(newPositions)
            console.log(shapeInPlay)
          }
          if (rotation % 4 === 3) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] - 2)
            newPositions.push(shapeInPlay[2] - 1 - width)
            newPositions.push(shapeInPlay[3] - (2 * width))
            moveShape(newPositions)
          }
          if (rotation % 4 === 0) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] - (2 * width))
            newPositions.push(shapeInPlay[2] - width + 1)
            newPositions.push(shapeInPlay[3] + 2)
            moveShape(newPositions)
          }
        }
        if (initialShape === zed) {
          rotation = rotation + 1
          if (rotation % 4 === 1) {
            if (isZedFarLeft(shapeInPlay)) {
              rotation = rotation - 1
              console.log('zed far left')
              return
            }
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] + width - 1)
            newPositions.push(shapeInPlay[2] - 2)
            newPositions.push(shapeInPlay[3] + width - 3)
            moveShape(newPositions)
          }
          if (rotation % 4 === 2) {
            if (isZedFarLeft(shapeInPlay)) {
              rotation = rotation - 1
              console.log('zed far left')
              return
            }
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] - 1 - width)
            newPositions.push(shapeInPlay[2] - (2 * width))
            newPositions.push(shapeInPlay[3] - (3 * width) - 1)
            moveShape(newPositions)
            console.log(shapeInPlay)
          }
          if (rotation % 4 === 3) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] - width + 1)
            newPositions.push(shapeInPlay[2] + 2)
            newPositions.push(shapeInPlay[3] + 3 - width)
            moveShape(newPositions)
          }
          if (rotation % 4 === 0) {
            let newPositions = []
            newPositions.push(shapeInPlay[0])
            newPositions.push(shapeInPlay[1] + 1 + width)
            newPositions.push(shapeInPlay[2] + (2 * width))
            newPositions.push(shapeInPlay[3] + (3 * width) + 1)
            moveShape(newPositions)
          }
        }

    }
  })

}

document.addEventListener('DOMContentLoaded', setupGame)

