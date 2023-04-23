let board = [];

var table = document.getElementById("mytable");
var cell = table.rows[0].cells[0];

function print_sudoku(){
  for(var i = 1;i<9;i++){
    for(var j = 1;j<9;j++){
	cell = table.row[i].cells[j];
      cell.innerHtml = board[i][j];
    }
  }
}






function generate_new_board(attempts = 0) {
    
  
    // Step 1: Create an empty 9x9 grid
    for (let i = 0; i < 9; i++) {
      board.push(new Array(9).fill(0));
    }
  
    // Step 2: Fill in each row of the grid with a random permutation of the numbers 1 to 9
    for (let i = 0; i < 9; i++) {
      board[i] = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }
  
    for (let col = 0; col < 9; col++) {
      let seen = new Set();
      for (let row = 0; row < 9; row++) {
        let num = board[row][col];
        if (seen.has(num)) {
          if (attempts < 100) {
            return generate_new_board(attempts + 1);
          } else {
            throw new Error("Unable to generate valid Sudoku board");
          }
        }
        seen.add(num);
      }
    }
  
    // Step 4: Check that each 3x3 block of the grid contains no duplicates
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        let seen = new Set();
        for (let r = row; r < row + 3; r++) {
          for (let c = col; c < col + 3; c++) {
            let num = board[r][c];
            if (seen.has(num)) {
              if (attempts < 100) {
                return generate_new_board(attempts + 1);
              } else {
                throw new Error("Unable to generate valid Sudoku board");
              }
            }
            seen.add(num);
          }
        }
      }
    }
  
    // Step 5: Board is valid, return it
    print_sudoku();
  }
  
  function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }







// // function generate_new_board() {
// //     var table = document.getElementById("mytable");


// //   // Step 2: Fill in each row of the grid with a random permutation of the numbers 1 to 9
// //   for (let i = 0; i < 9; i++) {
// //     table.rows[i] = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// //   }

// //   // Step 3: Check that each column of the grid contains no duplicates
// //   for (let col = 0; col < 9; col++) {
// //     let seen = new Set();
// //     for (let row = 0; row < 9; row++) {
// //       let num = table.row[row].cell[col];
// //       if (seen.has(num)) {
// //         // Duplicate found, regenerate board
// //         return generateSudokuBoard();
// //       }
// //       seen.add(num);
// //     }
// //   }

// //   // Step 4: Check that each 3x3 block of the grid contains no duplicates
// //   for (let row = 0; row < 9; row += 3) {
// //     for (let col = 0; col < 9; col += 3) {
// //       let seen = new Set();
// //       for (let r = row; r < row + 3; r++) {
// //         for (let c = col; c < col + 3; c++) {
// //           let num = table.row[row].cell[col];
// //           if (seen.has(num)) {
// //             // Duplicate found, regenerate board
// //             return generateSudokuBoard();
// //           }
// //           seen.add(num);
// //         }
// //       }
// //     }
// //   }

// //   // Step 5: Board is valid, return it
// //   print_sudoku();
// // }

// // function shuffleArray(array) {
// //   // Fisher-Yates shuffle algorithm
// //   for (let i = array.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [array[i], array[j]] = [array[j], array[i]];
// //   }
// //   return array;
// // }






