import React, { use, useCallback } from "react";
import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";


export default function ParticlesBackground () {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="Esparticles"
            init={particlesInit}
            options={{
                particles: {
                    number: {value: 80, density: {enable: true, area: 1500}},
                    shape: {type: "star"},
                    size: {value: 5, random: true},
                    move: {enable: true, speed: 0.5},
                    color: {value: "#ffffff"},
                    links: {enabled: true, distance: 150, color: "#ffffff", opacity: "0.4", width: 1},
                }
            }}
        />
    )
}
