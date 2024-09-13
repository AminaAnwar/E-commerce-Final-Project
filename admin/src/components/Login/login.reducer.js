import { LOGIN } from "../../redux/types";

const initialState = {
    loginData: {}
}

const loginReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case LOGIN:
        return {
            ...state,
            loginData: payload
        }
    
        default:
            return state;
    }
}

export default loginReducer