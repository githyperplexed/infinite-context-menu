import { IContextMenuState } from "./contextMenuState";
import { IDirectionEntry } from "../../../models/directionEntry";
import { IPosition } from "../../../models/position";

export interface IContextMenuContext {
  state: IContextMenuState;  
  setActiveTo: (active: boolean) => void;
  setMenuRefTo: (menuRef: React.MutableRefObject<HTMLElement>) => void;
  activateMenu: (position: IPosition) => void;
  addDirectionHistoryEntry: (entry: IDirectionEntry, branchID: string) => void;
  truncateDirectionHistoryAtEntry: (actionID: string) => void;
}