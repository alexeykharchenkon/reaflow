import React from "react";

interface PropertiesEdgeProps {
  element: any;
  onPropertiesChange: any;
}

export const PropertiesEdgeComponent = ({element, onPropertiesChange} : PropertiesEdgeProps) => {
  
  return (
        <div>
            <label>
              Label:
              <input 
                type="text" 
                name="text" 
                value={element?.text} 
                onChange = {event => onPropertiesChange(event)}
                />
            </label>
        </div>
    );
  }