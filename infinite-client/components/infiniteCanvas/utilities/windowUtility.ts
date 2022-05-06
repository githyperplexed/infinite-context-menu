import { CanvasUtility } from "./canvasUtility";

import { ICanvasContextMenuWindow } from "../models/canvasContextMenuWindow";
import { ICoordinate } from "../models/coordinate";

interface IWindowUtility {
  determineSpeed: (context: CanvasRenderingContext2D, coordinate: ICoordinate, height: number, width: number, speed: ICoordinate) => ICoordinate;
  drawActions: (context: CanvasRenderingContext2D, coordinate: ICoordinate) => void;  
  drawIcon: (context: CanvasRenderingContext2D, coordinate: ICoordinate) => void;
  drawLabel: (context: CanvasRenderingContext2D, coordinate: ICoordinate) => void;
  drawSectionBorders: (context: CanvasRenderingContext2D, c1: ICoordinate, c2: ICoordinate, c3: ICoordinate, c4: ICoordinate) => void;
  draw: (context: CanvasRenderingContext2D, w: ICanvasContextMenuWindow, clickAt: number, mouse: ICoordinate) => void;
  drawAll: (context: CanvasRenderingContext2D, windows: ICanvasContextMenuWindow[], clickAt: number, mouse: ICoordinate) => void;    
  filterOutDestroyed: (windows: ICanvasContextMenuWindow[]) => ICanvasContextMenuWindow[];
}

