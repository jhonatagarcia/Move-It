import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import {ChallengesContext} from "./ChallengesContext"

interface CountdownContextData {
    minutes: number
    seconds: number
    hasFinished: boolean;
    isActive: boolean
    startCountDonw: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children} : CountdownProviderProps){

    const { startNewChanllenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60

    function startCountDonw() {
        setIsActive(true);
    }

    function resetCountDown() {
        clearInterval(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChanllenge();
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDonw,
            resetCountDown,

        }}>
            {children}
        </CountdownContext.Provider>
    )
}