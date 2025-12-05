import { useState, useEffect } from "react"
import { useElapsedTime } from 'use-elapsed-time'
import styles from "../styles/Reflex.module.css"

export default function Reflex() {
    const [word, setWord] = useState("")
    const [winState, setWinState] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const { elapsedTime, reset } = useElapsedTime({isPlaying})


    const words = [
        "batman",
        "bruce",
        "superman",
        "clark",
        "kansas",
        "wayward",
        "maneater"
    ]

    useEffect(() => {
        startGame();
    }, []);


    const startGame = () => {
        setInputValue("")
        setWinState(false)
        const number = Math.floor(Math.random() * words.length)
        reset(0)
        setIsPlaying(true)
        setWord(words[number])
    }

    const checkInput = (input) => {
        if (input === word) {
            setIsPlaying(false)
            setWinState(true)
        }

        if (input.length >= word.length) {
            setInputValue("");
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.messageLine}>
                <h1 className={styles.gameName}>Reflex!</h1>
                <p className={styles.instructions}>Enter the following word as fast as possible</p>
                <h2 className={styles.word}>{word}</h2>
            </div>

            <div className={styles.inputContainer}>
                <input className={styles.input} autoFocus value={inputValue} type="text" onChange={(e) => {setInputValue(e.target.value), checkInput(e.target.value)}}></input>
                <button className={styles.reset} onClick={() => startGame()}>Reset</button>
                <p className={styles.timer}>Elapsed Time: {elapsedTime.toFixed(2)}</p>
            </div>

            
            {winState && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupBox}>
                        <h2>You Win!</h2>
                        <p>Elapsed Time: {elapsedTime.toFixed(2)}'</p>
                        <button onClick={startGame}>Play Again</button>
                    </div>
                </div>
            )}

        </div>
    )
}