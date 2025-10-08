import { useEffect, useState } from "react";

export default function TypewriterText({ text, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <p className="text-white text-xl md:text-2xl text-center px-4 max-w-3xl drop-shadow-md mt-6">
      {displayedText}
    </p>
  );
}
