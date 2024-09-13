import {combineReducers} from "redux"
import { errorReducer } from "./Shared/error.reducer"
import loginReducer from "../components/Login/login.reducer"

const rootReducer = combineReducers({
    error: errorReducer,
    auth: loginReducer
})

export default rootReducer