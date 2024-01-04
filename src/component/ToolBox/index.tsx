"use client";

import React from "react";
import { ChromePicker } from "react-color";

interface Props {
  updateBrushSize:(arg :number)=> void,
  updateColor:(arg :string)=> void,
  colorName:string
  brushSize:number
}

export default function ToolBox({updateColor,updateBrushSize,colorName,brushSize }: Props) {
  return (
    <div className="p-20 ">
      <h3 className="text-slate-500 ">Stroke Color: </h3>
      <ChromePicker color={colorName} onChange={(e:any)=>updateColor(e.hex)}/>
     
      <div className=" mt-5">
        <h3 className="text-slate-500">Brush Size: </h3>
        <input type="range" min={1} max={10} step={1} value={brushSize} onChange={(e:any)=>updateBrushSize(e.target.value)} />
      </div>
    </div>
  );
}
