
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
    const starID = parseInt(this.id);
    // Check the clicked star
    this.classList.add('checked');

    // Check the preceeding stars
    for (let starIndex = 0; starIndex < starID; starIndex++) {
      stars[starIndex].classList.add('checked');
    }

    // Uncheck the following stars
    for (let starIndex = starID + 1; starIndex < 5; starIndex++) {
      stars[starIndex].classList.remove('checked');
    }
  });

  star.addEventListener('mouseover', function() {
    const starID = parseInt(this.id);
    // Check the clicked star
    this.classList.add('hovered');

    // Check the preceeding stars
    for (let starIndex = 0; starIndex < starID; starIndex++) {
      stars[starIndex].classList.add('hovered');
    }

    // Uncheck the following stars
    for (let starIndex = starID + 1; starIndex < 5; starIndex++) {
      stars[starIndex].classList.remove('hovered');
    }
  });

  star.addEventListener('mouseout', function() {// Uncheck the following stars
    for (let starIndex = 0; starIndex < 5; starIndex++) {
      stars[starIndex].classList.remove('hovered');
    }
  });
});
