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

  const newShape = lastRow.some((elem) => {
    return (elem.classList.contains('occupied'))
  })

  // Tertriminos set-up

  const line = [0, 1, 2, 3]
  const tee = [0, 1, 2, 11]
  const ell = [0, 1, 2, 10]
  const square = [0, 1, 10, 11]
  const allShapes = ['line', 'tee', 'ell', 'square']
  let counter = 0

  // LINE CODE 

  // Adds piece to board
  function lineSelected() {

    for (let j = 0; j < line.length; j++) {
      cells[line[j]].classList.add('occupied')
    }


    // Makes the piece move down the grid until it reaches the end and times out
    let boardInterval = setInterval(() => {
      for (let i = 0; i < line.length; i++) {
        if (line[i] > (gridSize - width - 1)) {
          clearInterval(boardInterval)
          counter =  counter + 1
          console.log(counter)
          return 
        }
        cells[line[i]].classList.remove('occupied')
        line[i] = line[i] + width
        cells[line[i]].classList.add('occupied')
        console.log('down')
      }
    }, 1000)

    // Make the piece move right, left, down on player click

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 39: {
          console.log('player pressed right')
          for (let k = line.length - 1; k >= 0; k--) {
            if ((line[k] + 1) % width === 0 || line[k] > (gridSize - width - 1)) {
              return
            }
            cells[line[k]].classList.remove('occupied')
            line[k] = line[k] + 1
            cells[line[k]].classList.add('occupied')
          }
          break
        }
        case 37:
          console.log('player pressed left')
          for (let k = 0; k < line.length; k++) {
            if ((line[k]) % 10 === 0 || line[k] > (gridSize - width - 1)) {
              return
            }
            cells[line[k]].classList.remove('occupied')
            line[k] = line[k] - 1
            cells[line[k]].classList.add('occupied')
          }
          break
        case 40:
          console.log('player pressed down')
          for (let k = 0; k < line.length; k++) {
            if ((line[k]) > ((gridSize) - width - 1)) {
              clearInterval(boardInterval)
              return
            }
            cells[line[k]].classList.remove('occupied')
            line[k] = line[k] + width
            cells[line[k]].classList.add('occupied')
          }
          break
      }
    })
  }
  // lineSelected()

  // SQUARE CODE
  function squareSelected() {
    for (let j = 0; j < square.length; j++) {
      cells[square[j]].classList.add('occupied')
    }

    // Makes the piece move down the grid until it reaches the end and times out
    const boardInterval = setInterval(() => {
      for (let i = square.length - 1; i >= 0; i--) {
        if (square[i] > (gridSize - width - 1)) {
          return
        }
        cells[square[i]].classList.remove('occupied')
        square[i] = square[i] + width
        cells[square[i]].classList.add('occupied')
        console.log('down')
      }
    }, 1000)

    // setTimeout(() => {
    //   clearInterval(boardInterval)
    // }, 19000)


    // Make the piece move right, left, down on player click

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 39: {
          console.log('player pressed right')
          for (let k = square.length - 1; k >= 0; k--) {
            if ((square[k] + 1) % width === 0 || square[k] > (gridSize - width - 1)) {
              return
            }
            cells[square[k]].classList.remove('occupied')
            square[k] = square[k] + 1
            cells[square[k]].classList.add('occupied')
          }
          break
        }
        case 37:
          console.log('player pressed left')
          for (let k = 0; k < square.length; k++) {
            if ((square[k]) % 10 === 0 || square[k] > (gridSize - width - 1)) {
              return
            }
            cells[square[k]].classList.remove('occupied')
            square[k] = square[k] - 1
            cells[square[k]].classList.add('occupied')
          }
          break
        case 40:
          console.log('player pressed down')
          for (let k = square.length - 1; k >= 0; k--) {
            if ((square[k]) > ((gridSize) - width - 1)) {
              return
            }
            cells[square[k]].classList.remove('occupied')
            square[k] = square[k] + width
            cells[square[k]].classList.add('occupied')
          }
          break
      }
    })
  }
  // squareSelected()

  // TEE CODE
  function teeSelected() {
    for (let j = 0; j < tee.length; j++) {
      cells[tee[j]].classList.add('occupied')
    }

    // Makes the piece move down the grid until it reaches the end and times out
    const boardInterval = setInterval(() => {
      for (let i = tee.length - 1; i >= 0; i--) {
        if (tee[i] > (gridSize - width - 1)) {
          return
        }
        cells[tee[i]].classList.remove('occupied')
        tee[i] = tee[i] + width
        cells[tee[i]].classList.add('occupied')
        console.log('down')
      }
    }, 1000)

    // setTimeout(() => {
    //   clearInterval(boardInterval)
    // }, 19000)


    // Make the piece move right, left, down on player click

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 39: {
          const shapeAtEnd = tee.some((elem) => {
            return (elem + 1) % width === 0
          })
          console.log('player pressed right')
          for (let k = tee.length - 1; k >= 0; k--) {
            if (shapeAtEnd) {
              return
            }
            cells[tee[k]].classList.remove('occupied')
            tee[k] = tee[k] + 1
            cells[tee[k]].classList.add('occupied')
          }
          break
        }
        case 37:
          console.log('player pressed left')
          for (let k = 0; k < tee.length; k++) {
            if ((tee[k]) % width === 0 || tee[k] > (gridSize - width - 1)) {
              return
            }
            cells[tee[k]].classList.remove('occupied')
            tee[k] = tee[k] - 1
            cells[tee[k]].classList.add('occupied')
          }
          break
        case 40:
          console.log('player pressed down')
          for (let k = tee.length - 1; k >= 0; k--) {
            if ((tee[k]) > ((gridSize) - width - 1)) {
              return
            }
            cells[tee[k]].classList.remove('occupied')
            tee[k] = tee[k] + width
            cells[tee[k]].classList.add('occupied')
          }
          break
      }
    })
  }

  // teeSelected()

  // ELL Code

  function ellSelected() {
    for (let j = 0; j < ell.length; j++) {
      cells[ell[j]].classList.add('occupied')
    }

    // Makes the piece move down the grid until it reaches the end and times out
    const boardInterval = setInterval(() => {
      for (let i = ell.length - 1; i >= 0; i--) {
        if (ell[i] > (gridSize - width - 1)) {
          return
        }
        cells[ell[i]].classList.remove('occupied')
        ell[i] = ell[i] + width
        cells[ell[i]].classList.add('occupied')
        console.log('down')
      }
    }, 1000)

    // setTimeout(() => {
    //   clearInterval(boardInterval)
    // }, 19000)


    // Make the piece move right, left, down on player click

    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 39: {
          const shapeAtEnd = ell.some((elem) => {
            return (elem + 1) % width === 0
          })
          console.log('player pressed right')
          for (let k = ell.length - 1; k >= 0; k--) {
            if (shapeAtEnd) {
              return
            }
            cells[ell[k]].classList.remove('occupied')
            ell[k] = ell[k] + 1
            cells[ell[k]].classList.add('occupied')
          }
        }
          break
        case 37:
          console.log('player pressed left')
          for (let k = 0; k < ell.length; k++) {
            if ((ell[k]) % width === 0 || ell[k] > (gridSize - width - 1)) {
              return
            }
            cells[ell[k]].classList.remove('occupied')
            ell[k] = ell[k] - 1
            cells[ell[k]].classList.add('occupied')
          }
          break
        case 40:
          console.log('player pressed down')
          for (let k = ell.length - 1; k >= 0; k--) {
            if ((ell[k]) > ((gridSize) - width - 1)) {
              return
            }
            cells[ell[k]].classList.remove('occupied')
            ell[k] = ell[k] + width
            cells[ell[k]].classList.add('occupied')
          }
          break
      }
    })
  }
  // ellSelected()

  // function clearShape() {
  //   clearInterval(boardInterval)
  // }
  // On clicking start button, game starts
  start.addEventListener('click', () => {
    
    while (counter < 2) {
      lineSelected()
    }
  })

































}

document.addEventListener('DOMContentLoaded', setupGame)

