import React, { useEffect, useState } from "react";
import "./ImageRotator.css";

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",
];

function ImageRotator() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => prev + 72);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rotator-container">
      <div
        className="rotator"
        style={{
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        {images.map((image, index) => {
          const angle = index * 72;

          return (
            <div
              className="rotator-card"
              key={index}
              style={{
                transform: `rotateY(${angle}deg) translateZ(400px)`,
              }}
            >
              <img
                src={`${image}?auto=format&fit=crop&w=600&q=80`}
                alt={`Image ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageRotator;