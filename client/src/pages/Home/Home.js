import React, {useEffect} from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePageData } from "../../components/home/Products/productSlice";
import {fetchWishList} from "../../components/home/Products/wishListSlice"

const Home = () => {
  const dispatch = useDispatch();
  const {homePageData} = useSelector(state => state.product)
  
  useEffect(()=> {
    dispatch(fetchHomePageData())
    dispatch(fetchWishList())
  }, [])

  
  return (
    <div className="w-full mx-auto">
      <Banner />
      <BannerBottom />
      <div className="max-w-container mx-auto px-4">
        <Sale />
        <NewArrivals newArrivals={homePageData?.data?.NewArrivals}/>
        <BestSellers featuredProducts={homePageData?.data?.featuredProducts}/>
        <YearProduct />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Home;
