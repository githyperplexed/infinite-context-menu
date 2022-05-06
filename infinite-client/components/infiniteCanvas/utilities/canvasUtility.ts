interface ICanvasUtility {  
  drawCanvas: (context: CanvasRenderingContext2D) => void;
  getAnimatedValue: (initial: number, final: number, duration: number, timestamp: number) => number;
  getAnimationPercent: (duration: number, timestamp: number) => number;
}

export const CanvasUtility: ICanvasUtility = {
  getAnimatedValue: (initial: number, final: number, duration: number, timestamp: number): number => {
    const percent: number = CanvasUtility.getAnimationPercent(duration, timestamp);
    
    if(percent >= 1 || initial === final) return final;
    
    const diff = final - initial;
    
    return initial + (diff * percent);
  },
  drawCanvas: (context: CanvasRenderingContext2D): void => {
    const height = context.canvas.clientHeight,
      width = context.canvas.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.clearRect(0, 0, width, height);
  },
  getAnimationPercent: (duration: number, timestamp: number): number => {
    if(timestamp === null) return 1;
    
    const now: number = new Date().getTime(),
          diff: number = now - timestamp;
    
    return diff / duration;
  }
}