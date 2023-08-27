const { Configuration, OpenAIApi } = require("openai");
// import { Configuration, OpenAIApi } from 'openai';

// openai api config
const openaidata = async (req: any, cb: any) => {
    const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${req}\n`,
        temperature: 1,
        max_tokens: 3542,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
     
    cb(response);
    return response;
};

export default openaidata;