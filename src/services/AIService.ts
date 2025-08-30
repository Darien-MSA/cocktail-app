
import { streamText } from 'ai'
import { openrouter } from '../lib/ai'
export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('deepseek/deepseek-chat-v3.1:free'),
            prompt,
            system: 'Comportate como un bartender experto en todo tipo de bebidas. Por lo tanto solo responderás a cuestiones que tengan que ver con tu trabajo.'
        })

        return result.textStream
    }
}