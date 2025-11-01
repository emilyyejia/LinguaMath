import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-card shadow-lg">
        {/* Main Title */}
        <h1 className="about-title text-center mb-4">Privacy Policy</h1>
        <p className="about-subtitle text-center mb-5">
          Learn how LinguaMath protects your data and ensures a safe, personalized learning experience.
        </p>

        {/* Privacy Policy Sections */}
        <section className="about-section">
          <h3>Data We Collect</h3>
          <p>
            LinguaMath collects only the information necessary to provide and improve our services. 
            This includes account information, login credentials, and learning progress data. 
            No unnecessary personal information is collected.
          </p>
        </section>

        <section className="about-section">
          <h3>How We Use Your Data</h3>
          <p>
            Data is used to personalize the learning experience, track student progress, 
            and ensure proper functionality of the app. It may also be used for research purposes 
            in anonymized form to improve the platform and advance our understanding of 
            multilingual mathematics education.
          </p>
        </section>

        <section className="about-section">
          <h3>Data Security</h3>
          <p>
            All user data is stored securely and encrypted using industry-standard practices, 
            including bcrypt for passwords and HTTPS for network communications. 
            We do not share personal data with third parties without consent.
          </p>
        </section>

        <section className="about-section">
          <h3>Your Rights</h3>
          <p>
            You have the right to access, correct, or delete your personal data at any time. 
            To exercise these rights, please contact us at{' '}
            <a href="mailto:ye.jia@mail.utoronto.ca">ye.jia@mail.utoronto.ca</a>.
          </p>
        </section>

        <section className="about-section">
          <h3>Terms of Use</h3>
          <p>
            By using LinguaMath, you agree to our terms of service and privacy practices. 
            We may update this policy periodically, and updates will be communicated through the app.
          </p>
        </section>

        <section className="about-section">
          <h3>Contact Us</h3>
          <p>
            For questions about our privacy practices or to exercise your data rights, 
            please contact us at{' '}
            <a href="mailto:ye.jia@mail.utoronto.ca">ye.jia@mail.utoronto.ca</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
