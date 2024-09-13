import { SET_ERRORS } from "../types"

const initialState = {
    error: ""
}

export const errorReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_ERRORS:
            return {
                ...state, 
                error: payload
            }
                
        default:
            return state;
    }
}