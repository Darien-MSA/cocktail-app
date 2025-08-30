import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schemas/recipes-schema"
import type { Drink, SearchFilter } from "../types"
import api from "../lib/axios"

const baseURL = api.getUri()

export async function getCategories() {
    const url = `${baseURL}/list.php?c=list`
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getRecipes(filters: SearchFilter) {
    const url = `${baseURL}/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await axios(url)

    const result = DrinksAPIResponse.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getRecipe(id: Drink['idDrink']) {
    const url = `${baseURL}/lookup.php?i=${id}`
    const { data } = await axios(url)

    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if (result.success) {
        return result.data
    }
}