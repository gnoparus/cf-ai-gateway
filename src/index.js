import { Hono } from 'hono';
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { PromptTemplate } from 'langchain/prompts'

const app = new Hono();

app.get('/', async c => {

	const question = c.req.query("question") || "What is the meaning of love?";
	console.log("question", question)
	const model = new ChatOpenAI({ openAIApiKey: c.env.OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
	const prompt = PromptTemplate.fromTemplate(`You are helpful assistant. Question: {question}`)
	console.log("prompt", prompt)

	const runnable = prompt.pipe(model);
	console.log("runnable", runnable)
	const { content } = await runnable.invoke({ question });
	console.log("content", content)

	return c.text(content)
});

export default app;