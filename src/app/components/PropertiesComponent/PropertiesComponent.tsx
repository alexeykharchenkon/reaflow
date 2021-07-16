import React from "react";
import { EdgeData, NodeData } from "reaflow";
import { PropertyModes } from "@models/PropertyModes";
import { PropertiesNodeComponent } from "./PropertiesNodeComponent";
import { PropertiesEdgeComponent } from "./PropertiesEdgeComponent";

interface PropertiesProps {
  element: any;
  onPropertiesChange: any;
  saveProperties: any;
  propertyModes: PropertyModes;
}

export const PropertiesComponent = ({element, onPropertiesChange, saveProperties, propertyModes} : PropertiesProps) => {
  
  return (
      <div className="propertiesComponent">
        <h3>Properties</h3>
        {element !== null &&
        <>
          {propertyModes.nodeMode &&
            <PropertiesNodeComponent 
              element={element}
              onPropertiesChange={onPropertiesChange}
            />
          }
           {propertyModes.edgeMode &&
            <PropertiesEdgeComponent 
              element={element}
              onPropertiesChange={onPropertiesChange}
            />
          }
          <div>
            <button 
              className="saveProperties"
              onClick={() => saveProperties()}
            >Save Changes</button>
          </div>
        </>
        }
      </div>
    );
  }