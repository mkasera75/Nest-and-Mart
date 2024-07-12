import { useState, useEffect, useContext } from "react";
import "./FeaturedCategories.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import updateData from "../../Helpers/PostAPI";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { store } from "../../Helpers/store";
import { Link } from "react-router-dom";
export default function FeaturedCategories() {
  const { category } = useContext(store);
  //   const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  //   const [searchCategory, setSearchCategory] = useState([]);
  //   useEffect(() => {
  //     updateData
  //       .postRequest({ catCount: "*" }, "GetProductVertical")
  //       .then((response) =>
  //         response.json().then((result) => {
  //           // console.log(result.data)
  //         //   setSearchCategory(result.data);
  //           setData(result.data);
  //         })
  //       );
  //   }, []);

  function searchData(e) {
    setSearchText(e.target.value.toLowerCase());
  }

  function searchItems() {
    // console.log("clicked");
    // console.log(searchText);
    // setSearchCategory(data.filter((dat)=>dat.fld_name.toLowerCase().includes(searchText)) );
    // console.log(searchCategory);
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="container mt-5 mb-3">
      <div className="title">
        <h1 className="col-md-4">Featured Categories</h1>
        <InputGroup className="">
          <Form.Control
            aria-label="Text input with 2 dropdown buttons"
            // onInputCapture={() => setSearchCategory(data)}
            placeholder="Search"
            value={searchText}
            onChange={(e) => searchData(e)}
          />
          {/* <Button variant="secondary" onClick={()=>searchItems()} >Search</Button> */}
        </InputGroup>
      </div>
      <div className="row mb-2">
        <Carousel
          responsive={responsive}
          swipeable={true}
          // draggable={true}
          showDots={false}
          autoPlay={false}
          autoPlaySpeed={1000}
          arrows={true}
          className="pb-4"
        >
          {category
            .filter((filter) => {
              if (filter.fld_name.toLowerCase().includes(searchText)) {
                return filter;
              }
              if (searchText === "") {
                return filter;
              }
            })
            .map((card) => {
              return (
                <div className="card d-flex text-center align-items-center rounded mb-2 mx-2 card-item">
                  <Link className="featured-category-link"
                    to={`/featuredproduct/${card.fld_verticlename
                      .replace(/\s/g, "-")
                      .toLowerCase()}/${card.fld_verticleid}`}
                  >
                    <img
                      className="card-img-top"
                      src={card.fld_image}
                      alt="Card image cap "
                      id="card-img"
                    />{" "}

                  <div className="card-body">
                    <h5 className="card-title">{card.fld_name}</h5>
                    <h6 className="">
                      {card.selected_cat_id ? card.selected_cat_id : 2}
                    </h6>
                  </div>
                  </Link>
                </div>
              );
            })}
        </Carousel>
      </div>
    </div>
  );
}
