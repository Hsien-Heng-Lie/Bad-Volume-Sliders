const audioPlayer = document.getElementById('audio-player');
const volumeLabel = document.getElementById('volume-label');

const upButton = document.getElementById('volume-up');
const downButton = document.getElementById('volume-down');


upButton.addEventListener('click', () =>
  incrementVolume()
);

downButton.addEventListener('click', () =>
decrementVolume()
);

function incrementVolume() {
  const currentVolume = audioPlayer.volume;
  if(currentVolume < 1){
    audioPlayer.volume += 0.01;
  }
  update();
};

function decrementVolume() {
  const currentVolume = audioPlayer.volume;
  if(currentVolume > 0){
    audioPlayer.volume -= 0.01;
  }
  update();
};

function update(){
  let currentVolume = audioPlayer.volume * 100;
  volumeLabel.innerText = `Current volume: ${currentVolume.toFixed()}%`;
}