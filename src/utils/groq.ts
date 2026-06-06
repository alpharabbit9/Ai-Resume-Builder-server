import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export const callGroq = async (systemPrompt: string, userContent: string): Promise<string> => {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    model: 'llama3-70b-8192',
    temperature: 0.7,
    max_tokens: 2048,
  })
  return completion.choices[0]?.message?.content || ''
}
