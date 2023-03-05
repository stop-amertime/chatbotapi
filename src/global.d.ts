type MessageRole = "system" | "user" | "assistant";

type promptWorkingState = "full" | "partial" | "patched";

type GptMessage = {
	role: MessageRole;
	content: string;
};

type GptPrompt = {
	prompt: string;
	version?: string;
	description?: string;
	status?: string;
	emoji?: string;
};

type GptCharacter = { name: string } & GptPrompt;
type GptCharacterMap = Map<string, GptPrompt>;

type GptConversation = {
	title: string;
	character: GptCharacter;
	messages: GptMessage[];
};

interface GptCompletionResponse {
	messages?: GptMessage[];
	isError: boolean;
	error?: string;
}
