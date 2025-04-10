import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';


const testimonials = [
  {
    name: "Sandya Payala, Site Engineer at Tata Projects (2022)",
    videoUrl: "https://www.youtube.com/embed/P2apkll_c_Y",
    feedback: "I’m a Civil Engineering graduate, and after my family faced health issues, I became the sole provider. Balancing career pressures with family responsibilities was overwhelming",
  },
  {
    name: "Santosh Kumar, GET at Delta Electronics, Bangalore",
    videoUrl: "https://www.youtube.com/embed/3u1AyzthlZI",
    feedback: "Communication at UVCE Bangalore (2024 Batch). I was good in academics but struggled to crack interviews due to lack of communication skills and technical knowledge. Then I found Legacy Aye, which helped me upskill ",
  },
  {
    name: "Shivani gupta, Marketing Strategist at Deloitte ",
    videoUrl: "https://www.youtube.com/embed/2ZsGEgVrAEc",
    feedback: "I’m an MBA graduate in Marketing, and after completing my MBA, I felt uncertain about my career direction. The pressure to find the 'perfect' job left me anxious, and I struggled with low confidence for almost 6 months. ",
  },
  {
    name: "Sanika, Associate Software Engineer",
    videoUrl: "https://www.youtube.com/embed/VVvo9Xn1gTk",
    feedback: "As a BSc graduate, I felt frustrated and unsure about my future, constantly questioning myself. Today, my life has transformed from frustration to confidence because I joined Legacy Aye. It guided me towards success.",
  },
];

const VideoTestimonials = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Student Video Testimonials</h2>
      <Swiper
     modules={[Navigation, Pagination]}
     // navigation
     pagination={{ clickable: true }}
     spaceBetween={24}
     loop={true}
     breakpoints={{
       320: {
         slidesPerView: 1, // For mobile
       },
       768: {
         slidesPerView: 2, // For tablets and medium devices
       },
       1024: {
         slidesPerView: 2, // For large devices
       },
     }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="card shadow-lg border-0">
            <iframe
              className="card-img-top"
              width="100%"
              height="400"
              src={testimonial.videoUrl}
              title={`Testimonial from ${testimonial.name}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{testimonial.name}</h5>
                <p className="card-text">{testimonial.feedback}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoTestimonials;
