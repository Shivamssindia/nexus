// app/about/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Tecket from '@/components/Tecket'
import Ttb from '@/components/Ttb'
import Link from 'next/link'

const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0)
  const [isRotating, setIsRotating] = useState(true)

  // FAQ Data
  const faqData = [
    {
      question: "What makes SoftMax Technologies & IT Services different from traditional IT vendors?",
      answer: "We are a high-velocity engineering partner, not a body-shop. Every system we build is engineered to perform under pressure — with sub-second response times, automated workflows, and measurable business ROI. We operate on transparent, outcome-driven engagements backed by KPI tracking and senior technical oversight."
    },
    {
      question: "What is your core technology stack?",
      answer: "Our stack spans Flutter, Kotlin, Next.js, WebRTC, WebSocket, Spring Boot, Spring AI, Machine Learning, and Cloud DevOps. This lets us ship cross-platform apps, real-time communication systems, AI-augmented backends, and cloud-native infrastructure from a single team."
    },
    {
      question: "How do you eliminate technical anxiety for clients?",
      answer: "Zero technical anxiety is a design goal, not a slogan. We handle architecture, security, scaling, monitoring, and deployment end-to-end — and give you clear dashboards, automated alerts, and predictable release cadences so nothing is a black box."
    },
    {
      question: "How do you measure business ROI?",
      answer: "Every engagement starts with defined success metrics — latency targets, conversion lifts, cost-per-transaction reductions, automation coverage, or uptime SLAs. We instrument the product, track KPIs in real time, and report against those baselines throughout delivery."
    },
    {
      question: "Can you build real-time systems?",
      answer: "Yes. WebRTC and WebSocket are core to our stack. We build low-latency video, voice, live collaboration, streaming dashboards, and event-driven backends — engineered for sub-second response under load."
    },
    {
      question: "How do you use AI and Machine Learning?",
      answer: "We use Spring AI, ML models, and modern LLM tooling to automate workflows, add intelligent decisioning, and reduce manual operations. AI is applied where it creates measurable ROI — not as a buzzword layer."
    },
    {
      question: "What does your Cloud DevOps practice cover?",
      answer: "Infrastructure-as-code, CI/CD pipelines, container orchestration, observability, autoscaling, and cost optimization across major cloud providers. We design for resilience so your systems stay up and perform under pressure."
    },
    {
      question: "How do we get started?",
      answer: "Reach out via our contact page with your goals and constraints. We'll run a short discovery, propose an architecture and delivery plan with clear KPIs, and give you a fixed scope and timeline before any code is written."
    }
  ]

  // Leaders Data for 3D Cube
  const leadersData = [
    {
      id: 1,
      name: "Manisha Sharma",
      role: "Founder",
      description: "Visionary leader with 15+ years of experience in consulting and business strategy.",
      photoUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsTRI0GrE02I8yLwLIkF5CC8nLrGp-77eFYdZseBSXNiEL0yskfJTzUY10-SK5L3TggqlGwTR7EUa8cKLh6uKzF84QrDT35Oz049ETNSi5ciyK_AZPqiVxIBsbRW70Ky8xTk441Q9qB3G6EvGsOHo84XKsx4GTogaEh22F4MO7kW5OX4SBE2KBNbCzvns/s320/WhatsApp%20Image%202026-05-17%20at%204.27.48%20PM%20(1).jpeg",
      socialLinks: [
        { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/vijaykumartiwari-csr/" },
        { icon: "fab fa-twitter", url: "#" }
      ]
    },
    {
      id: 2,
      name: "Vijay Kumar Tiwari",
      role: "Co-Founder",
      description: "Strategic thinker specializing in Public-Private Partnerships and infrastructure projects.",
      photoUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXXtXX1KQZm11sIrkOSEa7TQMSNHWBExLq2Ejp8EZeGvPPa82FFWkeaz1VMtSi_D7zCEf14rfV4sdzOt3f9sbg0zJc8ii8y5o01gt2b0kOn-EGFWFkJanCaEHFHSeoR5jgJeQk9BSG_OpNbNj_GLOyUxVK7vnuu38rJZk3cvRb5UZZn70vg33fMrTjdHY/s320/WhatsApp%20Image%202026-05-17%20at%206.22.40%20PM.jpeg",
      socialLinks: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-github", url: "#" }
      ]
    },
    {
      id: 3,
      name: "Dr Isha Mishra",
      role: "Senior Director",
      description: "AI and Data Science expert leading innovation and AI product development.",
      photoUrl: "https://media.licdn.com/dms/image/v2/D5603AQFI1XEPKGoQVw/profile-displayphoto-crop_800_800/B56Zm6vcf4IAAM-/0/1759774627694?e=1780531200&v=beta&t=833oc1ouRG4-7vBOQxpkguTb1TuiLnmoCZ_Kn3K7AcU",
      socialLinks: [
        { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/dr-isha-419449257" },
        { icon: "fab fa-twitter", url: "#" }
      ]
    },
    {
      id: 4,
      name: "Mr. Sunil Seth",
      role: "Lead Manager",
      description: "Operations and delivery expert ensuring excellence in project execution.",
      photoUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhb9I0CB7NziwpnoTo7-PDXP9dQ99pATrNd_L4QoKX0z6V9uR8YI06nHokh4ilJh8SqodGl4Tiefixg514WBiUmgsSMRTQn0TSZ8MM4QN9YW9sp786pZ2ctFblUb6p2hU3zdiH9M8fPmFXjVb7Hn7LZC4Q7VK4Z6M-pTx4eeOY5jrc-zilQG1WonSwg6KQ/s1254/ChatGPT%20Image%20May%2017,%202026,%2005_07_56%20PM.png",
      socialLinks: [
        { icon: "fab fa-linkedin-in", url: "#" },
        { icon: "fab fa-instagram", url: "#" }
      ]
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('vis')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.fu').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Auto-rotate cube every 4 seconds - only forward direction
  useEffect(() => {
    if (!isRotating) return
    const interval = setInterval(() => {
      setCurrentLeaderIndex((prevIndex) => (prevIndex + 1) % leadersData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [leadersData.length, isRotating])

  // Pause rotation on hover
  const handleMouseEnter = () => setIsRotating(false)
  const handleMouseLeave = () => setIsRotating(true)

  // Get rotation for cube - only clockwise rotation (never counter-clockwise)
  const getRotation = () => {
    const angle = currentLeaderIndex * 90
    return `rotateY(${angle}deg)`
  }

  // Only forward navigation - no reverse rotation
  const nextSlide = () => {
    setCurrentLeaderIndex((prev) => (prev + 1) % leadersData.length)
  }
  const prevSlide = () => {
    setCurrentLeaderIndex((prev) => (prev - 1) % leadersData.length)
  }

  return (
    <>
      <style>{`
        /* 3D Cube Styles - Fixed Collapse Issue */
        .cube-leaders-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          perspective: 1500px;
          min-height: 520px;
        }

        .cube-scene {
          width: 320px;
          height: 420px;
          position: relative;
          perspective: 1500px;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 0.9);
          transform: ${getRotation()};
        }

        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: visible;
          display: flex;
          justify-content: center;
          align-items: center;
          left: 0;
          top: 0;
        }

        /* Fixed translateZ values - consistent spacing between faces */
        .cube-face-front { transform: rotateY(0deg) translateZ(160px); }
        .cube-face-right { transform: rotateY(90deg) translateZ(160px); }
        .cube-face-back { transform: rotateY(180deg) translateZ(160px); }
        .cube-face-left { transform: rotateY(-90deg) translateZ(160px); }

        .cube-leader-card {
          width: 100%;
          height: 100%;
          background: var(--card-bg);
          border-radius: 20px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .cube-leader-img {
          width: 110px;
          height: 110px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--blue));
          padding: 3px;
          flex-shrink: 0;
        }

        .cube-leader-img img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .cube-leader-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
          color: var(--text);
        }

        .cube-leader-role {
          font-size: 0.8rem;
          color: var(--teal);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .cube-leader-desc {
          font-size: 0.8rem;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 1rem;
          text-align: center;
          flex: 1;
        }

        .cube-leader-soc {
          display: flex;
          justify-content: center;
          gap: 0.7rem;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .cube-leader-soc a {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--surface);
          color: var(--muted);
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .cube-leader-soc a:hover {
          background: var(--teal);
          color: #fff;
          transform: translateY(-3px);
        }

        .cube-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--card-bg);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          font-size: 0.9rem;
        }

        .cube-nav:hover {
          background: var(--teal);
          color: #fff;
          border-color: var(--teal);
        }

        .cube-nav-prev { left: 100px; }
        .cube-nav-next { right: -45px; }

        /* Indicators positioned at bottom of cube container */
        .cube-indicators {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        .cube-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--border);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cube-indicator.active {
          width: 30px;
          border-radius: 5px;
          background: var(--teal);
        }

        .cube-indicator:hover {
          background: var(--teal);
          transform: scale(1.2);
        }

        /* Hide scrollbar but keep functionality */
        .cube-leader-card::-webkit-scrollbar {
          width: 3px;
        }

        .cube-leader-card::-webkit-scrollbar-track {
          background: var(--surface);
          border-radius: 10px;
        }

        .cube-leader-card::-webkit-scrollbar-thumb {
          background: var(--teal);
          border-radius: 10px;
        }

        @media (max-width: 1024px) {
          .cube-scene { width: 320px; height: 400px; }
          .cube-face-front { transform: rotateY(0deg) translateZ(160px); }
          .cube-face-right { transform: rotateY(90deg) translateZ(160px); }
          .cube-face-back { transform: rotateY(180deg) translateZ(160px); }
          .cube-face-left { transform: rotateY(-90deg) translateZ(160px); }
          .cube-nav-prev { left: -35px; }
          .cube-nav-next { right: -35px; }
        }

        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .cube-scene { width: 300px; height: 420px; margin: 0 auto; }
          /* Fixed spacing between faces for mobile - consistent translateZ */
          .cube-face-front { transform: rotateY(0deg) translateZ(160px); }
          .cube-face-right { transform: rotateY(90deg) translateZ(160px); }
          .cube-face-back { transform: rotateY(180deg) translateZ(160px); }
          .cube-face-left { transform: rotateY(-90deg) translateZ(160px); }
          /* Hide navigation buttons on mobile */
          .cube-nav-prev, .cube-nav-next {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .cube-scene { width: 280px; height: 400px; }
          /* Fixed spacing between faces for small mobile */
          .cube-face-front { transform: rotateY(0deg) translateZ(145px); }
          .cube-face-right { transform: rotateY(90deg) translateZ(145px); }
          .cube-face-back { transform: rotateY(180deg) translateZ(145px); }
          .cube-face-left { transform: rotateY(-90deg) translateZ(145px); }
          .cube-leader-img { width: 90px; height: 90px; }
          .cube-leader-name { font-size: 1rem; }
          .cube-leader-desc { font-size: 0.7rem; }
          .cube-leader-card { padding: 1rem; }
        }
      `}</style>

      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="hero" style={{ minHeight: '50vh' }}>
          <div className="hero-video-wrap">
            <video className="hero-video" autoPlay loop muted playsInline>
              <source src="video/video01.mp4" type="video/mp4"/>
            </video>
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-body" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '2rem', textAlign: 'left' }}>
            <div className="hero-badge" style={{ marginLeft: '0' }}>
              <span className="bp"></span> Our Story
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', maxWidth: '720px', marginLeft: '0' }}>
              About <span className="g1">SoftMax</span><br />
              <span className="g2">Technologies</span>
            </h1>
            <p className="hero-desc" style={{ maxWidth: '620px', marginLeft: '0' }}>
              High-velocity, scalable digital systems engineered to perform under pressure — with zero technical anxiety, measurable business ROI, sub-second response times, automated workflows, and modern cloud/AI-driven software.
            </p>
          </div>
        </section>

        <Tecket />

        {/* Company Overview Section with 3D Cube - Two Column Layout */}
        <section className="about-sec">
          <div className="sec-inner">
            <div className="about-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              {/* Left Side - Our Journey Text */}
              <div className="about-text fu">
                <div className="sec-label"><i className="fas fa-book-open"></i> Our Journey</div>
                <h2 className="sec-title">Engineering Digital Systems<br />That Perform Under Pressure</h2>
                <p>SoftMax Technologies &amp; IT Services delivers high-velocity, scalable digital systems engineered to perform under pressure. We focus on zero technical anxiety, measurable business ROI, sub-second response times, automated workflows, and modern cloud/AI-driven software solutions.</p>
                <p>Our technology stack spans Flutter, Kotlin, Next.js, WebRTC, WebSocket, Spring Boot, Spring AI, Machine Learning, and Cloud DevOps — allowing us to ship cross-platform apps, real-time communication systems, AI-augmented backends, and cloud-native infrastructure from a single accountable team.</p>
                <p>Every engagement is outcome-driven: we define success metrics up front, instrument the product, and track KPIs in real time — so performance is provable, not promised.</p>
                <div className="about-ctas">
                  <a href="#mission" className="btn-outline-t"><i className="fas fa-flag"></i> Our Mission</a>
                  <a href="#values" className="btn-outline-t"><i className="fas fa-heart"></i> Core Values</a>
                </div>
              </div>

              {/* Right Side - 3D Cube with Leaders (unchanged) */}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="about-sec" style={{ background: 'var(--bg3)' }}>
          <div className="sec-inner sec-c">
            <div className="sec-label fu"><i className="fas fa-bullseye"></i> Our Core</div>
            <h2 className="sec-title fu d1">Mission &amp; Vision</h2>
          </div>
          <div className="sec-inner" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border)', 
              borderRadius: '22px', 
              padding: '2rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(31, 109, 168, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--blue)' }}>
                  <i className="fas fa-flag"></i>
                </div>
                <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.3rem', fontWeight: '800' }}>Our Mission</h3>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1rem' }}>To engineer high-velocity, scalable digital systems that remove technical anxiety for our clients — delivering measurable business ROI, sub-second performance, automated workflows, and cloud/AI-driven software that holds up under real-world pressure.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.84rem', color: 'var(--muted)' }}><span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: '900', color: '#fff' }}>1</span> Zero technical anxiety for every client</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.84rem', color: 'var(--muted)' }}><span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: '900', color: '#fff' }}>2</span> Measurable business ROI on every build</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.84rem', color: 'var(--muted)' }}><span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: '900', color: '#fff' }}>3</span> Systems engineered for sub-second response</li>
              </ul>
            </div>

            <div style={{ 
              background: 'var(--card-bg)', 
              border: '1px solid var(--border)', 
              borderRadius: '22px', 
              padding: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '13px', background: 'rgba(52, 168, 83, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', color: 'var(--green)' }}>
                  <i className="fas fa-eye"></i>
                </div>
                <h3 style={{ fontFamily: 'var(--font-h)', fontSize: '1.3rem', fontWeight: '800' }}>Our Vision</h3>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '1rem' }}>To be the engineering partner of choice for teams that cannot afford downtime or slow software — where every product we ship is fast, automated, AI-augmented, and cloud-native by default.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.84rem', color: 'var(--muted)' }}><span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: '900', color: '#fff' }}>1</span> Cloud-native, AI-driven by default</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.84rem', color: 'var(--muted)' }}><span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: '900', color: '#fff' }}>2</span> Real-time systems with sub-second SLAs</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.84rem', color: 'var(--muted)' }}><span style={{ minWidth: '22px', height: '22px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.62rem', fontWeight: '900', color: '#fff' }}>3</span> Automated workflows that scale with you</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="testi-sec">
          <div className="sec-inner sec-c">
            <div className="sec-label fu"><i className="fas fa-question-circle"></i> Got Questions?</div>
            <h2 className="sec-title fu d1">Frequently Asked Questions</h2>
            <p className="sec-sub fu d2">Everything you need to know about SoftMax Technologies &amp; IT Services.</p>
          </div>
          <div className="sec-inner" style={{ maxWidth: '800px', margin: '2rem auto 0' }}>
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`fu d${index % 5}`} 
                style={{ 
                  marginBottom: '1rem',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.2rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-b)',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text)',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.question}</span>
                  <i 
                    className={`fas fa-chevron-${openFaq === index ? 'up' : 'down'}`}
                    style={{
                      transition: 'transform 0.3s ease',
                      color: 'var(--teal)',
                      fontSize: '0.9rem'
                    }}
                  ></i>
                </button>
                <div
                  style={{
                    maxHeight: openFaq === index ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease-in-out',
                    borderTop: openFaq === index ? '1px solid var(--border)' : 'none'
                  }}
                >
                  <div style={{ padding: '1rem 1.5rem 1.5rem', color: 'var(--muted)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-sec">
          <div className="cta-box fu">
            <div className="cta-text">
              <div className="sec-label" style={{ marginBottom: '.7rem' }}><i className="fas fa-bolt"></i> Build With Us</div>
              <h2>Ready to Ship Software<br />That Performs Under Pressure?</h2>
              <p>Whether you need a real-time platform, an AI-augmented backend, or a cloud-native system built to scale — SoftMax Technologies &amp; IT Services is your engineering partner.</p>
            </div>
            <div className="cta-actions">
              <Link href="/#services" className="btn-prim"><i className="fas fa-rocket"></i> Explore Solutions</Link>
              <Link href="/contact" className="btn-ghost"><i className="fas fa-envelope"></i> Get in Touch</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Ttb />
    </>
  )
}

export default AboutPage