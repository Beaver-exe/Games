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
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)

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
                    shuffledCards[index] = {image: images[i], revealed: false};
                    j++;
                }
            }
        }
        setCards(shuffledCards)
    }

    const checkState = (newCards) => {
        const allRevealed = newCards.every(card => card.revealed)
        if (allRevealed) {
            setTimeout(() => {
                alert("Congratulations! You've matched all the cards!")
                startGame()
            }, 500)
        }
    }

    const checkPair = (newCards) => {
        if (firstCard !== null && secondCard !== null) {
            if (newCards[firstCard].image === newCards[secondCard].image) {
                setFirstCard(null)
                setSecondCard(null)
            } else {
                setTimeout(() => {
                    newCards[firstCard].revealed = false
                    newCards[secondCard].revealed = false
                    setCards(newCards)
                    setFirstCard(null)
                    setSecondCard(null)
                }, 1000)
            }
        }
    }

    const handleCardClick = (index) => {
        const newCards = [...cards]
        if (firstCard === null) {
            newCards[index].revealed = true
            setCards(newCards)
            setFirstCard(index)
        } else if (secondCard === null && index !== firstCard) {
            newCards[index].revealed = true
            setCards(newCards)
            setSecondCard(index)
        }

        checkPair(newCards)
        checkState(newCards)
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
                        <div key={index} className={styles.card} onClick={() => handleCardClick(index)} ></div>
                    )
                ))}
            </div>
        </div>
    )
}