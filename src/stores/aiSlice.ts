import type { StateCreator } from "zustand"
import AIService from "../services/AIService"

export type AISlice = {
    recipeAI: string,
    isGenerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
    recipeAI: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        set({ recipeAI: '', isGenerating: true })
        const data = await AIService.generateRecipe(prompt)

        for await (const textPart of data) {
            set((state => ({
                recipeAI: state.recipeAI + textPart
            })))
        }

        set({ isGenerating: false })
    }
})