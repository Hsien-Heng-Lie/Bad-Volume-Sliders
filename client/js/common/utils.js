import * as dbInterface from './dbInterface.js';

let audioDetails = [];

async function getVolumeSliderDetails() {
  audioDetails = await dbInterface.listVolumeSliderDetails();
  console.log(audioDetails)
};

function selectVolumeSlider(name) {
  dbInterface.incrementVolumeSliderClicks(name);
};

function reviewVolumeSlider(name, review, rating) {
  dbInterface.reviewVolumeSlider(name, review, rating);
};


window.reviewVolumeSlider = reviewVolumeSlider;
window.getVolumeSliderDetails = getVolumeSliderDetails;
window.selectVolumeSlider = selectVolumeSlider;