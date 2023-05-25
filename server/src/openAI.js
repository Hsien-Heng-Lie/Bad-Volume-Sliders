// const { Configuration, OpenAIApi } = require("openai");

// require('dotenv').config();

async function APIcall(prompt) {
  // const configuration = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(configuration);

  // try {
  //   const completion = await openai.createCompletion({
  //     model: "text-davinci-003",
  //     prompt,
  //   });
  //   console.log(completion.data.choices[0].text);
  //   return completion.data.choices[0].text;
  // } catch (error) {
  //   console.log('There was an error with the OpenAI API. Please try again later.')
  //   if (error.response) {
  //     console.log(error.response.status);
  //     console.log(error.response.data);
  //   } else {
  //     console.log(error.message);
  //   }
  // }
  return prompt;
}

module.exports = {
  APIcall,
};