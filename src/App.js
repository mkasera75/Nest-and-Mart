import './App.css';
import {BrowserRouter,Route,Routes,Switch } from 'react-router-dom'
import Slider from './components/Slider/Slider';
import HomeComp from './components/Home/Home';
import Details from './components/Details/Details';
import FeaturedProductDetail from './components/FeaturedProductDetail/FeaturedProductDetail';
import  Provider from './Helpers/store.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import LoginPage from './components/LoginPage/LoginPage.js';
import Cart from './components/Cart/Cart.js';

function App() {
  return (<Provider>
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomeComp/>}/>
          <Route path="/pt/:productname" element={<Slider/>}/>
          <Route path="/product-detail/:productname/:productid" element={<Details/>}/>
          <Route path="/featuredproduct/:productlabel/:productid" element={<FeaturedProductDetail/>}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
