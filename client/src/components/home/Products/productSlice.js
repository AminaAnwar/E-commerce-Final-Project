import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const fetchHomePageData = createAsyncThunk('fetchHomePageData', async() => {
    const response = await fetch('http://localhost:8081/api/front/product/homepage')
    return response.json()
})

export const addToGuestWishList = (productId) => {
        let guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
        if (!guestWishlist.includes(productId)) {
          guestWishlist.push(productId);
          localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
        }
}

export const removeFromGuestWishList = (productId) => {
    let guestWishlist = JSON.parse(localStorage.getItem('guestWishlist')) || [];
    guestWishlist = guestWishlist.filter(item => item !== productId)
    localStorage.setItem('guestWishlist', JSON.stringify(guestWishlist));
}


const productsSlice = createSlice({
    name: "product", 
    initialState: {
        isLoading: false, 
        homePageData: null, 
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
    }
})


export default productsSlice.reducer