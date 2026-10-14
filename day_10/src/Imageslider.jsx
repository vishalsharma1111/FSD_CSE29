import React, { useEffect, useState } from "react";
import "./AutoSlider.css";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
];

function AutoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img
              src={`${image}?auto=format&fit=crop&w=1200&q=80`}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoSlider;