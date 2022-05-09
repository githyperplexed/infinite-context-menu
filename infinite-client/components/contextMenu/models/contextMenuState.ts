import React from "react";

import { IContextMenuSection } from "../../../models/contextMenuSection";
import { IDirectionEntry } from "../../../models/directionEntry";
import { IPosition } from "../../../models/position";

export interface IContextMenuState {
  active: boolean;
  branchID: string;
  position: IPosition;
  sections: IContextMenuSection[];
  directionHistory: IDirectionEntry[];
  targetRef: React.MutableRefObject<HTMLElement>;
  menuRef: React.MutableRefObject<HTMLElement>;
}

export const defaultContextMenuState = (active?: boolean): IContextMenuState => ({
  active: active || false,  
  branchID: "",
  position: {
    left: (window.innerWidth / 2) - 150,
    top: (window.innerHeight / 2) - 170
  },
  sections: [],
  directionHistory: [],
  targetRef: null,
  menuRef: null
})