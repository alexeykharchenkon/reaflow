import { useStyles } from "@styles/popoverStyles";
import { Container, FormControl, IconButton, InputLabel, Select } from "@material-ui/core";
import { NodeData } from "reaflow";
import { PopoverType } from "@models/PopoverType";
import SaveIcon from '@material-ui/icons/Save';
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
              <Container>
              <FormControl>
                <InputLabel id="label-select">Connect to node</InputLabel>
                  <Select
                      labelId="label-select"
                      native
                      value={popoverElement?.connectTo}
                      style={{minWidth:'150px'}}
                      onChange={event => onPopoverChange(event, ActionTypes.CHANGECONNECTTO)}
                  >
                      <option></option>
                      {nodes?.map(node => (
                          node.id !== popoverElement?.node?.id &&
                          <option 
                              key={node?.id}
                              value={node?.id}
                          >{node?.data?.text}</option>
                      ))}
                  </Select>
                </FormControl>
                </Container>
                <Container>
                  <IconButton 
                    className={classes.linkButton}
                    onClick={event => onPopoverChange(event, ActionTypes.SAVECONNECTTO)}
                  >
                  <SaveIcon />
                  </IconButton>
                </Container>
              </Container>
    );
  }