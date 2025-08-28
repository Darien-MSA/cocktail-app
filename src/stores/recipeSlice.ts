import type { StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipes } from "../services/RecipesService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import type { FavoritesSliceType } from "./favoritesSlice"



export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    recipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>,
    selectRecipe: (idDrink: Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    recipe: {} as Recipe,
    modal: false,
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
            recipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            recipe: {} as Recipe
        })
    }
})