import React from 'react';
import Slider from 'react-slick';

const AICarousel = () => {
  const images = [
    '/static/img/banner1.png',
    '/static/img/banner2.png',
    '/static/img/banner3.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '0px',marginTop:'20px' }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AICarousel;