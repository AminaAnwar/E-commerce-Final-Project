import React, { useEffect } from 'react'
import {fetchWishList, fetchGuestWishList} from "./wishListSlice"
import {useDispatch,useSelector} from "react-redux"
import Product from "./Product"


function WishList() {

  const dispatch = useDispatch()
  const {wishList} = useSelector(state => state.wishlist)
  const isAuthenticated = localStorage.getItem('token') || null
  const List = JSON.parse(localStorage.getItem('guestWishlist')) || []

  useEffect(()=> {
    dispatch(isAuthenticated ? fetchWishList() : fetchGuestWishList(List))
  },[])


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
    {wishList?.wishlist?.map((product) => (
          <div className="px-2">
            <Product
              _id={product._id}
              img={product.images}
              productName={product.title}
              price={product.price}
              des={product.description}
              category={product.categoryName}
            />
          </div>
        ))}
    </div>
  );
}

export default WishList