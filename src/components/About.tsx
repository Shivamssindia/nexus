import React from 'react'

const About = () => {
    return (
        <>
            {/* <!-- =================== ABOUT =================== --> */}
            <section id="about" className="about-sec">
                <div className="sec-inner">
                    <div className="about-grid">
                        <div className="about-text fu">
                            <div className="sec-label"><i className="fas fa-code"></i> About Us</div>
                            <h2 className="sec-title">Softmax Story</h2>
                            <p>Softmax Technologies &amp; IT Services delivers high-velocity, scalable digital
                                systems engineered to perform under pressure. We focus on zero technical anxiety,
                                measurable business ROI, sub-second response times, automated workflows, and
                                modern cloud/AI-driven software solutions. Our technology stack spans Flutter,
                                Kotlin, Next.js, WebRTC, WebSocket, Spring Boot, Spring AI, Machine Learning,
                                and Cloud DevOps — building future-ready products that scale with your ambition.</p>
                            <div className="about-ctas">
                                <button className="btn-prim" onClick={() => { }}>How We Work →</button>
                                <button className="btn-outline-t">Case Studies</button>
                            </div>
                        </div>
                        <div className="about-visual fu d2">
                            <div className="av-row">
                                <div className="av-card"><div className="av-icon">⚡</div><h4>High-Velocity Delivery</h4><p>Scalable systems engineered to perform under pressure — sub-second response times, zero downtime.</p></div>
                                <div className="av-card"><div className="av-icon">📊</div><h4>Measurable ROI</h4><p>Every solution tied to real business outcomes — automated workflows and KPI-driven tracking.</p></div>
                            </div>
                            <div className="av-row">
                                <div className="av-card"><div className="av-icon">🤖</div><h4>AI-Driven Stack</h4><p>Spring AI, Machine Learning, and Cloud DevOps powering next-gen intelligent applications.</p></div>
                                <div className="av-card"><div className="av-icon">🔒</div><h4>Zero Technical Anxiety</h4><p>Modern cloud architecture with enterprise-grade security, scale, and reliability built in.</p></div>
                            </div>
                            <div className="av-hero">
                                <div className="av-hero-num">7+ Technologies</div>
                                <div className="av-hero-lbl">Flutter • Kotlin • Next.js • WebRTC • WebSocket • Spring Boot • Cloud DevOps</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About