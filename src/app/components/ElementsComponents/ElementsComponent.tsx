import { useStyles } from "@styles/elementStylesMaterialUI";
import { Card, Typography } from "@material-ui/core";
import { ActionTypes } from "@models/ActionTypes"
import { Types } from "@models/Types"
import { SubWorkFlowComponent } from "./SubWorkflowComponent";
import { NodeData } from "reaflow";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@stores/rootStore";

interface ElementsProps {
  element: any;
  onClick: any;
}

export const ElementsComponent = ({element, onClick} : ElementsProps) => {
    const classes = useStyles();
    const {dataStore} = useStore();  
    
    let forObjClassName = "element " + element.node.data.className;
    forObjClassName += element.node.data.checked ? " checked": "";
   // console.log(element)
    return (
      <foreignObject
        pointerEvents={"none"}
        className={forObjClassName}
        width={element.width}
        height={element.height}
        //onClick={() => onClick("", element.node, ActionTypes.ONCLICKNODEFOROBJ)}
        >
          {element?.node.data?.type === Types[Types.Start] &&
            <Card className={classes.start} style={{marginTop:"15px"}}>
               <Typography variant="h5" className={classes.startTypography}>
                  {element.node.data.text}
              </Typography>
            </Card>
          }
           {element?.node.data?.type === Types[Types.End] &&
            <Card className={classes.end} style={{marginTop:"15px"}}>
               <Typography variant="h5" className={classes.endTypography}>
                  {element.node.data.text}
              </Typography>
            </Card>
          }
          {element?.node.data?.type === Types[Types.Phase] &&
            <Card className={classes.phase}>
               <Typography className={classes.phaseTypography}>
                  {element.node.data.text}
              </Typography>
            </Card>
          }
          {element?.node.data?.type === Types[Types.SubWorkflow] &&
           <SubWorkFlowComponent 
              element={element}
              onClick={onClick}
           />
          }
          {element?.node.data?.type === Types[Types.Decision] &&
            <div className="desicionElementText">
              <h3>{element.node.data.text}</h3>
            </div>
          }
       </foreignObject>
    )}


    