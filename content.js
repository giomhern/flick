window.addEventListener("swipe-right", () => {
    // YouTube Shorts or TikTok next video logic
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
});

window.addEventListener("swipe-left", () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
});