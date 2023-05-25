const {
  Configuration,
  OpenAIApi,
} = require("openai");

require('dotenv').config();

async function getAIResponse(prompt) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
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