import { Button, TextField } from "@material-ui/core";
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
      <h4>Text</h4>
      <TextField 
          value={element?.text}
          name="text"
          onChange={event => onPropertiesChange(event, ActionTypes.CHANGEOTHER)}
      />
      <Button 
        variant="contained" 
        color="primary"
        style={{marginTop: '15px'}}
        onClick={() => saveProperties(ActionTypes.SAVEEDGEPROPERTIES)}
      >
        Save Changes
      </Button>
    </div>
    );
  }