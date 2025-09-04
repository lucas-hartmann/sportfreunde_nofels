import React from "react";

type HeaderProps = {
  title: string;
  image: string;
  position?: string; // e.g. "center", "top", "bottom", "left top", "50% 20%"
};

const Header: React.FC<HeaderProps> = ({ title, image, position = "center" }) => {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-[50vh] lg:h-[70vh] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white text-center leading-tight px-3 sm:px-4">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
