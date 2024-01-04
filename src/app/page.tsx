"use client";

import Board from "@/component/Board";
import Menu from "@/component/Menu";
import ToolBox from "@/component/ToolBox";
import { Action } from "../../constant";
import { useState } from "react";

export default function Home() {
  const [actionName, setActionName] = useState("");
  const [colorName, setColorName] = useState("");
  const [brushSize, setBrushSize] = useState(0);

  const handleMenuClick = (MenuClicked: Action) => {
    setActionName(MenuClicked);
  };

  const updateBrushSize = (brushSize:number) => {
    setBrushSize(brushSize); 
  };

  const updateColor = (colorName: string) => {
    setColorName(colorName);
  };

  return (
    <main>
      <Menu handleMenuClick={handleMenuClick} actionName={actionName} />
      <div className="flex">
      <ToolBox updateBrushSize={updateBrushSize} updateColor={updateColor} brushSize={brushSize} colorName={colorName}/>
      <Board colorName={colorName} brushSize={brushSize}/>
      </div>
    </main>
  );
}

// MONGO_DB = mongodb+srv://mmasoodr786:gjz3aIFXOGUJlf0F@cluster0.zxguqql.mongodb.net/
