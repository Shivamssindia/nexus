//@ts-nocheck
"use client";
import React from 'react'

const Services = () => {
    // Industries Data — same sectors, reframed around SoftMax engineering + ROI
    const industriesData = [
        {
            id: 1,
            name: "Agriculture & Allied",
            tag: "Agriculture",
            icon: "fas fa-seedling",
            color: "ct",
            frontDesc: "Agri-tech that pays back",
            description: "We turn fragmented farm data into working software — Flutter/Kotlin field apps, IoT crop monitoring, and ML yield prediction on Spring Boot backends. Automated workflows replace manual reporting, lifting yield visibility and measurable ROI.",
            features: [
                "Field Apps (Flutter / Kotlin)",
                "ML Yield & Crop Prediction",
                "IoT Crop Monitoring",
                // "Automated Supply-Chain Workflows"
            ]
        },
        {
            id: 2,
            name: "Education",
            tag: "Education",
            icon: "fas fa-graduation-cap",
            color: "cb",
            frontDesc: "Sub-second learning platforms",
            description: "Scalable LMS and EdTech built on Next.js + Spring Boot, with WebRTC live classes and WebSocket real-time collaboration. We remove technical anxiety for institutions and improve engagement and completion ROI.",
            features: [
                "Next.js LMS Platforms",
                "WebRTC Live Classrooms",
                "Real-Time Collaboration (WebSocket)",
                // "Automated Assessment Workflows"
            ]
        },
        {
            id: 3,
            name: "Government",
            tag: "Government",
            icon: "fas fa-landmark",
            color: "cg",
            frontDesc: "Citizen systems that hold up",
            description: "E-governance and citizen portals engineered for peak load — sub-second response times, automated service workflows, and cloud-native deployment on Cloud DevOps. Designed for transparency, uptime, and measurable service-delivery ROI.",
            features: [
                "Cloud-Native E-Governance",
                "Sub-Second Citizen Portals",
                "Automated Service Workflows",
                // "Uptime & SLA Dashboards"
            ]
        },
        {
            id: 4,
            name: "Healthcare",
            tag: "Healthcare",
            icon: "fas fa-hospital-user",
            color: "cr",
            frontDesc: "Real-time care, measured",
            description: "Telemedicine on WebRTC, real-time patient updates over WebSocket, and ML-assisted diagnostics on Spring AI. Automated scheduling and reporting cut admin load — improving patient throughput and care ROI.",
            features: [
                "WebRTC Telemedicine",
                "ML-Assisted Diagnostics",
                "Real-Time Patient Updates",
                // "Automated Scheduling & Reporting"
            ]
        },
        {
            id: 5,
            name: "Infrastructure",
            tag: "Infrastructure",
            icon: "fas fa-road",
            color: "cp",
            frontDesc: "IoT + cloud, under pressure",
            description: "Smart-city and infrastructure monitoring built on IoT ingestion, ML anomaly detection, and Cloud DevOps pipelines. Live dashboards track project KPIs so performance and cost ROI are provable, not promised.",
            features: [
                "IoT Infrastructure Monitoring",
                "ML Anomaly Detection",
                "Cloud DevOps Pipelines",
                // "Live KPI Dashboards"
            ]
        },
        {
            id: 6,
            name: "MSME & Startups",
            tag: "MSME & Startups",
            icon: "fas fa-chart-line",
            color: "co",
            frontDesc: "Ship fast, scale clean",
            description: "MVPs and production systems on Next.js, Flutter, and Spring Boot — built to scale without rewrite. Automated workflows and cloud-native infra reduce ops cost, giving founders measurable ROI from day one.",
            features: [
                "Rapid MVP (Next.js / Flutter)",
                "Scalable Spring Boot APIs",
                "Automated Business Workflows",
                // "Cost-Optimized Cloud DevOps"
            ]
        },
        {
            id: 7,
            name: "Manufacturing",
            tag: "Manufacturing",
            icon: "fas fa-industry",
            color: "ct",
            frontDesc: "Industry 4.0, engineered",
            description: "Smart-factory systems with IoT telemetry, ML predictive maintenance, and WebSocket live floor dashboards. Automated alerts and workflows cut downtime — directly improving operational and maintenance ROI.",
            features: [
                "IoT Telemetry Ingestion",
                "ML Predictive Maintenance",
                "Live Floor Dashboards (WebSocket)",
                // "Automated Downtime Alerts"
            ]
        },
        {
            id: 8,
            name: "Retail & E-commerce",
            tag: "Retail",
            icon: "fas fa-shopping-cart",
            color: "cb",
            frontDesc: "Sub-second storefronts",
            description: "High-velocity storefronts and apps on Next.js + Flutter, with ML personalization and real-time inventory sync over WebSocket. Faster pages, automated ops, and conversion lifts you can measure in ROI.",
            features: [
                "Sub-Second Next.js Storefronts",
                "ML Personalization Engines",
                "Real-Time Inventory Sync",
                // "Automated Order Workflows"
            ]
        },
        {
            id: 9,
            name: "Logistics",
            tag: "Logistics",
            icon: "fas fa-truck",
            color: "cg",
            frontDesc: "Real-time tracking at scale",
            description: "Fleet and warehouse platforms with WebSocket live tracking, ML route optimization, and automated dispatch workflows on Cloud DevOps. Lower cost-per-delivery and measurable efficiency ROI.",
            features: [
                "Live Tracking (WebSocket)",
                "ML Route Optimization",
                "Automated Dispatch Workflows",
                // "Cloud-Scaled Fleet Ops"
            ]
        },
        {
            id: 10,
            name: "CSR",
            tag: "CSR",
            icon: "fas fa-hands-helping",
            color: "cr",
            frontDesc: "Impact you can prove",
            description: "CSR and social-impact platforms with automated data collection, real-time KPI dashboards, and Cloud DevOps reporting pipelines. Impact is measured continuously — turning programs into provable ROI.",
            features: [
                "Impact Data Platforms",
                "Real-Time KPI Dashboards",
                "Automated Reporting Pipelines",
                // "Cloud-Native Program Tracking"
            ]
        }
    ];

    // Helper function to get delay classes for animations
    const getDelayClass = (index: any) => {
        const delays = ["", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"];
        return delays[index % delays.length];
    };

    return (
        <>
            {/* <!-- =================== INDUSTRIES WE SERVE =================== --> */}
            <section id="services" className="services-sec">
                <div className="sec-inner sec-c">
                    <div className="sec-label fu"><i className="fas fa-industry"></i> Industries We Serve</div>
                    <h2 className="sec-title fu d1">Sectors We Transform</h2>
                    <p className="sec-sub fu d2">High-velocity, scalable systems engineered to perform under pressure. <strong style={{ color: "var(--teal)" }}>Hover a card</strong> to see how SoftMax removes technical anxiety and delivers measurable ROI.</p>
                </div>
                <div className="sec-inner services-grid">
                    {industriesData.map((industry, index) => (
                        <div key={industry.id} className={`flip-card fu ${getDelayClass(index)} ${industry.color}`}>
                            <div className="flip-inner">
                                {/* Front Side */}
                                <div className="flip-front">
                                    <div className="flip-hint-lbl">
                                        <i className="fas fa-sync-alt"></i>Flip
                                    </div>
                                    <div className={`fc-icon ${industry.color}`}>
                                        <i className={industry.icon}></i>
                                    </div>
                                    <h3>{industry.name}</h3>
                                    <p className="fc-hint">{industry.frontDesc}</p>
                                </div>
                                
                                {/* Back Side */}
                                <div className={`flip-back ${industry.color}`}>
                                    <div className="fc-tag">{industry.tag}</div>
                                    <h3>{industry.name}</h3>
                                    <p>{industry.description}</p>
                                    <ul>
                                        {industry.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Services









// //@ts-nocheck
// "use client";
// import React from 'react'

// const Services = () => {
//     // Industries Data - Easy to maintain and extend
//     const industriesData = [
//         {
//             id: 1,
//             name: "Agriculture & Allied",
//             tag: "Agriculture",
//             icon: "fas fa-seedling",
//             color: "ct",
//             frontDesc: "Smart farming solutions",
//             description: "AI-powered precision farming, supply chain optimization, crop monitoring, and agri-tech solutions that boost yield and farmer income.",
//             features: [
//                 "Precision Farming",
//                 "Supply Chain Optimization",
//                 "Crop Monitoring & Prediction",
//                 "Agri-Tech Advisory"
//             ]
//         },
//         {
//             id: 2,
//             name: "Education",
//             tag: "Education",
//             icon: "fas fa-graduation-cap",
//             color: "cb",
//             frontDesc: "Transform learning",
//             description: "Digital classrooms, EdTech platforms, skill development programs, and learning management systems for educational institutions and government bodies.",
//             features: [
//                 "Digital Classroom Solutions",
//                 "EdTech Platform Development",
//                 "Skill Development Programs",
//                 "Learning Management Systems"
//             ]
//         },
//         {
//             id: 3,
//             name: "Government",
//             tag: "Government",
//             icon: "fas fa-landmark",
//             color: "cg",
//             frontDesc: "Digital public infrastructure",
//             description: "E-governance solutions, public service delivery optimization, citizen engagement platforms, and PPP projects for large-scale social impact.",
//             features: [
//                 "E-Governance Solutions",
//                 "Public Service Optimization",
//                 "Citizen Engagement Portals",
//                 "PPP Project Advisory"
//             ]
//         },
//         {
//             id: 4,
//             name: "Healthcare",
//             tag: "Healthcare",
//             icon: "fas fa-hospital-user",
//             color: "cr",
//             frontDesc: "Patient-first innovation",
//             description: "Telemedicine platforms, health data analytics, hospital management systems, and AI-powered diagnostics for better patient outcomes.",
//             features: [
//                 "Telemedicine Platforms",
//                 "Health Data Analytics",
//                 "Hospital Management Systems",
//                 "AI-Powered Diagnostics"
//             ]
//         },
//         {
//             id: 5,
//             name: "Infrastructure",
//             tag: "Infrastructure",
//             icon: "fas fa-road",
//             color: "cp",
//             frontDesc: "Build smarter",
//             description: "Smart city solutions, project management consultancy, sustainable construction practices, and IoT-enabled infrastructure monitoring.",
//             features: [
//                 "Smart City Solutions",
//                 "Project Management Consultancy",
//                 "Sustainable Construction",
//                 "IoT Infrastructure Monitoring"
//             ]
//         },
//         {
//             id: 6,
//             name: "MSME & Startups",
//             tag: "MSME & Startups",
//             icon: "fas fa-chart-line",
//             color: "co",
//             frontDesc: "Scale with confidence",
//             description: "Business acceleration, digital transformation for small businesses, funding advisory, and growth strategy consulting tailored for emerging enterprises.",
//             features: [
//                 "Business Acceleration",
//                 "Digital Transformation",
//                 "Funding & Investment Advisory",
//                 "Growth Strategy Consulting"
//             ]
//         },
//         {
//             id: 7,
//             name: "Manufacturing",
//             tag: "Manufacturing",
//             icon: "fas fa-industry",
//             color: "ct",
//             frontDesc: "Industry 4.0 ready",
//             description: "Smart factory implementation, supply chain automation, predictive maintenance, and operational efficiency consulting for manufacturers.",
//             features: [
//                 "Smart Factory Implementation",
//                 "Supply Chain Automation",
//                 "Predictive Maintenance",
//                 "Operational Efficiency"
//             ]
//         },
//         {
//             id: 8,
//             name: "Retail & E-commerce",
//             tag: "Retail",
//             icon: "fas fa-shopping-cart",
//             color: "cb",
//             frontDesc: "Omnichannel excellence",
//             description: "Customer analytics, inventory management, personalization engines, and omnichannel integration for seamless shopping experiences.",
//             features: [
//                 "Customer Analytics",
//                 "Inventory Management",
//                 "Personalization Engines",
//                 "Omnichannel Integration"
//             ]
//         },
//         {
//             id: 9,
//             name: "Logistics",
//             tag: "Logistics",
//             icon: "fas fa-truck",
//             color: "cg",
//             frontDesc: "Move smarter",
//             description: "Route optimization, fleet management, warehouse automation, and real-time tracking solutions for efficient supply chain operations.",
//             features: [
//                 "Route Optimization",
//                 "Fleet Management",
//                 "Warehouse Automation",
//                 "Real-Time Tracking"
//             ]
//         },
//         {
//             id: 10,
//             name: "CSR",
//             tag: "CSR",
//             icon: "fas fa-hands-helping",
//             color: "cr",
//             frontDesc: "Purpose-driven impact",
//             description: "Social impact consulting, CSR strategy development, NGO partnerships, impact measurement, and community development initiatives.",
//             features: [
//                 "CSR Strategy Development",
//                 "NGO & Community Partnerships",
//                 "Impact Measurement & Reporting",
//                 "Community Development Programs"
//             ]
//         }
//     ];

//     // Helper function to get delay classes for animations
//     const getDelayClass = (index: any) => {
//         const delays = ["", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9"];
//         return delays[index % delays.length];
//     };

//     return (
//         <>
//             {/* <!-- =================== INDUSTRIES WE SERVE =================== --> */}
//             <section id="services" className="services-sec">
//                 <div className="sec-inner sec-c">
//                     <div className="sec-label fu"><i className="fas fa-industry"></i> Industries We Serve</div>
//                     <h2 className="sec-title fu d1">Sectors We Transform</h2>
//                     <p className="sec-sub fu d2">Performance-driven. Skill-led. Data-enabled. <strong style={{ color: "var(--teal)" }}>Hover a card</strong> to flip and explore industry details.</p>
//                 </div>
//                 <div className="sec-inner services-grid">
//                     {industriesData.map((industry, index) => (
//                         <div key={industry.id} className={`flip-card fu ${getDelayClass(index)} ${industry.color}`}>
//                             <div className="flip-inner">
//                                 {/* Front Side */}
//                                 <div className="flip-front">
//                                     <div className="flip-hint-lbl">
//                                         <i className="fas fa-sync-alt"></i>Flip
//                                     </div>
//                                     <div className={`fc-icon ${industry.color}`}>
//                                         <i className={industry.icon}></i>
//                                     </div>
//                                     <h3>{industry.name}</h3>
//                                     <p className="fc-hint">{industry.frontDesc}</p>
//                                 </div>
                                
//                                 {/* Back Side */}
//                                 <div className={`flip-back ${industry.color}`}>
//                                     <div className="fc-tag">{industry.tag}</div>
//                                     <h3>{industry.name}</h3>
//                                     <p>{industry.description}</p>
//                                     <ul>
//                                         {industry.features.map((feature, idx) => (
//                                             <li key={idx}>{feature}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Services









// import React from 'react'

// const Services = () => {
//     return (
//         <>
//             {/* <!-- =================== SERVICES =================== --> */}
//             <section id="services" className="services-sec">
//                 <div className="sec-inner sec-c">
//                     <div className="sec-label fu"><i className="fas fa-th-large"></i> Our Services</div>
//                     <h2 className="sec-title fu d1">What We Deliver</h2>
//                     <p className="sec-sub fu d2">Comprehensive AI-powered consulting solutions. <strong style={{ color: "var(--teal)" }}>Hover a card</strong> to flip and explore details.</p>
//                 </div>
//                 <div className="sec-inner services-grid">
//                     <div className="flip-card fu ct"><div className="flip-inner">
//                         <div className="flip-front"><div className="flip-hint-lbl"><i className="fas fa-sync-alt"></i>Flip</div><div className="fc-icon ct"><i className="fas fa-brain"></i></div><h3>AI &amp; Analytics</h3><p className="fc-hint">Turn data into decisive action</p></div>
//                         <div className="flip-back ct"><div className="fc-tag">AI / ML</div><h3>AI &amp; Analytics</h3><p>Machine learning, predictive analytics, and GenAI that unlock hidden insights and automate complex decisions at scale.</p><ul><li>Predictive Analytics Engines</li><li>GenAI Product Development</li><li>NLP &amp; Computer Vision</li></ul></div>
//                     </div></div>
//                     <div className="flip-card fu d1 cb"><div className="flip-inner">
//                         <div className="flip-front"><div className="flip-hint-lbl"><i className="fas fa-sync-alt"></i>Flip</div><div className="fc-icon cb"><i className="fas fa-cloud-upload-alt"></i></div><h3>Cloud Transformation</h3><p className="fc-hint">Scale with confidence</p></div>
//                         <div className="flip-back cb"><div className="fc-tag">Cloud</div><h3>Cloud Transformation</h3><p>End-to-end cloud migration, DevOps automation, and Kubernetes orchestration for resilient, scalable infrastructure.</p><ul><li>Multi-Cloud Architecture</li><li>DevOps &amp; CI/CD Pipelines</li><li>Kubernetes &amp; Microservices</li></ul></div>
//                     </div></div>
//                     <div className="flip-card fu d2 cg"><div className="flip-inner">
//                         <div className="flip-front"><div className="flip-hint-lbl"><i className="fas fa-sync-alt"></i>Flip</div><div className="fc-icon cg"><i className="fas fa-chart-line"></i></div><h3>Digital Strategy</h3><p className="fc-hint">Roadmap to the future</p></div>
//                         <div className="flip-back cg"><div className="fc-tag">Strategy</div><h3>Digital Strategy</h3><p>Roadmap consulting, product engineering, and innovation labs that accelerate your time-to-market and competitive positioning.</p><ul><li>Digital Transformation Roadmaps</li><li>Product Engineering</li><li>Innovation Lab Setup</li></ul></div>
//                     </div></div>
//                     <div className="flip-card fu d1 cr"><div className="flip-inner">
//                         <div className="flip-front"><div className="flip-hint-lbl"><i className="fas fa-sync-alt"></i>Flip</div><div className="fc-icon cr"><i className="fas fa-shield-alt"></i></div><h3>Cybersecurity</h3><p className="fc-hint">Protect what matters most</p></div>
//                         <div className="flip-back cr"><div className="fc-tag">Security</div><h3>Cybersecurity</h3><p>Enterprise-grade security frameworks, compliance auditing, and risk management to protect your critical digital assets.</p><ul><li>Zero Trust Architecture</li><li>SOC 2 / ISO 27001 Compliance</li><li>Threat Intelligence &amp; Response</li></ul></div>
//                     </div></div>
//                     <div className="flip-card fu d2 cp"><div className="flip-inner">
//                         <div className="flip-front"><div className="flip-hint-lbl"><i className="fas fa-sync-alt"></i>Flip</div><div className="fc-icon cp"><i className="fas fa-microchip"></i></div><h3>IoT &amp; Edge</h3><p className="fc-hint">Connect the physical world</p></div>
//                         <div className="flip-back cp"><div className="fc-tag">IoT</div><h3>IoT &amp; Edge</h3><p>Connected device networks, real-time monitoring, and smart infrastructure solutions for Industry 4.0 transformation.</p><ul><li>Industrial IoT Deployments</li><li>Edge AI Processing</li><li>Smart City Solutions</li></ul></div>
//                     </div></div>
//                     <div className="flip-card fu d3 co"><div className="flip-inner">
//                         <div className="flip-front"><div className="flip-hint-lbl"><i className="fas fa-sync-alt"></i>Flip</div><div className="fc-icon co"><i className="fas fa-users-cog"></i></div><h3>Talent &amp; PPP</h3><p className="fc-hint">Right people, right time</p></div>
//                         <div className="flip-back co"><div className="fc-tag">Talent</div><h3>Talent &amp; PPP</h3><p>AI-powered consultant matching, managed-mode engagements, and Public-Private Partnership structuring for large-scale impact.</p><ul><li>AI Consultant Matching</li><li>Managed Engagements</li><li>PPP Deal Structuring</li></ul></div>
//                     </div></div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Services