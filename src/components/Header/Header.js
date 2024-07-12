import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { PiSquaresFourBold } from "react-icons/pi";
import { BsFire } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import updateData from "../../Helpers/PostAPI";
import { IoLocationOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import fetchData from "../../Helpers/GetAPI";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { store } from "../../Helpers/store";
import LoginPage from "../LoginPage/LoginPage";
import SignUp from "../SignUp/SignUp";
import { Link, useNavigate } from "react-router-dom";
import CartItemButton from "../CartItemButton/CartItemButton";
export default function Header() {
  const {
    setShow,
    setShowSignUp,
    cartQuantity,
    setCartQuantity,
    cartData,
    setCartData,
    searchShow,setSearchShow
  } = useContext(store);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState([]);
  const [scroll, setScroll] = useState(false);
  const login = localStorage.getItem("loginDetails");
  const loginDetails = JSON.parse(login);
  const order = localStorage.getItem("orderDetails");
  const orderDetails = JSON.parse(order);
  const navigate = useNavigate();
  function cartDetails() {
    updateData
      .postRequest(
        {
          id: login == null ? null : loginDetails.fld_customerid,
          orderid: order ? orderDetails[0].order_id : null,
          // orderid: null,
        },
        "GetCartWebsite"
      )
      .then((response) => {
        response.json().then((result) => {
          if (response.status == 200 || response.status == 201) {
            console.log(result.data);
            setCartData(result.data);
            setCartQuantity(
              result?.data.reduce((a, v) => (a = a + v.fld_quantity), 0)
            );
          } else {
            console.log("error");
          }
        });
      });
  }
  function settingSearchDisplay(e){
    console.log(e.target)
  }
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 40);
    });
    cartDetails();
  }, []);
  let navMenu;
  function searchData(e) {
    // console.log(e.target.value);

    setSearchText(e.target.value.toLowerCase());
    setSearchShow(true)
    // data.filter((d)=>d.fld_variantname.toLowerCase() === e.target.value.toLowerCase())
  }
  useEffect(() => {
    updateData
      .postRequest(
        {
          variantName: "",
        },
        "SearchVariantByProduct"
      )
      .then((result) =>
        result.json().then((obj) => {
          console.log(obj.data);
          setData(obj.data);
        })
      );
    fetchData.getRequest("GetSiteSettingsV1").then((response) =>
      response.json().then((result) => {
        console.log(result.data);
        setMenu(result.data);
      })
    );
  }, []);
  if (menu?.length > 0) {
    navMenu = JSON.parse(menu[0].site_header);
    // console.log(navMenu.menu[0].subMenu);
  }

  const handleClearSearch = ()=> {
    setSearchShow(false)
    setSearchText("")
  }

  return (
    <div className="header">
      <LoginPage />
      <SignUp />
      <div className="header-top">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid className="m-0 p-0 nav-container">
            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
            <Nav className="">
              <Nav.Link href="#aboutus" className="nav-item">
                About Us
              </Nav.Link>
              <Nav.Link href="#myaccount" className="nav-item">
                My Account
              </Nav.Link>
              <Nav.Link href="#wishlist" className="nav-item">
                Wishlist
              </Nav.Link>
              <Nav.Link href="#order" className="nav-item">
                Order Tracking
              </Nav.Link>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home" className="nav-item">
                  Need Help? Call Us:{" "}
                  <span style={{ color: "#6cb06a" }}>+1800 900</span>
                </Nav.Link>
                <NavDropdown
                  title="English"
                  id="basic-nav-dropdown"
                  className="nav-item"
                >
                  <NavDropdown.Item href="#action/3.1">
                    <img src="./images/flag-fr.png" className="flag-img" />
                    French
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <img src="./images/flag-dt.png" className="flag-img" />
                    Dutch
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    <img src="./images/flag-ru.png" className="flag-img" />
                    Russia
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="USD" id="basic-nav-dropdown" className="usd-menu">
                  <NavDropdown.Item href="#action/3.1">
                    <img src="./images/flag-fr.png" className="flag-img" />
                    FRF
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <img src="./images/flag-dt.png" className="flag-img" />
                    EUR
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    <img src="./images/flag-ru.png" className="flag-img" />
                    RUB
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="header-middle">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid className="d-block">
            <Row className="d-flex">
              <Col md={2}>
                <Navbar.Brand href="">
                  <Link to={"/"}>
                    <img src="/images/logo.svg" alt="" />
                  </Link>
                </Navbar.Brand>
              </Col>
              <Col md={7} className="mt-2 me-auto">
                <InputGroup variant="outline-success" className="search-input">
                  <DropdownButton
                    variant="none"
                    title="All Categories"
                    id="input-group-dropdown-3"
                    className="all-categories"
                  >
                    {navMenu?.menu[0]?.subMenu?.slice(0, 10).map((submenu) => {
                      return (
                        <Dropdown.Item
                          href={`/featuredproduct/${submenu.label
                            .replace(/\s/g, "-")
                            .toLowerCase()}/${submenu.id}`}
                        >
                          {submenu.label}
                        </Dropdown.Item>
                      );
                    })}
                    {/* <Dropdown.Item href="/pt/test">Milk & Dairy</Dropdown.Item>
                    <Dropdown.Item href="#">Wine and Alcohol</Dropdown.Item>
                    <Dropdown.Item href="#">Clothing and Beauty</Dropdown.Item>
                    <Dropdown.Item href="#">Vegetables</Dropdown.Item>
                    <Dropdown.Item href="#">Baking Materials</Dropdown.Item>
                    <Dropdown.Item href="#">Fresh Seafood</Dropdown.Item> */}
                  </DropdownButton>
                  <div>
                  <Form.Control
                    aria-label="Text input with 2 dropdown buttons"
                    placeholder="Search"
                    id="search-bar"
                    value={searchText}
                    onChange={(e) => {searchData(e)
                      // !searchText && setSearchShow(true);
                    }
                    }
                    
                    // onFocus={()=>setSearchShow(true)}
                    // onBlur={()=>setSearchShow(false)}
                  />
                   <div className={searchShow?"search-div":"search-div-hidden"} onMouseLeave={()=>handleClearSearch()}>
                    {searchText !== "" && (
                      <div>
                        {data
                          .filter((filter) =>
                            filter.fld_variantname
                              .toLowerCase()
                              .includes(searchText)
                          )
                          .map((data1) => {
                            return (
                              <>
                                <div className="row searchText-div">
                                  <Link className="row text-dark text-decoration-none"
                                    to={`/product-detail/${data1.fld_itemname}/${data1.fld_variantid}`}
                                    onClick={()=>{handleClearSearch()}}
                                  >
                                  <div className="col-md-1">
                                    <img
                                      src={data1.fld_imageurl}
                                      width={50}
                                      height={50}
                                      className="searchText-img"
                                      alt={data1.fld_itemname}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <h6 className="searchText-p">
                                      <span>{data1.fld_categoryname}</span>
                                      <span>{data1.fld_itemname}</span>
                                    </h6>
                                  </div>
                                  </Link>
                                </div>
                                {/* {data1.fld_variantname} */}
                              </>
                            );
                          })}
                      </div>
                    )}
                  </div>
                  </div>
                  <Button variant="" id="search-btn">
                    <FaMagnifyingGlass />
                  </Button>
                </InputGroup>
              </Col>
              <Col
                md={2}
                className="d-flex justify-content-around align-items-around ms-auto mt-2"
              >
                <Dropdown
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <Dropdown.Toggle id="dropdown-basic" className="me-3 d-flex">
                    <div className="cart">
                      <FaShoppingCart className="cart-img" />
                      <span className="badge cart-item">{cartQuantity}</span>
                    </div>
                    <span className="ms-1">Cart</span>
                  </Dropdown.Toggle>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" className="me-3 d-flex">
                    <div className="cart">
                      <IoPersonOutline className="cart-img" />
                      <span className="badge badge-secondary cart-item">1</span>
                    </div>
                    <span className="ms-1">Account</span>
                  </Dropdown.Toggle>
                  {!JSON.parse(localStorage.getItem("loginDetails")) ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <IoPersonOutline className="flag-img" />
                        Login
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setShowSignUp(true);
                        }}
                      >
                        <IoPersonOutline className="flag-img" />
                        Sign Up
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <IoPersonOutline className="flag-img" />
                        Account
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        <IoLocationOutline className="flag-img" />
                        Order Tracking
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <CiHeart className="flag-img" />
                        Wishlist
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <VscSettings className="flag-img" />
                        Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          localStorage.removeItem("loginDetails");
                        }}
                      >
                        <VscSettings className="flag-img" />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </div>

      <div
        className={
          scroll ? "header-bottom header-bottom-on-scroll " : "header-bottom"
        }
      >
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid className="browse-category">
            <Dropdown className="">
              <Dropdown.Toggle id="bottom-dropdown" variant="outline-success">
                <PiSquaresFourBold className="bold-four" />
                Browse Categories
              </Dropdown.Toggle>

              <Dropdown.Menu className="browse-category">
                {navMenu?.menu[0]?.subMenu?.slice(0, 10).map((submenu) => {
                  return (
                    <Dropdown.Item
                      href={`/featuredproduct/${submenu.label
                        .replace(/\s/g, "-")
                        .toLowerCase()}/${submenu.id}`}
                      className="border category-item"
                    >
                      <img src={submenu.image} />
                      {submenu.label}
                    </Dropdown.Item>
                  );
                })}
                {/* <Dropdown.Item
                  href="#/action-1"
                  className="border category-item"
                >
                  <img src={milkSvg} />
                  Milk & Dairy
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  className=" border category-item "
                >
                  {" "}
                  <img src={clothSvg} />
                  Clothing & Beauty
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  className="border  category-item"
                >
                  <img src={petSvg} />
                  Pet Food & Toy
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  className="border  category-item"
                >
                  <img src={drinkSvg} />
                  Wine & Drinks
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  className="border category-item"
                >
                  <img src={fruitSvg} />
                  Fresh Fruits
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  className="border  category-item"
                >
                  <img src={fruitSvg} />
                  Fresh Fruits
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <Navbar.Toggle aria-controls="basic-navbar-nav1" />
            <Navbar.Collapse id="basic-navbar-nav1">
              {/* <Nav.Link href="#home" className="deal-nav-link">
                  <BsFire />
                  Deal
                </Nav.Link> */}
              <Nav className="bottom-navbar">
                {navMenu?.menu[0]?.subMenu?.slice(0, 4).map((submenu) => {
                  return submenu.subcategories.length > 1 ? (
                    <NavDropdown title={submenu.label} id="basic-nav-dropdown">
                      {submenu.subcategories.map((category) => {
                        return (
                          <NavDropdown.Item
                            href={`/featuredproduct/${category.label1
                              .replace(/\s/g, "-")
                              .toLowerCase()}/${category.id}`}
                          >
                            {category.label1}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  ) : (
                    <Nav.Link
                      href={`/featuredproduct/${submenu.label
                        .replace(/\s/g, "-")
                        .toLowerCase()}/${submenu.id}`}
                    >
                      {submenu.label}
                    </Nav.Link>
                  );
                })}

                <Nav.Link href="#link" id="contact-us-link">
                  <TfiHeadphoneAlt id="contact-us-img" />
                  <h6 id="contact-us">
                    <span style={{ color: "#6cb06a", fontSize: "1.5rem" }}>
                      1900-888
                    </span>
                    <span>24/7 Support Center </span>
                  </h6>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
