'use strict'
// Timer settings :
function createTimerVariables() {
    var gTimerId;
    var gStartingSeconds = 60;
    var gTime = gStartingSeconds * 100
    // this isn't really a function, just take the 3 vars out when creating a timer with the setTimer() function.
}
// function setTimer() {
//     var seconds = Math.floor(gTime / 100);
//     var miliseconds = gTime % 100;

//     var elTimer = document.querySelector('.timer');   // the html that will hold our timer render
//     elTimer.innerHTML = `${seconds}.${miliseconds}`;

//     gTime--

//     if (gTime < 0) {
//         clearInterval(gTimerId);
//         elTimer.innerHTML = `0`; // sometimes it doesn't stop on time and shows a negative number
//         alert(`Time's up!`);
//     }
// }


// Shuffles an array and returns it (using an extra function drawNums).
function shuffle(nums) {
    for (var i = 0; i < nums.length; i++) {
        nums.push(drawNum(nums));
    }

    return nums;
}

// Returns an array that's been shuffled.            not my function.
function shuffle(elements) {
    var randIdx;
    var keep;

    for (var i = elements.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, elements.length - 1);
        keep = elements[i];
        elements[i] = elements[randIdx];
        elements[randIdx] = keep;
    }

    return elements;
}


// Returns the current time in a string in this format : HH:MM:SS AM/PM.
function getTime() {
    return new Date().toLocaleTimeString();
}


// Returns a new array without the duplicates of the original array.
function removeDuplicates(elements) {
    var newArr = [];

    for (var i = 0; i < elements.length; i++) {
        var currElement = elements[i];
        if (!(newArr.includes(currElement))) newArr.push(currElement);
    }

    return newArr;
}

// Checks the neighbors around a specific cell that has the cellRowIdx & cellColIdx (maximum 8 neighbors in a matrix).
function checkNegs(mat, cellRowIdx, cellColIdx) {

    for (var i = cellRowIdx - 1; i <= cellRowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = cellColIdx - 1; j <= cellColIdx + 1; j++) {
            if (j < 0 || j > mat[i].length - 1) continue;
            if (i === cellRowIdx && j === cellColIdx) continue;
            var cell = mat[i][j];
            // console.log('cell', cell)
            if (cell === something) {

                // Update the Model:

                // Update the Dom:

            }
        }
    }
}


// Can check a specific area in the matrix and return what we need.
function checkArea(mat, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {
    var somethingArea;

    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            var currCell = mat[i][j];
            // somethingArea = currCell; we can do something with the cells in this specific area
        }
    }

    return somethingArea;
}


// Returns an array containing the most common/frequent found keys in the object map created by iterating a matrix. The key could represent whatever we want, and it's value will be the number of times it appeared in the matrix.
function findModes(mat) {
    var modes = [];
    var objMap = {};

    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[i].length; j++) {
            var currCell = mat[i][j];
            if (!objMap[currCell]) objMap[currCell] = 0;
            objMap[currCell] = objMap[currCell] + 1;
        }
    }

    console.log('objMap', objMap);
    var highestCount = -Infinity;

    for (var key in objMap) {
        var currKeyCount = objMap[key];
        if (currKeyCount > highestCount) {
            highestCount = currKeyCount;
            modes = [key];
        } else if (currKeyCount === highestCount) {
            modes.push(key);
        }
    }

    return modes;
}


// Returns a number drawn from nums array, removes the number from the array, and reduces the next random index options.
function drawNum(nums) {
    var numIdx = Math.floor(Math.random() * nums.length);
    return nums.splice(numIdx, 1)[0];
}

// Returns a numbers array (100 by default) in an ascending order, could be used to reset the array as in recreating it.
function createResetNums(numCount = 100) {
    var nums = [];

    for (var i = 0; i < numCount; i++) {
        nums[i] = i + 1;
    }

    return nums;
}


