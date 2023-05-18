import * as dbInterface from './dbInterface.js';

let audoDetails = [];

function getAudioDetails(){
  console.log("hi ")
  audoDetails = dbInterface.listAudioDetails();
  
};


window.getAudioDetails = getAudioDetails;