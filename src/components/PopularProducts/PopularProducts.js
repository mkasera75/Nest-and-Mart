import { useState,useEffect, useContext } from 'react';
import "./PopularProducts.css";

import ProductCard from '../ProductCards/ProductCard';
import updateData from '../../Helpers/PostAPI';
import { store } from '../../Helpers/store';
export default function PopularProducts(){
    const {category} = useContext(store);
    const [products,setProducts] = useState([]);
    // const [category,setCategory] = useState([]);
    const [toggleCategoryId,setToggleCategoryId] = useState(0);
    // useEffect(()=>{
    //     updateData.postRequest(toggleCategoryId!==0?{
            
    //         verticalid:toggleCategoryId,
    //         // verticalid:5,
    //         stateid:0
    //     }:{},"Get_All_Items").then((response)=>response.json().then((result)=>{setProducts(result.data); console.log(result.data)}))
        

    // },[toggleCategoryId])
    useEffect(()=>{
        updateData.postRequest(toggleCategoryId!==0?{
            
            verticalid:toggleCategoryId,
            // verticalid:5,
            stateid:0
        }:{},"Get_All_Items").then((response)=>response.json().then((result)=>{setProducts(result.data);console.log(result.data) }))
        
        // updateData.postRequest({catCount: "*"},"GetProductVertical")
        // .then((response)=>response.json()
        // .then((result)=>{
        //     // console.log(result.data)
        //     setCategory(result.data)
        //     }
        //  ));
    },[toggleCategoryId])
     let catList =  category.filter((x,i,a)=> (a.indexOf(x) == i))
     const filterList = (id)=>{console.log(id);
        setToggleCategoryId(parseInt(id))
    }
    return <div className="container mt-5 mb-3">
        <div className="title-category">
            <h1 className='col-md-4'>Popular Products</h1>
            <div className='category-name ms-auto'>
                <ul className='nav nav-pills'>
                    <li  className={toggleCategoryId==0? 'category-list nav-link active':'category-list nav-link'} onClick={()=>{filterList(0)}}>All</li>
                    {catList.slice(0,3
                ).map((list)=>{
                    return <li className={toggleCategoryId==list.fld_verticleid? 'category-list nav-link active':'category-list nav-link'} onClick={()=>{filterList(list.fld_verticleid)}}>{list.fld_verticlename}</li>
                    })}
                </ul>
            </div>
        </div>
        <div className="row mb-2">
            {products?.filter((filter)=> {
                if(filter.fld_verticalid === toggleCategoryId){
                return filter
                } 
                if(toggleCategoryId == 0)
                return filter
            }
                ).slice(0,12).map((product)=>{
                return <ProductCard img={product.VariantImage?.split("#")[0]} 
                                    discount={product.fld_discount_percent} 
                                    mrp={product.fld_mrp} 
                                    selling_price={product.fld_selling_price}
                                    category_name={product.fld_categoryname}
                                    item_name={product.fld_itemname}
                                    id={product.fld_variantid}
                                     />
            })}
            {/* <ProductCard /> */}
            {/* <Card style={{ width: '18rem' }} className='p-card-item'>
                <Card.Img variant="top" src="./images/cat-3.png" />
                <Card.Body>
                    <Card.Title>Snack</Card.Title>
                    <Card.Text>
                        <p>Some quick example text to build on the card title and make up the
                            bulk of the card's content.</p>
                    <p>By Nest Mart</p>
                    </Card.Text>
                    <div className='d-flex justify-content-between'>
                        <p>$28.85</p>
                    <Button variant="primary">Go somewhere</Button>
                    </div>
                    <Button variant="primary" className='p-card-btn'>Hot</Button>
                </Card.Body>
            </Card> */}
        </div>
    </div>
}