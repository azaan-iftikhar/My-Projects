const COLS = 9;
const ROWS = 9;
const MINES = 10;

const boardElement = document.getElementById('game-board');
const mineCounterElement = document.getElementById('mine-counter');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

let board = [];
let mines = [];
let flags = 0;
let revealedCount = 0;
let gameOver = false;
let timer = 0;
let timerInterval = null;
let firstClick = true;

const ICONS = {
    mine: '🕳️',
    flag: '⚠️',
    crystal: '💎'
};

function initGame() {
    board = [];
    mines = [];
    flags = 0;
    revealedCount = 0;
    gameOver = false;
    timer = 0;
    firstClick = true;
    
    clearInterval(timerInterval);
    updateDisplay(mineCounterElement, MINES);
    updateDisplay(timerElement, 0);
    resetButton.textContent = '🙂';
    
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 24px)`;
    
    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLS; c++) {
            const cell = {
                r, c,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0,
                element: document.createElement('div')
            };
            
            cell.element.classList.add('cell');
            
            cell.element.addEventListener('mousedown', (e) => handleMouseDown(e, cell));
            cell.element.addEventListener('mouseup', (e) => handleMouseUp(e, cell));
            cell.element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(cell);
            });
            
            boardElement.appendChild(cell.element);
            row.push(cell);
        }
        board.push(row);
    }
}

function plantMines(firstClickCell) {
    let planted = 0;
    while (planted < MINES) {
        let r = Math.floor(Math.random() * ROWS);
        let c = Math.floor(Math.random() * COLS);
        let cell = board[r][c];
        
        // Prevent mine on first click
        if (!cell.isMine && cell !== firstClickCell) {
            cell.isMine = true;
            mines.push(cell);
            planted++;
        }
    }
    calculateNeighbors();
}

function calculateNeighbors() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c].isMine) continue;
            
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    let nr = r + dr;
                    let nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        if (board[nr][nc].isMine) count++;
                    }
                }
            }
            board[r][c].neighborMines = count;
        }
    }
}

function handleMouseDown(e, cell) {
    if (gameOver) return;
    if (e.button === 0 && !cell.isRevealed && !cell.isFlagged) {
        resetButton.textContent = '😮';
        cell.element.style.borderStyle = 'inset';
    }
}

function handleMouseUp(e, cell) {
    if (gameOver) return;
    resetButton.textContent = '🙂';
    if (e.button === 0 && !cell.isFlagged) {
        revealCell(cell);
    }
}

function toggleFlag(cell) {
    if (gameOver || cell.isRevealed) return;
    
    if (cell.isFlagged) {
        cell.isFlagged = false;
        cell.element.textContent = '';
        flags--;
    } else {
        if (flags < MINES) {
            cell.isFlagged = true;
            cell.element.textContent = ICONS.flag;
            flags++;
        }
    }
    updateDisplay(mineCounterElement, MINES - flags);
}

function revealCell(cell) {
    if (cell.isRevealed || cell.isFlagged || gameOver) return;
    
    if (firstClick) {
        firstClick = false;
        plantMines(cell);
        startTimer();
    }
    
    cell.isRevealed = true;
    cell.element.classList.add('revealed');
    cell.element.style.borderStyle = ''; 
    revealedCount++;
    
    if (cell.isMine) {
        handleLoss(cell);
        return;
    }
    
    if (cell.neighborMines > 0) {
        cell.element.textContent = cell.neighborMines;
        cell.element.classList.add(`num-${cell.neighborMines}`);
    } else {
        cell.element.textContent = ICONS.crystal;
        
        // Recursive reveal
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = cell.r + dr;
                let nc = cell.c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                    revealCell(board[nr][nc]);
                }
            }
        }
    }
    
    checkWin();
}

function handleLoss(clickedMine) {
    gameOver = true;
    clearInterval(timerInterval);
    resetButton.textContent = '😵';
    
    mines.forEach(mine => {
        if (!mine.isFlagged) {
            mine.element.classList.add('revealed');
            mine.element.textContent = ICONS.mine;
        }
    });
    
    clickedMine.element.classList.add('mine'); 
    
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            let cell = board[r][c];
            if (cell.isFlagged && !cell.isMine) {
                cell.element.textContent = '❌'; 
            }
        }
    }
}

function checkWin() {
    if (revealedCount === (ROWS * COLS) - MINES) {
        gameOver = true;
        clearInterval(timerInterval);
        resetButton.textContent = '😎';
        
        mines.forEach(mine => {
            if (!mine.isFlagged) {
                mine.isFlagged = true;
                mine.element.textContent = ICONS.flag;
                flags++;
            }
        });
        updateDisplay(mineCounterElement, 0);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        if (timer > 999) timer = 999;
        updateDisplay(timerElement, timer);
    }, 1000);
}

function updateDisplay(element, value) {
    let str = value.toString();
    if (value < 0) {
        str = '-' + Math.abs(value).toString().padStart(2, '0');
    } else {
        str = str.padStart(3, '0');
    }
    element.textContent = str;
}

resetButton.addEventListener('click', initGame);

initGame();
