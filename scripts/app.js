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

  // const firstRow = []
  // for (let i = 0; i < width; i++) {
  //   firstRow.push(cells[i])
  // }
  // console.log(firstRow)
  // const gameOver = firstRow.some((elem) => {
  //   return (elem.classList.contains('occupied'))
  // })

  // const lastRow = []
  // for (let i = 190; i < gridSize; i++) {
  //   lastRow.push(cells[i])
  // }
  // console.log(lastRow)

  // const lastRowFull = lastRow.some((elem) => {
  //   return (elem.classList.contains('stationary'))
  // })

  // Tertriminos set-up

  let line = []
  let tee = []
  let ell = []
  let square = []
  const allShapes = ['line', 'line', 'line', 'line']
  // let counter = 0
  let shapeInPlay
  let rotation = 0

  function newShape() {

    let currentShape = allShapes[Math.floor(Math.random() * 4)]
    console.log(currentShape)



    if (currentShape === 'line') {
      line = [0, 1, 2, 3]
      console.log(line)
      shapeInPlay = line
      shapeSelected(shapeInPlay)
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

  function moveShape(newPositions) {
    shapeInPlay.forEach(oldPosition => {
      cells[oldPosition].classList.remove('occupied') // remove occupied class
    })
    newPositions.forEach(newPosition => {
      cells[newPosition].classList.add('occupied') // add occupied class
    })
    shapeInPlay = newPositions
    console.log(shapeInPlay)
  }

  // Below function adds shape to board and moves down grid automatically

  // Adds piece to board
  function shapeSelected(shape) {

    for (let j = 0; j < shape.length; j++) {
      cells[shape[j]].classList.add('occupied')
    }

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
          console.log('shapeBelow met')
        }
        newShape()

      } else {
        // if (shapeInPlay === line && rotation % 4 === 1 || rotation === 3 || rotation % 4 === 3) {
        //   for (let i = shape.length - 1; i >= 0; i--) {
        //     cells[shape[i]].classList.remove('occupied')
        //     shape[i] = shape[i] + width
        //     cells[shape[i]].classList.add('occupied')
        //     console.log('moving down vertically')
        //   }
        // } else {
        for (let i = 0; i < shape.length; i++) {
          cells[shape[i]].classList.remove('occupied')
          shape[i] = shape[i] + width
          cells[shape[i]].classList.add('occupied')
      

        }
        console.log('shape is', shape)
      }
      // }
    }, 1000)
  }


  // Event listeners - Make the piece move right, left, down on player click

  document.addEventListener('keyup', (e) => {
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
      case 38:
        if (shapeInPlay === line) {
          let newPositions = []
          for (let i = 0; i < shapeInPlay.length; i++) {
            newPositions.push(shapeInPlay[i] + (i * (width - 1)))
          }
          moveShape(newPositions)
          shapeSelected(shapeInPlay)
        }


      //   if (shapeInPlay === line) {
      //       // const newPositions = []
      //       rotation = rotation + 1
      //       console.log(rotation)
      //       // Rotates 90 deg clockwise
      //       if (rotation === 1 || rotation % 4 === 1) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           cells[shapeInPlay[i]].classList.remove('occupied')
      //           shapeInPlay[i] = shapeInPlay[i] + (i * (width - 1))
      //           // newPositions.push(shapeInPlay[i] + (i * (width - 1)))
      //           cells[shapeInPlay[i]].classList.add('occupied')
      //         }
      //         // moveShape(newPositions)
      //       }
      //       if (rotation === 2 || rotation % 4 === 2) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           cells[shapeInPlay[i]].classList.remove('occupied')
      //           shapeInPlay[i] = shapeInPlay[i] + (-i * (width + 1))
      //           cells[shapeInPlay[i]].classList.add('occupied')
      //         }
      //         shapeInPlay.sort(function (a, b) {
      //           return a - b
      //         })
      //       }
      //       if (rotation === 3 || rotation % 4 === 3) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           cells[shapeInPlay[i]].classList.remove('occupied')
      //           shapeInPlay[i] = shapeInPlay[i] + ((i - 3) * (width - 1))
      //           cells[shapeInPlay[i]].classList.add('occupied')
      //         }
      //       }
      //       if (rotation === 4 || rotation % 4 === 0) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           cells[shapeInPlay[i]].classList.remove('occupied')
      //           shapeInPlay[i] = shapeInPlay[i] + ((3 - i) * (width + 1))
      //           cells[shapeInPlay[i]].classList.add('occupied')
      //         }
      //         shapeInPlay.sort(function (a, b) {
      //           return a - b
      //         })
      //       }
      //     }

      //     // ROTATIONS FOR ELL

      //     if (shapeInPlay === ell) {
      //       rotation = rotation + 1
      //       console.log(rotation)
      //       // Rotates 90 deg clockwise
      //       if (rotation === 1 || rotation % 4 === 1) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           switch (i) {
      //             case 0:
      //               shapeInPlay[i]
      //               break
      //             case 1:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + width + 1
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 2:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + (2 * width)
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 3:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + ((3 * width) - 1)
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //           }
      //         }
      //         console.log(ell)
      //       }
      //       if (rotation === 2 || rotation % 4 === 2) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           switch (i) {
      //             case 0:
      //               shapeInPlay[i]
      //               break
      //             case 1:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + width - 1
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 2:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] - 2
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 3:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] - width - 3
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //           }
      //         }
      //         shapeInPlay.sort(function (a, b) {
      //           return b - a
      //         })
      //         console.log(ell)
      //       }
      //       if (rotation === 3 || rotation % 4 === 3) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           switch (i) {
      //             case 0:
      //               shapeInPlay[i]
      //               break
      //             case 1:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] - width + 1
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 2:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + 2 - (2 * width)
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 3:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + width + 1
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //           }
      //         }
      //         shapeInPlay.sort(function (a, b) {
      //           return a - b
      //         })
      //         console.log(ell)
      //       }
      //       if (rotation === 4 || rotation % 4 === 0) {
      //         for (let i = 0; i < shapeInPlay.length; i++) {
      //           switch (i) {
      //             case 0:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + 3 + width
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 1:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] + 2
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 2:
      //               cells[shapeInPlay[i]].classList.remove('occupied')
      //               shapeInPlay[i] = shapeInPlay[i] - width + 1
      //               cells[shapeInPlay[i]].classList.add('occupied')
      //               break
      //             case 3:
      //               shapeInPlay[i]
      //               break
      //           }
      //         }
      //         shapeInPlay.sort(function (a, b) {
      //           return a - b
      //         })
      //         console.log(ell)
      //       }
      //     }
    }
  })









}

document.addEventListener('DOMContentLoaded', setupGame)

