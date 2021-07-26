import { ActionTypes } from "@models/ActionTypes";
import { Button, FormControl, Select, TextField } from "@material-ui/core";
import React from "react";
import { NodeData } from "reaflow";
import { SelectNoYes } from "@models/SelectNoYes";

interface PropertiesDesicionProps {
  element: any;
  onPropertiesChange: any;
  nodes: NodeData[];
  selectNoYes: SelectNoYes;
  saveProperties: any;
}

export const PropertiesDesicionComponent = ({element, onPropertiesChange,
nodes, selectNoYes, saveProperties} : PropertiesDesicionProps) => {

  return (
        <>
            <h4>Text</h4>
            <TextField 
                value={element?.data.text}
                name="text"
                onChange={event => onPropertiesChange(event, ActionTypes.CHANGEOTHER)}
            />
            <h4>Nodes to Connect</h4>
            <h5>On Yes</h5>
            <FormControl>
                <Select
                    native
                    value={selectNoYes.onYes}
                    style={{minWidth:'150px'}}
                    onChange={event => onPropertiesChange(event, ActionTypes.CHANGEDESICIONONYES)}
                >
                    <option></option>
                    {nodes?.map(node => (
                        node.id !== element.id && node?.parent === element?.parent &&
                        <option 
                            key={node.id}
                            value={node?.id}
                        >{node?.data?.text}</option>
                    ))}
                </Select>
            </FormControl>
            <h5>On No</h5>
            <FormControl>
                <Select
                    native
                    value={selectNoYes.onNo}
                    style={{minWidth:'150px'}}
                    onChange={event => onPropertiesChange(event, ActionTypes.CHANGEDESICIONONNO)}
                >
                    <option></option>
                    {nodes?.map(node => (
                        node.id !== element.id && node?.parent === element?.parent &&
                        <option 
                            key={node.id}
                            value={node?.id}
                        >{node?.data?.text}</option>
                    ))}
                </Select>
            </FormControl>
            <Button 
                variant="contained" 
                color="primary"
                style={{marginTop: '15px'}}
                onClick={() => saveProperties(ActionTypes.SAVENODEDESICIONPROPERTIES)}
            >
                Save Changes
            </Button>
        </>
    );
  }