// Returns a boolean based on whether the matrix is a magic square or not.
// In a magic square, the sums of the rows, columns, and the two diagonals should all be equal.
// For example:
//  2 7 6
//  9 5 1
//  4 3 8 
// all sums return the number 15.
// could be moduled to just get the sum of rows/columns/diagonals
function isMagicSquare(mat) {

    for (var i = 0; i < mat.length; i++) {
        var currRow = mat[i];
        var sumRows = 0;
        var sumCols = 0;
        var sumDiagonal1 = 0;
        var sumDiagonal2 = 0;

        if (currRow.length === mat.length) {
            for (var j = 0; j < currRow.length; j++) {
                sumRows += currRow[j];
                sumCols += mat[j][i];
                sumDiagonal1 += mat[j][j]
                sumDiagonal2 += mat[j][mat[i].length - i - 1];
            }
        } else {
            return false
        }

        if (sumRows !== sumCols || sumRows !== sumDiagonal1 || sumRows !== sumDiagonal2) return false
    }

    return true
}


// Returns a boolean after checking the secondary diagonal (from top right to bottom left).
function isSecDiagComplete(mat, posObj = { row: i, col: j }) {
    if (!isSquareMat(mat)) return false // checks first if the matrix is square (essential!)

    if (posObj.row + posObj.col === mat.length) {
        for (var i = 0; i < mat.length; i++) {
            var currCell = mat[i][mat.length - 1 - i];
            if (!currCell) return false; // If the current cell does not meet our requirements for "complete" then no need to continue checking other cells in the secondary diagonal, return false
        }
        return true
    }
}


// Returns a boolean after checking the main diagonal (from top left to bottom right).
function isMainDiagComplete(mat, posObj = { row: i, col: j }) {
    if (!isSquareMat(mat)) return false // checks first if the matrix is square (essential!)

    if (posObj.row === posObj.col) {
        for (var i = 0; i < mat.length; i++) {
            var currCell = mat[i][i];
            if (!currCell) return false; // If the current cell does not meet our requirements for "complete" then no need to continue checking other cells in the main diagonal, return false
        }
        return true
    }
}


// Returns a boolean after checking a relevant row.
function isRowComplete(mat, rowIdx) {
    for (var i = 0; i < mat.length; i++) {
        var currCell = mat[rowIdx][i];
        if (!currCell) return false; // If the current cell does not meet our requirements for "complete" then no need to continue checking other cells in the row, return false
    }
    return true
}


// Copies a mat and prints it with whatever changes if needed.
function copyMatPrintMat(mat) {
    var matCopy = [];

    for (var i = 0; i < mat.length; i++) {
        matCopy[i] = [];
        for (var j = 0; j < mat[i].length; j++) {
            matCopy[i][j] = mat[i][j];
            // if (mat[i][j] something) matCopy[i][j] += 'something'; relevant only when we want to print the mat with changes without changing the original mat but changing the copymat instead
        }
    }

    // console.table(matCopy);
    return matCopy;
}

// Returns a boolean based on this condition : mat[i][j] === mat[j][i].
// For example, this is a symmetric mat :
// [[1, 1, 3],
// [1, 2, 0],
// [3, 0, 5]];
function isSymmetricMat(mat) {
    for (var i = 0; i < mat.length; i++) {
        if (!(mat[i].length === mat.length)) return false
        for (var j = 0; j < mat[i].length; j++) {
            if (mat[i][j] !== mat[j][i]) return false
        }
    }

    return true
}


// Returns a boolean based on the mat's shape.
function isSquareMat(mat) {
    for (var i = 0; i < mat.length; i++) {
        return (mat.length === mat[i].length) // checks if the number of rows matches the number of columns
    }
}


// Returns a square matrix (5x5 by default).
function createSquareMat(rowsColsCount = 5) {
    var mat = [];

    for (var i = 0; i < rowsColsCount; i++) {
        mat[i] = [];
        for (var j = 0; j < rowsColsCount; j++) {
            mat[i][j] = { row: i, col: j } // insert the element you want in every cell (int/str/obj...)
        }
    }

    return mat;
}


// Returns a matrix (5x3 by default).
function createMat(rowsCount = 5, colsCount = 3) {
    var mat = [];
    for (var i = 0; i < rowsCount; i++) {
        mat[i] = [];
        for (var j = 0; j < colsCount; j++) {
            mat[i][j] = { row: i, col: j } // insert the element you want in every cell (int/str/obj...)
        }
    }
    return mat;
}


