import Cart from "../Cart/Cart";
import Slider from "../Slider/Slider.js";
import FeaturedCategories from "../FeaturedCategories/FeaturedCategories.js";
import ShopNow from "../ShopNow/ShopNow.js";
import PopularProducts from "../PopularProducts/PopularProducts.js";
import { useContext,useEffect } from "react";
import { store } from "../../Helpers/store.js";
import updateData from "../../Helpers/PostAPI.js";
export default function HomeComp() {
  //    const {test,setTest} = useContext(store);
  const { setCategory } = useContext(store);
  // console.log(useContext(store));
  useEffect(() => {
    updateData
      .postRequest({ catCount: "*" }, "GetProductVertical")
      .then((response) =>
        response.json().then((result) => {
          // console.log(result.data)
          // setSearchCategory(result.data)
          // setData(result.data)
          setCategory(result.data);
        })
      );
  }, []);
  return (
    <>
      <Slider />
      <FeaturedCategories />
      <ShopNow />
      <PopularProducts />
    </>
  );
}
