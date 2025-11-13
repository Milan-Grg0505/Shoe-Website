import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Hero = () => {
  const [slides, setSlides] = useState([]);

  // Fetch Hero data from the backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/heroes'); // Adjust the URL as needed
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching Hero data:', error);
      }
    }; 

    fetchSlides();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
          
            modules={[Autoplay, Navigation]}
            className="mySwiper"
          >
            {slides.map((slide,index) => (
              <SwiperSlide key={index}>
                <div
                  className={`h-[calc(100vh-200px)] bg-cover bg-right bg-no-repeat flex justify-between items-center px-14 bg-[url('http://localhost:8000/${slide.image}')]`}
                  style={{
                    backgroundImage: `url('${'http://localhost:8000/' + slide.image.replace(/\\/g, '/')}')`,
                  }}
                >
                  <div className="text-white mt-5">
                    <p className="text-xl uppercase font-semibold">{slide.subTitle}</p>

                    <div className="mt-2 px-2">
                      <span className="block text-5xl font-normal mb-2 uppercase">{slide.title}</span>
                      <span className="text-sm">{slide.description}</span>
                    </div>

                    <div className="mt-8">
                      <a
                        href="#"
                        className="border py-[15px] px-[40px] rounded-2xl bg-white text-black hover:bg-black hover:text-white"
                      >
                        {slide.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="next-btn absolute top-1/2 -translate-y-1/2 right-3 bg-white h-10 w-10 text-black hover:bg-black hover:text-white flex items-center justify-center z-10 transition-all duration-300 cursor-pointer rounded-full">
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <div className="prev-btn absolute top-1/2 -translate-y-1/2 left-3 bg-white h-10 w-10 text-black hover:bg-black hover:text-white flex items-center justify-center z-10 transition-all duration-300 cursor-pointer rounded-full">
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Hero;

