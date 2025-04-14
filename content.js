window.addEventListener("swipe-right", () => {
    // For TikTok: Next video
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
    // For YouTube Shorts: Simulate click on 'Next' button
    // document.querySelector('.next-button-selector').click();
});

window.addEventListener("swipe-left", () => {
    // For TikTok: Previous video
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    // For YouTube Shorts: Simulate click on 'Previous' button
    // document.querySelector('.previous-button-selector').click();
});