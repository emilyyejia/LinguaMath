import React from "react";

export default function AboutPage() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4 text-center">About LinguaMath</h1>

      {/* Who We Are */}
      <section className="mb-5">
        <h3 className="fw-semibold mb-3">Who We Are</h3>
        <p>
          LinguaMath is an educational platform designed to support newcomer and multilingual students 
          in learning mathematics effectively. Our team is composed of educators, researchers, and 
          developers who are passionate about combining technology and pedagogy to make math accessible 
          and engaging for learners of all backgrounds.
        </p>
      </section>

      {/* Research Background */}
      <section className="mb-5">
        <h3 className="fw-semibold mb-3">Research Background</h3>
        <p>
          Our research focuses on understanding the challenges multilingual students face in 
          mathematics classrooms, particularly in Canadian multicultural settings. By leveraging 
          translanguaging strategies and AI-powered tools, we aim to provide personalized support 
          that bridges language barriers and enhances mathematical understanding.
        </p>
      </section>

      {/* Key Research Findings */}
      <section>
        <h3 className="fw-semibold mb-3">Key Research Findings</h3>
        <ul>
          <li>Generative AI tools can effectively support students in multilingual math classrooms.</li>
          <li>Translanguaging strategies improve comprehension and engagement in mathematics learning.</li>
          <li>Interactive learning logs help students track progress and build confidence in problem-solving.</li>
          <li>Visual and culturally relevant examples make mathematical concepts more accessible.</li>
        </ul>
      </section>
    </div>
  );
}
