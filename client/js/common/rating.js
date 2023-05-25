// Add this code within your script.js file

// Get the form element
const reviewForm = document.getElementById('review-form');

// Add submit event listener to the form
reviewForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form values
  const review = document.getElementById('review').value;
  const rating = document.querySelector('.star.checked').getAttribute('data-rating');

  // Save the form data in variables
  console.log('Review:', review);
  console.log('Rating:', rating);
});

// Get all star elements
const stars = document.querySelectorAll('.star');

// Add click event listeners to the stars
stars.forEach(function(star) {
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
