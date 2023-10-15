// DOM Elements
const maze = document.getElementById('maze');
const cell = document.querySelectorAll('.cell')
const mazeSize = document.getElementById('maze-size-input');
const cellSize = document.getElementById('cell-size-input');
const genSpeed = document.getElementById('gen-speed-input');
const genButton = document.getElementById('gen-button');
const clear = document.getElementById('clear-button');
// Global Vars
let size;
let cSize;
let speed;
let interval;
let cells = [];
let stack = [];
// Functions 

function genMaze() {
  for (let i = 0; i < size; i++) {
    cells[i] = [];
    for (let j = 0; j < size; j++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.width = `${cSize}px`;
      cell.style.height = `${cSize}px`;
      maze.appendChild(cell);
      cells[i][j] = {
        div: cell,
        visited: false,
        x: i,
        y: j
      }
    }
  }

  let current = cells[0][0];
  current.visited = true;
  stack.push(current);


  //maze function

  function generateMaze(){
    if (stack.length > 0) {
      current = stack[stack.length - 1];
     current.div.classList.add('visited');
     currentColor(current);
     let neighbors = getUnvisitedNeighbors(current);
     if (neighbors.length > 0) {
        stack.push(current);
        let next = neighbors[Math.floor(Math.random() * neighbors.length)];
     //  console.log(next);
        next.visited = true;
        removeWall(current,next);
        stack.push(next);
     
      } else {
        stack.pop();
      }  
    } else {
      clearInterval(interval)
    }
  }

  interval = setInterval(generateMaze, speed);


  // neighbor function
  function getUnvisitedNeighbors(cell) {
    const neighbors = [];
    let x = cell.x;
    let y = cell.y;
    if (x > 0 && !cells[x-1][y].visited) neighbors.push(cells[x-1][y]);
    if (x < size-1 && !cells[x+1][y].visited) neighbors.push(cells[x+1][y]);
    if (y > 0 && !cells[x][y-1].visited) neighbors.push(cells[x][y-1]);
    if (y < size-1 && !cells[x][y+1].visited) neighbors.push(cells[x][y+1]);
    return neighbors;
  
  }


  // removeWall function 
  function removeWall(a, b) {
    let y = a.x - b.x;
    let x = a.y - b.y;

    if (x === 1) {
       a.div.style.borderLeft = '1px solid #eee';
       b.div.style.borderRight = '1px solid #eee';
    } else if (x === -1) {
       a.div.style.borderRight = '1px solid #eee';
       b.div.style.borderLeft = '1px solid #eee';
    } 

    if (y === 1) {
       a.div.style.borderTop = '1px solid #eee';
       b.div.style.borderBottom = '1px solid #eee';
    } else if (y === -1) {
       a.div.style.borderBottom = '1px solid #eee';
       b.div.style.borderTop = '1px solid #eee';
    }
  };


  // currentColor function
  function currentColor(cell){
    cell.div.style.backgroundColor = 'red';
    setTimeout(()=> {
      cell.div.style.backgroundColor = '#eee';
    }, speed)
  }
}

// end of genMaze function

genButton.addEventListener('click',()=> {
  if (mazeSize.value === "small") {
     size = 10;
  } else if (mazeSize.value === "medium") {
     size = 17;
  } else if (mazeSize.value === "large") {
     size = 34;
  }
  if (cellSize.value === "small") {
     cSize = 10;
  } else if (cellSize.value === "medium") {
     cSize = 20;
  } else if (cellSize.value === "large") {
     cSize = 30;
  } 
  if (genSpeed.value === "slow") {
     speed = 75;
  } else if (genSpeed.value === "medium") {
     speed = 30;
  } else if (genSpeed.value === "fast") {
     speed = 10;
  }
  maze.style.gridTemplateColumns = `repeat(${size}, ${cSize}px)`;
  //console.log(size,cSize,speed);
  genMaze();
})

function clearMaze(){
  maze.innerHTML = '';
  stack = [];
  cells = [];
  clearInterval(interval)
}


clear.addEventListener('click',clearMaze)