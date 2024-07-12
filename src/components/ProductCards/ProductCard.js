import { useContext } from "react";
import "./ProductCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { store } from "../../Helpers/store";
import updateData from "../../Helpers/PostAPI";
import moment from "moment";
import CartItemButton from "../CartItemButton/CartItemButton";
const ProductCard = (props) => {
  const { setShow, setCartQuantity, cartQuantity, cartData, setCartData } =
    useContext(store);
  const login = localStorage.getItem("loginDetails");
  const loginDetails = JSON.parse(login);
  const order = localStorage.getItem("orderDetails");
  const orderDetails = JSON.parse(order);
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
            // console.log(result.data);
            setCartData(result.data);
            setCartQuantity(
              result?.data.reduce((a, v) => (a = a + v.fld_quantity), 0)
            );
            // console.log(cartQuantity);
          } else {
            console.log("error");
          }
        });
      });
  }
  function addToCart(id) {
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
              // console.log(result.data);
              cartDetails();
            } else {
              console.log("error");
            }
          })
        );
    }
  }
  const addItem = (id) => {
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
          updatedby: login == null ? null : loginDetails.fld_customerid,
        },
        "AddToCartWebsite"
      )
      .then((response) =>
        response.json().then((result) => {
          // setProducts(result.data);
          if (response.status === 200 || response.status === 201) {
            localStorage.setItem("orderDetails", JSON.stringify(result.data));
            // console.log(result.data);
            cartDetails();
          } else {
            console.log("error");
          }
        })
      );
  };
  const removeItem = (id, cart_id, cart_dlt_id) => {
    if (cartQuantity == 1) {
      updateData
        .postRequest(
          {
            cartID: cart_id,
            cartlineid: cart_dlt_id,
            customerid: login == null ? null : loginDetails.fld_customerid,
            stateid: null,
          },
          "DeleteCart"
        )
        .then((response) => {
          response.json().then((result) => {
            // console.log(result);
            if (response.ok) {
              cartDetails();
            }
          });
        });
    } else {
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
            customerid: login == null ? null : loginDetails.fld_customerid,
            createdon: moment().format("lll"),
            updatedon: moment().format("lll"),
            orderid: order ? orderDetails[0].order_id : null,
            updatedby: login == null ? null : loginDetails.fld_customerid,
          },
          "AddToCartWebsite"
        )
        .then((response) =>
          response.json().then((result) => {
            // setProducts(result.data);
            if (response.status === 200 || response.status === 201) {
              localStorage.setItem("orderDetails", JSON.stringify(result.data));
              // console.log(result.data);
              cartDetails();
            } else {
              console.log("error");
            }
          })
        );
    }
  };

  let cartItem = cartData.find((find) => find.fld_variantid === props.id);
  // console.log(cartItem);
  return (
    <Card style={{ width: "18rem" }} className="p-card-item">
      <div className="h-75">
        <Link
          to={`/product-detail/${props.item_name
            .replace(/\s/g, "-")
            .toLowerCase()}/${props.id}`}
        >
          <Card.Img className="w-100 h-100" variant="top" src={props.img} />
        </Link>
      </div>
      <Card.Body>
        <Card.Title className="p-card-title">{props.category_name}</Card.Title>
        <Card.Text>
          <p className="p-card-desc">{props.item_name}</p>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half-full checked"></span>
          <span class="fa fa-star-o"></span>
          <p className="p-card-company">
            By <span>Nest Mart</span>
          </p>
        </Card.Text>
        <div className="d-flex justify-content-between">
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
          {cartItem ? (
            <CartItemButton
              {...cartItem}
              quantity={cartItem?.fld_quantity}
              fld_variantid={cartItem.fld_variantid}
              fld_cart_id={cartItem.fld_cart_id}
              fld_cart_dtl_id={cartItem.fld_cart_dtl_id}
              addItem={addItem}
              removeItem={removeItem}
            />
          ) : (
            <Button
              className="p-cart-btn"
              onClick={() => {
                addToCart(props.id);
              }}
            >
              Add
              <FaCartPlus className="p-cart-icon" />
            </Button>
          )}
        </div>
        {props.discount > 0 && (
          <Button className="p-card-btn">-{props.discount}</Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default ProductCard;
