import { ADD_PRODUCT } from "../../redux/types";

const initialState = {
    product: null
}

const productReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_PRODUCT:
        return {
            ...state,
            product: payload
        }
        default:
            return state;
    }
}

export default productReducer