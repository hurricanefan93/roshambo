if (process.env.NODE_ENV !== 'production') require('./index.html')
import './styles/screen.scss'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

let playerScore = 0
let computerScore = 0

const handleButtonClick = (event) => {
  const player = event.target.className
  const computer = getComputerMove()
  $('figure.player img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${player}.svg`
  $('figure.computer img').src = `https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/${computer}.svg`

  if (player === 'rock') {
    if (computer === 'scissors') {
      playerScore++
    } else if (computer === 'paper') {
      computerScore++
    }
  }
  if (player === 'paper') {
    if (computer === 'rock') {
      playerScore++
    } else if (computer === 'scissors') {
      computerScore++
    }
  }
  if (player === 'scissors') {
    if (computer === 'paper') {
      playerScore++
    } else if (computer === 'rock') {
      computerScore++
    }
  }

  $('span.player').textContent = playerScore
  $('span.computer').textContent = computerScore
  if (playerScore === 3) {
    gameOver(true)
  } if (computerScore === 3) {
    gameOver(false)
  }
}

const getComputerMove = () => {
  const moves = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}

const gameOver = (playerDidWin) => {
  if (playerDidWin) {
    $('.dialog h3').textContent = 'You won!'
  } else {
    $('.dialog h3').textContent = 'You lost!'
  }
  setTimeout(() => {
    if (gameOver) {
      $('body').className = 'modal'
    }
  }, 200)
}

const resetGame = () => {
  $('figure.player img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('figure.computer img').src = 'https://tiy-tpa-fee.github.io/roshambo/starter-kit/images/unknown.svg'
  $('body').className = ''
  playerScore = 0
  computerScore = 0
  $('span.player').textContent = playerScore
  $('span.computer').textContent = computerScore
}

const main = () => {
  const buttons = $$('.player-input button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
  $('.dialog button').addEventListener('click', resetGame)
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
