"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Action } from "../../../constant";

interface Props {
  brushSize: number;
  colorName: string;
  actionName: string;
  setActionName: Dispatch<SetStateAction<string>>;
}

export default function Board({
  brushSize,
  colorName,
  actionName,
  setActionName,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!["PENCIL", "ERASER"].includes(actionName)) {
      if (actionName == Action.DOWNLOAD) {
        const URL = canvas.toDataURL();
        const anchor = document.createElement("a");
        anchor.href = URL;
        anchor.download = "sketch.jpg";
        anchor.click();
      } else if (actionName == Action.UNDO || actionName == Action.REDO) {
        if (historyPointer.current > 0 && actionName == Action.UNDO)
          historyPointer.current -= 1;
        if (
          historyPointer.current < drawHistory.current.length - 1 &&
          actionName == Action.REDO
        )
          historyPointer.current += 1;
      }
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
      setActionName("");
    }
  }, [actionName, setActionName]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig(colorName, brushSize);
  }, [brushSize, colorName]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginPath(
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY
      );
    };
    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawLine(
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY
      );
    };
    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current - drawHistory.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
