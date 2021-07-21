import { SelectNoYes } from "@models/SelectNoYes";
import { ActionTypes } from "@models/ActionTypes";
import { Types } from "@models/Types";
import React from "react";
import { EdgeData, NodeData } from "reaflow";
import { PropertiesDesicionComponent } from "./PropertiesDesicionComponent";

interface PropertiesNodeProps {
  element: any;
  onPropertiesChange: any;
  nodes: NodeData[];
  edges: EdgeData[];
  selectNoYes: SelectNoYes;
  saveProperties: any;
}

export const PropertiesNodeComponent = ({element, onPropertiesChange,
nodes, edges, selectNoYes, saveProperties} : PropertiesNodeProps) => {
  return (
    <>
    {element?.data?.type.toString() === Types[Types.Decision] &&
        <PropertiesDesicionComponent 
          element={element}
          onPropertiesChange={onPropertiesChange}
          nodes={nodes}
          edges={edges}
          selectNoYes={selectNoYes}
          saveProperties={saveProperties}
        />
    }
    {element?.data?.type.toString() !== Types[Types.Decision] &&
      <div>
        <div>
            <label>
              Text:
              <input 
                type="text" 
                name="text" 
                value={element?.data.text} 
                onChange = {event => onPropertiesChange(event, ActionTypes.CHANGEOTHER)}
                />
            </label>
        </div>
        <div>
          <button 
            className="saveProperties"
            onClick={() => saveProperties(ActionTypes.SAVENODEOTHERPROPERTIES)}
          >Save Changes</button>
        </div>
      </div>
    } 
      </>
    );
  }