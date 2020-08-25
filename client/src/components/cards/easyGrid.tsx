import React from "react";
import { Row } from "react-bootstrap";

function chunk<T>(array: T[], size: number): T[][] {
  const chunked_arr: T[][] = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export interface EasyGridProps {
  children?: React.ReactNode,
}

export const EasyGrid = (props: EasyGridProps): JSX.Element => {
  const children = React.Children.toArray(props.children);
  const rows = chunk(children, 3);
  return (
    <>
      {
        rows.map((row, i) => {
          return (
            <Row key={i} className="mb-3">
              {
                row.map((cell, j) => {
                  return (
                    <div className="col-4" key={j}>
                      {cell}
                    </div>
                  );
                })
              }
            </Row>
          );
        })
      }
    </>
  );
};
