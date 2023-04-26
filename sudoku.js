
var table = document.getElementById("mytable");
var cell = table.rows[0].cells[0];
var restart_grid;

function possible(grid, row, column, number) {
  for (let i = 0; i < 9; i++) {
    if (i === column) {
      continue;
    }
    if (grid[row][i] === number) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (i === row) {
      continue;
    }
    if (grid[i][column] === number) {
      return false;
    }
  }

  const x = Math.floor(row / 3) * 3;
  const y = Math.floor(column / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i + x === row || j + y === column) {
        continue;
      }
      if (grid[x + i][y + j] === number) {
        return false;
      }
    }
  }

  return true;
}

function hasEmptySpace(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return false;
}

function shuffle(array) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}


function solve(grid) {
  let row,col;
  if (!hasEmptySpace(grid)) {
    return true;
  } else {
    [row, col] = hasEmptySpace(grid);
  }

  let lis = [1,2,3,4,5,6,7,8,9];
  lis = shuffle(lis);


  for (let n of lis) {
    if (possible(grid, row, col, n)) {
      grid[row][col] = n;
      if(solve(grid)) {
        return grid;
      }
      grid[row][col] = 0;
    }
  }

  return false;
  
}

function print_empty(grid) {

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cell = table.rows[i].cells[j];
      cell.innerHTML = " "
    }
  }
}




function printBoard(grid) {
  restart_grid=grid;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if(grid[i][j]==0) continue;
      cell = table.rows[i].cells[j];
      cell.innerHTML = grid[i][j];
      console.log(i,j);  
    }
  }
}


function checkValid(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!possible(grid, i, j, grid[i][j])) {
        return false;
      }
    }
  }
  return true;
}

function removeRandom(grid) {
  for (let i = 0; i < 81 - 25; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    grid[row][col] = 0;
  }
}


function generate_new_board(){
  const grid = Array.from({length: 9}, () => Array(9).fill(0));
  print_empty(grid)
  solve(grid);
  removeRandom(grid);
  printBoard(grid);
  console.log(grid);
}


function print_restart_grid(){

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {

      cell = table.rows[i].cells[j];
      if(restart_grid[i][j]==0) cell.innerHTML=" ";
      else cell.innerHTML = restart_grid[i][j];
    }
  }
}


var th = document.querySelectorAll("th");
console.log(th);

for(const x of th){
  x.addEventListener("click" , (event)=>{
      var i = event.target.parentNode.rowIndex;
      var j = event.target.cellIndex;
      if(boolen_grid[i][j] == false){
        event.target.innerHTML = value;
      }
      // console.log(i + " " + j);
      // 
  })
}

var select = document.querySelectorAll("#btn");
console.log(select);


for(const x of select){
  x.addEventListener("click" , (event)=>{
    value = event.target.value;
  })
}

