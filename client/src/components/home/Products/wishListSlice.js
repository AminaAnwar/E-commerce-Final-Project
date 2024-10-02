import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

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

export const addToWishList = createAsyncThunk('product/add', async (id)=> {
    const response = await fetch('http://localhost:8081/api/front/wishlist/add', {
        method: "POST",
        body: JSON.stringify({productId: id}),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.json()
})

export const removeFromWishList = createAsyncThunk('product/remove', async (id)=> {
    const response = await fetch('http://localhost:8081/api/front/wishlist/remove', {
        method: "POST",
        body: JSON.stringify({productId: id}),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.json()
})

export const fetchWishList = createAsyncThunk('product/fetchWishList', async() => {
    const response = await fetch(`http://localhost:8081/api/front/wishlist/list`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return response.json()
})

export const fetchGuestWishList = createAsyncThunk('product/fetchGuestWishList', async(productIds) => {
    const response = await fetch(`http://localhost:8081/api/front/wishlist/guest-wishlist`, {
        method: "POST",
        body: JSON.stringify(productIds),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.json()
})


const wishlistSlice = createSlice({
    name: "product", 
    initialState: {
        isLoading: false, 
        wishList: null, 
        isError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToWishList.fulfilled, (state,action) => {
                state.wishList = action.payload
            })
            .addCase(removeFromWishList.fulfilled, (state,action) => {
                state.wishList = action.payload
            })
            .addCase(fetchWishList.fulfilled, (state,action) => {
                state.wishList = action.payload
            })
            .addCase(fetchGuestWishList.fulfilled, (state,action) => {
                state.wishList = action.payload
            })
    }
})


export default wishlistSlice.reducer