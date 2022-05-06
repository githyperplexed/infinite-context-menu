import { Lateral } from "../enums/lateral";
import { Vertical } from "../enums/vertical";

export interface IDirectionEntry {
  id: string;
  actionID: string;
  lateral: Lateral;
  vertical: Vertical;
}