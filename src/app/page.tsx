
"use client";

import { useEffect, useState } from "react";
import DentalChatbot from "./components/dentalChatbot"

const services = [
  {
    icon: "🦷",
    title: "General Dentistry",
    description: "Routine checkups, cleaning, fillings, and preventive care.",
  },
  {
    icon: "😁",
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, and smile makeovers.",
  },
  {
    icon: "🪥",
    title: "Orthodontics",
    description: "Braces and aligners for a healthier, straighter smile.",
  },
  {
    icon: "✨",
    title: "Dental Implants",
    description: "Modern solutions for replacing missing teeth.",
  },
  {
    icon: "👶",
    title: "Pediatric Dentistry",
    description: "Gentle dental care for children of all ages.",
  },
  {
    icon: "🩺",
    title: "Emergency Dental Care",
    description: "Prompt attention for urgent dental problems.",
  },
];

const benefits = [
  {
    icon: "👨‍⚕️",
    title: "Experienced Dentists",
    description: "Professional and compassionate dental care.",
  },
  {
    icon: "🔬",
    title: "Modern Technology",
    description: "Advanced equipment for precise treatment.",
  },
  {
    icon: "💙",
    title: "Personalized Care",
    description: "Treatment plans tailored to your needs.",
  },
  {
    icon: "📅",
    title: "Easy Appointments",
    description: "Convenient scheduling for your busy life.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! 👋 Welcome to Smile Dental. How can I help you today?",
    },
  ]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCurrentYear(`${new Date().getFullYear()}`);
  }, []);

  function handleAppointment(event) {
    event.preventDefault();
    setSubmitted(true);
    // Connect your appointment API here.
  }

  function sendMessage(event) {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;

    setMessages((previous) => [
      ...previous,
      { from: "user", text: question },
      {
        from: "bot",
        text: "Thanks for your question! Our dental assistant can help with services, clinic timings, and appointments. Connect your chatbot API here for personalized answers.",
      },
    ]);
    setChatInput("");
  }

  return (
    <main>
      {/* Navigation */}
      <header className="header">
        <a className="brand" href="#home" aria-label="Smile Dental home">
          <span className="brand-icon">✦</span>
          <span>
            <strong>Smile Dental</strong>
            <small>Healthy Smiles, Brighter Lives</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          {[
            ["Home", "#home"],
            ["About Us", "#about"],
            ["Services", "#services"],
            ["Our Team", "#team"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="nav-cta"
            href="#appointment"
            onClick={() => setMenuOpen(false)}
          >
            Book Appointment
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            🦷 Trusted dental care for your family
          </span>
          <h1>
            Healthy Smiles
            <br />
            for a <span>Brighter Future</span>
          </h1>
          <p>
            Experience comfortable, compassionate dental care
            with modern technology and a team that puts your
            smile first.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#appointment">
              Book Appointment <span>→</span>
            </a>
            <a className="btn btn-outline" href="#about">
              Learn More
            </a>
          </div>
          <div className="hero-trust">
            <div className="avatars">
              <span>👨🏻</span>
              <span>👩🏻</span>
              <span>👨🏽</span>
            </div>
            <p>
              <strong>Friendly, patient-first care</strong>
              <small>Your smile matters to us</small>
            </p>
          </div>
        </div>

        <div className="hero-image" role="img" aria-label="Smiling patient in a modern dental clinic">
          <div className="floating-card">
            <span className="floating-icon">✓</span>
            <div>
              <strong>Your smile, our priority</strong>
              <small>Care that makes you smile</small>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services-section" id="services">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE OFFER</span>
          <h2>Complete Care for Every Smile</h2>
          <p>
            From routine checkups to advanced treatments, we
            provide dental care for your whole family.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#appointment">
                Explore service <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* About / Why choose us */}
      <section className="about-section" id="about">
        <div className="about-image">
          <div className="image-caption">
            <span>💙</span>
            <div>
              <strong>Care you can trust</strong>
              <small>Every patient. Every smile.</small>
            </div>
          </div>
        </div>

        <div className="about-content">
          <span className="eyebrow">WHY CHOOSE SMILE DENTAL</span>
          <h2>Expert Care. Modern Technology. A Better Experience.</h2>
          <p>
            We believe a great dental experience starts with
            listening. Our team combines modern techniques with
            a gentle approach to help you feel comfortable
            throughout your visit.
          </p>

          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <div className="benefit" key={benefit.title}>
                <span className="benefit-icon">{benefit.icon}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a className="btn btn-primary" href="#appointment">
            Meet Your Dental Team →
          </a>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section" id="team">
        <div className="section-heading">
          <span className="eyebrow">MEET OUR TEAM</span>
          <h2>Care from People Who Care</h2>
          <p>
            Friendly professionals dedicated to helping you
            achieve a healthy, confident smile.
          </p>
        </div>
        <div className="team-grid">
          <article className="team-card">
            <div className="team-avatar">👨‍⚕️</div>
            <h3>Dr. Your Dentist</h3>
            <p>General & Preventive Dentistry</p>
          </article>
          <article className="team-card">
            <div className="team-avatar">👩‍⚕️</div>
            <h3>Dr. Care Specialist</h3>
            <p>Cosmetic Dentistry</p>
          </article>
          <article className="team-card">
            <div className="team-avatar">👨🏻‍⚕️</div>
            <h3>Dr. Smile Expert</h3>
            <p>Orthodontics</p>
          </article>
        </div>
        <p className="demo-note">
          Replace the sample names and avatars with your clinic's
          real team details.
        </p>
      </section>

      {/* Appointment */}
      <section className="appointment-section" id="appointment">
        <div className="appointment-info">
          <span className="eyebrow">YOUR JOURNEY TO A HEALTHIER SMILE</span>
          <h2>Let's Make You Smile</h2>
          <p>
            Ready for your next dental visit? Send an appointment
            request and our team can follow up with you.
          </p>
          <div className="contact-detail">
            <span>📞</span>
            <div>
              <strong>Call our clinic</strong>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="contact-detail">
            <span>🕒</span>
            <div>
              <strong>Clinic hours</strong>
              <p>Mon – Sat, 9:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        <form className="appointment-form" onSubmit={handleAppointment}>
          <h3>Request an Appointment</h3>
          <p>Fill in your details and preferred visit.</p>

          {submitted ? (
            <div className="success-message" role="status">
              <span>✓</span>
              <h3>Request submitted!</h3>
              <p>
                This is a frontend demo. Connect an API to save
                the appointment and notify your clinic.
              </p>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <label>
                  First name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label>
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Preferred date
                  <input
                    type="date"
                    name="date"
                    min={`${() => new Date().toLocaleDateString("en-CA")}`}
                    required
                  />
                </label>
                <label>
                  Dental service
                  <select name="service" defaultValue="" required>
                    <option value="" disabled>Select service</option>
                    {services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Additional information
                <textarea
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows={3}
                />
              </label>

              <button className="btn btn-primary submit-btn" type="submit">
                Request Appointment →
              </button>
              <small className="form-disclaimer">
                Your request is not a confirmed appointment.
              </small>
            </>
          )}
        </form>        

      </section>
      

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-icon">✦</span>
            <span>
              <strong>Smile Dental</strong>
              <small>Healthy Smiles, Brighter Lives</small>
            </span>
          </a>
          <p>
            Caring for your smile with gentle, modern dental care.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="#about">About Us</a>
          <a href="#services">Our Services</a>
          <a href="#team">Our Team</a>
          <a href="#appointment">Appointments</a>
        </div>

        <div className="footer-links">
          <h3>Contact</h3>
          <p>+91 98765 43210</p>
          <p>hello@example.com</p>
          <p>Your Clinic Address, India</p>
        </div>

        <div className="footer-bottom">
          © {currentYear} Smile Dental. All rights reserved.
        </div>
      </footer>
      
      {/* Chatbot */}
      <div className="chat-widget">
         {/* AI Chatbot */}
         <DentalChatbot />   

      {/*  {chatOpen && (
          <section className="chat-panel" aria-label="Dental chatbot">
            <div className="chat-header">
              <span className="chat-avatar">🦷</span>
              <div>
                <strong>Dental Assistant</strong>
                <small>How can we help you?</small>
              </div>
              <button
                type="button"
                className="chat-close"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="chat-messages" aria-live="polite">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${message.from}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <form className="chat-form" onSubmit={sendMessage}>
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about dental care..."
                aria-label="Chat message"
              />
              <button type="submit" aria-label="Send message">
                ➤
              </button>
            </form>
          </section>
        )}
        */ }        

        <button
          className="chat-toggle"
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          aria-label={chatOpen ? "Close dental assistant" : "Open dental assistant"}
          aria-expanded={chatOpen}
        >
          {chatOpen ? "✕" : <img className="bot-icon" src="./chatbot.png"></img>}
        </button>
      </div>
    </main>
  );
}
