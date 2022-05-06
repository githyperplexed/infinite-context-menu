import React from "react";

import { ContextMenuContext } from "./contextMenuWrapper";
import { ContextMenuWindow } from "../contextMenuWindow/contextMenuWindow";

import { ContextMenuUtility } from "../../utilities/contextMenuUtility";

import { IContextMenuContext } from "./models/contextMenuContext";

export const ContextMenu: React.FC = () => {
  const { state, setMenuRefTo } = React.useContext<IContextMenuContext>(ContextMenuContext);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(ref !== null && ref.current !== null) {
      setMenuRefTo(ref);
    }
  }, [state.targetRef]);

  return (
    <div ref={ref} id="context-menu" style={ContextMenuUtility.determineMountPosition(ref, state.position)}>
      <ContextMenuWindow sections={state.sections} level={0} />
    </div>
  );
}