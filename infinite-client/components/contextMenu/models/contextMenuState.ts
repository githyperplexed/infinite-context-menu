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
    left: 100,
    top: 100
  },
  sections: [],
  directionHistory: [],
  targetRef: null,
  menuRef: null
})