import React from "react";

export const NoMoreOptionsText: React.FC = () => {
  const getText = (): JSX.Element[] => {
    return Array.from(Array(5)).map((x, i) => <span key={i} className="rubik-font" style={{ animationDelay: `${1000 * i}ms` }}>There are no more options</span>);
  }

  return (
    <div id="no-more-options-text">
      {getText()}
    </div>
  );
}