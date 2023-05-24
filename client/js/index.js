// Add JavaScript code here

const toggleSwitch = document.querySelector('.toggle-switch');
const body = document.querySelector('body');

toggleSwitch.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mouseover', () => {
    card.classList.add('card-hover');
  });

  card.addEventListener('mouseout', () => {
    card.classList.remove('card-hover');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const slider = document.getElementById("slider");
  const indicator = document.getElementById("indicator");
  let isDragging = false;
  let initialY = 0;
  let currentY = 0;

  slider.addEventListener("mousedown", function(e) {
    isDragging = true;
    initialY = e.clientY;
  });

  document.addEventListener("mousemove", function(e) {
    if (isDragging) {
      currentY = e.clientY - initialY;
      const maxOffset = 150; // Maximum offset from the center
      const offset = Math.min(Math.max(currentY, -maxOffset), maxOffset);
      const volume = (offset + maxOffset) / (maxOffset * 2); // Normalized volume between 0 and 1
      indicator.style.width = (100 * volume) + "px";
      // Update the volume value or call a function to handle volume change
    }
  });

  document.addEventListener("mouseup", function() {
    isDragging = false;
  });
});

// Add this code within your script.js file

// Get the elements
const imageUpload = document.getElementById('image-upload');
const imageCanvas = document.getElementById('image-canvas');
const audioElement = document.getElementById('audio-element');



