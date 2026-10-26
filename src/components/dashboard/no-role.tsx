'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Ttb from '@/components/Ttb';
import { useAuth } from '@/contexts/AuthContext';

const NoRolePage: React.FC = () => {
  const { user } = useAuth();

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
        {/* =================== HERO =================== */}
        <section className="hero" style={{ minHeight: '100vh' }}>
          <div className="hero-overlay"></div>

          <div
            className="hero-body"
            style={{
              paddingTop: 'calc(var(--nav-h) + 3.5rem)',
              paddingBottom: '4rem',
            }}
          >
            <div className="hero-badge fu">
              <span className="bp"></span> Welcome, {user?.name?.split(' ')[0] || 'there'}
            </div>

            <h1 className="fu d1" style={{ maxWidth: '780px' }}>
              You&apos;re <span className="g1">One Step</span><br />
              From <span className="g2">Greatness</span>
            </h1>

            <p className="hero-desc fu d2" style={{ maxWidth: '620px' }}>
              Your account is ready, but you don&apos;t have a role assigned yet.
              Join our talent ecosystem at <strong>Softmax Nexus</strong> — where
              Trainees, Interns, Consultants, and Employees grow together.
            </p>

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

          <div className="scroll-ind">
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* =================== APPLICATION JOURNEY (REDESIGNED) =================== */}
        <section className="journey-sec">
          <div className="sec-inner sec-c">
            <div className="sec-label fu">
              <i className="fas fa-route"></i> Your Application Journey
            </div>
            <h2 className="sec-title fu d1">From Application to Onboarding</h2>
            <p className="sec-sub fu d2">
              A clear, transparent process — you'll always know exactly where you
              stand at every step.
            </p>
          </div>

          <div className="sec-inner">
            <div className="journey-grid">
              <div className="journey-card fu">
                <div className="journey-step-num">01</div>
                <div className="journey-icon">📥</div>
                <h4>Application Received</h4>
                <p>
                  Your application lands in our system. You&apos;ll get an instant
                  confirmation email with your reference ID.
                </p>
              </div>

              <div className="journey-card fu d1">
                <div className="journey-step-num">02</div>
                <div className="journey-icon">🔍</div>
                <h4>Profile Review</h4>
                <p>
                  Our HR team manually reviews your skills, experience, and goals
                  to understand where you fit best.
                </p>
              </div>

              <div className="journey-card fu d2">
                <div className="journey-step-num">03</div>
                <div className="journey-icon">📝</div>
                <h4>Skill Assessment</h4>
                <p>
                  A short domain-specific assessment to validate your skills and
                  match you to the right role.
                </p>
              </div>

              <div className="journey-card fu d3">
                <div className="journey-step-num">04</div>
                <div className="journey-icon">🎤</div>
                <h4>Interview Round</h4>
                <p>
                  A quick video call with our team to discuss expectations,
                  projects, and cultural fit.
                </p>
              </div>

              <div className="journey-card fu d4">
                <div className="journey-step-num">05</div>
                <div className="journey-icon">🎉</div>
                <h4>Offer & Onboarding</h4>
                <p>
                  Once approved, you get full access to the Softmax Nexus
                  dashboard — projects, teams, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================== CTA =================== */}
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

      <style>{`
        /* =================== JOURNEY SECTION =================== */
        .journey-sec {
          background: var(--bg3, #f8f6ff);
          padding: 5rem clamp(0.9rem, 3.5vw, 2rem);
        }

        [data-theme='dark'] .journey-sec {
          background: #0a0718;
        }

        .journey-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.2rem;
          margin-top: 3rem;
          position: relative;
        }

        /* Connecting line behind cards (desktop only) */
        .journey-grid::before {
          content: '';
          position: absolute;
          top: 66px;
          left: calc(10% + 1.2rem);
          right: calc(10% + 1.2rem);
          height: 2px;
          background: linear-gradient(90deg,
            rgba(160, 90, 255, 0.15),
            rgba(160, 90, 255, 0.4),
            rgba(27, 207, 180, 0.4),
            rgba(27, 207, 180, 0.15)
          );
          z-index: 0;
        }

        .journey-card {
          position: relative;
          z-index: 1;
          background: var(--card-bg, #ffffff);
          border: 1px solid var(--border, #e9e2f8);
          border-radius: 20px;
          padding: 1.8rem 1.2rem 1.4rem;
          text-align: center;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 0;
        }

        .journey-card:hover {
          transform: translateY(-6px);
          border-color: rgba(160, 90, 255, 0.4);
          box-shadow: 0 14px 40px rgba(160, 90, 255, 0.15);
        }

        .journey-step-num {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #a05aff, #1bcbf4);
          color: #ffffff;
          font-family: var(--font-h, Georgia, serif);
          font-size: 0.85rem;
          font-weight: 900;
          padding: 0.35rem 0.75rem;
          border-radius: 40px;
          box-shadow: 0 4px 14px rgba(160, 90, 255, 0.35);
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .journey-icon {
          font-size: 2.2rem;
          margin: 0.4rem 0 1rem;
          width: 62px;
          height: 62px;
          border-radius: 18px;
          background: rgba(160, 90, 255, 0.08);
          border: 1px solid rgba(160, 90, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s ease;
        }

        .journey-card:hover .journey-icon {
          background: rgba(160, 90, 255, 0.15);
          transform: scale(1.08);
        }

        .journey-card h4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
          color: var(--text2, #1e2535);
          line-height: 1.3;
          word-break: break-word;
        }

        .journey-card p {
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--muted, #6b6a8a);
          margin: 0;
          word-break: break-word;
        }

        /* =================== RESPONSIVE =================== */
        @media (max-width: 1024px) {
          .journey-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          .journey-grid::before {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .journey-sec {
            padding: 4rem clamp(0.9rem, 3.5vw, 1.4rem);
          }

          .journey-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-top: 2.5rem;
          }

          .journey-card {
            padding: 1.6rem 1rem 1.2rem;
            border-radius: 16px;
          }

          .journey-icon {
            font-size: 1.8rem;
            width: 52px;
            height: 52px;
            border-radius: 14px;
            margin: 0.4rem 0 0.85rem;
          }

          .journey-card h4 {
            font-size: 0.88rem;
          }

          .journey-card p {
            font-size: 0.75rem;
            line-height: 1.55;
          }
        }

        @media (max-width: 540px) {
          .journey-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
            margin-top: 2.2rem;
          }

          .journey-card {
            padding: 1.6rem 1.3rem 1.3rem;
            text-align: left;
            align-items: flex-start;
            display: grid;
            grid-template-columns: 56px 1fr;
            grid-template-rows: auto auto;
            gap: 0.5rem 1rem;
          }

          .journey-step-num {
            position: static;
            transform: none;
            grid-column: 1;
            grid-row: 1;
            padding: 0.3rem 0.6rem;
            font-size: 0.75rem;
            align-self: start;
            margin: 0;
          }

          .journey-icon {
            grid-column: 1;
            grid-row: 2;
            margin: 0;
            align-self: end;
            width: 48px;
            height: 48px;
            font-size: 1.6rem;
            border-radius: 12px;
          }

          .journey-card h4 {
            grid-column: 2;
            grid-row: 1;
            font-size: 0.9rem;
            margin: 0;
            align-self: center;
          }

          .journey-card p {
            grid-column: 2;
            grid-row: 2;
            font-size: 0.78rem;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default NoRolePage;