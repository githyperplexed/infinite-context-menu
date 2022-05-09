import { IDirectionEntry } from "../models/directionEntry";

import { Lateral } from "../enums/lateral";
import { Vertical } from "../enums/vertical";

interface IInfiniteContextMenuDirectionUtility {
  determineDirection: (actionID: string, history: IDirectionEntry[], extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>) => IDirectionEntry;  
  validateLateralMovement: (lateral: Lateral, extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>) => Lateral;  
  validateVerticalMovement: (vertical: Vertical, extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>) => Vertical;
}
  
export const InfiniteContextMenuDirectionUtility: IInfiniteContextMenuDirectionUtility = { 
  determineDirection: (actionID: string, history: IDirectionEntry[], extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>): IDirectionEntry => {    
    const previousDirection: IDirectionEntry = history[history.length - 1];

    return {
      id: Math.random().toString(),
      actionID,
      lateral: InfiniteContextMenuDirectionUtility.validateLateralMovement(previousDirection.lateral, extensionRef, windowRef),
      vertical: InfiniteContextMenuDirectionUtility.validateVerticalMovement(previousDirection.vertical, extensionRef, windowRef)
    }
  },
  validateLateralMovement: (lateral: Lateral, extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>): Lateral => {    
    if(
      extensionRef.current !== null &&
      windowRef.current !== null
    ) {
      const extensionRect: DOMRect = extensionRef.current.getBoundingClientRect();

      const tooFarRight: boolean = extensionRect.right + windowRef.current.clientWidth > window.innerWidth - 10,
        tooFarLeft: boolean = extensionRect.left - windowRef.current.clientWidth < 10;

      console.log(tooFarLeft, tooFarRight)
      
      if (tooFarLeft && tooFarRight) {
        return Lateral.None;
      } else if(lateral === Lateral.Right && tooFarRight) {
        return Lateral.Left;
      } else if(lateral === Lateral.Left && tooFarLeft) {
        return Lateral.Right;
      }
    }

    return lateral;
  },
  validateVerticalMovement: (vertical: Vertical, extensionRef: React.MutableRefObject<HTMLElement>, windowRef: React.MutableRefObject<HTMLElement>): Vertical => {
    if(
      extensionRef.current !== null &&
      windowRef.current !== null
    ) {
      const extensionRect: DOMRect = extensionRef.current.getBoundingClientRect();

      if(vertical === Vertical.Down && extensionRect.top + windowRef.current.clientHeight - 10 > window.innerHeight - 10) {
        return Vertical.Up;
      } else if (vertical === Vertical.Up && (extensionRect.bottom + 10) - windowRef.current.clientHeight < 10) {
        return Vertical.Down;
      }
    }

    return vertical;
  }
}