const audioPlayer = document.getElementById('audio-player');

// Get the play and pause buttons
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');

// Add event listeners to the buttons
playButton.addEventListener('click', () =>
  audioPlayer.play()
);

pauseButton.addEventListener('click', () =>
  audioPlayer.pause()
);

stopButton.addEventListener('click', () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});