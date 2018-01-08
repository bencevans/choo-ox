module.exports = store

const INIT_PLAYER = 1
const INIT_WINNER = 0
const INIT_MATRIX = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
]

function store (state, emitter) {

  state.player = INIT_PLAYER
  // 1 = x
  // 2 = o

  state.matrix = INIT_MATRIX.slice()
  // [0] = untaken
  // [1] = x's
  // [2] = o's

  state.winner = INIT_WINNER
  // 0 = no winner
  // 1 = x winner
  // 2 = o winner

  emitter.on('DOMContentLoaded', function () {
    emitter.on('game:reset', function () {
      state.player = 1
      state.matrix = INIT_MATRIX.slice()
      state.winner = 0
      emitter.emit(state.events.RENDER)
    })

    emitter.on('game:take', function (location) {
      // ignore attempts to ...
      if (
        state.matrix[location] !== 0 || // overwrite taken positions
        state.winner !== 0 // game already won
      ) {
        return
      }

      // update position in matrix
      state.matrix[location] = state.player

      // check for horizontal lines
      var m = state.matrix

      for (let i = 0; i < 9; i+=3) {
        if (m[i] !== 0 && m[i] === m[i + 1] && m[i + 1] === m[i + 2]) {
          console.log(`vt: ${m[i]} ${m[i + 3]} ${m[i + 6]}`)
          state.winner = m[i]
        }
      }

      // check for vertical lines
      for (let i = 0; i < 3; i++) {
        if (m[i] !== 0 && m[i] === m[i + 3] && m[i + 3] === m[i + 6]) {
          console.log(`hz: ${m[i]} ${m[i + 3]} ${m[i + 6]}`)
          state.winner = m[i]
        }
      }

      // check diagonal
      if (m[0] !== 0 && m[0] === m[4] && m[4] === m[8]) {
        console.log('up')
        state.winner = m[0]
      } else if (m[2] !== 0 && m[2] === m[4] && m[4] === m[6]) {
        console.log('dn')
        state.winner = m[2]
      }

      // check spaces left
      state.finished = true
      for (let i = 0; i < state.matrix.length; i++) {
        if (state.matrix[i] === 0) state.finished = false
      }

      // check if finished by win
      if (state.winner !== 0) {
        state.finished = true
      }

      // switch players
      state.player = state.player === 1 ? 2 : 1

      emitter.emit(state.events.RENDER)
    })
  })
}
