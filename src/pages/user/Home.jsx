import React, { useEffect, useState } from "react";
 
 
 
import Form from "../../components/ModelForm";
import { FaStopwatch, FaLaptopCode,   FaBriefcase, FaArrowRight, FaCartPlus, FaAward, FaMedal, FaDoorOpen } from "react-icons/fa";
import { FaCertificate, FaPenAlt, FaUsers, FaCheckCircle } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Modal, Tooltip } from "antd";
import { Tabs, Collapse } from "antd";


import Form1 from "../../components/Form";
import { useSelector } from "react-redux";
import { useAddToWishlistMutation } from "../../redux/services/wishListApi";
import Certificate from "../../components/Certificate";
import Reviews from "../../components/Reviews";
import BannerSection from "../../components/Banner";
import CategoriesSection from "../../components/CategoriesSection";
import Banner2 from "../../components/Banner2";
import LearningPrograms from "../../components/Programs";
import BenefitsSection from "../../components/BenifitSection";
import Courses from "../../components/Courses";
import CompanyLogos from "../../components/Logos";
import PlacedStudents from "../../components/PlacedStudents";
import Aluminies from "../../components/Aluminises";
import WhyChooseUs from "../../components/WhyChooseUs";
import VideoTestimonials from "../../components/VideoSuccessStories";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const Home = () => {

  const [addtoCart,{data,isLoading:addtoCartLoading}]=useAddToWishlistMutation()
  const [isModalVisible, setIsModalVisible] = useState(false);
const student =useSelector(state=>state.student.student)
const faqData = {
  general: [
    {
      question: "Can I interact with instructors during the course?",
      answer:
        "Of course! At Legacy Aye, we believe that learning is most effective when it's interactive. You’ll have plenty of opportunities to connect with your instructors — whether it’s during live sessions, after class, or through one-on-one Q&A. Our goal is to make sure you're never stuck and always supported in your learning journey.",
    },
    {
      question: "Are there assessments or exams in the courses?",
      answer:
        "Yes, we’ve designed assessments to help you truly understand and apply what you’re learning. These could be weekly tasks, projects, or quizzes that reinforce the skills you’ve gained. Our assessments aren’t just about grades — they’re designed to make sure you’re getting the most out of each module and are well-prepared for real-world challenges.",
    },
    {
      question: "Will I receive personalized feedback on assignments or projects?",
      answer:
        "Absolutely! After completing your assignments or projects, our experienced mentors will provide you with detailed, personalized feedback, helping you understand your strengths and areas for improvement.",
    },
    {
      question: "Are there opportunities for career development during the courses?",
      answer:
        "Yes! Legacy Aye isn’t just about learning — it’s about launching your career. After completing your course, you’ll have access to career development support for up to two years. High-performing students may even be eligible for stipend-based internships.",
    },
    {
      question: "Can I enroll in multiple courses at the same time?",
      answer:
        "Yes, you can enroll in multiple courses simultaneously, depending on your schedule and learning capacity. However, we recommend focusing on one course at a time to maximize learning outcomes.",
    },
  ],
  payments: [
    {
      question: "How can I make a payment?",
      answer:
        "At Legacy Aye, we offer multiple secure payment options for your convenience, including credit/debit cards (Visa, MasterCard, American Express), PayPal, and more. All transactions are processed through our secure payment gateway to ensure your personal and financial information is protected.",
    },
    {
      question: "Are installment plans available?",
      answer:
        "Yes, we offer installment plans for many of our courses. You can spread your payments over several months. During checkout, you can review the available payment plans.",
    },
    {
      question: "Is financial aid or scholarships offered?",
      answer:
        "Yes, we offer scholarships of up to 100% based on our Scholarship Exam results. Visit the Homepage and complete the Scholarship Application Form to apply.",
    },
  ],
  support: [
    {
      question: "Is technical support available?",
      answer:
        "Absolutely. Our technical support team is available to assist you with any platform-related issues. You can reach out via the Support page or email support@legacyaye.com.",
    },
    {
      question: "How can I contact the course instructor?",
      answer:
        "You can contact your course instructor through the Course Dashboard, where you’ll find a messaging system for direct communication.",
    },
  ],
  enrollment: [
    {
      question: "How can I apply for the programs offered by Legacy Aye?",
      answer:
        "Visit our website, select the program that fits your goals, complete the registration form, and make the payment. You’ll receive an email with instructions after enrollment.",
    },
    {
      question: "Can I join a course if I have no prior experience?",
      answer:
        "Yes! We offer programs suitable for all levels, whether you're a beginner or looking to upskill in your field.",
    },
    {
      question: "How long are the courses, and can I study at my own pace?",
      answer:
        "The duration varies by program, but we offer flexible options like Self-Learning Programs and fixed durations for bootcamps and technical training.",
    },
    {
      question: "What do I get after completing the course?",
      answer:
        "You’ll receive a certificate recognized by industry leaders, and for certain programs, you'll also gain internship opportunities and personalized job placement assistance.",
    },
  ],
};
 

 
 
  return (
<main className="main-area fix">
 

  <BannerSection/>
  <CategoriesSection/>
  {/* <div className="container my-5">
      <div className="row text-center">
        {highlights.map((highlight, index) => (
          <div key={index} className="col-md-3 col-6 mb-4">
            <div>
              {highlight.icon}
              <p className="mt-2">{highlight.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div> */}
<Banner2/>
     <LearningPrograms/>
 <CompanyLogos/>

     <BenefitsSection/>
    {/* <div className="container my-5 p-3 rounded" style={{backgroundImage:"url(/images/b4.png)",backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      <h2 className="text-center text-white fw-bold ">
        The All New Self Learning launched to
      </h2>
      <h3 className="text-center text-white fw-bold mb-4">
        <u>Supercharge Your Career</u>
      </h3>
      <div className="row justify-content-center">
  {features.map((feature, index) => (
    <div
      key={index}
      className="col-lg-6 col-md-6 col-sm-12 mb-4"
    >
      <div className="card shadow-sm h-100">
        <div className="card-body text-center">
          <div className="d-flex flex-column align-items-center">
            <div className="icon-container mb-3">{feature.icon}</div>
            <h5 className="card-title fw-bold">{feature.title}</h5>
            <p className="card-text text-muted">{feature.description}</p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div> */}
  <section className="about-area tg-motion-effects section-py-120">
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-6 col-md-9">
          <div className="about__images">
            <img
              src="/images/intructor_two02.png"
              alt="img"
              className="main-img"
            />
           
           
            <div
              className="about__enrolled"
              data-aos="fade-right"
              data-aos-delay={200}
            >
              <p className="title">
                <span>36K+</span> Enrolled Students
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about__content">
            <div className="section__title">
              <span className="sub-title">Get More About Us</span>
              <h2 className="title">
                Thousand Of Top
                <span className="position-relative">
                  <svg
                    x="0px"
                    y="0px"
                    preserveAspectRatio="none"
                    viewBox="0 0 209 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565"
                      fill="currentcolor"
                    />
                  </svg>
                  Courses
                </span>
                Now in One Place
              </h2>
            </div>
            <p className="desc">
              Groove’s intuitive shared inbox makes it easy for team members to
              organize, prioritize and.In this episode of the Smashing Pod we’re
              talking about Web Platform Baseline.
            </p>
            <ul className="about__info-list list-wrap">
              <li className="about__info-list-item">
                <i className="flaticon-angle-right" />
                <p className="content">The Most World Class Instructors</p>
              </li>
              <li className="about__info-list-item">
                <i className="flaticon-angle-right" />
                <p className="content">Access Your Class anywhere</p>
              </li>
              <li className="about__info-list-item">
                <i className="flaticon-angle-right" />
                <p className="content">Flexible Course Plan</p>
              </li>
            </ul>
            <div className="tg-button-wrap">
              <a onClick={()=>setIsModalVisible(true)} className="btn arrow-btn btn-primary">
                Start Free Trial{" "}
               <FaArrowRight/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 <Aluminies/>
{/* <Courses/> */}
<WhyChooseUs/>
 
 <PlacedStudents/>
 <VideoTestimonials/>
  <section className="fact__area">
    <div className="container">
      <div className="fact__inner-wrap">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="fact__item">
              <h2 className="count">
                <span className="odometer" data-count={45} />
                45K+
              </h2>
              <p>Active Students</p>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="fact__item">
              <h2 className="count">
                <span className="odometer" data-count={89} />89+
              </h2>
              <p>Faculty Courses</p>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="fact__item">
              <h2 className="count">
                <span className="odometer" data-count={156} />156K
              </h2>
              <p>Best Professors</p>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="fact__item">
              <h2 className="count">
                <span className="odometer" data-count={42} />42K
              </h2>
              <p>Award Achieved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
   <Certificate/>
   <section className="mt-4 mb-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side Image */}
          <div className="col-lg-6">
            <div className="faq__img-wrap tg-svg">
              <div className="faq__img">
                <img src="/images/newsletter_img.png" alt="FAQ Image" />
                <div className="shape-one">
                  <img
                    src="/images/others/faq_shape01.svg"
                    className="injectable tg-motion-effects4"
                    alt="img"
                  />
                </div>
                <div className="shape-two">
                  <span
                    className="svg-icon"
                    id="faq-svg"
                    data-svg-icon="assets/img/others/faq_shape02.svg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side FAQ */}
          <div className="col-lg-6">
            <div className="faq__content">
              <div className="section__title pb-10">
                <span className="sub-title">Faq’s</span>
                <h2 className="title">
                  Start Learning From <br /> World’s Pro Instructors
                </h2>
              </div>
              <p>
                Our platform ensures all your questions are addressed, making it
                easier for you to navigate and excel in your learning journey.
              </p>

              {/* Tabs for FAQ Categories */}
              <Tabs defaultActiveKey="1" className="faq-tabs">
  {Object.keys(faqData).map((category, idx) => (
    <TabPane
      tab={
        <span className=" font-medium text-gray text-success" style={{fontSize:'20px'}}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      }
      key={idx}
    >
      <Collapse accordion className=" rounded-lg shadow-sm mt-4">
        {faqData[category].map((item, index) => (
          <Panel
            header={
              <span className="font-semibold text-success">
                {item.question}
              </span>
            }
            key={index}
            className="bg-white border border-success rounded-lg"
          >
            <p className="text-gray">{item.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </TabPane>
  ))}
</Tabs>

            </div>
          </div>
        </div>
      </div>
    </section>
 
  <section className="features__area">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6">
          <div className="section__title white-title text-center mb-50">
            <span className="sub-title">How We Start Journey</span>
            <h2 className="title">Start your Learning Journey Today!</h2>
            <p>
              Groove’s intuitive shared inbox makesteam members together <br />{" "}
              organize, prioritize and.In this episode.
            </p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="features__item">
            <div className="features__icon">
              <img
                src="/images/features_icon01.svg"
                className="injectable"
                alt="img"
              />
            </div>
            <div className="features__content">
              <h4 className="title">Learn with Experts</h4>
              <p>Curate anding area share Pluralsight content to reach your</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="features__item">
            <div className="features__icon">
              <img
                src="/images/features_icon02.svg"
                className="injectable"
                alt="img"
              />
            </div>
            <div className="features__content">
              <h4 className="title">Learn Anything</h4>
              <p>Curate anding area share Pluralsight content to reach your</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="features__item">
            <div className="features__icon">
              <img
                src="/images/features_icon03.svg"
                className="injectable"
                alt="img"
              />
            </div>
            <div className="features__content">
              <h4 className="title">Get Online Certificate</h4>
              <p>Curate anding area share Pluralsight content to reach your</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="features__item">
            <div className="features__icon">
              <img
                src="/images/features_icon04.svg"
                className="injectable"
                alt="img"
              />
            </div>
            <div className="features__content">
              <h4 className="title">E-mail Marketing</h4>
              <p>Curate anding area share Pluralsight content to reach your</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 
 
 
  <Reviews/>
  

  <Modal
        // title="Welcome to the Platform"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Close modal on cancel
        footer={null} // Remove footer buttons
      >
        <Form  close={setIsModalVisible}/>
      </Modal>
</main>

  
  );
};

 

export default Home;
