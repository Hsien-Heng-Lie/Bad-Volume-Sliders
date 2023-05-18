
const listAudioDetails = async () => {
  const response =  await fetch('audio/details', {
    method: 'GET',
  });
  let res = await response.json();
  console.log(res)
  return res;
};

const retrieveAudioDetails = async (id) => {
  const response =  await fetch(`audio/details/${id}`, {
    method: 'GET',
  });

  return await response.json();
};

const listAudioLinks = async () => {
  const response =  await fetch('audio/link', {
    method: 'GET',
  });

  return await response.json();
};

export {
  listAudioDetails,
  retrieveAudioDetails,
  listAudioLinks,
};