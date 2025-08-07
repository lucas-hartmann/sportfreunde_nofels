import React from "react";

type HeadlineProps = {
  pill: string;
  blackLine: string;
  redLine: string;
  description: string;
};

const Headline: React.FC<HeadlineProps> = ({
  pill,
  blackLine,
  redLine,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="border border-gray-400 rounded-full py-1 px-2 text-primary text-sm font-semibold">
        {pill}
      </div>

      <h2 className="text-4xl md:text-6xl font-bold">
        {blackLine}
        <span className="block text-primary">{redLine}</span>
      </h2>

      <p className="text-gray-600 text-xl">{description}</p>
    </div>
  );
};

export default Headline;
