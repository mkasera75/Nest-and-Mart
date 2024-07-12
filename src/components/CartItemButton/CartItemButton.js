import "../CartItemButton/CartItemButton.css"
const CartItemButton = (props) => {
    console.log(props)
    return <div className="cart-quantities">
    <button
      class="btn quantity-button"
      type="button"
      id="button-addon1"
      onClick={()=>{props.removeItem(props.fld_variantid,props.fld_cart_id,props.fld_cart_dtl_id)}}
    >
      -
    </button>
    <input
      type="text"
      class="form-control quantity-inp"
      placeholder=""
      aria-label="Example text with button addon"
      aria-describedby="button-addon1"
      value={props.quantity}
    />
    <button
      class="btn quantity-button"
      type="button"
      id="button-addon1"
      onClick={()=>{props.addItem(props.fld_variantid)}}
    >
      +
    </button>
  </div>
}
export default CartItemButton;