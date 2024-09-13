import { setErrors } from "../../redux/Shared/error.action";
import { ENV } from "../../config/config";
import { LOGIN } from "../../redux/types";

export const login = (data) => {
    return async (dispatch) => {
        try {
            let response = await fetch(`${ENV.baseURL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            response = await response.json()
            if(response.status) {
                dispatch({
                    type: LOGIN,
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