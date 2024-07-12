import "../Cart/Cart.css";
import { ImBin } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useContext, useEffect,useState } from "react";
import { store } from "../../Helpers/store";
import { FaLocationDot } from "react-icons/fa6";
import AddressForm from "../AddressForm/AddressForm";
import updateData from "../../Helpers/PostAPI";
import moment from "moment";
const Cart = () => {
  const { cartQuantity, setCartQuantity, cartData, setCartData,addressFormShow,setAddressFormShow } =
    useContext(store);
    const customerDetail = localStorage.getItem("loginDetails");
    const customer = JSON.parse(customerDetail);
    const order = localStorage.getItem("orderDetails");
    const orderDetails = JSON.parse(order);
    const [address,setAddress] = useState([]);
    useEffect(()=>{
      cartDetails();
      updateData.postRequest({whereClause: `where fld_customerid = ${customer.fld_customerid}`},
      "GetCustomerAddress").then((result)=>result.json().then((obj)=>{
        console.log(obj.data[0]);
        setAddress(obj.data);
      }))
    },[])
    function cartDetails() {
      updateData
        .postRequest(
          {
            id: customer == null ? null : customer.fld_customerid,
            orderid: order ? orderDetails[0].order_id : null,
          },
          "GetCartWebsite"
        )
        .then((response) => {
          response.json().then((result) => {
            if (response.status == 200 || response.status == 201) {
              // console.log(result.data)
              setCartData(result.data);
              setCartQuantity(result?.data.reduce((a,v)=>( a = a + v.fld_quantity),0))
                // console.log(cartQuantity);
                setCartData(result.data)
                if(result.data.length == 0){
                  localStorage.removeItem("orderDetails");
                }
            }
            else{
              console.log("error");
            }
          });
        });
    }
    const addItem = (id)=>{
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
            customerid: customer == null ? null : customer.fld_customerid,
            createdon: moment().format("lll"),
            updatedon: moment().format("lll"),
            orderid: order ? orderDetails[0].order_id : null,
            updatedby: customer == null ? null : customer.fld_customerid,
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
    const removeItem = (id,cart_id,cart_dlt_id)=>{
      if(cartQuantity == 1){
        updateData.postRequest({
          cartID:cart_id,
          cartlineid:cart_dlt_id,
          customerid:customer == null ? null : customer.fld_customerid,
          stateid:null
        },"DeleteCart").then((response)=>{
          response.json().then((result)=>{
            console.log(result)
            if(response.ok){
              cartDetails();
            }
          })
        })
      }
      else{
        updateData
        .postRequest(
          {
            orderdate: moment().format("lll"),
            itemdetails: `
         [
         {
             "Item":${id},
             "Quantity":${-1}
         }
         ]
         `,
            status: "INCART",
            customerid: customer == null ? null : customer.fld_customerid,
            createdon: moment().format("lll"),
            updatedon: moment().format("lll"),
            orderid: order ? orderDetails[0].order_id : null,
            updatedby: customer == null ? null : customer.fld_customerid,
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
    function deleteItem(cart_id,cart_dlt_id){
      updateData.postRequest({
        cartID:cart_id,
        cartlineid:cart_dlt_id,
        customerid:customer == null ? null : customer.fld_customerid,
        stateid:null
      },"DeleteCart").then((response)=>{
        response.json().then((result)=>{
          console.log(result)
          if(response.ok){
            cartDetails();
          }
        })
      })
    }
  return (
    <>
    {console.log(cartQuantity)}
    <AddressForm />
      <div className="row mt-3">
        <p className="cart-title">Shopping Cart</p>
      </div>
      <div className="row m-2">
        <div className="col-lg-8 border">
          {console.log(cartData)}
          {cartData.map((data) => {
            return (
              <div className="row border-bottom rounded m-2 cart-page">
                <div className="col-12 col-md-4 p-2 w-100 d-flex justify-content-between align-items-center">
                  <div className="border rounded">
                    <img
                      src={data.VariantImage.split("#")[0]}
                      className="img-fluid"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <p className="mb-0 pb-0">{data.fld_itemname}</p>
                    <p className="mb-0 pb-0">
                      <FaStar className="checked" />
                      <FaStar className="checked" />
                      <FaStar className="checked" />
                      <FaStar className="checked" />
                      <FaStarHalfAlt className="checked" />
                    </p>
                  </div>
                  <div>&#8377;{data.Basevalue}</div>
                  <div>
                    <div className="cart-quantity">
                      <button
                        class="btn quantity-btn"
                        type="button"
                        id="button-addon1"
                        onClick={()=>{removeItem(data.fld_variantid,data.fld_cart_id,data.fld_cart_dtl_id)}}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="form-control quantity-input "
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        value={data.fld_quantity}
                      />
                      <button
                        class="btn quantity-btn"
                        type="button"
                        id="button-addon1"
                        onClick={()=>{addItem(data.fld_variantid)}}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div onClick={()=>deleteItem(data.fld_cart_id,data.fld_cart_dtl_id)}>
                    <ImBin />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-lg-3 ms-3">
          <div className="row ">
            {console.log(cartData[0]?.Basevalue)}
            <div className="col-12  w-100 d-flex flex-column align-items-around justify-content-between p-0 m-0 border ">
              <div className="d-flex justify-content-between align-items-center border m-2">
                <p className="fs-4 text-secondary p-2">SubTotal:</p>
                <p className="p-2">{cartData[0]?.fld_total_net_amount}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center border m-2">
                <p className="fs-4 text-secondary p-2">Offer Discount:</p>
                <p className="p-2">{cartData[0]?.offer_discount === null ? 0 : cartData[0]?.offer_discount}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center border m-2">
                <p className="fs-4 text-secondary p-2">Coupon Discount:</p>
                <p className="p-2">{cartData[0]?.line_coupon_discount == null? 0:cartData[0]?.line_coupon_discount}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center border m-2">
                <p className="fs-4 text-secondary p-2">Delivery Charge:</p>
                <p className="p-2">0</p>
              </div>
              <div className="d-flex justify-content-between align-items-center border m-2">
                <p className="fs-4 text-secondary p-2">GST:</p>
                <p className="p-2">{cartData[0]?.fld_total_gst}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center border m-2">
                <p className="fs-4 text-secondary p-2">Total:</p>
                <p className="p-2">{cartData[0]?.fld_cart_amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ms-1 col-md-10 p-2 mb-2 mt-2">
        <div className="row">
          <p className="cart-title fs-2 d-flex align-items-center">
            <FaLocationDot />
            Address
          </p>
        </div>
        <div className="row mb-2 border-top border-bottom pe-0 p-2">
          <div className="col-12 text-end pe-0">
            <button className="w-25 address-btn" onClick={()=>{setAddressFormShow(true)}}>Add Address</button>
          </div>
        </div>
        {address.map((add)=>{
          return(
          <div className="row address col-md-4 m-2">
          <div className="col-md-1"> 
            <p>
              <input type="checkbox" />
            </p>
          </div>
          <div className="col-md-5"> 
            <p>{add.fld_address_1}</p>
            <p>{add.fld_address_2}</p>
            <p>{add.CityName} {add.StateName} {add.fld_pincode}</p>
          </div>
        </div>)
        })}
      </div>
    </>
  );
};

export default Cart;
