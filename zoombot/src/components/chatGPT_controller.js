const { Configuration, OpenAIApi } = require("openai");

export const chatgptReaponse = async (transcript) => {
  try {
    const configuration = new Configuration({
      apiKey: "", // chatgpt API
    });
  
    delete configuration.baseOptions.headers['User-Agent'];
    const openai = new OpenAIApi(configuration);
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": `${transcript}`}, {role: "user", content: "Hello world"}],
    });
    const result = completion.data.choices[0].message
    return result;
   }
  catch(error) {
    console.log(error)
    return `There occourde some error on chatting with the chatGPT , but your request was ${transcript}`
  
    }
  



}



