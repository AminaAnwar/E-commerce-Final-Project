import {lazy} from "react"

//layouts
import Auth from "./layouts/Auth";
import UnAuth from "./layouts/UnAuth"


const Dashboard = lazy(()=>import("./pages/Dashboard"))
const Categories = lazy(()=>import("./components/Categories/Categories"))
const Products = lazy(()=>import("./components/Products/Products"))
const Login = lazy(()=>import("./components/Login/Login"))

const routes = [
    {path: "/", element: Dashboard, layout: Auth, name: "Dashboard"},
    {path: "/categories", element: Categories, layout: Auth, name: 'Categories'},
    {path: "/products", element: Products, layout: Auth, name: 'Products'},
    {path: "/login", element: Login, layout: UnAuth, name: 'Login'}
]

export default routes