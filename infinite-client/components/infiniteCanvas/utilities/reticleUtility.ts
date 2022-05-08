import { CanvasUtility } from "./canvasUtility";

import { ICoordinate } from "../models/coordinate";

import { Color } from "../../../enums/color";

interface IReticleUtility {
  draw: (context: CanvasRenderingContext2D, coordinate: ICoordinate, clickAt: number) => void;  
}

export const ReticleUtility: IReticleUtility = {
  draw: (context: CanvasRenderingContext2D, coordinate: ICoordinate, clickAt: number): void => {  
    context.lineWidth = 3;
    
    context.lineCap = "round";

    const radius: number = 40,
      white: string = `rgba(${Color.White}, ${CanvasUtility.getAnimatedValue(0, 100, 250, clickAt) / 100})`;

    for(let i = 0.08; i < 2; i += 0.5) {
      context.beginPath();
  
      context.strokeStyle = `rgb(${Color.Blue})`;

      context.arc(coordinate.x, coordinate.y, radius, Math.PI * i, Math.PI * (0.34 + i));
    
      context.stroke();  
    }
    
    for(let i = 0.1; i < 2; i += 0.5) {
      context.beginPath();
  
      context.strokeStyle = white;

      context.arc(coordinate.x, coordinate.y, CanvasUtility.getAnimatedValue(radius * 1.5, radius * 0.75, 250, clickAt), Math.PI * i, Math.PI * (0.3 + i));
    
      context.stroke();  
    }

    context.beginPath();

    const length: number = CanvasUtility.getAnimatedValue(radius * 1.25, radius * 1.5, 250, clickAt);

    context.strokeStyle = `rgb(${Color.Blue})`;

    context.moveTo(coordinate.x, coordinate.y - 10);

    context.lineTo(coordinate.x, coordinate.y - length);

    context.moveTo(coordinate.x + 10, coordinate.y);

    context.lineTo(coordinate.x + length, coordinate.y);

    context.moveTo(coordinate.x, coordinate.y + 10);

    context.lineTo(coordinate.x, coordinate.y + length);

    context.moveTo(coordinate.x - 10, coordinate.y);

    context.lineTo(coordinate.x - length, coordinate.y);

    context.stroke();
    
    context.beginPath();

    context.fillStyle = white;

    context.arc(coordinate.x, coordinate.y, 2, 0, Math.PI * 2);

    context.fill();
  }
}