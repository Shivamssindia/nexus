// app/contact/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Ttb from '@/components/Ttb'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'

interface MailData {
  intrest: string
  msg: string
}

const ContactPage = () => {
  const [msgData, setMailData] = useState<MailData>({
    intrest: '',
    msg: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const {user} = useAuth()

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

  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    
    const sectorMap: { [key: string]: string } = {
      web: 'Web & App Development',
      mobile: 'Mobile (Flutter / Kotlin)',
      realtime: 'Real-Time Systems (WebRTC / WebSocket)',
      ai: 'AI / Machine Learning',
      backend: 'Backend & APIs (Spring Boot)',
      cloud: 'Cloud & DevOps',
      automation: 'Automation & Workflows',
      performance: 'Performance / Sub-second SLAs',
      support: 'Technical Support',
      other: 'Other / General Query'
    }
    
    setMailData((prev) => ({ 
      ...prev, 
      intrest: sectorMap[value] || value 
    }))
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMailData((prev) => ({ ...prev, msg: e.target.value }))
  }

  const getSelectedInterest = () => {
    const sectors: { [key: string]: string } = {
      web: 'Web & App Development',
      mobile: 'Mobile (Flutter / Kotlin)',
      realtime: 'Real-Time Systems (WebRTC / WebSocket)',
      ai: 'AI / Machine Learning',
      backend: 'Backend & APIs (Spring Boot)',
      cloud: 'Cloud & DevOps',
      automation: 'Automation & Workflows',
      performance: 'Performance / Sub-second SLAs',
      support: 'Technical Support',
      other: 'Other / General Query'
    }
    
    for (const [key, label] of Object.entries(sectors)) {
      if (msgData.intrest === label) {
        return key
      }
    }
    return ''
  }

  const HandleMail = async () => {
    console.log('Mail Data being sent:', msgData)

    if (!msgData.intrest) {
      alert('Please select an interest area.')
      return
    }
    if (!msgData.msg || msgData.msg.trim() === '') {
      alert('Please enter your message.')
      return
    }

    setIsLoading(true)

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

      const response = await axios.post(`${API_URL}/api/mail/send-inquiry`, msgData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.data.success === true) {
        alert(response.data.message || 'Message sent successfully! Our team will get back to you soon.')
        setMailData({ intrest: '', msg: '' })
      } else {
        alert(response.data.message || 'Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || 'Failed to send message. Please try again later.'
        alert(errorMessage)
      } else {
        alert('Network error. Please check your connection and try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="hero" style={{ minHeight: '50vh' }}>
          <div className="hero-video-wrap">
            <video className="hero-video" autoPlay loop muted playsInline>
              <source src="video/video02.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-body" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '2rem' }}>
            <div className="hero-badge"><span className="bp"></span> Get In Touch</div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
              <span className="g1">We're Here</span> to Help
            </h1>
            <p className="hero-desc">
              Got a technical issue? Need a scalable system built? Have an idea for an AI-driven product? Or just want to talk architecture — our engineering team and lead director personally read every message.
            </p>
          </div>
        </section>

        <section className="about-sec">
          <div className="sec-inner">
            <div className="about-grid">
              <div className="about-text fu">
                <div className="sec-label"><i className="fas fa-envelope"></i> Send a Message</div>
                <h2 className="sec-title">Share Anything<br />With Us 💬</h2>
                
                {/* Main message box explaining what users can share */}
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  borderLeft: '4px solid #6366f1'
                }}>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '0.5rem', fontWeight: '500' }}>
                    📢 Open Channel for Every Team
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.25rem' }}>
                    Whether it's a <strong>technical issue, project requirement, feature request, bug report, integration question,</strong> or just <strong>any idea</strong> you want to share — we're all ears.
                  </p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.75rem', color: 'var(--text-light)' }}>
                    ⭐ Your message goes directly to our <strong>Lead Director & Core Engineering Team</strong> — expect a personal response, not an automated reply.
                  </p>
                </div>

                <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
                  👇 Select the relevant area (or choose "Other") and write your message below:
                </p>

                <div className="m-form" style={{ marginTop: '0rem' }}>
                  <select
                    value={getSelectedInterest()}
                    onChange={handleInterestChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--input-bg)',
                      color: 'var(--text)',
                      marginBottom: '1rem',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="" disabled>Select Area / Type of Query</option>
                    <option value="web">Web &amp; App Development</option>
                    <option value="mobile">Mobile (Flutter / Kotlin)</option>
                    <option value="realtime">Real-Time Systems (WebRTC / WebSocket)</option>
                    <option value="ai">AI / Machine Learning</option>
                    <option value="backend">Backend &amp; APIs (Spring Boot)</option>
                    <option value="cloud">Cloud &amp; DevOps</option>
                    <option value="automation">Automation &amp; Workflows</option>
                    <option value="performance">Performance / Sub-second SLAs</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other / General Query / Feedback</option>
                  </select>
                  
                  <textarea
                    placeholder="Example: I need a real-time WebRTC platform... | We're facing a performance issue with... | I have an idea for an AI feature... | Here's my feedback... | Any query or thought you want to share..."
                    style={{
                      minHeight: '140px',
                      padding: '12px',
                      resize: 'vertical',
                      width: '100%',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: 'var(--input-bg)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: '1rem',
                      marginBottom: '1rem'
                    }}
                    value={msgData.msg}
                    onChange={handleMessageChange}
                    required
                  />
                  
                  {user ? <>
                  <button
                    className="btn-msub"
                    onClick={HandleMail}
                    disabled={isLoading}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      width: '100%'
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send Message to Director →'}
                  </button>
                  </>:<>
                  <button
                    className="btn-msub"
                    onClick={() => window.triggerGoogleLogin?.()}
                    disabled={isLoading}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      width: '100%'
                    }}
                  >
                    Login to Send Message →
                  </button>
                  </>}
                </div>

                {/* Trust indicators */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  marginTop: '1.5rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  color: 'var(--text-light)'
                }}>
                  <span>✅ Direct to Leadership</span>
                  <span>⚡ Response within 24h</span>
                  <span>🔒 Confidential</span>
                  <span>🎯 No Spam, Ever</span>
                </div>
              </div>

              <div className="about-visual fu d2">
                <div className="av-row">
                  <div className="av-card">
                    <div className="av-icon">📍</div>
                    <h4>Our Office</h4>
                    <p>Indore, India</p>
                  </div>
                  <div className="av-card">
                    <div className="av-icon">📧</div>
                    <h4>Email Us</h4>
                    <p>softmaxdigitals@gmail.com</p>
                  </div>
                </div>
                <div className="av-row">
                  <div className="av-card">
                    <div className="av-icon">📧</div>
                    <h4>Support</h4>
                    <p>support.softmax@gmail.com</p>
                  </div>
                  <div className="av-card">
                    <div className="av-icon">⏰</div>
                    <h4>Working Mode</h4>
                    <p>Remote First • Pan India</p>
                  </div>
                </div>
                <div className="av-hero">
                  <div className="av-hero-num">Direct Access</div>
                  <div className="av-hero-lbl">Your message reaches our Lead Director & Core Engineering Team directly</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Ttb />
    </>
  )
}

export default ContactPage