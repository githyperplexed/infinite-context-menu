import { ContextMenuUtility } from "./contextMenuUtility";

import { IContextMenuAction } from "../models/contextMenuAction";
import { IContextMenuSection } from "../models/contextMenuSection";

import { Color } from "../enums/color";
import { ContextMenuActionLabel } from "../enums/contextMenuActionLabel";

interface IInfiniteContextMenuUtility {  
  getActionLabel: (level: number) => string;
  getDefaultAction: () => IContextMenuAction;
  getEffectColor: (level: number, index: number) => string;
  getEffectIcon: (level: number) => string;
  getMenuSections: () => IContextMenuSection[];
  getWindowLevelID: (level: number) => string;
  mapAction: (action: IContextMenuAction) => IContextMenuAction;
}

export const InfiniteContextMenuUtility: IInfiniteContextMenuUtility = { 
  getActionLabel: (level: number): string => {
    switch(level) {
      case 0:
        return "More options";
      case 1:
        return "Even more options";
      case 2:
        return "Extra options";
      case 3:
        return "Admin options";
      case 4:
        return "Super admin options";
      case 5:
        return "CEO options";
      case 6:
        return "Presidential options";
      case 7:
        return "World leader options";
      case 8:
        return "Galactic commander options";
      case 9:
        return "UNIVERSAL CONQUERER OPTIONS";
      case 10:
        return "There are no more options";
      case 11:
        return "No srsly";
      case 12:
        return "Pls turn back";
      case 13:
        return "C'mon now, I asked nicely";
      case 14:
        return "FINAL WARNING";
      default:
        return "ಠ_ಠ";
    }
  },
  getDefaultAction: (): IContextMenuAction => {
    return {
      id: Math.random().toString(),
      label: ContextMenuActionLabel.Infinite,
      icon: "fa-solid fa-infinity"
    }
  },
  getEffectColor: (level: number, index: number): string => {
    switch(level) {
      case 4:
        return Color.Green;
      case 5:
        return Color.Red;
      case 6:
        if(index % 3 === 0) {
          return Color.Blue;
        } else if (index % 2 === 0) {
          return Color.Red;
        }

        return Color.White;
      case 7:
        if(index % 3 === 0) {
          return Color.Blue;
        } else if (index % 2 === 0) {
          return Color.Green;
        }

        return Color.White;
      case 8:
        if(index % 3 === 0) {
          return Color.Purple;
        } else if (index % 2 === 0) {
          return Color.Blue;
        }

        return Color.White;
      case 9:
        if(index % 7 === 0) {
          return Color.White;
        } else if(index % 6 === 0) {
          return Color.Purple;
        } else if (index % 5 === 0) {
          return Color.Blue;
        } else if (index % 4 === 0) {
          return Color.Green;
        } else if (index % 3 === 0) {
          return Color.Yellow;
        } else if (index % 2 === 0) {
          return Color.Orange;
        }

        return Color.Red;
      case 10:
        return Color.Blue;
      case 11:
        return Color.Yellow;
      case 12:
        return Color.Orange;
      case 13:
      case 14:
        return Color.Red;
      default:
        return Color.Blue;
    }
  },
  getEffectIcon: (level: number): string => {
    switch(level) {
      case 4:
        return "fa-solid fa-user-crown";
      case 5:
        return "fa-solid fa-user-tie";
      case 6:
        return "fa-duotone fa-flag-usa";
      case 7:
        return "fa-duotone fa-earth-americas";
      case 8:
        return "fa-duotone fa-galaxy";
      case 9:
        return "fa-solid fa-infinity";
      case 10:
        return "fa-solid fa-circle-exclamation";
      case 11:
        return "fa-solid fa-diamond-exclamation";
      case 12:
        return "fa-solid fa-siren";
      case 13:
        return "fa-solid fa-siren-on";
      case 14:
        return "fa-solid fa-skull-crossbones";
      default:
        return "fa-solid fa-user";
    }
  },
  getMenuSections: (): IContextMenuSection[] => {
    return [
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("New Item", "fa-solid fa-plus"),
        ContextMenuUtility.mapAction("Rename", "fa-solid fa-pen")
      ]),
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Favorite", "fa-solid fa-heart"),
        ContextMenuUtility.mapAction("Dislike", "fa-solid fa-thumbs-down")
      ]),
      ContextMenuUtility.mapSection([
        InfiniteContextMenuUtility.getDefaultAction()
      ])
    ];
  },
  getWindowLevelID: (level: number): string => {
    return `infinite-context-menu-window-level-${level}`;
  },
  mapAction: (action: IContextMenuAction): IContextMenuAction => {
    return {
      ...action,
      sections: InfiniteContextMenuUtility.getMenuSections()
    }
  }
}