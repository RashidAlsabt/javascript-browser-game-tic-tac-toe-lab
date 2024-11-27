//1) Define the required variables used to track the state of the game.
let board = ['', '', '', '', '', '', '', '', '']
let turn = "X"
let winner = false
let tie = false

//2) Store cached element references.
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')

console.log(squareEls)
console.log(messageEl)

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.



//4) The state of the game should be rendered to the user.

const updateBoard = (board, squareEls) => {
    board.forEach((element, index) => {
        const box = squareEls[index]
        box.textContent = element

        if (element === "X") {
            box.style.color = 'blue'
        } else if (element === 'O') {
            box.style.color = 'green'
        } else {
            box.style.color = 'black'
        }
    })
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `It's ${turn}'s turn`
    } else if (winner === false && tie === true) {
        messageEl.textContent = "The game has been tied"
    } else {
        messageEl.textContent = `${turn} is the winner`
    }
}
const render = () => {
    updateBoard(board, squareEls)
    updateMessage()
}

const init = () => {
    board = ['', '', '', '', '', '', '', '', '']
    turn = "X"
    winner = false
    tie = false
    render()
}
init()
//5) Define the required constants.
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const placePiece = (index) => {
    board[index] = turn
    console.log(board)
}

const checkForWinner = () => {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true
        }
    })
    console.log(winner)
}
const checkForTie = () => {
    if (winner === false && board.includes('') === false) {
        tie = true
    }
}

const switchPlayerTurn = () => {
    if (winner === false) {
        if (turn === "X") {
            turn = "O"
        } else {
            turn = "X"
        }
    }
}





//6) Handle a player clicking a square with a `handleClick` function.
const handleClick = (event) => {
    const squareIndex = parseInt(event.target.id)

    if (board[squareIndex] || winner) return
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    render()
}

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
})




//7) Create Reset functionality.
const resetBtnEl = document.querySelector('#reset')
resetBtnEl.addEventListener('click', init)