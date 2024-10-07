import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const fetchHomePageData = createAsyncThunk('fetchHomePageData', async() => {
    const response = await fetch('http://localhost:8081/api/front/product/homepage')
    return response.json()
})

export const getProductsList = createAsyncThunk('getProductsList', async(query) => {

    let {categoryId,maxPrice,minPrice} = query
    let params = new URLSearchParams()

    if(categoryId) {
        params.append('categoryId', categoryId)
    }
    if(maxPrice) {
        params.append('maxPrice', maxPrice)
    }
    if(minPrice) {
        params.append('minPrice', minPrice)
    }
    
    params = params.toString()
    let url = 'http://localhost:8081/api/front/product/getProducts'
    if(params) {
        url = `http://localhost:8081/api/front/product/getProducts?${params}`
    }

    const response = await fetch(url)
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