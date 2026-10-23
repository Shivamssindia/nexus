"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ttb from "@/components/Ttb";
import Banner from "@/components/Banner";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

export default function Home() {
  const { user, refreshUser } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================================================
  // SIGN IN — One Tap primary, Firebase popup fallback
  // =========================================================
  const handleSignIn = async () => {
    setError(null);

    // 1. Try Google One Tap first
    if (window.triggerGoogleLogin) {
      try {
        window.triggerGoogleLogin();
        return;
      } catch {
        // fall through to Firebase popup
      }
    }

    // 2. Firebase Popup fallback
    if (!auth) {
      setError(
        "Firebase Auth is not configured. Check NEXT_PUBLIC_FIREBASE_* env vars."
      );
      return;
    }

    setIsSigningIn(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const userCred = await signInWithPopup(auth, provider);
      const idToken = await userCred.user.getIdToken();

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        { token: idToken },
        { withCredentials: true }
      );

      await refreshUser();
    } catch (err: any) {
      if (err?.code === "auth/popup-blocked") {
        setError("Popup blocked. Please allow popups for this site.");
      } else if (err?.code !== "auth/popup-closed-by-user") {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // =========================================================
  // PAGE EFFECTS — smooth scroll, faders, mobile drawer
  // =========================================================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");

    (window as any).smoothTo = (id: string) =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });

    const anchorHandler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute("href")?.slice(1);
      if (id && document.getElementById(id)) {
        e.preventDefault();
        (window as any).smoothTo(id);
        closeMob();
      }
    };

    const anchors =
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", anchorHandler));

    const ham = document.getElementById("ham") as HTMLElement | null;
    const mob = document.getElementById("mobDrawer") as HTMLElement | null;

    const closeMob = () => {
      mob?.classList.remove("open");
      ham?.classList.remove("open");
    };

    const hamHandler = () => {
      mob?.classList.toggle("open");
      ham?.classList.toggle("open");
    };

    ham?.addEventListener("click", hamHandler);

    const outsideHandler = (e: MouseEvent) => {
      if (
        !mob?.contains(e.target as Node) &&
        !ham?.contains(e.target as Node)
      )
        closeMob();
    };
    document.addEventListener("click", outsideHandler);

    const faders = document.querySelectorAll<HTMLElement>(".fu");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    faders.forEach((f) => io.observe(f));

    const timeout = setTimeout(() => {
      faders.forEach((f) => {
        if (f.getBoundingClientRect().top < window.innerHeight - 40) {
          f.classList.add("vis");
        }
      });
    }, 80);

    return () => {
      io.disconnect();
      clearTimeout(timeout);
      anchors.forEach((a) =>
        a.removeEventListener("click", anchorHandler)
      );
      ham?.removeEventListener("click", hamHandler);
      document.removeEventListener("click", outsideHandler);
    };
  }, []);

  return (
    <>
      <div id="sp"></div>
      <Navbar />
      <Banner />

      {/* =====================================================
          SIGN-IN HERO SECTION
         ===================================================== */}
      <section className="hero" style={{ minHeight: "100vh" }}>
        <div className="hero-overlay"></div>

        <div
          className="hero-body"
          style={{
            paddingTop: "calc(var(--nav-h) + 4rem)",
            paddingBottom: "4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="signin-card"
            style={{
              maxWidth: "460px",
              width: "100%",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "26px",
              padding: "2.5rem 2rem",
              boxShadow: "var(--shadow-lg)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative glow */}
            <div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(160,90,255,.18), transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Logo */}
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 1.3rem",
                borderRadius: "20px",
                background: "var(--g-main)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: 900,
                color: "#fff",
                boxShadow: "0 8px 28px rgba(160,90,255,.4)",
              }}
            >
              S
            </div>

            <h1
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
                marginBottom: "0.6rem",
                color: "var(--text)",
              }}
            >
              Welcome to{" "}
              <span className="g1">Softmax</span>
              <br />
              <span className="g2">Nexus</span>
            </h1>

            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: "340px",
                margin: "0 auto 2rem",
              }}
            >
              One platform for Trainees, Interns, Consultants, and
              Employees. Sign in to access your personalized dashboard.
            </p>

            {/* Sign In — Google */}
            {user ? (
              <a
                href="/dashboard"
                className="btn-prim"
                style={{
                  display: "inline-flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  padding: "0.95rem 1.7rem",
                  borderRadius: "40px",
                  background: "var(--g-main)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  boxShadow: "0 6px 20px rgba(160,90,255,.4)",
                  transition: "transform .25s var(--bounce)",
                }}
              >
                <img
                  src={user.photoUrl || "/img/default-avatar.png"}
                  alt={user.name}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #fff",
                  }}
                />
                Continue as {user.name?.split(" ")[0]}
                <i className="fas fa-arrow-right"></i>
              </a>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="btn-prim"
                style={{
                  display: "inline-flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.95rem 1.7rem",
                  borderRadius: "40px",
                  background: "var(--g-main)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: isSigningIn ? "not-allowed" : "pointer",
                  opacity: isSigningIn ? 0.75 : 1,
                  boxShadow: "0 6px 20px rgba(160,90,255,.4)",
                  transition: "transform .25s var(--bounce)",
                }}
              >
                {isSigningIn ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid rgba(255,255,255,.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin .6s linear infinite",
                      }}
                    ></span>
                    Signing in…
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        fill="#fff"
                        d="M44.5 20H24v8.5h11.8c-1.1 5.2-5.6 8.9-11.8 8.9-7.1 0-12.8-5.7-12.8-12.8s5.7-12.8 12.8-12.8c3.2 0 6.1 1.2 8.3 3.1l6.1-6.1C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c11.3 0 20.7-8.2 20.7-21 0-1.4-.2-2.5-.5-4z"
                      />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            )}

            {/* Error */}
            {error && (
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  color: "var(--red)",
                  background: "rgba(254,148,150,.1)",
                  padding: "0.6rem 0.9rem",
                  borderRadius: "10px",
                }}
              >
                {error}
              </p>
            )}

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                margin: "1.8rem 0 1.2rem",
                color: "var(--muted)",
                fontSize: "0.72rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--border)",
                }}
              />
              <span>What you get</span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "var(--border)",
                }}
              />
            </div>

            {/* Feature list */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem",
                textAlign: "left",
              }}
            >
              {[
                { icon: "🎓", label: "Trainee" },
                { icon: "🧑‍💼", label: "Intern" },
                { icon: "👨‍💻", label: "Consultant" },
                { icon: "🏢", label: "Employee" },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.6rem 0.8rem",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--text2)",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>{r.icon}</span>
                  {r.label}
                </div>
              ))}
            </div>

            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "0.72rem",
                color: "var(--muted)",
              }}
            >
              Secure sign-in powered by Google &amp; Firebase
            </p>
          </div>
        </div>

        <div className="scroll-ind">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <Ttb />
      <Footer />

      {/* Minimal keyframe for spinner only */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}














