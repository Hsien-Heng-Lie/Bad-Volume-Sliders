const { Configuration, OpenAIApi } = require("openai");

async function APIcall() {
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });
  console.log(completion.data.choices[0].text);
}

module.exports = {
  APIcall: function(){
    return APIcall();
  },
};