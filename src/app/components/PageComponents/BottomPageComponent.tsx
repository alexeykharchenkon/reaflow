import React from "react";
import { observer } from "mobx-react-lite";
import { MainCanvasComponent } from "./MainCanvasComponent";
import { PropertiesComponent } from "../PropertiesComponent/PropertiesComponent";
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
            popoverElement={dataStore.popoverElement}
            onPopoverChange={dataStore.onPopoverChange}
          />
          <PropertiesComponent
            element={dataStore.activeElement}
            onPropertiesChange={dataStore.onPropertiesChange}
            saveProperties={dataStore.saveProperties}
            propertyModes={dataStore.propertyModes}
            nodes={dataStore.nodes}
            selectNoYes={dataStore.selectNoYes}
          />
      </div>
    );
  });