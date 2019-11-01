# project-1

Elements/Structure: 

Start Button: 
When player clicks start the game commences and the first tetriminos is produced at random and placed at top of board >> use an event listener to kick start whole game. 

Grid: can build this as we did with the grid game - use query selector to select the grid div in the HTML, create a series of divs (cells) and apend these as children of the grid div. The width = 10 and the height = 20. So the total area is 200 (2 * width^2)... so would need to loop through a for loop i = 0 to i = 200. 

const cells = []
const cell = document.createElement('div') >> this is each cell of the grid.

for (let i = 0; i < 200; i++) {
  const cell = document.createElement('div')
  grid.appendChild(cell)
  cells.push(cell)
}

Tertriminos: 
These shapes can be represented by an array in a starting positon of cells[0]

const line = [0, 1, 2, 3]
const tee = [0, 1, 2, 11]
const ell = [0, 1, 2, 10]
const square = [0, 1, 10, 11]

Use Math.Random to select one of these shapes randomly to be added to the board. Store this in a variable currentShape.

Initial Positioning: 

To add these shapes to the board, you can loop through the array and add the class to the cells with these indices: 
e.g. if currentShape = line

Initial positioning: 
for (let i = 0; i < line.length; i++) {
  cells[line[i]].classList.add('occupied')
}

To move down: 
for(i = 0; i < line.length; i++) {
  cells[line[i]].classList.remove('occupied')
  line[i] = line[i] + width 
  cells[line[i]].classList.add('occupied')
}

To move right: 
for(i= 0; i < line.length; i++) {
  cells[line[i]].classList.remove('occupied')
  line[i] = line[i] + 1
  cells[line[i]].classList.add('occupied')
}

To move left: 
for(i= 0; i < line.length; i++) {
  cells[line[i]].classList.remove('occupied')
  line[i] = line[i] + 1
  cells[line[i]].classList.add('occupied')
}

To rotate 90 degrees clockwise: have to calculate indivdually for each object.... TBC. 




Getting the shapes to move automatically...
Use a setInterval(). Every 1 sec, calls a function which adds width to the currentPosition > this will move the shape down a whole line every second. 

Getting the shape to be responsive to player clicks...
Use event listeners on four keys (preferably the arrow keys >> use keycode??). If player selects right, add 1 to the indices of the current position... if the player selects down + width, left -1. 

Rotating:
The up arrow should rotate the elements 90 degrees clockwise. 









