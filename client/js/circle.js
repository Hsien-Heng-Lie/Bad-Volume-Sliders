const audioElement = document.getElementById('audio-player');

// Get the play and pause buttons
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

// Add event listeners to the buttons
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);

// Function to play the audio
function playAudio() {
  audioElement.play();
}

// Function to pause the audio
function pauseAudio() {
  audioElement.pause();
}

let prevAngle = 0;



function setVolume(event) {
    var volumeContainer = document.getElementById("volume-container");
    var volumeBar = document.getElementById("volume-bar");
    var volumeFill = document.getElementById("volume-fill");
    var slider = document.getElementById("volume");
    var output = document.getElementById("value");

    // Calculate the angle between the center of the volume container and the click position
    var clickX = event.pageX - (volumeContainer.offsetLeft + volumeContainer.offsetWidth / 2);
    var clickY = event.pageY - (volumeContainer.offsetTop + volumeContainer.offsetHeight / 2);
    var angle = Math.atan2(clickY, clickX);

    // Calculate the new volume based on the angle
    var newVolume = (angle + Math.PI) / (2 * Math.PI);

    // Set the volume of the audio player
    var audioPlayer = document.getElementById("audio-player");
    audioPlayer.volume = newVolume;
    let diff = Math.abs(prevAngle + angle);
    // Update the rotation of the volume bar to reflect the current volume
    volumeBar.style.transform = "rotate(" + diff + "rad)";

    // Update the width of the volume fill element
    volumeFill.style.width = (newVolume * 100) + "%";
    output.innerHTML = Math.round(newVolume * 100);
    slider.value = newVolume * 100

}