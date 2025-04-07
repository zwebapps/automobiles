// components/Typewriter.tsx
import { useEffect, useRef } from 'react';

interface TypewriterProps {
  words: string[];
  period?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ words, period = 3000 }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let loopNum = 0;
    let txt = '';
    let isDeleting = false;

    const tick = () => {
      const i = loopNum % words.length;
      const fullTxt = words[i];

      if (isDeleting) {
        txt = fullTxt.substring(0, txt.length - 1);
      } else {
        txt = fullTxt.substring(0, txt.length + 1);
      }

      if (textRef.current) {
        textRef.current.innerHTML = txt;
      }

      let delta = 200 - Math.random() * 100;
      if (isDeleting) delta /= 2;

      if (!isDeleting && txt === fullTxt) {
        delta = period;
        isDeleting = true;
      } else if (isDeleting && txt === '') {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }

      setTimeout(tick, delta);
    };

    tick();
  }, [words, period]);

  return (
        <h1 className="main-title">
                Automotive&rsquo;s 
                <span className="typewrite">
                <span ref={textRef} className="wrap" />
                </span>
                <style jsx>{`
                    .typewrite > .wrap {
                    padding-left: 0.3em;
                    color: #007bff;
                    border-right: 0.08em solid #fff;
                    }
                `}</style>
        </h1>
        );
};

export default Typewriter;
