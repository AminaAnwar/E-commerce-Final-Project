import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const fetchHomePageData = createAsyncThunk('fetchHomePageData', async() => {
    const response = await fetch('http://localhost:8081/api/front/product/homepage')
    return response.json()
})

export const getProductsList = createAsyncThunk('getProductsList', async(query) => {
    console.log(query)

    let {category} = query
    const params = new URLSearchParams()
    params.append('key', test)
    if(category) {
        params.append('categoryId', category)
    }

    console.log(params.toString(), "params")


    const response = await fetch('http://localhost:8081/api/front/product/getProducts')
    return response.json()
})


const productsSlice = createSlice({
    name: "product", 
    initialState: {
        isLoading: false, 
        homePageData: null, 
        products: null,
        isError: false
    },
    extraReducers: (builder) => {
        // Fetch Home Page Data
        builder
            .addCase(fetchHomePageData.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchHomePageData.fulfilled, (state,action) => {
                state.isLoading = false
                state.homePageData = action.payload
            })
            .addCase(fetchHomePageData.rejected, (state, action) => {
                console.log('Error', action.payload)
                state.isLoading = false 
            })
            .addCase(getProductsList.fulfilled, (state, action) => {
                state.products = action.payload 
            })
    }
})


export default productsSlice.reducer