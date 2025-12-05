import {useEffect, useState} from 'react'
import styles from "../styles/LightsOn.module.css"

export default function Dashboard() {
    const [lights, setLights] = useState([])
    const [winState, setWinState] = useState(false)
    const [moves, setMoves] = useState(0)

    useEffect(() => {
        startGame();
    }, []);

    const startGame = () => {
        setWinState(false)
        setMoves(0)
        const newLights = []
        for (let i = 0; i < 25; i++) {
            const value = Math.round(Math.random());
            if (value) {
                newLights[i] = true;
            } else {
                newLights[i] = false;
            }
        }

        setLights(newLights)
    }

    const checkState = (newLights) => {
        for (let i = 0; i < newLights.length; i++) {
            if (!newLights[i]) {
                return;
            }
        }

        setWinState(true)
    }

    const handleToggle = (index) => {
        const newLights = [...lights];

        const row = Math.floor(index / 5);
        const col = index % 5;

        newLights[index] = !newLights[index];

        if (col > 0) {
            newLights[index - 1] = !newLights[index - 1];
        }

        if (col < 4) {
            newLights[index + 1] = !newLights[index + 1];
        }

        if (row > 0) {
            newLights[index - 5] = !newLights[index - 5];
        }

        if (row < 4) {
            newLights[index + 5] = !newLights[index + 5];
        }


        checkState(newLights)
        const totalMoves = moves + 1
        setMoves(totalMoves)
        setLights(newLights);
    };

    return (

        <div className={styles.container}>
            <div className={styles.messageLine}>
                <h1 className={styles.gameName}>Lights On!</h1>
                <p className={styles.instructions}>Turn On all the lights to win!</p>
                <p className={styles.moves}>Moves Made: {moves}</p>
            </div>
            <div className={styles.gridContainer}>
                {lights.map((value, index) => (
                    <div key={index} className={styles.grid}>
                        {value ? (
                            <div className={styles.lightOn} onClick={() => handleToggle(index)}></div>
                        ) : (
                            <div className={styles.lightOff} onClick={() => handleToggle(index)}></div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.buttons}>
                <button className={styles.resetButton} onClick={() => startGame()} >Reset</button>
            </div>

            {winState && (
                <div className={styles.popupOverlay}>
                    <div className={styles.popupBox}>
                        <h2>You Win!</h2>
                        <p>You solved it in {moves} moves 🎉</p>
                        <button onClick={startGame}>Play Again</button>
                    </div>
                </div>
            )}

        </div>
    );
}