import React, { useState, useEffect, useRef } from 'react';

export function DecryptedText({
  text = '',
  speed = 30,
  maxIterations = 6,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#/*',
  className = '',
  parentClassName = '',
  animateOn = 'hover', // 'hover' | 'always'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    iterationRef.current = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        const textArray = text.split('');
        const currentIteration = iterationRef.current;

        const newText = textArray
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < currentIteration) {
              return text[index];
            }
            const randomChar = characters[Math.floor(Math.random() * characters.length)];
            return randomChar || char;
          })
          .join('');

        iterationRef.current += 1;

        if (iterationRef.current > text.length + maxIterations) {
          clearInterval(intervalRef.current);
          setIsScrambling(false);
          return text;
        }

        return newText;
      });
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'always') {
      scramble();
    }
    return () => clearInterval(intervalRef.current);
  }, [text, animateOn]);

  return (
    <span
      className={`inline select-text ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === 'hover') scramble();
      }}
      {...props}
    >
      <span className={`inline ${className}`}>{displayText}</span>
    </span>
  );
}
