import {combineReducers} from "redux"
import { errorReducer } from "./Shared/error.reducer"
import loginReducer from "../components/Login/login.reducer"
import categoryReducer from "../components/Categories/category.reducer"
import productReducer from "../components/Products/product.reducer"

const rootReducer = combineReducers({
    error: errorReducer,
    auth: loginReducer,
    category: categoryReducer,
    product: productReducer
})

export default rootReducer