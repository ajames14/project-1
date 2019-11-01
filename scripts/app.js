function setupGame() {

  // Grid set-up

  const width = 10
  const grid = document.querySelector('#grid')
  const gridSize = 2 * (width ** 2)
  const cells = []
  const start = document.querySelector('start')

  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Tertriminos set-up

  const line = [0, 1, 2, 3]
  const tee = [0, 1, 2, 11]
  const ell = [0, 1, 2, 10]
  const square = [0, 1, 10, 11]

  // Adds piece to board

  document.addEventListener('click', () => {
  
    
    for (let j = 0; j < line.length; j++) {
      cells[line[j]].classList.add('occupied')
    }

    // Makes the piece move down the grid until it reaches the end and times out
    const boardInterval = setInterval(() => {
      for (let i = 0; i < line.length; i++) {
        if (line[i] > (gridSize - width - 1)) {
          return
        }
        cells[line[i]].classList.remove('occupied')
        line[i] = line[i] + width
        cells[line[i]].classList.add('occupied')
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
              return
            }
            cells[line[k]].classList.remove('occupied')
            line[k] = line[k] + width
            cells[line[k]].classList.add('occupied')
          }
          break
      }
    })
  })






























}

document.addEventListener('DOMContentLoaded', setupGame)

