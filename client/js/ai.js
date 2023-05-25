
const audioElement = document.getElementById('audio-player');

// Get the play and pause buttons
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

const aiButton = document.getElementById('chatbot-button');
const aiLabel = document.getElementById('ai-label');
const volumeLabel = document.getElementById('value');
const aiInput = document.getElementById('prompt-input');
const volumeSlider = document.getElementById('volume');

// Add event listeners to the buttons
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
aiButton.addEventListener('click', aiCall);
volumeSlider.addEventListener('input', volumeSliderUpdate);
volumeSlider.addEventListener('change', volumeSliderUpdate);

// Function to play the audio
function playAudio() {
  audioElement.play();
}

// Function to pause the audio
function pauseAudio() {
  audioElement.pause();
}

function volumeSliderUpdate() {
  updateVolume(parseInt(volumeSlider.value));
}

function updateVolume(newVolume) {
  const roundedVolume = newVolume.toFixed(0);
  audioElement.volume = roundedVolume / 100;
  volumeSlider.value = roundedVolume;
  volumeLabel.innerText = `Current volume: ${roundedVolume}%`;
}

function parseVolume(generatedResponse) {
  const matches = generatedResponse.match(/(\d+)(?=[^\d]+$)/g);
  if (matches) {
    return parseInt(matches[0]);
  }
  return audioElement.volume;
}

async function aiCall() {
  //TODO: prompt sanitisation
  const userPrompt = aiInput.value.trim();
  if (userPrompt.length < 10 || !/[a-zA-Z]/.test(userPrompt)) {
    aiLabel.innerText = 'Please eneter a valid prompt for the Chatbot.';
    return;
  }
  const prompt = `The current volume is ${audioElement.volume * 100}. The volume may not be lower than 0 or greater than 100. ${userPrompt} What is the volume now?`
  const encodedPrompt = encodeURIComponent(prompt);
  const response = await fetch(`chat/${encodedPrompt}`);
  const responseJSON = await response.json();
  aiLabel.innerText = responseJSON;
  const newVolume = parseVolume(responseJSON + ' ');
  updateVolume(newVolume);
}