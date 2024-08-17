import {lazy} from "react"

//layouts
import Auth from "./layouts/Auth";
import UnAuth from "./layouts/UnAuth"


const Dashboard = lazy(()=>import("./pages/Dashboard"))
const Categories = lazy(()=>import("./components/Categories/Categories"))
const Products = lazy(()=>import("./components/Products/Products"))
const Login = lazy(()=>import("./components/Login/Login"))

const routes = [
    {showInSidebar: true, path: "/", element: Dashboard, layout: Auth, name: "Dashboard"},
    {showInSidebar: true, path: "/categories", element: Categories, layout: Auth, name: 'Categories'},
    {showInSidebar: true, path: "/products", element: Products, layout: Auth, name: 'Products'},
    {showInSidebar: false, path: "/login", element: Login, layout: UnAuth, name: 'Login'}
]

export default routes