import { ICoordinate } from "./coordinate";
import { ISize } from "./size";

export interface ICanvasContextMenuWindow {
  id: string;
  coordinate: ICoordinate;
  speed: ICoordinate;
  size: ISize;
  destroyedAt: number;
}