
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
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.onload = function() {
        const ctx = imageCanvas.getContext('2d');
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);

        const pixelData = ctx.getImageData(imageCanvas.width / 2, imageCanvas.height / 2, 1, 1).data;
        const red = pixelData[0];
        const green = pixelData[1];
        const blue = pixelData[2];

        const averageRGB = Math.round((red + green + blue) / 3);

        const maxVolume = 100; 
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