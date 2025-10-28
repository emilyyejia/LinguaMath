import React from "react";

export default function PrivacyPage() {
  return (
    <div className="d-flex flex-column vh-100 overflow-auto p-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h1 className="fw-bold mb-4 text-center">Privacy Policy</h1>

      {/* Data Collection */}
      <section className="mb-2">
        <h3 className="fw-semibold mb-3">Data We Collect</h3>
        <p>
          LinguaMath collects only the information necessary to provide and improve our services. 
          This includes account information, login credentials, and learning progress data. 
          No unnecessary personal information is collected.
        </p>
      </section>

      {/* How Data is Used */}
      <section className="mb-2">
        <h3 className="fw-semibold mb-3">How We Use Your Data</h3>
        <p>
          Data is used to personalize the learning experience, track student progress, 
          and ensure proper functionality of the app. It may also be used for research purposes 
          in anonymized form to improve the platform.
        </p>
      </section>

      {/* Data Security */}
      <section className="mb-2">
        <h3 className="fw-semibold mb-3">Data Security</h3>
        <p>
          All user data is stored securely and encrypted using industry-standard practices, 
          including bcrypt for passwords and HTTPS for network communications. 
          We do not share personal data with third parties without consent.
        </p>
      </section>

      {/* User Rights */}
      <section className="mb-2">
        <h3 className="fw-semibold mb-3">Your Rights</h3>
        <p>
          Users can contact us at <a href="mailto:ye.jia@mail.utoronto.ca">ye.jia@mail.utoronto.ca</a> 
          to request access, correction, or deletion of their personal data.
        </p>
      </section>

      {/* Terms */}
      <section>
        <h3 className="fw-semibold mb-2">Terms of Use</h3>
        <p>
          By using LinguaMath, you agree to our terms of service and privacy practices. 
          We may update this policy periodically, and updates will be communicated through the app.
        </p>
      </section>
    </div>
  );
}
