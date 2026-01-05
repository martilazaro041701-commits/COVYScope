document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined") {
        console.error("GSAP failed to load; loader animation skipped.");
        return;
    }

    const mainTl = gsap.timeline();
    const statusText = document.getElementById("loader-status");
    const messages = ["Adjusting camera zoom...", "Calibrating code...", "Fetching vehicle data...", "Syncing with COVYScope..."];
    const progressDuration = 3.6;

    // 1. Initial State
    gsap.set(".split-top, .split-bottom", { yPercent: 0, autoAlpha: 1 });
    gsap.set("#login-screen", { autoAlpha: 0, visibility: "visible" });
    statusText.textContent = messages[0];

    // 2. Spinning Gear & Loading Bar (with message swaps)
    mainTl.addLabel("load");
    mainTl.to("#progress-bar", {
        width: "100%",
        duration: progressDuration,
        ease: "power2.inOut"
    }, "load");

    const checkpoints = [0.25, 0.5, 0.75];
    checkpoints.forEach((fraction, idx) => {
        mainTl.call(() => {
            statusText.textContent = messages[idx + 1] || "Syncing...";
        }, null, `load+=${progressDuration * fraction}`);
    });

    // 3. Fade out loader content (Gear-focused fade)
    mainTl.to(["#loader-gear", ".progress-container", "#loader-status"], {
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out"
    }, `load+=${progressDuration + 0.1}`);

    // 4. White Line Reveal
    mainTl.to(".split-line", {
        width: "100vw",
        duration: 0.8,
        ease: "expo.inOut"
    });

    // 5. The Grand Split (Shutter Reveal)
    mainTl.to(".split-top", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.1")
          .to(".split-bottom", { yPercent: 100, duration: 1, ease: "expo.inOut" }, "<")
          .to(".split-line", { autoAlpha: 0, duration: 0.1 }, "<");

    // 6. Show Login Screen
    mainTl.fromTo("#login-screen",
        { autoAlpha: 0, scale: 0.94 },
        { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.6)" },
    "-=0.4");

    // 7. Remove overlay to unlock interactions
    mainTl.set("#loader-overlay", { display: "none", pointerEvents: "none" });
});
