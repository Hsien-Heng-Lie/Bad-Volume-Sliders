
const volumeContainer = document.getElementById("volume-container");
const volumeBar = document.getElementById("volume-bar");
const volumeFill = document.getElementById("volume-fill");
const audioPlayer = document.getElementById('audio-player');
const volumeLabel = document.getElementById('volume-label');
const volumeSlider = document.getElementById('volume-slider');

let prevAngle = 0;

function setVolume(event) {

    const clickX = event.pageX - (volumeContainer.offsetLeft + volumeContainer.offsetWidth / 2);
    const clickY = event.pageY - (volumeContainer.offsetTop + volumeContainer.offsetHeight / 2);
    const angle = Math.atan2(clickY, clickX);

    const newVolume = (angle + Math.PI) / (2 * Math.PI);

    audioPlayer.volume = newVolume;
    const diff = Math.abs(prevAngle + angle);
    volumeBar.style.transform = "rotate(" + diff + "rad)";

    volumeFill.style.width = (newVolume * 100) + "%";
    volumeLabel.innerHTML = `Current volume: ${Math.round(newVolume * 100)}%`; 
    volumeSlider.value = newVolume * 100

}