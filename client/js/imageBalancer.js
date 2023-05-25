
const imageUpload = document.getElementById('image-upload');
const imageCanvas = document.getElementById('image-canvas');
const audioElement = document.getElementById('audio-player');

// const audioDisplay = document.getElementById('audio-display');

imageUpload.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  let volumeLabel = document.getElementById('volume-label');
  let volumeSlider = document.getElementById('volume-slider');

  if (file) {
    // Read the file as data URL
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.onload = function() {
        // Draw the image on the canvas
        const ctx = imageCanvas.getContext('2d');
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);

        // Get the RGB value of the center pixel
        const pixelData = ctx.getImageData(imageCanvas.width / 2, imageCanvas.height / 2, 1, 1).data;
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];

        // Calculate the average RGB value
        const averageRGB = Math.round((red + green + blue) / 3);

        // Set the volume based on the average RGB value
        const maxVolume = 100; // Adjust this value to set the maximum volume
        const volume = Math.round((averageRGB / 255) * maxVolume);
        volumeSlider = volume
        volumeLabel.innerHTML = `Current volume: ${volume}%`; 
        audioElement.volume = volume / maxVolume;
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}