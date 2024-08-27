import React from "react";
import styles from "@/styles/ContactPage.module.css";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <section className={styles.companyCulture}>
        <h2>Our Company Culture</h2>
        <div className={styles.cultureGrid}>
          <div className={styles.cultureItem}>
            <Image
              src="/Collaborative.jpg"
              alt="Collaborative Environment"
              width={400}
              height={100}
            />
            <h3>Collaborative Environment</h3>
            <p>
              We foster a culture of teamwork and open communication, where
              every voice is heard and valued.
            </p>
          </div>
          <div className={styles.cultureItem}>
            <Image
              src="/innovation.jpg"
              alt="Innovation-Driven"
              width={400}
              height={100}
            />
            <h3>Innovation-Driven</h3>
            <p>
              We encourage creative thinking and embrace new ideas to stay at
              the forefront of technology.
            </p>
          </div>
          <div className={styles.cultureItem}>
            <Image
              src="/worklife.jpg"
              alt="Work-Life Balance"
              width={400}
              height={100}
            />
            <h3>Work-Life Balance</h3>
            <p>
              We believe in maintaining a healthy balance between professional
              and personal life for our team members.
            </p>
          </div>
          <div className={styles.cultureItem}>
            <Image
              src="/Social.jpg"
              alt="Social Responsibility"
              width={400}
              height={100}
            />
            <h3>Social Responsibility</h3>
            <p>
              We are committed to giving back to the community and promoting
              sustainable practices.
            </p>
          </div>
          <div className={styles.cultureItem}>
            <Image
              src="/Growth.jpg"
              alt="Growth Mindset"
              width={400}
              height={100}
            />
            <h3>Growth Mindset</h3>
            <p>
              We embrace challenges and see them as opportunities for personal
              and professional development.
            </p>
          </div>
          <div className={styles.cultureItem}>
            <Image
              src="/learning.jpeg"
              alt="Growth Mindset"
              width={400}
              height={100}
            />
            <h3>Continuous Learning</h3>
            <p>
              We support professional growth through ongoing training,
              workshops, and learning opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.companyDescription}>
        <div className={styles.descriptionContent}>
          <h2>About Us</h2>
          <p>
            At Code Notebook, we&aposre passionate about empowering developers
            to organize their thoughts, ideas, and code snippets efficiently.
            Our team consists of experienced developers and designers who
            understand the challenges of managing coding notes and snippets.
          </p>
          <p>
            We created Code Notebook with the vision of providing a seamless,
            intuitive platform that integrates smoothly into a developer&apos;s
            workflow. Our goal is to help you focus on what matters most -
            writing great code and bringing your ideas to life.
          </p>
        </div>
        <div className={styles.descriptionImage}>
          <Image
            src="/companyImage.jpg"
            alt="Our Team Working"
            width={400}
            height={100}
          />
        </div>
      </section>

      <section className={styles.contactFormSection}>
        <div className={styles.contactInfo}>
          <h2>Get in Touch</h2>
          <p>
            <FaEnvelope style={{ color: "#4A90E2", fontSize: "2rem" }} />{" "}
            support@codenotebook.app
          </p>
          <p>
            <FaPhone style={{ color: "#4A90E2", fontSize: "2rem" }} /> +32 (467)
            68-9840
          </p>
          <p>
            <FaMapMarkerAlt style={{ color: "#4A90E2", fontSize: "2rem" }} />{" "}
            1000 Brussels, Belgium
          </p>
        </div>
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={4} required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
