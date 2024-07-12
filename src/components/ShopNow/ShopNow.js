import { useEffect,useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import fetchData from '../../Helpers/GetAPI';
import './Shopnow.css'
function ShopNow() {
    const [shopData,setShopData] = useState([]);
    useEffect(()=>{
        fetchData.getRequest('GetBannersV1').then((response)=>response.json().then((result)=>{
        setShopData(result.data)}))
    },[])
  return (
    <div className='container d-flex mb-2'>
       {
        shopData.map((data)=>{ return data.location === "bottom" && 
            <Card style={{ width: '18rem' }} className='s-card-item'>
                    <Card.Img variant="top" src={data.image.split("#")[0]} />
                    <Button  className='card-btn'>Hot</Button>
            </Card>
  
       })
       } 
    </div>
     
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant="top" src="holder.js/100px180" />
    //   <Card.Body>
    //     <Card.Title>Card Title</Card.Title>
    //     <Card.Text>
    //       Some quick example text to build on the card title and make up the
    //       bulk of the card's content.
    //     </Card.Text>
    //     <Button variant="primary">Go somewhere</Button>
    //   </Card.Body>
    // </Card>
  );
}

export default ShopNow;