// Returns a random string containing of 6 letters and numbers that represent a hexadecimal code for a color.
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}


// Returns a random integer between the min - max range (maximum is inclusive).
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


// Returns a random integer between the min - max range (maximum is exclusive).
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

//  Returns a random empty cell from a board based on a condition that identifies what a random cell actually is.
function getEmptyCell(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (!currCell.gameElement && currCell.type === FLOOR) {
                var emptyCellPos = { i, j };
                emptyCells.push(emptyCellPos)
            }
        }
    }
    var randomIdx = getRandomInt(0, emptyCells.length)
    var emptyCell = emptyCells[randomIdx];
    return emptyCell
}
//////////////////////////////////////////////////////////////
///////////////////////// GAMES /////////////////////////////
////////////////////////////////////////////////////////////
// Returns a board of 10x12 with cells containing different objects with type & gameElement keys.

// Renders the board created by buildBoard().

// Move the player to a specific location
function moveTo(i, j) {
    if (gIsGlued) return       // basic conditions to get into the moving section at all.
    if (!gIsGameOn) return
    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;
    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);
    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) ||
        (jAbsDiff === 1 && iAbsDiff === 0) ||
        (iAbsDiff === gBoard.length - 1 && jAbsDiff === 0) ||          // those last 2 rows are for the passages.
        (jAbsDiff === gBoard[0].length - 1 && iAbsDiff === 0)) {
        if (targetCell.gameElement === BALL) {
            updateBallsColected();
            playSound();
            checkGameOver();
        } else if (targetCell.gameElement === GLUE) {
            gIsGlued = true;
            setTimeout(function () {
                gIsGlued = false;
                renderCell(gGamerPos, GAMER_IMG)
            }, 3000);
        }
        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');
        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        if (gIsGlued) renderCell(gGamerPos, GLUED_GAMER_IMG);
        else renderCell(gGamerPos, GAMER_IMG);
    } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}
// Move the player by keyboard arrows. ** in the html we'll put onkeyup="handleKey(event)" on the body element.
function handleKey(event) {
    var i = gGamerPos.i;
    var j = gGamerPos.j;
    switch (event.key) {
        case 'ArrowLeft':
            if (j === 0) moveTo(i, gBoard[0].length - 1);
            else moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            if (j === gBoard[0].length - 1) moveTo(i, 0);
            else moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            if (i === 0) moveTo(gBoard.length - 1, j);
            else moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            if (i === gBoard.length - 1) moveTo(0, j);
            else moveTo(i + 1, j);
            break;
    }
}
// Returns a random empty cell from a board based on a condition that identifies what a random cell actually is.
function getEmptyCell(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (!currCell.gameElement && currCell.type === FLOOR) {
                var emptyCellPos = { i, j };
                emptyCells.push(emptyCellPos)
            }
        }
    }
    var randomIdx = getRandomInt(0, emptyCells.length)
    var emptyCell = emptyCells[randomIdx];
    return emptyCell
}
// Returns the class name for a specific cell. location = object like this { i: number, j: number }.
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}
// Convert a location object {i, j} to a selector and render a value in that element.
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}
// Returns the element by converting the location on the board to a cellClass string and turning it into a selector.
function getElement(location) { // location looks like : { i: i, j: j }
    var cellClass = 'cell' + location.i + '-' + location.j;  // might vary depends on how our cell classes defined in our render.
    var cellSelector = '.' + cellClass;
    var elCell = document.querySelector(cellSelector);
    return elCell;
}
//////////////////////////////////////////////////////////////
///////////////////////// SOUNDS ////////////////////////////
////////////////////////////////////////////////////////////
// Plays a sound once when called.
function playSound() {
    var audio = new Audio('sounds/Ball Collected.wav'); // type the right file destination+name.
    audio.play();
}


// Returns a matrix (5x3 by default).
function createMat(rowsCount = 5, colsCount = 3) {
    var mat = [];
    for (var i = 0; i < rowsCount; i++) {
        mat[i] = [];
        for (var j = 0; j < colsCount; j++) {
            mat[i][j] = { row: i, col: j } // insert the element you want in every cell (int/str/obj...)
        }
    }
    return mat;
}