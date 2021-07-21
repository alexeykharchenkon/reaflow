import { ActionTypes } from "@models/ActionTypes";
import React from "react";

interface PropertiesEdgeProps {
  element: any;
  onPropertiesChange: any;
  saveProperties: any;
}

export const PropertiesEdgeComponent = ({element, onPropertiesChange, saveProperties} : PropertiesEdgeProps) => {
  
  return (
        <div>
          <div>
            <label>
              Label:
              <input 
                type="text" 
                name="text" 
                value={element?.text} 
                onChange = {event => onPropertiesChange(event, ActionTypes.CHANGEOTHER)}
                />
            </label>
            </div>
            <div>
            <button 
              className="saveProperties"
              onClick={() => saveProperties(ActionTypes.SAVEEDGEPROPERTIES)}
            >Save Changes</button>
          </div>
        </div>
    );
  }