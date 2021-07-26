import { FormControl, Popover, RootRef } from "@material-ui/core";
import { NodeData } from "reaflow";
import { PopoverType } from "@models/PopoverType";
import { Types } from "@models/Types";
import { StartComponent } from "./StartComponent";
import { DecisionComponent } from "./DecisionComponent";
import { ActionTypes } from "@models/ActionTypes";
import { createRef, useEffect, useRef } from "react";
  
export interface PopoverProps {
    nodes: NodeData[];
    popoverElement: PopoverType;
    onPopoverChange: any,
  }

export const PopoverComponent = ({onPopoverChange, popoverElement, nodes}: PopoverProps) => {
    const compProps = {
      nodes:nodes,
      popoverElement:popoverElement,
      onPopoverChange:onPopoverChange,
    }

    return (
        <Popover
            id={popoverElement?.node?.id + "pop"}
            open={popoverElement.isOpen}
            anchorEl={popoverElement?.currentTarget}
            onClose={event => onPopoverChange(event, ActionTypes.ONPOPOVERCLOSE)}
            style={{position: 'absolute', top: '-50px', left: '0px'}}
        >
           {popoverElement?.node?.data?.type === Types[Types.Start] &&
              <StartComponent
                {...compProps}
              />}
            {popoverElement?.node?.data?.type === Types[Types.Phase] &&
              <StartComponent
                {...compProps}
              />}
            {popoverElement?.node?.data?.type === Types[Types.SubWorkflow] &&
              <StartComponent
                {...compProps}
              />}
            {popoverElement?.node?.data?.type === Types[Types.Decision] &&
              <DecisionComponent
                {...compProps}
              />}
        </Popover>
    );
  }