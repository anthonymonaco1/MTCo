"use client";

import CardFrontTemplate from "./templates/cardFrontTemplate";
import CardBackTemplate from "./templates/cardBackTemplate";
import React, { FormEvent, useState } from "react";

const CardDesign = () => {
  const [title, setTitle] = useState("Name/Title");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [backDesign, setBackDesign] = useState<string | null>(null);
  const [contents, setContents] = useState<string[]>([""]); // Start with one field
  const [bgColor, setBgColor] = useState("#ffffff"); // Default to white
  const [activeDesign, setActiveDesign] = useState<"front" | "back">("front");
  const [gradientDirection, setGradientDirection] = useState<
    "horizontal" | "vertical"
  >("horizontal");
  const [color2, setColor2] = useState("#000000"); // Second color for gradient
  const [color3, setColor3] = useState("#00FF00"); // New color
  const [color4, setColor4] = useState("#0000FF"); // Another new color
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [shinyEffect, setShinyEffect] = useState(false);
  const [input, setInput] = useState({
    title: "Name/Title",
  });

  const handleContentChange = (index: number, value: string) => {
    const newContents = [...contents];
    newContents[index] = value;
    setContents(newContents);
  };

  const addContentField = () => {
    if (contents.length < 3) {
      setContents([...contents, ""]);
    }
  };

  const removeContentField = () => {
    if (contents.length > 1) {
      const newContents = [...contents];
      newContents.pop();
      setContents(newContents);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let { title } = input;
    setTitle(title);
    setInput({ title: "" });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target!.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDesignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set the canvas dimensions to your desired dimensions
          // Here, we're matching Tailwind's h-96 w-64
          canvas.width = 246;
          canvas.height = 384;

          // Draw the image on the canvas, resizing it to fit the canvas dimensions
          ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Get the resized image as a data URL
          const resizedImageSrc = canvas.toDataURL();

          // Use the resized image
          setBackDesign(resizedImageSrc);
        };
        img.src = event.target!.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen h-full space-x-20 flex-row items-center justify-center">
      <div className="flex space-x-12">
        <CardFrontTemplate
          title={input.title}
          imageSrc={imageSrc}
          bgColor={bgColor}
          contents={contents}
          color2={color2}
          color3={color3}
          color4={color4}
          gradientDirection={gradientDirection}
          backgroundImage={backgroundImage}
          shinyEffect={shinyEffect}
        />
        <CardBackTemplate designSrc={backDesign} />
      </div>
      <div className="flex flex-col border border-neutral-300 h-3/5 w-5/12">
        <div
          className={`flex justify-center border-b border-neutral-300 flex-row  text-xl font-bold`}
        >
          <div
            className={`flex justify-center cursor-pointer w-1/2 p-2 ${
              activeDesign === "front" ? "bg-neutral-200" : "bg-neutral-100"
            }`}
            onClick={() => setActiveDesign("front")}
          >
            Front Design
          </div>
          <div
            className={`flex justify-center cursor-pointer w-1/2 p-2 ${
              activeDesign === "back" ? "bg-neutral-200" : "bg-neutral-100"
            }`}
            onClick={() => setActiveDesign("back")}
          >
            Back Design
          </div>
        </div>
        {activeDesign === "front" ? (
          // Front Design Form
          <form
            onSubmit={handleSubmit}
            className="flex justify-start flex-col w-full h-full"
          >
            <div className="flex flex-col pt-2 p-1 px-4 w-2/5">
              <label>Name/Title:</label>
              <input
                name="title"
                type="text"
                onChange={handleInput}
                className="border rounded outline-none p-1 text-xs"
              ></input>
            </div>
            <div className="flex flex-col p-1 px-4 w-2/5">
              <label>Card Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="outline-none p-1 text-xs"
              ></input>
            </div>

            <div className="flex flex-col px-4 p-1">
              <label>Background Colors:</label>
              <div className="flex flex-row">
                <div className="flex flex-col p-2 px-1">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="border rounded outline-none p-1 text-xs"
                  ></input>
                </div>
                <div className="flex flex-col p-2 px-1">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="border rounded outline-none p-1 text-xs"
                  ></input>
                </div>
                <div className="flex flex-col p-2 px-1">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="border rounded outline-none p-1 text-xs"
                  ></input>
                </div>
                <div className="flex flex-col p-2 px-1">
                  <input
                    type="color"
                    value={color4}
                    onChange={(e) => setColor4(e.target.value)}
                    className="border rounded outline-none p-1 text-xs"
                  ></input>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-1 px-4 w-2/5">
              <label>Gradient Direction:</label>
              <select
                value={gradientDirection}
                className="text-xs"
                onChange={(e) =>
                  setGradientDirection(
                    e.target.value as "horizontal" | "vertical"
                  )
                }
              >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>

            <div className="flex flex-col p-2 px-4 w-2/5 text">
              <label>Upload Custom Background:</label>
              <input
                type="file"
                className="outline-none p-1 text-xs"
                onChange={(e) => {
                  const file = e.target.files![0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setBackgroundImage(event.target!.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              ></input>
            </div>

            <div className="flex flex-col p-2 px-4 w-2/5">
              <label>
                <input
                  type="checkbox"
                  checked={shinyEffect}
                  onChange={(e) => setShinyEffect(e.target.checked)}
                />
                Shiny Effect
              </label>
            </div>

            {contents.map((content, index) =>
              index === 0 ? (
                <div key={index} className="flex flex-col p-1 px-4 w-3/5">
                  <label>Content {index + 1}:</label>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => handleContentChange(index, e.target.value)}
                    className="border rounded outline-none p-1 text-xs w-5/6"
                  ></input>
                </div>
              ) : (
                <div key={index} className="flex flex-col p-1 px-4 w-3/5">
                  <label>Content {index + 1}:</label>
                  <div className="flex flex-row space-x-1">
                    <input
                      type="text"
                      value={content}
                      onChange={(e) =>
                        handleContentChange(index, e.target.value)
                      }
                      className="border rounded outline-none p-1 text-xs w-5/6"
                    ></input>
                    <div
                      onClick={removeContentField}
                      className="cursor-pointer text-xs p-2 py-1 border rounded-full bg-purple-700 text-white"
                    >
                      ✕
                    </div>
                  </div>
                </div>
              )
            )}
            <div className="flex flex-row space-x-1 px-4">
              <div
                onClick={addContentField}
                className="cursor-pointer text-button p-1.5 border rounded-full bg-purple-700 text-white"
              >
                Add field
              </div>
            </div>
            <div className="flex border rounded self-center bg-purple-700 mt-3">
              <button type="submit" className="text-sm text-white p-1.5">
                Create
              </button>
            </div>
          </form>
        ) : (
          // Back Design Form (you can expand this later)
          <div className="flex flex-col p-1 px-4 w-2/5">
            <label>Background Design Upload:</label>
            <input
              type="file"
              onChange={handleDesignChange}
              className="outline-none p-1 text-xs"
            ></input>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDesign;
