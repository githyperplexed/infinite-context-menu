import React from "react";
import classNames from "classnames";

import { InfiniteContextMenuUtility } from "../../utilities/infiniteContextMenuUtility";

interface IWaveEffectProps {
  duration: number;
  level: number;
}

export const WaveEffect: React.FC<IWaveEffectProps> = (props: IWaveEffectProps) => {
  const getStyles = (index: number): React.CSSProperties => {
    return {
      animationDelay: `${index * 200 * -1}ms`,
      animationDuration: `${props.duration}ms`,
      color: `rgb(${InfiniteContextMenuUtility.getEffectColor(props.level, index)})`,
      left: `${index * 30}px`
    }
  }

  const getIcons = (): JSX.Element[] => {
    return Array.from(Array(10)).map((x, index: number) => {            
      return (
        <i key={index} className={InfiniteContextMenuUtility.getEffectIcon(props.level)} style={getStyles(index)} />
      )
    });
  }

  const getEscalationLevel = (): number => {
    if(props.level <= 5 || props.level === 10) {
      return 0;
    } else if (props.level === 6 || props.level === 7 || (props.level >= 11 && props.level <= 13)) {
      return 1;
    } else if (props.level === 8) {
      return 2;
    } else if(props.level === 9 || props.level === 14) {
      return 3;
    }

    return 0;
  }

  return (
    <div className={classNames("wave-effect", `escalation-level-${getEscalationLevel()}`)}>
      {getIcons()}
    </div>
  );
}