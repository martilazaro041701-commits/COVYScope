// main.js - Step-by-Step Intro

// main.js
document.addEventListener("DOMContentLoaded", () => {
    const mainTl = gsap.timeline();

    // Start with everything hidden except the loader
    gsap.set("#login-container", { autoAlpha: 0 });
    gsap.set("#success-screen", { display: "none" });

    // The Pulse
    mainTl.to("#window-feature", {
        scale: 1.1,
        duration: 0.8,
        repeat: 2,
        yoyo: true,
        ease: "sine.inOut"
    })
    .to("#window-feature", {
        width: "100vw",
        height: "100vh",
        duration: 1,
        ease: "expo.inOut"
    })
    .to("#loader-overlay", {
        autoAlpha: 0,
        duration: 0.5
    })
    .to("#login-container", {
        autoAlpha: 1,
        duration: 1
    });
});

// 2. Corgi Mouse Tracking (Basic Logic)
const head = document.getElementById('corgi-head');
const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // 1. Calculate Head Tilt
    const headX = ((clientX - innerWidth / 2) / innerWidth) * 30; // Rotate up to 30deg
    const headY = ((clientY - innerHeight / 2) / innerHeight) * -30;
    head.style.transform = `perspective(1000px) rotateX(${headY}deg) rotateY(${headX}deg)`;

    // 2. Calculate Pupil Movement
    pupils.forEach(pupil => {
        // This moves the pupils 5-10 pixels in the direction of the mouse
        const moveX = ((clientX - innerWidth / 2) / innerWidth) * 15;
        const moveY = ((clientY - innerHeight / 2) / innerHeight) * 15;
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});