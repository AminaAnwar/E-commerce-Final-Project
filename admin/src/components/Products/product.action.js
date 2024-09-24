import { setErrors } from "../../redux/Shared/error.action";
import { ENV } from "../../config/config";
import { ADD_PRODUCT } from "../../redux/types";

export const addProduct = (data) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${ENV.baseURL}/product/add`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${ENV.token}`
                }
            })
            response = await response.json()
            if(response.status) {
                dispatch({
                    type: ADD_PRODUCT,
                    payload: response
                })
            }
            else {
                dispatch(setErrors(response.message))
            }
           
        } catch (error) {
            dispatch(setErrors(error.message))
        }
    }
}