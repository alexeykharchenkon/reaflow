import React from "react";
import { PropertyModes } from "@models/PropertyModes";
import { PropertiesNodeComponent } from "./PropertiesNodeComponent";
import { PropertiesEdgeComponent } from "./PropertiesEdgeComponent";
import { EdgeData, NodeData } from "reaflow";
import { SelectNoYes } from "@models/SelectNoYes";

interface PropertiesProps {
  element: any;
  onPropertiesChange: any;
  saveProperties: any;
  propertyModes: PropertyModes;
  nodes: NodeData[];
  edges: EdgeData[];
  selectNoYes: SelectNoYes;
}

export const PropertiesComponent = ({element, onPropertiesChange, saveProperties, 
  propertyModes, nodes, edges, selectNoYes} : PropertiesProps) => {
  
  return (
      <div className="propertiesComponent">
        <h3>Properties</h3>
        {element !== null &&
        <>
          {propertyModes.nodeMode &&
            <PropertiesNodeComponent 
              element={element}
              onPropertiesChange={onPropertiesChange}
              nodes={nodes}
              edges={edges}
              selectNoYes={selectNoYes}
              saveProperties={saveProperties}
            />
          }
           {propertyModes.edgeMode &&
            <PropertiesEdgeComponent 
              element={element}
              onPropertiesChange={onPropertiesChange}
              saveProperties={saveProperties}
            />
          }
        </>
        }
      </div>
    );
  }