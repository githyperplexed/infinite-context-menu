import React from "react";

import { ContextMenuAction } from "../contextMenuAction/contextMenuAction";
import { ContextMenuExtension } from "../contextMenuExtension/contextMenuExtension";
import { InfiniteContextMenuExtension } from "../infiniteContextMenuExtension/infiniteContextMenuExtension";

import { IContextMenuAction } from "../../models/contextMenuAction";
import { IContextMenuSection } from "../../models/contextMenuSection";

import { ContextMenuActionLabel } from "../../enums/contextMenuActionLabel";

interface IContextMenuProps extends IContextMenuSection {
  level: number;
}

export const ContextMenuSection: React.FC<IContextMenuProps> = (props: IContextMenuProps) => {
  const getActions = (): JSX.Element[] => {
    return props.actions.map((action: IContextMenuAction) => {
      if(action.label === ContextMenuActionLabel.Infinite) {
        return (
          <InfiniteContextMenuExtension key={action.id} action={action} level={props.level} />
        );
      } else if(action.sections) {
        return (
          <ContextMenuExtension key={action.id} action={action} level={props.level + 1} />
        )
      }

      return (
        <ContextMenuAction 
          key={action.id} 
          id={action.id} 
          className={action.className}
          label={action.label} 
          icon={action.icon} 
          sections={action.sections || []}
          onClick={action.onClick}
        />
      );
    });
  }

  return (
    <div className="context-menu-section" style={{ zIndex: props.level + 1 }}>
      {getActions()}
    </div>
  );
}