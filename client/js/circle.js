
const volumeContainer = document.getElementById("volume-container");
const volumeBar = document.getElementById("volume-bar");
const volumeFill = document.getElementById("volume-fill");
const audioPlayer = document.getElementById('audio-player');
const volumeLabel = document.getElementById('volume-label');
const volumeSlider = document.getElementById('volume-slider');

let prevAngle = 0;

function setVolume(event) {

    // Calculate the angle between the center of the volume container and the click position
    const clickX = event.pageX - (volumeContainer.offsetLeft + volumeContainer.offsetWidth / 2);
    const clickY = event.pageY - (volumeContainer.offsetTop + volumeContainer.offsetHeight / 2);
    const angle = Math.atan2(clickY, clickX);

    // Calculate the new volume based on the angle
    const newVolume = (angle + Math.PI) / (2 * Math.PI);

    // Set the volume of the audio player
    audioPlayer.volume = newVolume;
    const diff = Math.abs(prevAngle + angle);
    // Update the rotation of the volume bar to reflect the current volume
    volumeBar.style.transform = "rotate(" + diff + "rad)";

    // Update the width of the volume fill element
    volumeFill.style.width = (newVolume * 100) + "%";
    volumeLabel.innerHTML = `Current volume: ${Math.round(newVolume * 100)}%`; 
    volumeSlider.value = newVolume * 100

}