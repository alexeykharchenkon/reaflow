import { ActionTypes } from "@models/ActionTypes"
import { Types } from "@models/Types"


interface ElementsProps {
  element: any;
  onClick: any;
}

export const ElementsComponent = ({element, onClick} : ElementsProps) => {
    let forObjClassName = "element " + element.node.data.className;
    forObjClassName += element.node.data.checked ? " checked": "";

    if(element?.node.data?.type.toString() === Types[Types.SubWorkflow]){
      if(element.width < 250) element.width = 300;
      if(element.height < 250) element.height = 300;
    }
    console.log(element)
    return (
      <foreignObject
        pointerEvents={"none"}
        className={forObjClassName}
        width={element.width}
        height={element.height}
        x={0} 
        y={0}
        onClick={()=> onClick("","", ActionTypes.ONCLICKFOROBJ)}
        >
          {element?.node.data?.type.toString() !== Types[Types.Decision] &&
            <div>
                <h3>{element.node.data.text}</h3>
            </div>
          }
          {element?.node.data?.type.toString() === Types[Types.Decision] &&
            <div className="desicionElementText">
                <h3>{element.node.data.text}</h3>
            </div>
          }
       </foreignObject>
    )}
