import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './Slider.css'
import fetchData from '../../Helpers/GetAPI';
import { useState,useEffect } from 'react';
export default function Slider(){
  const [sliderData,setSliderData] = useState([]);
    useEffect(()=>{
        
            fetchData.getRequest("GetBannersV1").then((results) => {
                results.json().then((obj) => {
                    if (results.status == 200 || results.status == 201) {
                        // console.log(obj.data[0]);
                        setSliderData(obj.data);
                    }
                });
            });
    },[])
    return(
        <Swiper className='main-container-swiper'
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
    >
      {
        sliderData.map((slider)=>{
          return slider.location === "Main" &&
           <SwiperSlide className='sliders'><img src={slider.image.split("#")[0]} height={'50%'} width={'100%'}/>
          <div className='slider-image'>
            <p>{slider.title}</p>
              {/* <p className='slider-text'>Don't miss Amazing</p>
              <p className='slider-text'>Grocery deals</p>
              <h6 className='slider-discount'>Sign-up for the daily newsletter</h6> */}
          </div>
        </SwiperSlide>
        })
      }
    </Swiper>
    )
}