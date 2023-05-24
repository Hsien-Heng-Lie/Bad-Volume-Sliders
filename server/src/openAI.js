const { Configuration, OpenAIApi } = require("openai");
const config = require('../../config.json');

async function APIcall(prompt) {
  const configuration = new Configuration({
    apiKey: config.openaiAPIKey,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    console.log('There was an error with the OpenAI API. Please try again later.')
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = {
  APIcall: function(){
    return APIcall();
  },
};