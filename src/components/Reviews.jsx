import React from 'react';
import { Avatar } from 'antd';
 

const testimonials = [
  {
    name: "AMBIKA",
    company: "Accenture (MNC)",
    designation: "Full-Stack Developer",
    content:
      "LegacyAye’s courses helped me transition from a beginner to a proficient Full-Stack Developer. I learned front-end and back-end technologies, with hands-on projects that built my confidence. Within months, I secured a Full-Stack Developer role at Accenture, one of the leading global IT consulting firms. LegacyAye not only improved my technical skills but also taught me the importance of continuous learning and problem-solving.",
    image: "/images/testimonials/1.jpg",
  },
  {
    name: "Kalyan",
    company: "Wipro (MNC)",
    designation: "UI/UX Designer",
    content:
      "As someone from a non-technical background, breaking into design seemed daunting. But LegacyAye changed everything. Their UI/UX Design course equipped me with all the right tools and techniques. I worked on practical design challenges and real-world applications. Thanks to LegacyAye, I now work as a UI/UX Designer at Wipro, one of India’s top IT firms.",
    image: "/images/testimonials/2.jpg",
  },
  {
    name: "Duhitha Shetty",
    company: "Mindtree (Mid-cap Company)",
    designation: "MERN Stack Developer",
    content:
      "The moment I discovered LegacyAye, my life changed. Their MERN Stack program was incredibly hands-on, covering everything from MongoDB to React. I could easily apply everything I learned to real-world projects. In just a few months, I landed a MERN Stack Developer position at Mindtree, a global IT services and consulting company.",
    image: "/images/testimonials/3.jpg",
  },
  {
    name: "Madhuri Nair",
    company: "Cognizant (MNC)",
    designation: "React Developer",
    content:
      "LegacyAye’s React Developer course gave me the right direction. With personalized mentorship and live projects, I was able to grasp React concepts and build amazing applications. I am now a proud React Developer at Cognizant, where I get to work on innovative tech solutions.",
    image: "/images/testimonials/4.jpg",
  },
  {
    name: "DEEPIKA",
    company: "Tata Consultancy Services (MNC)",
    designation: "Python Developer",
    content:
      "I had a background in mechanical engineering but was drawn to data science and Python programming. LegacyAye’s Python course was the perfect fit. It provided me with hands-on experience in data analysis, machine learning, and key libraries like Pandas and TensorFlow.",
    image: "/images/testimonials/5.jpg",
  },
  {
    name: "FAROOQ",
    company: "L&T Infotech (Mid-cap Company)",
    designation: "DevOps Engineer",
    content:
      "I was working as an IT administrator, but I wanted more growth and challenges. I turned to LegacyAye for DevOps training. The hands-on projects and emphasis on tools like Docker, Kubernetes, and Jenkins gave me the expertise I needed to transition into a DevOps Engineer role at L&T Infotech.",
    image: "/images/testimonials/6.jpg",
  },
  {
    name: "Bhavani",
    company: "Tech Mahindra (MNC)",
    designation: "Cloud Solutions Architect",
    content:
      "I had a background in software engineering, but I wanted to enhance my cloud skills. LegacyAye’s AWS Cloud Computing course gave me all the practical knowledge I needed about AWS Lambda, EC2, and S3. I quickly transitioned into a Cloud Solutions Architect role at Tech Mahindra.",
    image: "/images/testimonials/7.jpg",
  },
  {
    name: "Harsha Reddy",
    company: "Infosys (MNC)",
    designation: "Mobile App Developer",
    content:
      "I always had a fascination with mobile tech, and LegacyAye helped me turn that into a reality. The mobile app development program taught me iOS and Android development, using frameworks like Flutter and React Native.",
    image: "/images/testimonials/8.jpg",
  },
  {
    name: "Neha Bansal",
    company: "Capgemini (MNC)",
    designation: "Data Scientist",
    content:
      "I had always been passionate about numbers and analytics, but I didn’t know how to break into the field of data science. After enrolling in LegacyAye’s Data Science program, I gained in-depth knowledge of Python, machine learning, and data visualization tools.",
    image: "/images/testimonials/9.jpg",
  },
  {
    name: "Shivani Agarwal",
    company: "Cognizant (MNC)",
    designation: "SAP Consultant",
    content:
      "I was working in business administration but always felt that technology could help streamline business processes. LegacyAye’s SAP program was exactly what I needed.",
    image: "/images/testimonials/10.jpg",
  },
  {
    name: "Siddharath Verma",
    company: "Bosch (MNC)",
    designation: "IoT Engineer",
    content:
      "With a keen interest in IoT, I decided to dive deeper into the field and enrolled in LegacyAye’s IoT program. The course covered everything from smart home automation to industrial IoT solutions.",
    image: "/images/testimonials/11.jpg",
  },
  {
    name: "Amit Joshi",
    company: "HCL Technologies (MNC)",
    designation: "Business Analyst",
    content:
      "I had always been intrigued by data and its impact on business decisions. After joining LegacyAye’s Business Analytics program, I learned to use tools like Power BI, SQL, and Tableau to interpret and visualize data.",
    image: "/images/testimonials/12.jpg",
  },
];

function Reviews() {
  return (
    <section className="testimonial__area py-5" style={{ backgroundColor: '#1E1E2F' }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="title text-white">Student Success Stories</h2>
          <p className="text-white">Explore the journeys of our students who turned their aspirations into fulfilling careers.</p>
        </div>
        <div className="testimonial-grid-wrapper">
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card p-4 rounded shadow-sm" key={index}>
                <img src={testimonial.image} alt={testimonial.name} className="img-fluid rounded mb-3" style={{width:"100px", aspectRatio: '1 / 1'}} />
                <div className="d-flex align-items-center mb-3">
                  <Avatar size={48} className="me-3 bg-primary text-white">
                    {testimonial.name[0]}
                  </Avatar>
                  <div>
                    <h5 className="testimonial-author text-white mb-0">{testimonial.name}</h5>
                    <p className="testimonial-role text-warning mb-0">
                      {testimonial.designation} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="testimonial-content text-white">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;

