import { InfiniteContextMenuUtility } from "./infiniteContextMenuUtility";

import { IContextMenuAction } from "../models/contextMenuAction";
import { IContextMenuSection } from "../models/contextMenuSection"
import { IDirectionEntry } from "../models/directionEntry";
import { IPosition } from "../models/position";

import { ContextMenuActionLabel } from "../enums/contextMenuActionLabel";
import { Lateral } from "../enums/lateral";
import { Vertical } from "../enums/vertical";

interface IContextMenuUtility {
  determinePositionFromDirection: (entry: IDirectionEntry) => IPosition;  
  determineMountPosition: (ref: React.MutableRefObject<HTMLElement>, position: IPosition) => IPosition;  
  getActionDisplayLabel: (label: string, level: number) => string;
  getDirectionEntry: (action: IContextMenuAction, directionHistory: IDirectionEntry[]) => IDirectionEntry;  
  getPositionFromDirectionEntry: (action: IContextMenuAction, directionHistory: IDirectionEntry[]) => IPosition;  
  mapAction: (label: string, icon: string, className?: string, onClick?: () => void, sections?: IContextMenuSection[]) => IContextMenuAction;  
  mapSection: (actions: IContextMenuAction[]) => IContextMenuSection;
  shouldActivate: (ref: React.MutableRefObject<HTMLElement>, e: any) => boolean;
  shouldDectivate: (ref: React.MutableRefObject<HTMLElement>, e: any) => boolean;  
}

export const ContextMenuUtility: IContextMenuUtility = {
  determinePositionFromDirection: (entry: IDirectionEntry): IPosition => {
    const position: IPosition = {};

    if(entry) {
      if(entry.lateral === Lateral.None) {
        position.left = "-10px";

        if(entry.vertical === Vertical.Down) {
          position.top = "100%";
        } else {
          position.bottom = "100%";
        }
      } else {
        if(entry.lateral === Lateral.Right) {
          position.left = "100%";
        } else if(entry.lateral === Lateral.Left) {
          position.right = "100%";
        }

        if(entry.vertical === Vertical.Down) {
          position.top = "-10px";
        } else {
          position.bottom = "-10px";
        }
      }
    }

    return position;
  },
  determineMountPosition: (ref: React.MutableRefObject<HTMLElement>, position: IPosition): IPosition => {
    const mountPosition: IPosition = {};

    if(ref.current !== null) {
      const rect: DOMRect = ref.current.getBoundingClientRect();

      const { left, top } = position as { left: number, top: number };

      if(left + rect.width > window.innerWidth) {
        mountPosition.right = `${Math.max(window.innerWidth - left, 10)}px`
      } else {
        mountPosition.left = `${Math.max(left, 10)}px`;
      }

      if(top + rect.height > window.innerHeight) {
        mountPosition.bottom = `${Math.max(window.innerHeight - top, 10)}px`;
      } else {
        mountPosition.top = `${Math.max(top, 10)}px`;
      }
    }

    return mountPosition;
  },
  getActionDisplayLabel: (label: string, level: number): string => {
    if(label === ContextMenuActionLabel.Infinite) {
      return InfiniteContextMenuUtility.getActionLabel(level);
    }

    return label;
  },
  getDirectionEntry: (action: IContextMenuAction, directionHistory: IDirectionEntry[]): IDirectionEntry => {
    if(action && directionHistory.length > 0) {
      return directionHistory.find((entry: IDirectionEntry) => entry.actionID === action.id);
    }

    return null;
  },
  getPositionFromDirectionEntry: (action: IContextMenuAction, directionHistory: IDirectionEntry[]): IPosition => {
    const entry: IDirectionEntry = ContextMenuUtility.getDirectionEntry(action, directionHistory);

    return ContextMenuUtility.determinePositionFromDirection(entry);
  },
  mapAction: (label: string, icon: string, className?: string, onClick?: () => void, sections?: IContextMenuSection[]): IContextMenuAction => {
    const action: IContextMenuAction = {
      id: Math.random().toString(),
      label,
      icon
    }

    if(className) {
      action.className = className;
    }

    if(onClick) {
      action.onClick = onClick;
    }

    if(sections) {
      action.sections = sections;
    }

    return action;
  },
  mapSection: (actions: IContextMenuAction[]): IContextMenuSection => {
    return {
      actions,
      id: Math.random().toString()
    }
  },
  shouldActivate: (ref: React.MutableRefObject<HTMLElement>, e: any): boolean => {
    return (      
      ref === null || 
      ref.current === null || 
      !ref.current.contains(e.target)
    );
  },
  shouldDectivate: (ref: React.MutableRefObject<HTMLElement>, e: any): boolean => {
    return (
      ref !== null && 
      ref.current !== null && 
      !ref.current.contains(e.target)
    );
  }
}