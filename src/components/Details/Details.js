import { useEffect, useState,useContext } from "react";
import updateData from "../../Helpers/PostAPI";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaCartPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import '../Details/Details.css';
import { store } from "../../Helpers/store";
// import {createDOMPurify} from 'dompurify';
import DOMPurify from "dompurify";
import moment from "moment";
const Details = () => {
  let params = useParams();
  // console.log(params);
  // const DOMPurify = createDOMPurify(window);
  const { setShow,setCartQuantity,cartQuantity,setCartData} = useContext(store);
  const login = localStorage.getItem("loginDetails");
  const loginDetails = JSON.parse(login);
  const order = localStorage.getItem("orderDetails");
  const orderDetails = JSON.parse(order);
  const [productDetail, setProductDetail] = useState([]);
  const [productImage,setProductImage] = useState(0);
  useEffect(() => {
    updateData
      .postRequest({ id: params.productid }, "GetProductByVariant")
      .then((response) =>
        response.json().then((result) => {
          console.log(result.data[0]);
          setProductDetail(result.data);
          // setProductImage(result.data[0].VariantImage.split("#"));

        })
      );
  }, [params.productid]);
  function cartDetails() {
    updateData
      .postRequest(
        {
          id: login == null ? null : loginDetails.fld_customerid,
          orderid: order ? orderDetails[0].order_id : null,
          // orderid:null
        },
        "GetCartWebsite"
      )
      .then((response) => {
        response.json().then((result) => {
          if (response.status == 200 || response.status == 201) {
            console.log(result.data)
            setCartData(result.data);
            setCartQuantity(result?.data.reduce((a,v)=>( a = a + v.fld_quantity),0))
              console.log(cartQuantity);

          }
          else{
            console.log("error");
          }
        });
      });
  }
  function addToCart(id) {
    console.log(id);
    if (!login) {
      setShow(true);
    } else {
      updateData
        .postRequest(
          {
            orderdate: moment().format("lll"),
            itemdetails: `
         [
         {
             "Item":${id},
             "Quantity":${1}
         }
         ]
         `,
            status: "INCART",
            customerid: login == null ? null : loginDetails.fld_customerid,
            createdon: moment().format("lll"),
            updatedon: moment().format("lll"),
            orderid: order ? orderDetails[0].order_id : null,
            // orderid:null,
            updatedby: login == null ? null : loginDetails.fld_customerid,
          },
          "AddToCartWebsite"
        )
        .then((response) =>
          response.json().then((result) => {
            // setProducts(result.data);
            if (response.status === 200 || response.status === 201) {
              localStorage.setItem("orderDetails", JSON.stringify(result.data));
              console.log(result.data);
              cartDetails();
            } else {
              console.log("error");
            }
          })
        );
    }
  }
//   console.log(params);
  return (
    <div className="container mt-5">
      {productDetail.map((detail) => {
        return (
          <div className="row justify-content-between">
            <div className="col-md-4">
              
              <img src={detail?.VariantImage?.split("#")[productImage]} alt="product-img" width={'500px'} height={'600px'} />
              <div className="row">
              {detail.VariantImage?.split("#").map((img,index)=>{
                return (<div className="col-3">
                
                <img src={img} alt="product-img" className="img-fluid" onClick={()=>{setProductImage(index)}} />
  
                  </div>)
              })}
                
              </div>
            </div>
            <div className="col-md-6">
              <p className="product-title">{detail.fld_categoryname}</p>
              <p className="p-card-description" >{detail.fld_itemname}</p>
              <p className="product-rating">{detail.avg_rating} <FaStar />{`(${detail.total_ratings} Reviews)`}</p>
              <p><span className="product-soldby">Sold By:</span> {detail.fld_manufacturedBy} <br/>
              <span className="product-soldby">Country of Origin:</span> {detail.fld_origin_country} 
              </p>
              <p></p>
              {console.log(detail.fld_long_description)}
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detail.fld_long_description) }} />
              <p className="product-price">&#8377;{detail.fld_mrp}.00</p>
              <Button
            className="p-cart-btn"
            onClick={() => {
              addToCart(detail.fld_variantid);
            }}
          >
            Add
            <FaCartPlus className="p-cart-icon" />
          </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Details;
