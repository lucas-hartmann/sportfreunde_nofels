import React from "react";

type HeaderProps = {
  title: string;
  image: string;
  position?: string; // e.g. "center", "top", "bottom", "left top", "50% 20%"
};

const Header: React.FC<HeaderProps> = ({ title, image, position = "center" }) => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl lg:text-7xl font-black text-white text-center px-4">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
