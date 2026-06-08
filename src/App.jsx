import { useState, useMemo } from 'react'

function App() {
  const [player, setPlayer] = useState('X')
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const CalculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const winner = useMemo(() => CalculateWinner(board.flat()), [board])

  const MakeMove = (x, y) => {
    if (winner) return
    if (board[x][y] !== '') return

    const newBoard = [...board]
    newBoard[x][y] = player || 'X'
    setBoard(newBoard)
    setPlayer(player === 'X' ? 'O' : 'X')
  }

  const ResetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])
    setPlayer('X')
  }

  return (
    <>
      <main className='pt-8 text-center dark:bg-gray-800 min-h-screen dark:text-white'>
        <h1 className='mb-8 text-3xl font-bold uppercase'>Tic Tac Toe</h1>
        <h3 className='text-xl mb-4'>Player {player}'s turn</h3>
        <div className='flex flex-col items-center mb-8'>
          {board.map((row, x) => (
            <div key={x} className='flex'>
              {row.map((cell, y) => (
                <div
                  key={y}
                  onClick={() => MakeMove(x, y)}
                  className='border border-white w-20 h-20 hover:bg-gray-700 flex items-center justify-center cursor-pointer'
                >
                  <span className='material-icons-outlined text-4xl'>
                    {cell === 'X' ? 'close' : cell === 'O' ? 'circle' : ''}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {winner !== null && (
          <h2 className='text-6xl font-bold mb-8'>Player {winner} wins!</h2>
        )}

        <button
          onClick={ResetGame}
          className='px-4 py-2 bg-pink-500 rounded uppercase font-bold hover:bg-pink-600 duration-300 cursor-pointer'
        >
          Reset Game
        </button>
      </main>
    </>
  )
}

export default App
