import * as dbInterface from './common/dbInterface.js';

const reviewForm = document.getElementById('review-form');
const stars = document.querySelectorAll('.star');
const dropdown = document.getElementById("dropdown");
let review = document.getElementById('review').value
let selectedRating = 0;

function reviewVolumeSlider(name, review, rating){
  dbInterface.reviewVolumeSlider(name, review, rating);
};

async function getSliderNames(){
  const volumeSliderNames = await dbInterface.listVolumeSliderDetails();
  volumeSliderNames.forEach(element => {
    let option = document.createElement("option");
    option.text = element.Name;
    dropdown.add(option);
  })
}

reviewForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const rating = selectedRating;
  reviewVolumeSlider(dropdown.value,review, rating);
  clearFields();

});


function clearFields(){
  var frm = document.getElementById('review-form');
  frm.reset();

  stars.forEach(function(star) {
    const rating = parseInt(star.getAttribute('data-rating'));
  
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('active');
    }
    
    selectedRating = rating;
  });
}

stars.forEach(function(star) {

  star.addEventListener('click', function() {
    const rating = parseInt(this.getAttribute('data-rating'));

    for (let i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.add('active');
      } else {
        stars[i].classList.remove('active');
      }
    }

    selectedRating = rating;
  });
});

window.reviewVolumeSlider = reviewVolumeSlider;
window.getSliderNames = getSliderNames;
