import { ADD_CATEGORY } from "../../redux/types";

const initialState = {
    category: null
}

const categoryReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_CATEGORY:
        return {
            ...state,
            category: payload
        }
    
        default:
            return state;
    }
}

export default categoryReducer