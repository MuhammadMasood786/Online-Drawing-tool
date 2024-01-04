"use client";

import React from "react";
import { ChromePicker } from "react-color";
import { Action } from "../../../constant";

import styles from "./index.module.css";
interface Props {
  updateBrushSize: (arg: number) => void;
  updateColor: (arg: string) => void;
  colorName: string;
  brushSize: number;
  actionName: string;
}

export default function ToolBox({
  updateColor,
  updateBrushSize,
  colorName,
  brushSize,
  actionName,
}: Props) {
  return (
    <div className={styles.toolboxContainer}>
      <div className={styles.toolItem}>
        <h3 className={styles.toolText}>Brush Size: </h3>
        <div className={styles.itemContainer}>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={brushSize}
            onChange={(e: any) => updateBrushSize(e.target.value)}
          />
        </div>
      </div>

      {actionName == Action.PENCIL && (
        <div className={styles.toolItem}>
          <h3 className={styles.toolText}>Stroke Color: </h3>
          <ChromePicker
            color={colorName}
            onChange={(e: any) => updateColor(e.hex)}
          />
        </div>
      )}
    </div>
  );
}
