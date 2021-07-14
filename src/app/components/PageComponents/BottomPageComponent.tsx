import React from "react";
import { observer } from "mobx-react-lite";
import { MainCanvasComponent } from "./MainCanvasComponent";
import { PropertiesComponent } from "./PropertiesComponent";
import { useStore } from "@stores/rootStore";

export const BottomPageComponent = observer(() => {
  const {dataStore} = useStore();  
  return (
      <div className="bottomPageComponent">
          <MainCanvasComponent
            edges={dataStore.edges}
            nodes={dataStore.nodes}
            setNodesAndEdges={dataStore.setNodesAndEdges}
            setEdges={dataStore.setEdges}
            removeNode={dataStore.removeNode}
            blocks={dataStore.blocks}
          />
          <PropertiesComponent/>
      </div>
    );
  });