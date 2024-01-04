"use client";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";

import { Action } from "../../../constant";

interface Props {
  handleMenuClick: (arg: Action) => void,
  actionName:string,
}
export default function Menu({handleMenuClick,actionName}: Props) {
  return (
    <div className="flex cursor-pointer justify-center gap-16 py-10 text-xl shadow-sm  ">
      <div>
        <FaPencilAlt onClick={() => handleMenuClick(Action.PENCIL)} />
      </div>
      <div>
        <FaEraser  onClick={() => handleMenuClick(Action.ERASER)} />
      </div>
      <div>
        <FaArrowRotateLeft onClick={() => handleMenuClick(Action.UNDO)} />
      </div>
      <div>
        <FaArrowRotateRight onClick={() => handleMenuClick(Action.REDO)} />
      </div>
      <div>
        <FaDownload onClick={() => handleMenuClick(Action.DOWNLOAD)} />
      </div>
    </div>
  );
}
