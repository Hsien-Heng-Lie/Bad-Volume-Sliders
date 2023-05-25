const {
  Configuration,
  OpenAIApi,
} = require("openai");

const crypto = require('crypto');
const config = require('../../config.json');
const dbHandler = require("./dbHandler");

const algorithm = config.crypt.algo; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

require('dotenv').config();

async function getAIResponse(prompt) {
  const cryptedKey = await dbHandler.readKey('OpenAi');
  const apiKey = cryptedKey[0].encryptedData;
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  return 'There was an error with the OpenAI API. Please try again later.';
}

module.exports = {
  getAIResponse,
};