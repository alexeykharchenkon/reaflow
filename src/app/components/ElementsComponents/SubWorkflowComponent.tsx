import { useStyles } from "@styles/elementStylesMaterialUI";
import { Card, Container, IconButton} from "@material-ui/core";
import { ActionTypes } from "@models/ActionTypes";
import AddIcon from '@material-ui/icons/Add';

interface SubWorkFlowProps {
  element: any;
  onClick: any;
}

export const SubWorkFlowComponent = ({element, onClick} : SubWorkFlowProps) => {
    const classes = useStyles();
   // console.log(element.node.data.checked)
    return (
        <Container 
            className={classes.subWorkFlow} 
           // onClick={() => onClick("", element.node, ActionTypes.ONCLICKNODEFOROBJ)}
        >
            <div className={classes.subWorkFlowTypography}>
                {element.node.data.text}
            </div>
            <IconButton 
                className={classes.subWorkFlowAddButton}
                onClick={()=> onClick("","", ActionTypes.ONCLICKFOROBJADD)}
            >
                <AddIcon />
            </IconButton>
        </Container>
    )}


    