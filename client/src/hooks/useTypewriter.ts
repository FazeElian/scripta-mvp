import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string, speed: number) {
    const [displayed, setDisplayed] = useState("");
    const prevText = useRef<string | null>(null);

    useEffect(() => {
        let i = prevText.current === text ? displayed.length : 0;
        prevText.current = text;

        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return displayed;
}