import React from "react";

type CardFrontTemplateProps = {
  designSrc: string | null;
};

const CardBackTemplate: React.FC<CardFrontTemplateProps> = ({ designSrc }) => {
  return (
    <div style={{ backgroundImage: `url(${designSrc})` }} className="flex items-center justify-center border border-neutral-300 rounded-xl h-96 w-64"></div>
  );
};

export default CardBackTemplate;