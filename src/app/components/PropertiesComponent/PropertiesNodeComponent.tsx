import React from "react";

interface PropertiesNodeProps {
  element: any;
  onPropertiesChange: any;
}

export const PropertiesNodeComponent = ({element, onPropertiesChange} : PropertiesNodeProps) => {
  
  return (
        <div>
            <label>
              Text:
              <input 
                type="text" 
                name="text" 
                value={element?.data.text} 
                onChange = {event => onPropertiesChange(event)}
                />
            </label>
        </div>
    );
  }