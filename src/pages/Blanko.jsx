import { useEffect, useState } from 'react';
import styles from '../styles/Blanko.module.css'

export default function Blanko() {
    const [splitStr, setSplitStr] = useState([])
    const [removedIndexs, setRemovedIndex] = useState([])
    const [first, setFirst] = useState({id: 0, index: "", value: ""})
    const [second, setSecond] = useState({id: 1, index: "", value: ""})
    const [third, setThird] = useState({id: 2, index: "", value: ""})

    const strs = [
        'the fat cats',
        'larger frogs',
        'banana cakes',
        'unsw vs usyd',
        'french toast',
        'hawaii pizza',
        'barack obama',
    ];

    useEffect(() => {
        startGame()
    }, [])


    const startGame = () => {
        setFirst({id: 0, index: "", value: ""})
        setSecond({id: 1, index: "", value: ""})
        setThird({id: 2, index: "", value: ""})
        setRemovedIndex([])

        const randomDecimal = Math.random();
        const randomNumber = Math.floor(randomDecimal * 7);

        const str = strs[randomNumber];
        const splitStr = str.split('');
        setSplitStr(splitStr);

        let removedCount = 0
        while (removedCount < 3) {
            const randomDecimal = Math.random()
            const randomNumber = Math.floor(randomDecimal * 12);

            if (splitStr[randomNumber] !== ' ' && !removedIndexs.includes(randomNumber)) {
                removedIndexs[removedCount] = randomNumber;
                removedCount++;
            }

        }

        setRemovedIndex(removedIndexs)
        setFirst({ id: 0, index: removedIndexs[0], value: "" });
        setSecond({ id: 1, index: removedIndexs[1], value: "" });
        setThird({ id: 2, index: removedIndexs[2], value: "" });

    }


    const handleInput = (value, index) => {

        let nextFirst = first;
        let nextSecond = second;
        let nextThird = third;

        if (removedIndexs[0] === index) {
            nextFirst = { id: 0, index, value };
            setFirst(nextFirst);
        } else if (removedIndexs[1] === index) {
            nextSecond = { id: 1, index, value };
            setSecond(nextSecond);
        } else if (removedIndexs[2] === index) {
            nextThird = { id: 2, index, value };
            setThird(nextThird);
        }

        const checkFirst = splitStr[removedIndexs[0]];
        const checkSecond = splitStr[removedIndexs[1]];
        const checkThird = splitStr[removedIndexs[2]];

        if (
            checkFirst === nextFirst.value &&
            checkSecond === nextSecond.value &&
            checkThird === nextThird.value
        ) {
            alert("Correct!");
            let gamesWon = Number(localStorage.getItem("gamesWon"));
            gamesWon += 1;
            localStorage.setItem("gamesWon", gamesWon)
            startGame()
        }
    };

    return (
    <div className={styles.container}>
        <div className={styles.boxRow}>
        {splitStr.map((item, index) => (
            <div key={index} className={styles.squareContainer}>
            {removedIndexs.includes(index) ? (
                <input
                className={styles.answerInput}
                type="text"
                maxLength={1}
                onChange={(e) => handleInput(e.target.value, index)}
                />
            ) : (
                <p className={styles.text}>{item}</p>
            )}
            </div>
        ))}
        </div>

        <div className={styles.resetContainer}>
        <button
            className={styles.resetButton}
            onClick={() => startGame()}
        >
            Reset Game
        </button>
        </div>
    </div>
    );
}