const loadLocalScripts = async () => {
  const paths = [
    chrome.runtime.getURL("libs/tf-core.js"),
    chrome.runtime.getURL("libs/tf-converter.js"),
    chrome.runtime.getURL("libs/handpose.js"),
  ];

  for (const path of paths) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = path;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
};

let previousX = null;

async function startGestureDetection() {
  await loadLocalScripts(); // ← load libraries first
  const model = await handpose.load(); // now this works

  const video = document.createElement("video");
  video.setAttribute("autoplay", true);
  video.setAttribute("playsinline", true);
  video.style.display = "none"; // Hide if you don't want video visible
  document.body.appendChild(video);

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  video.onloadeddata = () => detect(video, model);
}

async function detect(video, model) {
  const predictions = await model.estimateHands(video);

  if (predictions.length > 0) {
    const x = predictions[0].landmarks[8][0]; // Index finger X
    if (previousX !== null) {
      const dx = x - previousX;
      if (dx > 50) {
        window.dispatchEvent(new CustomEvent("swipe-right"));
      } else if (dx < -50) {
        window.dispatchEvent(new CustomEvent("swipe-left"));
      }
    }
    previousX = x;
  }

  requestAnimationFrame(() => detect(video, model));
}

startGestureDetection();
