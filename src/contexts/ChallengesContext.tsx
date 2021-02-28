import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    chalangesCompleted: number
    experienceToNextLevel: number
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChanllenge: () => void;
    resetChanllenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [chalangesCompleted, setChalangesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChanllenge() {
        const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[ramdomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission == 'granted'){
            new Notification('Novo desafio 🔥 🚀', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChanllenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChalangesCompleted(chalangesCompleted + 1);

    }

    return (
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            chalangesCompleted,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChanllenge,
            resetChanllenge,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}
