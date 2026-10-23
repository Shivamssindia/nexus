'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Ttb from '@/components/Ttb';
import { useAuth } from '@/contexts/AuthContext';

const NoRolePage: React.FC = () => {
  const { user } = useAuth();

  // Trigger fade-up animation on mount (same as index page)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('vis');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));

    // Fallback: reveal anything already visible
    const timeout = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.fu').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 40) {
          el.classList.add('vis');
        }
      });
    }, 80);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div id="sp"></div>
      <Navbar />

      <main>
        {/* =================== HERO SECTION =================== */}
        <section className="hero" style={{ minHeight: '100vh' }}>
          <div className="hero-overlay"></div>

          <div
            className="hero-body"
            style={{
              paddingTop: 'calc(var(--nav-h) + 3.5rem)',
              paddingBottom: '4rem',
            }}
          >
            {/* Badge */}
            <div className="hero-badge fu">
              <span className="bp"></span> Welcome, {user?.name?.split(' ')[0] || 'there'}
            </div>

            {/* Main Heading */}
            <h1 className="fu d1" style={{ maxWidth: '780px' }}>
              You&apos;re <span className="g1">One Step</span><br />
              From <span className="g2">Greatness</span>
            </h1>

            {/* Description */}
            <p className="hero-desc fu d2" style={{ maxWidth: '620px' }}>
              Your account is ready, but you don&apos;t have a role assigned yet.
              Join our talent ecosystem at <strong>Softmax Nexus</strong> — where
              Trainees, Interns, Consultants, and Employees grow together.
            </p>

            {/* CTA Buttons */}
            <div className="hero-btns fu d3" style={{ marginBottom: '2.5rem' }}>
              <a
                href="https://careers.softmax.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-prim"
              >
                <i className="fas fa-rocket"></i> Let&apos;s Grow With Us
              </a>
              <Link href="/" className="btn-ghost">
                <i className="fas fa-home"></i> Back to Home
              </Link>
            </div>

            {/* Role Chips — which roles can you apply for */}
            <div
              className="fu d4"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.7rem',
                marginBottom: '3rem',
                maxWidth: '640px',
              }}
            >
              {[
                { icon: '🎓', label: 'Trainee' },
                { icon: '🧑‍💼', label: 'Intern' },
                { icon: '👨‍💻', label: 'Consultant' },
                { icon: '🏢', label: 'Employee' },
              ].map((r) => (
                <span
                  key={r.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '40px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--text2)',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{r.icon}</span>
                  {r.label}
                </span>
              ))}
            </div>

            {/* Stats — same style as index */
            }
            <div className="hero-stats fu d5">
              <div>
                <div className="h-snum">3 Steps</div>
                <div className="h-slbl">To get started</div>
              </div>
              <div>
                <div className="h-snum">24–48h</div>
                <div className="h-slbl">Approval time</div>
              </div>
              <div>
                <div className="h-snum">1 Platform</div>
                <div className="h-slbl">For every role</div>
              </div>
            </div>
          </div>

          {/* Scroll indicator — same as index */}
          <div className="scroll-ind">
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* =================== HOW IT WORKS =================== */}
        <section className="about-sec">
          <div className="sec-inner sec-c">
            <div className="sec-label fu">
              <i className="fas fa-route"></i> How It Works
            </div>
            <h2 className="sec-title fu d1">
              Three Simple Steps to Get Started
            </h2>
            <p className="sec-sub fu d2">
              Your journey with Softmax Nexus starts here — quick, transparent, and
              fully guided.
            </p>
          </div>

          <div className="sec-inner" style={{ marginTop: '3rem' }}>
            <div className="av-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="av-card fu">
                <div className="av-icon">📝</div>
                <h4>1. Apply for a Role</h4>
                <p>
                  Head to our careers portal and pick the role that fits you best —
                  Trainee, Intern, Consultant, or Employee.
                </p>
              </div>

              <div className="av-card fu d1">
                <div className="av-icon">⏳</div>
                <h4>2. Wait for Approval</h4>
                <p>
                  Our team personally reviews every application within 24–48 hours
                  and gets back to you.
                </p>
              </div>

              <div className="av-card fu d2">
                <div className="av-icon">🎉</div>
                <h4>3. Start Working</h4>
                <p>
                  Once approved, your dashboard unlocks — access projects, teams,
                  and all platform features.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================== CTA BANNER (same as index) =================== */}
        <section className="cta-sec">
          <div className="cta-box fu">
            <div className="cta-text">
              <div className="sec-label" style={{ marginBottom: '.7rem' }}>
                <i className="fas fa-bolt"></i> Ready to Begin?
              </div>
              <h2>
                Let&apos;s Build<br />Your Future Together
              </h2>
              <p>
                Apply for a role today and join India&apos;s most intelligent
                talent platform. Wherever you are in your journey — we&apos;ve got
                a place for you.
              </p>
            </div>
            <div className="cta-actions">
              <a
                href="https://careers.softmax.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-prim"
              >
                <i className="fas fa-rocket"></i> Let&apos;s Grow With Us
              </a>
              <Link href="/" className="btn-ghost">
                <i className="fas fa-home"></i> Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Ttb />
    </>
  );
};

export default NoRolePage;