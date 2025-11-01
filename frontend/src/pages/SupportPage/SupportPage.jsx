import React from "react";
import "./SupportPage.css";

export default function SupportPage() {
  return (
    <div className="support-page">
      <div className="support-card shadow-lg">
        <h1 className="support-title">Support</h1>
        <p className="support-subtitle text-center mb-4">
          We're here to help you with any questions or issues regarding LinguaMath.
        </p>

        {/* Contact Us */}
        <section className="support-section">
          <h3>Contact Us</h3>
          <p>
            Need assistance with your LinguaMath account or have questions about the app? 
            Please email us with your username and a description of your issue so we can respond promptly.
          </p>
          <p>
            Email: <a href="mailto:ye.jia@mail.utoronto.ca">ye.jia@mail.utoronto.ca</a>
          </p>
        </section>

        {/* Response Time */}
        <section className="support-section">
          <h3>Response Time</h3>
          <p>
            Our support team aims to respond to all inquiries within 24–48 hours. 
            Be sure to check your spam/junk folder if you do not receive a reply within this timeframe.
          </p>
        </section>

        {/* Tips */}
        <section className="support-section">
          <h3>Tips for Getting Help</h3>
          <ul>
            <li>Provide your username and device type for faster troubleshooting.</li>
            <li>Include screenshots if possible to illustrate the issue.</li>
            <li>Check our About page or app guidance for common questions before contacting support.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
