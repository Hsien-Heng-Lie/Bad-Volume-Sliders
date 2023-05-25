async function query(path){
  const response = await fetch(path);
  const responseJson = await response.json();
  return responseJson;
};

async function listVolumeSliderDetails() {
  return await query('volumeslider/details');
};

async function listVolumeSliderReviews() {
  return await query('volumeslider/reviews');
};

async function incrementVolumeSliderClicks(name){
  const path = 'volumeslider/update/click'
  const params = JSON.stringify({name: name})

  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
  const responseJson = await response.ok;
  return responseJson;
};

async function reviewVolumeSlider(name, review, rating){
  const path = 'volumeslider/review'
  const params = JSON.stringify(
    {name: name,
    review: review,
    rating: rating
    }
    )
  console.log(params);

  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: params
  });
  const responseJson = await response.ok;
  return responseJson;
};


export {
  listVolumeSliderDetails,
  listVolumeSliderReviews,
  incrementVolumeSliderClicks,
  reviewVolumeSlider
};