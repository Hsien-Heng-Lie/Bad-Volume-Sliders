import * as dbInterface from './dbInterface.js';

const leaderboardTable = document.getElementById("leaderboardTable");
const reviewTable = document.getElementById("reviewTable");


async function populateTables(){
  const data = await dbInterface.listVolumeSliderDetails();
  const review = await dbInterface.listVolumeSliderReviews();
  populateLeaderboard(data);
  populateReviews(review);
}

function populateLeaderboard(arr){
  arr.forEach(element => {
    let rowCount = leaderboardTable.rows.length;
    let row = leaderboardTable.insertRow(rowCount);
    row.insertCell(0).innerHTML= element.Row;
    row.insertCell(1).innerHTML= element.Name;
    row.insertCell(2).innerHTML= element.Clicks;

  });
};

function populateReviews(arr){
  arr.forEach(element => {
    let rowCount = reviewTable.rows.length;
    let row = reviewTable.insertRow(rowCount);
    row.insertCell(0).innerHTML= element.Name;
    row.insertCell(1).innerHTML= element.Date;
    row.insertCell(2).innerHTML= element.Review;
    row.insertCell(2).innerHTML= element.Rating;
  });
};

window.populateTables = populateTables;