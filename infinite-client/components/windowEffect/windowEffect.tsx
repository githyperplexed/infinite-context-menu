import React from "react";

import { WindowEffectIcon } from "./windowEffectIcon";

import { InfiniteContextMenuUtility } from "../../utilities/infiniteContextMenuUtility";

interface IWindowEffectProps {
  duration: number;
  level: number;
}

export const WindowEffect: React.FC<IWindowEffectProps> = (props: IWindowEffectProps) => {  
  const getIcons = (): JSX.Element[] => {
    return Array.from(Array(16)).map((x, index: number) => {            
      return (
        <WindowEffectIcon 
          key={index} 
          icon="fa-solid fa-star-sharp" 
          duration={props.duration} 
          index={index} 
          color={InfiniteContextMenuUtility.getEffectColor(props.level, index)} 
        />
      )
    });
  }

  return (
    <div className="window-effect">
      {getIcons()}
    </div>
  );
}