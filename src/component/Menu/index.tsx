"use client";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaEraser } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";
import { Action } from "../../../constant";

import styles from './index.module.css'
import cx from 'classnames';

interface Props {
  handleMenuClick: (arg: Action) => void,
  actionName:string,
}
export default function Menu({handleMenuClick,actionName}: Props) {
  return (
    <div className={styles.menuContainer}>
      <div className={cx(styles.iconWrapper, {[styles.active]: actionName === Action.PENCIL})}  onClick={() => handleMenuClick(Action.PENCIL)} >
        <FaPencilAlt/>
      </div>
      <div className={cx(styles.iconWrapper, {[styles.active]: actionName === Action.ERASER})} onClick={() => handleMenuClick(Action.ERASER)}>
        <FaEraser  />
      </div>
      <div className={styles.iconWrapper} onClick={() => handleMenuClick(Action.UNDO)}>
        <FaArrowRotateLeft  />
      </div>
      <div className={styles.iconWrapper} onClick={() => handleMenuClick(Action.REDO)} >
        <FaArrowRotateRight />
      </div>
      <div className={styles.iconWrapper} onClick={() => handleMenuClick(Action.DOWNLOAD)}>
        <FaDownload  />
      </div>
    </div>
  );
}
