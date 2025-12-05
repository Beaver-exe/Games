import { useEffect, useState } from "react"
import styles from "../styles/Memory.module.css"
import image1 from "../assets/1.png"
import image2 from "../assets/2.png"
import image3 from "../assets/3.png"
import image4 from "../assets/4.png"
import image5 from "../assets/5.png"
import image6 from "../assets/6.png"
import image7 from "../assets/7.png"
import image8 from "../assets/8.png"


export default function Memory() {
    const [cards, setCards] = useState([])

    const images = [image1, image2, image3, image4, image5, image6, image7, image8]

    useEffect(() => {
        startGame()
    }, [])

    const startGame = () => {
        const shuffledCards = []
        for (let i = 0; i < 8; i++) {
            let j = 0;
            while (j < 2) {
                const index = Math.floor(Math.random() * 16)
                if (!shuffledCards[index]) {
                    shuffledCards[index] = {image: images[i], revealed: true};
                    j++;
                }
            }
        }
        setCards(shuffledCards)
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageLine}>
                <h1 className={styles.gameName}>Memory Game</h1>
                <p className={styles.instructions}>Match All the cards to Win!</p>
            </div>

            <div className={styles.grid}>
                {cards.map((card, index) => (
                    card.revealed ? (
                        <div key={index} className={styles.card}>
                            <img src={card.image} alt="card" className={styles.cardImage} />
                        </div>
                    ) : (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardBack}></div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}