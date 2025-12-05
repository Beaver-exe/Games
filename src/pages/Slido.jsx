import { useEffect, useState } from 'react'
import styles from '../styles/Slido.module.css'
import topLeft from '../assets/1.png'
import topMiddle from '../assets/2.png'
import topRight from '../assets/3.png'
import centerLeft from '../assets/4.png'
import centerMiddle from '../assets/5.png'
import centerRight from '../assets/6.png'
import bottomLeft from '../assets/7.png'
import bottomMiddle from '../assets/8.png'


export default function Slido() {
    const [shuffled, setShuffled] = useState([])
    const [solved, setSolved] = useState(false)
    const ordered = [topLeft, topMiddle, topRight, centerLeft, centerMiddle, centerRight, bottomLeft, bottomMiddle, "empty"]

    useEffect(() => {
        startGame()
    }, []);

    const startGame = () => {
        setSolved(false)
        const shuffledArray = [...ordered]
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const index = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[index]] = [shuffledArray[index], shuffledArray[i]];
        }

        setShuffled(shuffledArray)
    }


    const handleCheckSolved = (newShuffled) => {
        let isSolved = true;
        for (let i = 0; i < ordered.length; i++) {
            if (newShuffled[i] !== ordered[i]) {
                isSolved = false;
                break;
            }
        }
        return isSolved;
    }

    const handleSwap = (index) => {
        const emptyIndex = shuffled.indexOf("empty");
        const validMoves = [];

        validMoves[0] = index - 1;
        validMoves[1] = index + 1;
        validMoves[2] = index - 3;
        validMoves[3] = index + 3;

        const newShuffled = [...shuffled];

        if (validMoves.includes(emptyIndex)) {
            newShuffled[emptyIndex] = shuffled[index];
            newShuffled[index] = "empty";
        } else {
            return;
        }
        
        const isSolved = handleCheckSolved(newShuffled)

        if (isSolved) {
            alert("Correct!");
            let gamesWon = Number(localStorage.getItem("gamesWon"));
            gamesWon += 1;
            localStorage.setItem("gamesWon", gamesWon)
            setSolved(true)
            startGame()
        }
        setShuffled(newShuffled)
    }

    const handleSolve = () => {
        const newShuffled = [...ordered];
        setShuffled(newShuffled);
        setSolved(true)
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                {shuffled.map((cell, index) => (
                    <div key={cell} className={styles.gridCell}>
                        {cell !== "empty" ? (
                            <img className={styles.cellImage} src={cell} alt={cell} onClick={() => handleSwap(index)}></img>
                        ) : (
                            <div className={styles.emptyCell}> </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.resetButton} onClick={() => startGame()}>Reset</button>
                {!solved ? (
                    <button className={styles.solveButton} onClick={() => handleSolve()}>Solve</button>
                ):(
                    <button className={styles.disabledSolvedButton}>Solve</button>
                )}
            </div>
        </div>
    )
}

