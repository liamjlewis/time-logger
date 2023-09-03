import { useState, useEffect } from 'react';

const loadingMessage: Array<string> = [
    "Loading",
    ".Loading.",
    "..Loading..",
    "...Loading...",
];

let spinnerIncrement: number = 0;

function Spinner() {
    const [spinnerMessage, setSpinnerMessage] = useState<string>(loadingMessage[0]);

    useEffect(() => {
        const spinnerTimer = setInterval(() => {
            spinnerIncrement = spinnerIncrement === 3 ? 0 : spinnerIncrement + 1;
            setSpinnerMessage(loadingMessage[spinnerIncrement % 4]);
        }, 300);
        return () => {
            clearInterval(spinnerTimer);
        }
    }, []);

    return (
        <div>{ spinnerMessage }</div>
    );
}

export default Spinner;
