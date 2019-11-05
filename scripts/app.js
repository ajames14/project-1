function setupGame() {

  // Grid set-up

  const width = 10
  const grid = document.querySelector('#grid')
  const gridSize = 2 * (width ** 2)
  const cells = []
  const start = document.querySelector('#start')

  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  const firstRow = []
  for (let i = 0; i < width; i++) {
    firstRow.push(cells[i])
  }
  console.log(firstRow)
  const gameOver = firstRow.some((elem) => {
    return (elem.classList.contains('occupied'))
  })

  const lastRow = []
  for (let i = 190; i < gridSize; i++) {
    lastRow.push(cells[i])
  }
  console.log(lastRow)

  const lastRowFull = lastRow.some((elem) => {
    return (elem.classList.contains('stationary'))
  })

  // Tertriminos set-up

  let line = []
  let tee = []
  let ell = []
  let square = []
  const allShapes = ['line', 'tee', 'ell', 'square']
  // let counter = 0
  let shapeInPlay

  function newShape() {

    let currentShape = allShapes[Math.floor(Math.random() * 4)]
    console.log(currentShape)



    if (currentShape === 'line') {
      line = [0, 1, 2, 3]
      console.log(line)
      shapeInPlay = line
      shapeSelected(line)
    } else if (currentShape === 'square') {
      square = [11, 10, 1, 0]
      shapeInPlay = square
      shapeSelected(square)
    } else if (currentShape === 'tee') {
      tee = [11, 0, 1, 2]
      shapeInPlay = tee
      shapeSelected(tee)
    } else if (currentShape === 'ell') {
      ell = [10, 0, 1, 2]
      shapeInPlay = ell
      shapeSelected(ell)
    }

  }

  start.addEventListener('click', () => {

    newShape()

  })

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
  // LINE CODE 

  // Adds piece to board
  function shapeSelected(shape) {

    for (let j = 0; j < shape.length; j++) {
      cells[shape[j]].classList.add('occupied')
    }

    // Makes the piece move down the grid until it reaches the end and times out
    const boardInterval = setInterval(() => {
      if (isAtBottom(shape)) {
        clearInterval(boardInterval)
        for (let i = 0; i < shape.length; i++) {
          cells[shape[i]].classList.remove('occupied')
          cells[shape[i]].classList.add('stationary')
        }
        newShape()

      } else if (isShapeBelow(shape)) {
        clearInterval(boardInterval)
        for (let i = 0; i < shape.length; i++) {
          cells[shape[i]].classList.remove('occupied')
          cells[shape[i]].classList.add('stationary')
        }
        newShape()

      } else {
        for (let i = 0; i < shape.length; i++) {
          cells[shape[i]].classList.remove('occupied')
          shape[i] = shape[i] + width
          cells[shape[i]].classList.add('occupied')
        }
      }
    }, 1000)
  }
  // Make the piece move right, left, down on player click

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 39: {
        console.log('player pressed right')
        if (shapeInPlay === square) {
          if (isShapeFarRight(shapeInPlay) || isAtBottom(shapeInPlay) || isAtBottom(shapeInPlay)) {
            return
          } else {
            for (let k = 0; k < shapeInPlay.length; k++) {
              cells[shapeInPlay[k]].classList.remove('occupied')
              shapeInPlay[k] = shapeInPlay[k] + 1
              cells[shapeInPlay[k]].classList.add('occupied')
            }
          }
        } else {
          if (isShapeFarRight(shapeInPlay) || isAtBottom(shapeInPlay) || isAtBottom(shapeInPlay)) {
            return
          } else {
            for (let k = shapeInPlay.length - 1; k >= 0; k--) {
              cells[shapeInPlay[k]].classList.remove('occupied')
              shapeInPlay[k] = shapeInPlay[k] + 1
              cells[shapeInPlay[k]].classList.add('occupied')
            }
          }
        }
        break
      }
      case 37:
        console.log('player pressed left')
        if (shapeInPlay === square) {
          if (isShapeFarLeft(shapeInPlay) || isAtBottom(shapeInPlay) || isShapeBelow(shapeInPlay)) {
            return
          } else {
            for (let k = shapeInPlay.length - 1; k >= 0; k--) {
              cells[shapeInPlay[k]].classList.remove('occupied')
              shapeInPlay[k] = shapeInPlay[k] - 1
              cells[shapeInPlay[k]].classList.add('occupied')
            }
          }
        } else {
          if (isShapeFarLeft(shapeInPlay) || isAtBottom(shapeInPlay) || isShapeBelow(shapeInPlay)) {
            return
          } else {
            for (let k = 0; k < shapeInPlay.length; k++) {

              cells[shapeInPlay[k]].classList.remove('occupied')
              shapeInPlay[k] = shapeInPlay[k] - 1
              cells[shapeInPlay[k]].classList.add('occupied')
            }
          }
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
          for (let i = 0; i < shapeInPlay.length; i++) {
            cells[shapeInPlay[i]].classList.remove('occupied')
            shapeInPlay[i] = shapeInPlay[i] + width
            cells[shapeInPlay[i]].classList.add('occupied')
          }
        }
        break
    }
  })









}

document.addEventListener('DOMContentLoaded', setupGame)

