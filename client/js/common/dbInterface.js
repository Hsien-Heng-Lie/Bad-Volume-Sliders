
async function listVolumeSliderDetails() {
  const response = await fetch('volumeslider/details');
  const responseJson = await response.json();
  return responseJson;
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
  incrementVolumeSliderClicks,
  reviewVolumeSlider,
};