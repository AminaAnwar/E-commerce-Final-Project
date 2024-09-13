import { SET_ERRORS } from "../types";

export const setErrors = (error) => {
    return {
        type: SET_ERRORS,
        payload: error
    }
}