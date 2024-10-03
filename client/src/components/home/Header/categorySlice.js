import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const fetchCategories = createAsyncThunk('category/fetchCategories', async()=>{
    const response = await fetch("http://localhost:8081/api/front/categories/catlist")
    return await response.json()
})

const categorySlice = createSlice({
    name: "category", 
    initialState: {
        isLoading: false,
        categoriesList: null, 
        isError: false
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchCategories.fulfilled, (state,action)=> {
                state.isLoading = false
                state.categoriesList = action.payload
            })
            .addCase(fetchCategories.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
            })
    }
})

export default categorySlice.reducer