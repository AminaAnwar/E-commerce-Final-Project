import { setErrors } from "../../redux/Shared/error.action";
import { ENV } from "../../config/config";
import { ADD_CATEGORY } from "../../redux/types";

export const addCategory = (data) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${ENV.baseURL}/category/add`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${ENV.token}`
                }
            })
            response = await response.json()
            if(response.status) {
                dispatch({
                    type: ADD_CATEGORY,
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