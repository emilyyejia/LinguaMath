import React from "react";

export default function AboutPage() {
  return (
    <div className="d-flex flex-column min-vh-100 p-4 p-md-5" style={{ backgroundColor: "white"}}>
      <div className="container" style={{ maxWidth: "900px" }}>
        
        {/* Main Title */}
        <h1 className="fw-bold mb-5 text-center">Privacy Policy</h1>

        {/* Privacy Policy Section */}
        <section className="mb-5">
          
          {/* Data Collection */}
          <div className="mb-4">
            <h3 className="fw-semibold mb-3">Data We Collect</h3>
            <p>
              LinguaMath collects only the information necessary to provide and improve our services. 
              This includes account information, login credentials, and learning progress data. 
              No unnecessary personal information is collected.
            </p>
          </div>

          {/* How Data is Used */}
          <div className="mb-4">
            <h3 className="fw-semibold mb-3">How We Use Your Data</h3>
            <p>
              Data is used to personalize the learning experience, track student progress, 
              and ensure proper functionality of the app. It may also be used for research purposes 
              in anonymized form to improve the platform and advance our understanding of 
              multilingual mathematics education.
            </p>
          </div>

          {/* Data Security */}
          <div className="mb-4">
            <h3 className="fw-semibold mb-3">Data Security</h3>
            <p>
              All user data is stored securely and encrypted using industry-standard practices, 
              including bcrypt for passwords and HTTPS for network communications. 
              We do not share personal data with third parties without consent.
            </p>
          </div>

          {/* User Rights */}
          <div className="mb-4">
            <h3 className="fw-semibold mb-3">Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal data at any time. 
              To exercise these rights, please contact us at{' '}
              <a href="mailto:ye.jia@mail.utoronto.ca">ye.jia@mail.utoronto.ca</a>.
            </p>
          </div>

          {/* Terms */}
          <div className="mb-4">
            <h3 className="fw-semibold mb-3">Terms of Use</h3>
            <p>
              By using LinguaMath, you agree to our terms of service and privacy practices. 
              We may update this policy periodically, and updates will be communicated through the app.
            </p>
          </div>

          {/* Contact */}
          <div className="mb-4">
            <h3 className="fw-semibold mb-3">Contact Us</h3>
            <p>
              For questions about our privacy practices or to exercise your data rights, 
              please contact us at{' '}
              <a href="mailto:ye.jia@mail.utoronto.ca">ye.jia@mail.utoronto.ca</a>.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}