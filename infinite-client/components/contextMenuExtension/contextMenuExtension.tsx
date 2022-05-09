import React from "react";

import { ContextMenuAction } from "../contextMenuAction/contextMenuAction";
import { ContextMenuWindow } from "../contextMenuWindow/contextMenuWindow";
import { SpecialEffect } from "../specialEffect/specialEffect";

import { ContextMenuContext } from "../contextMenu/contextMenuWrapper";

import { ContextMenuUtility } from "../../utilities/contextMenuUtility";

import { IContextMenuAction } from "../../models/contextMenuAction";

import { ContextMenuActionLabel } from "../../enums/contextMenuActionLabel";

interface IContextMenuExtensionProps {
  action: IContextMenuAction;
  level: number;
}

export const ContextMenuExtension: React.FC<IContextMenuExtensionProps> = (props: IContextMenuExtensionProps) => {    
  const { state, truncateDirectionHistoryAtEntry } = React.useContext(ContextMenuContext);

  const [active, setActiveTo] = React.useState<boolean>(false),
    [deactivate, setDeactivateTo] = React.useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {  
    if(props.level === 0 && state.branchID !== props.action.id) {
      setActiveTo(false);
    }
  }, [state.directionHistory]);

  React.useEffect(() => {
    if(deactivate) {
      const timeout: NodeJS.Timeout = setTimeout(() => {
        truncateDirectionHistoryAtEntry(props.action.id);
        setActiveTo(false);
        setDeactivateTo(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [deactivate, state.directionHistory]);

  const handleOnMouseOver = (): void => {
    setActiveTo(true);
    setDeactivateTo(false);
  }
    
  const handleOnMouseOut = (): void => setDeactivateTo(true);

  const getWindow = (): JSX.Element => {
    if(active) {
      return (
        <ContextMenuWindow 
          level={props.level + 1} 
          sections={props.action.sections}
          action={props.action}
          extensionRef={ref} 
        />
      );
    }
  }

  const getSpecialEffect = (): JSX.Element => {
    if(props.action.label === ContextMenuActionLabel.Infinite) {
      return (
        <SpecialEffect level={props.level} />
      )
    }
  }

  return (
    <div ref={ref} className="context-menu-extension" onMouseEnter={handleOnMouseOver} onMouseLeave={handleOnMouseOut}>
      <ContextMenuAction 
        id={props.action.id} 
        className={props.action.className}
        label={ContextMenuUtility.getActionDisplayLabel(props.action.label, props.level)} 
        icon={props.action.icon}
        effect={getSpecialEffect()}
      />
      <i className="fa-solid fa-caret-right" />
      {getWindow()}
    </div>
  );
}