export const WindowUtility: IWindowUtility = {
  determineSpeed: (context: CanvasRenderingContext2D, coordinate: ICoordinate, height: number, width: number, speed: ICoordinate): ICoordinate => {    
    const updated: ICoordinate = { ...speed };

    if(coordinate.x + (width / 2) >= context.canvas.width) {
      updated.x = speed.x * -1;
    } else if (updated.x < 0 && coordinate.x - (width / 2) <= 0) {
      updated.x = speed.x * -1;
    }

    if(coordinate.y + (height / 2) >= context.canvas.height) {
      updated.y = speed.y * -1;
    } else if(updated.y < 0 && coordinate.y - (height / 2) <= 0) {
      updated.y = speed.y * -1;
    }

    return updated;
  },
  drawActions: (context: CanvasRenderingContext2D, coordinate: ICoordinate): void => {
    const iconLeft: number = coordinate.x + 20,
      textLeft: number = coordinate.x + 60;

    WindowUtility.drawIcon(context, { x: iconLeft, y: coordinate.y + 41 });

    WindowUtility.drawLabel(context, { x: textLeft, y: coordinate.y + 40 });

    WindowUtility.drawIcon(context, { x: iconLeft, y: coordinate.y + 91 });

    WindowUtility.drawLabel(context, { x: textLeft, y: coordinate.y + 90 });

    WindowUtility.drawIcon(context, { x: iconLeft, y: coordinate.y + 161 });

    WindowUtility.drawLabel(context, { x: textLeft, y: coordinate.y + 160 });

    WindowUtility.drawIcon(context, { x: iconLeft, y: coordinate.y + 211 });

    WindowUtility.drawLabel(context, { x: textLeft, y: coordinate.y + 210 });

    WindowUtility.drawIcon(context, { x: iconLeft, y: coordinate.y + 271 });

    WindowUtility.drawLabel(context, { x: textLeft, y: coordinate.y + 270 });
  },
  drawIcon: (context: CanvasRenderingContext2D, coordinate: ICoordinate): void => {
    context.font = "1em \"Font Awesome 6 Pro\"";

    context.fillStyle = "rgb(220, 220, 220)";

    context.fillText("\uf534", coordinate.x, coordinate.y);
  },
  drawLabel: (context: CanvasRenderingContext2D, coordinate: ICoordinate): void => {
    context.font = "500 0.9em Rubik";

    context.fillStyle = "rgb(220, 220, 220)";

    context.fillText("There are no more options", coordinate.x, coordinate.y);
  },
  drawSectionBorders: (context: CanvasRenderingContext2D, c1: ICoordinate, c2: ICoordinate, c3: ICoordinate, c4: ICoordinate): void => {
    context.beginPath();

    context.lineWidth = 1;

    context.strokeStyle = "rgb(60, 60, 60)";

    context.moveTo(c1.x, c1.y + 120);

    context.lineTo(c2.x, c2.y + 120);
    
    context.moveTo(c3.x, c3.y - 65);

    context.lineTo(c4.x, c4.y - 65);
    
    context.stroke();    

  },
  draw: (context: CanvasRenderingContext2D, w: ICanvasContextMenuWindow, clickAt: number, mouse: ICoordinate): void => {
    const { height: originalHeight, width: originalWidth, radius: originalRadius } = w.size;

    const height: number = w.destroyedAt ? CanvasUtility.getAnimatedValue(originalHeight, originalHeight * 1.5, 100, w.destroyedAt) : originalHeight,
      width: number = w.destroyedAt ? CanvasUtility.getAnimatedValue(originalWidth, originalWidth * 1.5, 100, w.destroyedAt) : originalWidth,
      radius: number = w.destroyedAt ? CanvasUtility.getAnimatedValue(originalRadius, originalRadius * 1.5, 100, w.destroyedAt) : originalRadius;

    w.coordinate.x = w.coordinate.x + w.speed.x;
    w.coordinate.y = w.coordinate.y + w.speed.y;

    w.speed = WindowUtility.determineSpeed(context, w.coordinate, height, width, w.speed);

    const upperLeft1: ICoordinate = {
      x: w.coordinate.x - (width / 2), 
      y: w.coordinate.y - (height / 2)
    }

    const upperLeftArcOrigin: ICoordinate = {
      x: upperLeft1.x,
      y: upperLeft1.y + radius
    }

    const upperLeft2: ICoordinate = {
      x: upperLeft1.x - radius, 
      y: upperLeft1.y + radius
    }

    const upperRight1: ICoordinate = {
      x: upperLeft1.x + width,
      y: upperLeft1.y
    }

    const upperRightArcOrigin: ICoordinate = {
      x: upperRight1.x,
      y: upperRight1.y + radius
    }

    const upperRight2: ICoordinate = {
      x: upperRight1.x + radius,
      y: upperRight1.y + radius
    }

    const lowerRight1: ICoordinate = {
      x: upperRight2.x,
      y: upperRight2.y + height
    }

    const lowerRightArcOrigin: ICoordinate = {
      x: lowerRight1.x - radius,
      y: lowerRight1.y
    }

    const lowerRight2: ICoordinate = {
      x: lowerRight1.x - radius,
      y: lowerRight1.y + radius
    }

    const lowerLeft1: ICoordinate = {
      x: lowerRight2.x - width,
      y: lowerRight2.y
    }

    const lowerLeftArcOrigin: ICoordinate = {
      x: lowerLeft1.x,
      y: lowerLeft1.y - radius
    }

    const path: Path2D = new Path2D();
    
    path.moveTo(upperLeft1.x, upperLeft1.y);

    path.lineTo(upperRight1.x, upperRight1.y);

    path.arc(upperRightArcOrigin.x, upperRightArcOrigin.y, radius, Math.PI * 1.5, 0);

    path.lineTo(lowerRight1.x, lowerRight1.y);

    path.arc(lowerRightArcOrigin.x, lowerRightArcOrigin.y, radius, 0, Math.PI * 0.5);

    path.lineTo(lowerLeft1.x, lowerLeft1.y);

    path.arc(lowerLeftArcOrigin.x, lowerLeftArcOrigin.y, radius, Math.PI * 0.5, Math.PI);

    path.lineTo(upperLeft2.x, upperLeft2.y);

    path.arc(upperLeftArcOrigin.x, upperLeftArcOrigin.y, radius, Math.PI, Math.PI * 1.5);

    context.fillStyle = w.destroyedAt ? `rgba(20, 20, 20, ${CanvasUtility.getAnimatedValue(100, 0, 100, w.destroyedAt) / 100})` : "rgb(20, 20, 20)";

    context.shadowBlur = 29;

    context.shadowColor = "rgba(10, 10, 10, 0.75)";

    context.shadowOffsetY = 7;

    if(context.isPointInPath(path, mouse.x, mouse.y)) {      
      const now: number = new Date().getTime();

      if(now - clickAt <= 10 && w.destroyedAt === null) {
        w.destroyedAt = now;
      }
    }

    context.fill(path);
    
    if(w.destroyedAt === null) {
      WindowUtility.drawSectionBorders(context, upperLeft1, upperRight1, lowerLeft1, lowerRight2);

      WindowUtility.drawActions(context, upperLeft1);
    }
  },
  drawAll: (context: CanvasRenderingContext2D, windows: ICanvasContextMenuWindow[], clickAt: number, mouse: ICoordinate): void => {
    for(let w of windows) {
      WindowUtility.draw(context, w, clickAt, mouse);
    }
  },
  filterOutDestroyed: (windows: ICanvasContextMenuWindow[]): ICanvasContextMenuWindow[] => {
    const now: number = new Date().getTime();

    return windows.filter((w: ICanvasContextMenuWindow) => w.destroyedAt === null || now - w.destroyedAt <= 250);
  }
}