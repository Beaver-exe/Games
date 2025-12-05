import { useEffect, useState } from 'react'
import styles from '../styles/Dashboard.module.css'

export default function dashboard () {
    const [gamesWon, setGamesWon] = useState(0)

    useEffect(() => {
        getGamesWon()
    }, [])


    const getGamesWon = async () => {
        const gamesWon = localStorage.getItem("gamesWon");
        console.log(gamesWon)

        if (gamesWon === null) {
            
            try {
                const response = await fetch(
                    'https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json',
                );

                const data = await response.json();
                localStorage.setItem("gamesWon", data.score)
                setGamesWon(data.score)

            } catch (err) {
                console.log(err)
            }
        } else {
            setGamesWon(gamesWon)
        }
    }

    const handleReset = () => {
        localStorage.removeItem("gamesWon")
        getGamesWon()
    }

    return (
        <div className={styles.container}>
            <div className={styles.winsLine}>
                <p className={styles.heading}>Please choose an option from the navbar.</p>
                <p className={styles.counter}>Games won: {gamesWon}
                    <button className={styles.resetButton} onClick={() => handleReset()}>(reset)</button>
                </p>
            </div>
        </div>
    )
}