
const audioElement = document.getElementById('audio-player');

// Get the play and pause buttons
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

const aiButton = document.getElementById('chatbot-button');
const aiLabel = document.getElementById('ai-label');
const aiInput = document.getElementById('prompt-input');

// Add event listeners to the buttons
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
aiButton.addEventListener('click', aiCall);

// Function to play the audio
function playAudio() {
  audioElement.play();
}

// Function to pause the audio
function pauseAudio() {
  audioElement.pause();
}

async function aiCall() {
  const response = await fetch(`chat/${aiInput.value}`);
  const responseJSON = await response.json();
  console.log(responseJSON);
  aiLabel.innerText = responseJSON;
}