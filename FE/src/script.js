import * as dbInterface from './dbInterface.js';

let audoDetails = [];

async function getAudioDetails(){
  audoDetails = await dbInterface.listAudioDetails();
  console.log(audoDetails)
};


window.getAudioDetails = getAudioDetails;