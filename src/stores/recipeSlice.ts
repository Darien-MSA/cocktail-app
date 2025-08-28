import type { StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipes } from "../services/RecipesService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"



export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    recipe: Recipe,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>,
    selectRecipe: (idDrink: Drink['idDrink']) => Promise<void>
}

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    recipe: {} as Recipe,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)

        set({
            drinks
        })
    },
    selectRecipe: async (id: Drink['idDrink']) => {
        const recipe = await getRecipe(id)
        set({
            recipe
        })
    }
})