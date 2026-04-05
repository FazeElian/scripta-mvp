import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const AuthBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    const options = useMemo(() => ({
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: "#030303" } },
        particles: {
            number: { value: 85 },
            shape: {
                type: "circle",
            },
            color: { value: "#07B863" },
            opacity: { value: { min: 0.05, max: 0.2 } },
            size: {
                value: { min: 5, max: 20 },
                animation: { enable: true, speed: 2 }
            },
            move: {
                enable: true,
                speed: 1.2,
                direction: "none" as const,
                random: true,
                outModes: { default: "out" as const },
                drift: 0,
                warp: true
            },
            links: {
                enable: true,
                color: "#07B863",
                opacity: 0.08,
                distance: 200,
            },
        },
        interactivity: {
            events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
            },
            modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
            }
        },
    }), []);

    if (!init) return null;

    return <Particles id="auth-bg" options={options} />;
};

export { AuthBackground };