// "use client";

// import React, { useEffect } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Ttb from "@/components/Ttb";
// import Hero from "@/components/Hero";
// import Tecket from "@/components/Tecket";
// import About from "@/components/About";
// import Metrics from "@/components/Metrics";
// import Services from "@/components/Services";
// import HowItWorks from "@/components/HowItWorks";
// import Testimonials from "@/components/Testimonials";
// import Cta from "@/components/Cta";
// import ModalClient from "@/components/ModalClient";
// import ModalConsult from "@/components/ModelConsult";
// import Banner from "@/components/Banner";
// import { useAuth } from "@/contexts/AuthContext";

// export default function Home() {
//   const { user } = useAuth();

//   useEffect(() => {
//     // Force light theme by default
//     document.documentElement.setAttribute("data-theme", "light");

//     // ---------------------------
//     // Smooth scroll for anchor links
//     // ---------------------------
//     (window as any).smoothTo = (id: string) =>
//       document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

//     const anchorHandler = (e: Event) => {
//       const a = e.currentTarget as HTMLAnchorElement;
//       const id = a.getAttribute("href")?.slice(1);
//       if (id && document.getElementById(id)) {
//         e.preventDefault();
//         (window as any).smoothTo(id);
//         closeMob();
//       }
//     };

//     const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
//     anchors.forEach((a) => a.addEventListener("click", anchorHandler));

//     // ---------------------------
//     // Mobile drawer toggle
//     // ---------------------------
//     const ham = document.getElementById("ham") as HTMLElement | null;
//     const mob = document.getElementById("mobDrawer") as HTMLElement | null;

//     const closeMob = () => {
//       mob?.classList.remove("open");
//       ham?.classList.remove("open");
//     };

//     const hamHandler = () => {
//       mob?.classList.toggle("open");
//       ham?.classList.toggle("open");
//     };

//     ham?.addEventListener("click", hamHandler);

//     const outsideHandler = (e: MouseEvent) => {
//       if (!mob?.contains(e.target as Node) && !ham?.contains(e.target as Node)) closeMob();
//     };
//     document.addEventListener("click", outsideHandler);

//     // ---------------------------
//     // Fade-up animations
//     // ---------------------------
//     const faders = document.querySelectorAll<HTMLElement>(".fu");
//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("vis");
//             io.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
//     );
//     faders.forEach((f) => io.observe(f));

//     const timeout = setTimeout(() => {
//       faders.forEach((f) => {
//         if (f.getBoundingClientRect().top < window.innerHeight - 40) {
//           f.classList.add("vis");
//         }
//       });
//     }, 80);

//     return () => {
//       io.disconnect();
//       clearTimeout(timeout);
//       anchors.forEach((a) => a.removeEventListener("click", anchorHandler));
//       ham?.removeEventListener("click", hamHandler);
//       document.removeEventListener("click", outsideHandler);
//     };
//   }, []);

//   return (
//     <>
//       <div id="sp"></div>
//       <Navbar />
//       <Banner />
//       <Hero />
//       <Tecket />
//       <About />
//       <Metrics />
//       <Services />
//       <HowItWorks />
//       <Testimonials />
//       <Cta />
//       <Ttb />
//       <ModalClient />
//       <ModalConsult />
//       <Footer />
//     </>
//   );
// }


