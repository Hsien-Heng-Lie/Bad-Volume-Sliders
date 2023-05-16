
const query = async (path) => {
  const response = await fetch(path);
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson;
};

const listAudioDetails = async () => {
  return await query('audio/details');
};

//parameter example, not yet implemented
const retrieveAudioDetails = async (id) => {
  return await query(`audio/details/${id}`);
};

const listAudioLinks = async () => {
  return await query('audio/links');
};
