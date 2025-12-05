import { useEffect, useState } from 'react'
import styles from "../styles/TTT.module.css"

export default function TTT() {
    const [turn, setTurn] = useState("")
    const [winState, setWinState] = useState(false)
    const [winner, setWinner] = useState("")
    const [gameState, setGameState] = useState([])
    const [winningLine, setWinningLine] = useState([])

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    useEffect(() => {
        startGame();
    }, []);

    const startGame = () => {
        let emptyState = ["", "", "", "", "", "", "", "", ""];
        setGameState(emptyState)
        setWinState(false)
        setWinner("")
        setWinningLine([])
        setTurn("X")
    }

    const checkState = (newGameState) => {
        for (const [a, b, c] of winningLines) {
            if (
                newGameState[a] &&
                newGameState[a] === newGameState[b] &&
                newGameState[a] === newGameState[c]
            ) {
                setWinState(true)
                setWinner(newGameState[a])

               const wins = Number(localStorage.getItem(newGameState[a])) + 1
               console.log(wins)
               localStorage.setItem(newGameState[a], wins)

                setWinningLine([a, b, c])
                return
            }
        }
    }

    const fillCell = (index) => {
        const newGameState = [...gameState]
        if (newGameState[index] === "" && !winState) {
            newGameState[index] = turn;

            if (turn === "X") {
                setTurn("O")
            } else {
                setTurn("X")
            }
            setGameState(newGameState)
            checkState(newGameState)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageLine}>
                <h1 className={styles.gameName}>Tic-Tac-Toe</h1>
                <p className={styles.instructions}>Player {turn} Turn</p>
            </div>

            <div className={styles.gridContainer}>
                {gameState.map((value, index) => (
                    value === "" && !winState ? (
                        <div
                            key={index}
                            className={
                                winState && winningLine.includes(index)
                                    ? styles.winningSquare
                                    : styles.gridSquare
                            }
                            onClick={() => fillCell(index)}
                        >
                            {value}
                        </div>
                    ) : (
                        <div
                            key={index}
                            className={
                                winState && winningLine.includes(index)
                                    ? styles.winningSquare
                                    : styles.gridSquare
                            }
                        >
                            {value}
                        </div>
                    )

                ))}
            </div>

                <div className={styles.winContainer}>
                    {winState && (
                        <div className={styles.winLine}>
                            <h3>Player {winner} Wins!</h3>
                        </div>
                    )}

                    <div className={styles.winsTracker}>
                        <p className={styles.winCount}>Player X Wins: {localStorage.getItem("X")}</p>
                        <p className={styles.winCount}>Player O Wins: {localStorage.getItem("O")}</p>
                    </div>
                </div>

                <button className={styles.reset} onClick={() => startGame()}>Reset</button>
        </div>
    )
}
