import React from "react";

import { N } from "../../utilities/numberUtility";

import { IPosition } from "../../models/position";

interface IWindowEffectIconProps {
  icon: string;
  duration: number;
  index: number;
  color: string;
}

export const WindowEffectIcon: React.FC<IWindowEffectIconProps> = (props: IWindowEffectIconProps) => {   
  const delay: number = props.index * 250;
  
  const getRandomPositionOnSide = (side: number): IPosition => {
    if(side === 0) {
      return {
        left: `${N.rand(10, 90)}%`,
        top: `${N.rand(0, 30) * -1}px`
      }
    } else if(side === 1) {
      return {
        right: `${N.rand(0, 30) * -1}px`,
        top: `${N.rand(10, 90)}%`
      }
    } else if(side === 2) {
      return {
        left: `${N.rand(10, 90)}%`,
        bottom: `${N.rand(0, 30) * -1}px`
      }
    } else if(side === 3) {
      return {
        left: `${N.rand(0, 30) * -1}px`,
        top: `${N.rand(10, 90)}%`
      }
    }
  }

  const [position, setPositionTo] = React.useState<IPosition>(getRandomPositionOnSide(N.rand(0, 3)));

  React.useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      setPositionTo(getRandomPositionOnSide(N.rand(0, 3)));
    }, props.duration + delay);

    return () => clearTimeout(timeout);
  }, [position]);

  const getStyles = (): React.CSSProperties => {
    return {
      ...position,
      animationDelay: `${delay}ms`,
      animationDuration: `${props.duration}ms`,
      color: `rgb(${props.color})`
    }
  }

  return (
    <i key={`${position.left}${position.top}`} className={props.icon} style={getStyles()} />
  );
}