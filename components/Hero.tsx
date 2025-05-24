"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function Hero() {
  const satelliteRef = useRef(null);
  const terminalRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    // Satellite animation
    gsap.fromTo(
      satelliteRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // Terminal animation
    gsap.fromTo(
      terminalRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.3 }
    );

    // Floating badges animation
    const badges = (badgesRef.current as HTMLDivElement | null)?.children;
    if (badges) {
      gsap.to(badges, {
        y: "random(-10, 10)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }
  }, []);

  return (
    <div className="relative bg-trust-blue text-white overflow-hidden hexagon-pattern">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Invest in Rural Bangladesh's Digital Future
            </h1>
            <p className="text-xl mb-8">
              Fund Starlink terminals in rural markets and earn 10-50% profit from hourly internet access fees.
            </p>
            <Link href="#calculator" className="bg-growth-green hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Invest Now
            </Link>
          </div>
          
          <div className="relative h-64 md:h-96">
            {/* Satellite animation */}
            <div ref={satelliteRef} className="absolute top-0 right-0">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                <path d="M5,18h14v-5h-14V18z M6,14h12v3H6V14z M12,2L4,9v3h16V9L12,2z M12,4.4l4,3.6H8L12,4.4z M12,9c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,9,12,9z"/>
              </svg>
            </div>
            
            {/* Terminal animation */}
            <div ref={terminalRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <svg width="160" height="160" viewBox="0 0 24 24" fill="white">
                <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M15,9l-6,6l2,0l6-6L15,9z"/>
              </svg>
            </div>
            
            {/* Floating profit badges */}
            <div ref={badgesRef} className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white text-trust-blue rounded-full h-16 w-16 flex items-center justify-center font-bold text-xl absolute top-10 left-10">
                10%
              </div>
              <div className="bg-white text-trust-blue rounded-full h-16 w-16 flex items-center justify-center font-bold text-xl absolute top-20 right-20">
                25%
              </div>
              <div className="bg-white text-trust-blue rounded-full h-16 w-16 flex items-center justify-center font-bold text-xl absolute bottom-10 left-20">
                50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}