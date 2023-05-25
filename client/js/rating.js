import * as dbInterface from './dbInterface.js';

const reviewForm = document.getElementById('review-form');
let selectedRating = 0;
const stars = document.querySelectorAll('.star');

function reviewVolumeSlider(name, review, rating){
  dbInterface.reviewVolumeSlider(name, review, rating);
};

reviewForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const review = document.getElementById('review').value;
  const rating = selectedRating;

  console.log('Review:', review);
  console.log('Rating:', rating);

  reviewVolumeSlider("kyles",review, rating);
});

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