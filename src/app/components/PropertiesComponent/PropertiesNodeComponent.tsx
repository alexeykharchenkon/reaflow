import { SelectNoYes } from "@models/SelectNoYes";
import { ActionTypes } from "@models/ActionTypes";
import { Types } from "@models/Types";
import React from "react";
import { NodeData } from "reaflow";
import { PropertiesDesicionComponent } from "./PropertiesDesicionComponent";
import { Button, TextField } from "@material-ui/core";

interface PropertiesNodeProps {
  element: any;
  onPropertiesChange: any;
  nodes: NodeData[];
  selectNoYes: SelectNoYes;
  saveProperties: any;
}

export const PropertiesNodeComponent = ({element, onPropertiesChange,
nodes, selectNoYes, saveProperties} : PropertiesNodeProps) => {
  return (
    <>
    {element?.data?.type.toString() === Types[Types.Decision] &&
        <PropertiesDesicionComponent 
          element={element}
          onPropertiesChange={onPropertiesChange}
          nodes={nodes}
          selectNoYes={selectNoYes}
          saveProperties={saveProperties}
        />
    }
    {element?.data?.type.toString() !== Types[Types.Decision] &&
      <div>
        <h4>Text</h4>
        <TextField 
            value={element?.data.text}
            name="text"
            onChange={event => onPropertiesChange(event, ActionTypes.CHANGEOTHER)}
        />
        <Button 
          variant="contained" 
          color="primary"
          style={{marginTop: '15px'}}
          onClick={() => saveProperties(ActionTypes.SAVENODEOTHERPROPERTIES)}
        >
          Save Changes
        </Button>
      </div>
    } 
      </>
    );
  }