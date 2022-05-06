import React from "react";

import { N } from "../../utilities/numberUtility";

import { IPosition } from "../../models/position";

interface ISparkleIconProps {
  icon: string;
  duration: number;
  index: number;
  color: string;
}

export const SparkleIcon: React.FC<ISparkleIconProps> = (props: ISparkleIconProps) => {
  const delay: number = props.index * 250;

  const getRandomPosition = (): IPosition => ({
    left: `${N.rand(10, 90)}%`,
    top: `${N.rand(20, 80)}%`
  });

  const [position, setPositionTo] = React.useState<IPosition>(getRandomPosition());

  React.useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      setPositionTo(getRandomPosition());
    }, props.duration + delay);

    return () => clearTimeout(timeout);
  }, [position]);

  const getStyles = (): React.CSSProperties => {
    return {
      animationDelay: `${delay}ms`,
      animationDuration: `${props.duration}ms`,
      color: `rgb(${props.color})`,
      left: position.left,
      top: position.top
    }
  }

  return (
    <i key={`${position.left}${position.top}`} className={props.icon} style={getStyles()} />
  );
}