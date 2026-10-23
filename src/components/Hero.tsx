import { useAuth } from '@/contexts/AuthContext';
import React from 'react'

const Hero = () => {
  const { isAuthenticated, loading, user } = useAuth();
  
  return (
    <>
        {/* <!-- =================== HERO =================== --> */}
<section id="home" className="hero">
  <div className="hero-video-wrap">
    <video className="hero-video" autoPlay loop muted playsInline>
      <source src="video/video01.mp4" type="video/mp4"/>
    </video>
  </div>
  <div className="hero-overlay"></div>
  <div className="hero-body">
    <div className="hero-badge"><span className="bp"></span> Now Live — India's Premier Consulting OS</div>
    <h1>India's <span className="g1">Consulting</span><br/><span className="g2">Operating System</span></h1>
    <p className="hero-desc">{user?.name && <><span style={{fontSize : "20px"}}>W</span>elcome {user?.name}</>} Gaurion Bharat bridges enterprises and elite consultants through AI-powered matching, managed execution, and real-time impact dashboards — delivering measurable transformation.</p>
    <div className="hero-btns">
      <a className="btn-prim" href='#services'>
        <i className="fas fa-rocket"></i> Explore Solutions
      </a>
      {user ? (
        <a className="btn-ghost" href='/dashboard'>
          <img src={`${user.photoUrl}`} className='w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-blue-500' alt="profile photo" /> Console
        </a>
      ) : (
        <button className="btn-ghost" onClick={() => window.triggerGoogleLogin?.()}>
          <i className="fas fa-user"></i> Get Started
        </button>
      )}
    </div>
    <div className="hero-stats">
      <div><div className="h-snum">300+</div><div className="h-slbl">Expert Consultants</div></div>
      <div><div className="h-snum">580+</div><div className="h-slbl">Projects Delivered</div></div>
      <div><div className="h-snum">15+</div><div className="h-slbl">Countries Served</div></div>
      <div><div className="h-snum">3.4×</div><div className="h-slbl">Average ROI</div></div>
    </div>
  </div>
  <div className="scroll-ind"><span>Scroll</span><div className="scroll-line"></div></div>
</section>
    </>
  )
}

export default Hero