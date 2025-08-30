import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { lazy, Suspense } from "react";

const FavoritesView = lazy(() => import('./views/FavoritesView'))
const IndexView = lazy(() => import('./views/IndexView'))


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={
                        <Suspense fallback="Cargando...">
                            <IndexView />
                        </Suspense>
                    } index />
                    <Route path="/favoritos" element={
                        <Suspense fallback="Cargando...">
                            <FavoritesView />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
