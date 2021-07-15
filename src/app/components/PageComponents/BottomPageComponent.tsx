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
            blocks={dataStore.blocks}
            selections={dataStore.selections}
            onClick={dataStore.onClick}
            removeElement={dataStore.removeElement}
            setData={dataStore.setData} 
          />
          <PropertiesComponent/>
      </div>
    );
  });