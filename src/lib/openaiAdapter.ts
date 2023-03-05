import { Configuration, OpenAIApi } from "openai";

// Configuration
let apiKey = "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";
const configuration = new Configuration({
	organization: "org-BV7rZv1RfV26otixnTMZNKdL",
	apiKey,
});
const openai = new OpenAIApi(configuration);

// Default Params
let params = {
	model: "gpt-3.5-turbo",
	temperature: 0.8,
};

// Fns to Interface
export const getOpenAIModels = async () => {
	let response = await openai.listModels();
	console.log(response);
	return response;
};

export const getChatCompletion = async (
	userMessage: string,
	messages: GptMessage[]
): Promise<GptCompletionResponse> => {
	let response: GptCompletionResponse;
	//@ts-ignore
	let resp: AxiosResponse<CreateChatCompletionResponse, any> =
		await openai.createChatCompletion({ ...params, messages });
	console.log(resp);
	let newMessage: GptMessage = resp.data.choices[0].message;
	return { messages: [...messages, newMessage], isError: false };
};
