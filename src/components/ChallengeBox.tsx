import { useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox() {
    const { activeChallenge, resetChanllenge, completeChallenge } = useContext(ChallengesContext)
    const {resetCountDown} = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountDown();
    }

    function handleChallengeFailed(){
        resetChanllenge();
        resetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganha {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg `} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type="button" onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton}>Completei</button>
                        <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}>Falhei</button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um clico para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level up" />
                                Avance de level completando desafios
                        </p>
                    </div>
                )}
        </div>
    )
}