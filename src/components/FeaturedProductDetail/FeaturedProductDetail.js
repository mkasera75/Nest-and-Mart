import { Link, useParams } from "react-router-dom";
import updateData from "../../Helpers/PostAPI";
import Card from "react-bootstrap/Card";
import "../FeaturedProductDetail/FeaturedProductDetail.css";
import { useEffect, useState, useSyncExternalStore } from "react";
const FeaturedProductDetail = () => {
  let params = useParams();
  const [featuredProduct, setFeaturedProduct] = useState([]);
  useEffect(() => {
    updateData
      .postRequest(
        {
          verticalid: params.productid,
          // verticalid:5,
          stateid: 0,
        },
        "Get_All_Items"
      )
      .then((response) =>
        response.json().then((result) => {
          setFeaturedProduct(result.data);
        })
      );
  }, []);
  console.log(params);

  return (
    <div className="container">
      <div className="row">
        {featuredProduct.slice(0, 12).map((product) => {
          return (
            <div className="col-lg-4">
              <Card className="p-card-items">
                <Link
                  to={`/product-detail/${product.fld_itemname
                    .replace(/\s/g, "-")
                    .toLowerCase()}/${product.fld_variantid}`}
                >
                  <div className="fpd-img">
                    <Card.Img
                      className="w-100 h-100"
                      variant="top"
                      src={product.VariantImage?.split("#")[0]}
                    />
                  </div>
                </Link>
                <Card.Body>
                  <Card.Title className="p-card-title">
                    {product.fld_categoryname}
                  </Card.Title>
                  <Card.Text>
                    <p className="p-card-desc">{product.fld_itemname}</p>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star-half-full checked"></span>
                    <span class="fa fa-star-o"></span>
                    <p className="p-card-company">
                      By <span>Nest Mart</span>
                    </p>
                  </Card.Text>
                  {/* <div className="d-flex justify-content-between">
          <p>
            <span
              style={{
                color: "rgb(108, 176, 106)",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              ${props.mrp}
            </span>
          </p>
          <Button
            className="p-cart-btn"
            onClick={() => {
              addToCart(props.id);
            }}
          >
            Add
            <FaCartPlus className="p-cart-icon" />
          </Button>
        </div> */}
                  {/* {props.discount > 0 && (
          <Button className="p-card-btn">-{props.discount}</Button>
        )} */}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FeaturedProductDetail;
