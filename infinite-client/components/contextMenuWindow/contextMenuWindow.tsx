import React from "react";
import classNames from "classnames";

import { ContextMenuSection } from "../contextMenuSection/contextMenuSection";
import { WindowEffect } from "../windowEffect/windowEffect";

import { ContextMenuContext } from "../contextMenu/contextMenuWrapper";

import { ContextMenuDirectionUtility } from "../../utilities/contextMenuDirectionUtility";
import { ContextMenuUtility } from "../../utilities/contextMenuUtility";

import { IContextMenuAction } from "../../models/contextMenuAction";
import { IContextMenuSection } from "../../models/contextMenuSection";
import { IDirectionEntry } from "../../models/directionEntry";
import { IPosition } from "../../models/position";

interface IContextMenuWindowProps {  
  level: number;
  sections: IContextMenuSection[];
  action?: IContextMenuAction;
  extensionRef?: React.MutableRefObject<HTMLDivElement>;
}

export const ContextMenuWindow: React.FC<IContextMenuWindowProps> = (props: IContextMenuWindowProps) => {
  const { state, addDirectionHistoryEntry } = React.useContext(ContextMenuContext);

  const [entered, setEnteredTo] = React.useState<boolean>(false);

  const ref: React.MutableRefObject<HTMLDivElement> = React.useRef(null);

  React.useEffect(() => {
    if(props.extensionRef && props.action) {
      const entry: IDirectionEntry = ContextMenuDirectionUtility.determineDirection(props.action, state.directionHistory, props.extensionRef, ref);
    
      addDirectionHistoryEntry(entry);
    }
  }, []);

  React.useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      setEnteredTo(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, []);

  const getSections = (): JSX.Element[] => {
    return props.sections.map((section: IContextMenuSection) => (
      <ContextMenuSection key={section.id} id={section.id} actions={section.actions} level={props.level} />
    ));
  }

  const getWindowEffect = (): JSX.Element => {
    if(props.level > 5) {
      return (
        <WindowEffect level={props.level} duration={1000} />
      )
    }
  }

  const getEscalationLevel = (): number => {
    if(entered && props.level === 14) {
      return 1;
    }

    return 0;
  }

  const position: IPosition = ContextMenuUtility.getPositionFromDirectionEntry(props.action, state.directionHistory);

  const style: React.CSSProperties = {
    ...position,
    zIndex: props.level + 1
  }

  return (
    <div ref={ref} className={classNames("context-menu-window", `escalation-level-${getEscalationLevel()}`)} style={style}>
      {getSections()}    
      {getWindowEffect()}
    </div>
  );
}