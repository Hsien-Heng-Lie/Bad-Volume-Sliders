const query = async (path) => {
  const response = await fetch(path);
  const responseJson = await response.json();
  return responseJson;
};

const listAudioDetails = async () => {
  return await query('audio/details');
};

const retrieveAudioDetails = async (id) => {
  return await query(`audio/details/${id}`);
};

const listAudioLinks = async () => {
  return await query('audio/links');
};

export {
  listAudioDetails,
  retrieveAudioDetails,
  listAudioLinks,
};