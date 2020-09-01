import React from "react";
import styles from "./easyGrid.module.scss";

export interface EasyGridProps {
  children?: React.ReactNode,
}

export const EasyGrid = (props: EasyGridProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
};
