import React from "react";

type HeaderProps = {
  title: string;
  image: string;
};

const Header: React.FC<HeaderProps> = ({ title, image }) => {
  return (
    <div className="relative w-full h-[70vh]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
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
