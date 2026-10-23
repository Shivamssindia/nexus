// app/service/page.tsx
'use client'

import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Ttb from '@/components/Ttb'
import Link from 'next/link'
import Services from '@/components/Services'

const ServicePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.fu').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <section className="hero" style={{ minHeight: '50vh' }}>
          <div className="hero-video-wrap">
            <video className="hero-video" autoPlay loop muted playsInline>
              <source src="video/video01.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-body" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '2rem' }}>
            <div className="hero-badge"><span className="bp"></span> What We Offer</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
              Our <span className="g1">Services</span>
            </h1>
            <p className="hero-desc">
              AI-powered consulting solutions for Indian enterprises — from strategy to execution with measurable outcomes.
            </p>
          </div>
        </section>

        <Services/>

        <section className="cta-sec">
          <div className="cta-box fu">
            <div className="cta-text">
              <div className="sec-label" style={{ marginBottom: '.7rem' }}>
                <i className="fas fa-bolt"></i> Get Started
              </div>
              <h2>Ready to Transform Your Business?</h2>
              <p>Post your requirement today and receive AI-matched consultant profiles within 24 hours.</p>
            </div>
            <div className="cta-actions">
              <Link href="/#how" className="btn-prim">
                <i className="fas fa-paper-plane"></i> Post a Requirement
              </Link>
              <a href="/contact" className="btn-ghost">
                <i className="fas fa-phone-alt"></i> Talk to Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Ttb />
    </>
  )
}

export default ServicePage