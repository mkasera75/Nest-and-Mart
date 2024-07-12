import { createContext, useState } from "react";

export const store = createContext();

const Provider = ({ children }) => {
  const [test, setTest] = useState("test data");
  const [cartQuantity, setCartQuantity] = useState(0);
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [addressFormShow, setAddressFormShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  return (
    <store.Provider
      value={{
        cartQuantity,
        setCartQuantity,
        test,
        setTest,
        category,
        setCategory,
        show,
        setShow,
        showSignUp,
        setShowSignUp,
        cartData,
        setCartData,
        addressFormShow,
        setAddressFormShow,
        searchShow,
        setSearchShow,
      }}
    >
      {children}
    </store.Provider>
  );
};
export default Provider;
