const audioPlayer = document.getElementById('audio-player');

// Get the play and pause buttons
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');

// Add event listeners to the buttons
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
stopButton.addEventListener('click', stopAudio);

// Function to play the audio
function playAudio() {
  audioPlayer.play();
}

// Function to pause the audio
function pauseAudio() {
  audioPlayer.pause();
}

function stopAudio() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}