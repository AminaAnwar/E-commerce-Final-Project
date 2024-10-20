import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getProductsList} from "../../components/home/Products/productSlice"

const Shop = () => {
  const location = useLocation()
  const dispatch = useDispatch();


  const [itemsPerPage, setItemsPerPage] = useState(12);
  const {products} = useSelector(state => state.product)


  const [filters,setFilters] = useState({
    categoryId: location?.state?.category || '',
    minPrice: '',
    maxPrice: ''
  })

  useEffect(()=> {
    dispatch(getProductsList(filters))
  },[filters])


  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} products={products?.products || []}/>
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;
