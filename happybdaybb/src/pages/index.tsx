import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import photo1 from "@/assets/images/bb4.jpg";
import photo2 from "@/assets/images/cas1.jpg";
import photo3 from "@/assets/images/cas2.jpg";
import photo4 from "@/assets/images/cas3.jpg";

import cute from "@/assets/images/cute.png";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [playMockAudio, setPlayMockAudio] = useState(false);

  const cardRef = useRef(null);
  const cascadeRef = useRef(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef(null);

  const handleEnter = () => setEntered(true);

  const cascadeImages = [photo2, photo3, photo4];
  const textMessage =
    "My sweetest love, every day with you is a dream come true. Happy birthday! 💖";

  // Typewriter effect
  const typeWriter = (text: string, element: HTMLElement) => {
    element.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      element.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
  };

  // Handle VHS play
  const handlePlayMockAudio = () => {
    setPlayMockAudio(true);
    if (letterRef.current) typeWriter(textMessage, letterRef.current);
  };

  useEffect(() => {
    if (!entered) return;

    // Birthday card animation
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
      );
    }

    // Cascading images animation
    if (cascadeRef.current) {
      const images = cascadeRef.current.querySelectorAll("img");
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 50, rotate: i % 2 === 0 ? -5 : 5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            delay: i * 0.2,
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Floating particles
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
      particles.forEach((p) => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = 10 + Math.random() * 10;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;

        gsap.to(p, {
          y: -window.innerHeight - 50,
          x: "+=" + (Math.random() * 100 - 50),
          rotation: Math.random() * 360,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          ease: "linear",
          delay: Math.random() * 2,
        });
      });
    }
  }, [entered]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#A6D8FF] via-[#FF8CCF] to-[#FFB76B] overflow-x-hidden relative">
      {/* Floating Particles */}
      {entered && (
        <div
          ref={particlesRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="particle rounded-full bg-pink-300/80"
              style={{ position: "absolute" }}
            />
          ))}
        </div>
      )}

      {/* Landing Page */}
      {!entered && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-8 text-center drop-shadow-lg">
            Happy Birthday My Love!!!💖
          </h1>
          <button
            className="bg-white text-pink-600 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
            onClick={handleEnter}
          >
            please open this bb!
          </button>
          <Image
            src={cute}
          />
        </div>
      )}

      {/* Birthday Card Section */}
      {entered && (
        <section
          ref={cardRef}
          className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 max-w-6xl mx-auto min-h-screen"
        >
        <div className="relative w-80 h-80 md:w-[490px] md:h-[360px] flex-shrink-0">
          <div className="absolute inset-0 pulse-glow pointer-events-none rounded-xl" />
          <Image
            src={photo1}
            alt="Photo"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              My baby turns 23!
            </h1>
            <p className="text-lg md:text-xl drop-shadow-md">
              My dearest love, I just want to say how amazing you are. Every
              moment with you is a treasure, and I feel so lucky to celebrate
              this special day together. Happy birthday, my darling! 💖
            </p>
          </div>
        </section>
      )}

      {/* Cascading Images Section */}
      {entered && (
        <section
          ref={cascadeRef}
          className="flex flex-col items-center gap-12 min-h-screen justify-center pb-24"
        >
          {cascadeImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Cascade ${i + 1}`}
              className={`w-64 md:w-96 rounded-xl shadow-lg transform ${
                i % 2 === 0 ? "rotate-2" : "-rotate-2"
              }`}
            />
          ))}
        </section>
      )}

      {/* VHS Tape + Letter Section */}
      {entered && (
        <section className="mt-12 flex flex-col items-center space-y-12 pb-24">
          {/* Mock VHS Tape Player */}
          <div className="relative w-64 h-20 bg-pink-700 rounded-lg border-4 border-pink-900 shadow-lg flex items-center justify-center">
            <div className="absolute left-4 w-6 h-6 bg-red-400 rounded-full" />
            <div className="absolute left-12 w-6 h-6 bg-green-400 rounded-full" />

            {/* Play Button */}
            <div
              className="absolute right-4 w-12 h-12 bg-pink-900 rounded-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handlePlayMockAudio}
            >
              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
            </div>
          </div>
          {/* Typewriter Text Container */}
          <div className="relative w-80 max-w-xl px-6 py-12 bg-white rounded-2xl shadow-xl flex flex-col items-center overflow-hidden mt-8 mb-16">
            {/* Letter text */}
            <div
              ref={letterRef}
              className="relative text-center text-sm sm:text-base md:text-lg text-pink-700 break-words glow-text"
            />
          </div>
        </section>
      )}
    </div>
  );
}
