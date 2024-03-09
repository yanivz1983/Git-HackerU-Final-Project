import React, { useState, useEffect } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AdvertisementSlider = () => {
  const advertisementImages = [
    {
      url: "https://www.thehersheycompany.com/en_us/home.html",
      src:
        process.env.PUBLIC_URL + "/assets/imgs/minctosoft-removebg-preview.png",
    },
    {
      url: "https://example.com/page2",
      src: process.env.PUBLIC_URL + "/assets/imgs/macbook-removebg-preview.png",
    },
    {
      url: "https://example.com/page3",
      src:
        process.env.PUBLIC_URL +
        "/assets/imgs/maxresdefault-removebg-preview.png",
    },
    {
      url: "https://example.com/page3",
      src:
        process.env.PUBLIC_URL +
        "/assets/imgs/image_readtop-removebg-preview.png",
    },
    {
      url: "https://example.com/page3",
      src:
        process.env.PUBLIC_URL +
        "/assets/imgs/maxresdefault__1_-removebg-preview.png",
    },
    {
      url: "https://example.com/page3",
      src:
        process.env.PUBLIC_URL + "/assets/imgs/iphone15-removebg-preview.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === advertisementImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [advertisementImages.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === advertisementImages.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? advertisementImages.length - 1 : prevSlide - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "20px",
        marginTop: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <NavigateBeforeIcon
        style={{
          color: "grey",
          cursor: "pointer",
          position: "absolute",
          left: 0,
          opacity: 0.5,
        }}
        onClick={handlePrevSlide}
      />
      <a
        href={advertisementImages[currentSlide].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={advertisementImages[currentSlide].src}
          alt={`Advertisement ${currentSlide + 1}`}
          style={{ height: "200px", width: "auto" }}
        />
      </a>
      <NavigateNextIcon
        style={{
          color: "grey",
          cursor: "pointer",
          position: "absolute",
          right: 0,
          opacity: 0.5,
        }}
        onClick={handleNextSlide}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {advertisementImages.map((image, index) => (
          <div
            key={index}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: index === currentSlide ? "grey" : "#ccc",
              marginRight: "5px",
              cursor: "pointer",
              opacity: 0.5,
            }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSlider;
