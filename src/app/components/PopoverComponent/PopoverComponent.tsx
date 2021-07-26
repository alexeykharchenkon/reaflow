import { useStyles } from "@styles/popoverStyles";
import { Container, FormControl, IconButton, InputLabel, Popover, Select } from "@material-ui/core";
import { NodeData } from "reaflow";
import { PopoverType } from "@models/PopoverType";
import SaveIcon from '@material-ui/icons/Save';
import { Types } from "@models/Types";
import { ActionTypes } from "@models/ActionTypes";
import { StartComponent } from "./StartComponent";
  
export interface PopoverProps {
    open: boolean;
    onClose: () => void;
    nodes: NodeData[];
    popoverElement: PopoverType;
    onPopoverChange: any,
  }

export const PopoverComponent = ({onPopoverChange, onClose, popoverElement, nodes, open}: PopoverProps) => {
    const compProps = {
      nodes:nodes,
      popoverElement:popoverElement,
      onPopoverChange:onPopoverChange,
    }
  
    const classes = useStyles();
    const handleClose = () => {onClose()};

    return (
        <Popover
            id={popoverElement?.node?.id + "pop"}
            open={open}
            anchorEl={popoverElement?.currentTarget}
            onClose={handleClose}
            style={{position: 'absolute', top: '-30px', left: '0px'}}
        >
            {popoverElement?.node?.data?.type === Types[Types.Start] &&
              <StartComponent
                {...compProps}
              />
            }
        </Popover>
    );
  }