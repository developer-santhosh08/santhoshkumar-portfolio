import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      img: '/img/testi-1.jpg',
      text: '"This has been one of the best Customer Support experiences I have ever had. The design of the theme also, AMAZING! Thank you so much for all your help DynamicLayers!"',
      name: 'Kyle Frederick',
      company: 'Envato.INC',
    },
    {
      img: '/img/testi-2.jpg',
      text: '"This has been one of the best Customer Support experiences I have ever had. The design of the theme also, AMAZING! Thank you so much for all your help DynamicLayers!"',
      name: 'José Carpio',
      company: 'Google.ORG',
    },
    {
      img: '/img/testi-3.jpg',
      text: '"This has been one of the best Customer Support experiences I have ever had. The design of the theme also, AMAZING! Thank you so much for all your help DynamicLayers!"',
      name: 'Melania Rose',
      company: 'Themeforest.CO',
    },
  ];

  return (
    <section id="reviews" className="testimonial-section section-padding bd-bottom" data-scroll-index="6">
      <div className="container">
        <div className="section-heading mb-40 text-center wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1000ms">
          <h2>Clients Reviews</h2>
        </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          id="testimonial-carousel"
          className="testimonial-carousel owl-carousel"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-item">
                <div className="testimonial-innter">
                  <div className="testi-thumb">
                    <img src={review.img} alt="img" />
                  </div>
                  <div className="testi-content">
                    <p>{review.text}</p>
                    <h4>{review.name} <span>{review.company}</span></h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
