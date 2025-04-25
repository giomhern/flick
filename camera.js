const video = document.getElementById("video");
const canvas = document.getElementById("video-canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

let stream;
let animationFrameId;

startButton.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      drawToCanvas(); // start drawing loop
    };
  } catch (err) {
    console.error("Error accessing camera:", err);
  }
});

stopButton.addEventListener("click", () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  cancelAnimationFrame(animationFrameId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function drawToCanvas() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  animationFrameId = requestAnimationFrame(drawToCanvas);
}