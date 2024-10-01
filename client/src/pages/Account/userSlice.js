import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const signup = createAsyncThunk('signup', async (data) => {
    const response = await fetch('http://localhost:8081/api/front/auth/signup', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json()
})

export const signin = createAsyncThunk('signin', async (data) => {
    const response = await fetch('http://localhost:8081/api/front/auth/signin', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json()
})


const userSlice = createSlice({
    name: "User",
    initialState: {
        isLoading: false,
        userData: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false
                state.userData = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            // Signin cases
            .addCase(signin.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = null;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
            })
            .addCase(signin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            });
    }
})

export default userSlice.reducer

