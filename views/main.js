var html = require('choo/html')

var TITLE = 'ox'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  function numToLetter (num) {
    switch (num) {
      case 1:
        return 'x'
      case 2:
        return 'o'
      default:
        return ''
    }
  }

  return html`
    <body class="sans-serif">
      <style>
        td {
          width: 128px;
          height: 128px;
          background-color: #eee;
          text-align: center;
        }
      </style>

      <h1 class="pa3 pa4-ns">
        ox: <span class="hot-pink">${generateStatusMessage()}</span>
      </h1>

      <table style="margin-left:32px;">
        <tr>
          <td loc=${0} onclick=${handleTakeClick}>${numToLetter(state.matrix[0])}</td>
          <td loc=${1} onclick=${handleTakeClick}>${numToLetter(state.matrix[1])}</td>
          <td loc=${2} onclick=${handleTakeClick}>${numToLetter(state.matrix[2])}></td>
        </tr>
        <tr>
          <td loc=${3} onclick=${handleTakeClick}>${numToLetter(state.matrix[3])}></td>
          <td loc=${4} onclick=${handleTakeClick}>${numToLetter(state.matrix[4])}></td>
          <td loc=${5} onclick=${handleTakeClick}>${numToLetter(state.matrix[5])}></td>
        </tr>
        <tr>
          <td loc=${6} onclick=${handleTakeClick}>${numToLetter(state.matrix[6])}></td>
          <td loc=${7} onclick=${handleTakeClick}>${numToLetter(state.matrix[7])}></td>
          <td loc=${8} onclick=${handleTakeClick}>${numToLetter(state.matrix[8])}></td>
        </tr>
      </table>

      <div class="ph3 ph4-ns" style="margin-top:64px;">
        <button class="f5 dim br-pill ph3 pv2 mb2 dib white bg-hot-pink bn pointer" onclick=${handleResetClick}>Reset</button>
      </div>
    </body>
  `

  function generateStatusMessage () {
    if (state.winner !== 0) {
      return `${numToLetter(state.winner)} wins!`
    }
    return `player ${numToLetter(state.player)}'s go`
  }

  function handleTakeClick () {
    console.log(this)
    emit('game:take', parseInt(this.attributes.loc.value, 10))
  }

  function handleResetClick () {
    emit('game:reset')
  }
}
