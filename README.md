# Project 1: Building a game in JavaScript

by [Abi James](https://github.com/ajames14)

## Overview

For my first project on the Software Engineering course at General Assembly, I chose to build the arcade game, Tetris. This was an individual project and we were given one week to apply what we had learnt in the first three weeks of the course in order to build a fully functioning game in Javascript. 

[Take a look on GitHub Pages.](https://ajames14.github.io/project-1/)

[Check out the GitHub Repo here.](https://github.com/ajames14/project-1)

## Brief

The project brief:

- Render a game in the browser
- Use Javascript for DOM manipulation
- Design logic for winning & visually display when the player has won
- Include separate HTML / CSS / JavaScript files
- Deploy the game on github pages

### Game Specifications

Tetris is a puzzle game where the player has to fit different shaped blocks (called Tetriminos) together so that they make a complete line across the playing board. The Tetriminos fall from the top of the board one at a time. 

Other features: 

- The player can move the Tetriminos left and right and rotate them clockwise in 90º increments.
- The game should stop if a Tetrimino reaches the highest row of the game board.
- If a line is completed it should be removed and the pieces above should take its place, increasing the player's score.
- The aim of the game is to get as many points as possible before the game board is filled with Tetriminos.

## Technologies Used

- CSS
- JavaScript (ES6)
- Git
- GitHub Pages

## Approach Taken

### Setting the foundations

I started by creating the game's grid using an array of divs or 'cells', arranged using a flex-box to visually form a 10x20 grid. I was then able to generate the tetriminos on the grid and define their movement by adding and removing an 'occupied' class to the relevant cells using their indices within the main cells array.

Each shape was represented by an array of length four, with each element representing an index of a cell to be occupied by the shape. I defined an initial position for each shape to add them to grid and begin the game:

e.g. line = [0, 1, 2, 3]

To move the shapes down the grid, I used a setInterval, removing the 'occupied' class from the current position, defining the new position of the shape directly below by adding +width (+10) to each element of the shapes array, and adding the 'occupied' class to this new position. This setInterval function also had a controller to check if the shape in play had reached the bottom of the grid or met another shaper below, in which case the shape becomes fixed by adding the 'stationary' class. 

I added a start button event listener to begin the game. This calls the 'newShape' function which randomly selects one of the shapes, using Math.random(), assigns it to the shapeInPlay variable and feeds this to the shapeSelected function. This is the setInterval function that governs the downward motion of the shape as described above.

### Functionality

#### Right, Left, Downwards Movement of Shapes

Next, I worked on implementing player interaction. In Tetris, a player can use the left, right and down arrows to move the tetriminos, so I added event listeners to these buttons and defined the new positons by looping through the shapeInPlay array and adding the relevant increments: +1 for right, -1 for left, and adding the width of +10 for down. 

This is were I first encountered a number of bugs and decided to re-factor my code. Initially, I had defined the movement of the shapes by looping through the shapeInPlay array, removing the 'occupied' class from the current position, defining a new position for the shapeInPlay by adding increments to the array, *then* adding the occupied class to the new positon. However, this caused a number of bugs because it mattered specifically what order you looped through the array, adding and removing classes, in order to make the movement flow correctly and to avoid phenomena such as the shapes losing cells or momentarily disappearing from the grid. 

To fix this issue, I took a different approach by first defining the new positon of the shape and assigning this to a variable, newShape. This was then fed as an argument to a new function, moveShape, which would instantaneously remove the occupied class from the current postion and add it to the cells defined by the newPositon array. This fixed the bugs and also came in extremely useful when I moved onto the most complex part of the game, the rotation of the shapes. 

##### Featured piece of code 1: The moveShape function

```
  function moveShape(newPositions) {
    shapeInPlay.forEach(oldPosition => {
      cells[oldPosition].classList.remove('occupied') // remove occupied class
    })
    newPositions.forEach(newPosition => {
      cells[newPosition].classList.add('occupied') // add occupied class
    })
    shapeInPlay = newPositions
  }
```

#### Rotating the Shapes

In Tetris, a player uses the up arrow to rotate a shape 90° clockwise, so I added an event listener to this button as with the vertical and sideways movements. However, rotating the shapes was more complicated as each shape rotated in a different way so I had to work out how each element of the shapes' arrays should be incremented per rotation, keeping track of how many turns had already been made. I used 'if statements' to check which shape was currently in play and applied the corresponding rotations. 

##### Featured piece of code 2: Rotation of the line 

```
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
```

Next, I implemented the logic to check whether a full line had been achieved. If so, this had to be removed and all the 'stationary' cells above had to be moved vertically down by one row. The player's score is then increased by 100 points per line. To do this, I created a new array, rowArray, which divided the grid into 20 rows and created a function, isRowFull() to check if any of the rows are fully occupied by stationary cells - this is called from within the shapeSelected function whenever a shape reaches the bottom of the grid, or meets another stationary cell directly below. 

Lastly, I created a Game Over function, gameOver, which is called every time a new shape is selected. This checks if the first row of the grid contains any divs with the class 'stationary' and if so, ends the game.

### Screenshots

#### Final Product:

![Image 1](/images/img1.png)

#### Players Score Increases:

![Image 2](/images/img2.png)

#### Game Over

![Image 3](/images/img3.png)

### Bugs

Most of the bugs I experienced happened when the shapes were near the far right and left sides of the grid. Due to the way the grid is set up as an array of divs, when the shapes are moved or rotated at the edge of the grid they will move onto the line above. To prevent such bugs, I created a number of functions to check if the shapeInPlay is at the edge of the grid and if so preventing rotations and sideways movements. However, this means some of the shapes cannot be rotated at all when within a few vertical lines of the edge and had to be moved right or left first in order to rotate.

##### Featured piece of code 3: Controller Functions

```
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
```

The other main bug occurs when multiple lines are filled at the same time. In this case, the isRowFull function does not correctly move all the cells above vertically down. 

Please let me know if you find any other bugs via [email](a.james1@live.co.uk). 


### Wins and Blockers

The biggest challenge was associated with creating the moveShape function as described above and the re-factoring required after I introduced this. Initially, I had been taking a different approach to moving the shapes and had written quite a lot of code in line with this. However, I soon realised the limitations of this strategy and I knew I had to look at the problem from a different angle. Once I had worked out a new approach, I had to unpick and re-factor my code but it was definitely worth it in the end. 
The big wins were: 

- Rotating the shapes successfully. It was challenging but a lot of fun working out how each of the shapes would rotate.
- Re-factoring after creating the moveShape function. This reduced the number of bugs significantly and made my code significantly neater and more succinct. 
- Most of all, I gained a lot of confidence in writing JavaScript and using DOM manipulation. It was definitely a challenging project, but it was a great to apply my learnings to build a MVP and I achieved what I set out to do. 

Features I'd like to implement: 

- Different levels: as the player score increases I would like the difficulty level to increase and the tertriminos to fall faster.
- Game over: unfortunately I didn't have time to implement a visually interesting "Game Over" screen.
- Re-Start Button: Currently the game is re-started by refreshing the page. I would like to have added a button to re-set the board. 
- Highest Score: with more time, I would like to implement a system to record players' highest score and create a leader board.