import { useStyles } from "@styles/popoverStyles";
import { Container, FormControl, IconButton, Select } from "@material-ui/core";
import { NodeData } from "reaflow";
import { PopoverType } from "@models/PopoverType";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ActionTypes } from "@models/ActionTypes";
  
export interface StartProps {
    nodes: NodeData[];
    popoverElement: PopoverType;
    onPopoverChange: any,
  }

export const StartComponent = ({onPopoverChange, popoverElement, nodes}: StartProps) => {
    const classes = useStyles();

    return (
            <Container className={classes.start}>
              <div>
                  Connect to<br/>
              <FormControl>
                  <Select
                      native
                      value={popoverElement?.connectTo}
                      onChange={event => onPopoverChange(event, ActionTypes.CHANGECONNECTTO)}
                  >
                      <option></option>
                      {nodes?.map(node => (
                          node.id !== popoverElement?.node?.id && node?.parent === popoverElement?.node?.parent &&
                          <option 
                              key={node?.id}
                              value={node?.id}
                          >{node?.data?.text}</option>
                      ))}
                  </Select>
                </FormControl>
                </div>
                <div>
                  <IconButton 
                    className={classes.linkButton}
                    onClick={event => onPopoverChange(event, ActionTypes.SAVECONNECTTO)}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton 
                    className={classes.linkButton}
                    onClick={event => onPopoverChange(event, ActionTypes.DELETENODE)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Container>
    );
  }