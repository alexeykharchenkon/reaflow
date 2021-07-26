import { useStyles } from "@styles/popoverStyles";
import { Container, FormControl, IconButton, Select } from "@material-ui/core";
import { NodeData } from "reaflow";
import { PopoverType } from "@models/PopoverType";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ActionTypes } from "@models/ActionTypes";
  
export interface DecisionProps {
    nodes: NodeData[];
    popoverElement: PopoverType;
    onPopoverChange: any,
  }

export const DecisionComponent = ({onPopoverChange, popoverElement, nodes}: DecisionProps) => {
    const classes = useStyles();

    return (
            <Container className={classes.decision}>
              <div className={classes.decisionSelectors}>
              onYes to
              <FormControl  style={{paddingBottom: '15px'}}>
                  <Select
                      native
                      value={popoverElement?.selectNoYes?.onYes}
                      onChange={event => onPopoverChange(event, ActionTypes.CHANGECONNECTONYES)}
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
                onNo to
                <FormControl>
                  <Select
                      native
                      value={popoverElement?.selectNoYes?.onNo}
                      onChange={event => onPopoverChange(event, ActionTypes.CHANGECONNECTONNO)}
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
                    onClick={event => onPopoverChange(event, ActionTypes.SAVECONNECTYESNO)}
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