import {lazy} from "react"

//layouts
import Auth from "./layouts/Auth";


const Dashboard = lazy(()=>import("./pages/Dashboard"))
const Categories = lazy(()=>import("./components/Categories/Categories"))
const Products = lazy(()=>import("./components/Products/Products"))

const routes = [
    {path: "/", element: Dashboard, layout: Auth, name: "Dashboard"},
    {path: "/categories", element: Categories, layout: Auth, name: 'Categories'},
    {path: "/products", element: Products, layout: Auth, name: 'Products'},
]

export default routes