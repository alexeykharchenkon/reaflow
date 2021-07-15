import React from "react";
import { EdgeData, NodeData } from "reaflow";

interface PropertiesProps {
  element: any;
  onPropertiesChange: any;
  saveProperties: any;
}

export const PropertiesComponent = ({element, onPropertiesChange, saveProperties} : PropertiesProps) => {
  
  return (
      <div className="propertiesComponent">
        <h3>Properties</h3>
        {element !== null &&
        <>
          <div>
            <label>
              Text:
              <input 
                type="text" 
                name="text" 
                value={element?.text} 
                onChange = {event => onPropertiesChange(event)}
                />
            </label>
          </div>
          <div>
              <button onClick={saveProperties}>Save</button>
          </div>
        </>
        }
      </div>
    );
  }