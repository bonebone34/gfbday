import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Head from "next/head";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import photo1 from "@/assets/images/bb4.jpg";
import photo2 from "@/assets/images/cas1.jpg";
import photo3 from "@/assets/images/cas2.jpg";
import photo4 from "@/assets/images/cas3.jpg";

import cute from "@/assets/images/cute.png";

import sticker1 from "@/assets/images/sticker1.png";
import sticker2 from "@/assets/images/sticker5.png";
import sticker3 from "@/assets/images/sticker4.png";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [playMockAudio, setPlayMockAudio] = useState(false);

  const cardRef = useRef(null);
  const cascadeRef = useRef(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioFile = "/audio/audio.mp3";

  const handleEnter = () => setEntered(true);

  const cascadeImages = [photo2, photo3, photo4];
  const textMessage =
    "Hi, My Love. I just want to greet you with a very, very happy birthday. And I hope you're doing well. And I hope you're doing fine. And I hope everything is well. I just want to remind you that I'm always here for you. And that you can always count on me on every single thing. You can always lean on me. You can always depend on me, okay? I love you so much, baby. I love you, I love you, love you. I hope you have a wonderful day and I hope you have a wonderful birthday. And if you don't, then I'll make it a wonderful birthday for you. I'll do my best, okay? I love you so much, baby. I love you so much. I love you, baby. Happy birthday, my love. You thought I forgot about it? No, baby. No, no, no. I love you, baby. I love you so much. Please have a wonderful birthday and... Please stay beautiful, stay sexy, stay amazing, stay intelligent. Just be who you are, baby. You're completely perfect, completely fine. I love you so much. I love you, baby. You mean the world to me. I'm so happy you came into my life. I'm so happy I met you. I love you. I love you so much. I love you, Liviu. You're the most beautiful girl of my life. I love you. Please have a wonderful birthday, my love. I hope this helps and makes your day better and makes your birthday worth to look forward to. I know I'm so far away and I can't celebrate it close to you, but I hope you know that I'm celebrating it here by myself. Not actually with you. I mean... It's that... What I mean is that I'm always here for you. I'm always with you, my love. Okay? You can always count on me, huh? I love you, baby. Have a wonderful birthday, my love. I love you. I love you so much.";

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
      if (!audioRef.current) return;

      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlayMockAudio(true);

        if (letterRef.current) {
          typeWriter(textMessage, letterRef.current);
        }
      } else {
        audioRef.current.pause();
        setPlayMockAudio(false);
      }
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

    // Prepare bubbles
    const bubbleIds = ["bubble-1", "bubble-2", "bubble-3"];
    bubbleIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        gsap.set(el, { opacity: 0, scale: 0 });
      }
    });

    // Single ScrollTrigger for bubbles sequential animation
    ScrollTrigger.create({
      trigger: cascadeRef.current,
      start: "top center",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        bubbleIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            tl.to(
              el,
              {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "back.out(1.7)",
              },
              ">0.4" // 0.4s delay between bubbles
            ).to(
              el,
              {
                opacity: 0,
                duration: 1,
                ease: "power1.out",
                delay: 2, // visible for 2 seconds before fade
              },
              "+=2"
            );
          }
        });
      },
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, [entered]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=BBH+Sans+Hegarty&family=Fjalla+One&display=swap"
          rel="stylesheet"
        />
      </Head>

      <audio ref={audioRef}>
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div
        className="min-h-screen bg-gradient-to-r from-[#A6D8FF] via-[#FF8CCF] to-[#FFB76B] overflow-x-hidden relative"
      >
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
            <h1 className="font-bbh text-white text-5xl md:text-7xl font-bold mb-8 text-center drop-shadow-lg text-dim-highlight">
              Happy Birthday Baby💖
            </h1>
            <button
              className="font-fjalla bg-white text-pink-600 font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
              onClick={handleEnter}
            >
              please open this bb!
            </button>
            <Image src={cute} alt="Cute" />
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
              <h1 className="font-bbh text-2xl md:text-5xl font-bold mb-4 drop-shadow-lg text-black-highlight">
                My baby turns
                <span className="font-fjalla-one text-red-400 text-5xl md:text-7xl inline-block align-middle ml-2 text-white-highlight">
                  23!
                </span>
              </h1>
              <p className="font-fjalla text-lg md:text-xl drop-shadow-md text-black-highlight">
                Just how fast time has flied, I met you at 21 now I'm spending your 23rd with you my love.
                <br/> I'm beyond blessed to have you in my life baby, Thank you for coming into my beautiful life.
                <br/> I love you so much, happy birthday bebi😭😭
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="animate-bounce text-pink-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
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

        <audio ref={audioRef} src={audioFile} preload="auto" className="hidden" />

        {/* VHS Tape + Letter Section */}
        {entered && (
          <section className="mt-12 flex flex-col items-center space-y-12 pb-24">
            {/* Mock VHS Tape Player */}
            <div className="relative w-64 h-20 bg-pink-700 rounded-lg border-4 border-pink-900 shadow-lg flex items-center justify-center">
              <div className="absolute left-4 w-6 h-6 bg-red-400 rounded-full" />
              <div className="absolute left-12 w-6 h-6 bg-green-400 rounded-full" />

            {/* Play/Pause Button */}
            <div
              className="absolute right-4 w-12 h-12 bg-pink-900 rounded-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handlePlayMockAudio}
            >
              {playMockAudio ? (
                // Pause icon
                <div className="flex gap-1">
                  <div className="w-1.5 h-5 bg-white"></div>
                  <div className="w-1.5 h-5 bg-white"></div>
                </div>
              ) : (
                // Play icon
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
              )}
            </div>

            </div>
            {/* Typewriter Text Container */}
            <div className="relative w-80 max-w-xl px-6 py-12 bg-white rounded-2xl shadow-xl flex flex-col items-center overflow-hidden mt-8 mb-16">
              {/* Letter text */}
              <div
                ref={letterRef}
                className="font-fjalla relative text-center text-sm sm:text-base md:text-lg text-pink-700 break-words glow-text"
              />
            </div>
          </section>
        )}

        {/* 🎉 Sticker Bubbles */}
        {entered && (
          <>
            {[
              {
                id: "bubble-1",
                img: sticker1,
                msg: "I love you",
                side: "left",
              },
              {
                id: "bubble-2",
                img: sticker2,
                msg: "You're BEAUTIFUL!!!",
                side: "right",
              },
              {
                id: "bubble-3",
                img: sticker3,
                msg: "Happy 23rd!",
                side: "left",
              },
            ].map((item, index) => {
              const topPos = 25 + index * 100;
              const style =
                item.side === "left"
                  ? {
                      top: `${topPos}px`,
                      left: "12px",
                      right: "auto",
                      transformOrigin: "left center",
                    }
                  : {
                      top: `${topPos}px`,
                      right: "12px",
                      left: "auto",
                      transformOrigin: "right center",
                    };

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="fixed z-50 flex items-center gap-2 bg-white/90 rounded-full p-3 shadow-lg select-none opacity-0 scale-0"
                  style={style}
                >
                  <Image
                    src={item.img}
                    alt="Sticker"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="relative bg-pink-400 text-white font-bold px-4 py-2 rounded-full shadow-md whitespace-nowrap select-none">
                    {item.msg}
                    {/* Bubble tails */}
                    <div
                      className={`absolute top-1/2 w-4 h-4 bg-pink-400 rounded-full -translate-y-1/2 ${
                        item.side === "left" ? "-left-3" : "-right-3"
                      }`}
                    />
                    <div
                      className={`absolute top-1/2 w-2 h-2 bg-pink-400 rounded-full -translate-y-1/2 ${
                        item.side === "left" ? "-left-7" : "-right-7"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
