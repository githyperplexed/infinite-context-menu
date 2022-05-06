import { InfiniteContextMenuDirectionUtility } from "./infiniteContextMenuDirectionUtility";

import { IContextMenuAction } from "../models/contextMenuAction";
import { IDirectionEntry } from "../models/directionEntry";

import { ContextMenuActionLabel } from "../enums/contextMenuActionLabel";
import { Lateral } from "../enums/lateral";
import { Vertical } from "../enums/vertical";

interface IContextMenuDirectionUtility {
  determineDirection: (action: IContextMenuAction, history: IDirectionEntry[], extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>) => IDirectionEntry;
  determineStandardDirection: (actionID: string, extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>) => IDirectionEntry;
}
  
export const ContextMenuDirectionUtility: IContextMenuDirectionUtility = {
  determineDirection: (action: IContextMenuAction, history: IDirectionEntry[], extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>): IDirectionEntry => {
    if(action.label === ContextMenuActionLabel.Infinite && history.length > 0) {
      return InfiniteContextMenuDirectionUtility.determineDirection(action.id, history, extensionRef, windowRef);
    }

    return ContextMenuDirectionUtility.determineStandardDirection(action.id, extensionRef, windowRef);
  },  
  determineStandardDirection: (actionID: string, extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>): IDirectionEntry => {
    const entry: IDirectionEntry = {
      id: Math.random().toString(),
      actionID,
      lateral: Lateral.Right,
      vertical: Vertical.Down
    }

    if(
      extensionRef.current !== null &&
      windowRef.current !== null
    ) {
      const extensionRect: DOMRect = extensionRef.current.getBoundingClientRect();

      if(extensionRect.right + windowRef.current.clientWidth > window.innerWidth - 10) {
        entry.lateral = Lateral.Left;
      }

      if(extensionRect.top + windowRef.current.clientHeight - 10 > window.innerHeight - 10) {
        entry.vertical = Vertical.Up;
      }
    }

    return entry;
  }
}