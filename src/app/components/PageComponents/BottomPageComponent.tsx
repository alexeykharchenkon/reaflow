import React from "react";
import { MainCanvasComponent } from "./MainCanvasComponent";
import { PropertiesComponent } from "./PropertiesComponent";

export const BottomPageComponent = () => {
    return (
      <div className="bottomPageComponent">
          <MainCanvasComponent/>
          <PropertiesComponent/>
      </div>
    );
  }