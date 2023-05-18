import * as dbInterface from './dbInterface.js';

let audoDetails = [];

function getAudioDetails(){
  audoDetails = dbInterface.listAudioDetails();
  console.log(audoDetails)
};


window.getAudioDetails = getAudioDetails;