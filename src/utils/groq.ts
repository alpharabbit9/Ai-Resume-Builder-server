import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export const callGroq = async (
  systemPrompt: string,
  userContent: string,
  maxTokens = 2048,
): Promise<string> => {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: maxTokens,
  })
  return completion.choices[0]?.message?.content || ''
}
