import * as dbInterface from './dbInterface.js';

let audoDetails = [];

async function getVolumeSliderDetails(){
  audoDetails = await dbInterface.listVolumeSliderDetails();
  console.log(audoDetails)
};

function selectVolumeSlider(name){
  dbInterface.incrementVolumeSliderClicks(name);
};

function reviewVolumeSlider(name, review, rating){
  dbInterface.reviewVolumeSlider(name, review, rating);
};


window.reviewVolumeSlider = reviewVolumeSlider;
window.getVolumeSliderDetails = getVolumeSliderDetails;
window.selectVolumeSlider = selectVolumeSlider;