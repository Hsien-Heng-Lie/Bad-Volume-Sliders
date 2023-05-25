
const reviewForm = document.getElementById('review-form');
const stars = document.querySelectorAll('.star');

reviewForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form values
  const review = document.getElementById('review').value;
  const rating = document.querySelector('.star.checked').getAttribute('data-rating');

  // Save the form data in variables
  console.log('Review: ', review);
  console.log('Rating: ', rating);
});

stars.forEach(function(star) {//TODO: not working
  star.addEventListener('click', function() {
    // Toggle the checked class on the clicked star
    this.classList.toggle('checked');

    // Toggle the checked class on the previous stars
    const previousStars = Array.from(this.parentElement.children).slice(0, Number(this.getAttribute('data-rating')));
    previousStars.forEach(function(prevStar) {
      prevStar.classList.toggle('checked');
    });
  });
});
