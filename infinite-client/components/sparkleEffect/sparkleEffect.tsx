import React from "react";
import { Color } from "../../enums/color";

import { SparkleIcon } from "./sparkleIcon";

interface ISparkleEffectProps {
  duration: number;
  level: number;
}

export const SparkleEffect: React.FC<ISparkleEffectProps> = (props: ISparkleEffectProps) => {
  const getIcon = (): string => {
    switch(props.level) {
      default:
        return "fa-solid fa-star-sharp";
    }
  }

  const getColor = (): string => {
    switch(props.level) {
      case 1:
        return Color.Green;
      case 2:
        return Color.Purple;
      default:
        return Color.Blue;
    }
  }

  const getIcons = (): JSX.Element[] => {
    return Array.from(Array(8)).map((x, index: number) => {            
      return (
        <SparkleIcon 
          key={index} 
          icon={getIcon()} 
          duration={props.duration} 
          index={index} 
          color={getColor()} 
        />
      )
    });
  }

  return (
    <div className="sparkle-effect">
      {getIcons()}
    </div>
  );
}