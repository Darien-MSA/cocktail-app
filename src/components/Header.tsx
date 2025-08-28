import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import type { SearchFilter } from "../types";


export default function Header() {

    const [searchFilters, setSearchFilters] = useState<SearchFilter>({
        ingredient: '',
        category: ''
    })

    const { pathname } = useLocation()

    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const { drinks } = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(searchFilters).includes('')) {
            return
        }

        searchRecipes(searchFilters)

    }

    return (
        <header className={isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"} >
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img src="/public/logo.svg" alt="logotipo cocktail" className="w-32" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                            }
                            to="/">Inicio</NavLink>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"
                            }
                            to="/favoritos">Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingredientes</label>

                            <input type="text" name="ingredient" id="ingredient"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoría</label>

                            <select name="category" id="category"
                                className="p-3 w-full rounded-lg focus:outline-none bg-white"
                                onChange={handleChange}
                                value={searchFilters.category}
                            >
                                <option value=""> -- Seleccione -- </option>
                                {drinks.map(drink => (
                                    <option key={drink.strCategory} value={drink.strCategory}> {drink.strCategory} </option>
                                ))}
                            </select>
                        </div>
                        <input type="submit"
                            value='Buscar Recetas'
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" />
                    </form>
                )}

            </div>
        </header>
    )
}
