import React from "react";

type CardFrontTemplateProps = {
  title: string;
  imageSrc: string | null;
  bgColor: string;
  color2?: string;
  color3?: string;
  color4?: string;
  gradientDirection?: "horizontal" | "vertical";
  backgroundImage?: string | null;
  shinyEffect: boolean;
  contents: string[];
};

const CardFrontTemplate: React.FC<CardFrontTemplateProps> = ({
  title,
  imageSrc,
  bgColor,
  contents,
  color2,
  color3,
  color4,
  gradientDirection,
  backgroundImage,
  shinyEffect,
}) => {
  const getBackgroundStyle = () => {
    if (backgroundImage) {
      return { backgroundImage: `url(${backgroundImage})` };
    } else if (color2 && color3 && color4 && gradientDirection) {
      return {
        background:
          gradientDirection === "horizontal"
            ? `linear-gradient(to right, ${bgColor}, ${color2}, ${color3}, ${color4})`
            : `linear-gradient(${bgColor}, ${color2}, ${color3}, ${color4})`,
      };
    } else {
      return { backgroundColor: bgColor };
    }
  };

  return (
    <>
      {/* <HolographicFilter/> */}
      <div
        className={`flex flex-col items-center border border-8 border-neutral-300 rounded-lg h-96 w-64 space-y-3 ${
          shinyEffect ? "shiny_effect" : ""
        }`}
        style={getBackgroundStyle()}
      >
        <div className="flex self-start justify-center pt-2 px-4 text-sm h-1/12 font-extrabold">
          {title}
        </div>
        <div
          className={`flex items-center justify-center text-sm ${
            imageSrc ? "border-none" : "border border-neutral-300"
          } h-1/3 w-5/6`}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded Card"
              className="max-h-full max-w-full"
            />
          ) : (
            "Image placeholder"
          )}
        </div>
        <div className="flex flex-col items-start justify-start text-xs border border-neutral-300 h-1/2 w-11/12 space-y-2 font-semibold">
          {contents.map((content, index) => (
            <div key={index} className="px-3 py-4">
              {content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// const HolographicFilter = () => (
//   <svg style={{ position: "absolute", width: 0, height: 0 }}>
//     <filter id="holographic-effect">
//       <feColorMatrix
//         type="matrix"
//         values="1 0 0 0 0  0 1 0 0 0  0 0 1 0.5 0  0 0 0 1 0"
//       />
//       <feComponentTransfer color-interpolation-filters="sRGB">
//         <feFuncR type="table" tableValues="0.05 0.9 0.22 0.9" />
//         <feFuncG type="table" tableValues="0.05 0.9 0.22 0.9" />
//         <feFuncB type="table" tableValues="0.05 0.9 0.22 0.9" />
//       </feComponentTransfer>
//     </filter>
//   </svg>
// );

export default CardFrontTemplate;
