'use strict';
const MINE = '💣'
const FLAG = '🚩'

var gBoard = [];
var gTimerInterval = null;

var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1
}


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secPassed: 0,
    isOver: false,
    livesCount: 1
}



function initGame() {
    gBoard = buildBoard();
    var elSmiley = document.querySelector('.restart')
    elSmiley.innerHTML = '😶'
    gGame.isOn = false;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secPassed = 0;
    gGame.isOver = false
    gGame.livesCount = gLevel.LIVES
    gTimerInterval = null;
    var elLives = document.querySelector('.lives span')
    elLives.innerHTML = gGame.livesCount;

    renderBoard(gBoard);
}


function setTimer() {
    gTimerInterval = setInterval(function () {
        gGame.secPassed++;
        var elTimer = document.querySelector('h2 span');
        elTimer.innerHTML = gGame.secPassed;
    }, 1000);

}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesARoundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }



    return board;
}



function initBoard(board, notMineI, notMineJ) {
    addMines(board, notMineI, notMineJ);
    renderBoard(board)
}

function addMines(board, cellI, cellJ) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var emptyCell = getRandomEmptyCell(board, cellI, cellJ)
        board[emptyCell.i][emptyCell.j].isMine = true
    }
    addNumbers(board);
}

// function addMines(board, gLevel, notMineI, notMineJ) {
//     for (var m = 0; m < gLevel.MINES; m++) {
//         var mineI = getRandomIntInclusive(0, gLevel.SIZE - 1)
//         var mineJ = getRandomIntInclusive(0, gLevel.SIZE - 1)
//         if (notMineI === mineI && notMineJ === mineJ) {
//             m--
//             continue
//         }
//         board[mineI][mineJ].isMine = true
//     }
//     addNumbers(board);
// }

function addNumbers(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            if (currCell.isMine)
                continue
            var minesNegsCount = SetMinesNegsCount(board, i, j, true)
            board[i][j].minesARoundCount = minesNegsCount;

        }
    }
}

function SetMinesNegsCount(board, cellI, cellJ, neg) {
    var minesNegsCount = 0;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine === neg) minesNegsCount++;
        }
    }
    return minesNegsCount;
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var className = getClassName({ i, j });
            strHTML += `<td class="cell ${className} hidden"
            onclick="cellClicked(this,${i},${j})" 
            oncontextmenu="cellMarked(this,${i},${j},event)" >`;
            if (board[i][j].isMine) {
                strHTML += MINE;
            } else if (board[i][j].minesARoundCount) {
                strHTML += board[i][j].minesARoundCount;
            } else {
                strHTML += ' ';
            }

            strHTML += '</td>';
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;

}



function cellClicked(elCell, cellI, cellJ) {
    if (gGame.isOver) return
    if (!gGame.isOn) {
        initBoard(gBoard, cellI, cellJ);
        gGame.isOn = true;
        setTimer();
        var elFirstCell = document.querySelector('.' + getClassName({ i: cellI, j: cellJ }));
        elFirstCell.classList.remove('hidden');
    }
    var currCell = gBoard[cellI][cellJ]
    if (!currCell.isMine && !currCell.isShown) {
        // Model :
        currCell.isShown = true;
        gGame.shownCount++;
        // console.log('showCount++', gGame.shownCount);
        // DOM :
    }

    if (currCell.isMine) {
        currCell.isShown = true;
        gGame.markedCount++
        elCell.classList.remove('hidden');
        gGame.livesCount--;
        var elLife = document.querySelector('.lives span')
        elLife.innerHTML = gGame.livesCount;

        checkGameOver();
        return

    }
    // console.log('gGameShowCount', gGame.shownCount);
    expandShown(gBoard, cellI, cellJ)
    elCell.classList.remove('hidden');
    checkGameOver();

}

function cellMarked(elCell, cellI, cellJ, ev) {
    ev.preventDefault();
    var currCell = gBoard[cellI][cellJ]
    // console.log('marked');
    if (currCell.isShown)
        return;
    elCell.classList.toggle('hidden');
    if (currCell.isMarked) {
        if (currCell.isMine) {
            elCell.innerText = MINE;
        } else if (currCell.minesARoundCount) {
            elCell.innerText = currCell.minesARoundCount;
        } else {
            elCell.innerText = ' ';
        }

        gGame.markedCount--;
    } else {
        elCell.innerText = FLAG;
        gGame.markedCount++;
        // console.log('marked', gGame.markedCount)
    }

    currCell.isMarked = !currCell.isMarked;
    console.log(gGame.markedCount);
    checkGameOver();

    // console.log('gGame.markCount ', gGame.markedCount)
}


function checkGameOver() {
    var elSmiley = document.querySelector('.restart')
    var elH3 = document.querySelector('h3 span')
    if (gGame.markedCount === gLevel.MINES && gGame.shownCount + gGame.markedCount === gLevel.SIZE ** 2) {
        elH3.innerHTML = 'you win!';
        elSmiley.innerHTML = '😎'
        clearInterval(gTimerInterval);
        gGame.isOver = true;
        return
    }
    if (gGame.livesCount === 0) {
        showMines();
        elH3.innerHTML = 'you lose!';
        elSmiley.innerHTML = '🤯'
        gGame.isOver = true;
        clearInterval(gTimerInterval)
    }
}

function getNeighbors(board, cellI, cellJ) {
    var neighbors = [];
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1)
            continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1)
                continue;
            // if (i === cellI && j === cellJ)
            //     continue;
            neighbors.push({ i, j })
        }
    }
    return neighbors
}

function expandShown(board, i, j) {
    if (board[i][j].minesARoundCount // || 
        //board[i][j].isShown
    )
        return;
    var negs = getNeighbors(board, i, j);
    for (var idx = 0; idx < negs.length; idx++) {
        var nb = negs[idx]
        if (board[nb.i][nb.j].isShown) continue;
        board[nb.i][nb.j].isShown = true;
        gGame.shownCount++;
        var elCurrCell = document.querySelector('.' + getClassName(nb))
        elCurrCell.classList.remove('hidden');
    }


}


function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function restart() {
    clearInterval(gTimerInterval)
    var elH2 = document.querySelector('h2 span')
    elH2.innerHTML = '0';
    var elH3 = document.querySelector('h3 span')
    elH3.innerHTML = ' ';
    initGame()

    // var elbtn = document.querySelector('button');
    // elbtn.style.display = 'none';

}

function getRandomEmptyCell(board, cellI, cellJ) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine) continue;
            var emptyCellPos = { i, j };
            emptyCells.push(emptyCellPos)
        }
    }
    var randomIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    var emptyCell = emptyCells[randomIdx];
    return emptyCell
}


function changeLevel(size, mine, lifes) {
    clearInterval(gTimerInterval)
    var elLives = document.querySelector('.lives span')
    elLives.innerHTML = lifes
    gLevel = {
        SIZE: size,
        MINES: mine,
        LIVES: lifes

    }
    initGame()
}

function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isShown = true;
                var className = getClassName({ i, j })
                var elCell = document.querySelector(`.${className}`)
                elCell.classList.remove('hidden')
            }
        }
    }
}

