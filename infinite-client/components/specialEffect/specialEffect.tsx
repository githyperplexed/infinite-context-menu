import React from "react";

import { SparkleEffect } from "../sparkleEffect/sparkleEffect";
import { WaveEffect } from "../waveEffect/waveEffect";

interface ISpecialEffectProps {
  level: number;
}

export const SpecialEffect: React.FC<ISpecialEffectProps> = (props: ISpecialEffectProps) => {
  const getSpecialEffect = (): JSX.Element => {
    switch(props.level) {
      case 0:
      case 1:
      case 2:
        return (
          <SparkleEffect level={props.level} duration={1500} />
        );
      default:
        return (
          <WaveEffect level={props.level} duration={4000} />
        );
    }
  }

  return (
    <div className="special-effect">
      {getSpecialEffect()}
    </div>
  );
}