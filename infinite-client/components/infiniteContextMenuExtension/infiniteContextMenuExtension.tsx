import React from "react";
import { logEvent } from "firebase/analytics";

import { analytics } from "../../firebase";

import { ContextMenuExtension } from "../contextMenuExtension/contextMenuExtension";

import { AppContext } from "../app/app";
import { ContextMenuContext } from "../contextMenu/contextMenuWrapper";

import { ContextMenuUtility } from "../../utilities/contextMenuUtility";
import { InfiniteContextMenuUtility } from "../../utilities/infiniteContextMenuUtility";

import { IContextMenuAction } from "../../models/contextMenuAction";
import { IDirectionEntry } from "../../models/directionEntry";

import { Vertical } from "../../enums/vertical";

interface IInfiniteContextMenuExtensionProps {
  action: IContextMenuAction;
  level: number;
}

export const InfiniteContextMenuExtension: React.FC<IInfiniteContextMenuExtensionProps> = (props: IInfiniteContextMenuExtensionProps) => {  
  const { setModeToInfinite } = React.useContext(AppContext);

  const { state } = React.useContext(ContextMenuContext);

  const mapAction = (): IContextMenuAction => {
    if(props.level === 14) {
      const handleDoNotPress = (): void => {
        logEvent(analytics, "do_not_press_clicked");

        setModeToInfinite();
      }

      return {
        ...props.action,
        sections: [
          ContextMenuUtility.mapSection([
            ContextMenuUtility.mapAction("DO NOT PRESS", "fa-solid fa-infinity", "do-not-press", handleDoNotPress)
          ])
        ]
      };
    }

    return InfiniteContextMenuUtility.mapAction(props.action);
  }

  const [action, setActionTo] = React.useState<IContextMenuAction>(mapAction()),
    [reversed, setReversedTo] = React.useState<boolean>(false);

  React.useEffect(() => {
    const entry: IDirectionEntry = ContextMenuUtility.getDirectionEntry(props.action, state.directionHistory);

    if(entry && entry.vertical === Vertical.Up && !reversed) {
      setReversedTo(true);
    } else if (!entry || (entry.vertical === Vertical.Down && reversed)) {
      setReversedTo(false);      
    }
  }, [state.directionHistory]);

  React.useEffect(() => {
    if(reversed) {
      const updatedAction: IContextMenuAction = mapAction();

      setActionTo({ ...updatedAction, sections: updatedAction.sections.reverse() });
    } else {
      setActionTo(mapAction())
    }
  }, [reversed]);

  return (
    <ContextMenuExtension 
      key={action.id} 
      action={action} 
      level={props.level} 
    />
  );
}