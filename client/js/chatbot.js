
const audio = document.getElementById('audio-player');
const chatbotButton = document.getElementById('chatbot-button');
const chatbotResponseLabel = document.getElementById('ai-label');
const volumeLabel = document.getElementById('value');
const chatbotInput = document.getElementById('prompt-input');
const volumeSlider = document.getElementById('volume');

chatbotButton.addEventListener('click', generateAIResponse);
volumeSlider.addEventListener('input', volumeSliderUpdate);
volumeSlider.addEventListener('change', volumeSliderUpdate);

function updateVolume(newVolume) {
  const roundedVolume = newVolume.toFixed(0);
  audio.volume = roundedVolume / 100;
  volumeSlider.value = roundedVolume;
  volumeLabel.innerText = `Current volume: ${roundedVolume}%`;
}

function volumeSliderUpdate() {
  updateVolume(parseInt(volumeSlider.value));
}

function parseVolume(generatedResponse) {
  const matches = generatedResponse.match(/(\d+)(?=[^\d]+$)/g);
  if (matches) {
    return parseInt(matches[0]);
  }
  return audio.volume;
}

async function generateAIResponse() {
  const userPrompt = chatbotInput.value.trim();
  if (userPrompt.length < 10 || !/[a-zA-Z]/.test(userPrompt)) {
    chatbotResponseLabel.innerText = 'Please eneter a valid prompt for the Chatbot.';
    return;
  }
  const prompt = `The current volume is ${audio.volume * 100}. The volume may not be lower than 0 or greater than 100. ${userPrompt} What is the volume now?`;
  const response = await fetch(`chat/${encodeURIComponent(prompt)}`);
  const parsedResponse = await response.json();
  aiLabel.innerText = parsedResponse;
  const newVolume = parseVolume(parsedResponse + ' ');
  updateVolume(newVolume);
}