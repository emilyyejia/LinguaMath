import React from "react";

export default function SupportPage() {
  return (
    <div className="d-flex flex-column vh-100 overflow-auto p-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h1 className="fw-bold mb-4 text-center">Support</h1>

      {/* Contact Us */}
      <section className="mb-5">
        <h3 className="fw-semibold mb-3">Contact Us</h3>
        <p>
          If you need assistance with your LinguaMath account or have questions about the app, 
          we’re here to help. Please reach out to us via email and include your username 
          and a description of the issue so we can respond promptly.
        </p>
        <p>
          Email: <a href="mailto:support@linguamath.com">ye.jia@mail.utoronto.ca</a>
        </p>
      </section>

      {/* Response Time */}
      <section className="mb-5">
        <h3 className="fw-semibold mb-3">Response Time</h3>
        <p>
          Our support team aims to respond to all inquiries within 24–48 hours. 
          Please check your spam/junk folder if you do not receive a reply within this timeframe.
        </p>
      </section>

      {/* FAQ / Tips */}
      <section>
        <h3 className="fw-semibold mb-3">Tips for Getting Help</h3>
        <ul>
          <li>Provide your username and device type for faster troubleshooting.</li>
          <li>Include screenshots if possible to illustrate the issue.</li>
          <li>Check our About page or app guidance for common questions before contacting support.</li>
        </ul>
      </section>
    </div>
  );
}
